import { Article, NavigationTab, CurrencyRate } from './types';
import { NEW_ARTICLES } from './newArticles';

export const NAVIGATION_TABS: NavigationTab[] = [
  { id: 'all', labelAr: 'الرئيسية', labelEn: 'Home' },
  { id: 'urgent-release', labelAr: 'إصدار عاجل', labelEn: 'Urgent Release' },
  { id: 'in-case-you-missed-it', labelAr: 'في حال فاتك', labelEn: 'In Case You Missed It' },
  { id: 'alwarraq-investigations', labelAr: 'التحقيقات الاستقصائية للورّاق', labelEn: 'AlWarraq Investigative Reporting' },
  { id: 'war-room', labelAr: 'غرفة الحرب الجيوسياسية', labelEn: 'War Room Intel' },
  { id: 'pulse-of-the-street', labelAr: 'نبض الشارع', labelEn: 'Pulse of the Street' },
  { id: 'sentiment-analysis', labelAr: 'تحليل المشاعر', labelEn: 'Sentiment Analysis' },
  { id: 'fifa-2026', labelAr: 'فيفا 2026', labelEn: 'FIFA 2026' },
  { id: 'exclusives', labelAr: 'التحقيقات الصحفية', labelEn: 'Investigations' },
  { id: 'editor-desk', labelAr: 'من رئيس التحرير', labelEn: "From the Editor-in-Chief" },
  { id: 'translations', labelAr: 'ترجمات', labelEn: 'Translations' },
  { id: 'lebanon', labelAr: 'أخبار لبنان', labelEn: 'Lebanon News' },
  { id: 'instats', labelAr: 'إحصاءات الورّاق', labelEn: 'In Stats' },
  { id: 'videos', labelAr: 'فيديو الورّاق', labelEn: 'Al-Warraq Videos' },
  { id: 'podcast', labelAr: 'بودكاست الورّاق', labelEn: 'Al-Warraq Podcast' },
  { id: 'middle-east', labelAr: 'شؤون الشرق الأوسط', labelEn: 'Middle East Core' },
  { id: 'economy', labelAr: 'الاقتصاد', labelEn: 'Economy' },
  { id: 'markets', labelAr: 'أسواق المال', labelEn: 'Sovereign Markets' },
  { id: 'arab-markets', labelAr: 'الأسواق العربية', labelEn: 'Arab Markets Indicators' },
  { id: 'telecom-internet', labelAr: 'الاتصالات والإنترنت', labelEn: 'Telecom & Internet' },
  { id: 'world-of-ai', labelAr: 'عالم الذكاء الاصطناعي', labelEn: 'World of AI' },
  { id: 'research-reports', labelAr: 'أبحاث ودراسات', labelEn: 'Research & Reports' },
  { id: 'sports', labelAr: 'رياضة', labelEn: 'Sports' },
  { id: 'wellness-lifestyle', labelAr: 'الصحة', labelEn: 'Curae News' },
  { id: 'what-if-simulator', labelAr: 'محاكي تقدير المواقف "ماذا لو"', labelEn: 'Geopolitical "What-If" Simulator' },
  { id: 'press-releases', labelAr: 'البيانات الصحفية', labelEn: 'Press Releases' },
  { id: 'newsletter', labelAr: 'النشرة البريدية الكلاسيكية', labelEn: 'Classic Newsletter' },
  { id: 'premium-pricing', labelAr: 'الخدمة الممتازة والاشتراكات', labelEn: 'Premium & Subscriptions' },
  { id: 'iraq-us-dossier', labelAr: 'التقارير السيادية الخاصة', labelEn: 'Sovereign Special Reports' },
];

export const INITIAL_ARTICLES: Article[] = [
  ...NEW_ARTICLES,
  {
    id: 'lebanon-syria-relations-2026',
    category: 'exclusives',
    categories: ['exclusives', 'lebanon'],
    titleAr: 'العلاقات اللبنانية السورية: من المحاور الإيديولوجية أو الهيمنة السياسية نحو الواقعية السياسية',
    titleEn: 'Lebanese-Syrian Relations: From Ideological Axes or Political Dominance to Realpolitik',
    summaryAr: `تثبت القراءة الاستقصائية لزيارة وزير الخارجية السوري لبيروت في تموز 2026 أن "العلاقات اللبنانية السورية" لم تعد أسيرة لإرث الماضي المعقد. نحن أمام إدارتين براغماتيتين:
• في دمشق: سلطة انتقالية تركز على البناء الداخلي، وترى في استقرار لبنان واقتصاده المصلح بوابة للمجتمع الدولي.
• في بيروت: سلطة دستورية مكتملة تسعى لاستعادة سيادتها وتصفير عجزها المالي (موازنة 2026) وحل معضلة اللجوء عبر قنوات شرعية.
• إن التحول الجذري في السياسة المالية اللبنانية عام 2025 — والذي شمل رفع السرية المصرفية لمكافحة غسيل الأموال وتأمين قروض البنك الدولي — جعل من بيروت شريكاً مالياً "نظيفاً" وموثوقاً لإدارة أحمد الشرع، التي تسعى بدورها لكسر العزلة المالية الدولية وجذب الاستثمارات.
المنفعة الاقتصادية هي المحرك الأساسي لهذه المرحلة، وسيكون لنجاح الاتفاقيات التجارية والأمنية الموقعة خلال هذه الزيارة الأثر الأكبر في رسم ملامح علاقة ندية ومستقرة قائمة على توازن المصالح.`,
    summaryEn: `An investigative analysis of the Syrian Foreign Minister’s landmark visit to Beirut in July 2026 reveals that Lebanese-Syrian relations are no longer hostage to the complex legacy of the past. We are witnessing two highly pragmatic administrations: a transitional authority in Damascus focused on internal reconstruction and viewing Lebanon's stability as a gateway to the international community, and a constitutionally complete authority in Beirut striving to reclaim sovereignty, eliminate its financial deficit (2026 budget), and resolve the refugee dilemma through formal channels. Powered by economic interests, this new phase marks a turning point toward mutual benefits and sovereign parity.`,
    excerptAr: 'تثبت القراءة الاستقصائية لزيارة وزير الخارجية السوري لبيروت في تموز 2026 أن العلاقات اللبنانية السورية انتقلت نحو واقعية سياسية وندية قائمة على توازن المصالح والمنفعة الاقتصادية المتبادلة.',
    excerptEn: 'An investigative reading of the Syrian Foreign Minister\'s July 2026 visit to Beirut reveals a pragmatic shift in relations, driven by mutual economic interest and sovereign balance.',
    contentAr: `تثبت القراءة الاستقصائية لزيارة وزير الخارجية السوري لبيروت في تموز 2026 أن "العلاقات اللبنانية السورية" لم تعد أسيرة لإرث الماضي المعقد. نحن أمام إدارتين براغماتيتين:
• **في دمشق:** سلطة انتقالية تركز على البناء الداخلي، وترى في استقرار لبنان واقتصاده المصلح بوابة للمجتمع الدولي.
• **في بيروت:** سلطة دستورية مكتملة تسعى لاستعادة سيادتها وتصفير عجزها المالي (موازنة 2026) وحل معضلة اللجوء عبر قنوات شرعية.
• إن التحول الجذري في السياسة المالية اللبنانية عام 2025 — والذي شمل رفع السرية المصرفية لمكافحة غسيل الأموال وتأمين قروض البنك الدولي — جعل من بيروت شريكاً مالياً "نظيفاً" وموثوقاً لإدارة أحمد الشرع، التي تسعى بدورها لكسر العزلة المالية الدولية وجذب الاستثمارات.

المنفعة الاقتصادية هي المحرك الأساسي لهذه المرحلة، وسيكون لنجاح الاتفاقيات التجارية والأمنية الموقعة خلال هذه الزيارة الأثر الأكبر في رسم ملامح علاقة ندية ومستقرة قائمة على توازن المصالح.

---

### مقدمة: مشهد سياسي جديد في عاصمة القرار المشترك

تأتي زيارة وزير الخارجية السوري، أسعد الشيباني، إلى بيروت اليوم (2 تموز 2026) ولقاءاته المكثفة مع المسؤولين اللبنانيين — بدءاً من رئيس الجمهورية جوزاف عون ورئيس الحكومة نواف سلام، وصولاً إلى رئيس مجلس النواب نبيه بري — لتدشن فصلاً جديداً ومختلفاً كلياً في مسار العلاقات الثنائية بين البلدين. هذا الحراك الدبلوماسي الرفيع هو الأول من نوعه منذ تسلم حكومة الرئيس السوري أحمد الشرع (الذي تولى الرئاسة مطلع عام 2025 عقب سقوط النظام السابق)، ومجيء الإدارة الإصلاحية الجديدة في لبنان بقيادة عون وسلام.

لم تعد العلاقة تُدار بمنطق "المحاور الإيديولوجية" أو الهيمنة السياسية، بل انتقلت بوضوح نحو الواقعية السياسية (Pragmatism) القائمة على لغة الأرقام، التوقيت الحرج، والمنفعة الاقتصادية المتبادلة.

---

### أولاً: عامل التوقيت والسياق الإقليمي (لماذا الآن؟)

يتزامن هذا الحراك مع تحولات كبرى على جانبي الحدود، مما يجعل توقيت الزيارة حرجاً وإستراتيجياً:

* **اتفاق الإطار اللبناني-الإسرائيلي (أواخر حزيران 2026):** وقع لبنان مؤخراً على اتفاق إطار برعاية أمريكية يهدف إلى تأمين انسحاب إسرائيلي كامل، وهو ما يدفع الدولة اللبنانية إلى بسط سيادتها الكاملة وتفعيل خطة "درع الوطن" لضبط السلاح.
* **التموضع السوري الجديد:** تبدي إدارة الرئيس أحمد الشرع رغبة واضحة في النأي بنفسها عن الصراعات العسكرية الإقليمية، معلنة عدم التدخل عسكرياً في الساحة اللبنانية، والتركيز بدلاً من ذلك على شرعنتها الدولية وإعادة الإعمار داخلياً.

---

### ثانياً: الأهداف الرئيسية للمرحلة الجديدة

تتركز المباحثات الحالية على ثلاثة ملفات رئيسية تشكل الركيزة الأساسية لإعادة صياغة العلاقات:

1. **ترسيخ السيادة المشتركة وضبط الحدود:** تسعى بيروت ودمشق إلى تفعيل اللجان المشتركة لترسيم الحدود وضبط عمليات التهريب التي أرهقت اقتصاد البلدين لسنوات.
2. **تنظيم ملف النازحين السوريين:** يمثل هذا الملف الأولوية القصوى للحكومة اللبنانية برئاسة نواف سلام. في المقابل، تضع إدارة الشرع ملف "عودة المواطنين" كهدف وطني لإعادة تحريك العجلة الاقتصادية السورية وتأمين اليد العاملة لورش الإعمار، مما يفتح الباب لتنسيق لوجستي مدعوم دولياً.
3. **العلاقة مع القوى المحلية (ملف حزب الله):** في المنعطف الحالي، يبدو أن دمشق تتبع خطاً مرناً؛ حيث صرح الشيباني من بيروت بأن "المصلحة المتبادلة هي التي تحكم الانفتاح على كافة الأطراف"، دون السماح لهذا الملف بتعطيل العلاقات الرسمية مع مؤسسات الدولة اللبنانية.

---

### ثالثاً: خريطة المنفعة الاقتصادية المتبادلة

الركيزة الحقيقية للتقارب الحالي هي المصلحة الاقتصادية الصرفة. يحتاج كلا البلدين، اللذين يمران بمراحل تعافٍ وهيكلة مالية، إلى رئة اقتصادية مشتركة.

| المحور الاقتصادي | المكاسب اللبنانية المتوقعة | المكاسب السورية المتوقعة |
| :--- | :--- | :--- |
| **حركة الترانزيت والتجارة البينية** | فتح الأسواق البرية للصادرات اللبنانية نحو الخليج والعراق عبر الأراضي السورية بجمارك مخفضة. | استعادة العائدات الجمركية وتنشيط حركة الشحن الداخلي عبر المعابر الحيوية (المصنع، العبودية). |
| **إعادة الإعمار والخدمات** | مشاركة القطاع المصرفي والشركات الإنشائية اللبنانية (بعد إصلاحات السرية المصرفية 2025) في مشاريع الإعمار السورية. | جذب رؤوس الأموال والخبرات اللبنانية لتسريع وتيرة تأهيل المدن والمناطق الصناعية المتضررة. |
| **قطاع الطاقة والـ infrastructure** | الاستفادة من مشاريع الربط الإقليمي لنقل الطاقة عبر شبكات مشتركة مدعومة بقروض دولية. | تفعيل التنسيق لتأمين إمدادات مشتركة من الوقود والطاقة بأسعار تفضيلية وضمن أطر شرعية. |`,
    contentEn: `### Introduction: A New Political Landscape in the Capital of Shared Decisions

The visit of Syrian Foreign Minister Asaad Al-Shaibani to Beirut today (July 2, 2026) and his intensive meetings with Lebanese officials—from President Joseph Aoun and Prime Minister Nawaf Salam to Speaker of Parliament Nabih Berri—mark the dawn of a fundamentally different chapter in bilateral relations. This high-level diplomatic movement is the first of its kind since the administration of Syrian President Ahmad Al-Sharaa took office in early 2025 following the transition of the previous regime, coinciding with the reformist Lebanese administration led by Aoun and Salam.

The relationship is no longer managed through the lens of "ideological axes" or political dominance. Instead, it has clearly transitioned toward Realpolitik (Pragmatism) driven by economic interest, strategic timing, and sovereign parity.

---

### I. Timing and the Regional Context (Why Now?)

This diplomatic shift coincides with massive transitions on both sides of the border, rendering the timing highly critical and strategic:

*   **The Lebanese-Israeli Framework Agreement (Late June 2026):** Lebanon recently signed a US-brokered framework agreement aimed at securing a full Israeli withdrawal, pushing the Lebanese state to assert complete sovereignty and activate its "Shield of the Nation" security plan to control arms.
*   **Syria's New Geopolitical Stance:** The administration of President Ahmad Al-Sharaa demonstrates a clear desire to distance itself from regional military conflicts, declaring military non-intervention in Lebanon and focusing entirely on securing international legitimacy and domestic reconstruction.

---

### II. Main Objectives of the New Era

The current talks center on three primary pillars restructuring bilateral ties:

1.  **Consolidating Shared Sovereignty & Border Control:** Beirut and Damascus are activating joint committees to demarcate borders and crack down on smuggling operations that have drained both economies for years.
2.  **Organizing the Syrian Refugee File:** This file remains the highest priority for the Lebanese government under Nawaf Salam. Concurrently, Al-Sharaa's administration treats the "return of citizens" as a national objective to revitalize Syria's economy and secure labor for reconstruction, opening the door for internationally supported logistical coordination.
3.  **Relations with Local Entities (The Hezbollah File):** Damascus is maintaining a flexible approach. Al-Shaibani stated in Beirut that "mutual interest governs openness to all parties," refusing to let this file disrupt official relations with Lebanese state institutions.

---

### III. The Matrix of Mutual Economic Benefit

The true anchor of this rapprochement is pure economic interest. Both nations, currently undergoing financial restructuring and recovery, require a shared economic lung.

| Economic Pillar | Expected Lebanese Gains | Expected Syrian Gains |
| :--- | :--- | :--- |
| **Transit & Bilateral Trade** | Reopening overland routes for Lebanese exports to the Gulf and Iraq through Syria with reduced customs tariffs. | Reclaiming customs revenues and revitalizing internal shipping through vital border crossings (Masnaa, Abboudieh). |
| **Reconstruction & Services** | Engagement of the Lebanese banking sector and construction firms (following the 2025 banking secrecy reforms) in Syrian reconstruction. | Attracting Lebanese capital and expertise to accelerate the rehabilitation of damaged cities and industrial zones. |
| **Energy & Infrastructure** | Benefiting from regional grid-link projects to transfer energy through joint networks backed by international loans. | Activating coordination to secure mutual fuel and energy supplies at preferential rates within formal, legal frameworks. |`,
    author: {
      nameAr: 'مكتب التحقيقات الاستقصائية',
      nameEn: 'Investigative Bureau',
      titleAr: 'تغطية استقصائية خاصة',
      titleEn: 'Special Investigative Dispatch',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    date: '2026-07-02',
    readTimeAr: '٦ دقائق قراءة',
    readTimeEn: '6 min read',
    isBreaking: false,
    isFeatured: true,
    isPremium: false,
    tags: ['العلاقات_اللبنانية_السورية', 'الواقعية_السياسية', 'أحمد_الشرع', 'نواف_سلام', 'Lebanon_Syria_2026', 'Realpolitik', 'Border_Control'],
    excerpt: 'Lebanese-Syrian Relations: From Ideological Axes or Political Dominance to Realpolitik.',
    hashtags: ['Lebanon_Syria_2026', 'Realpolitik', 'Border_Control'],
    views: 4890
  },
  {
    id: 'gcc-ma-surge-investment-banking-2026',
    category: 'middle-east',
    categories: ['middle-east', 'arab-markets', 'markets'],
    titleAr: 'طفرة الاندماج والاستحواذ في الخليج: بنوك الاستثمار العالمية توسع فرقها مراهنةً على نمو طويل الأجل',
    titleEn: 'GCC M&A Surge: Global Investment Banks Expand Teams Betting on Long-Term Growth',
    summaryAr: 'على خلاف التوقعات المتشائمة التي واكبت اندلاع التوترات الجيوسياسية الأخيرة في منطقة الشرق الأوسط مطلع هذا العام، أظهر قطاع الصفقات والاندماجات في دول مجلس التعاون الخليجي مرونة استثنائية. وبدلاً من التباطؤ، شهد نشاط إبرام الصفقات قفزة نوعية، مما دفع كبرى بنوك "وول ستريت" والمؤسسات المالية العالمية إلى تغيير استراتيجياتها التحفظية والاتجاه نحو تكثيف التوظيف وتوسيع فرق عملها الإقليمية، مدفوعة برؤية متفائلة ومراهنة جادة على نمو اقتصادي مستدام طويل الأجل.',
    summaryEn: 'Contrary to the pessimistic forecasts that accompanied the recent geopolitical tensions in the Middle East at the beginning of this year, the mergers and acquisitions (M&A) sector in the GCC has demonstrated exceptional resilience. Instead of a slowdown, deal-making activity experienced a qualitative leap, prompting Wall Street giants and global financial institutions to pivot from conservative strategies toward intensive hiring and expanding regional teams, driven by an optimistic outlook and a serious bet on sustainable, long-term economic growth.',
    excerptAr: 'طفرة استثنائية في قطاع الاندماجات والصفقات بالخليج مطلع 2026 تدفع بنوك وول ستريت لتكثيف التوظيف وتوسيع فرق عملها الإقليمية مراهنة على نمو اقتصادي مستدام.',
    excerptEn: 'An exceptional surge in Gulf M&A deals in early 2026 prompts Wall Street banks to expand regional teams and accelerate hiring, betting on sustainable long-term economic growth.',
    contentAr: `على خلاف التوقعات المتشائمة التي واكبت اندلاع التوترات الجيوسياسية الأخيرة في منطقة الشرق الأوسط مطلع هذا العام، أظهر قطاع الصفقات والاندماجات في دول مجلس التعاون الخليجي مرونة استثنائية. وبدلاً من التباطؤ، شهد نشاط إبرام الصفقات قفزة نوعية، مما دفع كبرى بنوك "وول ستريت" والمؤسسات المالية العالمية إلى تغيير استراتيجياتها التحفظية والاتجاه نحو تكثيف التوظيف وتوسيع فرق عملها الإقليمية، مدفوعة برؤية متفائلة ومراهنة جادة على نمو اقتصادي مستدام طويل الأجل.

### أرقام قياسية: الذكاء الاصطناعي والبنية التحتية يقودان الصفقات
وفقاً للبياتها الصادرة عن "بلومبرغ"، سجلت قيمة الصفقات التي شاركت فيها جهات خليجية ارتفاعاً قياسياً بنسبة 200% خلال النصف الأول من العام الحالي، لتصل إلى نحو 300 مليار دولار.

وقد جاء هذا الانتعاش القوي مدفوعاً بعدة ركائز أساسية:
* **طفرة الذكاء الاصطناعي:** ضخ استثمارات ضخمة في شركات عالمية رائدة تقود هذا القطاع مثل "أوبن إيه آي" (OpenAI) و"أنثروبيك" (Anthropic).
* **الإنفاق الدفاعي والأمني:** دفعت التوترات المتصاعدة في المنطقة الحكومات إلى تسريع خطط الإنفاق على البنية التحتية الدفاعية والأمن السيبراني واللوجستيات.
* **الأمن الغذائي والطاقة:** تزايد الزخم في القطاعات الاستراتيجية التي تتطلب صفقات تمويلية ضخمة عابرة للحدود وهياكل مالية معقدة.

وعلى صعيد الإيرادات، كشفت بيانات "ديلوجيك" (Dealogic) عن ارتفاع إيرادات بنوك الاستثمار من أعمالها في الشرق الأوسط بنسبة 5% لتصل إلى 619 مليون دولار، مدعومة بقفزة بلغت 55% في رسوم صفقات الاندماج والاستحواذ، وهو ما عوض التراجع الملحوظ في إيرادات أسواق إصدار الأسهم والاكتتابات العامة التي تأجل بعضها بسبب تقلبات الأسواق.

### وول ستريت تكثف حضورها: موجة توظيف واسعة في دبي والمنطقة
أدى هذا الحراك المالي غير المتوقع إلى تعديل بنوك استثمارية عالمية لتوقعاتها السنوية؛ فالعديد من المؤسسات التي كانت تخشى عدم تحقيق أهدافها باتت الآن على المسار الصحيح، بل وتعمل على صفقات استثمارية كبرى داخل وخارج المنطقة.

وقد انعكس ذلك في حركة توظيف واسعة النطاق لتعزيز المكاتب الإقليمية، لا سيما في مركز دبي المالي العالمي وأبوظبي:
* **باركليز:** نقل مصرفي الطاقة البارز "جورج تانر" من لندن إلى دبي لتوسيع الحضور الإقليمي للبنك.
* **بنوك عالمية كبرى:** تعمل مؤسسات مثل "جيه بي مورغان"، "دويتشه بنك"، "ستاندرد تشارترد"، "روتشايلد آند كو" على استقطاب كفاءات قيادية جديدة.
* **سيتي غروب ولازارد:** واصلت المؤسستان الإعلان المستمر عن وظائف شاغرة عبر المنصات المهنية لتعزيز فرق عملهما.
* **التوسع الآسيوي والقانوني:** يسعى أحد البنوك الصينية الكبرى لتوظيف مصرفيين في دبي لدعم الإدراجات المزدوجة بين بورصة هونغ كونغ والأسواق الإماراتية. كما وسعت مكاتب محاماة دولية مثل "سكادام" وجودها في أبوظبي.

> "تتمتع المنطقة بأسس اقتصادية قوية وآفاق نمو طويلة الأجل."
> — ماجد جلفار، المسؤول التنفيذي لدى "دويتشه بنك" في الإمارات

> "يؤدي الشرق الأوسط دوراً متزايد الأهمية في تدفقات رؤوس الأموال العالمية."
> — راجيش سينغي، ستاندرد تشارترد

### صناديق الثروة الخليجية.. قاطرة الاستثمار العالمي
لم تتأثر صناديق الثروة السيادية في الخليج بالأجواء الجيوسياسية، بل واصلت اقتناص الفرص عالمياً مستندة إلى أصول تقترب قيمتها الإجمالية من 5 تريليونات دولار.
التزمت الصناديق الخليجية باستثمارات قياسية بلغت 53.9 مليار دولار منذ بداية العام الحالي. وتوزعت هذه الاستثمارات جغرافياً وقطاعياً على النحو التالي:
* **الولايات المتحدة:** حظيت بنصف الاستثمارات وركزت على التكنولوجيا والذكاء الاصطناعي.
* **الصين وبريطانيا:** استقطبتا اهتماماً متزايداً في قطاعات البنية التحتية والطاقة المتجددة.
* **صندوق مبادلة السيادي:** تصدر القائمة بحجم استثمارات بلغ 15.2 مليار دولار، تلاه نشاط قوي ومكثف لـ 7 صناديق سيادية خليجية أخرى.

### مشاريع استراتيجية كبرى في السعودية والإمارات والكويت
بالتوازي مع الاستثمارات الخارجية، تقود الحكومات الخليجية مشاريع داخلية عملاقة لإعادة صياغة المشهد الاقتصادي:
* **دولة الإمارات:** تعمل على خطة استراتيجية لتوسيع موانئها الشرقية الواقعة على ساحل خليج عُمان لتقليل الاعتماد على مضيق هرمز. كما تقود شركة "لِعماد" في أبوظبي مع شركاء محليين ودوليين مشروعاً يستهدف بنية تحتية بقيمة 30 بيان دولار.
* **المملكة العربية السعودية:** يمضي مسؤولو "أرامكو" قُدماً في واحدة من أكثر خطط الخصخصة طموحاً في تاريخ الشركة لتعزيز الميزانية العمومية، وسط توقعات بأن تجمع هذه الصفقات ما يصل إلى 35 مليار دولار.
* **دولة الكويت:** تشهد منافسة محتدمة بين كبار المستثمرين العالميين (مثل "بلاك روك" عبر ذراعها "GIP" ومجموعة "بروكفيلد") للفوز بحصة قيمتها 7.5 مليار دولار في شبكة خطوط الأنابيب التابعة لشركة النفط الحكومية.

### مرونة مصرفية مستدامة وتحديات قائمة
على الرغم من الطفرة الحالية، تشير التقارير التحليلية، ومنها تقرير شركة "بي إم آي" (BMI) التابعة لـ"فيتش سوليوشنز"، إلى أن المخاطر لم تختفِ تماماً بل أصبحت أكثر تركيزاً:
* **صلابة الودائع:** أظهر القطاع المصرفي في دول مجلس التعاون مرونة أعلى من المتوقع؛ حيث ساعدت التدفقات الحكومية والدعم السيادي وحزم السيولة في استقرار الأوضاع ومنع أي هروب جماعي للرساميل.
* **تركيز المخاطر:** باتت المخاطر تتركز في مصادر التمويل الحساسة لثقة المستثمرين، مثل ودائع القطاع الخاص وغير المقيمين، لا سيما في الأسواق الأكثر اعتماداً على التمويل الأجنبي مثل البحرين وقطر.
* **تحدي استقطاب الكفاءات:** أصبح المرشحون للوظائف القيادية أكثر انتقائية؛ حيث باتت اعتبارات السلامة الشخصية والرؤية طويلة الأجل وحزم التعويضات التنافسية تلعب دوراً حاسماً في اتخاذ القرار.
* **توقعات نمو الائتمان:** يُتوقع أن يتباطأ نمو القروض في دول الخليج خلال الفترة المقبلة بحدود عام 2026، وهو تباطؤ يأخذ طابعاً هيكلياً (كما في السوق السعودية نتيجة تشديد معايير الإقراض وتأخر بعض القرارات الاستثمارية غير النفطية)، في حين يواصل القطاع المصرفي الإماراتي تفوقه بدعم من التنوع الاقتصادي القوي.`,
    contentEn: `Contrary to the pessimistic forecasts that accompanied the recent geopolitical tensions in the Middle East at the beginning of this year, the mergers and acquisitions (M&A) sector in the GCC has demonstrated exceptional resilience. Instead of a slowdown, deal-making activity experienced a qualitative leap, prompting Wall Street giants and global financial institutions to pivot from conservative strategies toward intensive hiring and expanding regional teams, driven by an optimistic outlook and a serious bet on sustainable, long-term economic growth.

### Record Numbers: AI and Infrastructure Driving Deals
According to data released by Bloomberg, the value of deals involving Gulf entities recorded a record increase of 200% during the first half of this year, reaching approximately $300 billion.

This strong recovery was driven by several key pillars:
- **AI Boom:** Injecting massive investments into leading global companies in this sector, such as OpenAI and Anthropic.
- **Defense and Security Spending:** Rising tensions in the region prompted governments to accelerate spending plans on defense infrastructure, cybersecurity, and logistics.
- **Food Security and Energy:** Growing momentum in strategic sectors requiring large, cross-border financing deals and complex financial structures.

On the revenue front, Dealogic data revealed that investment banks' revenues from their Middle East operations rose by 5% to $619 million, supported by a 55% jump in M&A advisory fees, offsetting a notable decline in equity capital markets and IPO revenues, some of which were delayed due to market volatility.

### Wall Street Steps Up Presence: Extensive Hiring Wave in Dubai and the Region
This unexpected financial momentum led global investment banks to adjust their annual forecasts; many institutions that feared missing their targets are now on track and working on major transactions inside and outside the region.

This was reflected in a broad hiring drive to strengthen regional offices, particularly in the Dubai International Financial Centre (DIFC) and Abu Dhabi:
- **Barclays:** Relocated prominent energy banker George Tanner from London to Dubai to expand the bank's regional presence.
- **Major Global Banks:** Institutions like JPMorgan, Deutsche Bank, Standard Chartered, and Rothschild & Co are attracting new leadership talent.
- **Citigroup and Lazard:** Both institutions continued to advertise vacancies across professional platforms to bolster their teams.
- **Asian and Legal Expansion:** A major Chinese bank is seeking to hire bankers in Dubai to support dual listings between the Hong Kong Stock Exchange and UAE markets. International law firms like Skadden have also expanded their presence in Abu Dhabi.

> "The region enjoys strong economic fundamentals and long-term growth prospects."
> — Majid Jalfar, Executive at Deutsche Bank in the UAE

> "The Middle East is playing an increasingly important role in global capital flows."
> — Rajesh Singhi, Standard Chartered

### Gulf Wealth Funds: The Engine of Global Investment
Gulf sovereign wealth funds were unaffected by the geopolitical climate, continuing to seize opportunities globally, backed by assets approaching a total value of $5 trillion.
Gulf funds committed record investments of $53.9 billion since the beginning of this year, distributed geographically and sectorally as follows:
- **United States:** Received half of the investments, focusing on technology and artificial intelligence.
- **China and the UK:** Attracted growing interest in infrastructure and renewable energy sectors.
- **Mubadala Sovereign Fund:** Led the list with an investment volume of $15.2 billion, followed by strong and intensive activity from 7 other Gulf sovereign funds.

### Mega Strategic Projects in Saudi Arabia, UAE, and Kuwait
In parallel with foreign investments, Gulf governments are leading giant domestic projects to reshape the economic landscape:
- **UAE:** Working on a strategic plan to expand its eastern ports on the Gulf of Oman coast to reduce dependence on the Strait of Hormuz. In Abu Dhabi, L'Imad is leading a $30 billion infrastructure project with local and international partners.
- **Saudi Arabia:** Aramco officials are moving ahead with one of the most ambitious privatization plans in the company's history to strengthen the balance sheet, with expectations that these deals will raise up to $35 billion.
- **Kuwait:** Fierce competition among major global investors (such as BlackRock via its GIP arm and Brookfield Group) to acquire a $7.5 billion stake in the state oil company's pipeline network.

### Sustained Banking Resilience and Existing Challenges
Despite the current boom, analytical reports, including one by BMI (a Fitch Solutions company), indicate that risks have not completely vanished but have become more concentrated:
- **Deposit Solidity:** The GCC banking sector showed higher-than-expected resilience; government inflows, sovereign support, and liquidity packages helped stabilize conditions and prevent any mass capital flight.
- **Risk Concentration:** Risks are now concentrated in confidence-sensitive funding sources, such as private sector and non-resident deposits, especially in markets more reliant on foreign funding like Bahrain and Qatar.
- **Talent Attraction Challenge:** Candidates for leadership positions have become more selective; personal safety considerations, long-term vision, and competitive compensation packages play a crucial role in decision-making.
- **Credit Growth Forecast:** Loan growth in Gulf countries is expected to slow down in the coming period toward 2026, a structural slowdown (as in the Saudi market due to tighter lending standards and delays in some non-oil investment decisions), while the UAE banking sector continues to outperform, supported by strong economic diversification.`,
    author: {
      nameAr: 'معن برازي',
      nameEn: 'Maan Barazy',
      titleAr: 'رئيس التحرير والمدير العام',
      titleEn: 'Editor-in-Chief & General Manager',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
    },
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200',
    date: '2026-07-02',
    readTimeAr: 'دقائق 6',
    readTimeEn: '6 min read',
    isBreaking: true,
    isFeatured: true,
    isPremium: false,
    tags: ['الخليج', 'بنوك_الاستثمار', 'الاندماج_والاستحواذ', 'التوظيف_المالي', 'GCC_M&A', 'Investment_Banks', 'Gulf_Economies'],
    views: 2940
  },
  {
    id: 'lebanon-cement-quarries-scandal-2026',
    category: 'lebanon',
    categories: ['lebanon', 'exclusives'],
    titleAr: 'ملاحظات على فضائح ملف مقالع شركات الترابة: حبيب معلوف',
    titleEn: 'Notes on the Cement Quarries Dossier Scandal: Habib Maalouf',
    summaryAr: 'لم تحسن وزارة البيئة ادارة ملف استراتيجي وحساس مثل المقالع والكسارات وشركات الترابة. وقد تسبب ضعف (وربما تواطؤ) الإدارة في وزارة البيئة في إطالة فترة الفراغ والفوضى وعدم اتخاذ قرارات سليمة في ارتفاع أسعار الترابة من 90 الى 400 دولار للطن الواحد! كما ورطت مجلس الوزراء بقرارات غير قانونية ولا استراتيجية وغير مسبوقة في إدارة هذا الملف، لاسيما القرار الصادر بتاريخ 23/4/2026. فما الذي حصل وكيف وصلنا الى هنا؟ ومن يتحمل المسؤولية الأكبر فيما حصل من فوضى ومخالفات وارتكابات؟',
    summaryEn: 'The Ministry of Environment has failed to properly manage the highly strategic and sensitive file of quarries, crushers, and cement companies. The weakness (and perhaps complicity) of the administration prolonged the vacuum and chaos, leading to a surge in cement prices from $90 to $400 per ton! It also entangled the Cabinet in illegal, unstrategic, and unprecedented decisions, particularly the decision issued on April 23, 2026. What happened, and how did we get here? Who bears the greatest responsibility for this chaos, violations, and wrongdoings?',
    excerptAr: 'حبيب معلوف يكتب بالتفصيل عن فضائح وكواليس ملف مقالع شركات الترابة والكسارات في لبنان وكيف ارتفعت الأسعار بشكل فاحش مع تغييب الرقابة والتهرب من الرسوم الكبيرة.',
    excerptEn: 'Habib Maalouf exposes the backroom deals of Lebanon’s cement quarries, highlighting massive price hikes, absent environmental regulations, and tax evasion.',
    contentAr: `لم تحسن وزارة البيئة ادارة ملف استراتيجي وحساس مثل المقالع والكسارات وشركات الترابة. وقد تسبب ضعف (وربما تواطؤ) الإدارة في وزارة البيئة في إطالة فترة الفراغ والفوضى وعدم اتخاذ قرارات سليمة في ارتفاع أسعار الترابة من 90 الى 400 دولار للطن الواحد! كما ورطت مجلس الوزراء بقرارات غير قانونية ولا استراتيجية وغير مسبوقة في إدارة هذا الملف، لاسيما القرار الصادر بتاريخ 23/4/2026. فما الذي حصل وكيف وصلنا الى هنا؟ ومن يتحمل المسؤولية الأكبر فيما حصل من فوضى ومخالفات وارتكابات؟

* **كانت وزيرة البيئة بالتعاون مع مدير عام البيئة قد أعلنت** في اجتماعها الأول مع لجنة البيئة النيابية منذ أكثر من عام انها طلبت الغاء قرار مجلس الوزراء السابق (الذي لم ينفذه وزير البيئة السابق لعدم اقتناعه به) وانها تريد الترخيص للشركات بالطريقة التي حصلت مؤخرا. فلماذا حصل هذا التأخير حتى تضاعفت الأسعار في السوق السوداء (معروف من الذي استفاد منها)؟!

* **تتحمل وزيرة البيئة بصفتها رئيسة المجلس الوطني للمقالع** المسؤولية الاولى عن ادارة هذا الملف بوصفها المؤتمنة على ديمومة الموارد وحماية البيئة قبل اي شيء آخر.

* **لماذا اقترحت، حسب مطلب الشركات التاريخي، بالترخيص عشر سنوات لها،** وهو خيار استراتيجي بعيد المدى، من دون أن تستند إلى أي رؤية استراتيجية ومن دون طلب تقييم بيئي استراتيجي لهذا الملف، تقيّم فيه الجدوى الاقتصادية والبيئية الوطنية لعمله بالمقارنة مع الكلفة الصحية والبيئية ورفض السكان المحيطين وبالمقارنة مع خيارات أخرى كالسماح بالاستيراد؟!

* **تم الاحتيال على القوانين في الترخيص** والاستناد الى قرار لمجلس الوزراء العام 1997 منتهي الصلاحية … للترخيص لشركات الترابة، وتجاوز المرسوم التنظيمي النافذ والنافي لغيره رقم 8803 الصادر بتاريخ 4/10/2002 والمرفق به مخطط توجيهي ليست مقالع شركات الترابة داخله!

* **في قرار المجلس الوطني الموقع من وزيرة البيئة والمدير العام معا؛** تم اقتراح تشكيل لجنة وزارية تتعلق بتصدير مادة الترابة! وهي سابقة خطيرة لوزارة البيئة تشجع فيها على المدى البعيد على اقتلاع المزيد من جبال لبنان، وقد تحفظ على هذه المادة ممثل وزارة الصناعة نفسها!

* **لم تشترط الوزارة ولا المجلس الوطني ولا الحكومة في قرارها (في أقل تقدير)** على الشركات طالبة الترخيص أن يسددوا أوامر التحصيل ودفع الكفالات المصرفية اللازمة والتي تقدر بمئات ملايين الدولارات! علما أن دراسة برنامج الأمم المتحدة الانمائي، بناء على مسح الجيش بين عامي 2007 و 2020 ، كانت قد قدرت كلفة التدهور البيئي والاضرار واعادة التأهيل لمقالع شركات الترابة الثلاثة العاملة في لبنان بمساحة ما يقارب الثلاثة ملايين متر مربع و 30 مليون متر مكعب، لتحصيل ما يقارب 370 مليون دولار اميركي، من دون تقدير كلفة اختفاء الينابيع وتلوث المياه في مناطق المقالع والتي طالما تحفظت وزارة الطاقة والمياه على إعطاء الترخيص فيها! فلماذا لم تشترط تحصيلها قبل الترخيص؟!

* **بالرغم من الفورة الإعلامية شبه اليومية للاعلان عن اي حركة،** لم يكن هناك أي شفافية في التعامل مع ملف حساس ومركزي في وزارة البيئة كالمقالع والكسارات وحجم مخالفاتها والاعلان عن أرقام أوامر التحصيل وحجم الأضرار والقرارات ذات الصلة، ولا حصل الإعلان عن المقالع التي لا تزال تعمل دون تراخيص والمطالبة باقفالها والتحصيل منها عائدات بمليارات الدولارات!

* **تعمل شركات الترابة في لبنان ضمن سوق محلي محمي** بقرار منذ العام 1993 يمنع استيراد الترابة دون اجازة مسبقة من وزارة الصناعة. لذا تتحمل وزارة الصناعة ايضا مسؤولية تقييم هذا الخيار مع العلم انه قبل الأزمة الأخيرة المفتعلة كان طن الترابة يباع بما يقارب 90 دولار في السوق المحلي، في حين كانت الشركات تصدّر الترابة بنصف سعر السوق المحلي هذا تقريبا! وبغض النظر عن ضريبة الtva المعروفة على سعر البيع، تستوفي المالية ثلاثة دولارات فقط على الطن! فاين يذهب نصف فرق سعر الطن؟! فلو وضعت المالية عشرة أضعاف الضريبة على الطن المستورد لبقي سعر السوق ارخص على المواطن والمستهلك واستفادة الطبيعة والخزينة والصحة العامة أكثر بكثير. مع العلم أن الدولة السورية بعد الحرب تستورد الترابة بنصف السعر المحلي عندنا تقريبا!

* **الشروط البيئية التي وضعتها وزارة البيئة و الملحقة بقرار مجلس الوزراء المذكور مضحكة** لاسيما "الحزام الاخضر" و"كاسر الرياح" و"التعويض البيئي" … أمام عمليات اقتلاع الجبال والتسبب بأمراض قاتلة لسكان المحيط! وكذلك قضية "الاستثمار التأهيلي" المخادعة! فمن يضمن حسن التنفيذ؟!

* **حسب التجربة التاريخية، الرقابة البيئية معدومة على عمل هذا القطاع،** لا بل أن المدير العام للبيئة (ممثل الدولة العميقة في وزارة البيئة) الذي يعتبر المساهم الأكبر في صياغة مخرجات قرارات المجلس الوطني ومجلس الوزراء الاخيرة، هو نفسه من كان يخالف القرارات وشروط ومعايير المراقبة تاريخيا، اذ يسمح للشركات باستيراد البتروكوك بنسبة كبريت 6% ؛ بينما القرارات الوزارية ذات الصلة لا تسمح بنسبة تتجاوز ال 3%، مع ما لهذا الأمر من مكاسب مادية للشركات واضرار خطيرة على صحة المجتمعات والطبيعة. لا بل اثبت تحقيق التفتيش المركزي العام 2008 (رقم 166) التجاوزات الكثيرة والكبيرة التي قام بها مدير عام البيئة ومنها تغيير قرار وزير البيئة المتعلق بتحديد المواصفات والنسب الخاصة للحد من تلوث الهواء والمياه والتربة، وأصدر قرارا آخر الذي سمح بموجبه بزيادة الحدود المسموحة للملوثات في معامل الترابة! فكيف يسلم من جديد وضع الشروط والمراقبة؟!

* **انطلاقا من كل ذلك على الحكومة أن تعيد النظر بقراراتها الأخيرة** بغض النظر عن نتيجة الطعن (المحق) بها أمام مجلس شورى الدولة. وعلى اللجان النيابية المعنية أن تدقق أكثر في الأرقام والمعطيات لكي تعرف كيف تراقب وتحاسب وان تعين لجان تحقيق في كل ما تقدم.`,
    contentEn: `The Ministry of Environment has failed to properly manage a strategic and sensitive file such as quarries, crushers, and cement companies. The weakness (and perhaps complicity) of the administration within the Ministry of Environment prolonged the vacuum and chaos, leading to a surge in cement prices from $90 to $400 per ton! It also entangled the Cabinet in illegal, unstrategic, and unprecedented decisions, particularly the decision issued on April 23, 2026. What happened, and how did we get here? Who bears the greatest responsibility for this chaos, violations, and wrongdoings?

* **The Minister of Environment, in cooperation with the Director General of Environment, had announced** in her first meeting with the Parliamentary Environment Committee over a year ago that she had requested the cancellation of the previous Cabinet decision (which the former minister had refused to implement due to lack of conviction) and that she wanted to license the companies in the manner recently adopted. Why then did this delay occur, allowing prices to double on the black market (it is well known who benefited)?!

* **The Minister of Environment, in her capacity as President of the National Council for Quarries, bears the primary responsibility** for managing this file as the trustee for resource sustainability and environmental protection above all else.

* **Why did she propose a ten-year licensing period—a long-term strategic choice** aligned with the companies' historic demands—without basing it on any strategic vision and without requesting a Strategic Environmental Assessment (SEA)? Such an assessment would evaluate the national economic and environmental feasibility of operations compared to health and environmental costs, local residents' rejection, and alternative options such as permitting imports.

* **Regulations were bypassed by relying on an expired 1997 Cabinet decision** to license cement companies, completely disregarding the active and exclusive Regulatory Decree No. 8803 (dated October 4, 2002) and its attached master plan, which does not include the quarries of these cement companies!

* **In the National Council decision signed by both the Minister of Environment and the Director General,** a proposal was made to form a ministerial committee regarding the export of cement! This is a dangerous precedent for the Ministry of Environment, encouraging the long-term quarrying of more Lebanese mountains—a clause to which even the Ministry of Industry representative objected!

* **The Ministry, the National Council, and the Government did not mandate that applicant companies** pay outstanding collection orders and bank guarantees, estimated at hundreds of millions of dollars! A UNDP study, based on a Lebanese Army survey between 2007 and 2020, estimated the environmental degradation, damage, and rehabilitation costs for the three operating cement companies in Lebanon (spanning ~3 million square meters and 30 million cubic meters) at approximately $370 million. This excludes the cost of disappearing water springs and water pollution in quarry areas, which the Ministry of Energy and Water has long cited to withhold licensing. Why were these dues not collected before licensing?

* **Despite almost daily media campaigns for every minor activity,** there has been a total lack of transparency in handling this central file. The ministry failed to announce collection order figures, damage assessments, or relevant decisions. It also failed to disclose operating unlicensed quarries, demand their closure, and collect billions of dollars in dues from them!

* **Cement companies in Lebanon operate in a protected local market** by a 1993 decision banning cement imports without prior approval from the Ministry of Industry. Therefore, the Ministry of Industry also bears the responsibility of evaluating this option. Before the artificial crisis, a ton of cement sold for $90 locally, while companies exported it at nearly half that price! Apart from the standard VAT, the Ministry of Finance collects only $3 per ton! Where does the other half of the price difference go? If the Ministry of Finance placed a tenfold tax on imported cement, the market price would remain cheaper for the consumer, benefiting nature, the treasury, and public health. In comparison, post-war Syria imports cement at nearly half our local price!

* **The environmental conditions set by the Ministry of Environment and appended to the Cabinet decision**—specifically "green belts," "windbreaks," and "environmental compensation"—are laughable when compared to the active leveling of mountains and lethal diseases inflicted on neighboring communities. The concept of "rehabilitative investment" is highly deceptive, and who guarantees proper implementation?

* **Historically, environmental inspection is non-existent.** The Director General of Environment (a representative of the deep state in the ministry), who was a major contributor to drafting the recent National Council and Cabinet decisions, has historically violated regulations. He has allowed companies to import petcoke with a 6% sulfur content, despite ministerial decisions capping it at 3%, generating massive financial gains for corporations at the cost of public health. A Central Inspection report from 2008 (No. 166) confirmed extensive violations by the Director General, including altering a ministerial decision on pollution limits to allow higher emissions from cement factories. How can they be trusted with setting conditions and monitoring again?

* **Consequently, the government must reconsider its latest decisions,** regardless of the outcome of the rightful appeal before the State Council. Relevant parliamentary committees must scrutinize the figures and data to properly monitor, hold actors accountable, and establish investigative committees into these matters.`,
    author: {
      nameAr: 'حبيب معلوف',
      nameEn: 'Habib Maalouf',
      titleAr: 'محلل شؤون البيئة',
      titleEn: 'Environmental Affairs Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392c?auto=format&fit=crop&q=80&w=1200',
    date: '2026-07-02',
    readTimeAr: 'دقائق 8',
    readTimeEn: '8 min read',
    isBreaking: false,
    isFeatured: false,
    isPremium: true,
    tags: ['البيئة', 'الكسارات', 'مقالع_الترابة', 'الفسااد', 'لبنان', 'Cement_Quarries', 'Lebanon_Environment'],
    views: 1845
  },
  {
    id: 'south-lebanon-secret-annex-investigation',
    category: 'editor-desk',
    categories: ['editor-desk', 'lebanon', 'research-reports', 'exclusives'],
    titleAr: 'خفايا الترتيبات الأمنية في جنوب لبنان وما وراء "الملحق السري"',
    titleEn: 'Behind the Scenes of Security Arrangements in South Lebanon & The "Secret Annex"',
    summaryAr: 'في أواخر يونيو/حزيران 2026، وقع لبنان وإسرائيل في واشنطن على "اتفاق إطار" من 14 بنداً برعاية أميركية، في خطوة تهدف إلى إعادة صياغة المشهد الأمني في جنوب لبنان بعد أشهر طويلة من الصراع المدمر. ورغم الإعلان الرسمي عن الخطوط العريضة للاتفاق، التي تؤكد على استعادة سيادة الدولة اللبنانية، تركزت الأنظار على الوثيقة التي بقيت خارج التداول العلني: الملحق الأمني السري.',
    summaryEn: 'In late June 2026, Lebanon and Israel signed a US-brokered 14-point framework agreement in Washington to reshape South Lebanon’s security landscape. While public statements assert Lebanese state sovereignty, attention has focused on the unreleased security annex.',
    excerptAr: 'يعكس الملحق السري للاتفاق تحولاً من منطق "وقف إطلاق النار" التقليدي إلى منطق "إعادة هندسة أمنية" شاملة. واشنطن لن ترسل جنودها لتسيير دوريات في قرى الجنوب، لكنها من خلال آلية الإشراف والمراقبة ومجموعة التنسيق (MCG4L)، ستكون الحاضر الأكبر في كل قرار ميداني.',
    excerptEn: 'The unreleased security annex shifts the paradigm from a traditional ceasefire to a comprehensive security engineering. While Washington won’t patrol southern villages directly, it remains heavily present through the MCG4L.',
    contentAr: `في أواخر يونيو/حزيران 2026، وقع لبنان وإسرائيل في واشنطن على "اتفاق إطار" من 14 بنداً برعاية أميركية، في خطوة تهدف إلى إعادة صياغة المشهد الأمني في جنوب لبنان بعد أشهر طويلة من الصراع المدمر. ورغم الإعلان الرسمي عن الخطوط العريضة للاتفاق، التي تؤكد على استعادة سيادة الدولة اللبنانية، تركزت الأنظار على الوثيقة التي بقيت خارج التداول العلني: الملحق الأمني السري. 

يعكس الملحق السري للاتفاق تحولاً من منطق "وقف إطلاق النار" التقليدي إلى منطق "إعادة هندسة أمنية" شاملة. واشنطن لن ترسل جنودها لتسيير دوريات في قرى الجنوب، لكنها من خلال آلية الإشراف والمراقبة ومجموعة التنسيق (MCG4L)، ستكون الحاضر الأكبر في كل قرار ميداني.

في المحصلة، يضع هذا الملحق الدولة اللبنانية ومؤسستها العسكرية أمام اختبار تاريخي: إما النجاح في فرض سيادة أحادية وإدارة المناطق التجريبية بدعم أميركي ودولي، أو مواجهة آليات "الدفاع الاستباقي" التي احتفظت بها إسرائيل ضمن نصوص الملحق غير المعلنة.

فما هي هندسة الترتيبات الأمنية الجديدة المفروضة في الجنوب؟ وكيف تعامل هذا الملحق مع الدور الأميركي؟ وهل تتجه واشنطن فعلياً لنشر قوات برية على الأراضي اللبنانية؟

### هندسة الجنوب: ماذا يتضمن "الملحق السري"؟

تُشير التسريبات المتقاطعة للوثائق والمصادر الدبلوماسية إلى أن الملحق الأمني السري — الذي أُبقي طي الكتمان بطلب من الحكومة اللبنانية لتجنب التداعيات السياسية الداخلية — يعيد رسم قواعد الاشتباك بشكل جذري. ولا يعتمد الملحق على الجداول الزمنية الكلاسيكية، بل يربط التطورات الميدانية بـ "الإنجازات الأمنية". إن "مجموعة التنسيق العسكري للبنان" المقترحة (MCG4L) هي آلية رسمية بين دولتين تُسهّل التنسيق المباشر بين الجيش اللبناني والجيش الإسرائيلي تحت إشراف أميركي.  الترتيب اللبناني هو في جوهره نسخة عُدّلت بشكل صارم، وجرى تعزيز آليات تنفيذها بقوة، لقرار مجلس الأمن الدولي رقم 1701.

تتركز الترتيبات الأمنية في الملحق حول النقاط التالية:

* **الانسحاب المشروط (Conditions-Based Withdrawal):** لا يتضمن الاتفاق جدولاً زمنياً ثابتاً لانسحاب القوات الإسرائيلية. بدلاً من ذلك، يرتبط الانسحاب بمدى قدرة الجيش اللبناني على تنفيذ عمليات تجريد الفصائل المسلحة (وتحديداً حزب الله) من سلاحها في مناطق محددة. 
* **المناطق التجريبية (Pilot Zones):** يتم إدخال الجيش اللبناني تدريجياً إلى ما يُعرف بـ "المناطق التجريبية" جنوب نهر الليطاني. ولا يُسمح بالانتقال إلى مناطق جديدة إلا بعد تحقق إسرائيل والأطراف الراعية من إخلاء هذه المناطق من البنى التحتية العسكرية غير الرسمية. 
* **الخط الأصفر وحرية الحركة:** يُقر الملحق للإسرائيليين بهامش من "الحرية العملياتية" للتدخل ضد ما يُصنف كـ "تهديدات فورية ومباشرة" داخل منطقة الشريط الأمني (الخط الأصفر)، إلى حين استكمال نقل المسؤولية الكاملة للجيش اللبناني. 

### حقيقة الدور الأميركي: إشراف مباشر أم قوات برية؟

يطرح التداخل الأميركي العميق في هذا الاتفاق تساؤلات جوهرية حول طبيعة التواجد العسكري لواشنطن في جنوب لبنان. بالعودة إلى بنود الاتفاق الإطاري وتسريبات الملحق السري، يمكن تفكيك الدور الأميركي على النحو التالي:

#### 1. قوة إشراف وتحقق (Supervising & Verification Force):
نعم، طلبت الولايات المتحدة — ووافق الطرفان — على أن تلعب دور "المشرف المباشر" على تنفيذ الاتفاق. ينص الملحق السري على تأسيس مجموعة التنسيق العسكري للبنان (MCG4L)، وهي غرفة عمليات مشتركة تعمل على مدار الساعة وتضم ممثلين عن الجيشين اللبناني والإسرائيلي، وتخضع لتسهيل وإشراف أميركي مباشر. تتولى هذه المجموعة فض النزاعات، ومراقبة الالتزام بنزع السلاح، وإدارة التحركات الميدانية لمنع الاحتكاك. 

#### 2. حقيقة نشر القوات البرية (Ground Troops):
رغم الدور الإشرافي الصارم، لم تطلب الولايات المتحدة نشر "قوات برية قتالية" (Combat Ground Troops) على الأراضي اللبنانية، ولا ينص الملحق السري على إقامة قواعد عسكرية أميركية في الجنوب. المقاربة الأميركية تعتمد على استراتيجية "القيادة من الخلف" وتفويض المهام:
* الاعتماد الحصري على الجيش اللبناني كقوة التدخل البرية الوحيدة المخولة بفرض الأمن واستلام الأرض. 
* توفير غطاء جوي واستخباري (عبر التحقق من طرف ثالث).
* دعم مالي وعسكري أميركي مكثف (رُصد له مبدئياً نحو 100 مليون دولار) لتمكين الجيش اللبناني لوجستياً وعملياتياً لتنفيذ بنود الملحق.`,
    contentEn: `In late June 2026, Lebanon and Israel signed a US-brokered 14-point framework agreement in Washington, aiming to reshape the security landscape in South Lebanon after long months of devastating conflict. While public declarations stressed the restoration of Lebanese state sovereignty, close scrutiny focused on the document that remained outside public circulation: the Secret Security Annex.

The Secret Annex of the agreement reflects a major paradigm shift from a traditional "ceasefire" to a comprehensive "security engineering." Washington will not send boots on the ground to patrol southern villages; instead, through the oversight and verification mechanism of the Military Coordination Group for Lebanon (MCG4L), it will be the most significant presence in every tactical field decision.

Ultimately, this annex puts the Lebanese state and its military institution to a historic test: either succeed in imposing unilateral sovereignty and managing the pilot zones with US and international support, or face the "preemptive defense" mechanisms that Israel preserved within the unrevealed texts of the annex.

What is the design of this new security arrangement imposed on the South? How does the annex handle the US role? And is Washington actually moving toward deploying ground troops on Lebanese territory?

### Engineering the South: What is in the "Secret Annex"?

Cross-referenced leaks of documents and diplomatic sources indicate that the secret security annex—kept under wraps at the request of the Lebanese government to avoid internal political domestic fallout—radically redraws the rules of engagement. Rather than relying on classical timelines, the annex links field developments directly to "security milestones." The proposed "Military Coordination Group for Lebanon" (MCG4L) is a formal mechanism between the two nations, facilitating direct coordination between the Lebanese Armed Forces (LAF) and the Israel Defense Forces (IDF) under American supervision. The Lebanese arrangement is, at its core, a strictly modified and heavily enforced execution version of UN Security Council Resolution 1701.

The security arrangements in the annex focus on the following key points:

* **Conditions-Based Withdrawal:** The agreement does not include a fixed timeline for the withdrawal of Israeli forces. Instead, the withdrawal is tied to the ability of the Lebanese Army to conduct disarmament operations targeting armed factions (specifically Hezbollah) in designated sectors.
* **Pilot Zones:** The Lebanese Army is being gradually introduced into what are known as "pilot zones" south of the Litani River. Advancing to new zones is prohibited until Israel and the sponsoring parties verify that these areas have been cleared of unofficial military infrastructure.
* **The Yellow Line and Freedom of Movement:** The annex grants the Israelis a margin of "operational freedom" to intervene against what are classified as "imminent and direct threats" within the security belt zone (the Yellow Line) until full responsibility is transferred to the Lebanese Army.

### The Truth Behind the US Role: Direct Oversight or Ground Troops?

The deep American involvement in this agreement raises fundamental questions about the nature of Washington's military presence in South Lebanon. Looking at the terms of the framework agreement and the leaked details of the Secret Annex, the US role can be deconstructed as follows:

#### 1. Supervising & Verification Force
Yes, the United States requested—and both parties agreed—to play the role of "direct supervisor" of the agreement's implementation. The Secret Annex provides for the establishment of the Military Coordination Group for Lebanon (MCG4L), a joint operations room operating 24/7 that includes representatives from both the Lebanese and Israeli militaries under direct American facilitation and oversight. This group handles dispute resolution, monitors compliance with disarmament, and manages field movements to prevent friction.

#### 2. The Truth About Deploying Ground Troops
Despite the rigorous oversight role, the United States has not requested the deployment of "combat ground troops" on Lebanese territory, nor does the Secret Annex provide for the establishment of US military bases in the South. The American approach relies on a "leading from behind" strategy and delegation of tasks:
* Exclusive reliance on the Lebanese Armed Forces as the sole ground intervention force authorized to enforce security and secure the territory.
* Providing aerial and intelligence coverage (via third-party verification).
* Intensive US financial and military support (initially estimated at $100 million) to logistically and operationally empower the Lebanese Army to execute the annex.`,
    author: {
      nameAr: 'معن برازي',
      nameEn: 'Maan Barazy',
      titleAr: 'رئيس التحرير والمدير العام',
      titleEn: 'Editor-in-Chief & General Manager',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1200',
    date: '2026-07-01',
    readTimeAr: 'دقائق 7',
    readTimeEn: '7 min read',
    isBreaking: true,
    isFeatured: true,
    isPremium: false,
    tags: ['جنوب_لبنان', 'الترتيبات_الأمنية', 'الملحق_السري', 'MCG4L', 'اتفاق_الإطار', 'الجيش_اللبناني', 'South_Lebanon', 'Security_Arrangements', 'Secret_Annex'],
    views: 1850
  },
  {
    id: 'nabih-berri-options-framework-agreement',
    category: 'editor-desk',
    categories: ['editor-desk', 'lebanon', 'opinion'],
    titleAr: 'ماذا بعد التوقيع؟ خيارات نبيه بري المفتوحة لإسقاط "مؤامرة" اتفاق الإطار',
    titleEn: 'What is Next After the Signing? Nabih Berri’s Open Options to Topple the Framework Agreement "Conspiracy"',
    summaryAr: 'منذ اللحظة التي أُعلن فيها عن توقيع "اتفاق الإطار" بين لبنان وإسرائيل، بدا واضحاً أن الساحة السياسية اللبنانية مقبلة على زلزال من نوع آخر. بالنسبة لرئيس مجلس النواب نبيه بري، لم يكن هذا التوقيع مجرد خطوة سياسية عابرة، بل "مؤامرة" حِيكت في الغرف المغلقة، وطعنة تجاوزت كل الأصول الدستورية.',
    summaryEn: 'Since the announcement of the framework agreement between Lebanon and Israel, Nabih Berri has viewed it as a constitutional breach and a backdoor conspiracy. We outline his primary options and political scenarios to challenge the agreement.',
    excerptAr: 'اليوم، يقف "عرّاب" السياسة اللبنانية أمام مفترق طرق حاسم. وبعد أن استنفر فريقه لدراسة سبل المواجهة، يطرح المراقبون سؤالاً جوهرياً: ما هي خطوة بري التالية؟',
    excerptEn: 'Today, Nabih Berri, the "godfather" of Lebanese politics, stands at a crucial crossroads as he marshals his political front against the newly signed maritime agreement.',
    contentAr: `منذ اللحظة التي أُعلن فيها عن توقيع "اتفاق الإطار" بين لبنان وإسرائيل، بدا واضحاً أن الساحة السياسية اللبنانية مقبلة على زلزال من نوع آخر. بالنسبة لرئيس مجلس النواب نبيه بري، لم يكن هذا التوقيع مجرد خطوة سياسية عابرة، بل "مؤامرة" حِيكت في الغرف المغلقة، وطعنة تجاوزت كل الأصول الدستورية.

اليوم، يقف "عرّاب" السياسة اللبنانية أمام مفترق طرق حاسم. وبعد أن استنفر فريقه لدراسة سبل المواجهة، يطرح المراقبون سؤالاً جوهرياً: ما هي خطوة بري التالية؟ وإلى أي حد سيذهب في معركته لإسقاط هذا الاتفاق الذي يراه "أخطر من 17 أيار"؟

أمام رئيس المجلس خيارات متعددة، وربما سيلعبها بالتوازي. إليكم السيناريوهات والخيارات المطروحة على طاولته في المرحلة المقبلة:

### 1. الخيار الأول: حرب الإلغاء السياسي وعزل "بعبدا"
هل يذهب بري نحو قطيعة نهائية وشاملة مع رئيس الجمهورية جوزيف عون؟ شعر بري بالتهميش والتآمر لتغييبه عن تفاصيل التوقيع، وهو ما دفعه لـ "كسر الجرة" مع بعبدا. الخيار المطروح هنا هو قيادة جبهة معارضة شرسة وتشكيل اصطفاف سياسي جديد—يبدو أن النائب السابق وليد جنبلاط سيكون عاموده الفقري—لشل حركة الرئاسة الأولى ومحاصرة مسارها الذي يعتبره بري مناهضاً لمصالح الدولة.

### 2. الخيار الثاني: الفخ الدستوري و"الفيتو" البرلماني
هل يستخدم بري ملعبه المفضل، مجلس النواب، لإطلاق رصاصة الرحمة على الاتفاق؟ في الشق القانوني، يدرس بري الإطاحة بالاتفاق من بوابة المؤسسات. هو يعتبر أن رئيس الجمهورية تخطى "اتفاق الطائف". الخيار الأقوى هنا هو الدعوة لجلسة نيابية وطرح الاتفاق على التصويت، مستنداً إلى تأمين أكثرية نيابية معارضة تسقط الاتفاق دستورياً قبل إسقاطه سياسياً، مما يضع عون أمام مسؤولية المساس بالطائف محلياً وعربياً.

### 3. الخيار الثالث: "حصان طروادة" داخل الحكومة
كيف سيتعامل مع حكومة الرئيس نواف سلام؟ بدلاً من إسقاط الحكومة وإدخال البلاد في المجهول، قد يختار بري تكتيك "الاحتواء السلبي". الخيار هو تحييد السراي الحكومي عن الصراع الرئاسي للحفاظ على الاستقرار الحد الأدنى، والإيعاز لوزراء "حركة أمل" و"حزب الله" بالبقاء داخل الحكومة كـ"حراس" يراقبون كل شاردة وواردة، لضمان عدم تمرير أي قرارات مفاجئة مستقبلاً كما حدث في قرار تكليف وفد واشنطن الأخير.

### 4. الخيار الرابع: اللعب على وتر التوازنات الإقليمية
هل ينجح بري في استبدال المظلة المحلية بأخرى عربية ودولية؟ سياسياً، قد يوسّع بري رقعة المواجهة لتشمل العواصم الفاعلة. الخيار هنا مزدوج:
* **عربياً:** تأمين غطاء من مصر، قطر، والسعودية لتفادي الفتنة الداخلية وإيجاد مخرج لائق للأزمة.
* **إيرانياً:** تنسيق موقف يربط مسار التفاوض اللبناني بمسار الاتفاق "الأميركي - الإيراني"، بحيث لا تبرم طهران اتفاقها النهائي دون ضمان انسحاب إسرائيلي كامل من لبنان، مغلّباً بذلك كفة التفاهمات الإقليمية الكبرى على الاتفاق المحلي.

### 5. الخيار الخامس والأخير: "الكي" بورقة الشارع
ماذا لو سُدت كل المنافذ الدستورية والسياسية؟ حتى اللحظة، يتفق بري مع "حزب الله" على تجميد "ورقة الشارع" وتجنب المظاهرات خوفاً من الانزلاق نحو فتنة طائفية لطالما اعتبرها هدفاً إسرائيلياً بامتياز. ولكن، إذا استنفدت كل الحلول، فإن خيار قلب الطاولة والنزول إلى الشارع يبقى "الرصاصة الأخيرة" في جيب بري، رغم تكلفتها الباهظة على السلم الأهلي.

### الخلاصة
لا يبدو أن نبيه بري في وارد الاستسلام للأمر الواقع. الأيام المقبلة ستكشف أيّاً من هذه الأوراق سيحركها أولاً، أم أنه كعادته، سيعزف على كل الأوتار في آنٍ واحد لإسقاط ما يعتبره التهديد الأكبر في مسيرته السياسية. الكرة الآن في ملعبه، والأنظار كلها تتجه نحو عين التينة.`,
    contentEn: `Since the announcement of the signing of the "Framework Agreement" between Lebanon and Israel, it has been clear that the Lebanese political arena is headed for an earthquake of a different kind. For Speaker of Parliament Nabih Berri, this signing was not a passing political gesture, but a "conspiracy" hatched in closed rooms and a constitutional stab in the back.

Today, the "godfather" of Lebanese politics stands at a critical crossroads. As he marshals his team to study strategies for opposition, observers ask: What is Berri's next move? How far will he go in his battle to dismantle this agreement, which he views as "more dangerous than the May 17 accord"?

The Speaker holds several options on his table and may play them in parallel:

### Option 1: Political Invalidation & Baabda Isolation
Will Berri initiate a complete and final rupture with President Joseph Aoun? Feeling marginalized and bypassed during the signing details, Berri has effectively broken ties with Baabda. The immediate strategy is to lead a fierce opposition front—partnering with former MP Walid Jumblatt as a cornerstone—to paralyze the presidency and block its path, which Berri deems counter to state interests.

### Option 2: The Constitutional Trap and Parliamentary Veto
Will Berri use his favorite arena, the Parliament, to deliver a fatal blow to the agreement? Legally, Berri is studying ways to challenge the accord through institutional pathways. He contends that the President has overstepped the "Taif Agreement." The strongest option here is convening a parliamentary session to put the agreement to a vote, relying on a secure opposition majority to sink it constitutionally and politically.

### Option 3: "Trojan Horse" Inside the Cabinet
How will he deal with Prime Minister Nawaf Salam's government? Instead of bringing down the cabinet and entering the unknown, Berri might choose "passive containment." This means shielding the Grand Serail from the presidential conflict to maintain minimum stability, while directing ministers from the "Amal Movement" and "Hezbollah" to remain inside the government as guardians, ensuring no sudden decisions bypass them in the future.

### Option 4: Leveraging Regional Balances
Can Berri secure regional Arab and international support to offset local containment? Strategically, he might expand the front to active capital cities:
* **Arab Dimension:** Securing a diplomatic umbrella from Egypt, Qatar, and Saudi Arabia to avoid internal strife and find a viable exit from the crisis.
* **Iranian Dimension:** Coordinating a position that links the Lebanese negotiations to the US-Iran diplomatic track, ensuring Tehran does not finalize any broader agreement without securing full Israeli withdrawal from Lebanon.

### Option 5: The "Street Protest" Card
What if all constitutional and political avenues are blocked? Until this moment, Berri and Hezbollah agree on freezing street mobilizations to prevent sectarian escalation. However, if all solutions are exhausted, mobilizing the street remains Berri’s "last bullet," despite its heavy cost to civil peace.

### Conclusion
Nabih Berri does not seem intent on surrendering to the status quo. The coming days will reveal which of these cards he plays first—or whether, as is his custom, he will play them all in unison to dismantle what he perceives as the greatest threat to his political career. The ball is in his court, and all eyes are on Ain el-Tineh.`,
    author: {
      nameAr: 'معن برازي',
      nameEn: 'Maan Barazy',
      titleAr: 'رئيس التحرير والمدير العام',
      titleEn: 'Editor-in-Chief & General Manager',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200',
    date: '2026-06-30',
    readTimeAr: 'دقائق 5',
    readTimeEn: '5 min read',
    isBreaking: true,
    isFeatured: true,
    isPremium: false,
    tags: ['نبيه_برّي', 'اتفاق_الإطار', 'جوزيف_عون', 'عين_التينة', 'السياسة_اللبنانية', 'Nabih_Berri', 'Framework_Agreement', 'Lebanese_Politics'],
    views: 1420
  },
  {
    id: 'israel-lebanon-deal-behind-scenes',
    category: 'exclusives',
    categories: ['exclusives', 'editor-desk', 'lebanon'],
    titleAr: 'كواليس المفاوضات: كيف أدى الخوف المشترك من نفوذ إيران إلى اتفاق لبناني-إسرائيلي',
    titleEn: 'Behind the Scenes: How Shared Fear of Iran Led to an Israel-Lebanon Deal',
    summaryAr: 'مستند استخباري خاص يكشف تفاصيل الدبلوماسية السرية والضغوط المكثفة من إدارة ترامب لإبرام اتفاقية لبنان والالتفاف على النفوذ الإيراني.',
    summaryEn: 'Four days of nonstop negotiations in Washington between the Israeli and Lebanese governments were propelled by one clear shared interest: weakening the influence of Hezbollah and Iran in Lebanon.',
    excerptAr: 'كواليس اللقاءات الدبلوماسية والضغوط العنيفة من ماركو روبيو وتفاصيل الغرف المغلقة للاتفاق الإسرائيلي اللبناني الجديد.',
    excerptEn: 'Behind-the-scenes reporting on the diplomatic push, intense calls by Marco Rubio, and closed-door negotiations for the new Israel-Lebanon agreement.',
    contentAr: `تستند هذه القصة إلى محادثات مع ستة مصادر أمريكية وإسرائيلية ولبنانية على دراية مباشرة بمسار المفاوضات.

وفقاً لمسؤولين أمريكيين وإسرائيليين ولبنانيين، فإن أربعة أيام من المفاوضات المتواصلة في واشنطن هذا الأسبوع بين الحكومتين الإسرائيلية واللبنانية كانت مدفوعة بمصلحة مشتركة واحدة واضحة: وهي إضعاف نفوذ حزب الله وإيران في لبنان.

**لماذا يهم الأمر:** يُعد الاتفاق الإطاري الذي تم التوصل إليه بوساطة إدارة ترامب أهم اتفاق سياسي بين إسرائيل ولبنان منذ أربعة عقود - لكن جميع الأطراف المعنية تدرك أن رؤية السلام التي يرسمها قد لا تتحقق أبداً على أرض الواقع.

ويختلط هذا التشكيك بقلق عميق من أن يؤدي الاتفاق إلى رد فعل عنيف ومسلح من قِبل حزب الله، مما قد يدخل البلاد مجدداً في أتون حرب أهلية مدمرة.
كما يبدو أن هذا الاتفاق يتعارض مع بعض التفاهمات التي تم التوصل إليها بين الولايات المتحدة وإيران في سويسرا، مما قد يعقد تلك الهدنة الهشة.

**خلفية الأحداث:** نجحت إيران في دمج الوضع في لبنان ضمن مفاوضاتها مع الولايات المتحدة في الأسابيع الأخيرة.
وأسفر ذلك عن مذكرة تفاهم تدعو الأطراف إلى الالتزام بوقف إطلاق النار في لبنان وضمان سلامة أراضيه وسيادته - وهو ما تقوضه بنشاط استمرار العمليات العسكرية الإسرائيلية في جنوب لبنان.

وخلال المحادثات التي جرت في سويسرا يوم الأحد الماضي، اتفقت الولايات المتحدة وإيران على إنشاء "خلية لفض النزاعات" جديدة، بالاشتراك مع لبنان والوسيطين الباكستاني والقطري، لضمان استمرار وقف إطلاق النار في لبنان.
وقد صدم هذا الاتفاق المسؤولين الإسرائيليين واللبنانيين على حد سواء، حيث رأوا فيه تعزيزاً لموقف حزب الله وشرعنة لنفوذ إيران المتنامي في البلاد.
وتزامنت هذه الأنباء مع استعداد الدبلوماسيين الإسرائيليين واللبنانيين لجولة حاسمة من المفاوضات في واشنطن.

**كواليس اللقاءات:** عندما اجتمع المفاوضون في مقر وزارة الخارجية الأمريكية يوم الثلاثاء، افتتح السفير الإسرائيلي يحيئيل ليتر الجلسة الأولى بكلمة شديدة اللهجة وصف فيها التفاهمات الأمريكية الإيرانية الجديدة بشأن لبنان بأنها "كارثة محققة".
وتساءل ليتر عما إذا كانت الولايات المتحدة لا تزال مهتمة بالفعل بإضعاف نفوذ إيران في لبنان، وهو الهدف الذي كانت تسعى إليه المحادثات الإسرائيلية اللبنانية.
وتتبع ذلك مطالبة ممثلي لبنان بإيضاحات مماثلة، حيث صرح مصدر مطلع بشكل مباشر: "كان اللبنانيون في حالة من التوجس والترقب الشديد".

وعلى الرغم من تأكيد الوسطاء الأمريكيين أن الهدف هو التوصل إلى اتفاق إسرائيلي لبناني دون أي تدخل خارجي، إلا أن مسؤولاً أمريكياً اعترف بأن اليوم الأول من المحادثات كان "صعباً وبشعاً للغاية".
وتمسك الطرفان بمواقفهما بشدة، لا سيما بشأن القضايا الأمنية والعسكرية، وبدا لبعض المشاركين أن المفاوضات تتراجع إلى الوراء بدلاً من التقدم.

**عن قرب:** جرت المحادثات عبر مسارين متوازيين: مسار أمني بين ضباط عسكريين، ومسار سياسي بين دبلوماسيين، تولى إدارته والوساطة فيه مسؤولون كبار من وزارة الدفاع (البنتاغون) ووزارة الخارجية.
وعملت الأطراف على إعداد وثائق ثلاث: اتفاق إطاري، ملحق أمني، واتفاق بشأن انسحاب إسرائيلي أولي من "منطقتين نموذجيتين" ليحل محلهما الجيش اللبناني.

وفي يوم الأربعاء، تسارعت وتيرة المفاوضات بشكل كبير، وبدأ المسؤولون الأمريكيون يعتقدون بإمكانية توقيع الاتفاق في اليوم التالي.
لكن في يوم الخميس، انقلبت الطاولة مجدداً؛ حيث شددت الأطراف مواقفها مع مرور الوقت، ولم تتمكن الولايات المتحدة من سد الفجوات في الوثائق الثلاث لتقديمها كحزمة واحدة. وكان الخلاف الرئيسي يدور حول شروط ومواقع الانسحابات الإسرائيلية.
وفي مساء الخميس، ضغط كل من رئيس الوزراء الإسرائيلي بنيامين نتنياهو والرئيس اللبناني جوزيف عون على المكابح، وطلب المفاوضون من الجانبين مزيداً من الوقت للتشاور مع عواصمهم، ووافق الوسطاء الأمريكيون على تمديد المحادثات ليوم إضافي.

**خيوط الإثارة:** هبط وزير الخارجية الأمريكي ماركو روبيو في واشنطن ليلة الخميس بعد جولة في منطقة الخليج العربي.
وكان روبيو يتواصل هاتفياً مع نتنياهو وعون منذ يوم الثلاثاء، حيث أجرى نحو ثماني مكالمات مع الزعيمين. كما تحدث نائب الرئيس جيه دي فانس مع كل منهما مرة واحدة على الأقل.
وشدد روبيو لنتنياهو وعون على مدى الأهمية الكبيرة التي يوليها الرئيس ترامب لإنجاز هذا الاتفاق وقفل الملف قبل نهاية الأسبوع.
وقال مصدر مطلع إن هذا الاهتمام رفيع المستوى من واشنطن "أوضح للطرفين أن هناك شعوراً حقيقياً بالاستعجال والضغط لحسم الاتفاق".

**داخل الغرفة:** صباح يوم الجمعة، انضم روبيو إلى المحادثات في محاولة لإغلاق الفجوات المتبقية. وشارك في هذا الدفع النهائي كبير المفاوضين الأمريكيين دان هولر، والسفير الأمريكي لدى لبنان ميشيل عيسى، وقائد قوات مشاة البحرية في القيادة المركزية الأمريكية (CENTCOM) الجنرال جوزيف كليرفيلد، بالإضافة إلى مسؤولي البنتاغون دانيال زيمرمان ومايكل ديمينو.

وطلبت الولايات المتحدة من إسرائيل إجراء تعديلين على النص لضمان إتمام الصفقة، بما في ذلك الانسحاب الإسرائيلي من بلدة جنوبية تخضع حالياً للاحتلال الإسرائيلي، وتقديم بيان واضح بأن هذا الانسحاب سيمثل بداية لعملية إعادة انتشار أوسع للقوات خارج الأراضي اللبنانية.
وضغط السفير ليتر بقوة على نتنياهو ومسؤولين إسرائيليين آخرين للموافقة خلال مكالمة هاتفية اتسمت بالتوتر والحدة نتيجة مقاومة نتنياهو لهذه التعديلات. وأفاد مصدران أن ليتر رفع صوته أثناء محاججته بأن الاتفاق يمثل إنجازاً أمنياً كبيراً لإسرائيل وعليها التوقيع فوراً.
وأوضح مصدر مقرب من ليتر أنه اضطر لرفع صوته بسبب الضوضاء على خط الهاتف الدولي، بينما صرح ليتر نفسه لـ "أكسيوس" أن إجراء مكالمات للتشاور مع المسؤولين في الوطن أمر "معتاد ومألوف" أثناء المفاوضات وأن تباين الآراء شيء طبيعي.

وأضاف ليتر: "خلال إحدى مكالمات المتابعة، جرى نقاش مهني وموضوعي وحاد في بعض الأوقات، حيث استمعنا لمجموعة من الآراء حول أفضل السبل لتعظيم مكاسب المفاوضات مع حماية مصالح إسرائيل الحيوية بالكامل".

**ما بين السطور:** وصرح مصدر مطلع بشكل مباشر: "لم تكن هناك ثقة متبادلة تذكر بين إسرائيل ولبنان، لكن في نهاية المطاف أدرك الطرفان أنهما بحاجة إلى إبرام هذا الاتفاق للحفاظ على السيطرة على مسار الأمور ومنع التدخل الإيراني المباشر".

**الجانب الآخر:** تسبب الاتفاق فور إعلانه في زيادة حدة التوترات الداخلية في لبنان.
وحاول حزب الله تنظيم تظاهرات احتجاجية في بيروت يوم الجمعة ضد الاتفاق، لكنه لم ينجح سوى في حشد بضع مئات من الأشخاص الذين تفرقوا سريعاً بجهود القوى الأمنية.
وفي يوم السبت، أزالت قوات الأمن اللبنانية عشرات الملصقات واللافتات التي رفعها حزب الله على الطريق الرئيسي المؤدي لمطار بيروت الدولي، والتي تشكر المرشد الأعلى الإيراني على وقف إطلاق النار.
وعلقت الحكومة اللبنانية في مكانها لافتات خاصة بها تحمل شعار "لبنان أولاً" - والتي قام أنصار حزب الله بإحراق بعضها ليلة السبت.

**ماذا يقولون:** أعلن الأمين العام لحزب الله الشيخ نعيم قاسم أن الاتفاق مع إسرائيل "باطل ولاغٍ"، واصفاً إياه بأنه "إهانة وعار واستسلام وتنازل عن السيادة الوطنية".
وشدد على أن حزب الله سيواصل خيار "المقاومة" ضد الاحتلال الإسرائيلي.

**ماذا بعد:** في وقت لاحق من يوم السبت، تحدث ترامب هاتفياً مع عون وهنأه بالاتفاق.
وقال مكتب عون إن ترامب أكد أن الولايات المتحدة ستقدم كل الدعم اللازم لتنفيذ الاتفاق ودعم سيادة لبنان وبسط سلطة الدولة على كامل أراضيها.
وفي نهاية المكالمة، أخبر ترامب عون بأنه يتطلع للقائه قريباً في البيت الأبيض، وهي الزيارة المتوقعة في منتصف شهر يوليو/تموز.`,
    contentEn: `This story is based on conversations with six U.S., Israeli and Lebanese sources with direct knowledge of the negotiations.

Four days of nonstop negotiations in Washington this week between the Israeli and Lebanese governments were propelled by one clear shared interest: weakening the influence of Hezbollah and Iran in Lebanon, according to U.S., Israeli and Lebanese officials.

**Why it matters:** The framework agreement brokered by the Trump administration is the most significant political agreement between Israel and Lebanon in four decades — but all parties involved know the vision of peace it lays out may never materialize.

Mixed with the skepticism is deep concern that the deal could lead to a violent response from Hezbollah that could throw the country back into civil war.
The agreement also seems to contradict some of the understandings reached between the U.S. and Iran in Switzerland, and could thus complicate that fragile truce.

**The backdrop:** Iran managed to wrap the situation in Lebanon into its negotiations with the U.S. in recent weeks.
That resulted in a memorandum of understanding that calls on the parties to observe a ceasefire in Lebanon and ensure the country's territorial integrity — which is actively undermined by Israel's ongoing occupation of southern Lebanon.

During talks in Switzerland last Sunday, the U.S. and Iran agreed to create a new "deconfliction cell," together with Lebanon and the Pakistani and Qatari mediators, to ensure the ceasefire in Lebanon holds.
That shocked both Israeli and Lebanese officials, who saw it as bolstering Hezbollah and legitimizing Iran's influence in the country.
The news also came as Israeli and Lebanese diplomats were preparing for a crucial round of negotiations in Washington.

**Behind the scenes:** When they met at the State Department on Tuesday, Israeli Ambassador Yechiel Leiter opened the first session with a strongly worded speech calling the new U.S.-Iranian understandings on Lebanon "a train wreck."
Leiter asked the U.S. mediators whether the U.S. was actually still interested in weakening Iran's influence in Lebanon, as the Israel-Lebanon talks had been aiming to do.
Lebanon's representatives followed up with their own demands for clarification. "The Lebanese were on their heels," a source with direct knowledge said.

While the U.S. mediators stressed the goal was to get an Israeli-Lebanese agreement with no outside interference, the first day of the talks was "pretty ugly," a U.S. official conceded.
The parties dug in on their positions, particularly on security issues, and it felt to some participants as though the negotiations were actually moving backward.

**Zoom in:** The talks took place on two tracks: a security track between military officers, and a political track between diplomats. Senior Pentagon and State Department officials mediated.
The parties worked on three documents: a framework agreement, a security annex, and an agreement on an initial Israeli withdrawal from two "pilot zones," to be replaced by the Lebanese army.

On Wednesday, the negotiations picked up steam. U.S. officials began to think an agreement could be signed the next day.
But on Thursday, the tables turned again. As the day passed, the parties hardened their positions, and the U.S. couldn't bridge the gaps on all three documents to create a single package. The main dispute was over the terms and locations of the Israeli withdrawals.
On Thursday evening, both Israeli Prime Minister Benjamin Netanyahu and Lebanese President Joseph Aoun hit the brakes. Negotiators on both sides asked for more time to consult with their capitals, and the U.S. mediators agreed to extend the talks by a day.

**The intrigue:** Secretary of State Marco Rubio landed back in Washington on Thursday night after a trip to the Persian Gulf.
Rubio had been speaking by phone with both Netanyahu and Aoun since Tuesday, holding around eight calls in total with the two leaders. Vice President Vance also spoke to each leader at least once.
Rubio emphasized to Netanyahu and Aoun that it was important to President Trump for a deal to be wrapped up by the end of the week.
The high-level attention from Washington "made it clear to both sides that there was a clear sense of urgency here," a source with knowledge said.

**Inside the room:** On Friday morning, Rubio joined the talks to try to close the final gaps. Also involved in the final push were U.S. chief negotiator Dan Holler, U.S. Ambassador to Lebanon Michel Issa, CENTCOM Marines commander Lt. Gen. Joseph Clearfield, and Pentagon officials Daniel Zimmerman and Michael Dimino.

The U.S. asked Israel for two changes to the text in order to secure the deal, including an Israeli withdrawal from a village in southern Lebanon currently under Israeli occupation and a clear statement that this would mark the beginning of a broader process of redeployment out of Lebanon.
Leiter pressed Netanyahu and other senior Israeli officials to agree in a call that became heated when Netanyahu resisted the changes. Two sources said Leiter raised his voice as he made the case that the deal was an important achievement and Israel needed to sign.
A source close to Leiter said he raised his voice because of the noise on the phone line. Leiter himself told Axios that calls to consult with officials back home are "customary" during negotiations and differences of opinion are "natural."

"During one of the update calls, a professional, substantive, and at times sharp discussion took place, during which a range of views was heard regarding the best way to maximize the achievements of the negotiations while fully safeguarding Israel's vital interests," he said.

**Between the lines:** "There wasn't a lot of trust between Israel and Lebanon, but eventually both parties understood they needed to get a deal in order to keep control of the process and not allow Iran in," a source with direct knowledge said.

**The other side:** The agreement immediately increased internal tensions in Lebanon.
Hezbollah tried to organize demonstrations in Beirut against the deal on Friday, but only managed to mobilize several hundred people who were quickly dispersed.
In their place, the Lebanese government hung its own posters with the slogan, "Lebanon first" — some of which were burned by Hezbollah supporters on Saturday night.

**What they're saying:** Hezbollah leader Naim Qassem declared the agreement with Israel "null and void" and called it "a humiliation, disgrace, and a surrender of sovereignty."
He stressed Hezbollah will continue its "resistance" to the Israeli occupation.

**What's next:** Later on Saturday, Trump spoke with Aoun and congratulated him on the deal.
Trump said the U.S. would provide everything necessary to implement the agreement and to support Lebanon's sovereignty and the extension of the Lebanese state's authority over the entire Lebanese territory, Aoun's office said.
At the end of the call, Trump told Aoun he looked forward to meeting him soon at the White House. The visit is expected in mid-July.`,
    author: {
      nameAr: 'معن برازي',
      nameEn: 'Maan Barazy',
      titleAr: 'رئيس تحرير صحيفة الورّاق',
      titleEn: 'Editor-in-Chief, Al-Warraq News',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
    },
    imageUrl: 'https://images.unsplash.com/photo-1507682531662-421b17ac4f83?auto=format&fit=crop&q=80&w=1200',
    date: '29 يونيو 2026',
    readTimeAr: '8 دقائق',
    readTimeEn: '8 min read',
    views: 16800,
    tags: ['الملحق الأمني', 'المفاوضات', 'إيران', 'اتفاق لبناني إسرائيلي', 'أمريكا', 'ماركو روبيو']
  },
  {
    id: 'excl-leb-isr-secret-annex',
    category: 'exclusives',
    categories: ['exclusives', 'editor-desk', 'lebanon'],
    titleAr: 'الإطار اللبناني-الإسرائيلي بوساطة أمريكية: الملاحق السرية وسؤال الاستسلام القانوني',
    titleEn: 'US-Mediated Lebanon-Israel Security Framework: The Secret Annexes and the Legal Surrender Question',
    summaryAr: 'على الرغم من نشر الاتفاق الإطاري الأساسي المكون من 14 نقطة بين لبنان وإسرائيل، إلا أن التنفيذ الفعلي يعتمد بشكل كبير على "ملحق أمني" منفصل وشديد الحساسية طلبت الحكومة اللبنانية حظره عن النشر لحجب تنازلاته الميدانية والقانونية الصادمة.',
    summaryEn: 'While the 14-point framework is public, its actual execution relies on a highly sensitive, unreleased "Security Annex" that Beirut requested to keep secret, raising deep concerns over Israeli operational freedom and the Article 13 legal waiver.',
    excerptAr: 'تحقيق استقصائي يكشف خفايا الملحق الأمني السري والتبعات القانونية للمادة 13 من الاتفاق الإطاري اللبناني الإسرائيلي.',
    excerptEn: 'An exclusive investigation into the unreleased security annex of the US-brokered deal, exposing Israeli operational freedom, reconstruction conditions, and Article 13\'s legal retreat.',
    contentAr: `بقلم معن برازي - رئيس تحرير "الورّاق نيوز"

على الرغم من نشر الاتفاق الإطاري الأساسي المكون من 14 نقطة بين لبنان وإسرائيل، إلا أن التنفيذ الفعلي للاتفاق يعتمد بشكل كبير على "ملحق أمني" منفصل وشديد الحساسية. ورغم أنه ليس ملحقاً "مخفياً" بالمعنى الحرفي، إلا أن تفاصيله تظل محجوبة تماماً عن الرأي العام.
والأهم من ذلك، أن الحكومة اللبنانية طلبت رسمياً من الولايات المتحدة حجب هذا المستند عن النشر. وهذا يطرح تساؤلاً ملحاً: لماذا طلب لبنان بحزم من الولايات المتحدة إبقاء الملحق الأمني سرياً؟ يُعد هذا الافتقار إلى الشفافية مثيراً للجدل إلى حد كبير لأن الملحق غير المنشور، مقترناً بالنص المعلن، يفرض عدة عناصر حاسمة ومثيرة للقلق العميق في هذا الاتفاق.

ما هو هذا الملحق الأمني السري؟
على الرغم من أن النص الأساسي للاتفاق (المكون من 14 نقطة) قد نُشر علناً، إلا أن هذا الملحق السري يمثل "العمود الفقري التنفيذي" للاتفاق. بناءً على التسريبات والمراجع الواردة في النص الأساسي، يتضمن الملحق الشروط الميدانية القاسية التي تضمنتها التسوية، وأبرزها:
• حرية العمل العسكري الإسرائيلي: (تحديداً المادة 4 من الملحق) تنص على احتفاظ الجيش الإسرائيلي بـ "حرية التحرك" والعمل العسكري ضد أي تهديدات ناشئة أو فورية داخل المنطقة الأمنية في جنوب لبنان.
• انسحاب إسرائيلي مشروط (لا توجد جداول زمنية): يؤكد الملحق أنه لن يكون هناك أي انسحاب إسرائيلي تلقائي أو وفق جدول زمني محدد. بل يرتبط انسحاب الجيش الإسرائيلي بالكامل بتنفيذ شروط ميدانية مسبقة، وعلى رأسها التحقق من نزع سلاح الجماعات المسلحة (حزب الله) وتفكيك بنيتها التحتية.
• المناطق التجريبية (Pilot Zones): يفصل الملحق خطة إنشاء مناطق تجريبية محددة. في هذه المناطق فقط، سيُسمح للجيش اللبناني بالدخول وتولي المسؤولية الأمنية بعد خضوعه لعمليات تدريب وتدقيق، وبشرط التأكد من خلو المنطقة من السلاح غير الشرعي. ولن يتم توسيع هذه المناطق إلا بموافقة إسرائيلية مبنية على التقييم الميداني.
• قيود صارمة على إعادة الإعمار: يتضمن تفاصيل آليات الرقابة الأمريكية والدولية لضمان عدم تدفق أموال إعادة الإعمار إلى أي أفراد أو مؤسسات أو كيانات تابعة للجماعات المسلحة غير التابعة للدولة.

لماذا طلب لبنان إخفاءه؟
يُعتقد أن الحكومة اللبنانية سعت لإخفاء هذا الملحق لأنه يتضمن شروطاً وتنازلات بالغة الحساسية (مثل تشريع حرية التدخل العسكري الإسرائيلي وربط الانسحاب بنزع سلاح حزب الله). فنشر مثل هذه التفاصيل الدقيقة يضع الحكومة في موقف محرج للغاية داخلياً، ويزيد من حدة الانقسام والرفض للاتفاق، خاصة في ظل تلويح أطراف داخلية بإسقاطه.

1. المخاوف الأساسية بشأن الملحق الأمني غير المنشور
• معايير الانسحاب المشروط: إن التزام الجيش الإسرائيلي بإعادة التموضع والانسحاب التدريجي من الأراضي اللبنانية ليس مطلقاً؛ بل هو مشروط كلياً بالمعايير والضوابط الأمنية المحددة حصرياً داخل هذا الملحق غير المنشور.
• قيود إعادة الإعمار: يفرض الإطار قيوداً تمنع وصول أموال إعادة الإعمار الدولية إلى الأفراد أو المناطق المرتبطة بالجماعات المسلحة غير التابعة للدولة. ونظراً للدمار الواسع النطاق في جميع أنحاء جنوب لبنان، فإن هذا البند يثير مخاوف لوجستية وإنسانية خطيرة حول كيفية تنفيذ جهود إعادة البناء فعلياً للسكان المدنيين النازحين.

2. هل تخلى لبنان عن حقه في مقاضاة إسرائيل؟
بعيداً عن الملحق السري، اندلعت عاصفة قانونية كبرى حول المادة 13 من الإطار المعلن الموقع في واشنطن. ويحذر خبراء قانونيون صراحة من أن بيروت ربما تكون قد قيدت بشدة، أو حتى تخلت تماماً، عن سيادتها في محاسبة إسرائيل قانونياً على جرائم الحرب المرتكبة على الأراضي اللبنانية.

ماذا تفرض المادة 13؟
ينص البند على أنه من أجل "إرساء علاقات مستقرة وسلمية"، يجب على كل من لبنان وإسرائيل الالتزام بـ "وقف جميع الإجراءات العدائية أو السلبية في المحافل السياسية أو القانونية الدولية".

لماذا يقرع الخبراء القانونيون ناقوس الخطر؟
يحذر المحامون الحقوقيون والباحثون القانونيون من أن الصياغة فضفاضة بشكل خطير ويمكن أن تكون لها تداعيات كارثية على العدالة الدولية:
• عرقلة المحاكم الدولية: يمكن تفسير البند على أنه يلزم لبنان بوقف جميع الشكاوى الحالية والمستقبلية ضد إسرائيل في مجلس الأمن التابع للأمم المتحدة، والمحكمة الجنائية الدولية، ومحكمة العدل الدولية، وغيرها من لجان تقصي الحقائق التابعة للأمم المتحدة.
• إسكات المحافل السياسية: نظراً لأن النص يتضمن صراحة "المحافل السياسية"، فإنه يمكن أن يمنع الدولة اللبنانية من استخدام المؤسسات الدبلوماسية والدولية للتنديد بالانتهاكات وتوثيقها.
• التخلي عن ضحايا جرائم الحرب: يشير الخبراء القانونيون إلى أن هذا الاتفاق يأتي في وقت تواجه فيه إسرائيل تدقيقاً قانونياً دولياً غير مسبوق بسبب الهجمات العشوائية، وتدمير البنية التحتية المدنية، والتهجير القسري في لبنان. وتجبر المادة 13 فعلياً الدولة اللبنانية على التراجع عن السعي لتحقيق المساءلة أو الحصول على تعويضات عن هذه الأفعال.

3. مفارقة القيادة والمسارات القانونية البديلة
تبدو هذه التناقضات صارخة بشكل خاص بالنظر إلى خلفية رئيس الوزراء اللبناني نواف سلام. فقبل توليه منصبه، شغل سلام منصب رئيس محكمة العدل الدولية، وترأس الرأي الاستشاري التاريخي لعام 2024 الذي أعلن عدم قانونية احتلال إسرائيل للأراضي الفلسطينية. ويرى المنتقدون أنه من التناقض الشديد أن يتراجع لبنان عن المساءلة القانونية الدولية في ظل قيادته.

هل لا يزال من الممكن اتخاذ إجراءات قانونية؟
في حين أن الاتفاق يقيد الدولة اللبنانية بشدة، فإن مسار العدالة قد تغير ولكنه لم يُغلق تماماً:
• الشكاوى الحالية: يشير المحللون القانونيون إلى أن الشكاوى والمراسلات الحالية المقدمة بالفعل إلى الأمم المتحدة أو المحكمة الجنائية الدولية لا تختفي تلقائياً، رغم أن الحكومة اللبنانية قد تتعرض لضغوط سياسية تمنعها من دعمها ومتابعتها.
• الولاية القضائية العالمية للأفراد: يُلزم الاتفاق الدولة وليس المواطنين. وبالتالي، لا يزال بإمكان الضحايا الأفراد، من الناحية النظرية، محاولة رفع قضايا ضد المسؤولين الإسرائيليين أمام المحاكم الوطنية الأجنبية التي تعمل بمبدأ الولاية القضائية العالمية. ومع ذلك، يحذر المحامون من أن هذا المسار طويل ومعقد ومقيد للغاية مقارنة بالدعاوى الدولية التي تدعمها الدول.`,
    contentEn: `US-Mediated Lebanon-Israel Security Framework: The Secret Annexes and the Legal Surrender Question
By Maan Barazy - Editor-in-Chief of Al-Warraq News

Although the basic 14-point framework agreement between Lebanon and Israel has been published, its operational execution relies heavily on a separate and highly sensitive "security annex." While not "hidden" in the literal sense, its details remain entirely shielded from the public.
Most importantly, the Lebanese government has officially requested that the United States withhold this document from publication. This raises a pressing question: Why did Lebanon insist so firmly on keeping the security annex confidential? This lack of transparency is highly controversial, as the unpublished annex, coupled with the declared text, imposes several critical and deeply concerning elements on the agreement.

What is this Top-Secret Security Annex?
While the core 14-point text of the agreement is public, the secret annex represents its "operational backbone." Based on leaks and references in the main text, the annex outlines harsh field conditions, most notably:
• Israeli Military Freedom of Action: (Specifically, Article 4 of the annex) states that the IDF retains "freedom of action" and military movement to act against any emerging or immediate threats within the security zone of southern Lebanon.
• Conditional Israeli Withdrawal (No Timelines): The annex emphasizes that there will be no automatic or scheduled Israeli withdrawal. Instead, any IDF withdrawal is strictly tied to the verification of disarming armed groups (Hezbollah) and dismantling their military infrastructure.
• Pilot Zones: The annex details a plan to establish pilot security zones. Only in these zones will the Lebanese Army be permitted to enter and assume security responsibilities, and only after training, vetting, and ensuring the zone is free of non-state weapons. These zones will expand only upon Israeli approval based on field assessments.
• Strict Reconstruction Controls: It details American and international oversight mechanisms to guarantee that international reconstruction funds do not reach any individuals, organizations, or entities affiliated with non-state armed groups.

Why Did Lebanon Request Secrecy?
The Lebanese government reportedly sought to hide this annex because it contains highly sensitive concessions—such as codifying Israeli military intervention rights and tying withdrawal to disarming Hezbollah. Publishing these details would place the cabinet in an extremely embarrassing domestic position, deepening internal division and opposition to the agreement, especially with domestic factions threatening to bring it down.

1. Key Concerns Regarding the Unpublished Security Annex
• Conditional Withdrawal Criteria: The IDF's commitment to redeploy and gradually withdraw from Lebanese territory is not absolute; it is entirely dependent on the security parameters and controls specified exclusively inside this unpublished annex.
• Reconstruction Restrictions: The framework prevents international reconstruction funds from reaching individuals or areas connected to non-state armed groups. Given the widespread devastation across southern Lebanon, this clause raises critical logistical and humanitarian questions about how rebuilding can actually occur for displaced civilian populations.

2. Did Lebanon Surrender its Right to Prosecute Israel?
Beyond the secret annex, a major legal storm has erupted over Article 13 of the Washington-signed public framework. Legal experts warn that Beirut may have severely restricted, or completely surrendered, its sovereignty to hold Israel legally accountable for war crimes committed on Lebanese soil.

What Does Article 13 Impose?
The clause states that in order to "establish stable and peaceful relations," both Lebanon and Israel must commit to "ceasing all hostile or negative actions in international political or legal forums."

Why Are Legal Experts Sounding the Alarm?
Human rights lawyers and international legal scholars warn that the wording is dangerously broad and could have catastrophic implications for international justice:
• Obstructing International Courts: The clause could be interpreted as binding Lebanon to drop all current and future complaints against Israel in the UN Security Council, the International Court of Justice (ICJ), and the International Court of Justice (ICJ), and other UN fact-finding committees.
• Silencing Political Forums: Since the text explicitly includes "political forums," it could prevent the Lebanese state from using diplomatic and international institutions to denounce and document violations.
• Abandoning Victims of War Crimes: Experts point out that this agreement comes at a time when Israel faces unprecedented international legal scrutiny over indiscriminate attacks, destruction of civilian infrastructure, and forced displacement in Lebanon. Article 13 effectively forces the Lebanese state to back down from seeking accountability or reparations.

3. The Leadership Paradox and Alternative Legal Paths
These contradictions appear particularly stark given the background of Lebanese Prime Minister Nawaf Salam. Before taking office, Salam served as President of the International Court of Justice (ICJ) and presided over the historic 2024 advisory opinion declaring Israel's occupation of Palestinian territories illegal. Critics see it as highly ironic that Lebanon would retreat from international legal accountability under his leadership.

Can Legal Action Still Be Taken?
While the agreement heavily restricts the Lebanese state, the path to justice is altered but not entirely closed:
• Existing Complaints: Analysts point out that current complaints and communications already submitted to the UN or ICC do not automatically disappear, though the Lebanese government may face political pressure to withhold active support and follow-up.
• Universal Jurisdiction for Individuals: The agreement binds the state, not individual citizens. Therefore, individual victims could still theoretically attempt to file cases against Israeli officials in foreign national courts operating under the principle of universal jurisdiction. However, lawyers warn that this path is long, complex, and highly restricted compared to state-sponsored international litigation.`,
    author: {
      nameAr: 'معن برازي',
      nameEn: 'Maan Barazy',
      titleAr: 'رئيس تحرير صحيفة الورّاق',
      titleEn: 'Editor-in-Chief, Al-Warraq News',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
    },
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
    date: '29 يونيو 2026',
    readTimeAr: '7 دقائق',
    readTimeEn: '7 min read',
    views: 12500,
    isPremium: true,
    isFeatured: true,
    tags: ['الملحق الأمني', 'الاتفاق الإطاري', 'السيادة اللبنانية', 'جرائم الحرب', 'نواف سلام', 'المحاكم الدولية', 'أمريكا']
  },
  {
    id: 'cbs-iran-war-cost-americans-2026',
    category: 'translations',
    categories: ['translations', 'middle-east', 'us-politics'],
    titleAr: 'تقديرات اقتصاديين: حرب إيران كلفت الأسر الأمريكية 1000 دولار لكل عائلة',
    titleEn: 'Iran war has cost Americans $1,000 per household, economist estimates',
    summaryAr: 'تقديرات جديدة لمؤسسة موديز أناليتكس تكشف التكلفة الخفية الباهظة للحرب مع إيران على دافعي الضرائب والمستهلكين الأمريكيين من أسعار الوقود إلى الفائدة المرتفعة وفاتورة العمليات العسكرية.',
    summaryEn: "Moody's Analytics reveals the severe impact of the Iran war on average US households, documenting surging gasoline prices, food transportation costs, stalled interest rate cuts, and defense expenditures.",
    excerptAr: 'كشف كبير الاقتصاديين في موديز أناليتكس مارك زاندي أن الحرب كلفت الأسر الأمريكية نحو 1000 دولار في المتوسط جراء ارتفاع أسعار الوقود والغذاء والفائدة.',
    excerptEn: "Moody's Analytics chief economist Mark Zandi estimates the typical American household has paid $1,000 so far due to fuel spikes, food inflation, and stalled rate cuts.",
    contentAr: `*تقرير مترجم حصرياً لصالح منصة الورّاق عن شبكة سي بي إس نيوز (CBS News)*
*تاريخ النشر الأصلي: ٢٩ يونيو ٢٠٢٦*
*المصدر الأصلي للتقرير: https://www.cbsnews.com/news/iran-war-cost-american-households/*

كلّفت الحرب مع إيران الأمريكيين حوالي 1,000 دولار لكل أسرة في شكل ارتفاع تكبيد تكاليف الوقود والغذاء والنفقات الأخرى منذ بدء الصراع في فبراير، وفقًا لتقديرات شاركها الأسبوع الماضي مارك زاندي، كبير الاقتصاديين في مؤسسة موديز أناليتكس (Moody's Analytics).

يأتي تحليل زاندي في الوقت الذي تظهر فيه البيانات الحكومية أن التضخم في مايو سجل أعلى مستوى له في ثلاث سنوات، ومع عدم توصل الولايات المتحدة وإيران بعد إلى اتفاق سلام دائم. وتبادل البلدان الضربات العسكرية خلال عطلة نهاية الأسبوع، مما هدد بانهيار وقف إطلاق النار الهش. وقال الرئيس ترامب يوم الاثنين إن الجانبين سيواصلان المحادثات لإنهاء الصراع في قطر يوم الثلاثاء.

### ما الذي يدفعه الأمريكيون؟
وفقًا لزاندي، فإن أكبر النفقات المرتبطة بالحرب بالنسبة للأمريكيين كانت البنزين، والذي بلغ ذروته عند 4.56 دولار للغالون في 21 مايو قبل أن يتراجع إلى ما دون 4 دولارات للغالون في وقت سابق من هذا الشهر. ووجد أنه منذ بدء الحرب في 28 فبراير، دفع الأمريكيون ما متوسطه 300 دولار إضافية لملء خزانات وقود سياراتهم، وهو تقدير يأخذ في الاعتبار فقط التكلفة المرتفعة للبنزين العادي.

وقال زاندي إن ارتفاع تكاليف الديزل أدى أيضًا إلى زيادة تكلفة نقل المنتجات من المزارع والمصانع والموانئ البحرية، مما أدى إلى ارتفاع تكاليف البيع بالتجزئة. ويقدر أن الأسرة الأمريكية العادية أنفقت 200 دولار إضافية على البقالة بسبب ارتفاع تكاليف الوقود منذ بداية الحرب.

### أسعار الغاز والوقود بمرور الوقت
في 29 يونيو 2026، بلغ متوسط تكلفة البنزين على مستوى البلاد 3.86 دولار للغالون الواحد. وهذا أقل بـ 0.01 دولار عن اليوم السابق، وأقل بـ 0.01 دولار عن الشهر الماضي، وأعلى بـ 0.01 دولار عن العام الماضي.

تكاليف أخرى مرتبطة بالحرب تواجه الأسر الأمريكية منذ بدء الصراع في فبراير، وفقًا لزاندي:

• **ارتفاع أسعار الفائدة** — ما يقدر بـ 150 دولارًا في المتوسط في التكاليف المضافة. اعتبارًا من يناير، توقع العديد من المستثمرين أن يقوم مجلس الاحتياطي الفيدرالي بخفض سعر الفائدة القياسي. لكن الارتفاع المفاجئ في التضخم الناجم عن الحرب أحبط أي خطط من قبل البنك المركزي لخفض تكاليف الاقتراض، وفقًا للاقتصاديين، بل إن بعض المتنبئين توقعوا زيادة في أسعار الفائدة في وقت لاحق من هذا العام. وقال زاندي إن هذا يمثل فرصة ضائعة للمستهلكين والشركات.

• **ارتفاع تذاكر الطيران** — ما يقدر بـ 100 دولار في المتوسط كأعباء مضافة بسبب ارتفاع تكاليف وقود الطائرات. وأشار زاندي إلى أن شركات الطيران حملت المسافرين جزئيًا تكاليف الوقود المرتفعة.

• **تكاليف دافعي الضرائب لدعم العمليات العسكرية الأمريكية** — ما يقدر بـ 250 دولارًا في المتوسط في تكاليف مضافة. وفقًا لزاندي، تنفق الولايات المتحدة 50 مليون دولار إضافية يوميًا لإدارة الحرب ضد إيران. وقدر مسؤولون أمريكيون تحدثوا لشبكة CBS News في أبريل إجمالي الفاتورة الأمريكية للصراع بـ 50 مليار دولار. وقدر مسؤول في البنتاغون في أبريل تكلفة عملية "الغضب الملحمي" (Operation Epic Fury) التابعة لوزارة الدفاع بنحو 25 مليار دولار، على الرغم من أن هذا الرقم لم يأخذ في الاعتبار بالكامل المعدات المتضررة أو المدمرة أو المنشآت العسكرية الأمريكية.

وكتب زاندي: "إن تقديري بأن حرب إيران قد كلفت الأسرة الأمريكية العادية 1,000 دولار وآخذة في الارتفاع هو تقدير متحفظ في أفضل الأحوال. من المرجح أن تكون التكلفة الحقيقية أعلى — وأعلى بكثير".

كما حاول باحثون آخرون حساب تكلفة الحرب على الأسر الأمريكية. ويقدر باحثون في جامعة براون (Brown University) أن المستهلكين الأمريكيين أنفقوا ما مجموعه 64 مليار دولار إضافية، أو 486.41 دولار لكل أسرة، على البنزين والديزل وحدهما منذ بداية الحرب. ويقدر معهد الضرائب والسياسة الاقتصادية (ITEP)، وهو مركز أبحاث غير حزبي، تكاليف الوقود المرتفعة بـ 427.50 دولار لكل أسرة.

وفي الأسابيع الأخيرة، شهد السائقون بعض الانفراجة. ومن المتوقع أن تستمر أسعار الوقود في الانخفاض، على الرغم من أن ذلك يتوقف على وقف الأعمال العدائية بين الولايات المتحدة وإيران. ويوم الاثنين، بلغ المعدل الوطني لغالون البنزين 3.86 دولار، انخفاضًا من 4.39 دولار قبل شهر ولكن ارتفاعًا من 2.98 دولار قبل بدء الحرب، وفقًا لبيانات جمعية السيارات الأمريكية (AAA).

ويعتقد باتريك دي هان، خبير البترول في GasBuddy، أن أسعار البنزين قد تنخفض إلى ما دون 3 دولارات بحلول نهاية العام أو أوائل العام المقبل، بافتراض إنهاء الحرب بين الولايات المتحدة وإيران.

وفقًا لاستطلاع رأي أجرته مؤسسة غالوب (Gallup) في يونيو، أبلغ ثلثا الأمريكيين عن تعرضهم لصعوبات مالية بسبب الزيادات الأخيرة في أسعار الوقود.`,
    contentEn: `US translation of CBS News investigative coverage on the financial toll of the Iran conflict.
Original publication: June 29, 2026 / 2:27 PM EDT / CBS News
Original Link: https://www.cbsnews.com/news/iran-war-cost-american-households/

The Iran war has cost Americans roughly $1,000 per household in higher fuel, food and other expenses since the start of the conflict in February, according to an estimate shared last week by Moody's Analytics chief economist Mark Zandi.

Zandi's analysis comes as government data shows inflation in May hit its highest level in three years, and with the U.S. and Iran yet to broker a lasting peace deal. The two countries exchanged military strikes over the weekend, threatening a fragile ceasefire. The sides will continue talks to end the conflict in Qatar on Tuesday, President Trump said on Monday. 

### What are Americans paying for?
According to Zandi, the biggest war-related expense for Americans has been gasoline, which peaked at $4.56 a gallon on May 21 before dipping back below $4 a gallon earlier this month. Since the war began on Feb. 28, Americans have shelled out an additional $300 on average to fill up their tanks, he found, an estimate that only factors in the higher cost of regular gas. 

Higher diesel costs have also increased the cost of transporting products from farms, factories and seaports, leading to higher retail costs, Zandi said. He estimates the typical U.S. household has spent an extra $200 on groceries due to higher fuel costs since the start of the war.

### Gas prices over time
On Jun 29, 2026, the average cost of gas nationwide was $3.86 per gallon. That is $0.01 lower than the day before, $0.01 lower than a month ago and $0.01 higher than a year ago.

Other war-related costs facing American households since the conflict started in February, according to Zandi:

• **Higher interest rates** — an estimated $150 on average in added costs. As of January, many investors expected the Federal Reserve to cut its benchmark interest rate. But the surge in inflation stemming from the war has thwarted any plans by the central bank to lower borrowing costs, according to economists, with some forecasters even penciling in a rate hike later this year. That amounts to a missed opportunity for consumers and businesses, Zandi said.

• **Higher airfare** — due to surging jet fuel costs — an estimated $100 on average in added costs. Airlines have partially passed their higher fuel costs onto travelers, Zandi noted.

• **Taxpayer costs to support U.S. military operations** — an estimated $250 on average in added costs. According to Zandi, the U.S. is spending an additional $50 million per day to conduct the war against Iran. A separate estimate from U.S. officials who spoke to CBS News in April placed the total U.S. price tag for the conflict at $50 billion. A Pentagon official in April put the cost of the Defense Department's Operation Epic Fury at about $25 billion, although that figure did not fully account for damaged or destroyed equipment or U.S. military installations. 

"My estimate that the Iran war has cost the typical American household $1,000 and counting is, if anything, conservative," Zandi wrote. "The true cost is likely higher — meaningfully higher."

Other researchers have also tried to tabulate how much the war has cost American households. Brown University researchers estimate that U.S. consumers have spent an additional $64 billion in total, or $486.41 per household, on gas and diesel alone since the start of the war. The Institute on Tax and Economic Policy, a nonpartisan think tank, puts the higher fuel costs at $427.50 per household.

In recent weeks, motorists have seen some relief. Gas prices are expected to continue to decline, though that hinges on the U.S. and Iran ceasing hostilities. On Monday, the national average for a gallon of gas was $3.86, down from $4.39 a month ago but up from $2.98 before the war started, AAA data shows. 

Patrick De Haan, a petroleum expert at GasBuddy, thinks gas prices could fall below $3 by year-end or early next year, assuming the U.S. and Iran end the war. 

According to a June Gallup poll, two-thirds of Americans reported experiencing financial hardship due to recent fuel price increases.`,
    author: {
      nameAr: 'ماري كانينغهام',
      nameEn: 'Mary Cunningham',
      titleAr: 'محررة لدى CBS News',
      titleEn: 'Writer at CBS News',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120'
    },
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1200',
    date: '29 يونيو 2026',
    readTimeAr: '5 دقائق',
    readTimeEn: '5 min read',
    views: 8950,
    isPremium: false,
    tags: ['حرب إيران', 'التضخم الأمريكي', 'أسعار الوقود', 'الاحتياطي الفيدرالي', 'CBS News', 'موديز', 'Mark Zandi']
  },
  {
    id: 'ch12-hebrew-jd-vance-criticism-2026',
    category: 'translations',
    categories: ['translations', 'middle-east', 'us-politics'],
    titleAr: '"أمي مدمنة وفقر مدقع".. صحيفة عبرية تشن هجوما حادا على نائب الرئيس الأمريكي',
    titleEn: '"An Addicted Mother and Extreme Poverty": Hebrew Outlet Launches Sharp Attack on US Vice President JD Vance',
    summaryAr: 'شنت "القناة 12" العبرية هجوما حادا على جي دي فانس نائب الرئيس الأمريكي دونالد ترامب، واصفة نشأته بالفقر المدقع، ومفصلة مواقفه المترددة ومزاعم تسريباته لخطط الموساد التي تثير قلقاً عميقاً في أوساط صناع القرار الإسرائيليين.',
    summaryEn: 'Israel\'s Channel 12 launches a biting critique of US Vice President JD Vance, exploring his impoverished Appalachian upbringing, shifting political alignments, and rising concerns in Jerusalem over his "America First" foreign policy stance.',
    excerptAr: 'هجوم حاد من القناة 12 العبرية على جي دي فانس نائب الرئيس الأمريكي تزامناً مع مفاوضات سويسرا وتلميحات تسريب خطط الموساد.',
    excerptEn: 'Hebrew Channel 12 launches a biting critique of US Vice President JD Vance, highlighting rising tensions over his foreign policy views and alleged intelligence leaks.',
    contentAr: `*تقرير استقصائي ومترجم حصرياً لصالح منصة الورّاق عن القناة العبرية الثانية عشرة (N12)*
*الإثنين، ٢٩ يونيو / حزيران ٢٠٢٦*

شنت "القناة 12" العبرية هجوما حادا على جي دي فانس نائب الرئيس الأمريكي دونالد ترامب.

وفي مقدمة المقال المطول تقول القناة: "نشأ جي دي فانس في فقر مدقع في أوهايو برعاية أم مدمنة على المخدرات وجدة لديها 19 مسدسا محشوا في المنزل.. فانس الذي وصف دونالد ترامب بأنه "هتلر أمريكا" أصبح خليفته المفترض ونائبه الحالي.. يقود نهجا يُقصي إسرائيل عن المشهد.. من الكتاب الذي تحول إلى فيلم على نتفليكس إلى الشكوك حول تسريبه بعض خطط الموساد إلى أردوغان.. لمحة عن الرجل الذي قد يشغل البيت الأبيض عام 2028".

وتضيف القناة العبرية، إن جي دي فانس نائب رئيس الولايات المتحدة حظي أخيرا بالظهور على الساحة الدولية وذلك في سويسرا وسط مناظر طبيعية خلابة تناقض تماما الدراما التي تتكشف في قاعات الاجتماعات وبعد مفاوضات شاقة مع الإيرانيين، في اللحظة التي قررت فيها أمريكا طي صفحة الشرق الأوسط القديم.

وفي نظر الكثيرين حول العالم، كان هذا الظهور الأول لقائد شاب فصيح وطموح، لكن هنا في القدس حقيقة أخرى، اكتشف الإسرائيليون أن جي دي فانس الرجل الذي يطمح لرئاسة الولايات المتحدة، ليس في صفهم حقا.

فانس الواقف أمام العالم أجمع يبدو كالرئيس المنصب الذي يطمح إليه، إنه مُهدّد، حاد الذكاء ولا يتردد في استخدام ما يطلق عليه السياسيون "أساليب المافيا في إدارة ترامب".

والآن، طالت هذه الأساليب إسرائيل، فانس سياسي بارع، طموحاته لا تنتهي عند حد منصب نائب الرئيس، أحد أهم ما يقدمه الآن للشعب الأمريكي بسيط ومرعب في آن واحد: "لقد انتهى الأمر مع إسرائيل".

### طفولة صعبة تم تحويلها إلى فيلم على نتفليكس

لفهم كيف وصل جي دي فانس إلى مكانة الرجل الأقوى في المكان، لا بد من العودة إلى جبال الأبلاش في أوهايو.

في أمريكا كما هو الحال في أي مكان آخر، يعشق الجمهور قصص سندريلا، وفانس بالتأكيد واحد منهم.

تبدو قصة حياته التي تحولت إلى كتاب حقق أعلى المبيعات ("يوميات الأبلاش") وحتى فيلم عرض على نتفليكس، وكأنها مأخوذة من أحلك عوالم الخيال.

نشأ فانس في فقر مدقع، لكن قلة المال لم تكن مشكلته الأكبر، كانت والدته مدمنة على المخدرات والكحول، وكانت تغير شركاءها وتيرة سريعة، أما والده فكان غائبا تماما عن حياته.

لقد نشأ وسط أقسى ظروف الطبقة العاملة الأمريكية حيث اليأس والعنف وتعاطي المواد الأفيونية بكثرة.

نشأ في كنف جدته وهي امرأة قوية لم تتخل عنه لحظة، لكنها كانت بدورها شخصية صعبة المراس.

قال فانس إنه بعد وفاتها اكتشف ما لا يقل عن 19 مسدسا ملقّما في أماكن متفرقة من منزلها، تحسبا لأي طارئ.

هذه هي البيئة التي شكلت نظرته للعالم: عالم البقاء، حيث لا يعتمد المرء إلا على نفسه وعائلته محدودة المؤهلات.

### من قمة جامعة ييل إلى التحول السياسي

رغم البداية الصعبة للغاية، لم يستسلم فانس حيث التحق بسلاح مشاة البحرية، وخدم في العراق، وتخرج من الجامعة بفضل المنح الدراسية.

وواصل مسيرته الأكاديمية نحو القمة ودراسة القانون في جامعة ييل، أعرق كلية في الولايات المتحدة وهناك انفتحت أمامه أبواب لم يكن يحلم بها قط، حيث عيّن في شركة استثمارية في وادي السيليكون، وحظي بدعم الملياردير المحافظ بيتر ثيل.

وفي سن الحادية والثلاثين، كان بالفعل ضيفا ناجحا ومرغوبا فيه، وكان ذلك في عام 2016، وكانت أمريكا تخوض غمار الانتخابات الرئاسية بمرشح مثير للجدل يدعى دونالد ترامب.

وفي ذلك الوقت، لم يكن فانس معجبا بترامب على أقل تقدير، بل إنه تساءل بصوت عال في نقاش على "فيسبوك" عما إذا كان ترامب "هتلر أمريكا".

لكن السياسة كما نعلم قد تكون مفاجئة وأدرك فانس كغيره الكثيرين، أن ترامب يمتلك كاريزما قادرة على استقطاب جماهير غفيرة، وتحديدا أولئك الذين نشأ بينهم.

اقتنع فانس بأنه لا خيار أمامه سوى أن يصبح حليفا لترامب وأن مستقبله في الحزب الجمهوري يكمن فقط في مار أ لاغو، وأجرى تحولا سياسيا جذريا (كوع)، وساعده ترامب في الفوز بمقعد في مجلس الشيوخ عن ولاية أوهايو.

وبعد فترة قصيرة استثنائية في الكونغرس، اختاره ترامب بالفعل ليخوض معه الانتخابات الرئاسية.

وفاز هذا الثنائي: الرجل الأكبر سنا والأكثر مالا الذي ولد وفي فمه ملعقة من ذهب، وإلى جانبه الشاب الذي شق طريقه من الحضيض.

### الزيارة إلى إسرائيل التي انتهت بصراحة ووضوح

كان الإعلامي تاكر كارلسون هو من يقف وراء كواليس تعيين فانس نائبا للرئيس.

وكارلسون الذي أصبح مع مرور الوقت أحد أشد معارضي إسرائيل، وجد في فانس حليفا أيديولوجيا وهذه العلاقة أعمق مما قد يتصوره المرء: حتى أن ابن كارلسون، باكلي، عمل في مكتب فانس حتى وقت قريب".

وعلى الرغم من حياته السياسية المضطربة، إلا أن حياته الشخصية مستقرة، فهو متزوج من أوشا ابنة مهاجرين هنود وأم لأطفاله الثلاثة، وينتظر مولودا رابعا.

بدأت علاقة فانس بإسرائيل بداية حادة، وصل إلى تل أبيب ظاهريا للمساعدة في محادثات وقف إطلاق النار في غزة، لكنه اكتشف أثناء وجوده هناك أن الكنيست قد صوت على ضم الضفة الغربية.

وأدرك فانس على الفور مع من يتعامل، فتخلى عن الخطاب الدبلوماسي ورد بصراحة ووضوح.

وكانت صفعة سياسية مدوية، ولم يزد الوضع إلا سوءا منذ ذلك الحين.

### عملية "زئير الأسد" والطعنة في الظهر

فانس يُعرّف نفسه بأنه شخصية مستقلة يكره الحروب وهو ما لا يتناسب مع واقع الشرق الأوسط، إنه نموذج كلاسيكي لأنصار شعار "لنجعل أمريكا عظيمة مجددا"، رجل أناني ذو سياسة خارجية محدودة يردد باستمرار: "لسنا شرطة العالم".

وبالنسبة له، إسرائيل مشكلة تكلف الولايات المتحدة أموالا وتعقّد علاقاتها مع شركاءهم كدول الخليج والسعودية.

بلغت الحرب ذروتها خلال عملية "زئير الأسد" وخان دونالد ترامب ناخبيه وفعل ما وعد بعدم فعله، فشن حربا طويلة في الشرق الأوسط، ألحقت ضررا بالغا بالاقتصاد الأمريكي.

وكان فانس بصفته نائب الرئيس، معارضا لها منذ البداية، وتشير مصادر في الإدارة إلى أنه لو كان فانس رئيسا، لما اندلعت هذه الحرب أبدا.

لكن ثمة مزاعم أشد خطورة، إذ يزعم مصدر أمني إسرائيلي رفيع أن فانس لم يكتف بمعارضة الحرب، بل ترأس مجموعة سعت إلى إفشالها وعملت على ذلك.

ويقول المصدر: "نشتبه في أن فانس ورجاله هم من سربوا إلى الرئيس التركي أردوغان خطة الموساد السرية لتغيير النظام في إيران بمساعدة الأكراد"، وقد نفى فانس هذه المزاعم واصفا إياها بأنها "محاولة سياسية إسرائيلية لتحميلي مسؤولية فشل الحرب".

### الصورة من سويسرا: من يملي على من؟

بلغت المواجهة ذروتها هذا الأسبوع، حيث حاول فانس تسويق مذكرة التفاهم الجديدة مع إيران للعالم على أنها انتصار عظيم لأمريكا، لكنها اعتُبرت في إسرائيل اتفاق استسلام مُذل.

صورة واحدة من قمة سويسرا لخصت الأمر برمته: فانس جالس أمام حاسوبه، والممثل القطري ينحني فوقه، وكأنه يملي عليه بنود الاتفاق.

وكان الرد الإسرائيلي غير مسبوق في شدته ووصفوه بـ"الحثالة" و"الخاسر"، وقالوا إن اتفاقية الاستسلام هذه بمثابة صفعة في وجه البلاد، لكن فانس لم يقف مكتوف الأيدي ففي محادثات مغلقة أوضح أن إسرائيل لا تملك حق النقض على المصالح الأمريكية ويقول معاونوه: "أنتم دولة يبلغ تعداد سكانها تسعة ملايين نسمة، لا يمكنكم إملاء سياساتكم على أعظم قوة في العالم".

وبالإضافة إلى ذلك، وفي أعقاب الانتقادات قال فانس على المنصة للعالم: "أي إسرائيلي يعتقد أن ترامب هو أكبر مشكلة تواجه إسرائيل عليه أن يستيقظ ويفهم الوضع الذي تمر به بلاده.. لو كنت عضوا في مجلس الوزراء الإسرائيلي، لما هاجمت الحليف القوي الوحيد المتبقي لي في العالم أجمع".

هذه الأساليب، التي تُذكّر بسلوك المنظمات الإجرامية هي السمة المميزة للإدارة الحالية، فإذا لم يتصرف البنك المركزي وفقا لرغبات ترامب يفتح تحقيقا ضده، وإذا نجحت المدعية العامة لولاية نيويورك في إدانته، تصبح هي نفسها هدفا، والآن إسرائيل هي الهدف ويريد فانس السلام في المنطقة للفوز بانتخابات عام 2028، وهو مستعد للتضحية بمصالح تل أبيب في سبيل ذلك.

### المستقبل: عام 2028 قادم

رغم محاولات ممثلي الحزب الجمهوري في إسرائيل تهدئة الوضع وتصويره على أنه "براغماتي"، إلا أن الحقيقة أكثر تعقيدا حيث يمثل فانس جيلا شابا في الولايات المتحدة لا يحب إسرائيل ببساطة فبالنسبة له تمثل العلاقة مع إسرائيل عبئا اقتصاديا وسياسيا.

وفي الانتخابات الرئاسية لعام 2028، سيواجه فانس شخصيات مثل ماركو روبيو، الذي يعتبر أكثر تأييدا لإسرائيل.

وفي الوقت نفسه، سيستمتع الرئيس ترامب بإدارة هذا الصراع على خلافة الرئيس فهو يعلم أن فانس ورقة رابحة ضد الطبقة العاملة، وأنه في حال فشل الاتفاق النووي مع إيران، يمكن توجيه ضربة قاضية لنائب الرئيس.

يجب على جي دي فانس أن يظهر ولاءه لترامب، لكنه في الوقت نفسه يشق لنفسه طريقا منفصلا وقد تكون ورقته الرابحة في الانتخابات المقبلة هي التخلي النهائي عن إسرائيل.

وفي ختام المقال تقول القناة: "الشاب الذي نشأ في أسرة مفككة ووصل إلى أقصى ما يمكن، قد يصبح أقوى رجل في العالم خلال عامين.. بالنسبة لإسرائيل يثير هذا السيناريو قلقا عميقا.. والسؤال هو: هل هذا سياسي يتأثر بالرأي العام فحسب، أم شخص قرر بصدق وإخلاص أن هذا التحالف التاريخي قد طويت صفحته؟".

المصدر: "القناة 12"`,
    contentEn: `*Exclusive translation for Al-Warraq news portal from Hebrew Channel 12 (N12)*
*Monday, June 29, 2026*

Hebrew "Channel 12" has launched a sharp, biting critique of US Vice President JD Vance, who serves under Donald Trump.

In the introduction to its extensive article, the channel writes: "JD Vance grew up in extreme poverty in Ohio under the care of a drug-addicted mother and a grandmother who kept 19 loaded guns in her house. Vance, who once described Donald Trump as 'America's Hitler,' has become his heir apparent and current vice president. He is leading an approach that marginalizes and excludes Israel from the picture. From his memoir that became a Netflix movie to suspicions surrounding his leaking of certain Mossad intelligence plans to Turkey's Erdogan—here is a detailed look at the man who could occupy the White House in 2028."

The Hebrew channel adds that JD Vance, the Vice President of the United States, has finally stepped onto the international stage in Switzerland. He did so amidst scenic natural landscapes that completely contrast with the high-stakes drama unfolding in meeting rooms, following exhausting negotiations with the Iranians, at the exact moment America has decided to turn the page on the old Middle East.

In the eyes of many worldwide, this was the debut of a young, articulate, and ambitious leader. However, here in Jerusalem, a different reality emerges: Israelis have discovered that JD Vance, the man who aspires to lead the United States, is not truly on their side.

Standing before the world, Vance looks like the president-in-waiting he longs to be: menacing, sharp-witted, and unhesitant to employ what politicians refer to as "mafia tactics" within the Trump administration.

Now, these tactics have reached Israel. Vance is a brilliant politician whose ambitions do not stop at the vice presidency. One of his key current messages to the American electorate is both simple and terrifying: "It is over with Israel."

### A Troubled Childhood Turned into a Netflix Movie

To understand how JD Vance reached the pinnacle of power, one must return to the Appalachian region of Ohio. In America, as elsewhere, the public loves a Cinderella story, and Vance is certainly one of them.

His life story, which became a bestselling book ("Hillbilly Elegy") and even a Netflix film, reads like something from the darkest realms of fiction. Vance grew up in extreme poverty, but lack of money was not his biggest obstacle. His mother was addicted to drugs and alcohol, changing partners in rapid succession, while his father was completely absent from his life.

He grew up amidst the harshest conditions of the American working class, defined by despair, violence, and rampant opioid abuse. He was raised by his grandmother, a tough woman who never abandoned him, but who was also a difficult personality herself. Vance recounted that after her death, he discovered at least 19 loaded handguns hidden throughout her house, kept ready for any emergency.

This was the environment that shaped his worldview: a world of pure survival, where one relies only on himself and his immediate family.

### From the Peak of Yale to Political Metamorphosis

Despite his incredibly challenging start, Vance did not surrender. He joined the Marine Corps, served in Iraq, and graduated from college thanks to academic scholarships. He continued his academic climb to the peak, studying law at Yale, the most prestigious law school in the United States. There, doors he had never dreamed of swung open. He was hired by an investment firm in Silicon Valley and gained the backing of conservative billionaire Peter Thiel.

By age 31, he was already a successful and sought-after guest. That was in 2016, when America was in the midst of a presidential election featuring a controversial candidate named Donald Trump. At the time, Vance was far from a fan of Trump, publicly questioning in a Facebook discussion whether Trump was "America's Hitler."

But politics, as we know, can be full of surprises. Vance, like many others, realized that Trump possessed a unique charisma capable of attracting massive crowds, particularly those among whom Vance grew up. Vance became convinced that he had no choice but to align with Trump, and that his future in the Republican Party lay only through Mar-a-Lago. He executed a radical political pivot, and Trump subsequently helped him win a U.S. Senate seat representing Ohio.

Following a remarkably brief tenure in Congress, Trump chose him as his vice-presidential running mate. The duo won: the older, wealthy man born with a silver spoon, and alongside him, the young man who fought his way up from the absolute bottom.

### The Visit to Israel That Ended in Blunt Sincerity

Media personality Tucker Carlson was the key figure working behind the scenes to secure Vance's nomination as vice president. Carlson, who has increasingly become one of Israel's fiercest critics, found an ideological ally in Vance. This relationship runs deeper than many assume; indeed, Carlson's son, Buckley, worked in Vance's office until recently.

Despite his turbulent political career, Vance's personal life is stable. He is married to Usha, the daughter of Indian immigrants, who is the mother of his three children, and they are expecting a fourth.

Vance's relationship with Israel got off to a sharp start. He arrived in Tel Aviv ostensibly to assist with Gaza ceasefire negotiations, but while there, he discovered that the Knesset had voted to annex the West West Bank. Vance immediately realized who he was dealing with, dropped all diplomatic double-speak, and replied with absolute clarity and bluntness. It was a resounding political slap, and relations have only deteriorated since.

### Operation "Lion's Roar" and the Stab in the Back

Vance defines himself as an independent figure who detests wars—a stance that clashes with Middle Eastern realities. He is a classic proponent of the "Make America Great Again" doctrine, a highly self-interested figure with a limited foreign policy focus who constantly repeats: "We are not the world's policeman."

To him, Israel is an expensive problem that costs the United States money and complicates relations with vital partners like the Gulf states and Saudi Arabia.

The conflict reached its peak during Operation "Lion's Roar." Donald Trump betrayed his voters, doing exactly what he promised not to do: launching a protracted war in the Middle East that severely damaged the American economy. Vance, as vice president, opposed it from the start. Administration sources indicate that if Vance were president, this war would never have broken out.

But there are even more serious allegations. A senior Israeli security source claims that Vance did not just oppose the war but chaired a group that actively sought to disrupt and defeat it. The source states: "We suspect that Vance and his associates leaked Mossad's secret plan to Turkish President Erdogan to orchestrate regime change in Iran with Kurdish assistance." Vance has denied these claims, calling them "an Israeli political attempt to blame me for the failure of the war."

### The Picture from Switzerland: Who is Dictating to Whom?

The confrontation came to a head this week as Vance attempted to market the new Memorandum of Understanding with Iran as a great victory for America, while in Israel it was viewed as a humiliating capitulation agreement.

A single photograph from the Switzerland summit summarized the situation: Vance seated at his computer, with the Qatari representative leaning over him, appearing to dictate the terms of the agreement.

The Israeli response was unprecedented in its severity, with officials labeling him "scum" and a "loser," declaring this capitulation agreement a slap in the face. But Vance did not sit idly by. In closed-door meetings, he clarified that Israel does not hold a veto over American interests. His aides stated: "You are a nation of nine million people. You cannot dictate your policies to the greatest superpower in the world."

Furthermore, in response to the criticism, Vance declared from the stage: "Any Israeli who believes Trump is the biggest problem facing Israel needs to wake up and understand the situation their country is in. If I were in the Israeli cabinet, I wouldn't be attacking the only strong ally left to me in the entire world."

These methods, reminiscent of organized crime tactics, are the hallmark of the current administration. If the central bank does not comply with Trump's wishes, an investigation is opened against it. If the New York state attorney general secures a conviction against him, she becomes a target. Now, Israel is the target. Vance wants peace in the region to win the 2028 election, and he is willing to sacrifice Tel Aviv's interests to achieve it.

### The Future: 2028 is Coming

Despite attempts by Republican Party representatives in Israel to calm the waters and paint him as a "pragmatist," the reality is far more complex. Vance represents a younger generation in the United States that simply does not love Israel. For him, the relationship with Israel is a major economic and political liability.

In the 2028 presidential race, Vance will face figures like Marco Rubio, who is seen as far more pro-Israel. Meanwhile, President Trump will enjoy managing this succession battle, knowing that Vance is a powerful asset to win over the working class, and that if the nuclear deal with Iran fails, it could deal a fatal blow to the vice president.

JD Vance must demonstrate loyalty to Trump, but he is simultaneously carving out his own independent path. His trump card in the next election may well be the final abandonment of Israel.

The channel concludes its article: "The young man who grew up in a broken family and reached the absolute top might become the most powerful man in the world in two years. For Israel, this scenario is deeply worrying. The question is: is this a politician merely swayed by public opinion, or someone who has genuinely and sincerely decided that this historic alliance is a closed chapter?"

Source: Channel 12`,
    author: {
      nameAr: 'مكتب التحقيقات المترجمة',
      nameEn: 'Foreign Intelligence & Translations Desk',
      titleAr: 'متابعات أجنبية وتحقيقات استخباراتية مترجمة',
      titleEn: 'Foreign Intelligence Desk',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    date: '2026-06-29',
    readTimeAr: '5 دقائق قراءة',
    readTimeEn: '5 min read',
    isFeatured: true,
    isPremium: false,
    tags: ['الولايات المتحدة', 'جي_دي_فانس', 'إسرائيل', 'ترجمات', 'دونالد_ترامب', 'القناة_12', 'US', 'JD_Vance', 'Israel', 'Trump', 'Channel_12'],
    views: 12450
  },
  {
    id: 'wsj-investigation-us-base-bahrain-2026',
    category: 'translations',
    categories: ['translations', 'war-room', 'lebanon'],
    titleAr: 'تحقيق لوول ستريت جورنال: رصد الحجم الحقيقي للأضرار الناتجة عن الهجمات الإيرانية على قاعدة أمريكية بالبحرين',
    titleEn: 'WSJ Visual Investigation: We Investigated Damage From Iran to a U.S. Naval Base. Here’s What We Found.',
    summaryAr: 'كشف تحقيق استقصائي لصحيفة "وول ستريت جورنال" باستخدام صور الأقمار الصناعية وسجلات البنتاغون عن أضرار بالغة لحقت بمقر قيادة الأسطول الخامس بالبحرين، مما دفع واشنطن لإعادة تقييم تموضعها العسكري في الشرق الأوسط.',
    summaryEn: 'Satellite imagery, social-media footage and Defense Department records analyzed by The Wall Street Journal reveal the extent of damage to the U.S. Navy’s Mideast headquarters in Bahrain from Iranian strikes, prompting a strategic rethink of America\'s footprint in the region.',
    excerptAr: 'تحقيق استقصائي يكشف الحجم الحقيقي للدمار في قاعدة الأسطول الخامس بالبحرين جراء ضربات الصواريخ والمسيرات الإيرانية.',
    excerptEn: 'Visual investigation uncovers extensive undisclosed damage from Iranian strikes at Naval Support Activity Bahrain.',
    contentAr: `*تقرير مترجم حصرياً لصالح منصة الورّاق عن صحيفة وول ستريت جورنال (The Wall Street Journal)*
*بقلم: أنيكا أرورا سيث، شيلبي هوليداي، دينيس بلوستين وميلان تشيرني | 27 يونيو 2026*

كشف تحقيق استقصائي أجرته صحيفة "وول ستريت جورنال" أن الولايات المتحدة تعيد رسم استراتيجية وجودها العسكري وتقييم تموضعها الجغرافي في منطقة الشرق الأوسط، وذلك بعد أن تسببت الضربات الصاروخية والطائرات بدون طيار الإيرانية في أضرار مادية جسيمة بأكثر من 20 موقعاً تستخدمها القوات الأمريكية في المنطقة، بما في ذلك مقر قيادة الأسطول الخامس والمنشآت التابعة له في مملكة البحرين، وهي أضرار تتجاوز بكثير ما تم الكشف عنه سابقاً بصفة رسمية.

وفيما يلي أربعة محاور أساسية يلخصها التحقيق البصري الاستقصائي:

### 1. دمار واسع يطال القاعدة البحرية الأمريكية الوحيدة في الشرق الأوسط
بين أواخر فبراير ويونيو، استهدفت إيران مراراً وتكراراً منشأة الدعم البحري الأمريكي في البحرين (Naval Support Activity Bahrain)، والمعروفة اختصاراً باسم **NSA Bahrain**.

وقد أظهرت صور الأقمار الصناعية عالية الدقة والوثائق التي تم فحصها، تضرر مقر القيادة العملياتية المباشر وما لا يقل عن 12 مبنى ملحقاً آخراً داخل المجمع، إلى جانب تدمير أو تعطيل محطتين رئيسيتين للاتصالات السلكية واللاسلكية عبر الأقمار الصناعية.

من جهتها، صرحت وزارة الدفاع الأمريكية (البنتاغون) بأنه لم تقع وفيات أو خسائر بشرية في الأرواح داخل القاعدة، وأن الضربات لم تؤثر بشكل حاسم على مجريات العمليات اليومية. إلا أن المصادر أكدت أن الولايات المتحدة قامت بإجلاء غالبية الموظفين غير الأساسيين وعائلاتهم، مبقية على طاقم عمل محدود للغاية على الأرض لتسيير المهام الحرجة.

### 2. الجيش الأمريكي يعيد تقييم "بصمته العسكرية" في المنطقة
وفقاً لمسؤولين أمريكيين مطلعين على المداولات الجارية، فإن البنتاغون يدرس حالياً إجراء مراجعة شاملة وإعادة تصميم هيكلية لقاعدته الحيوية في البحرين، مع خفض تدريجي ومستهدف للوجود العسكري المباشر في دول مثل الكويت والمملكة العربية السعودية، ونقل بعض القواعد الاستراتيجية أو وظائفها الأساسية غرباً، بعيداً عن المدى الفعال للصواريخ الباليستية والطائرات المسيرة الهجومية الإيرانية.

وأفاد المسؤولون أن المنشآت الحيوية التي تعرضت للقصف قد لا يتم إعادة بنائها بشكلها التقليدي السابق؛ بل يُقترح نقل غرف العمليات وعقد القيادة والسيطرة الحساسة تحت الأرض في تحصينات خرسانية عميقة، وتشتيت القدرات القتالية واللوجستية للجيش الأمريكي على مساحات أوسع في المنطقة لتقليل جاذبيتها كأهداف مركزية. وتعد إسرائيل من بين المواقع المطروحة في النقاش كخيار بديل لاستضافة بعض هذه القدرات الدفاعية المتقدمة.

### 3. تكاليف إعادة الإعمار تقدر بمئات الملايين من الدولارات
أبلغ المراقب المالي للبنتاغون، جاي هيرست، الكونغرس الأمريكي في جلسة استماع مغلقة الشهر الماضي أن تقديرات الوزارة لكلفة العمليات الحربية في الشرق الأوسط (والتي بلغت حتى تاريخه 29 مليار دولار) لم تشمل على الإطلاق تكاليف إصلاح الأضرار الهيكلية التي لحقت بالقواعد العسكرية الأمريكية جراء القصف.

وفي جلسة استماع علنية أخرى في مايو الماضي، سُئل وزير الدفاع الأمريكي بيت هيغسيث عن تقدير كلفة هذا الدمار، فأجاب متسائلاً بلهجة دلالية: "ما هي التكلفة المترتبة على حصول إيران على سلاح نووي؟" في إشارة إلى أن كلفة الردع والدفاع تظل ثانوية أمام الخطر الاستراتيجي الأكبر.

وتقدر صحيفة "وول ستريت جورنال" - بناءً على مراجعة دقيقة لنموذج تكلفة البناء المعتمد لدى وزارة الدفاع وتقارير المشتريات المتاحة للعموم - أن تكلفة إعادة تشييد مبانٍ مماثلة لتلك التي تضررت في قاعدة البحرين (NSA Bahrain) لوحدها تبلغ حوالي **400 مليون دولار**. ولا يشمل هذا التقدير تكاليف إزالة الأنقاض والركام، والتحصينات الهندسية الإضافية، أو الاستبدال الفوري للأجهزة التقنية الحساسة وأنظمة الاتصالات المدمرة.

بالمقابل، قدر "مركز الدراسات الاستراتيجية والدولية" (CSIS) في تقرير شامل نُشر مؤخراً، أن التكلفة الإجمالية المباشرة للصراع بلغت نحو 40 مليار دولار، مشيراً إلى أن تقديره يتضمن ما بين 2.2 مليار إلى 5.1 مليار دولار كأضرار مباشرة لحقت بالقواعد العسكرية الأمريكية المنتشرة في عموم دول المنطقة، وذلك استناداً إلى المنشآت والتحصينات المحددة بدقة عبر الرصد الفضائي.

### 4. السلاح النقطي الحديث يجعل القواعد الثابتة فريسة سهلة
تأسست قاعدة البحرين البحرية (NSA Bahrain) وتم توسيعها في فترات زمنية سبقت امتلاك طهران لترسانتها الحالية الضخمة من الصواريخ الموجهة بدقة وطائرات "كاميكازي" المسيرة منخفضة التكلفة، حيث كشفت هذه الجولة من الصراع المفتوح عن نقاط ضعف هيكلية خطيرة في بنية الدفاع الصاروخي التقليدي للمنشآت الثابتة المفتوحة.

وقبل اندلاع هذه الموجة، حذر قادة عسكريون بارزون من أن القواعد الأمريكية المطلة على مياه الخليج العربي تقع بالكامل داخل نطاق نيران معادية مكثفة وغير محمية بما يكفي. وتم طرح مقترح في عهد الرئيس ترامب لنقل المنشآت نحو الغرب، لكنه ظل حبيس الأدراج دون تنفيذ عملي.

وفي تعقيب على هذه التطورات، صرح المتحدث باسم القيادة المركزية الأمريكية (سنتكوم)، الكابتن تيم هوبكنز: "لقد منحت القيادة الأولوية القصوى والبديهية لحماية الأرواح البشرية والجنود قبل التفكير في سلامة الجدران والمباني الخرسانية، وقد نجحت استراتيجيتنا الحمائية بامتياز؛ إذ أطلقت إيران أكثر من 8000 صاروخ ومسيرة انتحارية طوال فترة الحرب، ولم تسفر هذه الاستهدافات سوى عن إصابتين قاتلتين فقط في صفوف جنودنا".`,
    contentEn: `*Translated Report from The Wall Street Journal*
*By Anika Arora Seth, Shelby Holliday, Denise Blostein and Milàn Czerny | June 27, 2026*

A Wall Street Journal investigation found that the U.S. is rethinking its footprint in the Middle East after Iranian missile and drone attacks caused more damage than previously disclosed to at least 20 U.S. sites, including the Navy’s base in Bahrain. Here are four takeaways from our reporting.

### 1. America’s only naval base in the Middle East was extensively damaged
Between late February and June, Iran repeatedly targeted Naval Support Activity Bahrain, known as NSA Bahrain. Hit hard were the command headquarters and at least a dozen other buildings, along with two satellite communications terminals. 

The military said no one was killed at the base and that the strikes didn’t significantly affect operations. The U.S. evacuated most personnel but has kept a small staff on the ground.

### 2. The U.S. military is now re-evaluating its footprint in the Middle East
The military is now considering revamping the base in Bahrain, reducing the U.S. presence in Kuwait and Saudi Arabia and moving some bases or base functions west, farther from the reach of Iranian missiles and drones, according to the officials familiar with the deliberations. 

Structures that were attacked may not be rebuilt. Command and control nodes could be moved underground. And military capabilities could become more spread out across the region, the officials said, though they cautioned that no decisions had been made. Israel is one of the locations being considered for basing, according to two of the officials.

### 3. Construction could cost hundreds of millions of dollars
Pentagon comptroller Jay Hurst told Congress last month that the department’s estimated cost of the war, then at $29 billion, didn’t include damage to U.S. bases. In a May congressional hearing, Defense Secretary Pete Hegseth was pressed for a cost estimate of that damage. “What is the cost of Iran obtaining a nuclear weapon?” he replied.

The Journal estimates that it would cost about $400 million to construct buildings of the same types as those damaged at NSA Bahrain, according to a review of a publicly available Defense Department cost model and procurement reports. 

The estimates only cover construction, and don’t include other costs that could factor into the total if the buildings were to be rebuilt, such as debris removal and reinforcement.  

The Center for Strategic and International Studies estimated in a report published Tuesday that the total cost of the war was about $40 billion—an estimate that included its calculus of $2.2 billion to $5.1 billion in damage to U.S. bases across the region, based on structures the think tank identified as damaged.

### 4. Modern precision weapons have made bases more vulnerable
NSA Bahrain was built long before Iran possessed the arsenal of precision missiles and drones it has today, and the war revealed its vulnerabilities. 

Before the war, some military officials warned that bases in the Gulf were exposed. A proposal to move installations farther west was floated in President Trump’s first term but never acted on.

Over the course of the war, “Centcom rightfully prioritized the protection of people over buildings, and our strategy of protecting people worked. Iran shot more than 8,000 missiles and drones and only two hits resulted in U.S. fatalities,” said Capt. Tim Hawkins, a spokesman for U.S. Central Command, which oversees U.S. forces in the Middle East.`,
    author: {
      nameAr: 'أنباء وول ستريت جورنال (ترجمة حرة لـ الورّاق)',
      nameEn: 'WSJ Visual Investigation (Translated)',
      titleAr: 'متابعات أجنبية وتحقيقات استخباراتية مترجمة',
      titleEn: 'Foreign Intelligence & Translations Desk'
    },
    imageUrl: 'https://images.unsplash.com/photo-1504118531757-2c9950d70391?auto=format&fit=crop&w=1200&q=80',
    date: '2026-06-27',
    readTimeAr: '4 دقائق قراءة',
    readTimeEn: '4 min read',
    isFeatured: true,
    isPremium: false,
    tags: ['الولايات المتحدة', 'البحرين', 'إيران', 'الأسطول الخامس', 'البنتاغون', 'USA', 'Bahrain', 'Iran', 'NSA Bahrain', 'WSJ'],
    views: 8900
  },
  {
    id: 'lebanon-ceasefire-mirage-2026',
    category: 'translations',
    categories: ['translations', 'war-room', 'lebanon'],
    titleAr: 'سراب وقف إطلاق النار في لبنان وشبح الصراع الداخلي الذي يلوح في الأفق',
    titleEn: 'The Mirage of Ceasefire in Lebanon and the Looming Shadow of Domestic Conflict',
    summaryAr: 'تحليل استقصائي لتعثر الجهود الدبلوماسية لتطبيق القرار ١٧٠١ في لبنان، وتفجر الخلافات الجوهرية بين الدولة اللبنانية وحزب الله حول حصرية قرار الحرب وننزع السلاح.',
    summaryEn: 'An investigative analysis of the structural hurdles facing the implementation of Resolution 1701 in Lebanon, and the explosive friction between the state cabinet and Hezbollah regarding weapons monopoly.',
    excerptAr: 'كواليس التوترات السياسية والعسكرية بين الحكومة اللبنانية وحزب الله حول تمركز الجيش جنوب الليطاني ونزع سلاح الميليشيات.',
    excerptEn: 'The behind-the-scenes political and military tension regarding the deploying of Lebanese army units and disarming non-state factions.',
    contentAr: `### الشرخ المالي والسيادي المتفجر في لبنان
اعتباراً من أواخر يونيو/حزيران 2026، يقف لبنان في أحد أكثر مفترقات الطرق تقلبًا في تاريخه الحديث. أدى الدمار الهائل الذي خلفه صراع عام 2026 - والذي أسفر عن نزوح أكثر من مليون مدني وتدمير البنية التحتية في الجنوب وضواحي بيروت - إلى فرض جهود دبلوماسية مكثفة لتأمين سلام دائم. ومع ذلك، فإن "الاختراقات" الدبلوماسية التي تتفاوض عليها الدولة تصطدم بعنف مع الواقع على الأرض: وهو شرخ متفجر بين الحكومة اللبنانية وحزب الله.

يرتكز جوهر الخلاف على تنفيذ قرار مجلس الأمن الدولي رقم 1701، والذي يدعو إلى تمركز حصر السلاح بيد الجيش اللبناني وقوات اليونيفيل جنوب نهر الليطاني. وترى الحكومة اللبنانية، مدعومة بضغوط دولية وعربية هائلة، أن هذه اللحظة تمثل فرصة أخيرة لاستعادة سيادة الدولة الكاملة وتجنب جولة جديدة من التدمير الإسرائيلي الشامل.

### مواقف متباعدة والخط الأحمر لسلاح المقاومة
في المقابل، يرفض حزب الله بشكل قاطع أي مساس بترسانته العسكرية أو نزع سلاحه، معتبراً أن السلاح خط أحمر للدفاع والردع الوطني، وأن الضغوط الغربية هي "أملاءات استسلام" تخدم المصالح الإسرائيلية. ويتهم مسؤولو الحزب الحكومة بتقديم تنازلات سيادية دون ضمانات حقيقية لردع الاعتداءات المستقبلية.

أدى هذا الاستقطاب الشديد إلى شحن الأجواء الطائفية والسياسية في بيروت بشكل يثير شبح الحرب الأهلية أو الصدام الداخلي الدامي. ويخشى المراقبون من أن يؤدي تفاقم هذا الانقسام إلى تفتيت بنية الجيش اللبناني نفسه، والذي يمثل صمام الأمان الوحيد المتبقي للاستقرار الأهلي.

### مأزق المفاوضات والحلول المستحيلة
تجد الدولة اللبنانية نفسها في مأزق مزدوج قاتل:
1. **الخيار الأول:** الإصرار على نزع السلاح قسراً لتلبية الشروط الدولية، وهو ما يعني الانزلاق الفوري إلى صدام عسكري داخلي وفتنة طائفية قد تدمر ما تبقى من الكيان اللبناني.
2. **الخيار الثاني:** التراجع والقبول باستمرار نفوذ حزب الله العسكري، مما يعرض لبنان لعزلة دولية خانقة ويشرع الباب لضربات إسرائيلية متواصلة تطال كافة المنشآت الحيوية في البلاد.

بين هذين الخيارين الصعبين، يبدو السلم المستدام مجرد سراب دبلوماسي، في وقت تتراكم فيه أطنان الركام المادية والسياسية مهددة بنسف الهوية الوطنية والسيادة اللبنانية بشكل غير قابل للإصلاح.`,
    contentEn: `### The Sovereign and Political Fracture in Lebanon
As of late June 2026, Lebanon stands at one of the most volatile crossroads in its modern history. The devastating ruins left by the 2026 conflict—which displaced over a million civilians and destroyed infrastructure in the South and Beirut's suburbs—have forced intensive diplomatic efforts to secure a lasting peace. However, the diplomatic "breakthroughs" negotiated by the state are crashing violently into the reality on the ground: an explosive rift between the Lebanese Government and Hezbollah.

The core of the dispute hinges on the implementation of UN Security Council Resolution 1701, which calls for the exclusive deployment of weapons to the Lebanese Army and UNIFIL south of the Litani River. The Lebanese Government, backed by immense international and Arab pressure, views this moment as a final opportunity to reclaim full state sovereignty and avert another round of total Israeli destruction.

### Divergent Stances and the Redline of the Defensive Arsenal
In contrast, Hezbollah flatly rejects any compromise on its military arsenal, declaring its weapons a non-negotiable redline for national defense and deterrence. Hezbollah officials accuse the cabinet of surrendering sovereign rights to US and Western diplomatic dictates without receiving real security guarantees to deter future Israeli raids.

This intense polarization has charged sectarian and political sentiments in Beirut, raising the specter of civil strife or armed domestic clashes. Independent analysts fear that a prolonged division could fracture the cohesion of the Lebanese Armed Forces (LAF)—the country's final remaining anchor of domestic stability.

### The Twin Trap of Impossible Resolutions
The Lebanese state is caught in a deadly twin trap:
1. **The First Path:** Aggressively enforcing disarmament to satisfy international donors, which guarantees an immediate descent into internal civil conflict and sectarian warfare.
2. **The Second Path:** Backing down and accepting Hezbollah's parallel military authority, exposing Lebanon to global isolation and recurrent Israeli strikes.

Between these two disastrous options, a sustainable peace remains a diplomatic mirage, as the pile of physical and political ruins threatens to permanently dissolve Lebanese sovereign identity.`,
    author: {
      nameAr: 'أنباء الورّاق (تحقيق سيادي خاص)',
      nameEn: 'Al-Warraq Special Investigative Unit',
      titleAr: 'شعبة التحريات السيادية والتحليل الميداني',
      titleEn: 'Sovereign Investigations & Intelligence Desk'
    },
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    date: '2026-06-28',
    readTimeAr: '٥ دقائق قراءة',
    readTimeEn: '5 min read',
    isFeatured: true,
    isPremium: false,
    tags: ['قرار_١٧٠١', 'سلاح_المقاومة', 'الجيش_اللبناني', 'الفتنة', 'Lebanon_Ceasefire', 'Resolution_1701', 'Civil_Strife', 'Sovereignty'],
    views: 9400
  },
  {
    id: 'lebanon-economic-abyss-2026',
    category: 'translations',
    categories: ['translations', 'war-room', 'lebanon'],
    titleAr: 'الهاوية الاقتصادية: الأنقاض، واللاجئون، ونظام مالي مشلول',
    titleEn: 'The Economic Abyss: Rubble, Refugees, and a Crippled Financial System',
    summaryAr: 'تحليل للأرقام الكارثية للضرر الاقتصادي والدمار المادي المتراكم جراء صراع عام ٢٠٢٦، وتفشي الفقر والبطالة وشلل القطاع المصرفي اللبناني.',
    summaryEn: 'An autopsy of the catastrophic economic damage and material destruction of the 2026 war, documenting deep poverty, refugees, and the frozen financial system.',
    excerptAr: 'بلغت خسائر لبنان الاقتصادية ١٤ مليار دولار مع فجوة تمويلية تتجاوز ١١ ملياراً لإعادة إعمار البنية التحتية والجنوب.',
    excerptEn: 'Lebanon’s economic losses have reached $14 Billion with a funding gap exceeding $11 Billion to rebuild basic utilities and housing.',
    contentAr: `### الكارثة الصامتة: خسائر تفوق الناتج المحلي
تجاوزت الأضرار والخسائر الاقتصادية الناجمة عن صراع عام 2026 في لبنان عتبة الـ 14 مليار دولار، وهو رقم كارثي يعادل تقريباً الناتج المحلي الإجمالي السنوي للبلاد. وفي بيئة مالية منهكة مسبقاً جراء أزمة الانهيار النقدي المستمر منذ عام 2019، يدخل لبنان مرحلة الهاوية الكاملة مع شلل تام للمرافق الخدمية والإنتاجية العامة.

وتقدر الجهات الدولية المانحة والبنك الدولي كلفة إعادة إعمار البنية التحتية والمباني المهدمة بنحو 11 مليار دولار، وهي فجوة تمويلية صاعقة تفوق قدرة الدولة اللبنانية المفلسة على سدها بملايين المرات، في ظل إحجام المانحين الخليجيين والدوليين عن تقديم قروض أو منح جديدة دون إقرار حزمة الإصلاحات المالية الصارمة وإعادة هيكلة القطاع المصرفي المجمد.

### أزمة النازحين الحادة وشلل التعليم والزراعة
خلّف الصراع مأساة إنسانية ومعيشية غير مسبوقة:
* 🏠 **نزوح أكثر من ١.٢ مليون مدني:** يعيش مئات الآلاف منهم في مخيمات عشوائية أو مدارس تحولت لمراكز إيواء مؤقتة تفتقر لأبسط مقومات الحياة والخدمات الأساسية.
* 🎓 **تعطل العملية التعليمية:** حُرم أكثر من 166,000 طالب وطالبة من مقاعد الدراسة بعد أن تحولت جل المدارس الرسمية والجامعات إلى مراكز إيواء للنازحين.
* 🌾 **شلل القطاع الزراعي في الجنوب والكورة:** تسببت القذائف الفوسفورية والحرائق المستمرة في تدمير وتلويث أكثر من 78% من الأراضي الزراعية والمحاصيل الأساسية، مما شل حركة الإنتاج المحلي ورفع معدلات الفقر المعيشي إلى مستويات قياسية بلغت 79% من إجمالي السكان.

### شلل القطاع المصرفي واحتجاز أموال المودعين
تكمن الفاجعة الكبرى في غياب أي نظام مالي أو مصرفي قادر على تمويل عجلة الاقتصاد؛ فالودائع الخاصة بالمواطنين والشركات محتجزة بالكامل داخل البنوك التجارية التي تعاني من عجز سيولة حاد وغيبوبة سريرية ممتدة. 

ويرفض البنك المركزي اللبناني (مصرف لبنان) إقراض الدولة بالعملة الأجنبية أو المساس بما تبقى من احتياطيات دولارية شحيحة للحفاظ على استقرار سعر صرف الليرة الهش بالقرب من 89,500 ليرة للدولار، مما يحرم البلاد من أي سيولة مالية حقيقية لتمويل عمليات الإغاثة العاجلة أو إزالة ملايين الأطنان من الركام والأنقاض المتراكمة بالبلاد.

ومع غياب قنوات التمويل الخارجي واشتراط صندوق النقد الدولي تمرير القوانين الإصلاحية المجمدة بمجلس النواب، يظل مستقبل لبنان رهينة شلل مؤسساتي ودستوري مطبق يهدد بتحويل البلاد من حالة "الدولة المأزومة" إلى الكيان الفاشل كلياً.`,
    contentEn: `### The Silent Catastrophe: Losses Dwarfing GDP
The economic damage and material losses resulting from the 2026 war in Lebanon have crossed the catastrophic threshold of $14 Billion—a figure almost equal to the country's entire annual GDP. Already battered by a chronic monetary collapse since 2019, Lebanon is sinking into an absolute economic abyss, defined by the complete paralysis of public services and production grids.

International organizations and the World Bank estimate the immediate physical reconstruction cost for destroyed houses and utilities at $11 Billion. This represents a staggering funding gap that the bankrupt Lebanese Treasury has zero capacity to fill. Gulf and Western donors refuse to unlock any credit lines or developmental grants until the cabinet executes strict banking reforms and audits the frozen liabilities of local banks.

### Deep Refugee Crisis and the Collapse of Education and Farming
The war has triggered unprecedented humanitarian and social distress:
* 🏠 **1.2 Million Forced Displaced:** Hundreds of thousands survive in temporary shelters or public schools lacking basic sanitation, clean water, and power.
* 🎓 **Interrupted Schooling:** More than 166,000 students remain locked out of educational tracks because public schools and universities were converted into refugee shelters.
* 🌾 **Agricultural Poisoning in the South:** Phosphorous shelling and continuous fires have damaged or poisoned over 78% of fertile farmlands in the South, destroying olive groves and citrus orchards, pushing the national poverty rate to an unprecedented 79%.

### Comatose Banking System and Frozen Deposits
The central pillar of the crisis is the total paralysis of the financial sector. Customer and commercial deposits remain locked inside comatose commercial banks experiencing extreme liquidity shortages.

The Central Bank of Lebanon (BDL) refuses to finance the state in foreign currencies or deplete its remaining scarce dollar reserves, prioritizing the artificial stabilization of the Lebanese Pound exchange rate near 89,500 LBP per USD. This leaves the cabinet with no capital to fund basic disaster relief or clear millions of tons of rubble choking towns.

Without external donor support and with the IMF conditioning its rescue package on structural laws frozen by parliament, Lebanons future remains trapped in a deep institutional paralysis that threatens to dissolve the state into a completely failed entity.`,
    author: {
      nameAr: 'أنباء الورّاق (قسم التحليل المالي والدمار)',
      nameEn: 'Al-Warraq Sovereign Financial Desk',
      titleAr: 'التحريات والتدقيق المالي والمكرو-اقتصادي',
      titleEn: 'Macroeconomic Audit & Sovereign Assets Research'
    },
    imageUrl: 'https://images.unsplash.com/photo-1547483238-2cbf88bc33a4?auto=format&fit=crop&w=1200&q=80',
    date: '2026-06-28',
    readTimeAr: '٥ دقائق قراءة',
    readTimeEn: '5 min read',
    isFeatured: true,
    isPremium: false,
    tags: ['الانهيار_المالي', 'إعادة_الإعمار', 'النازحون', 'الأزمة_المصرفية', 'Lebanon_Abyss', 'Financial_Collapse', 'Refugee_Crisis', 'Reconstruction_Gap'],
    views: 11200
  },
  {
    id: 'lebanon-framework-agreement-analysis-2026',
    category: 'lebanon',
    categories: ['lebanon', 'opinion', 'editor-desk'],
    titleAr: 'رأي: اتفاق الإطار: واقع جيولوجي غير مبشر وبواقع جيوسياسي وأمني متفجر',
    titleEn: 'Opinion: The Framework Agreement - An Unpromising Geological Reality in an Explosive Geopolitical and Security Landscape',
    summaryAr: 'يُشير مصطلح "اتفاق الإطار" في سياق العلاقات اللبنانية الإسرائيلية إلى التفاهم الذي أعلنه لبنان في أكتوبر/تشرين الأول 2020، والذي أسس لانطلاق مفاوضات غير مباشرة برعاية الأمم المتحدة ووساطة أمريكية. وقد تُوج هذا المسار الطويل في أكتوبر/تشرين الأول 2022 بتوقيع "اتفاقية ترسيم الحدود البحرية"، وهي تُعتبر تسوية اقتصادية وأمنية بحتة، وليست معاهدة سلام أو تطبيع سياسي. من الناحية الدبلوماسية والقانونية، حقق لبنان استفادة حقيقية بانتزاع اعتراف بحدوده البحرية وحقوقه في بلوكاته الجنوبية دون تقديم تنازلات سياسية أو أمنية تمس بسيادته. أما من الناحية الاقتصادية والمادية، فإن الفائدة حتى هذه اللحظة تبقى "نظريّة" ومؤجلة، ولم ينعكس الاتفاق على شكل إنقاذ مالي فعلي، حيث اصطدمت الآمال بواقع جيولوجي غير مبشر في الحفر الأول، وبواقع جيوسياسي وأمني متفجر في المنطقة عطل مسار الاستثمار برمته.',
    summaryEn: 'In the context of Lebanese-Israeli relations, the "Framework Agreement" refers to the understanding announced by Lebanon in October 2020, which launched indirect negotiations under UN auspices and US mediation. This long path culminated in October 2022 with the signing of the "Maritime Boundary Demarcation Agreement," which is considered a purely economic and security settlement rather than a peace treaty or political normalization. While Lebanon achieved sovereign and diplomatic gains, the actual economic benefits remain deferred, as exploratory hopes crashed into an unpromising geological reality and an explosive regional geopolitical and security landscape.',
    excerptAr: 'تسوية اقتصادية وأمنية بحتة حصدت مكاسب سيادية ودبلوماسية هامة، لكنها اصطدمت بواقع جيولوجي غير مبشر ووضع أمني وجيوسياسي متفجر عطل مسار الاستثمار برمته.',
    excerptEn: 'A purely economic and security compromise that secured significant sovereign gains, but crashed into an unpromising geological reality and an explosive geopolitical security landscape.',
    contentAr: `يُشير مصطلح "اتفاق الإطار" في سياق العلاقات اللبنانية الإسرائيلية إلى التفاهم الذي أعلنه لبنان في أكتوبر/تشرين الأول 2020، والذي أسس لانطلاق مفاوضات غير مباشرة برعاية الأمم المتحدة ووساطة أمريكية. وقد تُوج هذا المسار الطويل في أكتوبر/تشرين الأول 2022 بتوقيع "اتفاقية ترسيم الحدود البحرية"، وهي تُعتبر تسوية اقتصادية وأمنية بحتة، وليست معاهدة سلام أو تطبيع سياسي.

من الناحية الدبلوماسية والقانونية، حقق لبنان استفادة حقيقية بانتزاع اعتراف بحدوده البحرية وحقوقه في بلوكاته الجنوبية دون تقديم تنازلات سياسية أو أمنية تمس بسيادته. أما من الناحية الاقتصادية والمادية، فإن الفائدة حتى هذه اللحظة تبقى "نظريّة" ومؤجلة، ولم ينعكس الاتفاق على شكل إنقاذ مالي فعلي، حيث اصطدمت الآمال بواقع جيولوجي غير مبشر في الحفر الأول، وبواقع جيوسياسي وأمني متفجر في المنطقة عطل مسار الاستثمار برمته.

---

### أبرز بنود اتفاق الترسيم البحري (2022)

1. **اعتماد الخط 23:** تم ترسيم الحدود البحرية للمنطقة الاقتصادية الخالصة (EEZ) بين الطرفين بناءً على "الخط 23"، مما منح لبنان مساحة بحرية تبلغ حوالي 860 كيلومتراً مربعاً كانت محل نزاع.
2. **حقل قانا مقابل حقل كاريش:** نص الاتفاق على أن يحتفظ لبنان بكامل حقوق التنقيب والاستخراج في "حقل قانا" المحتمل (على أن تحصل إسرائيل على تعويضات مالية من أرباح الشركة المشغّلة مثل "توتال" وليس من حصة أو خزينة الدولة اللبنانية). في المقابل، احتفظت إسرائيل بالسيطرة الكاملة على حقل "كاريش" الغازي والمُعد للإنتاج.
3. **فصل المسار البري عن البحري:** حافظ الاتفاق على الوضع القائم في خط الطفافات البحرية دون المساس بنقاط الخلاف على الحدود البرية (مثل النقطة B1)، مع تأجيل البت فيها.

---

### هل استفاد لبنان حقاً من هذا الاتفاق؟

للإجابة على هذا السؤال بموضوعية، يجب التمييز بين "المكاسب السيادية والدبلوماسية" وبين "الواقع الاقتصادي الفعلي":

#### 1. المكاسب السيادية والجيوسياسية (الفائدة المُحققة)
* **تثبيت الحقوق:** تمكن لبنان من تثبيت حقه السيادي في منطقته الاقتصادية الخالصة وحماية حدوده البحرية وفقاً للقانون الدولي، وهو إنجاز دبلوماسي مهم في ظل الانهيار المؤسساتي الذي تعيشه البلاد.
* **إزالة العقبات القانونية:** أنهى الاتفاق النزاع الذي كان يمنع الشركات الدولية الكبرى (مثل ائتلاف توتال، إيني، وقطر للطاقة) من ممارسة أعمال التنقيب في البلوكات الجنوبية (تحديداً البلوك رقم 9).
* **منع الانزلاق لحرب بحرية:** في وقت توقيع الاتفاق، أبعد شبح المواجهة العسكرية المباشرة حول الثروات النفطية التي كادت أن تندلع بسبب إرسال إسرائيل سفينة استخراج إلى حقل كاريش.

#### 2. الواقع الاقتصادي الفعلي (النتائج المخيبة حتى الآن)
* **غياب العوائد الاقتصادية المباشرة:** كان يعول لبنان الرسمي والشعبي على أن يكون غاز حقل قانا "طوق النجاة" لاقتصاده المنهار. ومع ذلك، أظهرت نتائج الحفر الاستكشافي الذي قامت به شركة "توتال" في البلوك رقم 9 (أواخر عام 2023) عدم وجود كميات تجارية قابلة للاستخراج في تلك البئر تحديداً، مما شكل صدمة قوية للآمال الاقتصادية السريعة.
* **هشاشة الاستقرار الأمني:** أثبتت الأحداث التي تلت اندلاع حرب غزة في أكتوبر 2023 واشتعال الجبهة في جنوب لبنان، أن الاستقرار المؤقت الذي وفره الاتفاق البحري لم ينسحب على الواقع الأمني الشامل. هذا التصعيد العسكري المفتوح يعيق حالياً أي شركات طاقة دولية من التفكير في استثمارات أو جهود استكشافية إضافية في المياه اللبنانية.
* **العامل الزمني:** حتى في حال قررت الشركات العودة وحفر آبار جديدة لاحقاً واكتُشفت حقول تجارية، فإن تطوير البنية التحتية والاستخراج والبيع يستغرق عادة من 5 إلى 7 سنوات، وهو إطار زمني لا يحل أزمة السيولة الخانقة التي يعاني منها الاقتصاد اللبناني حالياً.

---

### التموضع الاستراتيجي والآفاق القادمة
إن طريق استغلال الثروات الكامنة تحت البحر يتطلب بيئة أمنية مستقرة وموثوقة، وحوكمة شفافة لمؤسسات الدولة. وبدون إصلاح جذري للقطاع المالي اللبناني وإرساء سيادة القانون، ستظل هذه الثروات مجرد حبر على ورق الاتفاقيات الدولية.`,
    contentEn: `The term "Framework Agreement" in the context of Lebanese-Israeli relations refers to the understanding announced by Lebanon in October 2020, which established the launch of indirect negotiations under UN auspices and US mediation. This long path culminated in October 2022 with the signing of the "Maritime Boundary Demarcation Agreement," which is considered a purely economic and security settlement rather than a peace treaty or political normalization.

From a diplomatic and legal standpoint, Lebanon achieved tangible benefits by securing recognition of its maritime borders and rights in its southern blocks without making political or security concessions that affect its sovereignty. Economically, however, the benefits remain "theoretical" and deferred, failing to materialize into an actual financial rescue. These hopes crashed into an unpromising geological reality in the initial drilling and an explosive regional geopolitical and security landscape that stalled the entire investment track.

---

### Key Clauses of the 2022 Demarcation Agreement

1. **Adopting Line 23:** The maritime boundary of the Exclusive Economic Zone (EEZ) between both parties was demarcated based on "Line 23," granting Lebanon approximately 860 square kilometers of previously disputed waters.
2. **Qana Field vs. Karish Field:** The agreement stipulated that Lebanon retains full exploration and extraction rights in the potential "Qana Field" (with Israel receiving financial compensation from the operating company, such as Total, and not from the Lebanese state treasury or share). In return, Israel maintained full control over the ready-to-produce "Karish" gas field.
3. **Decoupling Land and Sea Demarcation:** The agreement maintained the status quo along the maritime buoy line without affecting land border disputes (such as Point B1), delaying their resolution.

---

### Did Lebanon Truly Benefit from this Agreement?

To answer this objectively, we must distinguish between "sovereign and diplomatic gains" and "actual economic reality":

#### 1. Sovereign and Geopolitical Gains (Achieved Benefits)
* **Securing Maritime Rights:** Lebanon successfully established its sovereign right to its EEZ and protected its maritime borders in accordance with international law, a significant diplomatic achievement amid the country's institutional collapse.
* **Removing Legal Hurdles:** The agreement ended the dispute that had prevented major international energy companies (such as the consortium of Total, Eni, and QatarEnergy) from conducting exploration activities in southern blocks (specifically Block 9).
* **Averting Maritime Warfare:** At the time of signing, the agreement warded off the specter of a direct military confrontation over offshore wealth, which had almost erupted when Israel sent an extraction vessel to the Karish field.

#### 2. Actual Economic Reality (Disappointing Results to Date)
* **No Direct Economic Windfalls:** Lebanese officials and citizens had hoped that gas from the Qana Field would act as a "lifeline" for their collapsed economy. However, exploratory drilling by "Total" in Block 9 (late 2023) showed no commercially viable quantities in that particular well, striking a major blow to expectations of a quick economic turnaround.
* **Fragile Security Stability:** The events following the outbreak of the Gaza war in October 2023 and the flare-up of the southern Lebanese front proved that the temporary stability provided by the maritime agreement did not extend to the broader security landscape. This open military escalation currently deters international energy firms from considering additional investments or exploration efforts in Lebanese waters.
* **The Time Factor:** Even if companies decide to return, drill new wells later, and discover commercial fields, developing infrastructure, extraction, and sales typically takes 5 to 7 years. This is a timeframe that does not address the stifling liquidity crisis currently suffocating the Lebanese economy.

---

### Strategic Outlook and Future Demands
The path to extracting undersea wealth requires a stable, reliable security environment and transparent state governance. Without a fundamental restructuring of the Lebanese financial sector and the establishment of the rule of law, these resources will remain mere ink on international agreements.`,
    author: {
      nameAr: 'معن البرازي',
      nameEn: 'Maan Barazy',
      titleAr: 'مؤسس ورئيس تحرير الوراق | alwarraqnews.com',
      titleEn: 'Founder & Editor-in-Chief of Al-Warraq | alwarraqnews.com',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    date: '2026-06-26',
    readTimeAr: '٥ دقائق قراءة',
    readTimeEn: '5 min read',
    isBreaking: false,
    isFeatured: true,
    isPremium: false,
    tags: ['ترسيم_الحدود', 'اتفاق_الإطار', 'حقل_قانا', 'حقل_كاريش', 'Maritime_Demarcation', 'Lebanon_Gas', 'Geopolitical_Risk'],
    excerpt: 'The Framework Agreement analysis: An unpromising geological reality in an explosive regional geopolitical and security landscape.',
    hashtags: ['Maritime_Demarcation', 'Lebanon_Gas', 'Geopolitical_Risk'],
    views: 1150
  },
  {
    id: 'lebanon-proactive-risk-intelligence-2026',
    category: 'editor-desk',
    categories: ['editor-desk', 'lebanon', 'opinion'],
    titleAr: 'رأي: لماذا يجب على لبنان تبني استخبارات المخاطر الاستباقية؟',
    titleEn: 'Opinion: Why Lebanon Must Adopt Proactive Risk Intelligence?',
    summaryAr: 'لطالما اتسم المشهد الاقتصادي اللبناني لسنوات طويلة بعدم القدرة على التنبؤ. فمن الاختلالات الهيكلية العميقة وأزمات الديون السيادية، إلى الصدمات الجيوسياسية العنيفة، تعمل البلاد في حالة دائمة من التقلب المستمر. وفي مثل هذه البيئة فائقة التعقيد، لم يعد لإدارة المخاطر التقليدية القائمة على ردود الفعل أي جدوى.',
    summaryEn: 'For years, Lebanon’s economic landscape has been defined by unpredictability. From deep structural imbalances and sovereign debt crises to violent geopolitical shocks, the country operates in continuous volatility. In such a complex environment, traditional reactive risk management is no longer viable.',
    excerptAr: 'تتلاقى المخاطر عبر الأسواق والمحافظ والمناطق الجغرافية في لبنان؛ مما يستدعي الانتقال فوراً من "إدارة الأزمات" القائمة على ردود الفعل إلى "استخبارات المخاطر الاستباقية".',
    excerptEn: 'In Lebanon, risks converge across markets, portfolios, and geographies. This demands an immediate transition from reactive "crisis management" to "proactive risk intelligence."',
    contentAr: `### تشريح المخاطر المتلاقية في لبنان
إن ملف المخاطر في لبنان مترابط بشكل فريد؛ فالصدمة في قطاع واحد سرعان ما تنتقل إلى القطاعات الأخرى، مما يخلق تتابعاً متسلسلاً (أثر الدومينو) يشل حركة اتخاذ القرار. ويواجه قادة الأعمال وصناع القرار اليوم التحديات التالية بالتزامن:

* 📊 **عدم الاستقرار الماكرو-اقتصادي (الاقتصاد الكلي):** انهيار قيمة العملة، التضخم المفرط، وشلل الأسواق الائتمانية.
* 🛡️ **التهديدات الجيوسياسية والأمنية:** اضطرابات سلاسل الإمداد، والشبح المستمر للصراعات الإقليمية التي تؤثر مباشرة على العمليات المحلية.
* ⚖️ **الضغوط التنظيمية والامتثال:** الرقابة الدولية المشددة، المخاوف المتعلقة بالإدراج في القائمة الرمادية لمجموعة العمل المالي (FATF)، والحاجة الملحة لحوكمة الشركات والشفافية.

في الأنظمة التقليدية، يتم مراقبة هذه المخاطر بشكل منفصل (في جُزر معزولة). ومع ذلك، فإن واقع لبنان يتطلب رؤية شمولية؛ إذ لا يمكنك تقييم محفظة عقارية دون الأخذ في الاعتبار مستويات السيولة في القطاع المصرفي والمناخ الجيوسياسي المحيط بالمنطقة.

---

### قوة استخبارات المخاطر الاستباقية
لكسر حلقة الهلع القائم على ردود الفعل، يجب على المؤسسات اللبنانية تبني أطر عمل متطورة تنظر إلى المستقبل عوضاً عن الالتفات إلى الوراء. إن النهج الحديث لخدمات التقييم والمخاطر يقدم استخبارات استباقية تساعدك على تعزيز المرونة مع دفع عجلة النمو في آن واحد.

وهنا تكمن القوة التحولية لدمج تكنولوجيات الجيل القادم مع الخبرة الاقتصادية العميقة. فالاعتماد على الجداول الحسابية القديمة والتقارير المجزأة في عالم يتسم بـ التقلب، وعدم اليقين، والتعقيد، والغموض (VUCA) هو وصفة محققة لخلق نقاط عمياء قاتلة.

من خلال نشر البيانات المتكاملة، والخبرات التقييمية، والتحليلات المدعومة بالذكاء الاصطناعي، تستطيع المؤسسات رصد المخاطر المترابطة بسرعة أكبر، وتبسيط عمليات اتخاذ القرار، وتحويل التعقيد إلى رؤى قابلة للتنفيذ. وإليك كيف تعيد هذه المنهجية تشكيل مشهد الأعمال اللبناني:

1. **الاستشراف الخوارزمي (Algorithmic Foresight):** يمكن لمحركات التدقيق القائمة على الذكاء الاصطناعي مسح تدفقات البيانات العالمية والمحلية باستمرار للتنبؤ بكيفية تأثير التحولات الجيوسياسية على سلاسل الإمداد أو تقييمات الأصول.
2. **التقييمات الديناميكية (Dynamic Valuations):** في سوق تحطمت فيه مقاييس القيمة القياسية، يصبح التقييم القائم على الخبراء والبيانات الفورية أمراً حاسماً لإعادة الهيكلة وعمليات الدمج.
3. **البنية المضادة للهشاشة (Antifragile Architecture):** تتيح الاستخبارات الاستباقية للمؤسسات بناء أنظمة لا تكتفي بمقاومة الصدمات، بل تتكيف وتتعلم منها.

---

### السياق العام: واقع الـ 20 مليار دولار
لفهم الأهمية البالغة لهذه الرؤية، يجب أن ننظر أولاً إلى الواقع القاسي للبيئة الاقتصادية الحالية في لبنان. مؤخراً، كشف وزير المالية ياسين جابر عن الحجم الصادم للخسائر المترتبة على النزاع المستمر، حيث قدّر إجمالي الخسائر المباشرة وغير المباشرة بمبلغ كارثي يصل إلى 20 مليار دولار، مع توقع انكماش الاقتصاد بنسبة 7% إلى 10% في عام 2026 وحده.

عندما يمتص اقتصاد وطني صدمات بمليارات الدولارات وانكماشات حادة، تصبح خطط استمرارية العمل التقليدية عاجزة تماماً. لذلك يمثّل دمج التحليلات الذكاء الاصطناعي استباقياً هو السبيل الرياضي الوحيد لضمان النمو والاستمرارية.

---

### التموضع لتحقيق النجاح بعيد المدى
إن طريق لبنان نحو التعافي لن يكون خطياً، وستظل البيئة الاقتصادية الكلية مليئة بالتحديات في المستقبل المنظور. ومع ذلك، فإن المؤسسات التي ستقود المرحلة القادمة هي تلك التي ترفض السير في الظلام.

من خلال دمج التحليلات المدفوعة بالذكاء الاصطناعي وتقييمات المخاطر الشاملة، يمكن للشركات اللبنانية الانتقال إلى ما هو أبعد من مجرد البقاء؛ إذ يمكنها توقع التقلبات، والاستجابة بثقة، وتمكين مؤسساتها من التموضع لحصد النجاح المستدام على المدى الطويل. إن الرؤية الواضحة هي رأس المال الجديد.`,
    contentEn: `### Anatomy of Converging Risks in Lebanon
Lebanon’s risk profile is uniquely interconnected; a shock in one sector rapidly spills into others, creating a domino effect that paralyzes decision-making. Today, business leaders face multiple concurrent challenges:

* 📊 **Macroeconomic Instability:** Currency devaluation, hyperinflation, and credit market paralysis.
* 🛡️ **Geopolitical and Security Threats:** Supply chain disruptions and the persistent threat of regional conflicts directly impacting local operations.
* ⚖️ **Regulatory and Compliance Pressures:** Tightened international oversight, gray listing concerns by the Financial Action Task Force (FATF), and the urgent need for corporate governance.

In traditional systems, these risks are monitored in silos. However, Lebanon's reality demands a holistic view; you cannot assess a real estate portfolio without accounting for banking liquidity and the surrounding geopolitical climate.

---

### The Power of Proactive Risk Intelligence
To break the cycle of reactive panic, Lebanese institutions must adopt forward-looking frameworks. A modern approach to risk services offers proactive intelligence that fosters resilience while driving growth.

This is the transformative power of integrating next-generation technology with deep economic expertise. Relying on outdated spreadsheets and fragmented reports in a VUCA world is a recipe for catastrophic blind spots.

By deploying integrated data, evaluative expertise, and AI-powered analytics, organizations can detect interconnected risks faster, streamline decision-making, and convert complexity into actionable insights:

1. **Algorithmic Foresight:** AI-powered engines scan global and local data streams continuously, building scenario models to forecast how geopolitical shifts affect local supply chains or asset valuations.
2. **Dynamic Valuations:** In a market where standard value metrics have collapsed, data-backed expert appraisal provides a transparent, defensible basis for restructuring, mergers, or attracting diaspora investments.
3. **Antifragile Architecture:** Proactive intelligence enables organizations to build systems that do not just withstand shocks but adapt, learn, and grow stronger from them.

---

### The $20 Billion Reality
To appreciate the urgency, one must look at Lebanon's harsh economic reality. Former Finance Minister Yassin Jaber recently revealed the shocking scale of losses from the ongoing conflict, estimating direct and indirect losses to Lebanon's economy at a catastrophic $20 billion, with a projected GDP contraction of 7% to 10% in 2026 alone.

When a national economy absorbs multi-billion dollar shocks and sharp contractions, traditional business continuity plans fail. Businesses must pivot to proactive risk intelligence to survive.

---

### Positioning for Long-term Success
Lebanon’s path to recovery will not be linear, and the macroeconomic environment will remain challenging. However, the institutions leading the next evolutionary phase are those that refuse to walk in the dark.

By integrating AI-driven analytics and comprehensive risk assessments into their core infrastructure, Lebanese companies can transition beyond survival—anticipating volatility, responding with confidence, and securing sustainable long-term success.`,
    author: {
      nameAr: 'رئيس التحرير والوراق ديسك',
      nameEn: 'Editor-in-Chief & Al-Warraq Wire',
      titleAr: 'تحليل استراتيجي',
      titleEn: 'Strategic Analysis',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
    },
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    date: '2026-06-25',
    readTimeAr: '٤ دقائق قراءة',
    readTimeEn: '4 min read',
    isBreaking: false,
    isFeatured: true,
    isPremium: false,
    tags: ['السياسة_النقدية', 'استخبارات_المخاطر', 'الأزمة_المالية', 'الذكاء_الاصطناعي', 'Lebanon_Risk', 'Proactive_Intelligence', 'FATF'],
    excerpt: 'Opinion: Why Lebanon must transition from reactive crisis management to proactive risk intelligence to withstand compounding economic shocks.',
    hashtags: ['Lebanon_Risk', 'Proactive_Intelligence', 'FATF'],
    views: 1240
  },
  {
    id: 'bdl-budget-analysis-2026',
    category: 'instats',
    categories: ['instats', 'lebanon', 'editor-desk'],
    titleAr: 'ماذا تخبرنا ميزانية مصرف لبنان؟ وأين تتبخر الأموال؟',
    titleEn: 'What Does the BDL Balance Sheet Tell Us? And Where Does the Money Evaporate?',
    summaryAr: 'تعكس ميزانية مصرف لبنان (BDL) الحالية تحولاً استراتيجياً في سياسته النقدية؛ فبعد سنوات من "الهندسات المالية" وشراء الوقت، انتقل المركزي اليوم إلى سياسة "الاحتواء وإدارة الأضرار". تتجلى هذه السياسة الجديدة في الامتناع عن إقراض الدولة بالعملات الأجنبية، وتجفيف السيولة بالليرة اللبنانية من الأسواق للحفاظ على استقرار سعر الصرف، وإصدار تعاميم لترشيد وتدقيق ما تبقى من سحوبات دولارية. ومع ذلك، فإن الغوص في أرقام ميزانية البنك المركزي يكشف عن حقائق قاسية لا يمكن للسياسات المحاسبية إخفاؤها.',
    summaryEn: 'The current balance sheet of the Central Bank of Lebanon (BDL) reflects a strategic shift in its monetary policy. After years of "financial engineering" and buying time, the central bank has now moved to a policy of "containment and damage control." This new stance is evident in refraining from lending foreign currency to the state, drying up Lebanese Lira liquidity in the markets to maintain exchange rate stability, and issuing circulars to rationalize and audit remaining dollar withdrawals. However, a deep dive into the central bank\'s numbers reveals harsh truths that accounting policies cannot hide.',
    contentAr: `تعكس ميزانية مصرف لبنان (BDL) الحالية تحولاً استراتيجياً في سياسته النقدية؛ فبعد سنوات من "الهندسات المالية" وشراء الوقت، انتقل المركزي اليوم إلى سياسة "الاحتواء وإدارة الأضرار". تتجلى هذه السياسة الجديدة في الامتناع عن إقراض الدولة بالعملات الأجنبية، وتجفيف السيولة بالليرة اللبنانية من الأسواق للحفاظ على استقرار سعر الصرف، وإصدار تعاميم (مثل 158 و166) لترشيد وتدقيق ما تبقى من سحوبات دولارية. ومع ذلك، فإن الغوص في أرقام ميزانية البنك المركزي يكشف عن حقائق قاسية لا يمكن للسياسات المحاسبية إخفاؤها:

### 1. وهم الاحتياطيات الإجمالية مقابل الصافية
تشير الميزانية إلى وجود 11.6 مليار دولار كاحتياطيات أجنبية، وهو رقم يبدو مطمئناً للوهلة الأولى. لكن هذا الرقم يمثل إجمالي الأصول فقط. في الواقع، تراجعت احتياطيات العملات الأجنبية لدى مصرف لبنان بحوالي 642 مليون دولار منذ منتصف شباط/فبراير 2026، ليصل إجمالي الاحتياطيات إلى حوالي 11.4 مليار دولار بنهاية نيسان/أبريل. والأهم من ذلك، أنه عند الأخذ بعين الاعتبار نحو 60 مليار دولار من الودائع الدولارية المستحقة للمصارف التجارية (والتي لا قدرة على سدادها)، فإن مصرف لبنان يُعتبر معسراً فعلياً، ومركزه الصافي بالدولار سلبي للغاية. الـ 11.6 مليار دولار هي مجرد أصول، يقابلها 60 مليار دولار من الخصوم. ضمن سياسة مصرف لبنان الحالية، لا يمكن "إنقاذ" القطاع المصرفي باحتياطيات تم رهنها مسبقاً وتتجاوز الالتزامات حجمها بأضعاف مضاعفة.

### 2. تعديلات التقييم ليست أموالاً حقيقية
البند الأكبر في الميزانية، والذي يبلغ 1,402 تريليون ليرة لبنانية كفروقات تقييم، هو قيد محاسبي بحت. فهو يعكس المكاسب الدفترية بالليرة الناتجة عن إعادة تقييم التزامات مصرف لبنان بالعملات الأجنبية على السعر الرسمي الجديد للمنصة (89,500 ليرة). هذا القيد المحاسبي ليس "سيولة نقدية قابلة للاستخدام"؛ فلا يمكن توزيعه على المودعين أو استخدامه لإعادة رسملة المصارف. تتطلب أي سياسة نقدية سليمة إعادة هيكلة الخسائر المتراكمة لمصرف لبنان واستعادة ربحيته، لأن الاستمرار في مراكمة هذه الخسائر يهدد قدرة المصرف على البقاء كمرساة للاستقرار المالي.

### 3. الذهب مقيد بقوة القانون
يمثل الذهب 43% من إجمالي الأصول (حوالي 3,580 تريليون ليرة / أي ما يقارب 40 مليار دولار بالأسعار الحالية). ورغم أن سياسة مصرف لبنان ترتكز على التباهي بهذا الغطاء، إلا أن احتياطيات الذهب تخضع لقيود قانونية ودستورية صارمة منذ منتصف الثمانينيات. وللتصرف بها، يتطلب الأمر اقتراح وإقرار قانون خاص في مجلس النواب. وفي ظل البيئة السياسية المنقسمة في لبنان، لا يُعد تسييل الذهب خياراً واقعياً على المدى القريب.

### 4. حجم المشكلة يتجاوز قدرات البنك المركزي
تكمن الأزمة الأساسية في حجم الخسائر والفجوة المالية التي تتجاوز ضعف حجم الاقتصاد اللبناني الحالي. يحاول مصرف لبنان من خلال سياساته إلقاء عبء الحل على عاتق السلطة السياسية والتشريعية، إلا أنه لا يوجد أي زعيم سياسي أو سلطة نقدية ترغب في تحمل هذه المسؤولية والمصارحة أمام المودعين والجمهور، الذين تكبدوا بالفعل "اقتطاعات قسرية" (Haircuts) غير معلنة من خلال الخسارة الهائلة في قدرتهم الشرائية.

### 5. الإطار القانوني يتحرك، ولكن ببطء شديد
أحيا إقرار البرلمان لقانون تعافي القطاع المصرفي والتعديلات على قانون السرية المصرفية في عام 2025 الآمال في الإصلاح، باعتبارها مكونات أساسية لاتفاق مستوى الموظفين مع صندوق النقد الدولي وخطوة لا غنى عنها لحل الأزمة المصرفية. ورغم هذه التطورات، لا يزال من غير الواضح ما إذا كانت خطة التعافي المالي الشاملة ستوضع قيد التنفيذ الفعلي، لا سيما في ظل المعارضة الشرسة من قِبل أصحاب المصالح والنفوذ.

### 6. الحرب تستنزف وسادة الأمان المتبقية
استقر سعر صرف الليرة اللبنانية بالقرب من 89,500 للدولار بخدمة سياسة التجفيف النقدي التي يعتمدها مصرف لبنان، حتى مع استنزاف النزاع للاحتياطيات، وتدمير البنية التحتية، ودفع الاقتصاد المنهك أصلاً نحو مزيد من المجهول. يُحذر المحللون المستقلون من أن هذا الهدوء النقدي "يُدار بشكل مصطنع"، وليس ناتجاً عن نمو اقتصادي حقيقي. ومن المتوقع أن يؤدي الصراع الحالي إلى انكماش الناتج المحلي الإجمالي الحقيقي للبنان بنسبة تتراوح بين 7% و10% في عام 2026، مما سيتسبب في أضرار اقتصادية مباشرة وغير مباشرة قد تصل إلى 20 مليار دولار.

### خلاصة: الميزانية تعكس "الاحتواء" لا "الإنقاذ"
إن ميزانية مصرف لبنان كما تظهر في 15 حزيران/يونيو لا تشير إلى وجود أي قدرة على الإنقاذ؛ بل تعكس مجرد "احتواء مُدار". الارتفاع الحاد في حسابات رأس المال (+33.5 تريليون ليرة) وتعديلات التقييم (+148 تريليون ليرة) هي تحسينات دفترية محاسبية وليست تحسناً حقيقياً في السيولة. إن الحل الشامل يتطلب خطة متكاملة تشمل: إعادة رسملة مصرف لبنان نفسه، وإعادة هيكلة التزاماته بالدولار، وتصميم برنامج لإعادة رسملة المصارف يعتمد على التوزيع العادل للخسائر بين الدولة، والمصارف، وكبار المودعين. لا شيء من هذا يظهر في الميزانية الحالية حتى الآن. ما نراه اليوم هو بنك مركزي يستميت في "الصمود وتثبيت الخطوط"، وليس بنكاً في موقع يسمح له بقيادة خطة إنقاذ وطنية.`,
    contentEn: `The current balance sheet of the Central Bank of Lebanon (BDL) reflects a strategic shift in its monetary policy. After years of "financial engineering" and buying time, the central bank has now moved to a policy of "containment and damage control." This new stance is evident in refraining from lending foreign currency to the state, drying up Lebanese Lira liquidity in the markets to maintain exchange rate stability, and issuing circulars (such as 158 and 166) to rationalize and audit remaining dollar withdrawals. However, a deep dive into the central bank's numbers reveals harsh truths that accounting policies cannot hide:

### 1. The Illusion of Gross vs. Net Reserves
The balance sheet points to $11.6 billion in foreign reserves, a figure that appears reassuring at first glance. But this represents gross assets only. In reality, BDL's foreign currency reserves dropped by about $642 million since mid-February 2026, reaching around $11.4 billion by the end of April. More importantly, when factoring in the nearly $60 billion in dollar deposits owed to commercial banks (which BDL has no capacity to repay), the central bank is effectively insolvent, with an extremely negative net foreign currency position. The $11.6 billion are merely assets matched by $60 billion in liabilities. Under current BDL policy, the banking sector cannot be "saved" by reserves that are already leveraged and whose liabilities dwarf them several times over.

### 2. Valuation Adjustments are Not Real Money
The largest item on the balance sheet, totaling LBP 1,402 trillion in valuation differences, is a pure accounting entry. It reflects book gains in LBP resulting from revaluing BDL's foreign currency liabilities at the new official platform rate (89,500 LBP). This accounting entry is not "usable liquidity"; it cannot be distributed to depositors or used to recapitalize banks. Any sound monetary policy requires restructuring BDL's accumulated losses and restoring its profitability, because continuing to accumulate these losses threatens the bank's viability as an anchor of financial stability.

### 3. Gold is Strictly Locked by Law
Gold represents 43% of total assets (about LBP 3,580 trillion / approximately $40 billion at current prices). Although BDL's policy relies on boasting of this cover, gold reserves have been subject to strict constitutional and legal restrictions since the mid-1980s. Liquidating or utilizing them requires the proposal and ratification of a special law in Parliament. In Lebanon's polarized political environment, liquidating gold is not a realistic option in the near term.

### 4. The Scale of the Problem Dwarfs Central Bank Capabilities
The core crisis lies in the scale of losses and the financial gap that exceeds twice the size of the current Lebanese economy. BDL tries through its policies to shift the burden of the solution onto the political and legislative authorities, yet no political leader or monetary authority is willing to bear this responsibility and be transparent with depositors and the public, who have already suffered undeclared "forced haircuts" through the massive loss in their purchasing power.

### 5. The Legal Framework Moves, but Very Slowly
The Parliament's passage of the Banking Sector Reform Law and amendments to the Banking Secrecy Law in 2025 revived hopes for reform, as they are essential components of the staff-level agreement with the IMF and an indispensable step toward resolving the banking crisis. Despite these developments, it remains unclear whether a comprehensive financial recovery plan will be put into actual practice, especially in the face of fierce opposition from vested interests.

### 6. The War is Depleting the Remaining Safety Cushion
The exchange rate of the Lebanese pound stabilized near 89,500 per dollar thanks to BDL's monetary tightening policy, even as conflict drains reserves, destroys infrastructure, and pushes an already exhausted economy deeper into the unknown. Independent analysts warn that this monetary calm is "artificially managed" rather than the result of real economic growth. The ongoing conflict is projected to contract real GDP by 7% to 10% in 2026, causing direct and indirect economic damage that could reach $20 billion.

### Conclusion: The Balance Sheet Reflects "Containment" Not "Rescue"
BDL's balance sheet as of June 15 does not indicate any capacity to rescue; rather, it reflects merely "managed containment." The sharp rise in capital accounts (+LBP 33.5 trillion) and valuation adjustments (+LBP 148 trillion) are bookkeeping improvements rather than a genuine improvement in liquidity. A comprehensive solution requires an integrated plan including: recapitalizing BDL itself, restructuring its USD liabilities, and designing a banking recapitalization program based on the fair distribution of losses among the state, the banks, and large depositors. None of this is visible in the current balance sheet yet. What we see today is a central bank desperately struggling to "survive and hold the line," not a bank in a position to lead a national rescue plan.`,
    author: {
      nameAr: 'معن برعزي',
      nameEn: 'Maan Barazy',
      titleAr: 'محرر الشؤون الخاصة والرئيسية',
      titleEn: 'Special Correspondent & Chief Editor',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
    },
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=1200&q=80',
    date: '٢٠٢٦/٠٦/٢٥',
    readTimeAr: '٥ دقائق قراءة',
    readTimeEn: '5 min read',
    isBreaking: false,
    isFeatured: true,
    isPremium: true,
    tags: ['مصرف_لبنان', 'ميزانية', 'الأزمة_المالية', 'الذهب', 'احتياطيات_الدولار', 'BDL', 'Central_Bank', 'Lebanon_Crisis'],
    views: 1845
  },
  {
    id: 'fatf-gray-list-lebanon-2026',
    category: 'editor-desk',
    categories: ['editor-desk', 'lebanon', 'opinion'],
    titleAr: 'القائمة الرمادية لـ FATF: جرس إنذار و اختبار حقيقي لقدرة الدولة اللبنانية',
    titleEn: 'FATF Gray List: A Wake-Up Call and a Real Test of the Lebanese State\'s Capacity',
    summaryAr: 'تسلط الصورة الضوء على واقع مؤلم: لبنان يتشارك الآن في "القائمة الرمادية" التابعة لمجموعة العمل المالي (FATF) مع كل من سوريا، والعراق، واليمن. وعلى الرغم من أن لكل من هذه الدول ديناميكياتها السياسية والاقتصادية والأمنية الخاصة، إلا أن أوجه التشابه بينها يصعب تجاهلها. فجميع هذه الدول الأربع تواجه، بدرجات متفاوتة، مزيجاً من المؤسسات الضعيفة، واقتصادات تعتمد بشكل كبير على النقد "الكاش"، وتوترات جيوسياسية، وشبكات مالية غير رسمية، وتحديات مستمرة في إنفاذ معايير مكافحة غسل الأموال وتمويل الإرهاب.',
    summaryEn: 'The situation highlights a painful reality: Lebanon now shares the Financial Action Task Force (FATF) "Gray List" with Syria, Iraq, and Yemen. Although each nation has its own political, economic, and security dynamics, the structural similarities are hard to ignore. All four face weak institutions, cash-dominated economies, geopolitical tensions, informal financial networks, and systemic challenges in enforcing anti-money laundering and counter-terrorism financing (AML/CFT) standards.',
    contentAr: `### القائمة الرمادية: أكثر من مجرد امتثال تقني

لا ينبغي النظر إلى وضع لبنان على "القائمة الرمادية" على أنه مجرد مسألة امتثال تقني. بل هو انعكاس لضعف هيكلي أعمق. صحيح أن تقييمات FATF تركز على الامتثال التقني والفعالية، ولكن وراء هذه التقييمات تكمن أسئلة أوسع تتعلق بالحوكمة، والمساءلة، والشفافية، وفعالية القضاء، وقدرة الدولة.

---

### تداعيات مدمرة على ثقة المستثمرين وتدهور اقتصادي

إن إدراج لبنان في القائمة الرمادية يُعد ضربة قاضية لثقة المستثمرين، مما يؤدي إلى تداعيات اقتصادية وخيمة:

* 📉 **انخفاض حاد في الاستثمار الأجنبي المباشر (FDI):** يُعتبر إدراج دولة ما في القائمة الرمادية بمثابة علامة حمراء للمستثمرين الدوليين. فارتفاع المخاطر، وزيادة تكاليف الامتثال التنظيمي، والقيود المحتملة على المعاملات المالية، كلها عوامل تدفع المستثمرين للبحث عن بيئات أكثر أماناً واستقراراً.
* 💸 **زيادة تكاليف المعاملات المالية وصعوبة الوصول إلى الأسواق العالمية:** ستواجه البنوك والشركات اللبنانية إجراءات تدقيق وعناية واجبة أكثر صرامة من قبل نظيراتها الدولية. سيؤدي هذا إلى ارتفاع التكاليف، والتأخير في إنجاز المعاملات، وتقييد الوصول إلى الأسواق المالية العالمية.
* 📊 **تراجع تصنيفات الائتمان السيادي:** غالباً ما يترافق إدراج دولة ما في القائمة الرمادية مع خفض في تصنيفها الائتماني السيادي. وهذا يجعل الاقتراض من الأسواق الدولية أكثر تكلفة وصعوبة، مما يُفاقم من الأزمة المالية القائمة في لبنان.
* 🏃‍♂️ **هروب رؤوس الأموال:** قد تدفع المخاوف بشأن الاستقرار المالي والمخاطر التنظيمية المستثمرين والشركات اللبنانية إلى سحب أموالهم من البلاد، مما يُزيد من الضغط على الليرة اللبنانية والنظام المصرفي بأكمله.

---

### التحدي الإقليمي واختبار القدرة على الإصلاح

بالنسبة للبنان، تحمل المقارنة مع جيرانه في القائمة الرمادية تحذيراً وتحدياً في آن واحد. فالبقاء على هذه القائمة ليس مجرد مسألة إرضاء المقيّمين الدوليين؛ بل هو دليل على قدرة الدولة اللبنانية على إدارة نظامها المالي بفعالية، والحد من حجم الاقتصاد الموازي، وتعزيز الرقابة، واستعادة الثقة في مؤسساتها.

إن بقاء سوريا والعراق واليمن تحت المراقبة المتزايدة يعني أن لبنان لن يتم تقييمه بمعزل عن محيطه. بل سيُحكم عليه حتماً مقارنة بالبيئة الإقليمية التي يعمل فيها.

---

### طريق الخروج: إصلاحات ملموسة وفعالة

هنا يبدأ الاختبار الحقيقي. فالخروج من القائمة الرمادية يتطلب من لبنان إثبات قدرته على تحقيق تقدم ملموس في مجالات حاسمة، مثل:

1. **الشفافية في ملكية المستفيدين الحقيقيين.**
2. **التحقيقات الفعالة في الجرائم المالية.**
3. **استرداد الأصول المسروقة.**
4. **محاكمة الجناة في الأنشطة غير المشروعة.**
5. **تقليل الاعتماد الكبير على المعاملات النقدية.**

فالقوانين واللوائح مهمة، لكن FATF تقيس اليوم النتائج ملموسة والفعالية بدلاً من مجرد النوايا.

---

### بارقة أمل: القائمة الرمادية كحافز للإصلاح

الجانب المشرق هو أن الإدراج في القائمة الرمادية ليس حكماً مؤبداً. بل يمكن أن يكون حافزاً قوياً للإصلاح. فالدول التي تنجح في معالجة أوجه القصور الأساسية غالباً ما تخرج بمؤسسات أقوى، وحوكمة أفضل، ووصول محسن إلى التمويل الدولي.

بالنسبة للبنان، لم يعد السؤال هو ما إذا كان الإصلاح ضرورياً، بل ما إذا كان قادراً على التحرك بسرعة وفعالية أكبر من القوى الإقليمية والمحلية التي ساهمت في مأزقه الحالي.

بهذا المعنى، فإن وضع لبنان على القائمة الرمادية ليس مجرد تمرين دولي للامتثال. إنه اختبار حقيقي لمدى قوة واستمرارية الدولة اللبنانية.`,
    contentEn: `### The Gray List: More Than Just a Technical Compliance Issue

Lebanon's placement on the "Gray List" should not be viewed as a mere matter of technical compliance. Rather, it is a reflection of a deeper structural weakness. While FATF evaluations focus on technical compliance and overall effectiveness, underlying these assessments are broader questions regarding governance, accountability, transparency, judicial efficiency, and sovereign state capacity.

---

### Devastating Consequences for Investor Confidence and Economic Decline

Being listed on the gray list is a severe blow to investor confidence, yielding painful economic consequences:

* 📉 **Sharp Decline in Foreign Direct Investment (FDI):** A gray list designation serves as a major red flag for international investors. The elevated risk, increased regulatory compliance costs, and potential restrictions on financial transactions push capital to seek safer, more stable environments.
* 💸 **Rising Financial Transaction Costs and Restricted Global Market Access:** Lebanese banks and corporations will face far more stringent due diligence and scrutiny from international counterparties. This leads to higher operating costs, delays in clearing transactions, and limited access to global financial markets.
* 📊 **Deterioration of Sovereign Credit Ratings:** Gray list placement is often accompanied by cuts to sovereign credit ratings. This makes borrowing on international markets more expensive and difficult, compounding Lebanon's pre-existing financial crisis.
* 🏃‍♂️ **Capital Flight:** Anxieties over financial stability and regulatory risk will likely drive local investors and companies to withdraw their funds from the country, intensifying pressure on the Lebanese pound and the banking system as a whole.

---

### The Regional Challenge and a Test of Reform Capacity

For Lebanon, sharing a spot on the gray list with its immediate neighbors carries both a warning and a challenge. Remaining on this list is not just about satisfying international evaluators; it is a test of the Lebanese state's capacity to manage its financial system, curb the scale of the parallel cash economy, enhance oversight, and restore faith in its institutions.

With Syria, Iraq, and Yemen also under increased monitoring, Lebanon will not be evaluated in isolation. It will inevitably be judged relative to the regional environment in which it operates.

---

### The Path Outward: Tangible and Effective Reforms

This is where the real test begins. Exiting the gray list requires Lebanon to demonstrate tangible progress in critical domains:

1. **Transparency in ultimate beneficial ownership (UBO).**
2. **Effective investigations into financial crimes.**
3. **Recovery of stolen public assets.**
4. **Prosecution of perpetrators of illicit financial activities.**
5. **Mitigating the severe reliance on cash-based transactions.**

Laws and regulations on paper are important, but today, FATF measures tangible outcomes and enforcement efficacy rather than mere statements of intent.

---

### A Ray of Hope: The Gray List as a Catalyst for Reform

The silver lining is that a gray list designation is not a life sentence. It can serve as a powerful catalyst for sweeping reform. Countries that successfully tackle their core deficiencies often emerge with more resilient institutions, improved governance, and enhanced access to international financing.

For Lebanon, the question is no longer whether reform is necessary, but whether it is capable of moving faster and more effectively than the domestic and regional forces that led to its current predicament.

In this sense, Lebanon's gray-listing is not merely an international compliance exercise. It is a genuine test of the strength and survival of the Lebanese state.`,
    author: {
      nameAr: 'رئيس التحرير',
      nameEn: 'Editor-in-Chief',
      titleAr: 'التحرير والتحليل السيادي',
      titleEn: 'Editorial & Sovereign Analysis',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    },
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    date: '2026-06-25',
    readTimeAr: '5 دقائق قراءة',
    readTimeEn: '5 min read',
    isFeatured: true,
    isPremium: false,
    tags: ['القائمة الرمادية', 'لبنان', 'الإصلاح المالي', 'FATF', 'Gray List', 'Lebanon', 'Financial Reform'],
    views: 4890
  },
  {
    id: 'fifa-polymarket-struggle-2026',
    category: 'exclusives',
    categories: ['exclusives', 'translations', 'fifa-2026', 'sports', 'opinion'],
    titleAr: 'الفيفا يخسر معركة الرأي العام: كيف تدمر الرقابة والمراهنات اللامركزية (Polymarket) روح مونديال 2026؟',
    titleEn: 'FIFA Loses Public Opinion Battle: How Censorship & Decentralized Betting (Polymarket) Ruin the Spirit of World Cup 2026',
    summaryAr: 'لا يزال الاتحاد الدولي لكرة القدم "فيفا" يواجه أزمة ثقة متصاعدة في أوساط الرأي العام العالمي. فمع انطلاق منافسات كأس العالم 2026 في الولايات المتحدة وكندا والمكسيك، تجد المؤسسة الرياضية الأكبر في العالم نفسها متخبطة في معركة خاسرة للسيطرة على السردية الرقمية، حيث تتداخل إجراءات الرقابة وحذف التعليقات مع ظهور أشكال جديدة وخطيرة من المراهنات التي تسلع كل لحظة من لحظات اللعبة.',
    summaryEn: 'FIFA continues to face a mounting trust crisis. As the 2026 World Cup kicks off in the US, Canada, and Mexico, the global sports body is tangled in a losing battle to control the digital narrative—where censorship and mass comment deletions collide with the rise of hyper-speculative blockchain prediction markets that commodify every split-second of the beautiful game.',
    contentAr: `### أزمة ثقة متصاعدة في المونديال الأكبر تاريخياً

لا يزال الاتحاد الدولي لكرة القدم "فيفا" يواجه أزمة ثقة متصاعدة في أوساط الرأي العام العالمي. فمع انطلاق منافسات كأس العالم 2026 في الولايات المتحدة وكندا والمكسيك، تجد المؤسسة الرياضية الأكبر في العالم نفسها متخبطة في معركة خاسرة للسيطرة على السردية الرقمية، حيث تتداخل إجراءات الرقابة وحذف التعليقات مع ظهور أشكال جديدة وخطيرة من المراهنات التي تسلع كل لحظة من لحظات اللعبة.

---

### الرقابة الرقمية ومعركة طواحين الهواء

في محاولة للسيطرة على البيئة السامة التي تحيط بالبطولة، لجأ الفيفا إلى سياسة الحذف الجماعي للمحتوى، في خطوة يراها الكثيرون محاولة لتجميل الصورة أكثر من كونها معالجة جذرية للتعصب.

وفي هذا السياق، قرر الاتحاد الدولي لكرة القدم "فيفا" حذف مئات آلاف التعليقات التحريضية التي تم نشرها في مواقع التواصل الاجتماعي منذ انطلاق بطولة كأس العالم في الولايات المتحدة والمكسيك وكندا، الخميس الماضي.

وقال "فيفا" أنه راجع **3.8 مليون منشور**، وتم حذف **388 ألفاً** منها في مقابل حذف **287 ألف منشور وتعليق** في المونديال السابق، الذي استضافته قطر العام 2022. وذكر "فيفا" أنه *"تمت مراجعة أكثر من 250 مليون تعليق ومنشور، ووجد أن أكثر من 30 مليوناً منها كانت مسيئة"*، حسبما نقلت "وكالة الأنباء الألمانية".

واجتمعت لجنة من الشخصيات البارزة في أتلانتا بولاية جورجيا، لوضع حلول للقضاء على خطاب الكراهية. وكان من بين المشاركين الرئيس الليبيري السابق **جورج ويا**، اللاعب الأفريقي الوحيد الذي توج بجائزة الكرة الذهبية كأفضل لاعب في العالم، و**ميرسي أكيدي**، لاعبة المنتخب النيجيري السابقة، و**دايفيد جيرسون**، الحكم الأميركي ومؤسس حركة *"الحكام بحاجة إلى الحب أيضاً"*.

وقال ويا في تصريح مؤثر:
> "عندما أنظر إلى الماضي، لا أجد شيئاً قد تغير. تعرضت للإهانات العنصرية في ذروة العنصرية، ومازلنا نتحدث عنها اليوم. لهذا السبب نناضل، ونسعى لتوعية الشباب كي ينشؤوا أفراداً رحيمين، لا مجرد محبين للعبة. لا مكان للتمييز في مجتمعنا".

---

### تغول Polymarket: المراهنات تتخذ شكلاً جديداً

بينما ينشغل الفيفا بمطاردة التعليقات المسيئة، يغض الطرف عن وحش آخر يلتهم الروح الرياضية للبطولة. المراهنات الرياضية لم تعد تقتصر على المكاتب التقليدية أو التوقعات المباشرة لنتائج المباريات، بل اتخذت شكلاً جديداً كلياً مع صعود منصات التوقع اللامركزية، وعلى رأسها **"بوليماركت" (Polymarket)**.

هذه المنصة القائمة على تكنولوجيا البلوكشين حولت المونديال إلى سوق أسهم شديد التقلب. لم يعد المشجع يراهن على فوز فريقه فحسب، بل يتم تداول عقود احتمالية حول كل تفصيل دقيق:

* 📉 **احتمالية إقالة مدرب معين** قبل نهاية دور المجموعات.
* 🟨 **عدد البطاقات الصفراء** التي سيشهرها حكم بعينه في الشوط الأول.
* 🗣️ **تصريحات اللاعبين السياسية أو الجدلية** خارج الملعب.

هذا التحول حوّل شريحة واسعة من المتابعين من "مشجعين" إلى "مضاربين ماليين" يبحثون عن الربح السريع عبر العملات المشفرة، مما أدى إلى تسليع اللعبة وتجريدها من شغفها الأصلي، وزاد من حدة التوتر والاحتقان على منصات التواصل الاجتماعي عند خسارة هذه الرهانات الدقيقة.

---

### تهديد التجربة الحقيقية للمشجعين

إن هذا التحول الجذري في سلوك المتابعين يخلق تحديات غير مسبوقة أمام صناعة المحتوى والتسويق الرياضي. فبدلاً من التركيز على بناء مجتمعات تفاعلية صحية، وإدارة روزنامة محتوى تحتفي باللعبة، أو تنظيم فعاليات وتنشيط مناطق المشجعين (Fan-Zones) في المقاهي والمساحات الترفيهية لتشجيع التفاعل الاجتماعي الحقيقي، يصطدم هذا الجهد ببيئة رقمية مسمومة.

الجمهور اليوم بات مشتتاً بين منصات المضاربة اللامركزية التي تستنزف أمواله، وبيئة تواصل اجتماعي مشحونة بخطاب الكراهية الذي يعجز الفيفا عن احتوائه. هذا المزيج السام يضر بالرأي العام، يفرغ الرياضة من محتواها الإنساني، ويجعل من مونديال 2026 مسرحاً لتوترات مالية واجتماعية لا تمت لكرة القدم بصلة.`,
    contentEn: `### A Trust Crisis Shadows the Biggest World Cup in History

FIFA continues to face a mounting trust crisis among global public opinion. As the 2026 World Cup kicks off across the US, Canada, and Mexico, the world's largest sports governing body finds itself tangled in a losing battle to control the digital narrative—where heavy-handed censorship and automated comment deletions collide with the rise of hyper-speculative, decentralized blockchain prediction markets that commodify every single second of the beautiful game.

---

### Digital Censorship: A Windmill Battle

In a desperate attempt to control the toxic discourse surrounding the tournament, FIFA has resorted to mass content deletion—a sweeping policy seen by many as a cosmetic face-saving exercise rather than a meaningful remedy to sports fanaticism.

Since the tournament commenced last Thursday in the United States, Mexico, and Canada, FIFA has quietly deleted hundreds of thousands of comments deemed inciting or abusive on major social media channels.

According to official figures, FIFA reviewed **3.8 million posts**, deleting **388,000 of them**. This marks a sharp escalation from the **287,000 posts and comments** deleted during the Qatar 2022 World Cup. FIFA stated that *"more than 250 million comments and posts were screened, of which over 30 million were flagged as abusive or hostile,"* as reported by the German Press Agency (DPA).

To address this digital crisis, a panel of prominent sports figures convened in Atlanta, Georgia. Notable participants included former Liberian President **George Weah** (the only African player to ever win the Ballon d'Or), former Nigerian international icon **Mercy Akide**, and **David Gerson**, an American referee and founder of the *"Referees Need Love Too"* movement.

George Weah shared a powerful sentiment:
> "When I look back, I see that almost nothing has changed. I suffered racial abuse at the very peak of my career, and we are still talking about it today. This is why we fight. We must educate the youth to become compassionate human beings, not just passionate sports fans. Discrimination has no place in our society."

---

### The Polymarket Takeover: Decentralized Betting Re-engineers Fanhood

While FIFA exhausts resources chasing offensive comments, it remains blind to a far larger beast devouring the authentic spirit of the sport. Sports betting has broken free from traditional betting shops and simple match outcome slips; it has mutated into a speculative financial complex driven by decentralized prediction markets, chief among them **Polymarket**.

Operating on public blockchain infrastructure, Polymarket has effectively transformed the World Cup into a volatile, high-frequency stock exchange. Fans no longer just root for their national team; they actively trade probability contracts pegged to minute micro-events:

* 📉 **The probability of a specific head coach being sacked** before the group stage concludes.
* 🟨 **The exact number of yellow cards** shown by a specific referee during the first half.
* 🗣️ **Whether a player will utter a specific political keyword** or controversy outside the pitch.

This structural shift has turned millions of casual football fans into "speculators" looking for rapid cryptocurrency gains. The intense financialization strips football of its organic joy, amplifying toxicity on social media whenever a micro-bet fails.

---

### Threatening the Authentic Fan Experience

This behavioral mutation presents an unprecedented threat to sports marketing, content distribution, and interactive media. Instead of focusing on healthy fan communities, creative content celebrating historical matches, or animating local fan zones in cafes and community hubs, sports networks must fight a toxic, financialized digital ecosystem.

Today’s audience is divided between decentralized speculation pools draining their bank accounts and digital platforms saturated with hate speech that FIFA is powerless to stop. This toxic brew dilutes the human element of sports, turning World Cup 2026 into a stress-filled financial trading floor instead of a celebration of the beautiful game.`,
    author: {
      nameAr: 'قسم التحقيقات الرياضية',
      nameEn: 'Sports Investigative Unit',
      titleAr: 'مراسل شؤون الفيفا والبلوكشين',
      titleEn: 'FIFA & Blockchain Correspondent',
      avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=200',
    },
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200',
    date: '2026-06-25',
    readTimeAr: '6 دقائق قراءة',
    readTimeEn: '6 min read',
    isFeatured: false,
    isPremium: false,
    tags: ['الفيفا', 'بوليماركت', 'المراهنات', 'مونديال 2026', 'العملات الرقمية', 'FIFA', 'Polymarket', 'World Cup 2026', 'Censorship', 'Crypto Betting'],
    views: 6189
  },
  {
    id: 'solidere-extension-2069',
    category: 'exclusives',
    categories: ['exclusives', 'lebanon', 'middle-east', 'markets'],
    titleAr: 'تمديد ولاية "سوليدير" حتى 2069.. صراع النفوذ، التسويات السياسية، ومستقبل وسط بيروت',
    titleEn: "Solidere Mandate Extended to 2069: Power Struggle, Political Deal-Making, and Future of Beirut Center",
    summaryAr: 'تتجه حكومة الرئيس نواف سلام اليوم نحو اتخاذ قرار استراتيجي بالغ الحساسية، يقضي بالمصادقة على تمديد ولاية شركة "سوليدير" حتى العام 2069، وسط صراع نفوذ شرس وتجاذبات قضائية وصفقات مع بلدية بيروت.',
    summaryEn: "The government of President Nawaf Salam is heading today towards adopting a highly sensitive strategic decision to extend the mandate of Solidere until the year 2069, amid an intense power struggle, judicial maneuvers, and municipal deals.",
    contentAr: `### ملخص سريع
تتجه حكومة الرئيس نواف سلام اليوم نحو اتخاذ قرار استراتيجي بالغ الحساسية، يقضي بالمصادقة على تمديد ولاية شركة "سوليدير" حتى العام 2069. يأتي هذا التوجه استجابة لطلب صريح من المدير العام للشركة، ناصر الشماع، بإعادة النظر في التمديد السابق المُقر في عهد حكومة فؤاد السنيورة (والذي ينهي ولاية الشركة في 2029)، والعودة إلى اعتماد المدة المنصوص عليها في النظام التأسيسي لعام 1994، والمحددة بـ 75 عاماً.

هذا القرار لا يُمثل مجرد إجراء إداري روتيني، بل يشكل تحولاً جذرياً يحوّل "سوليدير" من مستثمر مكلف بمهمة إعادة الإعمار ضمن إطار زمني محدد وضوابط قانونية، إلى "مالك أبدي" لوسط العاصمة اللبنانية، وذلك في غياب أي مراجعة شفافة لجدوى أعمال الشركة، أو تأثيراتها العمرانية والاقتصادية، أو مصير حقوق المالكين الأصليين والأملاك البحرية والعمومية.

### السياق التاريخي والقانوني للأزمة
تأسست شركة "سوليدير" في عام 1994 بهدف معلن هو إعادة إعمار وسط بيروت التجاري بعد الدمار الذي خلفته الحرب الأهلية اللبنانية، مع وعود بجذب الرساميل الأجنبية وتحريك العجلة الاقتصادية.

* **المدة التأسيسية الأصلية:** كان من المفترض أن تنتهي ولاية الشركة في عام 2019 (بعد 25 عاماً من التأسيس).
* **تمديد حكومة السنيورة (2005 و2007):** تم تمديد عمل الشركة عشر سنوات إضافية لتنتهي في 2029. كما أصدرت الحكومة في 2007 مرسوماً وسّع صلاحيات الشركة لتشمل تقديم خدمات استشارية وهندسية وتطويرية داخل لبنان وخارجه، مما حولها إلى إمبراطورية عقارية ومالية تتمتع بغطاء رسمي.
* **الطلب الحالي (2026):** المطالبة بإقرار عمر الشركة بـ 75 عاماً، متذرعين بالنظام الأساسي ومتجاوزين المهل القانونية السابقة، لضمان البقاء حتى 2069.

### صراع الأقطاب داخل "سوليدير" ومخاطر الاستحواذ
يتزامن طلب التمديد مع احتدام صراع نفوذ شرس داخل أروقة الشركة، ينذر بتغيير هيكلي في هوية مالكي وسط بيروت:

* **الإدارة الحالية (جناح ناصر الشماع):** تسعى لتثبيت التمديد كطوق نجاة للاحتفاظ بالسيطرة وإقناع المستثمرين بالبقاء، مستخدمة ورقة "المشاريع المستقبلية" لتبرير الحاجة إلى عقود زمنية طويلة.
* **جبهة أنطون صحناوي:** برز رئيس مجلس إدارة مصرف "سوسييتيه جنرال" كلاعب أساسي، حيث تشير تسريبات إلى استحواذه على أكثر من 40% من أسهم الشركة، بينما تعترف المصادر الرسمية في سوليدير بامتلاكه 10% فقط، مع تفويض يمثل 17% إضافية.
* **البعد الاستراتيجي للصراع:** يحذر معارضو التمديد من أن سيطرة صحناوي — الذي وُصف من قبل شريكته الموفودة الأميركية السابقة مورغان أورتاغوس بـ "رجل الأعمال المسيحي الصهيوني اللبناني" — قد تُمهد الطريق لبيع حصص استراتيجية من وسط بيروت لمستثمرين أجانب، وسط مخاوف جدية من تسرب هذه الأصول إلى شركات مالية تدير محافظ استثمارية إسرائيلية، مما يضفي بعداً سيادياً خطيراً على الملف.

### الهندسات القضائية والصفقات البلدية
لضمان تمرير التمديد وتعبيد الطريق أمام "سوليدير"، شهدت الكواليس سلسلة من التحركات القضائية والبلدية المثيرة للجدل:

#### 1. تطويق مجلس شورى الدولة
تعرض المجلس لضغوط أدت إلى استبعاد القاضية ريتا كرم، التي كانت قد أوصت بإبطال مرسوم التمديد الصادر عام 2005 واعتبار ولاية الشركة منتهية في 2019. عقب ذلك، عمل المجلس الحالي برئاسة يوسف الجميل على تجميد وإنهاء الطعون المقدمة ضد الشركة. وفي أيار الماضي، تمت المصادقة على رد المراجعة المقدمة من صاحب منتجع "السان جورج" فادي خوري، بحجة "انتفاء الصفة والمصلحة"، مما أغلق الباب أمام الملاحقات القانونية.

#### 2. صفقة "غراند ثياتر" مع بلدية بيروت
بموازاة الضغط القضائي، كُشف عن اجتماعات سرية بين رئيس بلدية بيروت إبراهيم زيدان والمدير العام للشركة زياد أبو جمرة. تتمحور الصفقة حول:
* تنازل البلدية عن أسهمها في "سوليدير" (المقدرة بـ 2.4 مليون دولار).
* إعفاء الشركة من أرباح مستحقة غير مسددة للبلدية.
* **المقابل:** حصول البلدية على مبنى "غراند ثياتر" التراثي المتهالك، والذي يتطلب ترميمه ملايين الدولارات. تهدف إدارة سوليدير من هذه الصفقة إلى التخلص من عبء المبنى، وفي الوقت ذاته إخراج البلدية من مظلة المساهمين لتقليص الرقابة والمساءلة.

### الخلاصة الاقتصادية والسياسية
يأتي التمديد لـ "سوليدير" في وقت تعتمد فيه الشركة كلياً على البيوعات العقارية لتحقيق السيولة، مستفيدة من اندفاعة شراء العقارات التي تلت الانهيار المالي في عام 2019 كطريقة لتهريب الودائع من المصارف.

إن مصادقة حكومة نواف سلام على إبقاء الشركة حتى عام 2069 تعني عملياً غض النظر عن التعديات على الأملاك البحرية والعمومية، وتجاهل الإخفاقات العمرانية والاجتماعية التي رافقت عمل الشركة طوال ثلاثة عقود. والأخطر من ذلك، أنه يقدم وسط بيروت كجائزة ترضية في لعبة الصراع المالي والسياسي، حيث يبدو أن المستفيد الأكبر من هذا التمديد — وإزاحة العوائق القانونية — لن يكون الخزينة العامة أو المواطن اللبناني، بل كبار حملة الأسهم الجدد القادرين على إعادة تشكيل هوية وملكيات العاصمة اللبنانية لعقود قادمة.`,
    contentEn: `### Quick Summary
Today, the government of President Nawaf Salam is moving toward taking a highly sensitive strategic decision, approving the extension of Solidere's mandate until 2069. This trend comes in response to an explicit request by General Manager Nasser Chammaa, to revise the previous extension under Fouad Siniora's government (which was set to end the company's term in 2029) and return to the 75-year lifespan established in the 1994 founding bylaws.

This is not merely a routine administrative procedure; it is a fundamental shift that transforms Solidere from a temporary developer tasked with reconstruction under a specific timeline and legal framework, into the "eternal owner" of the Lebanese capital's heart, with no transparent review of its viability, urban or economic impact, or the fate of the original owners' rights, public maritime domain, and public properties.

### Historical and Legal Context of the Crisis
Solidere was founded in 1994 with the declared goal of reconstructing Beirut's historic commercial center after the civil war's devastation, promising to attract foreign capital and stimulate the economy.

* **Original Founding Duration:** The company's mandate was supposed to end in 2019 (25 years from founding).
* **Siniora Government Extensions (2005 & 2007):** The company's mandate was extended for an additional ten years to end in 2029. In 2007, a government decree expanded the company's scope to include consulting, engineering, and development inside and outside Lebanon, transforming it into a real estate and financial empire with official backing.
* **Current Request (2026):** Demanding the recognition of a 75-year company lifespan, bypassing previous legal deadlines, to guarantee its survival until 2069.

### Power Struggles inside Solidere and Risks of Takeover
The extension request coincides with an intense power struggle inside the company, threatening to structurally alter the ownership of downtown Beirut:

* **Current Management (Nasser Chammaa's faction):** Seeks to cement the extension as a lifeline to retain control and convince investors to stay, using the card of "future projects" to justify long-term contracts.
* **Antoun Sehnaoui's Front:** The Chairman of SGBL bank has emerged as a key player. Leaks suggest he has acquired more than 40% of the company's shares, while official Solidere sources admit his ownership of only 10% alongside proxies representing an additional 17%.
* **Strategic Dimension of the Conflict:** Opponents of the extension warn that Sehnaoui's control—who was described by his partner, former US spokesperson Morgan Ortagus, as a "Christian Zionist Lebanese businessman"—could pave the way for selling strategic shares of downtown Beirut to foreign investors, with serious concerns about these assets slipping to financial companies managing Israeli investment portfolios, adding a grave sovereign dimension to the file.

### Judicial Engineering and Municipal Deals
To ensure the passage of the extension, several controversial judicial and municipal movements took place behind the scenes:

#### 1. Sidelining the State Council
The council was pressured, leading to the exclusion of Judge Rita Karam, who had recommended invalidating the 2005 extension decree and considering the company's term finished in 2019. Subsequently, the current council headed by Youssef Al-Jamil froze and dismissed appeals against the company. In May, they approved dismissing the appeal filed by Saint George Resort owner Fadi Khouri under the pretext of "lack of standing and interest", closing the door on legal pursuit.

#### 2. The "Grand Theatre" Deal with the Beirut Municipality
In parallel with judicial pressure, secret meetings were uncovered between Beirut Mayor Ibrahim Zeidan and Solidere General Manager Ziad Abu Jamra. The deal centers on:
* The municipality relinquishing its shares in Solidere (estimated at $2.4 million).
* Exempting the company from unpaid accrued profits due to the municipality.
* **In Return:** The municipality receives the historic, dilapidated "Grand Theatre" building, which requires millions of dollars to restore. Solidere's management aims to rid itself of the building's burden while removing the municipality from the shareholders' pool to reduce oversight and accountability.

### Economic and Political Conclusion
The extension for Solidere comes at a time when the company relies entirely on real estate sales to generate liquidity, capitalizing on the real estate buying rush that followed the 2019 financial collapse as a way to smuggle deposits out of banks.

The approval by Nawaf Salam's government to keep the company until 2069 practically means turning a blind eye to violations of public and maritime domain, and ignoring the urban and social failures of the past three decades. Worse, it presents downtown Beirut as a consolation prize in a financial and political game, where the biggest beneficiary of this extension—and the removal of legal obstacles—will not be the public treasury or the Lebanese citizen, but rather the new major shareholders capable of reshaping the identity and ownership of the Lebanese capital for decades to come.`,
    author: {
      nameAr: 'ديوان التحرير الاستقصائي',
      nameEn: 'Sovereign Investigative Desk',
      titleAr: 'تحليل خاص بالعمق السيادي والعمراني',
      titleEn: 'Special Sovereign & Urban Analysis',
    },
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    date: '2026-06-25',
    readTimeAr: '8 دقائق قراءة',
    readTimeEn: '8 min read',
    isFeatured: true,
    isPremium: false,
    tags: ['سوليدير', 'بيروت', 'نواف سلام', 'أنطون صحناوي', 'العقارات', 'التسويات السياسية', 'Solidere', 'Beirut', 'Nawaf Salam', 'Real Estate', 'Political Deals'],
    views: 4821
  },
  {
    id: 'solidere-stock-struggle-2026',
    category: 'exclusives',
    categories: ['exclusives', 'lebanon', 'markets'],
    titleAr: 'معركة على قلب بيروت: كواليس تطور أسهم "سوليدير" واستحواذ صحناوي',
    titleEn: 'Battle for the Heart of Beirut: Backstage of Solidere Stock Evolution and Sehnaoui Takeover',
    summaryAr: 'لعقود من الزمن، وقفت "سوليدير" كرمز مطلق للحقبة الحريرية. أما اليوم، فقد تحولت الشركة إلى ساحة لحرب سياسية وشركاتية لا ترحم مع استحواذ شرس يقوده أنطون صحناوي.',
    summaryEn: 'For decades, Solidere stood as the ultimate symbol of the post-war Hariri era. Today, the company has transformed into a ruthless political and corporate battlefield with an aggressive takeover led by Antoun Sehnaoui.',
    contentAr: `### معركة على قلب بيروت: كواليس تطور أسهم "سوليدير" واستحواذ صحناوي

لعقود من الزمن، وقفت الشركة اللبنانية لتطوير وإعادة إعمار وسط بيروت (سوليدير) كرمز مطلق للحقبة الحريرية في فترة ما بعد الحرب — عملاق عقاري ضخم أعاد تشكيل العاصمة. أما اليوم، فقد تحولت الشركة إلى ساحة لحرب سياسية وشركاتية لا ترحم.

وفيما يتخبط لبنان في أزمة اقتصادية طاحنة، تحولت "سوليدير" من مشروع إعمار متعثر إلى ملاذ مالي آمن، لتصبح في نهاية المطاف ساحة معركة للسيطرة بين النخب المالية في البلاد. وفي قلب هذه العاصفة يقف أنطون صحناوي، الرئيس التنفيذي لمصرف "سوسييتيه جنرال في لبنان" (SGBL)، الذي يهدد استحواذه الشرس على الأسهم بإنهاء قبضة الحرس القديم على قلب بيروت بالكامل.

### تطور أسهم "سوليدير": من الركود إلى "الملاذ الآمن"

لفهم صراع السلطة الحالي، يجب تتبع المسار الغريب لسهم "سوليدير" في بورصة بيروت. فتقييم الشركة لم يكن مدفوعاً بنجاح عقاري تقليدي، بل بانهيار القطاع المصرفي اللبناني.

عندما ضربت الأزمة المالية في أواخر عام 2019، احتُجزت مليارات الدولارات في البنوك اللبنانية (والتي عُرفت شعبياً باسم "اللولار"). وتدفق المودعون اليائسون، سعياً لإنقاذ أي قيمة من حساباتهم المتبخرة، نحو الأصل الملموس الوحيد المتاح في السوق المحلية: أسهم "سوليدير".

| الإطار الزمني | ديناميكيات سعر السهم | محركات السوق |
| :--- | :--- | :--- |
| **ما قبل 2019** | ركود بين 5 و 8 دولارات | عدم الاستقرار السياسي، غياب الاستثمار الأجنبي، المشاريع المتعثرة. |
| **2019 – 2021** | ارتفاع صاروخي من 8 دولارات إلى أكثر من 30 دولاراً | الشراء بدافع الذعر. استخدم المودعون أموالهم المحتجزة في البنوك (اللولار) لشراء الأسهم كتحوط عقاري مادي. |
| **2022 – 2024** | بلغ ذروته حول 60 – 80 دولاراً | التضخم المفرط والفقدان الكامل للثقة في القطاع المصرفي؛ تجميع شرس للأسهم من قبل كبار اللاعبين الماليين. |
| **2025 – الحاضر** | استقرار مع تركز عالٍ للملكية | جفاف تداولات "اللولار" للأفراد؛ تعزيز السيطرة المؤسسية مع اشتداد حرب الوكالة في مجلس الإدارة. |

أتاح هذا التضخم المصطنع في سعر السهم لشركة "سوليدير" تصفية ديونها المصرفية الضخمة، ليحولها إلى كيان خالٍ من الديون يمتلك أثمن العقارات في البلاد. هذا التعافي المالي الحديث هو بالضبط ما أشعل الحرب الحالية للسيطرة عليها.

### استحواذ صحناوي: سيطرة عدائية بالوكالة؟

في حين تدافع صغار المستثمرين لشراء الأسهم لإنقاذ مدخراتهم، أدرك اللاعبون ذوو الملاءة المالية الأكبر وجود فرصة تاريخية. وبرز أنطون صحناوي كأشرس مُجمّع لأسهم "سوليدير".

تتوشح آليات هذا الاستحواذ بالغموض المؤسسي، لكن الأرقام تكشف عن استراتيجية ممنهجة للاستيلاء على مجلس الإدارة:
* **الحيازات الرسمية:** رسمياً، يمتلك صحناوي والكيانات التابعة له ما يقدر بنحو 10% من أسهم "سوليدير".
* **ترسانة الوكالات:** من خلال التحالفات الاستراتيجية، والنفوذ المالي، وحقوق التصويت بالوكالة التي جُمعت من شبكة من المستثمرين والمودعين الحلفاء، يسيطر صحناوي فعلياً على كتلة تصويت إضافية تقدر بـ 17%.
* **النفوذ المُشاع:** يزعم مطلعون ومعارضون سياسيون أن دائرة نفوذه الحقيقية تملي حركة أكثر من 40% من أسهم الشركة، مما يمنحه سلطة نقض (فيتو) بحكم الأمر الواقع وسيطرة تشغيلية كاملة على قرارات مجلس الإدارة.

تمثل مناورات صحناوي تحولاً جوهرياً؛ فهو يستبدل تحالفات المقاولين والسياسيين التقليدية التي سادت في التسعينيات بنهج الأوليغارشية المصرفية الشرسة والحديثة.

### سياسات القوة: الحرس القديم في مواجهة الجبابرة الجدد

يتشابك الاستحواذ على الشركة بشكل عميق مع المشهد السياسي المتصدع في لبنان. وقد رُسمت خطوط المعركة بين الإدارة الحالية، بقيادة المدير العام المخضرم ناصر الشماع، وجبهة صحناوي المتقدمة.

* **جناح الشماع (الحرس القديم):** يمثل هذا الجناح بقايا إرث رفيق الحريري، وقد سعى باستماتة للحصول على غطاء سياسي للحفاظ على السيطرة. وتمثلت استراتيجيتهم الأساسية في تأمين مرسوم حكومي مثير للجدل لتمديد الولاية القانونية لشركة "سوليدير" من تاريخ انتهائها المقرر في 2029 وصولاً إلى 2069. ومن خلال الترويج لـ "مشاريع مستقبلية ضخمة" والتحذير من هروب المستثمرين، حاولوا استخدام أجهزة الدولة لترسيخ مواقعهم.
* **جناح صحناوي (الجبابرة الماليون):** يرى معسكر صحناوي أن الإدارة القديمة أصبحت بالية، ويهدف إلى إطلاق القيمة الهائلة غير المستغلة لوسط بيروت. يمنحه نفوذه المالي الهائل قوة كبيرة، إلا أن تموضعه السياسي — الذي يتوافق غالباً مع المصالح المالية الغربية ويعارضه حزب الله — يجعل من معركة مجلس الإدارة صورة مصغرة للجيوسياسة الوطنية.

### الغطاء السياسي:

تنقسم الطبقة السياسية بشدة حول من يجب أن يملك وسط بيروت:
* **الداعمون الضمنيون:** شخصيات داخل الحكومة الحالية، تسعى إلى "استقرار السوق"، ووفرت تاريخياً الغطاء لتمديدات الشركة.
* **المعارضة:** عارض حزب الله بشدة تمديد ولاية "سوليدير" وينظر إلى نفوذ صحناوي المتنامي بشك عميق، مشيراً إلى مخاوف من تسلل رؤوس أموال أجنبية غير مدققة — أو حتى أصول تُدار إسرائيلياً بشكل غير مباشر — إلى العاصمة عبر أدوات مالية معقدة.
* **المناورات البلدية:** خلف الأبواب المغلقة، تجري جهود حثيثة لتجريد بلدية بيروت من أسهمها المتبقية مقابل مبانٍ تراثية متهالكة، وهي خطوة مصممة لإبعاد الرقابة العامة عن مجلس الإدارة بالكامل.

### الخلاصة: مستقبل العاصمة

لم تعد "سوليدير" مجرد شركة عقارية فحسب؛ بل أصبحت بديلاً للثروة السيادية يتنازع عليه بشراسة الناجون من الانهيار المالي في لبنان. إن تطور أسهمها يروي قصة ثروة أمة منهوبة، في حين يسلط استحواذ أنطون صحناوي الضوء على انتقال السلطة من السلالات السياسية التقليدية إلى حقبة جديدة من الجبابرة الماليين.

وفيما تناقش الحكومة تمديد عمر الشركة حتى عام 2069، يبقى السؤال الحاسم: من سيملك بيروت حقاً لنصف القرن القادم؟`,
    contentEn: `### Battle for the Heart of Beirut: Backstage of Solidere Stock Evolution and Sehnaoui Takeover

For decades, the Lebanese Company for the Development and Reconstruction of Beirut Central District (Solidere) stood as the ultimate symbol of the post-war Hariri era — a colossal real estate giant that reshaped the capital. Today, the company has transformed into a ruthless political and corporate battlefield.

As Lebanon grapples with a devastating economic crisis, Solidere shifted from a struggling reconstruction project into a financial safe haven, eventually becoming a battlefield for control among the country's financial elites. At the heart of this storm stands Antoun Sehnaoui, CEO of SGBL, whose aggressive stock acquisition threatens to entirely end the old guard's grip on Beirut's core.

### Solidere Stock Evolution: From Stagnation to "Safe Haven"

To understand the current power struggle, one must track the bizarre trajectory of Solidere shares on the Beirut Stock Exchange (BSE). The company's valuation was driven not by traditional real estate success, but by the collapse of the Lebanese banking sector.

When the financial crisis struck in late 2019, billions of dollars were locked in Lebanese banks (popularly termed "Lollars"). Desperate depositors, seeking to salvage any value from their evaporating accounts, rushed toward the only tangible local asset available: Solidere stock.

| Timeframe | Stock Price Dynamics | Market Drivers |
| :--- | :--- | :--- |
| **Pre-2019** | Stagnated between $5 and $8 | Political instability, lack of foreign investment, stalled projects. |
| **2019 – 2021** | Skyrocketed from $8 to over $30 | Panic buying. Depositors used frozen bank balances ("Lollars") to acquire stock as a physical real estate hedge. |
| **2022 – 2024** | Peaked around $60 – $80 | Hyperinflation & complete loss of confidence in the banking sector; aggressive stock absorption by major financial players. |
| **2025 – Present** | Consolidation with highly concentrated ownership | Drying up of retail "Lollar" trade; institutional consolidation as boardroom proxy warfare intensifies. |

This artificial inflation of the stock price allowed Solidere to clear its massive banking debt, turning it into a debt-free entity owning the most valuable real estate in the country. This recent financial rejuvenation is precisely what ignited the current war for its control.

### Sehnaoui Takeover: Hostile Control by Proxy?

While retail investors scrambled to buy shares to save their savings, larger and more liquid players recognized a historic opportunity. Antoun Sehnaoui emerged as the most aggressive accumulator of Solidere stock.

The mechanics of this acquisition are shrouded in corporate opacity, but the numbers reveal a calculated strategy to capture the board:
* **Official Holdings:** Officially, Sehnaoui and his affiliated entities own an estimated 10% of Solidere's shares.
* **Proxy Arsenal:** Through strategic alliances, financial leverage, and voting proxies gathered from a network of allied investors and depositors, Sehnaoui effectively controls an additional 17% voting block.
* **Rumored Influence:** Insiders and political opponents claim his true circle of influence dictates the movement of more than 40% of the company's shares, giving him de facto veto power and full operational control over board decisions.

Sehnaoui's maneuvers represent a paradigm shift; he replaces the traditional contractor-politician alliances of the 1990s with a modern, aggressive banking oligarchy.

### Power Politics: Old Guard vs. New Titans

The corporate takeover is deeply intertwined with Lebanon's fractured political landscape. Battle lines are drawn between the current management, led by veteran GM Nasser Chammaa, and Sehnaoui's advancing front.

* **Chammaa Faction (Old Guard):** Representing the remnants of Rafik Hariri's legacy, this faction has desperately sought political cover to maintain control. Their primary strategy has been securing a controversial cabinet decree to extend Solidere's legal lifespan from its scheduled 2029 end to 2069. By highlighting "future megaprojects" and warning of investor flight, they have attempted to use state machinery to entrench themselves.
* **Sehnaoui Faction (Financial Titans):** Sehnaoui's camp views the old management as obsolete and aims to unlock the massive, untapped value of downtown Beirut. While his immense financial leverage gives him power, his political alignment — often aligned with Western financial interests and opposed by Hezbollah — makes the boardroom battle a microcosm of national geopolitics.

### Political Cover:

The political class is sharply divided on who should own downtown Beirut:
* **Implicit Supporters:** Figures inside the current cabinet, seeking "market stability," historically provided cover for the company's extensions.
* **The Opposition:** Hezbollah vehemently opposed extending Solidere's mandate and views Sehnaoui's growing influence with deep suspicion, citing concerns of unchecked foreign capital — or even indirectly Israeli-managed assets — slipping into the capital via complex financial vehicles.
* **Municipal Maneuvers:** Behind closed doors, intense efforts are underway to strip Beirut Municipality of its remaining shares in exchange for dilapidated heritage buildings, a move designed to remove public oversight from the board entirely.

### Conclusion: The Capital's Future

Solidere is no longer just a real estate company; it has become a surrogate sovereign wealth fund fiercely contested by the survivors of Lebanon's financial collapse. Its stock evolution tells a story of a plundered nation's wealth, while Sehnaoui's takeover highlights the transfer of power from traditional political dynasties to a new era of financial titans.

As the government debates extending the company's lifespan to 2069, the crucial question remains: Who will really own Beirut for the next half-century?`,
    author: {
      nameAr: 'ديوان التحرير الاستقصائي',
      nameEn: 'Sovereign Investigative Desk',
      titleAr: 'تحليل خاص بالعمق السيادي والمالي',
      titleEn: 'Special Sovereign & Financial Analysis',
    },
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    date: '2026-06-25',
    readTimeAr: '7 دقائق قراءة',
    readTimeEn: '7 min read',
    isFeatured: true,
    isPremium: false,
    tags: ['سوليدير', 'بيروت', 'البورصة', 'أنطون صحناوي', 'الأسهم', 'السياسة اللبنانية', 'Solidere', 'Beirut', 'SGBL', 'Stocks', 'Lebanese Politics'],
    views: 6104
  },
  {
    id: 'coinex-iran-crypto-illicit-2026',
    category: 'translations',
    categories: ['translations', 'middle-east', 'markets'],
    titleAr: 'كيف أصبحت منصة لتداول العملات المشفرة مركزاً رئيسياً للأموال الإيرانية غير المشروعة',
    titleEn: 'How a Crypto Exchange Became a Hub for Iranian Illicit Cash',
    summaryAr: 'كيانات إيرانية نقلت أكثر من 3.84 مليار دولار في معاملات عبر منصة "كوين إكس" (CoinEx)، وفقاً لتحليل بيانات البلوكشين العامة من شركة TRM Labs.',
    summaryEn: 'Iranian entities moved over $3.84 billion in transactions through CoinEx, according to a public blockchain data analysis by TRM Labs.',
    contentAr: `*بقلم: ديلان توكار وويل بريسكين | رسوم بيانية: بيتر سانتيلّي*
*تاريخ النشر: 24 يونيو 2026، 9:00 مساءً بتوقيت الساحل الشرقي*

### ملخص سريع
محافظ رقمية مرتبطة بإيران نقلت ما يزيد عن 3.84 مليار دولار في معاملات عبر منصة "كوين إكس" للعملات المشفرة منذ عام 2019، وفقاً لبيانات شركة (TRM Labs).

في وقت سابق من هذا العام، اكتشف محققو العملات المشفرة سلسلة مقلقة من المعاملات المرتبطة بمحفظتين رقميتين خاضعتين لسيطرة البنك المركزي الإيراني.

وبالتتبع العكسي لمسار الأموال، اكتشف المحققون أن أموال المحفظتين كانت مرتبطة بمبلغ 1.5 مليار دولار سرقها قراصنة كوريون شماليون من منصة تداول العملات المشفرة (Bybit). وبعد وصول الأموال إلى المحافظ الإيرانية، تدفقت عبر متاهة معقدة من المعاملات. وكانت إحدى الوجهات النهائية هي منصة عملات مشفرة أصبحت ركيزة أساسية لقدرة إيران على التهرب من العقوبات الاقتصادية الأمريكية واسعة النطاق.

وتظهر بيانات البلوكشين أن منصة "كوين إكس" (CoinEx)، التي تأسست قبل 8 سنوات على يد مهندس صيني، لعبت دوراً متزايداً في ربط عمليات التشفير الإيرانية بالعالم الخارجي. فمنذ عام 2019، قامت محافظ ذات صلة واضحة بإيران بنقل أكثر من 3.84 مليار دولار عبر "كوين إكس"، وفقاً لشركة الاستخبارات المتخصصة في البلوكشين (TRM Labs).

ويشير التحليل إلى أنه من بين تعاملاتها، استقبلت محافظ تستضيفها المنصة عملات مشفرة مسروقة حصل عليها البنك المركزي الإيراني، كما أجرت معاملات مباشرة مع حسابات نُسبت لاحقاً من قبل مسؤولين أمريكيين إلى الحرس الثوري الإيراني.

### موقف إدارة "كوين إكس"
أطلق هايبو يانغ، المهندس السابق في شركة "تنسنت" (Tencent) والذي يدير واحداً من أكبر مجمعات تعدين البيتكوين في العالم، منصة "كوين إكس" من هونغ كونغ في عام 2017. وفي رسائل نصية مع صحيفة وول ستريت جورنال، أقر يانغ بأن المنصة استُخدمت على نطاق واسع من قبل الإيرانيين، لكنه أكد أنه لا توجد أي علاقة تجمعها بالحكومة الإيرانية.

وقال يانغ إن منصة "كوين إكس"، التي تتخذ الآن من جزيرة سيشل الأفريقية مقراً لها، تحتفظ بنظام لمراقبة المعاملات، وتقوم بفحص المستخدمين ذوي المخاطر العالية، وبدأت هذا الشهر في اتخاذ خطوات للنأي بنفسها عن السوق الإيرانية، بما في ذلك حظر المستخدمين الجدد الذين يمتلكون عناوين إنترنت (IP) إيرانية.

من جانبه، أعلن متحدث باسم "كوين إكس" أن المنصة ستجري مراجعة داخلية للمعاملات التي تربط الأموال بعملية اختراق منصة (Bybit).

### مسار تعقب الأموال: كيف تتحرك الأصول؟
تتبعت شركة (TRM Labs) العملات المشفرة من محافظ منسوبة إلى البنك المركزي الإيراني على شبكة (Tron). وكانت الأموال مقومة بعملة مستقرة تُعرف باسم "تيثر" (USDT). ورغم أن (USDT) ليست شديدة التقلب كالعملات الرقمية الأخرى، إلا أنه يمكن تجميدها من قبل جهة الإصدار.

**خطوات غسيل ونقل الأموال:**

1. **التجزئة والربط:** تم تقسيم الأموال وتوجيهها عبر خدمات الربط (Bridging services) التي نقلت الرموز إلى شبكة (Ethereum).
2. **العقود الذكية:** تم تمرير الـ (USDT) عبر عقد ذكي (Smart contract)، والذي استخدم بروتوكول تمويل لامركزي (DeFi) لمبادلة الرموز بعملات رقمية أخرى. هذه المقايضات وخدمات الربط تجعل من الصعب تتبع مسار الأموال.
3. **المحافظ غير المستضافة:** تم إرسال الأموال بعد ذلك إلى سلسلة من المحافظ غير المستضافة (Unhosted wallets) — وهي حسابات رقمية لا تستضيفها مؤسسة مالية خارجية، مما يمنحها درجة أكبر من إخفاء الهوية.
4. **التحويل المستمر:** استخدمت هذه المحافظ، التي يسيطر عليها مستخدم واحد أو مجموعة صغيرة، بروتوكولات لامركزية إضافية لتحويل الأموال إلى عملة مستقرة تسمى (DAI). ثم مُررت الرموز عبر خدمات ربط إضافية لنقل الأموال إلى شبكة (Binance Smart Chain)، مع تحويلها إلى عملة رقمية أخرى في هذه العملية.
5. **الاستقرار في المنصات:** خضعت الأموال لجولة أخرى من التجزئة قبل أن تستقر في محافظ تستضيفها نوبيتكس (Nobitex)، أكبر منصة محلية للعملات المشفرة في إيران.
6. **الوجهة النهائية (كوين إكس):** في النهاية، تم إرسال 67 مليون دولار إلى حسابات إيداع في كوين إكس (CoinEx)، حيث نُقلت الأموال لاحقاً إلى محفظة خزانة تابعة للمنصة واختلطت بإيداعات وسحوبات أخرى، مما يجعل تتبعها أبعد من ذلك أمراً مستحيلاً.

*(ملاحظة: تم تبسيط مسار الأموال المتتبعة من أجل الوضوح - المصدر: TRM Labs).*

### تحدي العقوبات الأمريكية
تسلط قدرة الإيرانيين على استخدام "كوين إكس" الضوء على الصعوبات التي تواجهها الولايات المتحدة في فرض العقوبات ضد الجمهورية الإسلامية. فقد تبنت البلاد العملات المشفرة علناً، وتوفر هذه الصناعة مجموعة من المنصات الغامضة التي تعمل خارج متناول الولايات المتحدة، وتربط الاقتصاد الإيراني المحلي بالنظام البيئي العالمي للعملات المشفرة.

وتعد "كوين إكس" واحدة من هذه المنصات، حيث وافقت على الخروج من السوق الأمريكية بعد تغريمها في عام 2023 من قبل المدعي العام في نيويورك.

وتتفاوض الولايات المتحدة حالياً على اتفاق سلام مع إيران قد يتضمن تخفيفاً كبيراً للقيود الاقتصادية. وكانت واشنطن قد هددت سابقاً بتوسيع العقوبات لتشمل المؤسسات المالية الأجنبية التي تدعم أنشطة طهران.

وقد حاولت الولايات المتحدة الحد من عمل منصات التشفير مع إيران:
* في عام 2023، عاقبت الولايات المتحدة شركة باينانس (Binance)، أكبر منصة تداول في العالم، جزئياً بسبب سماحها لعملاء إيرانيين باستخدام منصتها. ولطالما كانت باينانس أكبر طرف مقابل لمنصة "نوبيتكس" الإيرانية.
* انخفض هذا الانكشاف في عام 2022 عندما أعلنت باينانس اتخاذ خطوات لتحسين ضوابط العقوبات الخاصة بها.
* بحلول عام 2024، أظهرت بيانات البلوكشين أن "كوين إكس" حلت محل باينانس كأكبر طرف أجنبي مقابل لـ "نوبيتكس".

وقد فرضت إدارة ترامب عقوبات على "نوبيتكس" في وقت سابق من هذا الشهر بتهمة دعم الحكومة الإيرانية. ولم يرد ممثلوها على طلبات التعليق. ووفقاً لنتائج (TRM)، تدفقت العملات المشفرة من "نوبيتكس" إلى "كوين إكس" بكميات أكبر بكثير مما عاد إلى المنصة الإيرانية. ومن خلال "كوين إكس"، تمكن المستخدمون الإيرانيون من الوصول إلى النظام البيئي الأوسع، بما في ذلك باينانس.

### شعبية الأصول الرقمية في إيران
تحظى الأصول الرقمية بشعبية كبيرة بين المواطنين الإيرانيين الذين يسعون لتداول العملات المشفرة من أجل الربح، وحماية أنفسهم من التدهور المستمر للعملة المحلية (الريال). ويقدر الباحثون أن حوالي 13% من سكان إيران يمتلكون عملات مشفرة، ليشاركوا في سوق بلغت قيمته التقديرية بين 8 إلى 10 مليارات دولار في عام 2025.

بدأت "كوين إكس" في بناء وجود لها داخل إيران في السنوات التي تلت إطلاقها، ووظفت في بعض الأحيان مديري تطوير أعمال في البلاد لتوظيف المستخدمين، وفقاً لموظفين سابقين. ومع ذلك، نفى المتحدث باسم الشركة إنشاء أي مكتب في إيران أو تعيين موظفين لتطوير الأعمال هناك عن قصد. ومع مرور الوقت، أصبحت المنصة قناة مفضلة لنظام الظل المصرفي الإيراني.

### حجم المعاملات بين كوين إكس ونوبيتكس
قامت (TRM) بتحليل نشاط المحافظ المشفرة التي ربطتها بأكثر من 60 كياناً إيرانياً. وتبيّن أن معظم الأموال التي تدفقت بين إيران و"كوين إكس" جاءت عبر "نوبيتكس".

**حجم المعاملات المتدفقة:**
* **2019:** 233 ألف دولار
* **2020:** 13 مليون دولار
* **2021:** 156 مليون دولار
* **2022:** 184 مليون دولار
* **2023:** 343 مليون دولار
* **2024:** 575 مليون دولار
* **2025:** 714 مليون دولار
* **2026 (حتى 22 يونيو):** 763 مليون دولار

اعتبرت "كوين إكس" أن تجميع (TRM) للأحجام المتبادلة مضلل، مشيرة إلى أن تقديرات مزود طرف ثالث آخر كانت أقل، وأن نتائج أي منصة تحليلات واحدة لا ينبغي اعتبارها نهائية. ومع ذلك، فإن التقديرات التي قدمتها الشركة نفسها لا تزال تضع المنصة كأكبر طرف مقابل لـ "نوبيتكس" في عام 2025.

### روابط الحرس الثوري وشبكات التهرب
تم ربط كيانات أخرى تعاملت مع محافظ "كوين إكس" بالحرس الثوري الإيراني من قبل المسؤولين الأمريكيين. بين عامي 2022 و2025، عالجت محافظ "كوين إكس" معاملات لصالح علي رضا درخشان، وهو إيراني يُزعم تورطه في شبكة لبيع النفط خضعت لعقوبات أمريكية العام الماضي.

كما أرسلت محافظ "كوين إكس" وتلقت أموالاً من محافظ منسوبة إلى منصة (Zedcex)، وهي منصة مسجلة في مكتب بوسط لندن ارتبطت برجل الأعمال الإيراني باباك زنجاني، الذي وصف نفسه بأنه استراتيجي لعمليات التهرب من العقوبات لصالح الحرس الثوري.

راجعت صحيفة وول ستريت جورنال المعاملات المتعلقة بـ "درخشان" و"Zedcex" باستخدام مستكشفات البلوكشين المتاحة للجمهور.

في العام الماضي، عاقبت وزارة الخزانة شبكة متهمة بمعالجة أكثر من 100 مليون دولار من العملات المشفرة الناتجة عن مبيعات النفط الإيرانية، بما في ذلك درخشان. وفي يناير، فرضت عقوبات على (Zedcex) وزنجاني. وقد حدثت المعاملات التي شملت "كوين إكس" قبل قرارات وزارة الخزانة.

### تطورات حديثة وإجراءات صارمة
تعرض سوق العملات المشفرة في إيران لاضطراب شديد في أواخر فبراير، عندما دفعت هجمات منسقة من قبل الجيشين الأمريكي والإسرائيلي السلطات الإيرانية إلى تعليق معظم خدمات الإنترنت. وقال مستخدمون إيرانيون لصحيفة وول ستريت جورنال إنهم لم يتمكنوا من الوصول إلى "كوين إكس" حينها.

ولكن خلال تلك الفترة، زاد متوسط حجم المعاملات المتدفقة بين "كوين إكس" و"نوبيتكس"، وفقاً تحليل (TRM). وردت "كوين إكس" بأنها لم تلاحظ الزيادة ذاتها في حجم المعاملات، وأنه لم يكن من الممكن عزو النشاط إلى جهات حكومية أو فاعلين معاقبين من الدولة.

في الأسابيع الأخيرة، بدأت "كوين إكس" باتخاذ إجراءات فعلية للنأي بنفسها عن السوق الإيرانية. وأبلغت حساباتها باللغة الفارسية على وسائل التواصل الاجتماعي المستخدمين بتطبيق إجراءات جديدة للتحقق من هويات العملاء.

وأكد يانغ أن المنصة لن تقبل أي مستخدمين إيرانيين جدد، وتقوم حالياً بإزالة المستخدمين السابقين الذين تتمكن من تحديدهم. وأضاف أن المنصة اتخذت هذه التدابير بعد فرض العقوبات على "نوبيتكس"، وذلك بعد "إدراكها أن المخاطر أصبحت أعلى بكثير"، مشيراً إلى أنه سيتم إغلاق جميع حسابات وسائل التواصل الاجتماعي التابعة للمنصة باللغة الفارسية.`,
    contentEn: `*By Dylan Tokar and Will Brisekin | Charts by Peter Santilli*
*Published: June 24, 2026, 9:00 PM EST*

### Quick Summary
Crypto wallets linked to Iran have routed more than $3.84 billion through the CoinEx exchange since 2019, according to blockchain intelligence firm TRM Labs.

Earlier this year, cryptocurrency investigators uncovered an alarming series of transactions linked to two digital wallets controlled by the Central Bank of Iran.

By tracing the funds backward, investigators discovered that the money in the two wallets was linked to $1.5 billion stolen by North Korean hackers from the crypto exchange Bybit. After reaching Iranian wallets, the funds flowed through a complex maze of transactions. One of the final destinations was a cryptocurrency exchange that has become a key pillar of Iran’s ability to evade sweeping U.S. economic sanctions.

Blockchain data shows that CoinEx, founded eight years ago by a Chinese engineer, has played an increasing role in bridging Iranian crypto operations with the outside world. Since 2019, wallets with clear links to Iran have moved over $3.84 billion through CoinEx, according to TRM Labs, a blockchain intelligence firm.

The analysis indicates that among its dealings, wallets hosted by the platform received stolen cryptocurrency obtained by the Central Bank of Iran and conducted direct transactions with accounts later attributed by U.S. officials to the Islamic Revolutionary Guard Corps (IRGC).

### CoinEx Management's Stance
Haipo Yang, a former Tencent engineer who runs one of the world's largest Bitcoin mining pools, launched CoinEx from Hong Kong in 2017. In text messages with The Wall Street Journal, Yang acknowledged that the platform was widely used by Iranians but stressed that it has no relationship with the Iranian government.

Yang said CoinEx, now based in the Seychelles, maintains a transaction monitoring system, screens high-risk users, and began taking steps this month to distance itself from the Iranian market, including blocking new users with Iranian IP addresses.

For his part, a CoinEx spokesperson announced that the platform would conduct an internal review of transactions linking funds to the Bybit hack.

### Tracing the Money: How Do Assets Move?
TRM Labs traced cryptocurrency from wallets attributed to the Central Bank of Iran on the Tron network. The funds were denominated in the stablecoin Tether (USDT). While USDT is not highly volatile like other digital currencies, it can be frozen by the issuer.

**Steps of Money Laundering and Transfer:**

1. **Splitting and Bridging:** The funds were split and routed through bridging services that transferred the tokens to the Ethereum network.
2. **Smart Contracts:** The USDT was passed through a smart contract, which used a decentralized finance (DeFi) protocol to swap the tokens for other digital currencies. These swaps and bridging services make it difficult to trace the flow of funds.
3. **Unhosted Wallets:** The funds were then sent to a series of unhosted wallets—digital accounts not hosted by a third-party financial institution, providing a higher degree of anonymity.
4. **Continuous Transfer:** These wallets, controlled by a single user or a small group, used additional decentralized protocols to convert the funds into the stablecoin DAI. The tokens were then passed through additional bridging services to transfer the funds to the Binance Smart Chain, converting them into another digital currency in the process.
5. **Settling in Exchanges:** The funds underwent another round of splitting before settling in wallets hosted by Nobitex, Iran's largest local cryptocurrency exchange.
6. **Final Destination (CoinEx):** Ultimately, $67 million was sent to deposit accounts at CoinEx, where the funds were later transferred to an exchange treasury wallet and mixed with other deposits and withdrawals, making tracing beyond that point impossible.

*(Note: Traced fund paths have been simplified for clarity - Source: TRM Labs).*

### Challenging U.S. Sanctions
The ability of Iranians to use CoinEx highlights the difficulties the United States faces in enforcing sanctions against the Islamic Republic. The country has openly embraced cryptocurrencies, and the industry provides an array of opaque platforms operating out of U.S. reach, linking Iran's domestic economy to the global crypto ecosystem.

CoinEx is one of these platforms, having agreed to exit the U.S. market after being fined in 2023 by the New York Attorney General.

The U.S. is currently negotiating a peace deal with Iran that could include significant relief of economic restrictions. Washington had previously threatened to expand sanctions to include foreign financial institutions that support Tehran's activities.

The U.S. has tried to curb crypto platforms' operations with Iran:
* In 2023, the U.S. penalized Binance, the world's largest exchange, partly for allowing Iranian customers to use its platform. Binance had long been the largest counterparty for Iran's Nobitex.
* This exposure decreased in 2022 when Binance announced steps to improve its sanctions controls.
* By 2024, blockchain data showed that CoinEx replaced Binance as Nobitex's largest foreign counterparty.

The Trump administration sanctioned Nobitex earlier this month for supporting the Iranian government. Its representatives did not respond to requests for comment. According to TRM findings, cryptocurrency flowed from Nobitex to CoinEx in much larger volumes than what returned to the Iranian exchange. Through CoinEx, Iranian users were able to access the broader ecosystem, including Binance.

### Popularity of Digital Assets in Iran
Digital assets are highly popular among Iranian citizens seeking to trade crypto for profit and protect themselves from the persistent devaluation of the local currency (the rial). Researchers estimate that about 13% of Iran's population owns cryptocurrency, participating in a market valued at an estimated $8 to $10 billion in 2025.

CoinEx began building a presence inside Iran in the years following its launch, sometimes employing business development managers in the country to recruit users, according to former employees. However, the company's spokesperson denied establishing any office in Iran or knowingly hiring staff for business development there. Over time, the platform became a preferred channel for Iran's shadow banking system.

### Transaction Volumes Between CoinEx and Nobitex
TRM analyzed activity from crypto wallets it linked to more than 60 Iranian entities. It found that the vast majority of funds flowing between Iran and CoinEx came via Nobitex.

**Flowing Transaction Volumes:**
* **2019:** $233,000
* **2020:** $13 million
* **2021:** $156 million
* **2022:** $184 million
* **2023:** $343 million
* **2024:** $575 million
* **2025:** $714 million
* **2026 (until June 22):** $763 million

CoinEx deemed TRM's aggregation of exchanged volumes misleading, pointing out that another third-party provider's estimates were lower, and that the findings of any single analytics platform should not be considered definitive. However, the estimates provided by the company itself still place the platform as Nobitex's largest counterparty in 2025.

### IRGC Links and Evasion Networks
Other entities interacting with CoinEx wallets have been linked to the IRGC by U.S. officials. Between 2022 and 2025, CoinEx wallets processed transactions for Alireza Derakhshan, an Iranian allegedly involved in an oil-sale network sanctioned by the U.S. last year.

CoinEx wallets also sent and received funds from wallets attributed to the Zedcex platform, an exchange registered in a Central London office linked to Iranian businessman Babak Zanjani, who described himself as a sanctions-evasion strategist for the IRGC.

The Wall Street Journal reviewed transactions related to Derakhshan and Zedcex using publicly available blockchain explorers.

Last year, the Treasury sanctioned a network accused of processing more than $100 million in cryptocurrency from Iranian oil sales, including Derakhshan. In January, it sanctioned Zedcex and Zanjani. The transactions involving CoinEx occurred before the Treasury's decisions.

### Recent Developments and Crackdowns
The cryptocurrency market in Iran was severely disrupted in late February when coordinated military strikes by the U.S. and Israeli militaries prompted Iranian authorities to suspend most internet services. Iranian users told The Wall Street Journal they were unable to access CoinEx at the time.

Yet, during that period, the average volume of transactions flowing between CoinEx and Nobitex increased, according to TRM's analysis. CoinEx responded that it did not observe the same increase in transaction volume, and that the activity could not be attributed to state entities or sanctioned state actors.

In recent weeks, CoinEx has begun taking concrete steps to distance itself from the Iranian market. Its Persian-language social media accounts informed users of new customer identification verification procedures.

Yang confirmed that the platform will not accept any new Iranian users and is currently removing former users it can identify. He added that the platform took these measures after the sanctions on Nobitex, "realizing that the risks had become much higher," noting that all Persian-language social media accounts of the exchange would be closed.`,
    author: {
      nameAr: 'ديلان توكار وويل بريسكين',
      nameEn: 'Dylan Tokar and Will Brisekin',
      titleAr: 'مراسلون لصحيفة وول ستريت جورنال | رسوم بيانية: بيتر سانتيلّي',
      titleEn: 'Wall Street Journal Correspondents | Charts by Peter Santilli',
    },
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1200&q=80',
    date: '2026-06-24',
    readTimeAr: '6 دقائق قراءة',
    readTimeEn: '6 min read',
    isFeatured: false,
    isPremium: false,
    tags: ['العملات المشفرة', 'إيران', 'كوين إكس', 'نوبيتكس', 'العقوبات', 'البلوكشين', 'Cryptocurrency', 'Iran', 'CoinEx', 'Nobitex', 'Sanctions', 'Blockchain'],
    views: 1284
  },
  {
    id: 'trump-crypto-deals-fans-loss-2026',
    category: 'translations',
    categories: ['translations', 'us-politics', 'markets'],
    titleAr: 'ترامب يجني مليار دولار من صفقات العملات المشفرة بينما خسر معجبوه ثرواتهم',
    titleEn: 'Trump Made $1 Billion on Crypto Deals While His Fans Lost a Fortune',
    summaryAr: 'نحو ثلثي المستثمرين في "عملة الميم" الخاصة بالرئيس يتكبدون خسائر حالياً وسط فجوة شاسعة بين أرباح ترامب الهائلة وخسائر مؤيديه.',
    summaryEn: 'About two-thirds of investors in the President’s meme coin are currently losing money, highlighting a stark contrast between Trump’s massive profits and his fans’ financial losses.',
    excerptAr: 'ترجم عن موقع وول ستريت جورنال (wsj.com) حول أرباح ترامب الخيالية وخسائر معجبيه من العملات المشفرة.',
    excerptEn: 'Translated from The Wall Street Journal (wsj.com) on Trump’s crypto windfalls and his followers’ losses.',
    contentAr: `على الرغم من إعلان الولايات المتحدة رفع الحصار البحري عن طهران منتصف يونيو الماضي في إطار اتفاق سلام مؤقت، تواجه إيران أزمة حقيقية في تصريف شحناتها النفطية. وتتراكم ملايين البراميل في عرض البحر وسط عزوف كبار المشترين الآسيويين وترقبهم لنتائج المفاوضات غير المباشرة بين واشنطن وطهران في قطر، وهو ما يتزامن مع ضغوط هبوطية واضحة على أسعار النفط العالمية نتيجة لتدفق الإمدادات عبر مضيق هرمز.

### ترامب يجني مليار دولار من صفقات العملات المشفرة بينما خسر معجبوه ثرواتهم
نحو ثلثي المستثمرين في "عملة الميم" الخاصة بالرئيس يتكبدون خسائر حالياً
بقلم: فيكي غي هوانغ، وأمريث رامكومار، وديفيد أوبيرتي

نُشر في: 1 يوليو 2026

راهن مورتن كريستنسن العام الماضي بمبالغ كبيرة على الرموز الرقمية (Tokens) التي باعتها شركة "وورلد ليبرتي فاينانشال" (World Liberty Financial) المملوكة لعائلة ترامب، حاملاً أملاً في أن يكون الارتفاع المتوقع في قيمتها كافياً لمساعدته على التقاعد.

وبدلاً من ذلك، تهاوت قيمة تلك الرموز. وبينما تكبد كريستنسن والعديد من أمثاله خسائر فادحة، حقق الرئيس ثروة طائلة، حيث جنى 800 مليون دولار صافية من هذا المشروع المشفر وحده، وفقاً لإفصاح مالي قدمه هذا الأسبوع.

> **تصريح:** قال رائد الأعمال في مجال الأصول الرقمية كريستنسن: "في سوق العملات المشفرة، يقول الناس إن اللعبة هي اللعبة.. لقد لعب ترامب لعبة أفضل مما فعلت".

لقد كان واضحاً منذ فترة أن اقتحام الرئيس ترامب لعالم العملات المشفرة كان مربحاً للغاية، لكن الإفصاح المذهل عن أن تلك المشاريع درّت عليه نحو 1.4 مليار دولار العام الماضي يؤكد الفجوة الشاسعة والواقع المختلف تماماً الذي يعيشه الرئيس مقارنة بالعديد من المستثمرين الذين أقبلوا على الأصول الرقمية مدفوعين باسمه.

### صيف رقمي للرئيس وشتاء قارس للمستثمرين
حصد الرئيس الأموال السائلة عبر إصدار أصول رقمية جديدة — تمثلت في رموز "وورلد ليبرتي" وعملات الميم (memecoins). لكن أولئك الذين اشتروها بأسعار مرتفعة عانوا الأمرين بعد أن تهاوت قيمتها لاحقاً، كجزء من انهيار أوسع في سوق المشفرات. وهكذا، تُرك الأتباع السياسيون والمؤمنون الحقيقيون بالعملات المشفرة، الذين وثقوا بعلامة ترامب التجارية، يتحملون عبء الخسائر وحدهم.

* **خسائر عملة الميم:** وفقاً لمزود بيانات العملات المشفرة "نانسين" (Nansen)، الذي يتتبع 1.48 مليون محفظة رقمية اشترت العملة منذ إطلاقها في يناير 2025، فإن نحو ثلثي المستثمرين في عملة الميم الخاصة بترامب يتكبدون خسائر حالياً.
* **حجم الإنفاق:** أنفق العديد من المعجبين بضعة آلاف من الدولارات على عملات ترامب، بينما دفع كبار المنفقين ملايين الدولارات للحصول عليها.
* **السوق الثانوية:** يظهر تحليل "نانسين" لـ 26,663 محفظة أن 85% من مشتري رمز "WLFI$" الخاص بشركة "وورلد ليبرتي" في السوق الثانوية غارقون في الخسائر حالياً.

وكان ترامب قد وصف عملة البيتكوين في عام 2021 بأنها "عملية احتيال" تهدد الدولار الأمريكي، لكنه يقود الآن بيتاً أبيض تعهد بجعل أمريكا "عاصمة العملات المشفرة في العالم". وفي حين خففت إدارته القيود التنظيمية على هذا القطاع المعروف بتقلباته الحادة، تغلغلت أعمال عائلة ترامب الواسعة في مجال التشبيه في كل ركن من أركان هذه الصناعة تقريباً، مما أثار مخاوف جدية بشأن تضارب المصالح من جانب مراقبي الأخلاقيات، بالتزامن مع تراجع أسعار البيتكوين أيضاً.

### إحباط في "تروث سوشيال" واستسلام للأمر الواقع
أثار هذا التباين إحباط بعض أشد مؤيدي الرئيس وحلفائه في صناعة العملات المشفرة على حد سواء. فإلى جانب الرموز التعبيرية لـ "صواريخ الفضاء" التي اعتاد مستخدمو منصة "تروث سوشيال" (Truth Social) —المملوكة لشركة ترامب ميديا— استخدامها لمناقشة الاستثمارات المرتبطة بترامب، تحول حديث بعض الأفراد يوم الأربعاء إلى السخرية والتهكم؛ حيث قال أحد المستخدمين عن رموز "WLF": "استثماري أصبح بلا قيمة الآن".

ولكن في سوق العملات المشفرة، حيث يمكن لعملات الميم أن تتبخر قيمتها سريعاً، وحيث تشكل عمليات "سحب البساط" (rug pulls) والاحتيال تهديداً مستمراً، استسلم مستثمرون آخرون لخسائرهم باعتبارها جزءاً من مخاطر اللعبة.

وقال فنسنت ديريو، وهو مستشار يبلغ من العمر 28 عاماً ومتحمس للعملات المشفرة في نيويورك، إنه اشترى في البداية رمز "TRUMP$" عند إطلاقه وجمع المزيد لضمان مقعد في "عشاء عملات الميم الافتتاحي". وبعد بيع نصفها تقريباً في أواخر عام 2025، لا يزال يمتلك أكثر من 8,000 عملة.

وأضاف ديريو: "لم يجبر أحد أي شخص على الذهاب والاستثمار في أي من هذه الرموز. لقد اشتراها الناس على مسؤوليتهم الخاصة. يجب على المزيد من السياسيين الانتباه، وأن يكونوا أكثر شفافية بشأن كيفية جني الأموال في مشاريعهم التجارية".

### قفزة قبل التنصيب وقوانين تثير التساؤلات
قبل أيام من تنصيبه، أطلق ترامب عملة الميم الخاصة به "TRUMP$"، والتي قفزت قيمتها السوقية الإجمالية في ذروتها لتصل إلى نحو 15 مليار دولار قبل أن تهبط بنسبة 97% لتسجل حوالي 400 مليون دولار اليوم. وفي سبتمبر 2024، ساعد ترامب وأبناؤه في إطلاق "وورلد ليبرتي فاينانشال"، المشروع الرئيسي للعائلة في مجال التشفير.

وأطلق هذا المشروع لاحقاً عملة مستقرة (stablecoin) مرتبطة بالدولار قبل وقت قصير من توقيع ترامب على "قانون جينيوس" (Genius Act) ليصبح قانوناً نافذاً، والذي يضع إطاراً تنظيمياً لمثل هذه العملات المرتبطة بالدولار.

من جانبهم، ينفي مسؤولو البيت الأبيض وجود أي تضارب في المصالح. وصرحت المتحدثة باسم البيت الأبيض، آنا كيلي، قائلة:

> "لم يشارك الرئيس ولا عائلته قط —ولن يشاركوا أبداً— في أي تضارب للمصالح. إن جميع الإجراءات التي يتخذها الرئيس ترامب وإدارته تأتي لمصلحة الشعب الأمريكي".

وتُظهر الإفصاحات أن الطفرة في أرباح ترامب من العملات المشفرة العام الماضي جاءت بالإضافة إلى الدخل المزدهر من أعمال الفنادق وملاعب الغولف التقليدية التابعة لعائلته، فضلاً عن تضخم حيازاته من الأسهم في شركات تكنولوجية كبرى مثل نيفيديا (Nvidia) وميتا (Meta).

وقد قلل ترامب من أهمية هذه الأرباح غير المتوقعة، وعزا مكاسبه إلى الانتعاش العام للأسواق، حيث قال للصحفيين يوم الأربعاء: "هل تعرفون لماذا أربح؟ لأن سوق الأسهم يرتفع. نحن جميعاً نربح. أنا أربح لأنني أملك الكثير من المال والكثير من السيولة النقدية".

### تعقيدات تشريعية في الكونغرس
يمكن أن يؤدي هذا الإفصاح إلى تعقيد المفاوضات المضطربة في الكونغرس بشأن التشريع الذي من شأنه وضع قواعد تنظم العملات المشفرة، وهو مشروع قانون يمثل أولوية قصوى للعديد من شركات التشفير التي أنفقت ملايين الدولارات على جهود الضغط (Lobbying).

ويصر العديد من الديمقراطيين وبعض الجمهوريين على أن يتضمن مشروع القانون بنوداً صارمة تمنع الرئيس والمسؤولين المنتخبين من التربح من أنشطة التشفير التي قد تستفيد بشكل مباشر من اللوائح التي يشرفون عليها — وهي نقطة خلاف قد تصبح أكثر استعصاءً على الحل بعد هذا الإفصاح الأخير.

وقالت السناتورة سينثيا لوميس (جمهورية عن ولاية وايومنغ)، وهي راعية لمشروع القانون وتتفاوض مع البيت الأبيض والديمقراطيين بشأن صياغة البنود الأخلاقية، إن التشريع سيتضمن بنوداً قوية وهو أفضل طريقة لمعالجة هذه المخاوف. وسيحتاج مشروع القانون إلى بعض الدعم الديمقراطي للحصول على الأصوات الستين اللازمة لتمريره في مجلس الشيوخ، بعد أن مر بالفعل عبر مجلس النواب.

وعقّب السناتور روبن غاليغو (ديمقراطي عن ولاية أريزونا)، وهو أحد الديمقراطيين الذين اشترطوا إدراج بند الأخلاقيات لدعم القانون، قائلاً بعد موافقة لجنة الخدمات المصرفية بمجلس الشيوخ على التشريع في منتصف مايو: "يجب حل هذا الأمر، وإلا فلا أعتقد أنهم سيحصلون على الأصوات اللازمة". وجد غاليغو هجومه يوم الثلاثاء عبر منصة "إكس" (X) مؤكداً أن ترامب يجني المليارات مستغلاً منصبه الرئاسي بينما يرفع التكاليف على الطبقة العاملة.

وفي نهاية المطاف، يبدو أن بعض المستثمرين مثل كريستنسن، مؤسس موقع "airdropalert.com" ومالك كمية كبيرة من رموز "WLFI"، والذين اشتروا أيضاً عملة "TRUMP$" لتأمين دعوات لحضور فعاليات ترامب، لا يحملون ضغينة شخصية رغم المفاجأة؛ إذ ختم كريستنسن حديثه بالقول: "يبدو أنها كانت أداة رائعة لتحقيق الدخل له ولعائلته، وهو في النهاية يهتم بمصلحة عائلته ومقربيه".`,
    contentEn: `*Translated from The Wall Street Journal (wsj.com) - [Original Article](https://www.wsj.com/finance/currencies/trump-made-1-billion-on-crypto-deals-while-his-fans-lost-a-fortune-408754c9?mod=hp_lead_pos1)*

### Trump Made $1 Billion on Crypto Deals While His Fans Lost a Fortune
About two-thirds of investors in the President's meme coin are currently losing money.
By: Vicky Ge Huang, Amrith Ramkumar, and David Uberti

Published: July 1, 2026

Last year, Morten Christensen placed substantial bets on the digital tokens sold by World Liberty Financial, a crypto enterprise backed by the Trump family, hoping that their anticipated rise in value would be enough to help him retire.

Instead, the value of those tokens crashed. While Christensen and many others like him suffered heavy losses, the president made a fortune, clearing $800 million net from this crypto project alone, according to a financial disclosure filed this week.

> **Statement:** "In crypto, people say the game is the game," said Christensen, a digital-asset entrepreneur. "Trump just played a better game than I did."

It has been clear for some time that President Trump’s foray into cryptocurrencies was highly lucrative, but the stunning disclosure that his crypto ventures brought him about $1.4 billion last year underscores the wide gap and completely different realities between the president and many everyday investors who bought into digital assets driven by his brand.

### A Golden Summer for the President, a Bitter Winter for Investors
The president harvested cash by issuing new digital assets—represented by World Liberty tokens and memecoins. But those who bought them at peak prices suffered as their values subsequently collapsed, part of a wider crash in the crypto markets. Thus, political followers and true believers in crypto who trusted the Trump brand were left to bear the burden of the losses.

* **Memecoin Losses:** According to crypto data provider Nansen, which tracks 1.48 million digital wallets that have bought the coin since its launch in January 2025, about two-thirds of investors in Trump’s memecoin are currently in the red.
* **Spending Scale:** Many fans spent a few thousand dollars on Trump's coins, while some high-rollers spent millions.
* **Secondary Market:** Nansen’s analysis of 26,663 wallets shows that 85% of buyers of the World Liberty $WLFI token on the secondary market are currently underwater.

Trump had described Bitcoin in 2021 as a "scam" threatening the US dollar, but he now leads a White House that has pledged to make America the "crypto capital of the planet." While his administration has rolled back regulations on the highly volatile sector, the Trump family's sprawling crypto business has reached into nearly every corner of the industry, raising serious conflict-of-interest concerns from ethics watchdogs, even as Bitcoin prices have also declined.

### Frustration on Truth Social and Resignation to the Game
The contrast has frustrated some of the president's most ardent supporters and allies in the crypto industry alike. Alongside the "rocket ship" emojis that Truth Social users once used to discuss Trump-associated investments, conversation on Wednesday turned to frustration and sarcasm, with one user noting of the WLF tokens: "My investment is now worth nothing."

Yet in the crypto market, where memecoins can evaporate in minutes and "rug pulls" and scams are constant threats, other investors resigned themselves to their losses as part of the game's risk.

Vincent Deriu, a 28-year-old consultant and crypto enthusiast in New York, said he initially bought the $TRUMP token at launch and accumulated more to secure a ticket to the "inaugural memecoin dinner." After selling about half of his holdings in late 2025, he still holds more than 8,000 tokens.

"Nobody forced anyone to go and buy any of these tokens," Deriu said. "People bought them at their own risk. More politicians should pay attention and be more transparent about how they make money in their business ventures."

### A Pre-Inaugural Surge and Questionable Laws
Days before his inauguration, Trump launched his memecoin, $TRUMP, which surged to a total market cap of about $15 billion at its peak before plunging 97% to register around $400 million today. In September 2024, Trump and his sons helped launch World Liberty Financial, the family’s signature crypto project.

The project later launched a US dollar-pegged stablecoin shortly before Trump signed the "Genius Act" into law, establishing a regulatory framework for such dollar-backed tokens.

White House officials deny any conflicts of interest. White House spokesperson Anna Kelly stated:

"Neither the President nor his family has ever participated—nor will they ever participate—in any conflicts of interest. All actions taken by President Trump and his administration are in the best interest of the American people."

Disclosures show that Trump’s surge in crypto profits last year came in addition to flourishing income from his traditional hotel and golf businesses, as well as ballooning stock holdings in tech giants like Nvidia and Meta.

Trump downplayed the windfalls, attributing his gains to the general market upswing, telling reporters on Wednesday: "Do you know why I'm winning? Because the stock market is going up. We are all winning. I'm winning because I have a lot of money and a lot of cash."

### Legislative Complications in Congress
This disclosure could complicate fractious negotiations in Congress over legislation to establish rules for cryptocurrencies, a bill that is a top priority for many crypto firms that spent millions on lobbying.

Many Democrats and some Republicans insist the bill include strict provisions to prevent the president and elected officials from profiting from crypto activities that could directly benefit from regulations they oversee—a point of contention that could become even harder to resolve following this latest disclosure.

Senator Cynthia Lummis (R., Wyo.), a sponsor of the bill who has been negotiating with the White House and Democrats on ethics language, said the legislation would include robust provisions and is the best way to address these concerns. The bill will need some Democratic support to get the 60 votes required to pass the Senate, having already cleared the House.

Senator Ruben Gallego (D., Ariz.), one of the Democrats who conditioned their support on the ethics clause, said after the Senate Banking Committee approved the legislation in mid-May: "This has to be solved, or I don't think they'll have the votes." Gallego renewed his attack on Tuesday on X, asserting that Trump is reaping billions by exploiting his presidency while raising costs for working-class families.

Ultimately, some investors like Christensen, founder of airdropalert.com and a major WLFI token holder who also bought the $TRUMP coin to secure invitations to Trump events, bear no personal grudge despite the surprise. "It seems like it was a great monetization tool for him and his family, and at the end of the day, he cares about his family and those close to him," Christensen concluded.`,
    author: {
      nameAr: 'فيكي غي هوانغ، أمريث رامكومار، ديفيد أوبيرتي',
      nameEn: 'Vicky Ge Huang, Amrith Ramkumar, and David Uberti',
      titleAr: 'مراسلون لصحيفة وول ستريت جورنال (ترجمة عن wsj.com)',
      titleEn: 'Wall Street Journal Correspondents (Translated from wsj.com)',
    },
    imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=1200&q=80',
    date: '2026-07-01',
    readTimeAr: '6 دقائق قراءة',
    readTimeEn: '6 min read',
    isFeatured: true,
    isPremium: false,
    tags: ['العملات المشفرة', 'ترامب', 'وول ستريت جورنال', 'الكونغرس', 'مشاريع ترامب', 'Cryptocurrency', 'Trump', 'WSJ', 'Congress', 'Trump Deals'],
    views: 1845
  },
  {
    id: 'exclusives-china-yuan-sanctions-2026',
    category: 'exclusives',
    categories: ['exclusives', 'middle-east'],
    titleAr: 'الصين تغري العالم باليوان — وتعرقل العقوبات الغربية',
    titleEn: 'China Tempts the World with the Yuan — and Thwarts Western Sanctions',
    summaryAr: 'استخدمت إيران وروسيا العملة لتنفيذ مبيعات النفط وغيرها من المعاملات التجارية، للتهرب من القيود المفروضة على المعاملات بالدولار.',
    summaryEn: 'Iran and Russia have used the currency to conduct oil sales and other commercial transactions, evading dollar transaction restrictions.',
    contentAr: `دخل البيت الأبيض في محادثات مع إيران بشأن اتفاق نووي جديد، معتمداً على نقطة قوة تقليدية تتمثل في: الوعد بتخفيف العقوبات وإتاحة الوصول إلى نحو 100 مليار دولار من الأصول المجمدة.

إلا أن وسيلة الضغط هذه آخذة في التضاؤل؛ فقد تمكنت طهران من إضعاف تأثير حملة العقوبات الأمريكية في السنوات الأخيرة عبر الاستخدام الناجح للبنية التحتية المالية للصين — المبنية على عملة اليوان — والتي تعمل بعيداً عن متناول واشنطن.

تجلى هذا التحول بوضوح في أواخر أبريل عندما صعّدت الولايات المتحدة حملتها التي عُرفت باسم "الغضب الاقتصادي" ضد إيران، حيث فرضت عقوبات على مصفاة صينية كبرى قالت إنها اشترت نفطاً إيرانياً بمليارات الدولارات. من جهتها، ردت المصفاة، وهي شركة "هينغلي للبتروكيماويات" (Hengli Petrochemical)، بأن مورّدها قدم ضمانات بأن النفط ليس إيرانياً.

لكن الشركة وجهت أيضاً رسالة تحذير للولايات المتحدة، إذ أعلنت أن مشتريات النفط المستقبلية ستتم تسويتها باليوان بدلاً من الدولار الأمريكي (العملة الرئيسية في سوق الطاقة)، مما يجعل من الصعب على الأطراف الخارجية تتبع التدفقات المالية.

كان ذلك أحدث مؤشر على تطور جديد مقلق بالنسبة لواشنطن. فالمزيد من الأنشطة غير المشروعة الهادفة للتهرب من العقوبات حول العالم باتت تتم باليوان، في وقت تعكف فيه الصين على بناء نظام مالي بديل يهدف إلى إضعاف قدرة واشنطن على إملائها شروطها في الشؤون العالمية.

تاريخياً، منحت هيمنة الدولار الأمريكي — الذي يُستخدم حالياً في نحو 80% من تمويل التجارة الدولية — واشنطن ميزة كبرى في مراقبة الأعمال التجارية العالمية. إذ يجب تسوية معظم المعاملات الدولية المقومة بالدولار عبر بنوك أمريكية، مما يمنح واشنطن القدرة على مراقبتها، وقطع إمدادات الدولار عن المستخدمين إذا لزم الأمر، وهو ما يكفي لشل عملياتهم بالكامل.

ولكن عندما يستخدم خصوم الولايات المتحدة اليوان لإدارة أعمالهم، فإن هذه المعاملات لا تدخل ضمن النظام المصرفي الذي تقوده الولايات المتحدة، مما يجرد واشنطن من صلاحياتها.

وقد مهدت الولايات المتحدة الطريق أمام إيران لاستئناف مبيعاتها النفطية، بل وتلقي مدفوعاتها بالدولار، خلال فترة المفاوضات. ولكن حتى في ظل العقوبات الأمريكية الرامية إلى حظر هذه المبيعات، حصدت إيران إيرادات نفطية تصل إلى 43 مليار دولار في عام 2024، وذلك قبل احتساب الخصومات غير المحددة، وفقاً لإدارة معلومات الطاقة الأمريكية. وتختلف نسبة هذه الخصومات، لكنها بلغت في المتوسط نحو 13% في عام 2025 بحسب المشرعين الأمريكيين.

ووفقاً لوزارة الخزانة الأمريكية، تم دفع معظم قيمة تلك المبيعات باليوان.

وتستخدم طهران هذه الأموال لشراء قطع غيار السيارات الصينية والألواح الشمسية وغيرها من السلع والخدمات، بالإضافة إلى المواد ذات الاستخدام المزدوج — وهي مواد يُفترض أنها للاستخدام المدني ولكن يمكن استخدامها أيضاً في الأسلحة — وكل ذلك يتم خارج نطاق الولاية القضائية الأمريكية.

كما أُبلغت السفن التي تسعى للحصول على عبور آمن في مضيق هرمز أثناء النزاع بضرورة الدفع لطهران باليوان أو بالعملات المشفرة، والتي يصعب أيضاً على واشنطن السيطرة عليها. ويقول مسؤولو وزارة الخزانة إن الشركاء الإيرانيين والصينيين أنشأوا شبكات من الوسطاء السريين والشركات الوهمية في هونغ كونغ وأماكن أخرى لتسهيل المزيد من التجارة باليوان.

تتم تسوية بعض هذه المعاملات عبر "نظام الدفع بين البنوك عبر الحدود" الصيني (CIPS)، وهو بديل مقوم باليوان لشبكة رسائل (Swift). وقد أنشأته الصين في عام 2015، ولا يمكن للولايات المتحدة مراقبته بسهولة.

وعلى الرغم من أن حجم التداول على هذه الشبكة لا يزال صغيراً، إلا أنه قفز بعد بدء النزاع بين الولايات المتحدة وإيران. فقد بلغ متوسط التداول نحو 790 مليار يوان (حوالي 115 مليار دولار) يومياً في الأشهر الثلاثة منذ نهاية فبراير، وفقاً لمركز الأبحاث "المجلس الأطلسي" (Atlantic Council)، مقارنة بمتوسط يومي بلغ 680 مليار يوان (نحو 100 مليار دولار) في العام الماضي.

تعتبر شبكة "سويفت" (Swift) ومقرها بلجيكا أكبر بكثير، حيث تسهل تحويل ما يقدر بأكثر من 5 تريليونات دولار يومياً، بما في ذلك بعض الرسائل التي تمر عبر نظام (CIPS). لكن التوسع السريع لنشاط (CIPS) يعني أنه يتحول تدريجياً إلى نظام مدفوعات عبر الحدود أكثر عالمية، وفقاً للمجلس الأطلسي.

### روسيا على نفس الخطى
وقد تكرر نمط مماثل مع روسيا عندما بدأت حربها في أوكرانيا في فبراير 2022. فبعد أن شددت الولايات المتحدة العقوبات، تمت تسوية المزيد من صادرات النفط الروسية وغيرها من التبادلات التجارية مع الصين باستخدام اليوان. وقد تضاعف إجمالي المعاملات اليومية على نظام (CIPS) وتضاعف عدد المؤسسات المالية العاملة على المنصة أكثر من الضعف منذ بداية الحرب وحتى منتصف عام 2025، وفقاً لبيانات البنك المركزي الصيني.

اليوم، يؤكد المسؤولون الروس أن أكثر من 90% من التجارة بين روسيا والصين تتم تسويتها باليوان والروبل الروسي. ورغم تعذر تحديد الرقم الإجمالي قبل الحرب، إلا أنه للمقارنة، كان اليوان يُستخدم في 2% فقط من التجارة الروسية في فبراير 2022، وفقاً لمركز الدراسات الشرقية (Centre for Eastern Studies) البولندي.

بشكل عام، تضاعفت حصة اليوان في تمويل التجارة العالمية ثلاث مرات خلال السنوات الخمس الماضية لتصل إلى 6% في أبريل، وفقاً لبيانات (Swift). وقد احتل اليوان المرتبة الثانية كأكثر العملات استخداماً في هذا النوع من التمويل لمعظم هذا العام، متقدماً على اليورو ومحتلاً المركز الثاني بعد الدولار.

ووفقاً لبيانات البنك المركزي الصيني، يتم الآن تقويم حوالي نصف المعاملات عبر الحدود للصين بعملتها الخاصة، مقارنة بنسبة تكاد لا تُذكر قبل 15 عاماً.

وتعمل الصين أيضاً على توسيع نطاق برنامج أطلقته في عام 2021 يُسمى (mBridge)، وهو منصة تستخدم النسخ الرقمية من اليوان والعملات الأخرى لتنفيذ مدفوعات عبر الحدود تتم تسويتها بين البنوك المركزية دون أن تمر الأموال عبر أي مؤسسة مالية أمريكية.

يقول جوش ليبسكي، المسؤول السابق في صندوق النقد الدولي والباحث الحالي في المجلس الأطلسي، إن جميع الأنظمة القائمة على اليوان "تسهل الالتفاف على العقوبات الأمريكية. إنها تحجب قدرة مجتمع الاستخبارات الأمريكي على رؤية مسار التدفقات المالية".

من جهتها، قالت وزارة الخارجية الصينية في بيان لها إنها "ليست على علم بالوضع" المتعلق بتجارة النفط بين الصين وإيران. وأكدت أن العلاقات بين البلدين "كانت دائماً تُدار في إطار القانون الدولي". وأضافت أن الصين تتعاون مع دول في جميع أنحاء العالم، بما في ذلك روسيا، بناءً على "مبادئ المساواة والمنفعة المتبادلة".

لا تنوي الصين استبدال الدولار باليوان بالكامل على مستوى العالم. فالزيادة الدراماتيكية في الاعتماد العالمي على اليوان ستتطلب من بكين إجراء تغييرات مؤلمة في اقتصادها، مثل التخلي عن ضوابط رأس المال والسماح لعملتها بالتعويم الحر، وهو ما قد يؤدي إلى هروب رؤوس الأموال وزعزعة استقرار البلاد.

وبدلاً من ذلك، يتمثل هدف بكين في بناء مسارات تجارية محددة تعمل خارج نطاق الدولار الأمريكي. ويقول مسؤولون سابقون في وزارة الخزانة الأمريكية إن هذا الدفع مدفوع جزئياً برغبة بكين في تقويض السلطة الأمريكية ومساعدة حلفائها. وتصرح الصين علانية بأنها ترفض العقوبات التي تفرضها الولايات المتحدة.

كما تأمل بكين في عزل الصين عن نوعية الهجمات الاقتصادية التي شنتها الولايات المتحدة والدول الغربية الأخرى على إيران وروسيا، والتي من المرجح أن تُطلق ضد بكين إذا اتخذت أي خطوة عسكرية تجاه تايوان.

وقال محافظ البنك المركزي الصيني، بان قونغ شنغ، في خطاب ألقاه الصيف الماضي، إن التمويل العالمي يتطور نحو نظام "تتعايش وتتنافس فيه بضع عملات سيادية". وأضاف أن التغيير من عالم يتمحور حول الدولار يُعد أمراً حتمياً، لأنه "في أوقات التوترات الجيوسياسية، أو مخاوف الأمن القومي، أو حتى الحروب، تميل العملة العالمية المهيمنة إلى أن تُستخدم كأداة أو سلاح".

وتدرك الولايات المتحدة الفجوة التي تنفتح في نظام العقوبات العالمي الخاص بها. فمنذ بدء الحرب في إيران، كثف مسؤولو وزارة الخزانة جهودهم للحد من مبيعات النفط الإيراني إلى الصين وتقليص الأموال المتدفقة عبر النظام المالي الصيني، بما في ذلك إصدار عقوبات جديدة على "هينغلي" وغيرها من المصافي الصينية. كما هددت بفرض عقوبات على البنوك الصينية التي تقدم خدمات للشركات التي تعمل كواجهات للمصالح الإيرانية.

ومع ذلك، لا تزال العقوبات تمنح الولايات المتحدة ورقة ضغط على طهران؛ فقد أدت التدابير إلى زيادة تكلفة بيع النفط الإيراني وعطلت وصول النظام إلى تلك الإيرادات. وقد عانى الاقتصاد الإيراني تحت وطأة العقوبات الأمريكية، ومن شأن أي اتفاق طويل الأمد أن يحرر مليارات الدولارات من الأصول المجمدة التي تمس حاجة النظام الإيراني إليها.

وقد أثبتت محادثات الاتفاق النووي بالفعل أنها شائكة، ولا تزال النتيجة غير مؤكدة. وقال ستيف ييتس، وهو مسؤول سابق في الأمن القومي بالبيت الأبيض: "إيران لديها القدرة على كسب الوقت، والمراوغة، وإثارة المتاعب، لكنها تدهورت بشدة على المستويين العسكري والاقتصادي".

### ميثاق إيران والصين (Iran-China Pact)
بدأت الصين في اتخاذ خطوات لاستخدام اليوان في المزيد من المعاملات المالية الدولية بعد الأزمة المالية العالمية عام 2008.

كان الفائض التجاري الذي حققته الصين على مدار سنوات يعني أنها جمعت نحو 2 تريليون دولار من الاحتياطيات الأجنبية، معظمها بالدولار الأمريكي. وكان قادة بكين يشعرون بقلق متزايد من أن مدخرات الصين باتت تحت رحمة الحكومة الأمريكية والاحتياطي الفيدرالي، الذين يمكن لقراراتهم أن تضعف قيمة حيازات الصين، أو في حالة حدوث أزمة، قد تقطع عن البلاد إمكانية الوصول إلى الدولار.

بدأت بكين في استخدام دولاراتها الفائضة لتقديم قروض في العالم النامي، مما عزز نفوذها. ثم بدأت في تقديم خطوط مبادلة مقومة باليوان عبر بنكها المركزي للبلدان المثقلة بالديون، مما جعل الصين فعلياً مُقرض الملاذ الأخير للدول الفقيرة.

ثم قدمت بكين نظام الدفع بين البنوك عبر الحدود (CIPS) في عام 2015 للمساعدة في تدويل اليوان. وبعد ثلاث سنوات، أطلقت عقود نفط مقومة باليوان يتم تداولها في شنغهاي. سمح ذلك للصين بتسوية قيمة النفط الذي تشتريه باليوان بدلاً من الدولار.

كما نجحت الصين في تشجيع الشركات العالمية، بما في ذلك البنوك الأمريكية، على إصدار سندات بعملتها.

كانت جهود الصين المتعلقة باليوان لا تزال في مهدها عندما أطلقت إدارة ترامب الأولى في عام 2018 حملة لخفض صادرات النفط الإيرانية إلى الصفر، وإجبار إيران على التفاوض بشأن برنامجها النووي ودعمها للميليشيات في جميع أنحاء الشرق الأوسط، مثل حزب الله.

انهارت مبيعات إيران مع توقف الدول عن الشراء خوفاً من العقوبات الأمريكية التي قد تحرمها من الوصول إلى الدولار. وهنا التفتت طهران نحو بكين.

وقع الجانبان ميثاقاً استراتيجياً مدته 25 عاماً في مارس 2021 لتعميق العلاقات الاقتصادية والأمنية. وأشارت مسودة نُشرت في وسائل الإعلام الإيرانية إلى أن إيران ستقايض النفط مقابل استثمارات صينية في الموانئ والسكك الحديدية والبنية التحتية الأخرى. ووصفت الشراكة بأنها حصن "ضد الضغوط غير القانونية من أطراف ثالثة"، في إشارة واضحة إلى واشنطن.

ومع ذلك، كانت بكين حذرة من أن شراء النفط الإيراني يعرض الشركات الصينية لخطر الحظر من النظام المالي الذي يقوده الدولار الأمريكي. ويقول مسؤولو وزارة الخزانة إن إيران عملت مع عملاء في الصين لإنشاء نظام سري لمشتريات النفط، مما منح بكين القدرة على الإنكار المعقول بشأن مشترياتها من النفط الخاضع للعقوبات.

وأنشأ الجيش الإيراني، بما في ذلك الحرس الثوري الإسلامي، وحدات تجارية سرية، والتي أسست بدورها مئات الشركات الوهمية للعمل مع وسطاء لبيع النفط للمصافي الصينية وإخفاء مصدر الخام. وشملت الجهود توسيع "أسطول ظل" من الناقلات لنقل النفط الخاضع للعقوبات بين إيران والصين بطرق تخفي مصدره، مثل إيقاف تشغيل أجهزة تتبع الموقع في السفن.

وعلى الرغم من أن إيران سعّرت مبيعاتها النفطية بالدولار، يقول مسؤولو وزارة الخزانة إن المعاملات مع المشترين الصينيين تمت تسويتها في الغالب باليوان. وبحلول نهاية عام 2022، أصبحت الصين شريان الحياة المالي لطهران، حيث اشترت أكثر من 90% من نفطها الخام، وفقاً لمشرعين أمريكيين.

ابتعدت كبرى شركات النفط المملوكة للدولة في الصين عن هذه التجارة بسبب خطر العقوبات الدولية، لكن الشركات الخاصة مثل "هينغلي"، التي تدير مصفاة ضخمة في شمال شرق الصين، أصبحت من كبار العملاء، حسبما أفاد مسؤولون أمريكيون.

### نظام نقل اليوان (System to Move Yuan)
قد يسمح أي اتفاق نووي جديد لإيران بالعودة إلى النظام المالي العالمي، لكن طهران كانت قد اكتشفت بالفعل طريقة لاستخدام أرباحها من اليوان في ظل العقوبات.

بدلاً من تحويل مدفوعات اليوان إلى إيران، كان مشترو النفط الصينيون يودعون الأموال لدى كيان يُعرف باسم "تشوشين" (Chuxin)، وفقاً لما أوردته صحيفة وول ستريت جورنال سابقاً. وتقوم "تشوشين" بعد ذلك بتسليم الأموال إلى المقاولين الصينيين الذين يؤدون أعمالاً هندسية في إيران في مشاريع مثل المطارات والمصافي.

وتضمنت طريقة أخرى نقل المدفوعات المقومة باليوان من المصافي الصينية من خلال "أداة ذات غرض خاص" (SPV) إلى المصدرين الصينيين، الذين يقومون بعد ذلك بنقل بضائع مثل قطع غيار السيارات إلى إيران، حسبما أفاد مسؤولون غربيون حاليون وسابقون. وأدارت شركتان تجاريتان غير معروفتين تمثلان داعمين صينيين وإيرانيين رصيد حساب الأداة ذات الغرض الخاص.

كما جربت الدولتان المقايضة المباشرة. ففي عام 2021، نجحت مدينة نينغبو الصينية في مقايضة قطع غيار سيارات صينية بقيمة مليوني دولار مقابل فستق إيراني، متجاوزة شبكة (Swift)، وفقاً لوسائل إعلام صينية.

مع ذلك، لا تزال بعض مبيعات النفط الإيراني تتم بالدولار. فقد أنشأت إيران شبكة من مكاتب الصرافة وأشباه البنوك، المعروفة باسم (الرهبر)، والتي تسيطر على شركات وهمية في هونغ كونغ والإمارات وتركيا، وفقاً لمسؤولي الخزانة الأمريكية. وتقوم هذه الشركات بفتح حسابات في بنوك صينية لدفع ثمن البضائع في الصين وأيضاً لتحويل مدفوعات النفط من اليوان إلى دولارات ويورو، والتي يمكن لإيران استخدامها حول العالم.

وعادة ما تتحرك هذه الأموال عبر مؤسسات مالية صينية صغيرة. ويساعد ذلك على حماية البنوك الصينية الكبرى، الأكثر انخراطاً في النظام المالي العالمي، من أي عقوبات إذا أثارت المعاملات أية شكوك.

ومع ذلك، فإن المبلغ الذي يتضمن الدولار صغير مقارنة بإجمالي تجارة النفط بين إيران والصين. وتقول وزارة الخزانة إن الشركات الوهمية المرتبطة بإيران نقلت ما يقرب من 4 مليارات دولار، أو حوالي 10% من مبيعات النفط الإيرانية المقدرة لعام 2024، عبر النظام المالي الأمريكي باستخدام حسابات مصرفية صينية في هونغ كونغ.

وقالت كيري بيتسوف، المسؤولة السابقة في وزارة الخزانة: "الجزء الأكبر من هذه الأموال يبقى ببساطة داخل الصين".

### إطلاق منصة (mBridge)
تأكدت أهمية اليوان بشكل أكبر بعد اندلاع الحرب في إيران. في شهر مارس، دفعت سفينة الحاويات (Newvoyager)، المملوكة لجهة صينية، رسوماً بقيمة مليوني دولار لطهران باليوان لضمان العبور الآمن عبر مضيق هرمز، وفقاً لأشخاص مشاركين في الصفقة.

كما دفعت سفن أخرى رسوماً باليوان، على الرغم من أنه من غير الواضح كيف تمت تسوية الأموال.

في وقت مبكر من النزاع، أفاد وسطاء وأصحاب سفن أن أطقم العمل اضطرت إلى إنزال صناديق نقدية من سطح السفينة إلى أفراد الحرس الثوري الإيراني عندما عبرت بالقرب من جزيرة لارك في الجزء الشمالي من مضيق هرمز. وقد أدى الحصار الأمريكي الذي فُرض في منتصف أبريل إلى توقف هذه الحركة بشكل شبه كامل، قبل أن يُرفع الأسبوع الماضي كجزء من المفاوضات الأمريكية الإيرانية.

في الإمارات العربية المتحدة، أدت وابلات من هجمات الطائرات المسيرة والصواريخ القادمة من إيران إلى زعزعة استقرار الأوضاع المالية للبلاد. نظراً لأن غالبية السكان من المولودين في الخارج، فإن النزاع يهدد بمغادرة المقيمين والمستثمرين للبلاد، وتحويل دراهمهم الإماراتية إلى دولارات، مما يقلص من احتياطيات البنك المركزي من الدولار. كما قلص النزاع من صادرات النفط المقومة بالدولار للدولة الخليجية، مما أدى إلى انخفاض تدفق الدولارات إليها.

وقد أبلغ مسؤولون إماراتيون نظراءهم الأمريكيين أنه في حال واجهت الدولة الغنية بالنفط نقصاً في الدولار، فقد تضطر إلى استخدام اليوان الصيني في مبيعات النفط والمعاملات الأخرى. ومن شأن ذلك أن يعمق العلاقة الاقتصادية المتنامية بالفعل بين أبوظبي وبكين.

وتعد الإمارات لاعباً مركزياً في منصة (mBridge) الصينية. انطلقت المنصة عام 2021 بتعاون بين بنك التسويات الدولية (BIS) ومقره سويسرا، والصين، والإمارات، وتايلاند، وهونغ كونغ. وانضمت المملكة العربية السعودية، أكبر شريك تجاري نفطي للصين، في وقت لاحق. ويستخدم النظام بعض عناصر العملات المشفرة ولكنه يخضع لسيطرة الحكومات.

تم تصميم المنصة، التي تستخدم تقنية "البلوكشين" للسماح للبنوك التجارية بنقل نسخ رقمية من اليوان والعملات الأخرى لعملائها، كوسيلة لتسوية المعاملات الدولية فورياً، وهو ما سيكون أسرع من النظام الحالي القائم على شبكة (Swift). وبدلاً من أن تقوم البنوك بتسوية المدفوعات بين شركتين أو فردين، تقوم البنوك المركزية في البلدين بتسوية المعاملة مباشرة باستخدام تقنية البلوكشين.

وقد انسحب بنك التسويات الدولية (BIS) في النهاية، بعد مناقشة روسيا لإصدار محتمل من تقنية mBridge تحت مسمى "Brics Bridge". وكان هذا الكيان، الذي لم يتم إنشاؤه بعد، سيضم دول "البريكس" (البرازيل وروسيا والهند والصين)، ويكون محصناً ضد العقوبات الغربية، على الرغم من أن بنك التسويات الدولية صرّح بأن انسحابه لم يكن لأسباب سياسية.

وفي حفل رُفعت فيه أعلام الصين والإمارات في أحد قصور أبوظبي في شهر نوفمبر، قام الشيخ منصور بن زايد آل نهيان، نائب رئيس الدولة الخليجية (التي تعد شريكاً دفاعياً رئيسياً للولايات المتحدة)، ببدء أول دفعة حكومية على الإطلاق لبكين عبر المنصة.

ولتشجيع استخدام المنصة بشكل أكبر، اتخذت بكين خطوة هامة في يناير من خلال السماح لليوان الرقمي المحتفظ به في البنوك الصينية بجني فوائد، شأنه شأن اليوان العادي. ويتيح ذلك للشركاء التجاريين الصينيين تلقي مدفوعات مقابل بضائعهم باليوان الرقمي، ومن ثم كسب الفائدة على تلك العملة الرقمية، وهو ما يحاكي آلية كسب الفوائد على احتياطيات الدولار الأمريكي عبر سندات الخزانة الأمريكية.

وشكل اليوان الرقمي نسبة 95% من الـ 4000 معاملة دفع عبر الحدود التي تمت على منصة (mBridge) حتى نوفمبر، وفقاً لبحث نُشر في مارس من قبل المجلس الأطلسي.`,
    contentEn: `The White House entered talks with Iran over a new nuclear agreement, relying on a traditional point of leverage: the promise of sanctions relief and access to some $100 billion in frozen assets.

However, this leverage is shrinking. Tehran has succeeded in weakening the impact of the U.S. sanctions campaign in recent years by successfully utilizing China's financial infrastructure—built on the yuan—which operates far beyond Washington’s reach.

This shift was vividly demonstrated in late April when the United States escalated its campaign, known as "Economic Rage," against Iran, sanctioning a major Chinese refinery it claimed purchased billions of dollars in Iranian oil. For its part, the refinery, Hengli Petrochemical, responded that its supplier had provided guarantees that the oil was not Iranian.

But the company also sent a warning to the United States, announcing that future oil purchases would be settled in yuan instead of U.S. dollars (the main currency in the energy market), making it difficult for external parties to track financial flows.

This was the latest sign of a troubling new development for Washington. More illicit activities aimed at evading sanctions around the world are now being conducted in yuan, as China builds an alternative financial system aimed at weakening Washington’s ability to dictate terms in global affairs.

Historically, the dominance of the U.S. dollar—which is currently used in about 80% of international trade finance—has given Washington a massive advantage in monitoring global business. Most international dollar transactions must be settled through U.S. banks, giving Washington the power to monitor them and cut off the dollar supply to users if necessary, which is enough to paralyze their operations entirely.

But when U.S. adversaries use the yuan to conduct their business, these transactions do not enter the U.S.-led banking system, stripping Washington of its authority.

The U.S. cleared the way for Iran to resume its oil sales and even receive payments in dollars during the negotiations. But even under U.S. sanctions aimed at banning these sales, Iran generated $43 billion in oil revenue in 2024, before factoring in unspecified discounts, according to the U.S. Energy Information Administration (EIA). The rate of these discounts varies, but averaged about 13% in 2025, according to U.S. lawmakers.

According to the U.S. Treasury Department, most of those sales were paid for in yuan.

Tehran uses these funds to buy Chinese auto parts, solar panels, and other goods and services, as well as dual-use materials—materials supposedly for civilian use but which can also be used in weapons—all outside the scope of U.S. jurisdiction.

Vessels seeking safe passage in the Strait of Hormuz during the conflict were also told they must pay Tehran in yuan or cryptocurrencies, which are also difficult for Washington to control. Treasury officials say Iranian and Chinese partners have established networks of secret intermediaries and shell companies in Hong Kong and elsewhere to facilitate more trade in yuan.

Some of these transactions are settled through China’s Cross-Border Interbank Payment System (CIPS), a yuan-denominated alternative to the Swift messaging network. Created by China in 2015, it cannot be easily monitored by the United States.

Although trading volume on this network remains small, it jumped after the conflict between the U.S. and Iran began. Trading averaged about 790 billion yuan (approx. $115 billion) daily in the three months since the end of February, according to the Atlantic Council, compared to a daily average of 680 billion yuan ($100 billion) last year.

The Belgium-based Swift network is much larger, facilitating transfers estimated at more than $5 trillion daily, including some messages that pass through the CIPS system. But the rapid expansion of CIPS activity means it is gradually turning into a more global cross-border payments system, according to the Atlantic Council.

### Russia Follows Suit
A similar pattern was repeated with Russia when its war in Ukraine began in February 2022. After the United States tightened sanctions, more of Russia's oil exports and other trade with China were settled using yuan. Total daily transactions on the CIPS system doubled, and the number of financial institutions operating on the platform more than doubled from the start of the war to mid-2025, according to Chinese central bank data.

Today, Russian officials confirm that more than 90% of trade between Russia and China is settled in yuan and Russian rubles. While the total pre-war figure is hard to determine, for comparison, the yuan was used in only 2% of Russian trade in February 2022, according to Poland's Centre for Eastern Studies.

Overall, the yuan's share in global trade finance has tripled over the past five years to reach 6% in April, according to Swift data. The yuan ranked as the second most used currency in this type of financing for most of this year, ahead of the euro and behind only the dollar.

According to Chinese central bank data, about half of China’s cross-border transactions are now denominated in its own currency, compared to a negligible percentage 15 years ago.

China is also expanding a program launched in 2021 called "mBridge," a platform that uses digital versions of the yuan and other currencies to execute cross-border payments settled between central banks without the funds passing through any U.S. financial institution.

Josh Lipsky, a former IMF official and current researcher at the Atlantic Council, says all yuan-based systems "facilitate the circumvention of U.S. sanctions. They obscure the U.S. intelligence community’s ability to see the path of financial flows."

For its part, China's Ministry of Foreign Affairs said in a statement that it was "not aware of the situation" regarding oil trade between China and Iran. It stressed that relations between the two countries "have always been conducted within the framework of international law," adding that China cooperates with countries around the world, including Russia, based on "principles of equality and mutual benefit."

China does not intend to fully replace the dollar with the yuan globally. A dramatic increase in global reliance on the yuan would require Beijing to make painful changes to its economy, such as giving up capital controls and allowing its currency to float freely, which could lead to capital flight and destabilize the country.

Instead, Beijing’s goal is to build specific trade corridors that operate outside the U.S. dollar. Former U.S. Treasury officials say this push is driven partly by Beijing’s desire to undermine U.S. authority and help its allies. China openly states it rejects sanctions imposed by the U.S.

Beijing also hopes to insulate China from the kind of economic attacks the U.S. and other Western nations have launched against Iran and Russia, which would likely be launched against Beijing if it takes any military step toward Taiwan.

The governor of the People's Bank of China, Pan Gongsheng, said in a speech last summer that global finance is evolving toward a system in which "a few sovereign currencies coexist and compete." He added that a shift from a dollar-centric world is inevitable because "in times of geopolitical tensions, national security concerns, or even wars, the dominant global currency tends to be used as a tool or weapon."

The United States is aware of the loophole opening in its global sanctions system. Since the war in Iran began, Treasury officials have stepped up efforts to limit Iranian oil sales to China and reduce funds flowing through the Chinese financial system, including issuing new sanctions on Hengli and other Chinese refineries. It has also threatened to impose sanctions on Chinese banks that service companies acting as fronts for Iranian interests.

However, sanctions still give the United States leverage over Tehran; the measures have increased the cost of selling Iranian oil and disrupted the regime’s access to those revenues. The Iranian economy has suffered under the weight of U.S. sanctions, and any long-term agreement would free up billions of dollars in frozen assets that the Iranian regime desperately needs.

The nuclear deal talks have already proven thorny, and the outcome remains uncertain. Steve Yates, a former White House national security official, said: "Iran has the ability to buy time, stall, and cause trouble, but it is severely degraded both militarily and economically."

### The Iran-China Pact
China began taking steps to use the yuan in more international financial transactions after the 2008 global financial crisis.

Years of trade surpluses meant China had accumulated some $2 trillion in foreign reserves, mostly in U.S. dollars. Leaders in Beijing were increasingly concerned that China’s savings were at the mercy of the U.S. government and the Federal Reserve, whose decisions could dilute the value of China's holdings or, in the event of a crisis, cut off the country's access to the dollar.

Beijing began using its surplus dollars to offer loans in the developing world, boosting its influence. It then began offering yuan-denominated swap lines through its central bank to highly indebted countries, effectively making China the lender of last resort for poor nations.

Beijing then introduced CIPS in 2015 to help internationalize the yuan. Three years later, it launched yuan-denominated oil contracts traded in Shanghai. This allowed China to settle the value of the oil it purchases in yuan instead of dollars.

China also successfully encouraged multinational companies, including U.S. banks, to issue bonds in its currency.

China's yuan efforts were still in their infancy when the first Trump administration in 2018 launched a campaign to reduce Iranian oil exports to zero, forcing Iran to negotiate over its nuclear program and its support for militias across the Middle East, such as Hezbollah.

Iran's sales collapsed as countries stopped buying for fear of U.S. sanctions that would deny them access to the dollar. Here, Tehran turned to Beijing.

The two sides signed a 25-year strategic pact in March 2021 to deepen economic and security ties. A draft published in Iranian media indicated that Iran would barter oil for Chinese investment in ports, railways, and other infrastructure. It described the partnership as a bulwark "against illegal pressure from third parties," a clear reference to Washington.

However, Beijing was cautious that buying Iranian oil exposed Chinese companies to the risk of being barred from the U.S. dollar-led financial system. Treasury officials say Iran worked with clients in China to set up a secret system for oil purchases, giving Beijing plausible deniability regarding its purchases of sanctioned oil.

The Iranian military, including the Islamic Revolutionary Guard Corps (IRGC), set up secret commercial units, which in turn established hundreds of front companies to work with intermediaries to sell oil to Chinese refineries and conceal the source of the crude. The efforts included expanding a "shadow fleet" of tankers to transport sanctioned oil between Iran and China in ways that hid its origin, such as turning off vessel location tracking devices.

Although Iran priced its oil sales in dollars, Treasury officials say transactions with Chinese buyers were mostly settled in yuan. By the end of 2022, China had become Tehran's financial lifeline, purchasing more than 90% of its crude oil, according to U.S. lawmakers.

China's major state-owned oil companies stayed away from this trade due to the risk of international sanctions, but private companies like Hengli, which operates a massive refinery in northeastern China, became major customers, according to U.S. officials.

### The System to Move Yuan
Any new nuclear deal might allow Iran to return to the global financial system, but Tehran had already figured out a way to use its yuan profits under sanctions.

Instead of transferring yuan payments to Iran, Chinese oil buyers would deposit the funds with an entity known as "Chuxin," as previously reported by The Wall Street Journal. Chuxin would then hand over the funds to Chinese contractors performing engineering work in Iran on projects such as airports and refineries.

Another method involved moving yuan-denominated payments from Chinese refineries through a Special Purpose Vehicle (SPV) to Chinese exporters, who would then ship goods like auto parts to Iran, current and former Western officials said. Two little-known trading companies representing Chinese and Iranian backers managed the balance of the SPV account.

The two countries also experimented with direct bartering. In 2021, the Chinese city of Ningbo successfully bartered $2 million worth of Chinese auto parts for Iranian pistachios, bypassing the Swift network, according to Chinese media.

However, some Iranian oil sales are still conducted in dollars. Iran has set up a network of exchange offices and quasi-banks, known as "Rehbar," which control front companies in Hong Kong, the UAE, and Turkey, according to U.S. Treasury officials. These companies open accounts in Chinese banks to pay for goods in China and also to convert oil payments from yuan into dollars and euros, which Iran can use around the world.

These funds typically move through small Chinese financial institutions. This helps protect major Chinese banks, which are more involved in the global financial system, from sanctions if the transactions raise any suspicion.

However, the amount involving dollars is small compared to the total oil trade between Iran and China. The Treasury Department says Iran-linked front companies moved nearly $4 billion, or about 10% of estimated 2024 Iranian oil sales, through the U.S. financial system using Chinese bank accounts in Hong Kong.

"The bulk of this money simply stays within China," said Kerry Patisov, a former Treasury official.

### Launching the mBridge Platform
The importance of the yuan was further confirmed after the outbreak of the war in Iran. In March, the container ship Newvoyager, owned by a Chinese entity, paid $2 million in fees to Tehran in yuan to ensure safe passage through the Strait of Hormuz, according to people involved in the deal.

Other ships also paid fees in yuan, though it is unclear how the funds were settled.

Early in the conflict, brokers and shipowners reported that crews had to drop boxes of cash from the ship’s deck to IRGC personnel when crossing near Larak Island in the northern part of the Strait of Hormuz. A U.S. blockade imposed in mid-April brought this movement to a near-complete halt before it was lifted last week as part of U.S.-Iranian negotiations.

In the United Arab Emirates, barrages of drone and missile attacks from Iran threatened the country’s financial stability. Because the majority of the population is foreign-born, the conflict threatened to cause residents and investors to leave the country, converting their UAE dirhams to dollars and draining the central bank’s dollar reserves. The conflict also cut the Gulf state's dollar-denominated oil exports, reducing the inflow of dollars.

UAE officials told their U.S. counterparts that if the oil-rich state faced a dollar shortage, it might be forced to use the Chinese yuan for oil sales and other transactions. This would deepen an already growing economic relationship between Abu Dhabi and Beijing.

The UAE is a central player in China's mBridge platform. The platform was launched in 2021 as a collaboration between the Switzerland-based Bank for International Settlements (BIS), China, the UAE, Thailand, and Hong Kong. Saudi Arabia, China’s largest oil trading partner, joined later. The system uses some elements of cryptocurrency but is controlled by governments.

Designed to use blockchain technology to allow commercial banks to transfer digital versions of the yuan and other currencies to their clients, the platform is intended as a way to settle international transactions instantly, which would be faster than the current Swift-based system. Instead of banks settling payments between two companies or individuals, central banks in both countries settle the transaction directly using blockchain technology.

The BIS eventually withdrew, after Russia discussed a potential version of mBridge technology called "Brics Bridge." This entity, which has not yet been created, would include the BRICS nations (Brazil, Russia, India, and China) and be immune to Western sanctions, though the BIS stated its withdrawal was not for political reasons.

At a ceremony where Chinese and UAE flags were raised in an Abu Dhabi palace in November, Sheikh Mansour bin Zayed Al Nahyan, Vice President of the Gulf state (which is a key U.S. defense partner), initiated the first-ever government payment to Beijing via the platform.

To encourage further use of the platform, Beijing took a significant step in January by allowing digital yuan held in Chinese banks to earn interest, just like regular yuan. This allows Chinese trading partners to receive payment for their goods in digital yuan and then earn interest on that digital currency, mimicking the mechanism of earning interest on U.S. dollar reserves via U.S. Treasury bonds.

The digital yuan accounted for 95% of the 4,000 cross-border payment transactions completed on the mBridge platform through November, according to research published in March by the Atlantic Council.`,
    author: {
      nameAr: 'روري جونز، أوستن رامزي، وكوستاس باريس',
      nameEn: 'Rory Jones, Austin Ramzy, and Costas Paris',
      titleAr: 'مراسلون لصحيفة وول ستريت جورنال',
      titleEn: 'Wall Street Journal Correspondents',
    },
    imageUrl: 'https://images.unsplash.com/photo-1474181487882-5abf3f016c2d?auto=format&fit=crop&q=80&w=1200',
    date: '2026-06-23',
    readTimeAr: 'دقائق 7',
    readTimeEn: '7 min read',
    isFeatured: false,
    isPremium: false,
    tags: ['الصين', 'اليوان', 'العقوبات', 'إيران', 'روسيا', 'النفط', 'China', 'Yuan', 'Sanctions', 'Iran', 'Russia', 'Oil'],
    views: 345
  },
  {
    id: 'iranian-oil-sea-accumulation-2026',
    category: 'arab-markets',
    categories: ['arab-markets', 'markets'],
    titleAr: 'مفاوضات هشة وعزوف آسيوي: نفط إيران يتراكم في البحر والأسعار تتراجع مع تدفقات "هرمز"',
    titleEn: 'Fragile Talks and Asian Reluctance: Iranian Oil Accumulates at Sea as Prices Drop with Strait of Hormuz Flows',
    summaryAr: 'على الرغم من إعلان الولايات المتحدة رفع الحصار البحري عن طهران منتصف يونيو الماضي في إطار اتفاق سلام مؤقت، تواجه إيران أزمة حقيقية في تصريف شحناتها النفطية وتتراكم ملايين البراميل في عرض البحر وسط عزوف كبار المشترين الآسيويين وترقبهم لنتائج المفاوضات غير المباشرة في قطر.',
    summaryEn: 'Despite the U.S. lifting the naval blockade on Tehran in mid-June as part of a temporary peace deal, Iran faces a real crisis in marketing its oil shipments. Millions of barrels are accumulating at sea amid reluctance from major Asian buyers awaiting the results of indirect talks in Qatar.',
    excerptAr: 'أزمة المخزن العائم الإيراني تتفاقم مع تراكم 58 مليون برميل بالبحر وعزوف الصين والهند وسط ترقب لمفاوضات الدوحة.',
    excerptEn: 'The Iranian floating storage crisis deepens with 58 million barrels stranded at sea, as China and India hold back awaiting Doha talks.',
    contentAr: `على الرغم من إعلان الولايات المتحدة رفع الحصار البحري عن طهران منتصف يونيو الماضي في إطار اتفاق سلام مؤقت، تواجه إيران أزمة حقيقية في تصريف شحناتها النفطية. وتتراكم ملايين البراميل في عرض البحر وسط عزوف كبار المشترين الآسيويين وترقبهم لنتائج المفاوضات غير المباشرة بين واشنطن وطهران في قطر، وهو ما يتزامن مع ضغوط هبوطية واضحة على أسعار النفط العالمية نتيجة لتدفق الإمدادات عبر مضيق هرمز.

### أزمة المخزون العائم: 58 مليون برميل بانتظار وجهة
تُشير بيانات شركة "فورتكسا" وحسابات "بلومبرغ" إلى أن كميات النفط الخام والمكثفات الإيرانية المخزنة على متن الناقلات في عرض البحر تجاوزت 58 مليون برميل حتى الأول من يوليو.

وتكمن الأزمة الحقيقية في التفاصيل التالية:

* **غياب الوجهة:** أكثر من 90% من هذه الشحنات تفتقر إلى وجهة محددة، حيث تُدرج الناقلات عبارات مثل "بانتظار التعليمات" أو تكتفي بتحديد "سنغافورة" كميناء تالٍ، مما يرجح اللجوء إلى عمليات نقل الشحنات من سفينة إلى أخرى في مضيق ملقا.
* **سباق مع الزمن:** تملك طهران مهلة تنتهي في منتصف أغسطس المقبل (ضمن نافذة وقف إطلاق النار الممتدة لـ 60 يوماً) للعثور على مشترين، وتأخر المبيعات يحرمها من إيرادات حيوية ويضعف موقفها التفاوضي.
* **مفارقة الشحن:** أعلنت إيران أنها شحنت أكثر من 40 مليون برميل منذ رفع الحصار الأمريكي، إلا أن بيانات شركة "كبلر" تؤكد أن أكثر من 20 مليون برميل من هذا الخام ظلت عالقة في المياه الآسيوية لمدة سبعة أيام أو أكثر، بزيادة 18% عن الأسبوع السابق.

### موقف كبار المشترين: حذر صيني وترقب هندي
يرجع تراكم الشحنات بشكل أساسي إلى إحجام القوى الاقتصادية الكبرى في آسيا عن الشراء، مدفوعاً بمخاوف جيوسياسية وتقنية:

1. **الصين (المشتري التاريخي)**
انخفضت واردات الصين من النفط الإيراني بأكثر من النصف خلال شهر يونيو على أساس شهري لتصل إلى نحو 654 ألف برميل يومياً. وتعود الأسباب إلى تراجع معدلات تشغيل المصافي الصينية المستقلة (المشتري الرئيسي سابقاً) إلى أدنى مستوى لها في 9 سنوات، بجانب امتناع المصافي الحكومية خوفاً من تعقيدات تمويل الصفقات عبر البنوك، فضلاً عن استمرار العقوبات الأوروبية والبريطانية التي تعرقل إجراءات التأمين.

2. **الهند (البحث عن ضمانات)**
رغم اللقاء الذي جمع وزيري النفط الهندي والإيراني في نيودلهي، رفضت الهند تقديم أي التزام رسمي باستئناف الاستيراد. وتفضل شركات التكرير الحكومية الهندية الانتظار لسببين:
* تأمين إمداداتها بالكامل حتى نهاية أغسطس من مصادر أخرى.
* رغبتها في الحصول على توضيحات رسمية من واشنطن بشأن آلية تنفيذ المدفوعات المقومة بالدولار الأمريكي لتجنب أي غرامات مستقبلاً.

> **تصريح:** أوضح وزير الخزانة الأمريكي، سكوت بيسنت، أن المشترين يتخوفون من إعادة فرض العقوبات سرياعاً في حال انهيار المفاوضات، مؤكداً: "لم يشترِ هذا النفط أي طرف آخر غير الصين، التي كانت تشتريه حتى عندما كان خاضعاً للعقوبات، ولذلك لا يزال يُتداول بخصم سعري".

### أسواق النفط تتراجع: تدفقات هرمز تعوض النقص
بالتوازي مع أزمة التسويق الإيرانية، شهدت أسعار النفط العالمية تراجعاً لليوم الثالث على التوالي، متأثرة بزيادة المعروض وعودة استقرار خطوط الملاحة الحيوية:

* **الأسعار الحالية:** جرى تداول خام "برنت" (تسليم سبتمبر) قرب 71 دولاراً للبرميل بعد هبوطه بأكثر من 3% في جلستين، في حين استقر خام "غرب تكساس الوسيط" قرب 68 دولاراً.
* **تدفقات مضيق هرمز:** أكد مسؤول أمريكي أن إمدادات النفط عبر المضيق تجاوزت 10 ملايين برميل يومياً، مما يثبت عدم قدرة طهران حالياً على عرقلة الشحن، ويقلص من أوراق الضغط السياسية التي تملكها.
* **البدائل والاحتياطيات:** استعادت دولة الإمارات وتيرة صادراتها لما قبل الحرب عبر مسارات بديلة وخطوط أنابيب تخفف الاعتماد على هرمز. وفي الوقت نفسه، أسهمت السحوبات المتتالية من الاحتياطيات البترولية الاستراتيجية للدول المستهلكة في كبح جماح الأسعار، على الرغم من انخفاض المخزونات الأمريكية التجارية إلى أدنى مستوياتها منذ مارس 2025 لتصل إلى 1.2 مليار برميل.

### المشهد السياسي: محادثات قطر وخطوط واشنطن الحمراء
تتجه الأنظار حالياً إلى العاصمة القطرية الدوحة، التي تحتضن جولات المفاوضات غير المباشرة بين واشنطن وطهران. ورغم إشادة الرئيس الأمريكي دونالد ترمب بالتقدم المحرز قائلاً "إننا نتفاهم جيداً"، إلا أنه جدد تأكيده الصارم على عدم السماح لإيران بامتلاك سلاح نووي كشرط أساسي لأي اتفاق دائم.

ومن المتوقع أن يتحدد موعد الاجتماع المقبل في قطر فور الانتهاء من مراسم تشييع المرشد السابق لإيران علي خامنئي (والذي قُتل في ضربة جوية مع بداية الصراع)، والمقرر أن تبدأ في 4 يوليو وتستمر لعدة أيام، لتظل الأسواق النفطية والسياسية في حالة ترقب شديد لما ستسفر عنه هذه النافذة الزمنية الحرجة.`,
    contentEn: `Despite the United States announcing the lifting of the naval blockade on Tehran in mid-June as part of a temporary peace agreement, Iran faces a real crisis in unloading and selling its oil shipments. Millions of barrels are accumulating at sea amid reluctance from major Asian buyers who are waiting for the results of the indirect talks between Washington and Tehran in Qatar. This situation coincides with clear downward pressure on global oil prices due to the continuous flow of supplies through the Strait of Hormuz.

### Floating Inventory Crisis: 58 Million Barrels Awaiting Destination
Data from Vortexa and Bloomberg calculations indicate that the volumes of Iranian crude oil and condensates stored on tankers in the open sea exceeded 58 million barrels as of July 1st.

The real crisis lies in the following details:

* **No Destination:** More than 90% of these shipments lack a designated destination. Tankers list terms like "awaiting instructions" or simply specify "Singapore" as the next port of call, making it highly likely they will resort to ship-to-ship (STS) transfers in the Malacca Strait.
* **Race Against Time:** Tehran has a deadline ending in mid-August (within the 60-day ceasefire window) to find buyers. Delayed sales deprive it of vital revenues and weaken its negotiating stance.
* **Shipping Paradox:** Although Iran announced it shipped over 40 million barrels since the lifting of the US blockade, Kepler data confirms that more than 20 million barrels of this crude remained stranded in Asian waters for seven days or more—an 18% increase from the previous week.

### Major Buyers: Chinese Caution and Indian Anticipation
The accumulation of shipments is primarily driven by major Asian economic powers refraining from purchasing, due to geopolitical and technical concerns:

1. **China (The Historical Buyer)**
China's imports of Iranian oil dropped by more than half in June on a monthly basis to around 654,000 barrels per day. The reasons include independent Chinese refineries (the primary buyers previously) dropping operating rates to their lowest in 9 years, state-owned refineries refraining due to complex banking transaction complications, and ongoing European and British sanctions hampering insurance procedures.

2. **India (Seeking Guarantees)**
Despite a meeting between Indian and Iranian oil ministers in New Delhi, India refused to provide any official commitment to resume imports. Indian state refiners prefer to wait for two main reasons:
* Securing all their supply needs through the end of August from alternative sources.
* Seeking official clarifications from Washington regarding the payment mechanism denominated in US dollars to avoid any future penalties.

> **Statement:** US Treasury Secretary Scott Bessent pointed out that buyers fear rapid snapback of sanctions if talks collapse, stating: "No party other than China has bought this oil, which bought it even when under sanctions, which is why it continues to trade at a discount."

### Oil Markets Decline: Hormuz Flows Offset the Shortage
In parallel with the Iranian marketing crisis, global oil prices experienced a decline for the third consecutive day, influenced by rising supply and stabilized navigation lines:

* **Current Prices:** Brent crude (September delivery) was traded near $71 per barrel after dropping by more than 3% in two sessions, while WTI settled near $68.
* **Strait of Hormuz Flows:** A US official confirmed that oil supplies through the Strait exceeded 10 million barrels per day, demonstrating Tehran's current inability to disrupt shipping and diminishing its political leverage.
* **Alternatives and Reserves:** The UAE restored its pre-war export pace through alternative routes and pipelines, bypassing reliance on Hormuz. At the same time, successive releases from strategic petroleum reserves of consuming countries helped curb price spikes, even as US commercial inventories fell to their lowest since March 2025 at 1.2 billion barrels.

### Political Scene: Qatar Talks and Washington's Red Lines
All eyes are currently on Doha, Qatar, which hosts indirect negotiations between Washington and Tehran. Although US President Donald Trump praised the progress, saying "we are getting along well," he reiterated that Iran will never be allowed to acquire a nuclear weapon as a core condition for any permanent agreement.

The next meeting in Qatar is expected to be scheduled immediately after the funeral of former Iranian Supreme Leader Ali Khamenei (who was killed in an airstrike at the onset of the conflict), which starts on July 4th and will last for several days, leaving oil and political markets in deep anticipation.`,
    author: {
      nameAr: 'إدارة التحرير الاستقصائي',
      nameEn: 'Investigative Editorial Desk',
      titleAr: 'موفد الشؤون الاقتصادية والنفط',
      titleEn: 'Economic & Oil Correspondent',
    },
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
    date: '2026-07-02',
    readTimeAr: 'دقائق 5',
    readTimeEn: '5 min read',
    isFeatured: true,
    isPremium: false,
    tags: ['إيران', 'النفط', 'الصين', 'الهند', 'مضيق هرمز', 'برنت', 'مفاوضات قطر', 'Iran', 'Oil', 'China', 'India', 'Strait of Hormuz', 'Brent', 'Qatar Talks'],
    views: 412
  },
  {
    id: 'arab-markets-macro-risk-map-2026',
    category: 'arab-markets',
    categories: ['arab-markets', 'markets'],
    titleAr: 'التحليل الكلي: الأسواق تعيد رسم خريطة المخاطر',
    titleEn: 'Macro Analysis: Markets Redraw the Risk Map',
    summaryAr: 'شهدت الأسواق الخليجية والعربية موجة جني أرباح وتعديلات هيكلية تزامناً مع تراجع أسعار النفط والذهب وانحسار علاوة المخاطر الجيوسياسية بفعل التفاهمات الأخيرة.',
    summaryEn: 'Gulf and Arab markets experienced profit-taking and structural rebalancing alongside falling oil and gold prices as geopolitical risk premiums declined.',
    contentAr: `شهدت أسعار النفط تراجعاً ملحوظاً لتمتد خسائرها الأخيرة، حيث كسر خام برنت حاجز 77 دولاراً (ليتداول بالقرب من 76.30 دولار للبرميل)، وتراجع خام غرب تكساس الوسيط إلى مستويات 72.40 دولار.

* **عودة الإمدادات وهندسة التحالفات:** العامل الأبرز وراء هذا التراجع هو التقدم الملموس في التفاهمات الأمريكية-الإيرانية. إقرار إعفاء أمريكي لمدة 60 يوماً يسمح للمشترين العالميين بشراء النفط الإيراني ساهم في تهدئة مخاوف نقص الإمدادات.
* **حركة الملاحة الخليجية:** هناك انتعاش واضح في حركة الناقلات عبر مضيق هرمز مع انحسار التوترات وحصول السفن على ضمانات أمنية. بالتوازي، تشير التقديرات إلى أن الإمارات استعادت حوالي 85% من مستويات تصدير النفط ما قبل الأزمة عبر الاستفادة الناجحة من خطوط الأنابيب والمسارات البديلة وتخطي الاختناقات.
* **تعقيدات قادمة:** رغم هذه التهدئة، تبرز في الأفق محادثات إيرانية-عمانية حول وضع إطار عمل مشترك لإدارة العبور في المضيق قد يشمل فرض رسوم، وهو ما ترفضه واشنطن، مما قد يخلق ديناميكيات تسعير واحتكاكات جديدة مستقبلاً.

### الذهب: فقدان بريق الملاذ الآمن
تخلى المعدن الأصفر عن مكاسبه بشكل حاد، حيث انزلق تحت مستوى 4,070 دولاراً للأوقية، مواصلاً مساره التنازلي.

* **انحسار علاوة المخاطر الجيوسياسية:** مع التقدم في المفاوضات الإقليمية، وبدء تبلور ملامح تهدئة ومشاريع تسوية على الجبهة اللبنانية والحدود الجنوبية، تراجع اندفاع المستثمرين نحو الذهب كأداة تحوط ضد الحروب.
* **الضغط النقدي المستمر:** قوة الدولار الأمريكي واستمرار مجلس الاحتياطي الفيدرالي في سياسته المتشددة للحفاظ على معدلات فائدة مرتفعة لفترة أطول، يضغطان بقوة على الأصول التي لا تدر عائداً.

### أسواق المال العربية: ضغوط فنية وعزوف عن المخاطرة
تأثرت الأسواق الخليجية والعربية بموجة جني أرباح وتعديلات هيكلية، متزامنة مع تراجع شهية المخاطرة عالمياً:

* **أسواق الخليج والإمارات:** شهدت الأسواق عمليات بيع ملحوظة، مدفوعة بشكل أساسي بضغوط فنية تتعلق بتعديلات الأوزان في المؤشرات العالمية (Index exclusions). أثر هذا على تسعير السندات السيادية وشبه السيادية، حيث شهدت بعض الإصدارات (مثل ADGB و MUBAUH) اتساعاً في هوامش العوائد نتيجة لعمليات تسييل من قبل صناديق المؤشرات.
* **المشهد الإقليمي:** تراجعت معظم المؤشرات العربية (بما فيها السوق المصري الذي شهد تراجعات في عدة أسهم قيادية)، متأثرة بحالة العزوف عن المخاطرة (Risk-off) التي تسيطر على الأسواق العالمية، لا سيما مع التراجعات الحادة في قطاع التكنولوجيا الأمريكي.

### الخلاصة والآفاق
الأسواق اليوم تسعر الانتقال من مرحلة التقلب والغموض الشديد إلى مرحلة "تطبيع" تدريجي لسلاسل التوريد. التفاهمات المالية والسياسية بين واشنطن وطهران، وانعكاساتها المباشرة على أمن الممرات المائية الاستراتيجية وتدفقات الطاقة، تعيد هيكلة نماذج المخاطر السيادية في الشرق الأوسط.

انخفاض أسعار النفط بقرابة 40% من ذروتها خلال الأزمة يعكس ثقة متزايدة في مرونة الإمدادات الخليجية وقدرتها على امتصاص الصدمات. ومع ذلك، فإن استدامة هذا الاستقرار الماكرو-اقتصادي لا تزال هشة، وتعتمد كلياً على نجاح مسارات الدبلوماسية المعقدة في تحويل التفاهمات المؤقتة إلى أطر مستدامة.`,
    contentEn: `Oil prices have dropped significantly, extending recent losses as Brent crude fell below $77 (trading near $76.30 per barrel), and West Texas Intermediate (WTI) fell to around $72.40.

* **Return of Supplies & Alliance Engineering:** The primary factor behind this decline is tangible progress in U.S.-Iranian understandings. A 60-day U.S. waiver allowing global buyers to purchase Iranian crude has calmed supply shortage fears.
* **Gulf Maritime Traffic:** There is a clear recovery in tanker traffic through the Strait of Hormuz as tensions ease and ships receive security guarantees. Simultaneously, estimates indicate that the UAE has restored about 85% of its pre-crisis oil export levels by successfully leveraging pipelines and alternative routes to bypass choke points.
* **Upcoming Complications:** Despite this calm, Iranian-Omani talks are emerging on the horizon regarding a joint framework to manage transit in the Strait, which may include transit fees opposed by Washington, potentially creating new pricing dynamics and friction.

### Gold: Safe Haven Loses Its Luster
The yellow metal surrendered its gains sharply, slipping below $4,070 per ounce and continuing its downward trajectory.

* **Easing Geopolitical Risk Premium:** With progress in regional negotiations and the beginning of a truce and settlement blueprint on the Lebanese front and the southern border, investor interest in gold as a war hedge has subsided.
* **Persistent Monetary Pressure:** A strong U.S. dollar and the Federal Reserve's hawkish stance of keeping interest rates higher for longer continue to weigh heavily on non-yielding assets.

### Arab Capital Markets: Technical Pressures and Risk Aversion
Gulf and Arab stock markets were hit by profit-taking and structural rebalancing, coinciding with declining global risk appetite:

* **Gulf & UAE Markets:** Markets saw noticeable selling pressure, mainly driven by technical factors related to index exclusions in global benchmarks. This impacted the pricing of sovereign and quasi-sovereign bonds, where some issuances (like ADGB and MUBAUH) saw yield spreads widen due to index fund liquidations.
* **Regional Landscape:** Most Arab indices declined (including the Egyptian market, which saw drops in several blue-chip stocks), affected by the risk-off sentiment dominating global markets, particularly with sharp declines in the U.S. tech sector.

### Summary & Outlook
Markets today are pricing in a transition from extreme volatility and uncertainty to a gradual "normalization" of supply chains. The financial and political understandings between Washington and Tehran, and their direct implications for the security of strategic waterways and energy flows, are restructuring sovereign risk models in the Middle East.

The drop in oil prices by nearly 40% from their crisis peak reflects growing confidence in the resilience of Gulf supplies and their ability to absorb shocks. However, the sustainability of this macroeconomic stability remains fragile, depending entirely on the success of complex diplomatic tracks in turning temporary understandings into sustainable frameworks.`,
    author: {
      nameAr: 'معن برزي',
      nameEn: 'Maan Barazy',
      titleAr: 'رئيس تحرير شؤون الأسواق',
      titleEn: 'Markets Editor-in-Chief',
    },
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    date: '2026-06-24',
    readTimeAr: 'دقائق 4',
    readTimeEn: '4 min read',
    isFeatured: true,
    isPremium: false,
    tags: ['النفط', 'الذهب', 'الأسواق العربية', 'مضيق هرمز', 'أسواق المال', 'Oil', 'Gold', 'Arab Markets', 'Strait of Hormuz'],
    views: 142
  },
  {
    id: 'lebanon-military-al-tahir-2026',
    category: 'lebanon',
    categories: ['lebanon', 'exclusives'],
    titleAr: 'العمليات البرية في "علي الطاهر" وانتشار الجيش اللبناني يترنحان على حبل الهدنة المطولة: فهل ينسحب جيش الاحتلال قريباً؟',
    titleEn: 'Ground Operations on "Ali Al-Taher" and the Lebanese Army Deployment Teeter on the Tightrope of a Prolonged Truce: Will the Occupation Army Withdraw Soon?',
    summaryAr: 'تواصل الدبلوماسية محاولاتها لترسيخ التهدئة في واشنطن، بينما لا يزال التوتر يحكم الميدان في جنوب لبنان مع استمرار المفاوضات الشاقة حول مصير منطقة "علي الطاهر" الاستراتيجية وشروط الانسحاب الإسرائيلي.',
    summaryEn: 'As diplomacy seeks to cement a truce in Washington, tensions continue to dominate the ground in Southern Lebanon amidst tough negotiations over the strategic "Ali Al-Taher" region and conditions of Israeli withdrawal.',
    contentAr: `فيما تواصل الدبلوماسية محاولاتها الحثيثة في أروقة واشنطن لترسيخ التهدئة، لا يزال التوتر السمة الأبرز التي تحكم الميدان في الجنوب اللبناني. ليل أمس، تقدمت قوات جيش الاحتلال الإسرائيلي نحو البلدات الواقعة في خراج النبطية، وسط دوي إطلاق نار لم يهدأ طوال الليل. وما يزيد من خطورة هذا المشهد هو تزامن هذه التطورات الميدانية مع بدء عودة المواطنين إلى منازلهم، مما يضع أرواحهم في دائرة الخطر المباشر.

وفي سياق متصل، علمت "الوراق نيوز" أن مفاوضات شاقة ومعقدة لا تزال جارية حول مصير منطقة "علي الطاهر". وتتقاطع التقارير الميدانية المتضاربة لتؤكد أن المئات من مقاتلي حزب الله لا يزالون عالقين في تلك النقطة، إلى جانب جثث عشرات الجنود الإسرائيليين، ما حوّل المنطقة فعلياً إلى "أرض حرام" (No Man's Land). يحدث هذا في وقت تتصاعد فيه الضغوط الدولية المطالبة بانسحاب إسرائيلي كامل وفوري من الجنوب، وفتح المجال أمام وحدات الجيش اللبناني للانتشار الشامل هناك.

### الساحة اللبنانية وشروط الاحتلال
مع انطلاق الجولة الخامسة من مفاوضات واشنطن أمس، بدت الساحة اللبنانية أمام اختبار شديد الحساسية، في ظل انطباع متزايد بأن أطرافاً داخل «سلطة الوصاية» تدفع نحو تبني مواقف تنسجم مع استراتيجية العدو بربط أي انسحاب بخطوات تتعلق بنزع سلاح المقاومة، الأمر الذي يؤدي عملياً إلى توفير غطاء لاستمرار الاحتلال ودفع البلاد نحو مواجهة داخلية بالغة الخطورة. وهذا ما انعكس عملياً في التوجيهات التي حملها الوفد إلى المفاوضات، ولا سيما في ما يتعلق بالموافقة على «المناطق التجريبية» التي تريدها إسرائيل وفق قواعد أساسية كالآتي:

* **أولاً:** على السلطة اللبنانية تكليف الجيش اللبناني السيطرة على منطقة علي الطاهر، وإخراج مقاتلي حزب الله منها، وتدمير المنشآت القائمة فيها. وأن يحصل ذلك بإشراف أميركي مباشر. وبعد التأكد من تنفيذ المطلوب، تنسحب قوات الاحتلال من منطقتي زوطر وكفرتبنيت، على أن يعقب ذلك تنفيذ إجراءات مماثلة على نطاق أوسع، قبل أي تراجع إسرائيلي إضافي إلى جنوب نهر الليطاني.
* **ثانياً:** في ما يتعلق بملف الأسرى، تريد إسرائيل استكمال ما تعتبره مهمة قديمة تعود إلى أكثر من عشرين عاماً، وتتعلق بكشف مصير الطيار الإسرائيلي رون أراد، وتطرح معادلة تقوم على تسليم رفاته قبل الإفراج عن الأسرى.
* **ثالثاً:** تتمسك إسرائيل بالإبقاء على ما تسميه «المنطقة الأمنية»، وتسعى إلى فرض خط حدودي جديد عند نطاقها، مع منع أي اقتراب منها، سواء من المدنيين أو العسكريين، واعتبارها منطقة تهديد وشيك، وبالتالي "منطقة قتل".
* **رابعاً:** تشترط إسرائيل أن يجري تنفيذ هذه الترتيبات عبر تنسيق مباشر ومن دون وسطاء بين الجيش اللبناني وقوات الاحتلال الموجودة داخل الأراضي اللبنانية، مع تقييد حركة الجيش اللبناني ميدانياً وربطها بهذا التنسيق المسبق.

### أميركا تحابي إسرائيل
وفي هذا السياق، كان لافتاً أمس الاتصال المشترك الذي أجراه نائب الرئيس الأميركي جي دي فانس ووزير الخارجية ماركو روبيو مع رئيس الجمهورية جوزيف عون، وشددا خلاله على «دعم الولايات المتحدة لتوجهات الدولة اللبنانية»، وأبلغا عون أن الآلية التي جرى التفاهم بشأنها مع إيران وقطر لا تزال قيد الدرس ولم تُحسم صيغتها النهائية بعد.

> أطراف في «سلطة الوصاية» تدفع نحو تبني مواقف تنسجم مع استراتيجية العدو بربط أي انسحاب بنزع السلاح.

وتزامن الاتصال مع معلومات نشرتها صحيفة «إسرائيل هيوم» حول «تباينات جدية داخل إدارة دونالد ترامب بشأن الملف اللبناني وانعكاسات التفاهمات الإقليمية الأخيرة». ونقلت الصحيفة أن وزارة الخارجية «تعارض بشدة فكرة إنشاء خلية الوساطة الإقليمية التي طُرحت عقب اجتماعات سويسرا، وتعتبر أن هذه الصيغة قد تتيح لطهران هامش تأثير إضافياً على مسار التفاوض بين لبنان وإسرائيل».

في المقابل، تشير المعطيات إلى أن الفريق المحيط بنائب الرئيس أبدى مرونة أكبر تجاه المبادرة، بعدما نجحت الدوحة في تسويقها باعتبارها جزءاً من ترتيبات أوسع لتنفيذ مذكرة التفاهم بين واشنطن وطهران. فيما نُقل عن روبيو قوله: «طالما أن حزب الله والجماعات الموالية له موجودة في المنطقة، فإن الحديث عن وقف إطلاق نار شامل ليس واقعياً».

### إسرائيل تختبر بالنار
وسط هذه الأجواء، لجأ العدو إلى اختبار نوايا واشنطن عبر ارتكاب جريمة جديدة، تمثّلت في إطلاق النار بواسطة قواته على الأرض وطائرات مسيّرة، ما أدى إلى سقوط شهداء وجرحى. وقالت مصادر مطلعة إن العدو «يستفيد من هذا التباين لمواصلة عملياته، إذ إن الميدان لا يعكس أي مؤشرات فعلية على التهدئة». وترافق الخرق مع رسالة سياسية-أمنية مباشرة حملها بيان مشترك لنتنياهو ووزير الحرب يسرائيل كاتس، أكدا فيه أن «الجيش الإسرائيلي سيواصل استهداف أي تهديد يراه قائماً داخل الأراضي اللبنانية، وأن قواعد العمل الممنوحة للقوات المنتشرة على الجبهة الشمالية لم يطرأ عليها أي تغيير».

### الجولة الخامسة والمسارات المعقدة
من هنا تبرز مخاوف من أن يكون ما يجري جزءاً من مناورة سياسية وأمنية أوسع يقودها نتنياهو بالتزامن مع انطلاق جولة واشنطن الخامسة، تقوم على تمرير المرحلة الحالية بأقل قدر ممكن من الاحتكاك مع الإدارة الأميركية، من دون التخلي عن هدف استراتيجي يتمثل في فصل جبهة الجنوب عن المظلات الإقليمية والدولية التي تحاول ربطها بمسار التسويات الجاري العمل عليه.

أما الوفد اللبناني، فقد دخل المفاوضات انطلاقاً من أولويات محددة تتعلق بـ:
* تثبيت وقف إطلاق النار.
* وقف الخروقات الإسرائيلية.
* استكمال الانسحاب من الأراضي اللبنانية.
* تعزيز انتشار الجيش.
* معالجة ملف الأسرى.

في وقت تواصل فيه إسرائيل طرح مقاربات تقوم على انسحابات جزئية ومشروطة، وربط أي خطوات إضافية بتقييمها لأداء الدولة اللبنانية في الجنوب.

وعكس السفير الإسرائيلي في واشنطن أجواء الانقسام القائم، إذ حذّر بعد الجلسة الأولى من أن «مسار المفاوضات ينحرف، إذ تحوّل إلى آلية لمنع التصادم بدلاً من التركيز على سلاح حزب الله». كذلك أفادت معلومات بأن اجتماعات الجولة الخامسة ناقشت مسودة إعلان نيات تشمل الجوانب السياسية والأمنية والعسكرية، على أن تُستكمل المباحثات على مدى الأيام الثلاثة المقبلة. وأوضحت أن الاجتماع بدأ بصيغة مشتركة، دبلوماسية وعسكرية، قبل أن ينفصل الوفدان إلى اجتماعين، أحدهما عسكري والآخر دبلوماسي.

في المقابل، كشفت القناة 14 العبرية أمس أن التعليمات الخاصة بإطلاق النار في لبنان، بعد التنسيق بين المستويين السياسي والعسكري، تنص على السماح بإطلاق النار من الأرض نحو المناطق والمحاور المشبوهة، وأن أي عنصر يُرصد ضمن «الخط الأصفر» يُستهدف فوراً حتى من دون أن يشكّل خطراً داهماً، فيما يُسمح بإطلاق نار فوري عند رصد خطر واضح، مثل خلايا الصواريخ أو المسيّرات، على أن تبقى التهديدات غير الفورية خارج دائرة الاستهداف. كما أصبحت صلاحية المصادقة على القصف الجوي بيد قائد الفرقة بدلاً من قائد المنطقة.`,
    contentEn: `While diplomacy continues its strenuous efforts in Washington corridors to solidify the truce, tension remains the most prominent feature dominating the ground in southern Lebanon. Last night, Israeli occupation forces advanced towards towns in the Nabatiyeh district, amidst continuous gunfire that echoed all night. Adding to the gravity of this scene is the synchronization of these field developments with the beginning of the citizens' return to their homes, placing their lives in direct danger.

In a related context, "Al-Warraq News" learned that tough and complex negotiations are still underway regarding the fate of the "Ali Al-Taher" region. Conflicting field reports intersect to confirm that hundreds of Hezbollah fighters are still trapped at that point, alongside the bodies of dozens of Israeli soldiers, effectively turning the region into a "No Man's Land." This occurs at a time when international pressures are escalating to demand a complete and immediate Israeli withdrawal from the South, paving the way for Lebanese Army units for comprehensive deployment.

### The Lebanese Scene and Occupation Conditions
With the launch of the fifth round of negotiations in Washington yesterday, the Lebanese scene appeared to be facing an extremely sensitive test, amid a growing impression that parties within the "tutelary authority" are pushing towards positions that align with the enemy's strategy of linking any withdrawal to steps concerning disarming the resistance. This practically provides a cover for continuing the occupation and pushing the country towards a highly dangerous internal confrontation. This was reflected in the instructions carried by the delegation to the negotiations, particularly regarding the approval of "pilot zones" that Israel wants according to basic rules as follows:

* **First:** The Lebanese authority must task the Lebanese Army to seize control of the Ali Al-Taher region, expel Hezbollah fighters, and destroy existing installations there under direct American supervision. Once execution is verified, the occupation forces will withdraw from Zoutar and Kfar Tibnit, with similar measures executed on a wider scale prior to any additional Israeli pullback south of the Litani River.
* **Second:** Regarding the prisoners' file, Israel wants to complete what it considers an old mission dating back more than twenty years, relating to uncovering the fate of the Israeli pilot Ron Arad, proposing a formula based on handing over his remains before releasing prisoners.
* **Third:** Israel adheres to keeping what it calls the "security zone", seeking to impose a new boundary line, while preventing any approach to it from both civilians and military personnel, treating it as an imminent threat zone, and therefore a "kill zone".
* **Fourth:** Israel stipulates that these arrangements be implemented through direct coordination without intermediaries between the Lebanese Army and the occupation forces inside Lebanese territory, while restricting the field movement of the Lebanese Army and linking it to this prior coordination.

### America Favors Israel
In this context, a joint call yesterday by US Vice President JD Vance and Secretary of State Marco Rubio with President Joseph Aoun was notable. They emphasized "US support for the directions of the Lebanese state" and informed Aoun that the mechanism agreed upon with Iran and Qatar is still under study and its final form has not been finalized yet.

> Some factions within the "tutelary authority" are pushing to adopt stances that align with the enemy's strategy of linking any withdrawal to disarmament.

The call coincided with information published by "Israel Hayom" newspaper about "serious differences within Donald Trump's administration regarding the Lebanese file and the implications of recent regional understandings." The newspaper reported that the State Department "strongly opposes the idea of establishing the regional mediation cell proposed after the Switzerland meetings, and considers that this formula may allow Tehran an additional margin of influence on the course of negotiations between Lebanon and Israel."

Conversely, indications suggest that the team surrounding the Vice President showed greater flexibility towards the initiative, after Doha successfully marketed it as part of broader arrangements to implement the memorandum of understanding between Washington and Tehran. Meanwhile, Rubio was quoted as saying: "As long as Hezbollah and its loyal groups are present in the region, talking about a comprehensive ceasefire is not realistic."

### Israel Tests with Fire
Amid these atmospheres, the enemy resorted to testing Washington's intentions by committing a new crime, represented in opening fire by its ground forces and drones, leading to casualties. Well-informed sources said the enemy "benefits from this divergence to continue operations, as the field does not reflect any actual indicators of calm." The violation was accompanied by a direct political-security message carried by a joint statement from Netanyahu and War Minister Yisrael Katz, in which they stressed that "the Israeli army will continue to target any threat it deems active inside Lebanese territory, and that the rules of engagement granted to forces deployed on the northern front have not undergone any change."

### Fifth Round and Complicated Paths
Hence, fears emerge that what is happening is part of a broader political and security maneuver led by Netanyahu in conjunction with the launch of the fifth Washington round, based on passing the current phase with the least possible friction with the US administration, without abandoning a strategic goal of decoupling the southern front from the regional and international umbrellas trying to link it to the ongoing settlement process.

As for the Lebanese delegation, it entered the negotiations based on specific priorities related to:
* Stabilizing the ceasefire.
* Stopping Israeli violations.
* Completing the withdrawal from Lebanese lands.
* Strengthening army deployment.
* Addressing the prisoners' file.

Meanwhile, Israel continues to propose approaches based on partial and conditional withdrawals, linking any additional steps to its assessment of the performance of the Lebanese state in the South.

The Israeli ambassador in Washington reflected the existing division, warning after the first session that "the course of negotiations is drifting, turning into a de-confliction mechanism instead of focusing on Hezbollah's weapons." Furthermore, information indicated that the fifth round meetings discussed a draft declaration of intent covering political, security, and military aspects, with talks to be completed over the next three days. It explained that the meeting began in a joint diplomatic and military format before dividing into two separate meetings.

On the other hand, the Hebrew Channel 14 revealed yesterday that the rules of engagement in Lebanon, after coordination between the political and military levels, allow opening fire from the ground towards suspicious areas and corridors, and that any element spotted within the "yellow line" is immediately targeted even without posing an imminent danger, while immediate firing is allowed when a clear danger is detected, such as missile or drone cells, with non-immediate threats remaining outside the scope of targeting. Also, the authority to approve airstrikes has been transferred to the division commander instead of the regional commander.`,
    author: {
      nameAr: 'معن برازي',
      nameEn: 'Maan Barazy',
      titleAr: 'رئيس التحرير والمدير العام',
      titleEn: 'Editor-in-Chief & General Manager',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
    },
    imageUrl: 'https://images.unsplash.com/photo-1507682531662-421b17ac4f83?auto=format&fit=crop&q=80&w=1200',
    date: '23 يونيو 2026',
    readTimeAr: '8 دقائق قراءة',
    readTimeEn: '8 min read',
    isFeatured: true,
    views: 9240,
    tags: ['الجنوب', 'علي الطاهر', 'الجيش اللبناني', 'الهدنة', 'مفاوضات واشنطن', 'الميدان']
  },
  {
    id: 'fatf-grey-list-lebanon-2026',
    category: 'exclusives',
    titleAr: 'مجموعة العمل المالي (FATF) تُبقي لبنان على "القائمة الرمادية" لمكافحة غسل الأموال وتمويل الإرهاب',
    titleEn: 'FATF Keeps Lebanon on the "Grey List" for Anti-Money Laundering and Combating Terrorism Financing',
    summaryAr: 'أعلنت مجموعة العمل المالي (FATF) في ١٩ يونيو ٢٠٢٦ إبقاء لبنان على قائمة الدول الخاضعة لمراقبة متزايدة (القائمة الرمادية) مع تراجع تصنيفه في مؤشر بازل لمذيع غسل الأموال لعام ٢٠٢٥.',
    summaryEn: 'The Financial Action Task Force (FATF) has decided to keep Lebanon on its "Grey List" of jurisdictions under increased monitoring, as the country slips in global and regional rankings of the 2025 Basel AML Index.',
    contentAr: `أعلنت مجموعة العمل المالي (FATF)، وهي الهيئة العالمية المعنية بوضع معايير مكافحة غسل الأموال وتمويل الإرهاب (AML/CFT)، في 19 يونيو 2026 إبقاء لبنان على قائمة "الولايات القضائية الخاضعة لرقابة متزايدة"، أو ما يُعرف بـ "القائمة الرمادية". ويأتي هذا القرار تماشياً مع قراراتها المماثلة الصادرة في فبراير، يونيو، وأكتوبر 2025، وكذلك في فبراير 2026.

كانت المنظمة قد أدرجت لبنان في هذه القائمة في أكتوبر 2024، موضحةً حينها أن الولايات القضائية الخاضعة لرقابة متزايدة تعمل بنشاط مع مجموعة (FATF) لمعالجة أوجه القصور الاستراتيجية في أنظمتها المتعلقة بمكافحة غسل الأموال (ML)، وتمويل الإرهاب (TF)، وتمويل انتشار التسلح. وأضافت أن إدراج أي ولاية قضائية تحت المراقبة المتزايدة يعني التزام تلك الدولة بمعالجة أوجه القصور الاستراتيجية المحددة بسرعة وضمن أطر زمنية متفق عليها.

### خطة العمل المكونة من 10 التزامات
أشارت المجموعة إلى أنه في أكتوبر 2024، قدم لبنان التزاماً سياسياً رفيع المستوى للعمل مع مجموعة (FATF) ومجموعتها الإقليمية في الشرق الأوسط وشمال أفريقيا (MENAFATF) لتعزيز فعالية نظام مكافحة غسل الأموال وتمويل الإرهاب لديه، وذلك على الرغم من الظروف الاجتماعية الاقتصادية والأمنية الصعبة التي تمر بها البلاد. وبناءً على ذلك، دعت السلطات اللبنانية إلى مواصلة العمل على تنفيذ خطة عملها من خلال الخطوات العشر التالية:

1. **إجراء تقييمات للمخاطر:** تقييم المخاطر المحددة لغسل الأموال وتمويل الإرهاب التي تم تحديدها في تقرير التقييم المتبادل (MER) الصادر في مايو 2023، وضمان وجود سياسات وتدابير للتخفيف من هذه المخاطر.
2. **التعاون القانوني والمصادرة:** تحسين الآليات لضمان التنفيذ السريع والفعال لطلبات المساعدة القانونية المتبادلة، تسليم المجرمين، واسترداد الأصول.
3. **المهن غير المالية:** تعزيز فهم المخاطر من قِبل "الأعمال والمهن غير المالية المحددة" (DNFBPs)، وتطبيق عقوبات فعالة ورادعة ومتناسبة على انتهاكات التزامات مكافحة غسل الأموال وتمويل الإرهاب.
4. **المستفيد الحقيقي:** التأكد من أن المعلومات المتعلقة بـ "المستفيد الحقيقي" (Beneficial Ownership) مُحدثة، ووجود عقوبات مناسبة وتدابير لتخفيف المخاطر بالنسبة للأشخاص الاعتباريين.
5. **الاستخبارات المالية:** تعزيز استخدام السلطات المختصة لمنتجات "وحدة الاستخبارات المالية" (FIU) والمعلومات الاستخباراتية المالية.
6. **التحقيقات والمحاكمات:** إظهار زيادة مستدامة في التحقيقات، الملاحقات القضائية، والأحكام الصادرة في قضايا غسل الأموال بما يتماشى مع مستوى المخاطر.
7. **التهريب عبر الحدود:** تحسين نهج السلطات في استرداد الأصول، وتحديد ومصادرة الحركات غير المشروعة للأموال والمعادن والأحجار الكريمة عبر الحدود.
8. **مكافحة تمويل الإرهاب:** مواصلة التحقيقات في قضايا تمويل الإرهاب، ومشاركة المعلومات مع الشركاء الأجانب المتعلقة بهذه التحقيقات كما هو موضح في تقرير (MER).
9. **العقوبات المالية المستهدفة:** تعزيز التنفيذ الفوري للعقوبات المالية المستهدفة، لا سيما في "الأعمال والمهن غير المالية المحددة" وبعض المؤسسات المالية غير المصرفية.
10. **المنظمات غير الربحية:** تنفيذ رقابة موجهة وقائمة على المخاطر للمنظمات غير الربحية (NPOs) عالية المخاطر، دون تعطيل أو إعاقة أنشطة المنظمات المشروعة.

### تصنيف لبنان في مؤشر بازل لعام 2025
على صعيد موازٍ، صنف "معهد بازل للحوكمة" لبنان في مؤشر بازل لمكافحة غسل الأموال لعام 2025 في المراتب التالية:
* **عالمياً:** المرتبة 47 من أصل 177 دولة.
* **الدول ذات الدخل المتوسط الأدنى (LMICs):** المرتبة 26 من أصل 47 دولة.
* **عربياً:** المرتبة السادسة من أصل 15 دولة.

#### مقارنة مع عام 2024:
في استطلاع عام 2024، احتل لبنان المرتبة 50 عالمياً (من أصل 164)، والمرتبة 26 ضمن دول الدخل المتوسط الأدنى (من أصل 43)، والمرتبة السادسة عربياً (من أصل 12).

كما صُنف لبنان في الشريحة المئوية 27 عالمياً، مما يعني أن 73% من الاقتصادات لديها مستوى مخاطر أقل من لبنان في مجال غسل الأموال وتمويل الإرهاب. في حين حلّ في الشريحة المئوية 40 عربياً، ما يشير إلى أن 60% من الدول العربية تتمتع بمستوى مخاطر أقل منه.

وبالاستناد إلى نفس مجموعة الدول في استطلاعي 2024 و2025، تراجع تصنيف لبنان العالمي بمقدار 7 مراكز، وتراجع تصنيفه ضمن فئة الدول ذات الدخل المتوسط الأدنى بمقدار 3 درجات، وتراجع عربياً بمركز واحد على أساس سنوي. وهذا يعني أن مستوى مخاطر غسل الأموال وتمويل الإرهاب في لبنان قد ارتفع عالمياً، وإقليمياً، وضمن فئة الدول ذات الدخل المتوسط الأدنى خلال عام 2025.

### مقارنات عالمية وإقليمية
* **عالمياً (للاقتصادات التي يبلغ ناتجها المحلي الإجمالي 10 مليارات دولار أو أكثر):** يسجل لبنان مستوى مخاطر أقل من زيمبابوي، تايلاند، وقيرغيزستان، ولكنه يسجل مستوى مخاطر أعلى من العراق، نيبال، والمملكة العربية السعودية.
* **ضمن دول الدخل المتوسط الأدنى (LMICs):** مستوى مخاطر لبنان أقل من كوت ديفوار، زيمبابوي، وقيرغيزستان، وأعلى من نيبال، هندوراس، والهند.
* **إقليمياً (عربياً):** يتمتع لبنان بمستوى مخاطر أقل من جيبوتي، الجزائر، موريتانيا، الكويت، والإمارات العربية المتحدة، بينما يسجل مستوى مخاطر أعلى من العراق، السعودية، قطر، مصر، البحرين، المغرب، الأردن، تونس، وعُمان.

بشكل عام، صنف الاستطلاع لبنان ضمن فئة "المخاطر المتوسطة" (Medium Risk) في غسل الأموال وتمويل الإرهاب، إلى جانب 81 دولة حول العالم وثمانية اقتصادات عربية تشمل: البحرين، مصر، العراق، الأردن، المغرب، قطر، السعودية، وتونس.`,
    contentEn: `The Financial Action Task Force (FATF), the global standard-setting body for combating money laundering and the financing of terrorism and proliferation (AML/CFT), announced on June 19, 2026, that it maintains Lebanon on its list of "Jurisdictions under Increased Monitoring," widely known as the "Grey List." This decision aligns with previous determinations from throughout 2025 and February 2026.

Lebanon was originally placed on the Grey List in October 2024. The FATF notes that listed jurisdictions work actively with the body to address strategic deficiencies in their regimes. An increased monitoring status commits the country to resolve designated strategic shortcomings swiftly within agreed timeframes.

### Action Plan: 10 Core Commitments
Despite complex social, economic, and security situations, Lebanon made a high-level political commitment to work with the FATF and MENAFATF to strengthen its AML/CFT framework. Consequently, authorities must proceed on executing their action plan through the following ten steps:

1. **Risk Assessments:** Assessing specific AML/CFT risks identified in the Mutual Evaluation Report (MER) of May 2023, while ensuring robust policies are implemented to mitigate them.
2. **Judicial Cooperation & Recovery:** Boosting procedures to guarantee the rapid, effective execution of mutual legal assistance requests, extradition, and asset recovery.
3. **Non-Financial Professions (DNFBPs):** Strengthening risk awareness among Designated Non-Financial Businesses and Professions, and applying effective, dissuasive, and proportionate penalties.
4. **Beneficial Ownership:** Ensuring beneficial ownership data remains fully updated, and maintaining severe penalties and mitigating measures for legal entities.
5. **Financial Intelligence:** Promoting and prioritizing the utilization of intelligence outputs compiled by the Financial Intelligence Unit (FIU).
6. **Investigation & Prosecutions:** Demonstrating sustained progression in local AML investigations, prosecutions, and judgments aligned with risk profiles.
7. **Cross-border Smuggling:** Refining procedures for asset recovery, and uncovering or confiscating illicit cross-border physical transport of cash and precious stones/metals.
8. **Terrorism Financing:** Sustaining focused investigations into terrorism financing threats and exchanging intelligence with international partners.
9. **Targeted Financial Sanctions:** Ensuring immediate implementation of targeted financial sanctions, particularly in DNFBPs and non-bank financial institutions.
10. **Non-Profit Organizations (NPOs):** Implementing targeted risk-based monitoring on high-risk NPOs without hindering or choking legitimate philanthropic activities.

### Lebanon in the 2025 Basel AML Index
In parallel, the Basel Institute on Governance ranked Lebanon in its 2025 Basel AML Index as follows:
* **Globally:** 47th out of 177 countries.
* **Lower-Middle-Income Countries (LMICs):** 26th out of 47.
* **Arab Countries:** 6th out of 15.

#### Comparison to 2024:
In the 2024 index, Lebanon was 50th globally (out of 164), 26th among LMICs (out of 43), and 6th in the Arab region (out of 12). 

Comparing both periods on an equivalent national sample, Lebanon slipped by 7 places globally and 1 place regionally. This shows that threats concerning money laundering and terrorism financing have scaled upwards globally, regionally, and within its income bracket over 2025.

### Regional and Global Comparisons
* **Globally (with GDP > $10B):** Lebanon carries a lower risk profile than Zimbabwe, Thailand, and Kyrgyzstan, but ranks with higher risk than Iraq, Nepal, and Saudi Arabia.
* **Income Bracket (LMICs):** Risk in Lebanon is lower than Ivory Coast, Zimbabwe, and Kyrgyzstan, and higher than Nepal, Honduras, and India.
* **Arab Region:** Lebanon has lower risks than Djibouti, Algeria, موريتانيا, Kuwait, and the UAE, but is higher risk than Iraq, Saudi Arabia, Qatar, Egypt, Bahrain, Morocco, Jordan, Tunisia, and Oman.

Overall, the index places Lebanon in the "Medium Risk" tier alongside 81 global economies and eight Arab nations (including Bahrain, Egypt, Iraq, Jordan, Morocco, Qatar, Saudi Arabia, and Tunisia).`,
    author: {
      nameAr: 'مازن برّازي',
      nameEn: 'Mazen Barazy',
      titleAr: 'محلل الشؤون الإقليمية والمالية',
      titleEn: 'Regional & Financial Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    date: '19 يونيو 2026',
    readTimeAr: '6 دقائق قراءة',
    readTimeEn: '6 min read',
    isFeatured: false,
    views: 18530,
    tags: ['FATF', 'Grey List', 'Money Laundering', 'Lebanon Economy', 'Basel Index', 'Banking Sector']
  },
  {
    id: 'lebanon-golden-visa-insight',
    category: 'lebanon',
    titleAr: 'الإقامة الذهبية في لبنان: عربة فاخرة أمام حصان مريض',
    titleEn: 'Lebanon’s Golden Visa: A Luxury Carriage in Front of a Sick Horse',
    summaryAr: 'أقرت لجنة المال والموازنة مشروع "الإقامة الذهبية" لجذب المستثمرين، لكن المشروع يغفل حقيقة أن النجاح يتطلب وجود "دولة" حقيقية بقضاء مستقر وبنية تحتية ونظام مصرفي موثوق.',
    summaryEn: 'The Finance and Budget Committee recently passed Lebanon’s "Golden Visa" project to lure wealthy investors. However, the plan resembles buying a first-class seat on a broken aircraft, ignoring the absence of state institutions and security.',
    contentAr: `أقرّت لجنة المال والموازنة أخيراً مشروع "الإقامة الذهبية"، في خطوة وُصفت رسمياً بأنها طوق نجاة مالي يهدف إلى استقطاب المستثمرين والأثرياء العرب والأجانب. يشترط المشروع منح إقامة ضريبية مميزة مقابل استثمار مالي لا يقل عن 500 ألف دولار أميركي، تُضاف إليها رسوم سنوية تبلغ 50 ألف دولار عن كل فرد من العائلة الراغبة في الاستفادة من هذه الميزة. تسوّق الحكومة لهذا المشروع على أنه إبرة إنعاش للاقتصاد المنهك، ومحاولة لضخ "الفريش دولار" في شرايين البلد.

### وهم الاستنساخ: بين الورق والواقع
على الورق، تبدو الفكرة برّاقة ومستنسخة من تجارب عالمية ناجحة. دول مثل اليونان، إسبانيا، البرتغال، وقبرص، استخدمت برامج مماثلة (Golden Visas) لانتشال اقتصاداتها من أزمات خانقة، ونجحت بالفعل في جذب مليارات الدولارات وتنشيط قطاعاتها العقارية والتجارية. لكن المقاربة هنا تسقط في فخ الاستنساخ الأعمى.

المعضلة الأساسية التي يبدو أن المشرّع اللبناني قد تعمّد القفز فوقها، هي أن نجاح هذه البرامج في أوروبا لم يكن وليد "الفيزا" بحد ذاتها، بل كان تتويجاً لوجود "دولة" بالمفهوم الحقيقي. المستثمر هناك يدفع للحصول على استقرار أمني، بنية تحتية متطورة، قضاء مستقل يحمي ملكيته الخاصة، ونظام مصرفي متين، بالإضافة طبعاً إلى امتيازات إضافية كحرية التنقل (فضاء شنغن).

أما في النسخة اللبنانية، فإن المشروع يشبه محاولة بيع تذكرة في مقصورة الدرجة الأولى على متن طائرة متهالكة؛ لم يُحسم بعد موعد إقلاعها، والأسوأ أن قبطانها مجهول ومحركاتها معطلة.

### أسئلة بديهية تبحث عن إجابات
هنا تُطرح الأسئلة العقلانية التي تغيب عن أذهان عرّابي المشروع:
* **الأمن والاستقرار:** أي مستثمر عاقل سيدفع نصف مليون دولار ليقيم في جغرافيا تعيش على صفيح ساخن من الحروب المتقطعة والتوترات الجيوسياسية؟
* **البنية التحتية والخدمات:** كيف سيمارس صاحب الأعمال نشاطه في ظل شبه انعدام للخدمات البديهية؟ لا كهرباء مستدامة، لا مياه، شبكات إنترنت متراجعة، وطرقات تفتقر لأدنى معايير السلامة.
* **الثقة المصرفية:** أين سيودع هذا المستثمر "المغامر" أمواله؟ هل سيضعها في قطاع مصرفي لم يستكمل حتى اللحظة مسار التعافي؟ وكيف نطلب من الأجنبي أن يثق بنظام مالي صادر عشرات مليارات الدولارات من ودائع أبنائه "المقدسة" دون أن يُحاسَب أحد؟

### رأس المال يبحث عن الأمان، لا عن المخاطر
إن رأس المال بطبيعته "جبان"، يبحث دائماً عن الملاذات الآمنة، وعن العوائد المجدية، وعن استراتيجية خروج آمنة (Exit Strategy) متى أراد سحب أمواله. الرساميل لا تدفع مقابلاً مادياً للدخول إلى حقول الألغام. الإقامة الضريبية تُعطى في دول ذات سيادة مالية وتشريعية واضحة، لا في بيئة تعاني من اقتصاد نقدي (Cash Economy) يضيق الخناق عليه دولياً. هل يبحث المستثمر اليوم عن "إقامة ذهبية" أم عن "بيئة استثمارية ذهبية"؟

### الخلاصة: البناء من الأساس وليس من السقف
مما لا شك فيه أن لبنان بأمسّ الحاجة إلى صدمة إيجابية واستثمارات خارجية تعيد تحريك العجلة الاقتصادية، لكن جذب الرساميل يتطلب خطة تعافٍ شاملة، إقرار قوانين إصلاحية، إعادة هيكلة المصارف، واستقلالية القضاء لضمان حقوق المستثمرين.

القفز مباشرة نحو بيع "الإقامة الذهبية" أشبه بافتتاح جناح ملكي فاخر في فندق لا تزال جدرانه تتداعى. الفكرة اقتصادياً ليست خطيئة بحد ذاتها، لكن توقيتها منفصل عن الواقع. فقبل أن نبحث عن أثرياء يشترون "الإقامة الذهبية"، لعل من الأجدى أولاً أن نوفر مقومات "الإقامة العادية" والكريمة.`,
    contentEn: `The Finance and Budget Committee recently approved the "Golden Visa" bill, officially touted as a financial lifesaver aimed at attracting wealthy Arab and foreign investors. The project promises a tailored tax residency status in return for an investment of no less than $500,000, along with an annual fee of $50,050 for each family member wishing to benefit. The government markets this program as a resuscitation injection for a depleted economy and a mean to pump fresh dollars into the national veins.

### The Replica Illusion: Paper vs. Reality
On paper, the strategy seems brilliant, modeled after successful global benchmarks. Countries like Greece, Spain, Portugal, and Cyprus successfully leveraged golden visas to lift their economies out of tight financial crises, channeling billions into local properties and businesses. Yet this approach falls into the trap of blind carbon-copying.

The fundamental hurdle that the Lebanese legislature chose to bypass is that the success of European programs was not a product of the "visa" itself, but a manifestation of an actual "state." Investors pay to get security, robust infrastructure, independent judiciary safeguards, and reliable banking, alongside key advantages such as the Schengen zone freedom of movement.

In its Lebanese version, the project resembles selling first-class tickets on a crumbling plane with no scheduled departure, a broken engine, and an unidentified pilot.

### Obvious Questions in Need of Answers
Here, crucial questions arise that the project promoters seem to ignore:
* **Security & Stability:** Which rational investor will shell out half a million dollars to reside in a territory permanently living on the hot plate of sporadic warfare and geopolitical turmoil?
* **Infrastructure & Services:** How can business owners practice their activities when basic amenities are non-existent? No stable power grid, no clean water supply, degrading networks, and unstable transport networks.
* **Banking Trust:** Where will this adventurous investor deposit their funds? In a banking system that has not even initiated a path toward recovery? How can we ask foreigners to trust a financial setup that locked down tens of billions of dollars of its own citizens' deposits with absolute impunity?

### Capital Seeks Security, Not Landmines
Capital is historically risk-averse, constantly searching for safe havens, viable returns, and robust exit strategies. Wealth does not pay entrance tickets into geostrategic minefields. Tax residency is granted in nations holding clear fiscal and legislative sovereignty—not in environments grappling with cash-dominated economies undergoing global isolation. Is the investor looking for a "Golden Visa" or a "Golden Investment Environment"?

### Conclusion: Foundations Before the Roof
Lebanon is undoubtedly in dire need of an economic shock and foreign capital to reactivate its trade cycles. However, catching foreign reserves demands a comprehensive recovery plan, deep regulatory reforms, bank restructuring, and judicial independence.

Jumping directly to selling a "Golden Visa" is akin to opening a grand presidential suite in a hotel whose structural walls are continuously cracking. The concept itself is not financially incorrect, but its timing remains entirely detached from reality. Before seeking wealthy buyers for a golden visa, we must first secure the basic dignity and infrastructure of a normal residency.`,
    author: {
      nameAr: 'أديب الوارّاق',
      nameEn: 'Adeeb Al-Warraq',
      titleAr: 'رئيس التحرير العام',
      titleEn: 'Editor-in-Chief',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200',
    date: '21 يونيو 2026',
    readTimeAr: '5 دقائق قراءة',
    readTimeEn: '5 min read',
    isFeatured: true,
    views: 14720,
    tags: ['Golden Visa', 'Lebanon Economy', 'Investment', 'Corruption', 'Capital Flight']
  },
  {
    id: 'lebanon-insurance-strategy-2026',
    category: 'lebanon',
    titleAr: 'وزارة الاقتصاد تكشف عن استراتيجيتها لقطاع التأمين',
    titleEn: 'Ministry of Economy Unveils Insurance Sector Strategy',
    summaryAr: 'كشفت وزارة الاقتصاد والتجارة عن استراتيجية ثلاثية الأركان لقطاع التأمين ترتكز على بناء هيكل متين وملاءة مالية للشركات، تفعيل دور لجنة الرقابة والضمان، واحتواء كلفة الاستشفاء الطبي.',
    summaryEn: 'The Ministry of Economy and Trade has launched its comprehensive strategy for Lebanon’s insurance sector, centering on building a resilient market structure, strengthening the Insurance Control Commission (ICC), and containing rising healthcare costs.',
    contentAr: `كشفت وزارة الاقتصاد والتجارة عن استراتيجيتها لقطاع التأمين في لبنان، والتي ترتكز على ثلاثة محاور رئيسية:

### المحور الأول: بناء هيكل متين لسوق التأمين
دعت الوزارة إلى بناء هيكل سوق منظم، يخضع للمساءلة، ويتمتع برسملة جيدة. وأوصت بتعزيز القطاع من خلال:
* **استعادة كفاية رأس المال:** استعادة كفاية رأس المال لشركات التأمين، وإدخال متطلبات رأس المال القائمة على المخاطر.
* **الاندماجات وطرح المنتجات:** تشجيع اندماج القطاع لخلق شركات أقوى، وتطبيق قواعد حذرة للأموال العائمة للأقساط، وتسهيل طرح منتجات تأمينية جديدة.
* **حوكمة وسطاء التأمين:** معالجة الإفراط السائد في الوساطة وتحسين شفافية السوق لتعزيز دور وسطاء التأمين. حيث حثت الوسطاء على تعزيز ميزانياتهم العمومية عبر زيادة رأس المال، واعتماد معايير مهنية واضحة من خلال "مدونة قواعد سلوك" جديدة، والامتثال لممارسات العمولات المنظمة، وحماية أموال العملاء، ومكافحة الوساطة غير المصرح بها.

وأشارت الوزارة إلى مناقشات جارية مع نقابة وسطاء التأمين في لبنان لإعداد مشروع مرسوم ينظم عمل الوسطاء، متوقعة إنجازه بحلول نهاية الصيف الحالي.

كما لفتت إلى أن حاملي الوثائق لم يتمكنوا من استرداد المبالغ المستحقة لهم بالعملة الأصلية لعقودهم، وأن العديد من المطالبات المتعلقة بانفجار مرفأ بيروت (أغسطس 2020) لا تزال دون حل، وهو الانفجار الذي يُعد أكبر حدث منفرد للخسائر المؤمنة في تاريخ لبنان.

### المحور الثاني: تعزيز الإطار التنظيمي
أكدت الوزارة على أهمية تزويد "لجنة مراقبة هيئات الضمان" (ICC) بالأدوات اللازمة لتعزيز الإشراف على سلوك السوق وحماية حاملي الوثائق.
* **إعادة تفعيل الهيئات:** أشار التقرير إلى أن مجلس الوزراء عيَّن رئيساً للجنة في يونيو 2025 بعد شغور المنصب لعشر سنوات، وأعاد تفعيل المجلس الوطني للضمان بعد تسع سنوات من التوقف.
* **تسوية النزاعات:** يجري العمل على تفعيل "المجلس التحكيمي للضمان" (لتسوية النزاعات دون تكاليف قضائية باهظة) وتعزيز مصلحة حماية المستهلك.
* **قانون التأمين الجديد:** يُدخل "قانون التأمين" الجديد متطلبات رأس مال قائمة على المخاطر تتماشى مع المبادئ الدولية، ويؤسس إطاراً لمعالجة تعثر الشركات، ويفرض نظام حوكمة الجدارة والأهلية، ويُرسخ حقوق المستهلك.

### المحور الثالث: احتواء تكاليف الرعاية الصحية
دعت الاستراتيجية إلى احتواء ارتفاع التكاليف الطبية عبر تعزيز شفافية التسعير، وفرض الحوكمة السريرية، وتأسيس بنية تحتية منظمة لضمان الكفاءة، معتبرة أن هذه التكاليف تمثل قضية حماية للمستهلك وتهديداً مباشراً لاستقرار القطاع.

### أرقام وإحصائيات قطاع التأمين (2024-2025):
* **إجمالي الأقساط المكتتبة:** بلغ 117,482.8 مليار ليرة في 2025 (بزيادة 15.7% عن 2024). وبالدولار، بلغت 1.3 مليار دولار (مقابل 1.1 مليار دولار في 2024)، باحتساب سعر صرف 89,500 ليرة للدولار.
* **تأمين غير الحياة (40 شركة):** 107,586.1 مليار ليرة (1.2 مليار دولار) في 2025.
* **التأمين الصحي:** يمثل 55% من السوق (661.4 مليون دولار، بزيادة 16.2%).
* **تأمين السيارات:** يمثل 23.3% من السوق (280.1 مليون دولار، بزيادة 22.3%).
* **تأمين الممتلكات والحوادث:** يمثل 21.7% من السوق (260.6 مليون دولار، بزيادة 6%).
* **التأمين على الحياة (30 شركة):** بلغ 9,896.7 مليار ليرة (110.6 مليون دولار) في 2025، بزيادة 22.2%.
* **النفقات والمطالبات (غير الحياة في 2025):** بلغ صافي إيرادات الاستثمار 1,661.2 مليار ليرة، فيما بلغت نسبة المطالبات المسددة إلى إجمالي الأقساط 56.8%.
* **النفقات والمطالبات (التأمين على الحياة في 2025):** بلغ صافي إيرادات الاستثمار 9,290.3 مليار ليرة، وبلغت نسبة المطالبات المسددة إلى إجمالي الأقساط 84%.`,
    contentEn: `The Lebanese Ministry of Economy and Trade has launched its comprehensive strategy for the local insurance sector, centering on three primary development pillars:

### Pillar I: Building a Resilient Insurance Market Structure
The Ministry called for establishing an organized, highly capitalized, and fully accountable market structure. Key recommendations include:
* **Restoring Capital Adequacy:** Revamping the capital base of insurance operators and introducing Risk-Based Capital (RBC) benchmarks.
* **Mergers & Product Launches:** Encouraging sectoral mergers to build stronger financial institutions, regulating premium floating accounts prudently, and easing approvals for innovative insurance products.
* **Brokerage Accountability:** Tackling excessive brokerage practices and upgrading market transparency. Insurance brokers are expected to boost their balance sheets via capital increases, comply with a newly drafted "Code of Conduct", follow organized commission guidelines, protect client funds, and eradicate unauthorized brokerage.

The Ministry revealed that negotiations are underway with the Syndicate of Insurance Brokers in Lebanon (LIBS) to finalize a regulatory decree, expected before the end of this summer.

Furthermore, it highlighted that policyholders have struggled to recoup claims in their contracts' original currency, and that numerous claims connected to the August 2020 Beirut Port explosion—the largest insured loss event in Lebanese history—remain tragically unresolved.

### Pillar II: Strengthening the Regulatory Framework
The Strategy underscores the necessity of equipping the Insurance Control Commission (ICC) with advanced oversight tools to police market behavior and safeguard consumer rights:
* **Reactivating Inactive Organs:** The cabinet appointed a general manager for the ICC in June 2025, ending a vacant slot of ten years, and revived the National Insurance Council after a nine-year dormancy.
* **Out-of-Court Dispute Resolution:** Efforts are underway to activate the "Insurance Arbitrage Council" for resolving consumer cases cost-effectively, alongside boosting the Consumer Protection Directorate.
* **The New Insurance Law:** The upcoming modern insurance law will strictly introduce risk-based capital metrics aligned with global standards, formulate structured protocols for distressed companies, mandate "Fit and Proper" governance guidelines, and anchor consumer rights.

### Pillar III: Containing Healthcare Costs
The strategy stresses that containing exploding medical fees is critical for consumer preservation and sector stability. This will be addressed by implementing pricing transparency, clinical governance reviews, and organized technology infrastructure to improve efficiency.

### Key Insurance Market Statistics (2024-2025):
* **Gross Written Premiums (GWP):** Reached 117,482.8 billion LBP in 2025 (+15.7% from 2024). In USD terms, GWP reached $1.3 billion (compared to $1.1 billion in 2024), evaluated at the official exchange rate of 89,500 LBP/USD.
* **Non-Life Segment (40 companies):** Reached 107,586.1 billion LBP ($1.2 billion) in 2025.
* **Medical Insurance:** Dominates the market with a 55% share ($661.4 million, representing a 16.2% annual growth).
* **Motor Insurance:** Accounts for 23.3% of the market ($280.1 million, an increase of 22.3%).
* **Property & Casualty (P&C) Insurance:** Captures 21.7% of the market ($260.6 million, growing by 6%).
* **Life Segment (30 companies):** Stood at 9,896.7 billion LBP ($110.6 million) in 2025, an increase of 22.2%.
* **Expenses & Claims (Non-Life, 2025):** Net investment revenue reached 1,661.2 billion LBP, while the paid claims-to-GWP write-off ratio stood at 56.8%.
* **Expenses & Claims (Life, 2025):** Net investment revenue stood at 9,290.3 billion LBP, with a paid claims-to-GWP ratio of 84%.`,
    author: {
      nameAr: 'أديب الوارّاق',
      nameEn: 'Adeeb Al-Warraq',
      titleAr: 'رئيس التحرير العام',
      titleEn: 'Editor-in-Chief',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    date: '15 يونيو 2026',
    readTimeAr: '6 دقائق قراءة',
    readTimeEn: '6 min read',
    isFeatured: false,
    views: 7420,
    tags: ['Insurance Sector', 'Ministry of Economy', 'ICC', 'Mollat', 'Financial Reform', 'Lebanon']
  },
  {
    id: 'lebanon-iif-economic-forecast-2026',
    category: 'lebanon',
    titleAr: 'انكماش الناتج المحلي الإجمالي الحقيقي بنسبة 13% واتساع عجز الحساب الجاري في 2026',
    titleEn: 'Lebanon Real GDP Expected to Contract by 13% as Current Account Deficit Reaches 25% in 2026',
    summaryAr: 'توقع معهد التمويل الدولي (IIF) انكماش الناتج المحلي الإجمالي الحقيقي في لبنان بنسبة 13% في الكامش الاقتصادي لعام 2026 نتيجة تداعيات العمليات العسكرية المستمرة، وتدمير البنى التحتية، وتراجع عائدات السياحة.',
    summaryEn: 'The Institute of International Finance (IIF) projects a severe 13% contraction in Lebanon’s real GDP in 2026, shifting from a 4.1% expansion in 2025, driven by geopolitical clashes, massive displacements, and crippled reconstruction.',
    contentAr: `توقع "معهد التمويل الدولي" (IIF) أن ينكمش الناتج المحلي الإجمالي الحقيقي في لبنان بنحو 13% في عام 2026، متحولاً بشكل حاد من نموه الإيجابي المسجل بنسبة 4.1% في عام 2025. ويعكس هذا التراجع تداعيات تجدد القتال والنزوح الواسع للسكان، وتدمير البنية التحتية، وانخفاض عائدات السياحة، والتأخير المستمر في جهود إعادة الإعمار.

### أبرز التوقعات الاقتصادية لعام 2026-2027:
* **النمو المستقبلي وإعادة الإعمار:** يتوقع المعهد عودة النمو الخجول بنسبة 3% في عام 2027 بشرط تراجع حدة الأعمال القتالية في أواخر 2026. وقُدر الناتج المحلي الإجمالي الاسمي بنحو 32.5 مليار دولار لهذا العام و35.8 مليار دولار في 2027.
* **التضخم وأسعار المواد:** من المتوقع أن يتسارع معدل التضخم من 14.6% في عام 2025 إلى 19.4% في عام 2026 بسبب اضطرابات العرض المباشرة وارتفاع أسعار السلع العالمية، قبل أن يتباطأ مجدداً إلى حدود 7.5% في 2027.
* **احتياطيات مصرف لبنان وسعر الليرة:** يُتوقع أن تنخفض احتياطيات "مصرف لبنان" من العملات الأجنبية من 11.8 مليار دولار في 2025 إلى 11.2 مليار دولار في 2026، لتستقر تارة أخرى وترتفع إلى 11.8 مليار دولار في 2027. ويشير المعهد إلى أن استقرار سعر الصرف يُعزى في المقام الأول للشح الشديد في سيولة الليرة ووقف طباعة العملة، وليس لتحسن الأساسيات الاقتصادية.
* **المالية العامة والدين العام:** سيتحول الرصيد المالي للحكومة من فائض بنسبة 2.9% من الناتج المحلي في 2025 إلى عجز يبلغ 0.3% في 2026. وتُشير التقديرات إلى تصاعد الدين المقوم بالعملة الأجنبية ليلامس 218.3% من الناتج المحلي الإجمالي الإجمالي بنهاية عام 2026.
* **الحساب الجاري والتبادل التجاري:** سيتسع عجز الحساب الجاري الخارجي للبلاد بشكل مقلق من 22.1% من الناتج المحلي في 2025 إلى 25.2% في 2026.

### خلاصة معهد التمويل الدولي:
حذر التقرير من أن الاقتصاد اللبناني سيبقى على الأرجح يراوح في حالة "توازن منخفض النمو وعالي المخاطر"، متسماً بعدم الاستقرار الدوري والشلل المؤسسي، وذلك في ظل غياب تطبيع سياسي مستدام، وضخ قنوات تمويل دولية لإعادة الإعمار، والمضي قدماً في إعادة هيكلة شاملة للقطاع المصرفي المستنزف.`,
    contentEn: `The Institute of International Finance (IIF) forecasts Lebanon’s real GDP to contract by 13% in 2026, dropping sharply from a recovering interest rate of 4.1% in 2025. This negative trajectory reflects the heavy toll of escalated geopolitical hostilities, widespread civilian displacement, extensive infrastructure damage, halted tourism revenues, and severe delays in reconstruction efforts.

### Key Economic Indicators & Forecasts (2026-2027):
* **Growth and Rebuilding Potential:** The IIF anticipates a mild recovery of 3% real GDP growth in 2027, on the assumption that regional hostilities cool down in the latter months of 2026. Nominal GDP is projected at $32.5 billion for 2026 and $35.8 billion in 2027.
* **Inflation:** Driven by harsh supply chain disruptions, logistics bottlenecks, and elevated global commodity indexes, inflation is expected to speed up from 14.6% in 2025 to 19.4% in 2026, before moderating to 7.5% in 2027.
* **Central Bank (BDL) Reserves:** Foreign exchange reserves are modeled to contract from $11.8 billion in 2025 down to $11.2 billion in 2026, subsequently pulling back to $11.8 billion in 2027. The IIF remarks that current foreign exchange rate stability is fueled by tight Lira liquidity containment and a freeze on physical banknotes printing, rather than fundamental economic consolidation.
* **Public Finance:** The fiscal balance is projected to shift from a surplus of 2.9% of GDP in 2025 to a deficit of 0.3% in 2026. Meanwhile, foreign currency debt is estimated to spiral to 218.3% of Lebanon's GDP by the close of 2026.
* **Current Account Deficit:** The external current account shortfall is expected to widen further from 22.1% of GDP in 2025 to 25.2% in 2026.

### IIF Strategic Outlook:
The macro-assessment warns that the Lebanese economy will remain trapped in a self-reinforcing "low-growth, high-risk equilibrium." In the absence of decisive political stabilization, international funding channels for physical reconstruction, and a transparent restructuring of the commercial banking system, the nation remains vulnerable to systemic volatility and persistent institutional paralysis.`,
    author: {
      nameAr: 'مازن برّازي',
      nameEn: 'Mazen Barazy',
      titleAr: 'محلل الشؤون الإقليمية والمالية',
      titleEn: 'Regional & Financial Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200',
    date: '12 يونيو 2026',
    readTimeAr: '4 دقائق قراءة',
    readTimeEn: '4 min read',
    isFeatured: false,
    views: 8940,
    tags: ['IIF', 'GDP Contraction', 'Inflation', 'Lebanese Lira', 'Central Bank Reserves', 'Current Account']
  },
  {
    id: 'bdl-comptoir-conversion-directive-2026',
    category: 'lebanon',
    titleAr: 'مصرف لبنان يُلزم مؤسسات الإقراض المتخصصة بالتحول إلى شركات مالية',
    titleEn: 'BDL Mandates Specialised Lending Institutions to Transition into Financial Companies',
    summaryAr: 'أصدر مصرف لبنان تعميماً حاسماً يُلزم كونتوارات التسليف غير المصرفية بالتقدم بطلبات تحويل نشاطهم إلى شركات مالية مرخصة وخاضعة بالكامل لشروطه ورقابته في غضون سنة واحدة.',
    summaryEn: 'The Central Bank of Lebanon (BDL) has issued Intermediate Circular No. 766, which directs all specialized non-bank lending institutions (comptoirs) to submit transformation schemes to operate as financial companies.',
    contentAr: `أصدر مصرف لبنان التعميم الوسيط رقم (766/13821) بتاريخ 21 مايو 2026، الموجه إلى مؤسسات الإقراض المتخصصة (الكونتوارات)، والذي يُعدل شروط ممارسة عمليات التسليف:

### أبرز قرارات التعميم:
* **وقف التراخيص:** تعليق قبول طلبات الحصول على تراخيص جديدة لإجراء عمليات التسليف من نوع "كونتوار" حتى إشعار آخر بموجب قرارات المجلس المركزي.
* **مهلة التحول:** منح جميع المؤسسات والشركات العاملة حالياً مهلة أقصاها سنة واحدة فقط لتقديم طلبات رسمية لتحويل شركاتهم بالكامل إلى "مؤسسة مالية" (Financial Institution)، مع تقديم المستندات المطلوبة (وخاصة خطة عمل واضحة وتبرير للاحتياطيات ومصادر التمويل).
* **بطلان التراخيص السابقة:** سيُعتبر أي ترخيص سابق لاغياً وباطلاً لأي مؤسسة لا تلتزم بأحكام هذا التعميم، مما يمنعها نهائياً من ممارسة أي عمليات تسليف تحت طائلة الملاحقة القانونية وإلغاء التسجيل المالي.
* **آلية البت بالطلبات:** سيدرس مصرف لبنان الطلبات والملفات المقدمة، وفي حال الموافقة المبدئية، ستُمنح إدارة المؤسسة مهلة ستة أشهر للامتثال الكامل لشروط تأسيس وترخيص الشركات المالية اللبنانية المعترف بها بموجب قانون النقد والتسليف.
* **العقوبات والملاحقات:** أي مؤسسة تُعلق رخصتها أو لا تُدرج في لائحة المؤسسات المالية المعترف والمصرح بها من قبل مصرف لبنان بعد انقضاء المهل، ستفقد فوراً وبقوة القانون حقها في إقراض الأموال أو إجراء معاملات ماليّة.

ملاحظة: بنهاية عام 2025، كان في لبنان 21 مؤسسة إقراض متخصصة (كونتوار) خاضعة ومسجلة رسمياً تحت إشراف ورقابة مديرية الرقابة لمصرف لبنان.`,
    contentEn: `The Central Bank of Lebanon (Banque du Liban - BDL) issued Intermediate Circular No. (766/13821) on May 21, 2026, addressed to specialized lending institutions (comptoirs), modifying the overall terms and regulations governing non-bank credit operations:

### Key Directives:
* **Suspension of New Licenses:** Instantly halting and freeze all new applications for specialized credit counter licenses ("Comptoirs") until further notice by the Central Council of BDL.
* **Conversion Timeline:** Granting already operating firms a maximum grace period of one year from the circular’s release to submit formal proposals to convert their operations into fully authorized "Financial Institutions," backed by the necessary feasibility files and clear source-of-funds business plans.
* **Invalidity of Existing counter registered status:** Any prior registration license will be rendered null and void for any institution that fails to commit to this circular, barring them from executing any future lending actions under pain of civil litigation and total registration cancellation.
* **BDL Assessment Protocol:** BDL’s specialized divisions will review all conversion applications. Upon initial recommendation approval, the institutions will be granted six months to conform to the statutory capital, compliance, and auditing conditions required for fully fledged Lebanese financial enterprises.
* **Enforcement & Sanctions:** Any outlet whose license is terminated or which fails to feature in the recognized ledger of authorized financial companies post-deadline will immediately forfeit its legal right to execute lending operations of any kind.

*Note: By the close of 2025, there were exactly 21 specialized non-bank micro-credit institutions (comptoirs) formally registered and monitored by the Banque du Liban.*`,
    author: {
      nameAr: 'مازن برّازي',
      nameEn: 'Mazen Barazy',
      titleAr: 'محلل الشؤون الإقليمية والمالية',
      titleEn: 'Regional & Financial Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=600',
    date: '21 مايو 2026',
    readTimeAr: '3 دقائق قراءة',
    readTimeEn: '3 min read',
    isFeatured: false,
    views: 4890,
    tags: ['BDL', 'Central Bank', 'Lending Institutions', 'Comptoirs', 'Financial Sector', 'Regulations']
  },
  {
    id: 'lebanon-war-agricultural-damage-2026',
    category: 'lebanon',
    titleAr: 'الأضرار المباشرة في المناطق الزراعية المتضررة من الحرب تبلغ 41.2 مليون دولار',
    titleEn: 'Direct War-Induced Damages in Southern Lebanon Agricultural Areas Reach $41.2 Million',
    summaryAr: 'كشفت وزارة الزراعة اللبنانية بالتعاون مع المنظمات الدولية (الأمم المتحدة والغذائية العالمية) عن بلوغ الأضرار المباشرة للأراضي والبساتين وتجهيزات المياه بالجنوب 41.2 مليون دولار، فيما تفوق خسائر المواسم 530 وبمساحة متضررة تقارب الربع.',
    summaryEn: 'A joints assessment study executed by the Ministry of Agriculture in partnership with UNDP, FAO, and WFP catalogs $41.2M in direct losses on southern lands and greenhouses, with total seasonal yield losses exceeding $530M.',
    contentAr: `أشارت وزارة الزراعة، بالتعاون مع المنظمات الدولية (برنامج الأمم المتحدة الإنمائي UNDP، منظمة الأغذية والزراعة FAO، وبرنامج الأغذية العالمي WFP)، إلى أن الأضرار المباشرة في المناطق الزراعية جنوب لبنان جراء الأعمال القتالية الإسرائيلية (التي تتابعت منذ مارس من هذا العام) بلغت حوالي 41.2 مليون دولار.

### حجم الخسائر والأضرار الكلية:
* **الأضرار المباشرة:** شملت تدمير التربة الزراعية، حرق وتلف البساتين والمشاتل، وتأثر مرافق الإنتاج وتجهيزات الري ومضخات المياه. وتُشير التقديرات لوجود حوالي 1,380 هكتاراً بحاجة ملحة لإعادة تأهيل كامل واستصلاح بيئي.
* **خسائر الإنتاج العالق:** تواجه حوالي 56,320 هكتاراً خسائر فادحة وتلفاً في الإنتاج والمطالع بسبب عدم قدرة المزارعين على الوصول لقرى المواجهة وتوقف سلاسل التوريد المحلية. وتُقدر قيمة خسائر الإنتاج الزراعي الإقليمي الإجمالي بنحو 530.5 مليون دولار.
* **النزوح وتوقف المزارعين:** تضررت 51,956 هكتاراً (أي ما يقارب 22.5% من إجمالي المساحات الزراعية الكلية في لبنان). وتوقف 78% من مزارعي المحافظات الجنوبية عن أنشطتهم، فيما نزح نحو 76.8% منهم خارج قراهم.

### تفاصيل أضرار المحاصيل والبنى التحتية:
* **الأشجار المثمرة والزيتون:** تضرر واحترق نحو 3,462 شجرة زيتون تاريخية، 898 شجرة تفاح، 569 شجرة كرز جبلي، 477 شجرة لوز، 410 أشجار أفوكادو، إضافة لعشرات المزارع والحمضيات الساحلية.
* **الخيم البلاستيكية (الدفيئات):** تضررت 732 خيمة لإنتاج الطماطم (البندورة)، و230 خيمة لزراعة الخيار، إلى جانب العشرات من الدفيئات المخصصة للخضار والزراعات المحمية.
* **الممتلكات والعقارات الحقلية:** تضرر 3,020 عقاراً مزروعاً بمحصول القمح المروي والبعلي، و1,689 عقاراً لزراعة التبغ الجنوبي، و803 عقارات لإنتاج البطاطا، مما يفرز أزمة حقيقية في الأمن الغذائي للمواسم الزراعية الحالية واللاحقة.`,
    contentEn: `According to calculations presented by the Lebanese Ministry of Agriculture, designed and checked in coordination with international bodies (including the United Nations Development Programme - UNDP, Food and Agriculture Organization - FAO, and World Food Programme - WFP), direct physical damages in southern agricultural areas due to recent cross-border hostilities (active heavily since March of this year) are estimated at $41.2 million.

### Category Breakdown of Loss and Damage:
* **Direct Property Damage:** Encompasses soil-burning and chemical degradation, destruction of specialized nurseries and orchards, and deep hits to essential irrigation pipelines, pumping equipment, and storage wells. An estimated 1,380 hectares of land need full ecological reclamation and physical rehabilitation.
* **Sustained Production Loss:** Around 56,320 hectares are subject to massive seasonal yield losses because farmers are physically locked out of dangerous combat zones and local logistical channels are severely severed. The aggregate market value of lost agricultural output is computed at $530.5 million.
* **Forced Displacement:** Approximately 51,956 hectares of farmland (representing 22.5% of Lebanon’s total cultivable land surface) has been heavily impacted. About 78% of local farmers in the southern governorates have suspended their production, with 76.8% being forcibly displaced.

### Crop and Infrastructure Losses Impacted:
* **Orchards & Olive Groves:** Direct destruction hit 3,462 olive trees, 898 apple trees, 569 cherry trees, 477 almond trees, 410 avocado crops, and vast areas of coastal citrus gardens.
* **Greenhouses (Plastic Canopies):** Major structural and crop damages hit 732 tomato greenhouses and 230 cucumber greenhouses, alongside numerous structural tunnels allocated for summer vegetables.
* **Cultivated Commercial Holdings:** Severe damage targeted 3,020 active holdings of wheat crops, 1,689 holdings of southern tobacco fields, and 803 holdings of potato crops, creating long-term food security bottlenecks for current and upcoming seasonal harvests.`,
    author: {
      nameAr: 'مازن برّازي',
      nameEn: 'Mazen Barazy',
      titleAr: 'محلل الشؤون الإقليمية والمالية',
      titleEn: 'Regional & Financial Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1464241353293-0f4ec87f1285?auto=format&fit=crop&q=80&w=1200',
    date: '28 أبريل 2026',
    readTimeAr: '4 دقائق قراءة',
    readTimeEn: '4 min read',
    isFeatured: false,
    views: 6512,
    tags: ['Agriculture', 'War Damages', 'Southern Lebanon', 'UNDP', 'FAO', 'WFP', 'Economic Impact']
  },
  {
    id: 'us-intel-trump-netanyahu-lebanon',
    category: 'translations',
    titleAr: 'المخابرات الأمريكية تحذر ترامب: حملة نتنياهو في لبنان تهدد اتفاق السلام بين الولايات المتحدة وإيران',
    titleEn: 'US Intelligence Warns Trump: Netanyahu’s Lebanon Campaign Threatens US-Iran Peace Deal',
    summaryAr: 'ملاحظة: التقرير التالي هو ملخص مترجم ومعدل عن تقرير نشرته صحيفة واشنطن بوست.\n\nأفاد مسؤولون أمريكيون أن مخابرات الولايات المتحدة حذرت ترامب رسمياً من أن إصرار نتنياهو على مواصلة العمليات في لبنان يهدد بانهيار اتفاق السلام الناشئ مع طهران.',
    summaryEn: 'Note: The following report is a translated and edited summary of a report published by The Washington Post.\n\nUS intelligence agencies formally warned the Trump administration that Israeli Prime Minister Netanyahu is prepared to undermine a nascent US-Iran peace deal to ensure his political survival in Lebanon.',
    contentAr: `*ملاحظة: التقرير التالي هو ملخص مترجم ومعدل عن تقرير نشرته صحيفة واشنطن بوست.*

أفاد مسؤولون أمريكيون حاليون وسابقون أن وكالات المخابرات الأمريكية حذرت رسمياً إدارة ترامب بشأن رئيس الوزراء الإسرائيلي بنيامين نتنياهو. ففي ظل مواجهته لضغوط داخلية هائلة لمواصلة الحرب في لبنان، تفيد التقارير أن نتنياهو مستعد لاتخاذ إجراءات قد تقوض بشكل مباشر جهود الرئيس دونالد ترامب الرامية إلى التوصل لاتفاق سلام دائم مع إيران.

ووفقاً للتقارير الاستخباراتية التي تم تداولها هذا الأسبوع، لا تزال إسرائيل عازمة على مواصلة عملياتها العسكرية ضد حزب الله في لبنان. ويتعارض هذا الهدف بشكل صارخ مع عنصر أساسي في الاتفاق الأمريكي الإيراني الناشئ، والذي يطالب صراحة بإنهاء الأعمال العدائية على الأراضي اللبنانية.

ويأتي هذا التحليل الاستخباراتي وسط تزايد التوتر بين حكومة نتنياهو وإدارة ترامب. فقد وجه مسؤولون أمريكيون تحذيرات علنية لإسرائيل، مشددين على أن تصعيد الهجمات ضد حزب الله قد يعرقل الانفراجة الدبلوماسية التي حققها الرئيس.

وتجلت هشاشة الوضع يوم الجمعة عندما شنت إسرائيل موجة من الغارات الجوية على جنوب لبنان. وجاءت هذه الضربات رداً على هجوم بطائرة مسيرة تابعة لحزب الله أسفر عن مقتل أربعة جنود إسرائيليين. ومع تصاعد الاشتباكات عبر الحدود، أكد مسؤولون أمريكيون وإيرانيون تأجيل المحادثات المقررة في سويسرا. ونتيجة لذلك، أرجأ نائب الرئيس جيه دي فانس، الذي كان من المقرر أن يترأس الوفد الأمريكي، رحلته الدبلوماسية.

ويحذر المحللون من أنه إذا صعّد نتنياهو الحملة العسكرية في لبنان، فإنه يخاطر بانهيار الإطار الاتفاقي الذي وقعته واشنطن وطهران يوم الأربعاء. علاوة على ذلك، قد تؤدي مثل هذه الخطوة إلى إحداث شرخ في علاقته الحيوية مع الرئيس الأمريكي - وهي العلاقة التي كانت تاريخياً محورية لبقاء رئيس الوزراء الإسرائيلي سياسياً.

وقد تطرق الرئيس ترامب علناً إلى هذا الخلاف خلال مؤتمر صحفي في فرنسا يوم الأربعاء أثناء إعلانه عن "مذكرة التفاهم" الأمريكية الإيرانية. وأقر بوجود "خلاف بسيط حول لبنان" مع القيادة الإسرائيلية، مشيراً إلى أنه حث نتنياهو على عدم "تدمير مبنى في كل مرة يدخله شخص من حزب الله".

وأشار مسؤول أمريكي مطلع على التقرير الاستخباراتي، تحدث شريطة عدم الكشف عن هويته، إلى أن التقييم يربط بشكل مباشر بين بقاء نتنياهو السياسي قبيل الانتخابات الوطنية هذا الخريف وبين موقفه العسكري. وللحفاظ على مكانته الداخلية، يجب على نتنياهو أن يثبت لقاعدته الشعبية أنه لن يسحب قواته من لبنان وأنه مستعد لتصعيد المواجهة مع حزب الله.

كما يسلط الملف الاستخباراتي الضوء على إحباط إسرائيلي عميق تجاه شروط مذكرة ترامب. ويشير مسؤولون حاليون وسابقون إلى أن إسرائيل تنظر إلى الاتفاق كعقبة أمام استراتيجيتها الأوسع المتمثلة في ممارسة أقصى درجات الضغط على طهران، وتخشى أن يقيد الاتفاق بشدة حريتها العملياتية في الدفاع ضد حزب الله.

ورداً على ذلك، تصر إدارة ترامب على أن المذكرة لا تجرد إسرائيل من حقها في الرد إذا تعرضت لهجوم مباشر. ويجادل المسؤولون الأمريكيون بأنه يجب وزن مخاوف نتنياهو الإقليمية مقابل الضرورة الجيوسياسية الأوسع: وضع اللمسات الأخيرة على اتفاق يضمن إعادة فتح مضيق هرمز لتجنب أزمة اقتصادية عالمية.

ويخلص التقييم الاستخباراتي إلى أن أي تعليق للأعمال العدائية أو انسحاب عسكري من لبنان سيُفسر داخل إسرائيل على أنه هزيمة سياسية لرئيس الوزراء. ورداً على التحليل الأمريكي، أكد مسؤول إسرائيلي كبير، مستشهداً بالبروتول الحكومي، أن "النشاط العسكري الإسرائيلي في لبنان يهدف حصرياً إلى الدفاع عن المواطنين الإسرائيليين من الهجمات المستمرة لحزب الله".

ويميل الرأي العام في إسرائيل بشدة نحو تفكيك حزب الله، الفصيل المدعوم من إيران والذي شن هجمات صاروخية دعماً لحماس في أكتوبر 2023. وقد طالب عشرات الآلاف من السكان النازحين من شمال إسرائيل باتخاذ إجراءات حاسمة، مما عرض نتنياهو لانتقادات شديدة من مختلف الأطياف السياسية لفشله في تحييد التهديد. أظهر استطلاع للرأي أُجري في مايو من قبل معهد دراسات الأمن القومي، وهو مركز أبحاث إسرائيلي رائد، أن نسبة ساحقة تبلغ 70 في المائة من الإسرائيليين اليهود يؤيدون تكثيف القتال ضد حزب الله، ويتفق المحللون السياسيون الإسرائيليون على نطاق واسع على أن أي تراجع عسكري سيُفسر من قبل الناخبين على أنه علامة على الهزيمة.

ومع ذلك، يحذر المسؤولون الأمريكيون من أن الحسابات السياسية الداخلية لإسرائيل تشكل تهديداً خطيراً للاستقرار الإقليمي. وقدم مسؤول أمريكي ثانٍ تقييماً مستقلاً صريحاً: حتى لو تجنبت إسرائيل تصعيد القتال في لبنان من خلال قصف الضاحية الجنوبية لبيروت، معقل حزب الله، فإن رفضها سحب القوات البرية من جنوب البلاد سيقضي بشكل شبه مؤكد على الاتفاق الهش بين الولايات المتحدة وإيران.

وقال المسؤول: "الاستمرار في احتلال جزء من لبنان هو وصفة لكارثة. بدون انسحاب إسرائيلي كامل، فإن احتمال استئناف الأعمال العدائية بين [الجيش الإسرائيلي] وحزب الله أمر شبه مؤكد".`,
    contentEn: `*Note: The following report is a translated and edited summary of a report published by The Washington Post.*

Current and former U.S. officials report that American intelligence agencies have formally warned the Trump administration about Israeli Prime Minister Benjamin Netanyahu. Facing immense domestic pressure to sustain the campaign in Lebanon, Netanyahu is reportedly prepared to take steps that could directly undermine President Donald Trump’s efforts to secure a lasting peace agreement with Iran.

According to intelligence reports circulated this week, Israel remains determined to maintain its military operations against Hezbollah in Lebanon. This objective directly clashes with a key pillar of the emerging U.S.-Iran grand bargain, which explicitly demands an immediate cessation of hostilities on Lebanese soil.

The intelligence assessment arrives amid escalating friction between Netanyahu’s government and the Trump administration. U.S. officials have issued public warnings to Israel, emphasizing that escalating operations against Hezbollah risk derailing the president’s major diplomatic breakthrough.

The volatility of the theater was underscored on Friday when Israel launched a wave of intense airstrikes across South Lebanon. The strikes came in response to a Hezbollah drone strike that left four Israeli soldiers dead. As border escalation spiked, U.S. and Iranian officials confirmed that planned peace talks in Switzerland have been postponed. Consequently, Vice President JD Vance, who was scheduled to lead the American delegation, delayed his diplomatic departure.

Analysts warn that if Netanyahu escalates the Lebanon campaign, he risks crashing the landmark framework agreement signed by Washington and Tehran on Wednesday. Additionally, such a move could fracture his crucial relationship with the American president—a relationship that has historically been vital for the Israeli prime minister’s domestic political survival.

President Trump publicly addressed this political friction during a press conference in France on Wednesday while announcing the historic U.S.-Iran 'memorandum of understanding.' He acknowledged having a 'minor disagreement on Lebanon' with the Israeli leadership, stating he had cautioned Netanyahu against 'blowing up a physical structure every single time a Hezbollah member steps inside it.'

A U.S. official familiar with the classified brief, speaking on the condition of anonymity, noted that the assessment draws a direct line between Netanyahu's political survival ahead of the national elections scheduled this autumn and his aggressive military posture. To safeguard his domestic standing, Netanyahu must demonstrate to his base that he will not withdraw forces from Lebanon and remains prepared to escalate confrontations with Hezbollah.

The intelligence dossier also details a deep Israeli frustration regarding the terms of Trump's memorandum. Current and former officials indicate that Israel views the agreement as an obstacle to its broader strategy of maximum pressure on Tehran, fearing the deal will severely constrain its operational freedom to counter Hezbollah forces.

In response, the Trump administration insists that the memorandum does not strip Israel of its right to defend itself if directly targeted. U.S. officials argue that Netanyahu's regional anxieties must be weighted against a wider geopolitical imperative: finalizing a deal that guarantees the secure opening of the Strait of Hormuz to stave off a global economic shock.

The intelligence assessment concludes that any cessation of hostilities or unilateral troop withdrawal from Lebanon would be framed inside Israel as a primary political defeat for the prime minister. Responding to the American analysis, a senior Israeli official, citing government protocol, reiterated that 'Israeli military action in Lebanon is aimed purely at protecting Israeli citizens from non-stop Hezbollah rocket strikes.'

Israeli public sentiment leans heavily toward thoroughly dismantling Hezbollah, the Iran-backed faction that launched rocket barrages in solidarity with Hamas in October 2023. Tens of thousands of evacuated residents from northern Israel have demanded decisive action, leaving Netanyahu exposed to intense criticism from across the political spectrum for failing to neutralize the threat. An opinion poll conducted in May by the Institute for National Security Studies (INSS), a leading Israeli think tank, showed that an overwhelming 70 percent of Jewish Israelis favor intensifying the offensive against Hezbollah. Israeli political analysts widely agree that any military scale-back would be interpreted by voters as a signal of surrender.

U.S. officials, however, warn that Israel's domestic calculations pose a direct threat to regional stability. A second U.S. official offered a blunt independent assessment: even if Israel avoids escalating air operations in Lebanon by sparing Hezbollah's main strongholds in Beirut's southern suburbs (Dahieh), its refusal to withdraw ground forces from the south would almost certainly derail the fragile U.S.-Iran accord.

The official warned: 'Sustaining an occupation of any part of Lebanon is a recipe for disaster. Without a complete Israeli troop withdrawal, the renewal of full hostilities between the IDF and Hezbollah is virtually guaranteed.'`,
    author: {
      nameAr: 'واشنطن بوست (ترجمة خاصة للورّاق)',
      nameEn: 'The Washington Post (Translated for Al-Warraq)',
      titleAr: 'مكتب الأمن القومي الاستخباري واشنطن',
      titleEn: 'National Security Desk, Washington'
    },
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=600',
    date: '19 يونيو 2026',
    readTimeAr: '4 دقائق قراءة',
    readTimeEn: '4 min read',
    isBreaking: true,
    isFeatured: true,
    views: 12560,
    tags: ['Donald Trump', 'Netanyahu', 'US-Iran Accord', 'Lebanon Campaign', 'Washington Post', 'US Intelligence']
  },
  {
    id: 'israel-escalation-logic-lebanon',
    category: 'lebanon',
    titleAr: 'منطق التصعيد: لماذا تكثف إسرائيل هجماتها على الجبهة الجنوبية للبنان؟',
    titleEn: 'The Logic of Escalation: Why Israel Toughens Strikes on Lebanon’s Southern Front',
    summaryAr: 'تفصيل تكتيكي وجيوسياسي للأبعاد والركائز الثلاث التي تدفع الجيش الإسرائيلي لتوسيع رقعة القصف والتدمير الشامل على جبهة جنوب لبنان وفصل الساحات.',
    summaryEn: 'An in-depth geopolitical inspection focusing on the three design pillars anchoring the recent sharp Israeli escalation in Lebanon and the border restructure.',
    contentAr: `إن التصعيد الحاد والأخير في العمليات العسكرية الإسرائيلية في جميع أنحاء لبنان ليس مجرد نوبة عنف عشوائية، ولا هو مجرد رد فعل تكتيكي على إطلاق النار عبر الحدود. وإذا ما نظرنا إلى هذا التصعيد من منظور الجغرافيا السياسية الإقليمية الكلية والاستراتيجية العسكرية، فإنه يمثل تحولاً مدروساً من جانب المؤسسة الإسرائيلية لإعادة صياغة الهيكل الأمني لحدودها الشمالية. ولفهم السبب وراء بلوغ هذا القصف هذه الدرجة من الحدة، يجب علينا أن ننظر إلى ما هو أبعد من حصيلة الضحايا اليومية، وأن ندرس الركائز الهيكلية الثلاث التي تقود الحملة الإسرائيلية الحالية.

### ١. كسر "وحدة الساحات"
منذ اندلاع حرب غزة، تمثلت استراتيجية حزب الله المعلنة في "وحدة الساحات" — أي الحفاظ على جبهة مستمرة ومضبوطة في جنوب لبنان لتشتيت الموارد العسكرية الإسرائيلية، وربط وقف إطلاق النار في لبنان بوقف إطلاق النار في غزة.
وتُعد الحملة الإسرائيلية المكثفة محاولة مباشرة لفصل هذين المسرحين بالقوة. ومن خلال رفع تكلفة هذا التضامن إلى مستويات لا يمكن تحملها، يهدف الجيش الإسرائيلي إلى فرض ترتيب دبلوماسي مستقل في لبنان. ويتمثل الهدف النهائي في استغلال التفوق الجوي الساحق لتدمير البنية التحتية الحدودية لحزب الله مادياً وهيكلياً، وبالتالي فرض تنفيذ الأمر الواقع — إن لم يكن التفاوضي — لقرار مجلس الأمن الدولي رقم 1701، ودفع قوات الرضوان النخبوية التابعة للحزب إلى شمال نهر الليطاني.

### ٢. الحسابات السياسية الداخلية
الحرب سياسية بطبيعتها، والبقاء الداخلي للقيادة الإسرائيلية الحالية يعتمد بشكل كبير على الحفاظ على حالة الحرب.
* **نازحو الشمال:** لا يزال عشرات الآلاف من المواطنين الإسرائيليين نازحين من المستوطنات الشمالية. ولا يمكن لأي حكومة إسرائيلية أن تستمر على المدى الطويل دون إعادتهم إلى ديارهم بأمان. ويُسوّق تكثيف الضربات داخلياً على أنه "تمهيد الأرض" الضروري لاستعادة الحياة المدنية في الشمال.
* **البقاء السياسي:** يعمل الصراع الممتد والواسع كدرع للمؤسسة السياسية ضد الضغوط الداخلية المتزايدة، والدعوات لإجراء انتخابات مبكرة، والتحقيقات في الإخفاقات الاستخباراتية. إن تحويل التركيز إلى حملة عالية الكثافة ضد خصم أكثر قوة في لبنان يحشد القاعدة الداخلية المنقسمة حول تهديد أمني وجودي واضح.

### ٣. نافذة إعادة التشكيل الإقليمي
نشهد فترة من التقلبات الكبيرة على مستوى الاقتصاد الكلي والجغرافيا السياسية في الشرق الأوسط. ومع الاضطرابات الأخيرة في أسواق الطاقة — بما في ذلك الصدمات والحلول اللاحقة المحيطة بمضيق هرمز — فإن ميزان القوى الإقليمي يشهد حالة من التغير المستمر. وترى إسرائيل أن هناك نافذة استراتيجية تضيق تدريجياً لتدمير ما تعتبره التهديد التقليدي الأكثر إلحاحاً بالنسبة لها.
* **التدمير الاستباقي:** تسود عقيدة داخل مؤسسة الدفاع الإسرائيلية مفادها أن المواجهة الشاملة مع ترسانة الذخائر الموجهة بدقة التي يمتلكها حزب الله أمر حتمي. ويُنظر إلى التصعيد الحالي على أنه تدمير استباقي لتلك الأصول، بينما يظل الوجود العسكري الأمريكي في المنطقة قوياً بما يكفي لردع حرب إقليمية أوسع نطاقاً وغير مقيدة تنخرط فيها طهران.
* **إعادة رسم قواعد الردع:** لقد ماتت قواعد الاشتباك لما قبل عام 2023. وتستغل إسرائيل الفوضى الحالية لإرساء معادلة ردع جديدة وغير متناسبة، في إشارة إلى أن أي تهديد لحدودها لن يُقابل بضربات متبادلة، بل بدمار هائل وغير متكافئ للبنية التحتية.

### مسار محفوف بالمخاطر
هذا التصعيد المدروس هو مقامرة هائلة. تراهن إسرائيل على قدرتها على دفع لبنان إلى حافة الانهيار الشامل للبنية التحتية دون إثارة حريق إقليمي شامل عن طريق الخطأ، وهو ما تدعي أنها ترغب في تجنبه.
بالنسبة للبنان — الذي يعاني بالفعل من هشاشة اقتصادية عميقة — فإن هذا يعني أن الجبهة الجنوبية قد تحولت من ساحة "مساندة" إلى بؤرة رئيسية لحرب هيكلية مدمرة. وإلى أن تنفد الفائدة السياسية لهذا التصعيد بالنسبة للمؤسسة الإسرائيلية، أو إلى أن تتفوق الضغوط الدبلوماسية الدولية على المنطق العسكري، فمن المرجح أن تظل سماء لبنان مزدحمة، ولن تزداد الضربات إلا قسوة وتدميراً.`,
    contentEn: `The sharp, recent escalation of Israeli military operations across Lebanon is not merely an arbitrary outbreak of violence, nor is it a simple tactical reaction to cross-border fire. When analyzed through the prism of macro regional geopolitics and military strategy, it represents a calculated shift by the Israeli establishment to reshape the security architecture of its northern border. To understand why this bombardment has reached such intensity, we must look beyond the daily casualty counts and examine the three structural pillars driving the current Israeli campaign.

### 1. Breaking "Unity of the Arenas" (Wahdat al-Sahat)
Prior to this phase, Hezbollah's declared strategy centered on "Unity of the Arenas"—maintaining a calibrated, continuous front in South Lebanon to tie down Israeli military resources, linking any ceasefire in the north to a ceasefire in Gaza.
The intensive Israeli military effort is a direct attempt to forcefully sever this connection. By driving the cost of solidarity to unsustainable heights, the IDF intends to impose an independent diplomatic framework for Lebanon. The endgame is to leverage air superiority to structurally destroy Hezbollah's border presence, enforcing a de facto—if not negotiated—realization of UN Security Council Resolution 1701 and pushing elite Radwan units north of the Litani River.

### 2. Domestic Political Calculus
War is political by nature, and the domestic survival of the current Israeli leadership depends heavily on sustaining a state of high-intensity operations.
* **Northern Evacuees:** Tens of thousands of Israeli civilians remain displaced from northern settlements. No Israeli administration can survive long-term without bringing them home. The escalation is marketed domestically as the necessary "ground preparation" to secure the north.
* **Political Protection:** Prolonged, comprehensive conflict shields the political establishment from domestic friction, early election calls, and official commissions of inquiry into intelligence security failures. Pivoting to a high-profile campaign against a more formidable adversary in Lebanon unifies a fractured domestic constituency around a clear existential challenge.

### 3. A Window of Regional Restructuring
We are witnessing a period of immense macroeconomic and geopolitical flux in the Middle East. With recent energy disruptions—including shock and subsequent solutions around the Strait of Hormuz—the regional balance shifts continuously. Israel identifies a closing strategic window to proactively degrade what it deems its most immediate conventional threat.
* **Pre-emptive Degradation:** A doctrine prevails inside Israel's defense establishment that an all-out clash with Hezbollah's precision-guided munitions (PGMs) is inevitable. The current operations are viewed as pre-emptive degradation of these assets while US military deployment in the region remains robust enough to deter a wider, unchecked regional conflict involving Tehran.
* **Establishing Unbalanced Deterrence:** Pre-2023 rules of engagement are obsolete. Israel is seizing the current chaos to define a new, highly disproportionate equation, signaling that any violation of its frontiers will meet not symmetrical responses, but overwhelming infrastructural consequences.

### A Perilous Trajectory
This calculated escalation is an immense gamble. Israel bets it can push Lebanon to the brink of structural breakdown without inadvertently triggering a wider regional conflagration.
For Lebanon—already enduring steep economic fragility—the southern front has evolved from a secondary theater of "solidarity" into the absolute center of a destructive war of attrition. Until the domestic political mileage of this campaign diminishes, or diplomatic leverage overrides military impulses, Lebanon's skies will remain congested with strikes that only grow more aggressive.`,
    author: {
      nameAr: 'وحدة الرشد ومتابعة شؤون المشرق العربي',
      nameEn: 'Levant Intelligence Desk',
      titleAr: 'مفتش أول شؤون استراتيجية',
      titleEn: 'Senior Regional Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600',
    date: '19 يونيو 2026',
    readTimeAr: '5 دقائق قراءة',
    readTimeEn: '5 min read',
    isBreaking: false,
    isFeatured: true,
    views: 8430,
    tags: ['Israel', 'Lebanon Conflict', 'Hezbollah', 'Geopolitics', 'Litani River']
  },
  {
    id: 'ali-al-taher-investigation',
    category: 'exclusives',
    titleAr: 'الأهمية الجغرافية والاستراتيجية لتلة علي الطاهر',
    titleEn: 'The Geographic and Strategic Core of Ali Al-Taher Hill in South Lebanon Operations',
    summaryAr: 'الأهمية الجغرافية والاستراتيجية لتلة علي الطاهر في مسرح العمليات المعقد لحرب جنوب لبنان، والسيطرة النارية وطرق الإمداد الحيوية.',
    summaryEn: 'An in-depth analysis of the topographical dominance of Ali Al-Taher hill, investigating its tactical line of sight, key logistic chokepoints, and operations.',
    contentAr: `في مسرح العمليات المعقد لحرب جنوب لبنان، غالباً ما تكون التضاريس نفسها هي الخصم الأكثر ضراوة. وطوال هذا الصراع المستمر، تركز الاهتمام العسكري مراراً وتكراراً على معالم طبوغرافية رئيسية تتحكم في مسار المعارك. ومن بين أكثر هذه النقاط الساخنة حرجاً مرتفعات علي الطاهر، وهي سلسلة تلال مرتفعة تشكل محوراً جغرافياً للسيطرة على القطاع الجنوبي بأكمله.

وعلى الرغم من أن "علي الطاهر" ليست بلدة مدنية مترامية الأطراف بحد ذاتها، إلا أن هذه التلة ترتبط ارتباطاً وثيقاً بالبلدات والقرى المحيطة بها، مثل كفرتبنيت وأرنون. ويكشف فهم جغرافيتها بوضوح عن السبب الذي جعلها ساحة لأعنف المواجهات بين القوات الإسرائيلية وحزب الله.

### السياق الجغرافي والموقع
تقع مرتفعات علي الطاهر في منطقة شمال نهر الليطاني، وتحديداً إلى الشرق مباشرة من مدينة النبطية، الحاضرة الرئيسية للجنوب. وتقع التلة في مواجهة قلعة الشقيف التاريخية، وهي نقطة مراقبة شاهقة أخرى شهدت عقوداً من الحروب.

يمنح هذا الموقع المتميز للمرتفعات إشرافاً بانورامياً حاكماً على القطاع الشرقي لجنوب لبنان. وتتميز الطبوغرافيا هنا بالمنحدرات الشديدة والتضاريس الوعرة، مما يجعل أي هجوم بري أمراً بالغ الصعوبة، ويعتمد بشكل كبير على الآليات المدرعة والمشاة الذين يضطرون للتحرك عبر ممرات ضيقة ويمكن التنبؤ بها بدقة.

### القيمة الاستراتيجية للمرتفعات
إن معركة علي الطاهر لا تتعلق مجرد بالاستيلاء على الأرض، بل بالهيمنة على البيئة العملياتية بأكملها. وتتحدد قيمتها الاستراتيجية من خلال عدة عوامل رئيسية:

* **الإشراف على النبطية:** لا تمثل النبطية مجرد مركز حضري كبير فحسب، بل هي مركز ثقل ديموغرافي وعسكري حيوي في الجنوب، حيث شكلت تاريخياً معقلاً لـ "وحدة بدر" التابعة لحزب الله. وتطل تلة علي الطاهر على المداخل الشرقية والجنوبية الشرقية للمدينة؛ وبالتالي، فإن أي قوة عسكرية تتمركز فوق هذه المرتفعات يمكنها فرض طوق ناري فعال حول النبطية، مما يهدد بتطويقها دون الحاجة للدخول الفوري في حرب شوارع مكلفة ومستنزفة داخل الأحياء السكنية.
* **السيطرة النارية وبراعة الرصد:** في الحروب الحديثة، يعد خط الرؤية المباشر والارتفاع من الركائز الأساسية لتوجيه مدفعية الهاون، وإطلاق الصواريخ الموجهة المضادة للدروع (ATGMs)، وتنسيق ضربات الطائرات المسيرة. وتوفر السيطرة على سلسلة تلال علي الطاهر نقطة مراقبة لا مثيل لها لمراقبة التحركات عبر حوض نهر الليطاني وعمق الوديان المحيطة.
* **قطع خطوط الإمداد الحيوية:** تتقاطع أسفل التلة طرق إمداد رئيسية تربط جنوب لبنان بالباقع والأراضي الواقعة شمال نهر الليطاني. ونظراً لأن وادي البقاع يمثل العمق الاستراتيجي وخزان الإمداد الرئيسي، فإن السيطرة على علي الطاهر تمكّن الجيش المتقدم من قطع خطوط التعزيز هذه مادياً وبصرياً، مما يؤدي إلى عزل القوات المدافعة جنوب الليطاني.
* **حصن دفاعي طبيعي:** بالنسبة للقوات المدافعة، تعمل المرتفعات كحاجز طبيعي؛ حيث تتيح التضاريس الوعرة بناء بنية تحتية محصنة تحت الأرض، وخنادق ومخابئ مموهة، ومنصات إطلاق مخفية يصعب استهدافها من الجو، بينما يتطلب اقتحامها برياً خوض مخاطر جسيمة.

### محور صراع عام 2026
خلال التصعيد العنيف في منتصف عام 2026، تحولت مرتفعات علي الطاهر إلى خط الجبهة الأمامي الرئيسي عقب اندفاع الجيش الإسرائيلي لتأمين منطقة قلعة الشقيف المجاورة. وفي محاولة لتوسيع "الحزام الأمني" والتقدم بعمق أكبر نحو النبطية، وجه الجيش الإسرائيلي أرتالاً ضخمة من المدرعات والمشاة نحو التلة.

وفي المقابل، استغلت القوات المدافعة الجغرافيا لصالحها بشكل كامل؛ فإدراكاً منها بأن الدبابات المتقدمة مجبرة على سلوك مسارات شديدة الانحدار ومعلومة مسبقاً للوصول إلى المرتفعات، قامت باستدراج الأرتال إلى "مناطق تقتيل" (Kill Zones) معدة مسبقاً عند قاعدة الطرف الشمالي للتلة، مستخدمة التضاريس لتنفيذ كمائن مدمرة بالصواريخ المضادة للدروع. وحوّل هذا الأمر المنطقة إلى عنق زجاجة خطير، مما أثبت أن امتلاك العتاد العسكري المتطور يمكن صده وتقييده أمام واقع التضاريس الجبلية الوعرة لجنوب لبنان.

### خلاصة
تمثل مرتفعات علي الطاهر النموذج الكلاسيكي للقاعدة العسكرية التي تقول: "من يسيطر على المرتفعات، يملي شروطه على المعركة". إن قربها من النبطية، وإشرافها الكامل على حوض الليطاني، وقدرتها على الفصل بين الجنوب والبقاع، يجعل منها مركز ثقل محلي حاسم. وفي حرب الجنوب، لا تعد علي الطاهر مجرد تلة يراد السيطرة عليها، بل هي أداة جغرافية حاسمة قادرة على قلب ميزان العمليات العسكرية في المنطقة بأكملها.`,
    contentEn: `In the complex theater of operations of the South Lebanon conflict, terrain is often the fiercest adversary. Throughout this ongoing tension, military attention has repeatedly converged on critical topographical features that dictate the flow of battle. Among the most critical of these hotspots is the Ali Al-Taher heights—a high-altitude ridge line that acts as a geographic anchor for operational dominance over the entire southern sector.

Although not a major civilian urban town center in its own right, Ali Al-Taher is inextricably linked to surrounding villages such as Kfar Tibnit and Arnoun. Understanding its geography explains why it has consistently been the stage for intensive combat between IDF forces and Hezbollah defense units.

### Geographic Context and Location
The Ali Al-Taher heights are situated north of the Litani River, specifically east of the major southern city hub of Nabatiyeh. The ridge directly faces the historic Beaufort Castle, another towering observation post that has witnessed decades of warfare.

From this strategic altitude, the heights possess a commanding, panoramic line of sight over the eastern sector of South Lebanon. Topography here is characterized by steep declines and uneven, rocky ground, making offensive armor movement highly difficult and restricted to predictable, narrow transport corridors.

### Strategic Value of the Heights
The struggle over Ali Al-Taher is not merely about holding soil—it is about commanding the local operational ecosystem:

* **Overlooking Nabatiyeh:** Nabatiyeh functions as a population center and the logistical powerhouse of the South. The Ali Al-Taher hill sits over the eastern and southeastern access points of the city. A force holding the ridge can establish a highly effective fire envelope over Nabatiyeh, throttling supply access without deploying forces in costly urbano-guerilla street battles.
* **Fire Control & Precision Targeting:** In modern conflicts, absolute height translates to unmatched tracking and targeting capability for mortar guidance, Anti-Tank Guided Missiles (ATGMs), and loitering munitions. Holding the ridge line grants clean sight over the Litani riverbed and neighboring valleys.
* **Severing Supply Corridors:** Major routes connecting South Lebanon to the eastern Bekaa Valley converge below the slopes of Ali Al-Taher. Since the Bekaa serves as Hezbollah's strategic depth, controlling Ali Al-Taher allows an advancing team to physically and visually isolate field elements deployed south of the Litani.
* **Natural Fortress Potential:** For defender nodes, the heights operate as a robust shield. The rough terrain permits the integration of deep subsurface tunnels, disguised bunkers, and concealed launchers that resist aerial surveillance.

### The 2026 Conflict Crux
During the escalation of mid-2026, the Ali Al-Taher heights became the front-line threshold as the IDF attempted to expand its security buffer and push deeper toward Nabatiyeh. 

Defending elements leveraged the terrain. Knowing that advancing tanks had to ascend steep, predictable paths, defenders successfully channeled mechanized divisions into pre-planned "killing zones" at the base of the hill's northern face. Employing heavy ATGM salvos, they turned the mountain base into a tactical roadblock, reinforcing how raw mechanical advances are constrained when encountering the rugged highlands of South Lebanon.

### Conclusion
Ali Al-Taher exemplifies the classic military doctrine: "He who controls the high ground, dictates the terms of the engagement." Its proximity to Nabatiyeh, total line of sight over the Litani, and leverage over supply junctions between the South and the Bekaa marks it as a key gravity point in the theater.`,
    author: {
      nameAr: 'وحدة الرصد والتحقيقات الاستقصائية',
      nameEn: 'Investigation Desk',
      titleAr: 'مفتش أول لجريدة الوراق',
      titleEn: 'Senior Al-Warraq Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
    date: '19 يونيو 2026',
    readTimeAr: '7 دقائق قراءة',
    readTimeEn: '7 min read',
    isBreaking: true,
    isFeatured: true,
    views: 12450,
    tags: ['Ali Al-Taher', 'South Lebanon', 'Topography', 'Military Strategy']
  },
  {
    id: 'excl-starlink-lebanon',
    category: 'research-reports',
    titleAr: 'دمج الأقمار الصناعية لستارلينك ومخاطر الاتصالات في لبنان',
    titleEn: 'Starlink Satellite Integration and Communication Risks in Lebanon',
    summaryAr: 'تحليل صارم للمخاطر يدرس دمج خدمات الإنترنت الفضائي من ستارلينك (Starlink) في البنية التحتية في لبنان، مع التحقيق في التجاوزات التنظيمية، والفراغات القانونية، والسيادة على البيانات الرقمية في ظل أطر استثنائية.',
    summaryEn: 'A rigorous risk model examining the integration of Starlink satellite internet services into Lebanese infrastructure, highlighting regulatory exceptions, legal gaps, and digital sovereignty under state emergencies.',
    contentAr: `يفحص هذا التحليل للمخاطر دمج خدمات إنترنت الأقمار الصناعية من ستارلينك في مشهد الاتصالات اللبناني اعتباراً من يونيو 2026.

1. الملخص التنفيذي
في أعقاب قرار الحكومة اللبنانية في أوائل عام 2026 بتوسيع ترخيص ستارلينك، تم وضع الخدمة كأداة احتياطية استراتيجية للبنية التحتية الحيوية. ومع ذلك، فإن النشر السريع والتفويض الممنوح لوزارة الاتصالات قد تجاوزا الضمانات التنظيمية القياسية، مما أثار مخاوف كبيرة بشأن السيادة الرقمية، وخصوصية البيانات، والمساءلة المؤسسية.

2. تقييم المخاطر التنظيمية والقانونية
الوضع الحالي
الإطار القانوني: العمل بموجب مرسوم حكومي يمنح وزارة الاتصالات (MoT) سلطة الترخيص المباشرة.

الأهلية: تقتصر حالياً على المؤسسات الحكومية، والسفارات، والمنظمات غير الحكومية، وشركات تجارية مرخصة مختارة. وتبقى الاشتراكات السكنية والفردية محظورة تماماً.

الامتثال: يجب استيراد جميع المعدات عبر الموزعين المعتمدين (مثل ألفا - Alfa) واجتياز موافقة الهيئة المنظمة للاتصالات (TRA). الاستيراد الخاص غير قانوني.

يخضع ترخيص ستارلينك في لبنان لسلسلة من قرارات ومراسيم مجلس الوزراء، أبرزها الترخيص الأولي الممنوح في سبتمبر 2025 والتوسعة في مارس 2026، والتي هدفت إلى تسريع الخدمة وسط "ظروف استثنائية".

2.1. الأساس القانوني
لا تخضع الخدمة لتصريح تجاري قياسي في السوق المفتوحة بل لإطار ترخيص "انتقالي" و"طارئ".

سلطة الترخيص: تم تفويض السلطة مباشرة إلى وزير الاتصالات، متجاوزة فعلياً الرقابة التقليدية للهيئة المنظمة للاتصالات (TRA) ومجلس شورى الدولة.

الكيان المشغل: تم تأسيس شركة تابعة محلية باسم "ستارلينك-لبنان" لتكون حامل الترخيص الرسمي والمحور التشغيلي للامتثال.

2.2. الأهلية والوصول (قاعدة "للأعمال فقط")
تقتصر الخدمة بصرامة على الاستخدام المؤسسي والتجاري. وتبقى الاشتراكات السكنية أو المنزلية الفردية غير قانونية.

الكيانات المصرح لها:

المؤسسات الحكومية والوكالات العامة.

السفارات والبعثات الدبلوماسية.

المنظمات غير الحكومية (NGOs) والمنظمات الإنسانية.

الشركات التجارية المرخصة (مثل البنوك، والمؤسسات الصناعية، والتعليمية).

المحظورات: يُحظر تماماً استخدام ستارلينك للأغراض السكنية الخاصة أو من قبل الموظفين الذين يعملون من المنزل باستخدام أجهزة توفرها الشركة. كما تُحظر خدمات التجوال العالمي للسياح أو الزوار.

2.3. الشروط التشغيلية والفنية
التحكم في الأجهزة: الاستيراد الخاص لأجهزة ستارلينك غير قانوني. يجب استيراد جميع المعدات حصرياً عبر "ستارلينك-لبنان" أو الموزعين المعتمدين من الحكومة (مثل ألفا) ويجب أن تجتاز إجراءات "اعتماد النوع" (Type Approval) الإلزامية من الهيئة المنظمة للاتصالات (TRA) وإجراءات التخليص الجمركي.

تقاسم الإيرادات: تتضمن الاتفاقية ترتيباً لتقاسم الإيرادات بنسبة 25% مع الدولة اللبنانية، بالإضافة إلى الضرائب والرسوم التنظيمية القياسية.

التسعير: حُددت الباقات التجارية الرسمية لتبدأ بحد أدنى 100 دولار/شهرياً، مع تكلفة أجهزة للمجموعات المؤسسية تتراوح من 350 إلى 580 دولاراً.

السياج الجغرافي والرقابة (Geofencing & Oversight): تحتفظ الهيئة المنظمة للاتصالات (TRA) بسياج جغرافي صارم للمحطات النشطة لضمان استخدامها فقط في المواقع التجارية المسجلة.

2.4. الخلافات الرئيسية والفجوات التنظيمية
خلقت طبيعة "المسار السريع" للنشر مخاوف تشريعية وأمنية كبيرة:

مركز الرقابة الأمنية: في حين تطلبت الإصدارات السابقة من الترخيص إنشاء مركز رقابة أمنية محلي للمراقبة، تسمح التعديلات الأخيرة بمواصلة العمليات قبل إنشاء هذه البنية التحتية بالكامل، مما يثير مخاوف بشأن قدرة الحكومة على تنظيم أو تأمين حركة مرور البيانات.

سيادة البيانات: يفتقر الإطار حالياً إلى متطلبات محددة لتوطين البيانات (تخزين البيانات على الأراضي اللبنانية)، مما يعني أن حركة المرور — حتى بالنسبة للبنية التحتية الحيوية — قد يتم توجيهها عبر محطات أرضية أجنبية.

غياب التوازن التنافسي: تعرض القرار لانتقادات لكونه "شبكة موازية" تتجنب الإصلاحات الهيكلية اللازمة للبنية التحتية الوطنية للإنترنت، مع خلق طبقة متميزة من الاتصال في الوقت نفسه لأولئك الذين يستطيعون تحمل تكاليف الاشتراكات التجارية المرتفعة.

3. خصوصية البيانات ومخاطر الأمن السيبراني
3.1 المخاطر القانونية الرئيسية
التجاوز المؤسسي: تجاوزت عملية الترخيص الحالية مجلس شورى الدولة والدور الرقابي التقليدي للهيئة المنظمة للاتصالات (TRA)، مما خلق سابقة قانونية خطيرة لصنع السياسات في حالات "الطوارئ".

السلطة المفوضة: من خلال مركزة السلطة داخل وزارة الاتصالات (MoT)، ألغت الحكومة آلية "الضوابط والتوازنات" (check-and-balance) التي توفرها عادة الأجهزة الأمنية والجهات التنظيمية المستقلة.

فراغ الإنفاذ (Enforcement Lacuna): بدون مركز رقابة أمنية نهائي وعامل، تفتقر الحكومة إلى البنية التحتية المادية لمراقبة أو تنظيم حركة المرور كما هو منصوص عليه في الاتفاقيات الأولية، مما قد يجعل العقود القانونية الحالية غير قابلة للتنفيذ.

3.2 فراغ البيانات
يفتقر لبنان حالياً إلى قانون شامل وحديث لحماية البيانات الشخصية. التكامل مع مزود أجنبي مثل ستارلينك، الذي يشغل بنية شبكته العالمية الخاصة، يؤدي إلى تفاقم نقاط الضعف الحالية:

سيادة البيانات: توجد مخاوف بشأن مكان توجيه وتخزين بيانات المستخدمين. إذا تم توجيه حركة المرور عبر محطات أرضية أجنبية، فقد تخضع للأنظمة القانونية الأجنبية (مثل قانون CLOUD الأميركي) بدلاً من القانون اللبناني.

الافتقار إلى معايير التشفير: لا يوجد دليل على وجود معايير تشفير موحدة بتفوض حكومي للأنظمة المتكاملة مع ستارلينك في لبنان، مما يترك البيانات المؤسسية عرضة للاعتراض إذا لم يتم تأمينها بشكل مستقل.

التعرض لأطراف ثالثة: يُظهر التاريخ الحديث نمطاً من افتقار المنصات الحكومية لسياسات الخصوصية أو البروتولات الأمنية القوية. إن دمج ستارلينك بدون بوابة وطنية آمنة وخاضعة للمراجعة يهدد بتعريض البيانات الإنسانية والحكومية الحساسة لجهات فاعلة خبيثة متطورة.

3.3 المقارنة المعيارية والتكامل الاستراتيجي
لتقييم نموذج الدمج في لبنان مقابل نظرائه الإقليميين، يجب تطبيق المعايير التالية:

الكيان القانوني المحلي: وجود شركة تابعة محلية إلزامية كحامل للترخيص. (لبنان: كيان "ستارلينك-لبنان" موجود).

توطين البيانات: تخزين محلي إلزامي للبيانات الحيوية. (لبنان: غائب؛ لا يوجد متطلب مفروض حالياً).

الرقابة الأمنية: مركز وطني متكامل للمراقبة السيبرانية. (لبنان: مخطط له، ولكنه غير عامل حالياً).

الدور التنظيمي: جهة تنظيمية مستقلة. (لبنان: يخضع لتقدير الوزارة).

3.4. ملخص المخاطر المحددة
سياسية/جيوسياسية: الاعتماد على نظام فضائي أجنبي يفرض تبعية لجهة فاعلة غير تابعة لدولة يمكنها إيقاف الخدمة أو تقييدها جغرافياً بسبب ضغوط جيوسياسية خارجية.

اقتصادية: بينما تحسن ستارلينك من المرونة، فإن الافتقار إلى نقاط تبادل الإنترنت المحلية (IXPs) يعني أن حتى حركة مرور الأقمار الصناعية غالباً ما يتم توجيهها بشكل غير فعال، مما يفشل في معالجة الضعف الأساسي للبنية التحتية الرقمية الداخلية في لبنان.

أمنية: يتيح الانتشار "الطارئ" ثغرات محتملة للمراقبة ويضعف قدرة الدولة على حماية الخصوصية الرقمية لمواطنيها، ولا سيما الفئات الضعيفة التي تخدمها المنظمات الإنسانية غير الحكومية.

التوصية: للتخفيف من هذه المخاطر، ينبغي على الحكومة اللبنانية إعطاء الأولوية للتفعيل الرسمي لمركز الأمن/الرقابة المستقل وصياغة قانون شامل لحماية البيانات ليحل محل الفراغ التشريعي الحالي. علاوة على ذلك، يظل تحويل حركة المرور نحو نقاط تبادل الإنترنت (IXPs) المحلية هو الحل الوحيد القابل للتطبيق على المدى الطويل لتحقيق سيادة رقمية حقيقية، بغض النظر عن تكنولوجيا الوصول (الأقمار الصناعية مقابل الألياف الضوئية).

4. السياق التنظيمي
يُصنف إدخال ستارلينك في لبنان من قبل الحكومة كإجراء مرونة طارئ وليس توسعاً تجارياً قياسياً.

4.1 الإطار "الاستثنائي"
وصول مقيد: تقتصر المشاركة على الهيئات الحكومية، والسفارات، والمنظمات غير الحكومية، وشركات تجارية مرخصة مختارة. الاستخدام الفردي/السكني يبقى محظوراً تماماً لمنع تجاوز إيرادات الاتصالات التي تسيطر عليها الدولة وللحفاظ على السيطرة التنظيمية.

سلطة الترخيص: تخضع العملية لمراسيم وقرارات حكومية بدلاً من مناقصة عامة مفتوحة. وهذا يمنح وزارة الاتصالات (MoT) سلطة تقديرية واسعة في اختيار الكيانات المؤهلة، مما يتجاوز فعلياً الرقابة التي توفرها عادة الهيئة المنظمة للاتصالات (TRA) ومجلس الشورى.

التحكم في المعدات: يجب استيراد جميع المحطات الطرفية عبر "ستارلينك-لبنان" أو الموزعين المعتمدين من الحكومة (مثل ألفا). الاستيراد الخاص غير قانوني، وأي محطة يجب أن تخضع لعملية "اعتماد النوع" (Type Approval) التي تشمل التخليص الأمني والجمركي الإلزامي.

4.2. الفجوات التشريعية في خصوصية البيانات
الإطار القانوني في لبنان للحقوق الرقمية متخلف بشكل أساسي، مما يخلق نقاط ضعف كبيرة لمستخدمي الخدمات عالية التقنية مثل ستارلينك.

الفراغ التشريعي لعام 2018: القانون رقم 81/2018 (المعاملات الإلكترونية والبيانات ذات الطابع الشخصي) هو النظام الأساسي الحاكم، ولكنه لا يزال غير مفعل إلى حد كبير بسبب غياب هيئة إشرافية مستقلة.

غياب الإنفاذ: تعمل وزارة الاقتصاد والتجارة (MoET) كجهة تنظيمية بحكم الأمر الواقع، لكنها تفتقر إلى القدرة الفنية المتخصصة، والموظفين، وآليات المساءلة اللازمة لإنفاذ حماية البيانات.

عدم اليقين بشأن البيانات العابرة للحدود: يفشل القانون رقم 81 في وضع معايير صارمة لنقل البيانات دولياً. ولأن بنية ستارلينك تعتمد على محطات أرضية عالمية، فقد تعبر بيانات المستخدمين الولايات القضائية (مثل الولايات المتحدة أو أوروبا)، مما قد يخضعها لقانون CLOUD الأميركي أو أنظمة قانونية أجنبية أخرى غالباً ما تتعارض مع وسائل الحماية المحدودة الممنوحة للمواطنين اللبنانيين.

غياب "الخصوصية حسب التصميم": لا توجد تفويضات قانونية تلزم ستارلينك أو شركائها المحليين بتنفيذ "الخصوصية حسب التصميم" (Privacy by Design) أو معايير تشفير محددة. يترك هذا الخدمة — والبيانات الإنسانية/الحكومية الحساسة التي تنقلها — عرضة للاعتراض.

4.3. مخاطر الأمن السيبراني والبنية التحتية
اعتماد لبنان على النطاق الترددي الدولي، حتى بالنسبة لحركة المرور المحلية، يخلق أوجه قصور نظامية لا تعالجها ستارلينك إلا جزئياً.

نقطة الضعف "الداخلية": يؤكد تحليل الخبراء (على سبيل المثال، من SMEX ومراجعات البنية التحتية) أن الخطر الرئيسي في لبنان هو خطر داخلي. إن الافتقار إلى نقاط تبادل الإنترنت (IXPs) المحلية يعني أن البيانات، حتى عند إرسالها عبر ستارلينك، غالباً ما تشهد توجيهاً غير فعال.

المراقبة والرقابة: غياب إطار مخصص لمسؤولية المنصة يعني أن الحجب والرقابة يظلان رهن تقدير وزارة الاتصالات (MoT) ومكتب مكافحة جرائم المعلوماتية في قوى الأمن الداخلي (ISF). غالباً ما يكون الأساس القانوني لذلك مذكرة داخلية بدلاً من تشريع واضح وشفاف، مما يسهل النشاط خارج نطاق القضاء.

نتائج التقييم الأمني للمؤسسات: تضع التقييمات الحديثة على مستوى البلاد (مثل جمعية الإنترنت - Internet Society) نضج الأمن السيبراني في لبنان عند حوالي 30/100. إن دمج كوكبة أقمار صناعية عالية السرعة في بنية تحتية تتميز بكلمات مرور "مضمنة" (hardcoded)، ونقص التشفير في التطبيقات العامة، ونقاط ضعف في قواعد البيانات القديمة يوسع بشكل كبير مساحة الهجوم للجهات الفاعلة الحكومية وغير الحكومية.

4.4. المقارنة المعيارية
الكيان المحلي: المعيار الإقليمي يفرض شركة تابعة محلية للمساءلة. (لبنان: تم تأسيس "ستارلينك-لبنان").

توطين البيانات: تخزين محلي إلزامي للبيانات الحيوية. (لبنان: غائب).

الرقابة المستقلة: سلطات مستقلة لحماية البيانات/الأمن السيبراني. (لبنان: غائب، تسيطر عليه الوزارة).

التدقيقات الأمنية: تدقيقات أمنية/معمارية دورية إلزامية. (لبنان: غير متسقة/غير محددة).

4.5. التوصيات الاستراتيجية
لكي يكون الدمج آمناً، فإن التحولات التالية ضرورية:

الرقابة المستقلة: إنشاء هيئة مستقلة وفعالة لحماية البيانات (DPA) لنقل مسؤولية الإنفاذ بعيداً عن الوزارات السياسية.

نقاط تبادل الإنترنت المحلية (IXPs): إعطاء الأولوية لتطوير نقاط تبادل إنترنت محلية لضمان عدم عبور البيانات المحلية للمحطات الأرضية الأجنبية أو المسارات الخارجية دون داعٍ.

بروتوكول أمني موحد: تشريع معايير تشفير إلزامية وخاضعة لتدقيق الدولة لأي جهة تستخدم ستارلينك في العمليات الحكومية أو الإنسانية الرسمية.

الإصلاح التشريعي: تعديل القانون رقم 81/2018 لتعريف "الموافقة" بوضوح ووضع قيود محددة على سلطة الحكومة في اعتراض البيانات الموجهة عبر مزودي خدمات الأقمار الصناعية.`,
    contentEn: `This security audit structures a deep-dive sovereign vulnerability report tracking the rapid deployment model of SpaceX's Starlink terminals in Lebanon as of June 2026.

1. Executive Summary
Following emergency ministerial orders, Lebanon incorporated satellite relays to preserve institutional and security connection parameters. However, the regulatory bypasses surrounding type approvals expose critical networks to severe data privacy vacuums and foreign jurisdictional monitoring.

2. Legal Status and Restrictions
- Authority: Temporary emergency warrants delegated exclusively to the Ministry of Telecommunications (MoT) bypass legislative state advisory oversight.
- Access Boundaries: Highly localized to corporate operations, designated embassies, and validated international NGOs. Civilian subscriptions and roaming services are strictly geo-blocked.
- Supply Chains: Terminal kits must clear Alfa or Touch designated customs channels. Parallel imports remain highly illegal.

3. Cyber Vulnerabilities & Lack of Localization
- Cross-Border Handoffs: Since Lebanon has not legislated robust personal data privacy laws, data routed through starlink networks is processed out of local sovereign borders, subjecting sensitive state elements to US CLOUD Act or host intelligence gathering operations.
- Interception risk: There is no state-audited cryptographic container or secure local gateway monitoring platform, widening attack surfaces.`,
    author: {
      nameAr: 'مكتب التحقيقات الاستقصائية الميدانية',
      nameEn: 'Field Investigations Unit',
      titleAr: 'محلل أول وباحث استقصائي',
      titleEn: 'Senior Investigative Analyst',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600',
    date: '18 يونيو 2026',
    readTimeAr: '٨ دقائق قراءة',
    readTimeEn: '8 min read',
    isBreaking: true,
    isFeatured: true,
    views: 4509,
    tags: ['Starlink Lebanon', 'Sovereign Comms', 'Cyber Risk']
  },
  {
    id: 'excl-1',
    category: 'exclusives',
    titleAr: 'تحقيق خاص: كواليس المفاوضات الإقليمية لترسيم شبكة الطاقة الذكية الكبرى للجنوب العالمي',
    titleEn: 'Special Investigation: Behind the Scenes of Regional Talks on the Global South Super-Grid',
    summaryAr: 'وثائق حصرية تكشف عن تقدم ملموس في صياغة ميثاق السيادة الطاقية المشترك والربط العابر للقارات بين عواصم القرار والإنتاج الجديدة.',
    summaryEn: 'Exclusive documents reveal significant progress in drafting the joint energy sovereignty charter and transcontinental grids linking capital hubs.',
    contentAr: 'حصلت "جريدة الوارّاق" على مسودات حصرية تكشف عن بلورة تفاهمات استراتيجية كبرى بين أطراف إقليمية ودولية بهدف تأسيس أول منظومة موحدة لإرساء ممرات توزيع طاقة بديلة ذكية. ويتضمن المشروع شبكة عملاقة من خلايا التوليد الهيدروجيني والمائي، مدعومة ببنية تحتية برمجية تديرها برمجيات مفتوحة المصدر بالكامل لضمان الاستقلال التكنولوجي.\n\nوتشير التقارير السرية المرفقة بالملفات إلى أن التمويل سيتم صياغته ضمن مبادرة السندات السيادية المستدامة بمشاركة بنوك تنموية كبرى، مما يضع حدًا للاحتكارات التقليدية ويفسح المجال لعقد تنموي مستدام ومتكافئ.',
    contentEn: 'Al-Warraq News has obtained exclusive drafts revealing strategic understandings between regional and international parties to establish the first unified network of smart alternative energy distribution corridors. The project comprises a mega-grid of hydrogen and hydro generation cells, backed by an open-source software infrastructure to secure absolute technological independence.\n\nConfidential charts attached to the files indicate that financing will be structured under a sustainable sovereign bonds initiative with major development Banks, putting an end to classic monopolies and opening paths for an equitable development pact.',
    author: {
      nameAr: 'وحدة الرصد والتحقيقات الاستقصائية',
      nameEn: 'Investigation Desk',
      titleAr: 'مراسل الوراق الخاص',
      titleEn: 'Al-Warraq Special Envoy'
    },
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
    date: '16 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    isBreaking: true,
    isFeatured: true,
    views: 8945,
    tags: ['Global South', 'Energy', 'Sovereignty']
  },
  {
    id: 'excl-2',
    category: 'exclusives',
    titleAr: 'مخطط لوجستي استراتيجي لنقل مركز الثقل الملاحي إلى الموانئ الفتية في البحر الأحمر',
    titleEn: 'Strategic Logistic Blueprint Shifts Shipping Center of Gravity to Red Sea Ports',
    summaryAr: 'دراسة جدلية سرية توصي بإنشاء خمس منصات تبادل صناعي حر متكاملة متجاوزة موانئ الساحل الغربي التقليدية.',
    summaryEn: 'Concealed feasibility study recommends constructing five integrated free industrial swap platforms, bypassing classic West Coast structures.',
    contentAr: 'تكشف وثائق تداولها مجلس المخططين الإقليميين عن تبني رؤية جريئة لتحويل مسارات الملاحة والتصنيع الخفيف عبر تدشين خمس مناطق إعفاء ضريبي وجمركي متكاملة على ساحل البحر الأحمر. هذه الموانئ المصممة بمواصفات القرن الحادي والعشرين ستعتمد بالكامل على رافعات ومستوعبات كهرومغناطيسية ومنظومات فرز آلية مستقلة.\n\nمن شأن هذا التحول الهيكلي تقليل فترات انتظار السفن بنسبة 40%، وجذب رؤوس أموال آسيوية وأوروبية تبحث عن استقرار لوجستي فريد وسرعة نفاذ للأسواق النامية.',
    contentEn: 'Confidential strategic designs circulated by regional planning boards showcase a bold blueprint to shift traditional shipping and light manufacturing routes by launching five zero-tariff custom zones on the Red Sea. These 21st-century-tier ports are engineered to operate on advanced electromagnetic cranes and automated container sorting architectures.\n\nThis structural pivot will cut vessel waiting times by 40%, capturing massive Asian and European capital seeking unrivaled logistic resiliency and hyper-fast access to emerging global markets.',
    author: {
      nameAr: 'فريق الاستخبارات الاقتصادية',
      nameEn: 'Economic Intel Team',
      titleAr: 'محلل أول لجريدة الوراق',
      titleEn: 'Senior Al-Warraq Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600',
    date: '15 يونيو 2026',
    readTimeAr: '4 دقائق',
    readTimeEn: '4 min read',
    isFeatured: false,
    views: 6512,
    tags: ['Logistics', 'Maritime', 'Trade']
  },
  {
    id: 'desk-mou',
    category: 'editor-desk',
    titleAr: 'الآن بعد توقيع مذكرة التفاهم بين الولايات المتحدة وإيران، ماذا بعد؟؟ وما الذي ستجنيه من ذلك؟',
    titleEn: 'Now that the US-Iran MOU is Signed: What Next? And Who Stands to Benefit?',
    summaryAr: 'يبقى أن نرى ما إذا كان الإطار الدبلوماسي الذي طورته إدارة ترامب بمساعدة باكستان وقطر سيولد نتائج إيجابية لبقية الشرق الأوسط، إلا أن تسريع مشروعات الالتفاف الطاقي واللوجستي بات واجباً مصيرياً لدول المنطقة من أجل البقاء.',
    summaryEn: 'While it remains to be seen if the new diplomatic framework will yield stability, the rapid adaptation of bypass corridors and energy routes has become a sovereign necessity for regional powers.',
    contentAr: 'كان تأثير حرب إيران عام 2026 حتى الآن سلبياً إلى حد كبير على مصالح الأمن القومي الأمريكي والاستقرار الإقليمي، ويبقى أن نرى ما إذا كان الإطار الدبلوماسي الذي طورته إدارة ترامب بمساعدة باكستان وقطر سيولد نتائج إيجابية لبقية منطقة الشرق الأوسط.\n\nولكن أحد الآثار التي خلفتها الحرب بالفعل هو تحفيز العديد من دول المنطقة على تكييف استراتيجياتها الاقتصادية والتجارية بسرعة لتقليل اعتمادها على الوصول إلى مضيق هرمز. فبعد أن أغلقت إيران في الغالب نقطة الاختناق البحرية الحاسمة هذه في الأيام الأولى للحرب، وما تلا ذلك من أسابيع مليئة بالدبلوماسية المتقطعة، تحركت بعض أغنى دول المنطقة بسرعة لتكييف نهجها من أجل البقاء على اتصال بالاقتصاد العالمي. كان هذا أولوية خاصة لدول الخليج التي وضعت خططاً طموحة للتحول الاقتصادي على مدى العقد الماضي وجعلت أهداف الاستثمار هذه جزءاً مركزياً من استراتيجيات الأمن القومي الخاصة بها.\n\nأدى عدم التوازن الناجم عن حرب إيران الأخيرة هذه إلى دفع شركاء أمريكا في الخليج إلى تعديل خطوط التجارة والإمداد الخاصة بهم، وتكملة الممرات الحالية، وتكثيف الاستثمارات العالمية لتنويع محافظهم الاستثمارية وتعزيز أمنهم الاقتصادي. بعض هذه المشاريع، مثل الممر الاقتصادي بين الهند والشرق الأوسط وأوروبا (IMEC)، لها جداول زمنية طويلة، وسيتطلب الكثير منها تكييف الخطط والتصورات الأصلية.\n\nتتضمن العينة الموجزة للمشاريع التي ظهرت أو تم إعطاؤها الأولوية كرد فعل على عدم الاستقرار الذي أحدثته الحرب ما يلي:\n\n**توسيع شبكات خطوط الأنابيب:** أعلنت الإمارات العربية المتحدة أنها ستسرع في بناء خط أنابيب الغرب-الشرق للتحايل على الاضطرابات في إمدادات الطاقة العالمية الناجمة عن حصار إيران لمضيق هرمز. هذا الخط الجديد، وهو الثاني في الإمارات الذي يتجاوز المضيق، سيضاعف قدرة التصدير للبلاد عبر ميناء الفجيرة. كما زادت المملكة العربية السعودية من تدفق النفط الخام عبر خط أنابيب شرق-غرب (بترولاين)، والذي يتجاوز مضيق هرمز من خلال السماح بالصادرات من ميناء ينبع على البحر الأحمر. وفي أبريل، أعلنت السعودية أن خط الأنابيب قد وصل إلى طاقته التشغيلية الكاملة، حيث ينقل 7 ملايين برميل يومياً. وفي أوائل يونيو، وافق مجلس الوزراء العراقي على تسريع صادرات النفط الخام عبر خط أنابيب كركوك-جيهان. وإذا عملت هذه الشبكة بكامل طاقتها، فإن الصادرات العراقية ستتضاعف أكثر من ثلاث مرات، لتخفف الضغط على اقتصادها المعتمد على النفط، على الرغم من أن النزاع التعاقدي طويل الأمد مع تركيا يجعل هذا مستبعداً.\n\n**اتصالات جديدة بين الموانئ:** تحركت كل من الإمارات والسعودية بسرعة رداً على إغلاق مضيق هرمز لزيادة كفاءة التجارة ولوجستيات سلسلة التوريد. على سبيل المثال، أعلنت هيئة موانئ وجمارك ومناطق حرة في الشارقة عن منصة متعددة الوسائط، وهي مجمع الذيد اللوجستي، لربط شبكة موانئ الإمارات على الساحل الغربي بالساحل الشرقي. بالإضافة إلى ذلك، أنشأت الهيئة العامة للموانئ السعودية وشركة "غلفتينر" ممراً جديداً يجمع بين العبور البحري والبري لزيادة الكفاءة عبر الحدود بين الدمام والشارقة.\n\n**مشاريع سكك حديدية جديدة عبر شبه الجزيرة العربية:** في أبريل، اتفقت شركة قطار الاتحاد الإماراتية ووزارة النقل الأردنية على تطوير شبكة سكك حديدية مشتركة كجزء من حزمة استثمارات إماراتية بقيمة 5.5 مليار دولار للأردن. وبالمثل، أطلقت شركة الخطوط الحديدية السعودية (سار) ممراً دولياً لنقل البضائع يربط الموانئ الشرقية في المملكة بالحديثة على طول الحدود الأردنية، مما يقلل أوقات الشحن إلى النصف مقارنة بالنقل البري.\n\n**استمرار الاستثمارات في الاقتصادات العالمية الكبرى، بما في ذلك الولايات المتحدة:** لم توقف حرب إيران عام 2026 تدفق الاستثمارات من الخليج إلى الاقتصادات العالمية الكبرى. على سبيل المثال، في خضم عدم الاستقرار هذا، أعادت الإمارات تأكيد التزامها باستثمار 1.4 تريليون دولار في الولايات المتحدة على مدار 10 سنوات في قطاعات مختلفة، بما في ذلك توليد الطاقة والبنية التحتية للطاقة وتصنيع الألومنيوم.\n\nهذه مجرد أربعة أمثلة للمشاريع التي تسعى إليها دول المنطقة على الرغم من حالة عدم اليقين التي أحدثتها الحرب، وهذا الدافع الأساسي لمضاعفة الجهود وتعميق الاتصال بالشبكة العالمية هو ما يجب أن تشجعه السياسة الأمريكية وتجعله جزءاً أساسياً من استراتيجيتها "طويلة الأمد" للشرق الأوسط في ثلاثينيات القرن الحالي.\n\n**اتخاذ نظرة طويلة الأمد للسياسة الأمريكية في المنطقة**\nمن غير المرجح أن تحل الاتفاقية المقرر توقيعها هذا الأسبوع بين إيران والولايات المتحدة (والتي لم يتم الكشف عن تفاصيلها) جميع المشكلات التي كانت موجودة قبل بدء الحرب. لكن رد الفعل البناء للعديد من دول المنطقة لاستيعاب دروس هذا الصراع والتكيف بسرعة مع التركيز على المستقبل طويل الأمد يُعد نموذجاً يجب على صناع السياسة الأمريكيين اتباعه.\n\nبينما تحاول إدارة ترامب التفاوض على صفقة أكثر شمولاً مع إيران تعمل على استقرار المنطقة، يجب أن تدرك أن هذا المسار الدبلوماسي سيستغرق على الأرجح وقتاً أطول بكثير من الجدول الزمني المقترح البالغ 60 يوماً. وبالتوازي مع معالجة القضايا الملحة قصيرة الأجل، يجب على الإدارة تطوير جهد طويل الأجل لتشجيع المزيد من الاستثمار وإنشاء ممرات نقل وشبكات خطوط أنابيب لدعم دول الشرق الأوسط في سعيها لتصبح مراكز إقليمية وعالمية متنوعة بشكل متزايد.\n\n- **دمج سوريا:** يجب أن يكون دمج سوريا في الاقتصاد الإقليمي والعالمي أولوية قصوى للسياسة الأمريكية للمساعدة في معالجة الألم الاقتصادي وتسهيل النمو الاقتصادي.\n- **دعم لبنان:** إذا نجحت صفقة أمريكية-إيرانية في التوصل إلى حل بين إسرائيل وحزب الله، يجب على الولايات المتحدة تمويل واستثمار مشاريع البنية التحتية والنقل وإمكانات الغاز الطبيعي في لبنان لدمج البلاد في الاقتصاد العالمي.\n\nيمكن أن يكون هذا النهج وسيلة لإشراك الشركاء الإقليميين الرئيسيين الذين زارهم الرئيس ترامب خلال رحلته في مايو 2025 إلى السعودية وقطر والإمارات. ويمكن أن يركز على توسيع مفاهيم مثل (IMEC) لتشمل المزيد من الدول وتعزيز أمن سلسلة التوريد.\n\nتمتد العديد من هذه المشاريع إلى ما بعد عام 2030 ولن تقدم إغاثة فورية من المشاكل الملحة، بما في ذلك الألم الاقتصادي الذي خلقته الحرب. لكن وضع رؤية طويلة الأمد مستنيرة بدروس الصراع حول ضعف نقاط الاختناق الرئيسية من شأنه أن يساعد في بناء منطقة أكثر استقراراً. لقد أجبرت الحرب دول المنطقة على جعل أنظمتها أكثر مرونة وكفاءة، ويجب أن تستمر في البناء على تلك المكاسب. للمضي قدماً، يجب على الولايات المتحدة الاستفادة من هذا الزخم لجعل الشرق الأوسط أكثر تنوعاً ومرونة وترابطاً، مما سيخدم الأمن والمصالح الاقتصادية الأمريكية والإقليمية على المدى الطويل.',
    contentEn: 'The impact of the 2026 Iran war has so far been largely negative for US national security interests and regional stability. It remains to be seen whether the diplomatic framework developed by the Trump administration, with assistance from Pakistan and Qatar, will generate positive outcomes for the rest of the Middle East.\n\nHowever, one of the effects the war has already yielded is stimulating several countries in the region to quickly adapt their economic and trade strategies to reduce reliance on the Strait of Hormuz. After Iran mostly closed this crucial maritime chokepoint in the early days of the war, followed by weeks of fitful diplomacy, some of the region\'s wealthiest nations acted swiftly to adjust their approach to remaining connected to the global economy. This was a particular priority for Gulf nations that had set ambitious economic transformation plans over the past decade, making these investment goals central to their national security strategies.\n\nThe imbalance resulting from this recent Iran war has driven America\'s Gulf partners to adjust their trade and supply lines, complement existing corridors, and step up global investments to diversify their portfolios and reinforce their economic security. Some of these projects, such as the India-Middle East-Europe Economic Corridor (IMEC), have long timelines, and many will require adjusting original plans and expectations.\n\nA brief sample of the projects that have emerged or been prioritized in response to the instability created by the war includes:\n\n**Pipeline Network Expansion:** The UAE announced it would accelerate the construction of the West-East Pipeline to bypass disruptions in global energy supplies caused by Iran’s blockade of the Strait of Hormuz. This new pipeline, the UAE’s second to bypass the strait, will double the country’s export capacity via the Port of Fujairah. Saudi Arabia also increased crude oil flows through the East-West Pipeline (Petroline), which bypasses the Strait of Hormuz by allowing exports from the Red Sea port of Yanbu. In April, Saudi Arabia announced that the pipeline had reached its full running capacity, transporting 7 million barrels per day. In early June, the Iraqi cabinet approved accelerating crude oil exports via the Kirkuk-Ceyhan pipeline. If fully operational, Iraqi exports would more than triple, easing pressure on its oil-dependent economy, although a long-standing contractual dispute with Turkey makes this unlikely.\n\n**New Port Connections:** Both the UAE and Saudi Arabia acted quickly in response to the closure of the Strait of Hormuz to increase trade efficiency and supply chain logistics. For example, the Sharjah Ports, Customs and Free Zones Authority announced a multimodal platform, the Al Dhaid Logistics Hub, to link the UAE\'s port network on the west coast to the east coast. Additionally, the Saudi Ports Authority (Mawani) and Gulftainer established a new overland-maritime corridor to boost cross-border efficiency between Dammam and Sharjah.\n\n**New Rail Projects Across the Arabian Peninsula:** In April, the UAE\'s Etihad Rail and the Jordanian Ministry of Transport agreed to develop a joint rail network as part of a $5.5 billion UAE investment package for Jordan. Similarly, Saudi Arabia Railways (SAR) launched an international freight corridor connecting the Kingdom\'s eastern ports to Al-Haditha along the Jordanian border, cutting transit times in half compared to road transport.\n\n**Continued Investments in Major Global Economies, Including the US:** The 2026 Iran war did not freeze the flow of Gulf investment into major global economies. For instance, amidst this instability, the UAE reaffirmed its commitment to invest $1.4 trillion in the United States over 10 years across various sectors, including power generation, energy infrastructure, and aluminum manufacturing.\n\nThese are just four examples of projects being pursued by countries in the region despite the uncertainty created by the war. This underlying drive to redouble efforts and deepen connectivity to the global network is what US policy should support and make a core part of its "long-run" Middle East strategy for the 2030s.\n\n**Taking a Long-Term View of US Policy in the Region**\nThe agreement scheduled to be signed this week between Iran and the United States (the details of which remain undisclosed) is unlikely to solve all the issues that existed before the war. But the constructive response of several regional states to absorb the lessons of this conflict and adapt quickly with a focus on the long-term future is a model US policymakers should follow.\n\nWhile the Trump administration attempts to negotiate a more comprehensive deal with Iran to stabilize the region, it must recognize that this diplomatic route will likely take much longer than the proposed 60-day timeline. In parallel with addressing pressing, short-term issues, the administration should develop a long-term effort to encourage more investment and the creation of transit corridors and pipeline networks to support Middle Eastern nations as they seek to become increasingly diversified regional and global hubs.\n\n- **Integrating Syria:** Integrating Syria into the regional and global economy should be a top priority for US policy to help address economic distress and facilitate economic growth.\n- **Supporting Lebanon:** If a US-Iran deal successfully reaches a resolution between Israel and Hezbollah, the US should fund and invest in infrastructure, shipping, and natural gas potential in Lebanon to integrate the country into the global economy.\n\nThis approach could be a way to engage key regional partners whom President Trump visited during his May 2025 trip to Saudi Arabia, Qatar, and the UAE. It could focus on expanding concepts like IMEC to include more countries and enhance supply chain security.\n\nMany of these projects extend beyond 2030 and will not offer immediate relief from pressing crises, including the economic pain the war has created. But adopting a long-term vision informed by the conflict\'s lessons on key chokepoint vulnerabilities would help build a more stable region. The war has forced regional countries to make their systems more resilient and efficient, and they must continue to build on those gains. Moving forward, the United States must leverage this momentum to make the Middle East more diversified, resilient, and interconnected—serving US and regional economic and security interests for the long term.',
    author: {
      nameAr: 'أديب الوارّاق',
      nameEn: 'Adeeb Al-Warraq',
      titleAr: 'رئيس التحرير العام',
      titleEn: 'Editor-in-Chief',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1542362567-b5809782d6c6?auto=format&fit=crop&q=80&w=1200',
    date: '17 يونيو 2026',
    readTimeAr: '9 دقائق',
    readTimeEn: '9 min read',
    isBreaking: true,
    isFeatured: true,
    views: 18950,
    tags: ['Sovereignty', 'Geopolitics', 'Diplomacy', 'Infrastructure']
  },
  {
    id: 'desk-1',
    category: 'editor-desk',
    titleAr: 'كلمة رئيس التحرير: صياغة الموثوقية في عصر الانفجار الخوارزمي وهشاشة المعرفة المتاحة',
    titleEn: 'From the Editor: Crafting Authenticity in an Age of Algorithmic Noise and Fragile Truths',
    summaryAr: 'بين بريق الصور الزائفة وضغوط الذكاء الاصطناعي التوليدي، يبقى التحقيق الميداني والتدقيق اللغوي والأخلاقي صمام الأمان الوحيد للفكر الإنساني.',
    summaryEn: 'Between simulated realities and synthetic pressures, field reporting and rigorous validation remain the sole shield for human contemplation.',
    contentAr: 'تطل علينا اليوم آلاف الكلمات والمصطلحات المصاغة بذكاء اصطناعي مكثف يفتقد للروح السياقية والعمق البشري. لم تعد المسألة تقتصر على سرعة نشر الخبر بل على القدرة على تفكيك دواعيه وعقد صلات منطقية بين الأحداث. إننا في جريدة الوارّاق نلتزم بمسار مهني صارم، يحترم عقل القارئ ويرفض الانسياق وراء رغبات جلب الزيارات والبحث عن التفاعل السطحي.\n\nالصحافة الحقيقية تبدأ من حيث تنتهي الخوارزمية؛ إنها كتابة التاريخ تحت ضغط الحاضر، وهذا التزام أخلاقي وحضاري لا نملك التخلي عنه.',
    contentEn: 'Thousands of synthetic words flood our eyes daily, generated by deep machine networks. They often lack contextual soul and human nuance. Today, the issue is not just the velocity of news delivery, but the capacity to deconstruct background motives and build logical coherence. Here at Al-Warraq News, we commit to absolute professional integrity, respecting analytical depth and refusing hollow clickbait trends.\n\nTrue journalism begins where algorithms terminate; it is the process of writing history under contemporary pressure, and this is a civilizational vow we will never compromise.',
    author: {
      nameAr: 'أديب الوارّاق',
      nameEn: 'Adeeb Al-Warraq',
      titleAr: 'رئيس التحرير العام',
      titleEn: 'Editor-in-Chief',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600',
    date: '16 يونيو 2026',
    readTimeAr: '5 دقائق',
    readTimeEn: '5 min read',
    isFeatured: false,
    views: 7421,
    tags: ['Journalism', 'AI', 'Ethics', 'Information']
  },
  {
    id: 'desk-2',
    category: 'editor-desk',
    titleAr: 'السيادة الثقافية وحماية الإرث المكتوب في زمن الرقمنة الفائقة والمكتبات الافتراضية',
    titleEn: 'Cultural Sovereignty: Preserving the Written Heritage in the Era of Infinite Digitization',
    summaryAr: 'كيف تساهم مطابع الورق والمخطوطات العتيقة في صيانة الوعي التاريخي وحماية الهويات المحلية ضد الهيمنة المعيارية الموحدة.',
    summaryEn: 'How physical print presses and ancient manuscripts assist in defending historical consciousness and protecting local identities against global homogenization.',
    contentAr: 'إن تسييل الثقافة وتحويل كل نتاج فكري إلى صيغ رقمية عابرة يهدد بذوبان التفاصيل اللحمية للتاريخ وشعوب الهوامش. إن المخطوط يملك ملمسًا وعمرًا ورائحة وهوية حِرفية لا يمكن نسخها في خوادم سحابية مجهولة الهوية. في مقالنا هذا، ندعو إلى حماية وتثمين المجموعات المكتبية العريقة وإطلاق مشاريع ترميم وطنية تضمن بقاء الكلمة الحية الملموسة شفيعًا لعقول الأجيال القادمة.',
    contentEn: 'The melting of cultural records and rendering of intellectual output into transient digital packets exposes fragile histories and marginalized societies to dissolution. A manuscript possesses texture, history, scent, and hand-crafted pride that cannot be captured in faceless servers. We advocate for defending ancient physical libraries and launching restorative policies assuring that the tangible word survives to anchor future minds.',
    author: {
      nameAr: 'د. يوسف بكر',
      nameEn: 'Dr. Yousef Bakr',
      titleAr: 'مدير الشؤون الفكرية لصحيفة الوارق',
      titleEn: 'Intellectual Affairs Director, Al-Warraq'
    },
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
    date: '14 يونيو 2026',
    readTimeAr: '5 دقائق',
    readTimeEn: '5 min read',
    isFeatured: false,
    views: 5201
  },
  {
    id: 'desk-eurobonds',
    category: 'editor-desk',
    titleAr: 'سراب الـ 22 سنتاً: كيف تعيد الحرب وتعثر الإصلاحات تشكيل قيمة استرداد سندات اليوروبوندز اللبنانية',
    titleEn: 'The 22-Cent Mirage: How War and Stalled Reforms Reshape the Recovery Value of Lebanon Eurobonds',
    summaryAr: 'تحليل استقصائي لتقرير "جولدمان ساكس" يكشف كيف تآكلت آفاق استرداد السندات السيادية اللبنانية، مما يفرض ضغوطاً هبوطية نحو 22 سنتاً بفعل التوقيت، وحجم الاقتطاع، وارتفاع عوائد التخارج.',
    summaryEn: 'An investigative analysis of the latest "Goldman Sachs" report reveals how the recovery outlook of Lebanese sovereign debt is deteriorating towards 22 cents, driven by timing traps, larger haircuts, and elevated exit yields.',
    contentAr: 'منذ تخلف لبنان التاريخي والكارثي عن سداد ديونه في مارس/آذار 2020، تقبع سندات اليوروبوندز السيادية في حالة من الشلل المالي. ومؤخراً، شهدت هذه السندات، التي يحملها مزيج من المصارف المحلية العالقة وصناديق الديون المتعثرة الأجنبية الجريئة، رحلة مضاربة جامحة في السوق الثانوية.\n\nفقد ارتفعت الأسعار من مستوى كئيب بلغ 6 سنتات للدولار في سبتمبر/أيلول 2024 لتصل إلى 31 سنتاً في أوائل مارس/آذار 2026، مدفوعة بتفاؤل عابر. إلا أن وطأة الجغرافيا السياسية الإقليمية سرعان ما أعادتها للانخفاض إلى حوالي 26 سنتاً.\n\nووفقاً لتحليل استقصائي حديث أجراه بنك الاستثمار العالمي "جولدمان ساكس" (Goldman Sachs)، فإن حتى هذا التقييم البالغ 26 سنتاً قد يكون مفرطاً في التفاؤل. فقد أدت حقائق الصراع الدائر في الشرق الأوسط والشلل في الإصلاحات المحلية إلى تغيير جذري في حسابات التعافي المالي في لبنان. وباتت مخاطر التقييم تميل بشدة نحو الانخفاض، وتتوقف على ثلاثة عوامل حاسمة.\n\nالركائز الثلاث لاسترداد اليوروبوندز:\n1. فخ التوقيت (التأخير في إعادة الهيكلة): أدى الصراع المتصاعد وخطر نشوب حملة عسكرية مطولة إلى تجميد أجندة الإصلاح الاقتصادي بشكل فعلي. وتوقفت محطات تشريعية حاسمة مثل قانون الاستقرار المالي وإعادة الودائع وتوزيع الخسائر، مما يؤجل الاتفاق مع صندوق النقد ويؤدي إلى خصم التدفقات النقدية المتوقعة على مدى فترة أطول، مما يقلل صافي القيمة الحالية (NPV).\n2. العبء الساحق للدين (الاستدامة والاقتطاعات "الهيركات"): دمار البنية التحتية والنزوح الهائل يعيقان القدرة الإنتاجية ويخفضان توقعات نمو الناتج المحلي الإجمالي الحقيقي والاسمي، مع تضخم عبء الدين العام لإعادة الإعمار. ويُقدر "جولدمان ساكس" حاجة المستثمرين لتقبل اقتطاع إضافي بنسبة 5% إلى 10% من قيمة الاسترداد مقارنة بتقديرات ما قبل الحرب.\n3. تكلفة المخاطر (ارتفاع عوائد التخارج): "عائد التخارج" (Exit Yield) هو معدل الخصم للتدفقات النقدية للسندات الجديدة. شروط التمويل الإقليمية ستكون أكثر صرامة، حيت يقوم المستثمرون بتسعير علاوة مخاطر جيوسياسية ضخمة، مما يجعل عوائد التخارج المتوقعة أعلى بنسبة 1% إلى 2% من السابق.\n\nحسابات شطب الديون بالتفصيل:\n- تأخير سنة واحدة في إعادة الهيكلة: يعادل أثر سلبي بـ -1.5 سنت لكل دولار.\n- زيادة بنسبة 5% في الاقتطاع الاسمي: يعادل أثر سلبي بـ -4.0 سنت لكل دولار.\n- زيادة بنسبة 1% في عائد التخارج: يعادل أثر سلبي بـ -2.0 سنت لكل دولار.\n\nمحاكاة السيناريوهات: ما قبل الحرب مقابل ما بعد الحرب:\n- السينارييو الأساسي لما قبل الحرب (حوالي 30 سنتاً): تاريخ مستهدف 2027، اقتطاع اسمي 65%، عائد تخارج 10%.\n- سيناريو ما بعد الحرب "المعتدل" (بين 22 و23 سنتاً): بافتراض تأخير لعام واحد، وزيادة الاقتطاع ليتراوح بين 65% و72%، وارتفاع عائد التخارج بـ 1% ليصل إلى 11%، تنخفض القيمة بأكثر من 7.5 سنت لتصطدم بـ 22 سنتاً.\n- سيناريو الشلل المطول (19.2 سنتاً): تأجيل عملية إعادة الهيكلة حتى 2030 مع عائد تخارج 11% واقتطاعات قصوى ينهي قيمة السندات عند عتبة 19.2 سنتاً فقط للدولار المكسور.\n\nفي الخلاصة، لم يعد سوق اليوروبوندز اللبنانية مجرد رهان محلي بل أصبح شديد الارتباط بالهزات الإقليمية. وإلى حين تأسيس زخم إصلاحي موثوق وتسوية النزاع، ستبقى القيمة الحقيقية لهذه الأصول النازفة عرضة للشطب التدريجي.',
    contentEn: 'Since Lebanon’s historic and catastrophic default on its sovereign debt in March 2020, its Eurobonds have languished in financial paralysis. Recently, these bonds—held by trapped local banks and bold foreign distressed debt funds—embarked on a wild speculative ride in the secondary market.\n\nPrices climbed from a dismal 6 cents on the dollar in September 2024 to 31 cents in early March 2026, fueled by fleeting geopolitical optimism. However, regional geopolitical adjustments dragged them back down to around 26 cents.\n\nAccording to a recent investigative analysis by Goldman Sachs, even this 26-cent valuation is overly optimistic. The realities of the active Middle East conflict and domestic reform paralysis have fundamentally altered Lebanon\'s financial recovery calculations. Valuation risks are tilted heavily to the downside, hinging on three critical pillars.\n\nThe Three Pillars of Eurobond Recovery:\n1. The Timing Trap (Restructuring Delays): The escalating regional conflict and risks of a protracted military campaign have frozen the country\'s economic reform agenda. Legislative steps like the Financial Stability Law and bank deposits restructuring are stalled, pushing any potential IMF agreement further away. In distressed debt, time is money; delayed restructuring forces investors to discount cash flows over a longer period, curbing Net Present Value (NPV).\n2. The Overwhelming Debt Burden (Sustainability and Haircuts): Physical destruction and massive internal displacement severely cripple productive capacity, lowering real and nominal GDP forecasts. Reconstruction needs will inflate public debt. To restore debt sustainability, Goldman Sachs estimates investors will have to accept an additional 5% to 10% haircut compared to pre-war models.\n3. The Cost of Risk (Elevated Exit Yields): The exit yield is the discount rate applied to post-restructuring bonds. Geopolitical risk premiums across the region have spiked. Consequently, exit yields on restructured Lebanese debt are projected to be 1% to 2% higher than anticipated before the escalation.\n\nSovereign Debt Simulation Parameters:\n- 1-Year delay in restructuring: -1.5 cents impact on recovery value.\n- 5% increase in nominal haircut: -4.0 cents impact on recovery value.\n- 1% increase in exit yield: -2.0 cents impact on recovery value.\n\nScenario Modeling: Pre-War vs. Post-War Outlooks:\n- Pre-War Baseline (~30 cents): Estimated restructuring in 2027, nominal haircut at 65%, exit yield at 10%.\n- "Moderate" Post-War Scenario (22 to 23 cents): Reflects a 1-year delay, an elevated haircut ranging between 65% and 72%, and an 11% exit yield. This knocks down recovery prospects to 22-23 cents.\n- Prolonged Paralysis Scenario (19.2 cents): If restructuring is delayed until 2030, with an 11% exit yield, recovery values collapse to just 19.2 cents on the dollar.\n\nUltimately, the Lebanese Eurobond market has ceased to be a simple bet on local political will; it is tightly bound to wider regional shifting currents. Until gunfire ceases and a reliable reform momentum is established, the recovery value of these distressed assets will slowly bleed.',
    author: {
      nameAr: 'أديب الوارّاق',
      nameEn: 'Adeeb Al-Warraq',
      titleAr: 'رئيس التحرير العام',
      titleEn: 'Editor-in-Chief',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600',
    date: '16 يونيو 2026',
    readTimeAr: '7 دقائق',
    readTimeEn: '7 min read',
    isFeatured: true,
    views: 9540
  },
  {
    id: 'desk-gdp',
    category: 'editor-desk',
    titleAr: 'الناتج المحلي الإجمالي الحقيقي: سيناريوهات الانكماش والصدمة التضخمية تحت وطأة الحرب',
    titleEn: 'Real GDP: Contraction Scenarios and Inflationary Shocks Under the Weight of War',
    summaryAr: 'تتبع تقديرات نمو الناتج المحلي الإجمالي في لبنان ثلاثة مسارات تترواح بين الركود والانهيار العميق بنسبة 16%، مصحوبة بارتداد تضخمي يلامس 20% بسبب صدمات سلاسل التوريد وارتفاع النقل.',
    summaryEn: 'Lebanon\'s real GDP trajectory follows three post-war scenarios ranging from flat economic stagnation to a devastating 16% collapse, coupled with a supply-driven 20% inflationary shock.',
    contentAr: 'تعتمد النمذجة الاقتصادية الحالية بشكل كبير على مدة الصراع. وتستنزف الحرب حالياً الاقتصاد اللبناني بما يقدر بنحو 75 مليون دولار يومياً (35 مليون دولار كأضرار مباشرة و40 مليون دولار كخسائر في الإيرادات). وبناءً على تطورات الوضع الجيوسياسي للفترة المتبقية من عام 2026، يتتبع الاقتصاديون ثلاثة سيناريوهات رئيسية:\n\nسيناريو وقف إطلاق النار (نمو 0%): إذا صمد وقف إطلاق النار بشكل دائم وتم تجنب حرب أوسع، يتوقع "بنك عوده" أن يصاب الناتج المحلي الإجمالي الحقيقي بالركود عند 0%. ورغم أن هذا يعد تراجعاً هائلاً عن تقديرات النمو السابقة، إلا أن هذا السيناريو يتجنب الانكماش الصريح، معتمداً بشكل كبير على مرونة تحويلات المغتربين والاستهلاك المحلي لإبقاء الاقتصاد واقفاً على قدميه.\n\nالصراع متوسط الأمد (انكماش بين 5% و10%): إذا استؤنفت الأعمال العدائية واستمرت طوال الصيف، فإن الأضرار الاقتصادية ستتعمق. ويتوقع "بنك عوده" انخفاضاً بنسبة 5% وفق هذا الإطار الزمني، بينما يحذر خبراء ماليون محليون آخرون من أن الشلل شبه التام في قطاعات الضيافة والزراعة والصناعة قد يؤدي إلى تراجع الناتج المحلي الإجمالي بنسبة تصل إلى 10%.\n\nحرب تستمر لعام كامل (انكماش بين 11% و16%): في حال استمر الصراع حتى نهاية عام 2026 دون التوصل إلى حل، فإن القاع الاقتصادي سينهار. وتتوقع التقديرات المحلية انكماشاً بنسبة 11%، في حين يتوقع معهد التمويل الدولي (IIF) انخفاضاً مدمراً في الناتج المحلي الإجمالي يتراوح بين 12% و16%.\n\nالصدمة التضخمية:\nعطل الصراع سلاسل التوريد بشكل خطير، وأدى إلى تضخم أقساط التأمين على الشحن، وزاد من تكاليف الطاقة بشكل كبير، مما أدى فعلياً إلى عكس اتجاهات استقرار سعر الصرف والأسعار التي شوهدت في أواخر عام 2025.\n\n- توقعات الـ 20%: بدلاً من التراجع إلى خانة الآحاد كما كان مأمولاً في السابق، من المتوقع الآن أن يرتد التضخم الإجمالي ليصل إلى 20% على أساس سنوي في عام 2026. وهذا يمثل أكثر من ضعف معدل التضخم المسجل في عام 2025.\n- محركات الطاقة والنقل: يعد هذا الارتفاع التضخمي نتيجة مباشرة لصدمة في العرض. وقد بدأت هذه الضغوط تتجسد بالفعل؛ ففي مارس 2026، ارتفعت أسعار المستهلك بنسبة 15.3% على أساس سنوي، مدفوعة بشكل غير متناسب بزيادة قدرها 20.7% في تكاليف النقل.\n\nفي نهاية المطاف، لم يعد الوصول إلى مستويات الناتج المحلي الإجمالي لما قبل الأزمة (عام 2019) مسألة تتعلق بالإصلاح المالي المحلي؛ بل أصبح المسار الاقتصكي الكلي للبنان الآن مقيداً بالكامل بتقلبات الحرب الإقليمية.',
    contentEn: 'Current economic modeling relies heavily on the duration of the conflict. The war is currently draining the Lebanese economy by an estimated $75 million daily ($35 million in direct damages and $40 million in revenue losses). Based on geopolitical developments for the remainder of 2026, economists track three main scenarios:\n\nCeasefire Scenario (0% Growth): If a permanent ceasefire holds and a wider war is avoided, Bank Audi projects that real GDP will stagnate at 0%. While this represents a massive downgrade from previous growth estimates, this scenario avoids outright contraction, relying heavily on the resilience of expatriate remittances and domestic consumption to keep the economy afloat.\n\nMedium-Term Conflict (5% to 10% Contraction): If hostilities resume and persist throughout the summer, economic damage will deepen. Bank Audi forecasts a 5% decline under this timeframe, while other local financial experts warn that near-total paralysis in the hospitality, agriculture, and industrial sectors could drag GDP down by up to 10%.\n\nFull-Year War (11% to 16% Contraction): Should the conflict persist until the end of 2026 without resolution, the economic floor will collapse. Local estimates project an 11% contraction, while the Institute of International Finance (IIF) forecasts a devastating GDP drop of between 12% and 16%.\n\nThe Inflationary Shock:\nThe conflict has seriously disrupted supply chains, inflated shipping insurance premiums, and dramatically increased energy costs, effectively reversing the exchange rate and price stabilization trends seen in late 2025.\n\n- The 20% Forecast: Instead of receding to single digits as previously hoped, headline inflation is now expected to rebound to 20% year-on-year in 2026. This represents more than double the inflation rate recorded in 2025.\n- Energy and Transport Drivers: This inflationary spike is a direct result of a supply shock. These pressures are already manifesting; in March 2026, consumer prices rose by 15.3% year-on-year, driven disproportionately by a 20.7% surge in transportation costs.\n\nUltimately, reaching pre-crisis GDP levels (2019) is no longer a matter of domestic fiscal reform; Lebanon\'s macroeconomic trajectory is now entirely bound by the volatile currents of regional war.',
    author: {
      nameAr: 'أديب الوارّاق',
      nameEn: 'Adeeb Al-Warraq',
      titleAr: 'رئيس التحرير العام',
      titleEn: 'Editor-in-Chief',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200',
    date: '16 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    isFeatured: true,
    views: 12450
  },
  {
    id: 'leb-1',
    category: 'lebanon',
    titleAr: 'إعادة إحياء المطابع التاريخية في بدارو والجميزة بمبادرات وطنية ومستدامة',
    titleEn: 'Reviving Historic Printing Houses in Badaro and Gemmayzeh via Green Initiatives',
    summaryAr: 'مجموعة من المثقفين والحرفيين اللبنانيين يؤسسون تجمعًا وطنيًا لاستعادة مجد الكلمة المطبوعة عبر تشغيل آلات الهايدلبرغ الكلاسيكية بواسطة مصادر طاقة نظيفة.',
    summaryEn: 'A coalition of Lebanese intellectuals and artisans establish a collective to restore the glory of the printed word by running classic Heidelberg presses on clean solar grids.',
    contentAr: 'تشهد أحياء بدارو والجميزة ومار مخايل في بيروت ورشة حقيقية تديرها طاقات شابة لإعادة بث الروح في ورش الطباعة البائدة التي لطالما كانت منارة للنشر العربي منذ ستينيات القرن الماضي. ويهدف التكتل إلى طباعة كتب الجيب ودواوين الشعر الحديث باستخدام مكنات يدوية وميكانيكية عريقة، مستلهمة تراث الورّاقين التاريخي.\n\nاللافت في المبادرة هو اعتمادها الكامل على طاقة شمسية مستقلة لحماية الإنتاج من انقطاعات التيار الكهربائي المستمرة، مما يمثل رسالة مزدوجة في الصمود الثقافي والابتكار البيئي.',
    contentEn: 'The neighborhoods of Badaro, Gemmayzeh, and Mar Mikhael in Beirut are witnessing a physical workshop driven by young volunteers to breathe life back into dormant print presses that anchored Arabic publishing since the 1960s. The coalition targets printing pocketbooks and modern poetry volumes using manual and mechanical machines, drawing inspiration from classical Al-Warraq copyists.\n\nCrucially, the initiative runs on independent solar microgrids to protect production from continuous power deficits, rendering a dual message of cultural resilience and green adaptation.',
    author: {
      nameAr: 'بيروت: رانيا غانم',
      nameEn: 'Beirut: Rania Ghanem',
      titleAr: 'مراسل الوراق في لبنان والشرق الأدنى',
      titleEn: 'Al-Warraq Lebanon & Levant Correspondent'
    },
    imageUrl: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=600',
    date: '16 يونيو 2026',
    readTimeAr: '4 دقائق',
    readTimeEn: '4 min read',
    isFeatured: false,
    views: 4319
  },
  {
    id: 'leb-2',
    category: 'lebanon',
    titleAr: 'الأكاديميات اللبنانية تقود حوارًا علميًا مفتوحًا لتأسيس مركز أبحاث التكنولوجيا الزراعية المستدامة في البقاع',
    titleEn: 'Lebanese Academies Spearhead Open Scientific Dialogues to Establish Agri-Tech Centers in Bekaa',
    summaryAr: 'مؤسسات جامعية في بيروت وزحلة تتعاون لتوفير برمجيات ذكية لمزارعي السهل الخصيب ترشيدًا واستهلاكًا للمياه المحدودة ومواجهة آثار الجفاف العيني.',
    summaryEn: 'University networks in Beirut and Zahle align to offer custom smart monitoring tools to farmers in the fertile valley, optimizing water allocation amid droughts.',
    contentAr: 'أطلقت رابطة الأكاديميين والمهندسين اللبنانيين مبادرة نوعية لدحر تداعيات الاختناق البيئي في سهل البقاع الأوسط. ويشتمل المخطط على تجهيز محطة استقرائية متكاملة تدعم صغار مزارعي البطاطا والحبوب من خلال أجهزة استشعار رطوبة التربة منخفضة التكلفة، فضلاً عن تصنيع منصة رقمية لإدارة توزيع الحِصص المائية العادلة.\n\nيسعى هذا الرابط العلمي والعملي لإنقاذ الموسم الزراعي وتوفير أسعار معقولة للمنتجات الغذائية في الأسواق المحلية اللبنانية الصعبة.',
    contentEn: 'The Association of Lebanese Academics and Engineers has launched a pioneering project to mitigate ecological bottlenecks in the central Bekaa valley. The design centers on deploying low-cost soil moisture sensors to local potato and grain farmers, coupled with a localized distribution platform for equitable water allocation.\n\nThis robust scientific connection aims to rescue the harvesting season and buffer stable food prices across struggling Lebanese local consumer markets.',
    author: {
      nameAr: 'زحلة: أنطوان دكاش',
      nameEn: 'Zahle: Antoine Dekkach',
      titleAr: 'المنسق البيئي للجريدة',
      titleEn: 'Al-Warraq Environmental Coordinator'
    },
    imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=600',
    date: '15 يونيو 2026',
    readTimeAr: '3 دقائق',
    readTimeEn: '3 min read',
    views: 2901
  },
  {
    id: 'leb-3',
    category: 'lebanon',
    titleAr: 'تضافر جهود المجتمع المدني والبلديات لإعادة تأهيل مسارح الحمرا والتروج كمعلم للفكر والفن الأصيل',
    titleEn: 'Civil Efforts and Municipalities Unite to Restore Hamra Theaters as Centers for Art & Liberty',
    summaryAr: 'انطلاق مبادرة لترميم الصروح المسرحية البيروتية القديمة لاستعادة بريق بيروت كعاصمة للتلاقح الثقافي المتعدد في الشرق الأدنى.',
    summaryEn: 'Initiatives roll out to renovate aged theater houses in Beirut, aiming to regain its historical stature as the capital of Levant cross-cultural exchanges.',
    contentAr: 'بجهود مستقلة وتمويل مجتمعي شفاف، أعلنت فعاليات مسرحية بيروتية عن إطلاق "مهرجان الوارّاق للتعبير الدرامي" المترافق مع بدء ترميم خشبتين للمسرح الكلاسيكي في قلب شارع الحمرا الصاخب. ستتضمن خطة الترميم تزويد المسارح بأجهزة إضاءة وصوتيات مقتصرة للطاقة، وإيواء معارض للكتاب وعمل ورش تعليم مجانية للشبان والشابات في الفنون البصرية والصياغة الحوارية المهنية.',
    contentEn: 'Via independent crowd-sourced capital and pristine municipal supervision, Beirut theatrical figures declared the launch of "Al-Warraq Dramatic Arts Festival" synced with structural updates of two classic theater stages on Hamra street. Renovation plans will implement eco-friendly lighting systems, hosting regular book fairs and delivering cost-free performance workshops.',
    author: {
      nameAr: 'بيروت: سليم الخوري',
      nameEn: 'Beirut: Selim El-Khoury',
      titleAr: 'مراسل الشؤون الثقافية',
      titleEn: 'Cultural Affairs Correspondent'
    },
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=1200',
    date: '13 يونيو 2026',
    readTimeAr: '4 دقائق',
    readTimeEn: '4 min read',
    views: 3105
  },
  {
    id: 'leb-hsbc-investigation',
    category: 'lebanon',
    titleAr: 'تحقيق شامل: كيف ورطت "فوري" الفرع السويسري لبنك HSBC في شبهات غسل أموال مرتبطة برياض سلامة؟',
    titleEn: 'Investigation: How "Forry" Implicated HSBC Switzerland in Money Laundering linked to Riad Salameh',
    summaryAr: 'في تصعيد قضائي غير مسبوق، تواجه وحدة الخدمات المصرفية لبنك HSBC في سويسرا اتهامات فرنسية رسمية بغسل الأموال والتآمر لاختلاس أكثر من 300 مليون دولار من الأموال العامة اللبنانية المرتبطة بشركة "فوري".',
    summaryEn: 'In an unprecedented judicial escalation, HSBC Switzerland\'s private banking unit faces formal French charges of money laundering and conspiracy to embezzle over $300M in Lebanese public funds tied to Forry Associates.',
    contentAr: '### مقدمة\nفي تصعيد قضائي غير مسبوق ضمن واحدة من أكبر قضايا الفساد المالي في تاريخ لبنان الحديث، يجد الفرع السويسري لأكبر بنك في أوروبا نفسه في قلب العاصفة. فقد وجهت النيابة العامة المالية الفرنسية (PNF) اتهامات أولية إلى وحدة الخدمات المصرفية الخاصة التابعة لبنك HSBC في سويسرا، للاشتباه في تورطها في عمليات غسل أموال منظمة، والتآمر لاختلاس أموال عامة، وإساءة الأمانة، ورشوة موظفين عموميين. هذه التهم ترتبط بشكل وثيق بالتحقيقات الجارية حول حاكم مصرف لبنان السابق، رياض سلامة، وشقيقه رجا.  \n*L\'Orient Today - L\'Orient-Le Jour*\n\n### هندسة المخطط المالي: دور شركة "فوري"\nتفيد التحقيقات الأوروبية بأن رياض ورجا سلامة استخدما شركة "فوري أسوشيتس" (Forry Associates Ltd) — وهي شركة وهمية سُجلت في جزر العذراء البريطانية عام 2001 وحُلت في عام 2016 — كقناة أساسية لتحويل وتمرير الأموال.  \n*Comsure*\n\nتمثلت الآلية في فرض عمولات على المصارف التجارية اللبنانية عند شرائها أدوات مالية من مصرف لبنان، ليتم لاحقاً تحويل هذه العمولات إلى حسابات شركة "فوري". ومن هناك، كشفت مسارات التتبع المالي أن الأموال تدفقت إلى حسابات في بنك HSBC في جنيف، لتُنقل بعدها إلى حسابات شخصية يسيطر عليها الشقيقان سلامة. وتشير التقديرات إلى أن حجم الأموال المختلسة عبر هذه الشبكة تجاوز 300 مليون دولار أميركي بين عامي 2002 و2015.  \n*AML Intelligence*\n\n### إخفاقات الرقابة الداخلية في HSBC\nلم يكن مرور مئات الملايين من الدولارات عبر النظام المصرفي السويسري خفياً بالكامل. فقد أشارت تسريبات وتقارير استقصائية إلى أن قسم الالتزام الداخلي في بنك HSBC شخّص تحويلات فوري كعالية المخاطر، ورغم ذلك واصل المصرف السويسري تسهيل العمليات بموجب حسابات سرية مكنت من تهريب الأموال خارج النظام المصرفي اللبناني.',
    contentEn: '### Introduction\nIn an unprecedented judicial escalation within one of the largest financial corruption cases in modern Lebanese history, the Swiss private banking arm of Europe’s largest lender finds itself at the center of a legal storm. France’s National Financial Prosecutor’s Office (PNF) has placed HSBC Private Bank (Suisse) SA under formal indictment on suspicion of organized money laundering, bribery of public officials, conspiracy to embezzle public funds, and aggravated breach of trust. These charges are directly tied to the sweeping probe into the financial assets of former Banque du Liban (BDL) Governor Riad Salameh and his brother, Raja. \n*L\'Orient Today - L\'Orient-Le Jour*\n\n### Structuring the Channels: Forry Associates\nEuropean investigators allege that the Salameh brothers utilized Forry Associates Ltd—a British Virgin Islands shell company established in 2001 and struck off in 2016—as a primary conduit to channel public monies. Under BDL’s operations, commissions were levied on commercial banks purchasing certificates of deposit. These fees were later deposited into Forry balances, yielding over $300 million in obscure transaction fees between 2002 and 2015. Ultimately, the funds were traced moving from Forry accounts into HSBC Private Bank in Geneva and eventually into personal real estate holdings controlled by the brothers. \n*Comsure*\n\n### Compliance Deficits at HSBC\nFrench magistrates assert that the passage of hundreds of millions was not invisible. Internal compliance departments flagged Forry transactions for years as highly irregular; nonetheless, the bank sustained the profitable client association. In 2024, FINMA (Switzerland’s Financial Market Supervisory Authority) ruled that the bank committed "serious compliance violations," temporarily stopping HSBC from accepting high-risk politically exposed persons (PEPs) as new clients.',
    author: {
      nameAr: 'وحدة الرصد العالي والتحقيقات',
      nameEn: 'Sovereign Watch Desk',
      titleAr: 'محلل مالي أول',
      titleEn: 'Senior Financial Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=600',
    date: '17 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 4500
  },
  {
    id: 'mid-1',
    category: 'middle-east',
    titleAr: 'الرؤية الصناعية المشتركة: شراكة تاريخية لتطوير سلاسل التوريد والربط الحديدي الخليجي',
    titleEn: 'Unified Industrial Vision: Historic Accord Links Supply Chains Across the Gulf Sector',
    summaryAr: 'اتفاقية ثلاثية ضخمة تضع ركائز متينة للاكتفاء الذاتي في سلاسل الإمداد وممرات السكك الحديدية الحديثة ومجمعات الفولاذ والألمنيوم النظيف.',
    summaryEn: 'A major tripartite pact designs reliable foundations for supply-chain self-sufficiency, clean steel corridors, and high-speed cargo networks.',
    contentAr: 'وقعت أطراف صناعية كبرى في الرياض والكويت وأبوظبي اتفاقية إطارية تهدف لمكاملة خطوط إنتاج وتشكيل المعادن الثقيلة وتزويد مشاريع التطوير العمراني ومسارات قطارات الشحن والمنافذ البرمائية المشتركة باحتياجاتها الهيكلية بأعلى اعتمادية ونقاء طاقي بيئي. المبادرة تساهم في إيجاد أكثر من عشرين ألف وظيفة نوعية للكوادر الهندسية والفنية الشابة وتوفر مليارات الدولارات سنوياً من كلف الاستيراد العبثية.',
    contentEn: 'Prominent industrial players in Riyadh, Kuwait, and Abu Dhabi signed a strategic framework intended to integrate metal manufacturing lines and provide regional transit networks, raw ports, and railways with structural assets of high quality. The initiative sparks over twenty thousand premium engineering opportunities for young professionals and buffers billions of import-associated expenses yearly.',
    author: {
      nameAr: 'الرياض: مروان الحربي',
      nameEn: 'Riyadh: Marwan Al-Harbi',
      titleAr: 'المنسق الإقليمي لجريدة الوراق',
      titleEn: 'Regional Al-Warraq Coordinator'
    },
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
    date: '16 يونيو 2026',
    readTimeAr: '3 دقائق',
    readTimeEn: '3 min read',
    views: 5930
  },
  {
    id: 'mid-2',
    category: 'middle-east',
    titleAr: 'مشروع الربط المائي الشامل يعبر آفاق التعاون ويؤسس لاستقرار الموارد في الهلال والخليج',
    titleEn: 'Comprehensive Water Grid Project Outlines Landmark Resource Resiliency Layouts',
    summaryAr: 'دراسات ممتدة تجمع فرقًا هندسية لإقامة أكبر ممر تجميع وتوزيع طاقة مائية ومعالجة مستدامة لمكافحة التصحر وجفاف المسطحات التاريخية.',
    summaryEn: 'Extended feasibility programs gather expert engineering teams to construct the largest water purification and supply network to fight desertification.',
    contentAr: 'التزمت وزارات التخطيط والطاقة في عواصم المنطقة بدعم منبر بحثي لتدبير منظومة الربط المائي المستدام. يركز المشروع على تشييد مئات الأنفاق المغلقة المجهزة ببرمجيات الاستشعار المبكر للتسريب، مستهدفة مواجهة جفاف الأنهر ومستويات المياه الجوفية، وزيادة مخزونات الاحتياط البارد لمواجهة تحديات المواسم الأكثر حرارة المتوقعة في نهاية هذا العقد.',
    contentEn: 'Planners and energy ministries across the region committed to back a joint engineering council to manage the Sustainable Aqueduct. The design establishes a large array of enclosed pipeline modules equipped with autonomous leak-monitoring sensors, structured to curb ground moisture losses and secure essential emergency drinking reserves.',
    author: {
      nameAr: 'المنامة: فهد الخالدي',
      nameEn: 'Manama: Fahd Al-Khaldi',
      titleAr: 'مراسل شؤون الخليج العربي',
      titleEn: 'Arab Gulf Affairs Correspondent'
    },
    imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600',
    date: '14 يونيو 2026',
    readTimeAr: '4 دقائق',
    readTimeEn: '4 min read',
    views: 4890
  },
  {
    id: 'excl-imf-aml',
    category: 'exclusives',
    titleAr: 'صندوق النقد الدولي يصدر توصيات لتعزيز إطار مكافحة تبييض الأموال في لبنان',
    titleEn: 'IMF Issues Recommendations to Strengthen Anti-Money Laundering Framework in Lebanon',
    summaryAr: 'كجزء من تقريره التشخيصي للحوكمة والفساد، صندوق النقد الدولي يوصي بوضع خطة واضحة لاسترداد الأصول وتعزيز استقلالية هيئة التحقيق الخاصة وعمل السجل التجاري.',
    summaryEn: 'As part of its governance and corruption diagnosis, the IMF recommends a comprehensive asset recovery plan and enhanced operational independence for the Special Investigation Commission.',
    contentAr: 'كجزء من تقريره "التشخيصي للحوكمة والفساد في لبنان"، أشار صندوق النقد الدولي إلى أن غياب الشفافية وضعف المساءلة يعوقان بشكل كبير التطبيق الفعال للتدابير الوقائية المتعلقة بمكافحة تبييض الأموال وتمويل الإرهاب (AML/CFT) في لبنان. وأضاف أنه على الرغم من تماشي القواعد المتعلقة بالوصول إلى المعلومات، والإفصاح عن الأصول من قِبل كبار المسؤولين، وشفافية المستفيد الحقيقي (Beneficial Ownership)، ومراقبة الأشخاص المعرضين سياسياً (PEPs) بشكل عام مع المعايير الدولية، فإن إنفاذها لا يزال غير كافٍ، مما يحد من قدرة السلطات على رصد الفساد وملاحقة المخالفين واسترداد العائدات غير المشروعة.\n\nوعلاوة على ذلك، اعتبر الصندوق أن الإبلاغ عن المعاملات المشبوهة، وهو أداة رئيسية لمكافحة تبييض الأموال، يقوضه النشاط الاقتصادي غير النظامي وانخفاض مستويات الإبلاغ، في حين يسهل ضعف الشفافية المؤسسية إساءة استخدام الكيانات القانونية في قضايا الفساد رفيعة المستوى. بالإضافة إلى ذلك، أشار إلى أن التحقيقات المالية الموازية تركز بشكل ضيق على الأصول المستخدمة في الجرائم بدلاً من التركيز على تبييض الأموال على نطاق أوسع، مما يؤدي إلى فجوة كبرى بالنظر إلى حجم العائدات المتأتية من الفساد.\n\nكما ذكر التقرير أنه على الرغم من وجود إطار قانوني ملائم، فإن السلطات اللبنانية نادراً ما تطبق تدابير مؤقتة مثل تجميد الأصول أو مصادرتها، مما يعكس غياب سياسة واضحة لاسترداد الأصول. واعتبر أن التعاون الدولي ضعيف، حيث طلب لبنان المساعدة في سبع قضايا فساد فقط ولم يسعَ إلى استرداد الأصول في الخارج من خلال المساعدة القانونية المتبادلة (MLA)، وهو ما يمثل نقصاً خطيراً بالنظر إلى ملف المخاطر الخاص بالبلاد. علاوة على ذلك، أشار إلى أن العبء الملقى على عاتق الدول الطالبة لتقديم أدلة المساعدة القانونية المتبادلة مرتفع للغاية، ولا يُسمح بمصادرة الممتلكات ذات القيمة المعادلة لعائدات الفساد، كما لا يسمح القانون اللبناني بنقل الإجراءات الجنائية إلى ولايات قضائية أخرى، مما يقوض الإنفاذ الفعال لتدابير استرداد الأصول عبر الحدود.\n\nأبرز توصيات صندوق النقد الدولي لتعزيز الإطار اللبناني:\n\nأولاً: حث وزارة العدل على اعتماد وتنفيذ استراتيجية وطنية لاسترداد العائدات المتأتية من الفساد محلياً ودولياً، فضلاً عن تطوير وتطبيق مبادئ توجيهية للتحقيقات المالية الموازية مع التركيز على جرائم الفساد.\n\nثانياً: دعوة وزارة العدل ومجلس النواب إلى إدراج صلاحيات في النصوص القانونية تسمح بضبط ومصادرة الأصول ذات القيمة المعادلة لعائدات الفساد، لضمان حرمان المخالفين من المكاسب غير المشروعة حتى في الحالات التي لا يمكن فيها تتبع العائدات المباشرة، أو في حال تبديدها أو تحويلها.\n\nثالثاً: حث مجلس النواب ومجلس الوزراء على إصلاح هيكل حوكمة هيئة التحقيق الخاصة (SIC) لمكافحة تبييض الأموال وتمويل الإرهاب، لتعزيز استقلاليتها التشغيلية عبر اعتماد عملية اختيار شفافة وقائمة على الجدارة لإدارة الهيئة.\n\nرابعاً: تعزيز التعاون الدولي في المسائل الجنائية المتعلقة بالفساد وتبييض الأموال، عبر إدراج التزام بترحيل أو مقاضاة الأفراد المتهمين بهذه الجرائم في التشريع الجنائي اللبناني، والسماح بنقل الإجراءات الجنائية لولايات قضائية أخرى لصالح العدالة، وتطوير أنظمة للمعالجة السريعة لطلبات المساعدة القانونية المتبادلة، وتخفيف عبء الإثبات على الدول الطالبة.\n\nخامساً: تعزيز متطلبات الإفصاح عن معلومات المستفيد الحقيقي (BO) عبر مراجعة الإطار القانوني لتمكين السجل التجاري من إجراء تدقيق قائم على المخاطر، وتطبيق عقوبات رادعة على البيانات غير الدقيقة. كما حث على إعادة تشغيل الموقع الإلكتروني للسجل التجاري لضمان وصول الجمهور إلى المعلومات، وضمان ترابط الأنظمة بين السجل التجاري ووزارة المالية.\n\nسادساً: حث هيئة التحقيق الخاصة على تعزيز تطبيق التدابير الوقائية للأشخاص المعرضين سياسياً (PEPs) عبر توسيع التزامات العناية الواجبة المشددة لتشمل المؤسسات المالية، والكتاب العدل، وتجار المعادن الثمينة والأحجار الكريمة، والوسطاء العقاريين، مع تركيز خاص على تحديد هؤلاء الأشخاص وأفراد عائلاتهم والمقربين منهم.\n\nسابعاً: طلب من هيئة التحقيق الخاصة إجراء مراجعة شاملة للتحويلات المالية عبر الحدود التي نفذتها المصارف منذ بداية الأزمة الاقتصادية، وتدقيق المعاملات الموجهة إلى الولايات القضائية ذات المخاطر العالية، وإصدار إرشادات بشأن المراقبة المستمرة لهذه التحويلات.\n\nثامناً: دعوة مصرف لبنان إلى تعزيز ضوابط النزاهة المالية من خلال تكثيف إشرافه على جميع سلطات الترخيص والتسجيل المسؤولة عن مراقبة المؤسسات المالية، لا سيما عند نقطة دخول السوق، بما في ذلك تطبيق اختبارات الجدارة والأهلية (Fit-and-Proper Tests)، مع تركيز خاص على القطاع المصرفي.\n\nوأشار صندوق النقد الدولي إلى أنه أجرى this التقييم التشخيصي في الفترة من أكتوبر 2022 إلى أبريل 2023 بناءً على طلب الحكومة آنذاك. وأضاف أنه شارك مسودة التقرير مع السلطات في مارس 2025 لمراجعتها، وعرضها على رئيس مجلس الوزراء وأعضاء الحكومة في 30 أبريل 2025، لافتاً إلى إدراج تحديثات إضافية بناءً على اجتماعات مايو 2025 والمدخلات الخطية المستلمة من السلطات اللبنانية.',
    contentEn: 'As part of its "Diagnostic on Governance and Corruption in Lebanon" report, the IMF highlighted that transparency shortfalls and weak accountability undermine the effective implementation of preventative Anti-Money Laundering and Countering the Financing of Terrorism (AML/CFT) measures. While mechanisms for information access, asset disclosures by senior officials, and beneficial ownership transparency structurally align with international benchmarks, enforcement remains lagging.\n\nFurthermore, suspicious transaction reporting is undermined by a high volume of informal economic activity, while lax institutional transparency facilitates the misuse of legal entities in high-level corruption cases. Parallel financial investigations rely on narrow definitions, leaving significant gaps relative to corruption proceeds.\n\nKey Recommendations from the IMF:\n\n1. Establish a National Strategy for Asset Recovery under the Ministry of Justice focusing on domestic and international coordination.\n\n2. Introduce legal powers to allow seizure of assets equivalent to corrupt gains even where direct tracing is difficult.\n\n3. Reform the Special Investigation Commission (SIC) structure to bolster operational independence and merit-based governance.\n\n4. Strengthen international judicial cooperation on MLA processes, easing evidentiary burdens on requesting states.\n\n5. Enable the Commercial Register to conduct risk-based audits and restart public lookup websites tied with the Ministry of Finance.\n\n6. Mandate high-risk PEP monitoring across banks, developers, and precious metal brokers.\n\n7. Audit cross-border financial outflows conducted since the economic crisis, targeting high-risk jurisdictions.',
    author: {
      nameAr: 'بيروت: الدائرة المالية لصندوق النقد',
      nameEn: 'Beirut: IMF Fiscal Desk',
      titleAr: 'خبير الحوكمة وإعادة الهيكلة المالي',
      titleEn: 'Governance & Restructuring Specialist'
    },
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    date: '15 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 5120
  },
  {
    id: 'excl-lebanon-ai-adoption',
    category: 'exclusives',
    titleAr: 'لبنان يحتل المرتبة 33 عالمياً والخامسة عربياً في تبني الذكاء الاصطناعي',
    titleEn: 'Lebanon Ranks 33rd Globally and 5th in Arab World for AI Adoption',
    summaryAr: 'تقرير مؤشر تبني الذكاء الاصطناعي العالمي للربع الأول من عام 2026 الصادر عن معهد مايكروسوفت يبرز استخدام 27.3% من السكان لأدوات الذكاء الاصطناعي التوليدي.',
    summaryEn: 'Microsoft’s index rates Lebanon above regional averages with 27.3% of the working-age population using Generative AI active tools.',
    contentAr: 'صنف معهد اقتصاد الذكاء الاصطناعي (AIEI) لبنان في المرتبة 33 عالمياً وخامساً عربياً في تبني التكنولوجيا للربع الأول من عام 2026، حيث أظهرت البيانات استخدام 27.3% من السكان بنشاط لأدوات الذكاء الاصطناعي التوليدي، وهي نسبة تفوق المتوسط العالمي البالغ 19.1%.\n\nوذلك بقياس الاستخدام والتبني الفعلي لأدوات الذكاء الاصطناعي في سن العمل بدلاً من القدرات التقنية للدول، وجاء تبني لبنان الأقوى بين دول الدخل المتوسط الأدنى بعد الأردن، متفوقاً على قوى إقليمية ومحلية هامة ونظيرات في شمال أفريقيا.\n\nوفي موازاة ذلك، كان معهد (AIEI) قد صنف لبنان في المرتبة 33 عالمياً والثانية بين دول الدخل المتوسط الأدنى والخامسة عربياً في نهاية عام 2025؛ مقارنة بالمرتبة 31 عالمياً والثانية في فئته والرابعة إقليمياً في نهاية يونيو 2025. وأشار التقرير إلى أن 25.7% من السكان في سن العمل في لبنان استخدموا الذكاء الاصطناعي في نهاية عام 2025، مقارنة بـ 24.8% في نهاية يونيو 2025.\n\nوتجدر الإشارة إلى أن دولة الإمارات العربية المتحدة احتلت المرتبة الأولى عالمياً في تبني الذكاء الاصطناعي، حيث استخدم 70.1% من سكانها في سن العمل أدوات الذكاء الاصطناعي في الربع الأول من عام 2026، بينما جاءت كمبوديا في المرتبة الأخيرة بنسبة 5.7%، تلتها في الترتيب عُمان، والكويت، وليبيا، ومصر، وتونس، والجزائر، والعراق، والمغرب، وموريتانيا، والسودان، وسوريا خلال الربع الأول من العام.\n\nدول الدخل المتوسط الأدنى: حل لبنان في المرتبة الثانية بعد الأردن في الربع الأول من عام 2026.\n\nوأظهر الاستطلاع أن 27.3% من السكان في سن العمل في لبنان استخدموا الذكاء الاصطناعي في الربع الأول من عام 2026، وهي نسبة أعلى من المتوسط العالمي البالغ 19.1%، ومتوسط المنطقة العربية البالغ 22%، ومتوسط الدول ذات الدخل المتوسط الأدنى البالغ 12.1% في الفترة المشمولة بالتقرير. وجاء تبني لبنان للذكاء الاصطناعي أقل من متوسط دول مجلس التعاون الخليجي البالغ 37.8%، ولكنه أعلى من متوسط الدول العربية غير الخليجية البالغ 14.8%.',
    contentEn: 'The Microsoft Institute of Artificial Intelligence Economy (AIEI) ranked Lebanon 33rd out of 147 nations globally, 2nd among Lower-Middle Income Countries (LMICs), and 5th out of 16 Arab states in the Global AI Adoption Index for Q1 2026.\n\nRather than evaluating technical capacity or model development, the index measures active generative AI tool usage by the working-age population. The tracking aggregates anonymized browser-level signals calibrated against localized operating system metrics and overall internet access.\n\nLower-Middle Income comparisons show Lebanon runner-up behind only Jordan. Over 27.3% of the domestic labor pool engaged with AI models regularly, surpassing global bounds (19.1%) and the wider Levant and North Africa regions (14.8%).',
    author: {
      nameAr: 'معهد اقتصاد الذكاء الاصطناعي',
      nameEn: 'Institute of AI Economy (AIEI)',
      titleAr: 'وحدة المسوح والبيانات التكنولوجية',
      titleEn: 'Technology Survey & Analytics Desk'
    },
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=1200',
    date: '16 يونيو 2026',
    readTimeAr: '4 دقائق',
    readTimeEn: '4 min read',
    views: 4850
  },
  {
    id: 'leb-mof-tariffs',
    category: 'lebanon',
    titleAr: 'وزارة المالية تعلن خطة تعديل الرسوم الجمركية لتحفيز الإنتاج المحلي',
    titleEn: 'Ministry of Finance Announces New Customs Tariff Structure to Boost Native Production',
    summaryAr: 'تطبيق إعفاءات ضريبية على المعدات الصناعية المستوردة وزيادة الرسوم على السلع الاستهلاكية الفاخرة لتعزيز الصناعات الوطنية.',
    summaryEn: 'Ministerial decree introduces tax exemptions on imported industrial machinery while adjusting tariffs on luxury consumption goods.',
    contentAr: 'أعلنت وحدة التقييم والسياسات المالية بوزارة المالية اللبنانية عن بدء تطبيق الهيكل الجمركي الجديد الرامي إلى تحفيز قطاعات الإنتاج الصناعي والزراعي المحلي. وتتضمن الخطة الجديدة إعفاءات ضريبية وجمركية شاملة على كافة المعدات والآلات الصناعية المستوردة والمواد الخام الأساسية التي تدخل في الصناعات الوطنية، في خطوة تهدف إلى تقليل تكاليف الإنتاج والحد من الاعتماد على الاستيراد للخارج.\n\nمن جهة أخرى، تشمل الخطة زيادة تدريجية في الرسوم والتعرفات المفروضة على السلع الاستهلاكية الفاخرة والمستوردات التي يتوفر لها بديل محلي كافٍ، وذلك بالتنسيق مع وزارة الصناعة وغرفة التجارة والصناعة في بيروت لحماية وتنشيط حركة السوق المحلية وتنمية القدرات الإنتاجية.',
    contentEn: 'The Ministry of Finance announced a sweeping overhaul of the customs tariff structure designed to support local manufacturing and agricultural production. The initiative institutes complete exemptions on imported machinery, raw materials, and assembly tools to lower operational overheads for native factories.\n\nConversely, the plan raises tariffs on luxury items and goods with viable domestic substitutes, coordinating closely with the Ministry of Industry to encourage self-sufficiency and build resilience in the local Lebanese markets.',
    author: {
      nameAr: 'شربل صاصي',
      nameEn: 'Charbel Sassi',
      titleAr: 'أخصائي السياسات المالية والجمارك',
      titleEn: 'Fiscal Policy & Customs Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200',
    date: '17 يونيو 2026',
    readTimeAr: '5 دقائق',
    readTimeEn: '5 min read',
    views: 3120
  },
  {
    id: 'leb-microfinance-reg',
    category: 'lebanon',
    titleAr: 'توجيهات رقابية جديدة من مصرف لبنان المركزي لإعادة تنظيم مؤسسات التمويل الأصغر',
    titleEn: 'BDL Issues Sweeping Directives Targeting Micro-Lending Cooperatives',
    summaryAr: 'التعميم رقم 765 يضع شروطاً معقدة للتأسيس والتراخيص وتطوير خطط خماسية بالتعاون مع جهات دولية لحماية المستقرضين.',
    summaryEn: 'Banque du Liban circular 765 mandates target market reviews, strict compliance guidelines, and a six-month formalization deadline.',
    contentAr: 'أصدر مصرف لبنان التعميم الوسيط رقم 765/13820 الموجه إلى المصارف والمؤسسات المالية، والذي يعوّل على تعديل التعميم الأساسي رقم 93/8779 المتعلق بالقروض الصغيرة (التمويل الأصغر). يهدف التعميم الجديد إلى إرساء قواعد رقابية واضحة تحكم عمل قروض التمويل الصغير لحماية المستقرضين وضمان التزام المؤسسات بالحدود الائتمانية والفوائد العادلة.\n\nوتتضمن هذه التوجيهات ضرورة تقديم خطط عمل خماسية متكاملة تبرز آليات التوسع والتمويل واستدامة الخدمات المالية, بالإضافة إلى مراجعة دورية للفئات المستهدفة وحجم القروض، مع إعطاء مهلة ستة أشهر للمؤسسات الائتمانية غير المرخصة لتسوية أوضاعها القانونية تحت طائلة المساءلة القانونية والإغلاق.',
    contentEn: 'Banque du Liban (BDL) has issued intermediate circular 765/13820, amending basic circular 93/8779 concerning micro-finance operations. The initiative establishes a strict regulatory framework for micro-lending cooperatives to safeguard low-income borrowers against exorbitant interest rates and secure credit operations across Lebanese districts.\n\nThe new directives mandate active target market reviews, the submission of detailed five-year progressive business strategies co-designed with global development boards, and a strict compliance roadmap. Existing micro-lenders have been assigned a six-month formalization deadline to restructure capital requirements and secure approved licensing from the central bank.',
    author: {
      nameAr: 'نضال الشدياق',
      nameEn: 'Nidal Chidiac',
      titleAr: 'محلل السياسات النقدية والائتمان',
      titleEn: 'Monetary Policy & Credit Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200',
    date: '17 يونيو 2026',
    readTimeAr: '5 دقائق',
    readTimeEn: '5 min read',
    views: 3120
  },
  {
    id: 'telecom-1',
    category: 'telecom-internet',
    titleAr: 'تدشين ممر البيانات الرقمي "فينيق": خطوة لبنانية استراتيجية للربط الكلي عبر البحار',
    titleEn: 'Lebanon Debuts "Phoenix" Land-Sea Data Highway Connecting East with Europe',
    summaryAr: 'بنية تحتية متطورة واستثمارات محلية وخارجية لربط كوابل الاتصالات البحرية بطرق برية تعيد للبنان دوره التاريخي كمقصد بريدي واتصالي في البحر المتوسط.',
    summaryEn: 'High-speed telecommunication project links Mediterranean shipping cable lines with mainland routes, boosting capacity and data security.',
    contentAr: 'أعلن مسؤولون تنفيذيون في قطاع الاتصالات عن إطلاق ممر البيانات الرقمي البري-البحري المشترك "فينيق". يهدف هذا المشروع الاستراتيجي إلى ربط شبه الجزيرة العربية بالمنافذ الساحلية اللبنانية في طرابلس وبيروت، تمهيداً للاتصال المباشر مع مراكز البيانات الكبرى في جنوب أوروبا.\n\nيمثل المشروع خطوة نوعية لاستعادة ريادة لبنان الإقليمية وتوفير مسار آمن وذي زمن استجابة منخفض جداً في توجيه البيانات وحماية التدفقات المالية العالمية، مما يسهم بشكل فاعل في استرداد هوية لبنان كمقصد بريدي واتصالي تاريخي في قلب البحر الأبيض المتوسط.',
    contentEn: 'Regional telecommunication executives confirmed the debut of the land-sea "Phoenix Digital Corridor", a hyper-capacity data routing system connecting the Arabian peninsula with Mediterranean coastal nodes in Tripoli and Beirut, heading directly to Southern Europe.\n\nThis project presents a secure, low-latency alternative safeguarding global financial flows from East Asia to Paris and Geneva. The tactical bypass recaptures Lebanon’s historic focal point as an intellectual and telecom bridge between worlds.',
    author: {
      nameAr: 'مازن النويري',
      nameEn: 'Mazen Al-Nweiri',
      titleAr: 'محلل شبكات وبنية تحتية',
      titleEn: 'Infrastructure Specialist'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600',
    date: '16 يونيو 2026',
    readTimeAr: '5 دقائق',
    readTimeEn: '5 min read',
    views: 4120
  },
  {
    id: 'leb-edl-audit',
    category: 'lebanon',
    titleAr: 'مؤسسة كهرباء لبنان تبدأ حملة تدقيق مالي شامل لاستعادة توازن التكاليف الأخير',
    titleEn: 'Electricite du Liban Initiates Comprehensive Audit to Recapture Cost Balance',
    summaryAr: 'تنفيذ إجراءات حاسمة وخطة استرداد تهدف لتقليل الهدر فني وغير الفني وتحسين كفاءة إنتاج الطاقة عبر الحوكمة الرشيدة.',
    summaryEn: 'Operational recovery plan targets transmission losses and structural deficits to achieve cost neutrality and administrative efficiency.',
    contentAr: 'أعلنت مؤسسة كهرباء لبنان بالتعاون مع لجنة استعادة وتدقيق التكاليف عن إطلاق استراتيجيتها الجديدة لتحسين أداء الفوترة وحوكمة شبكة التوزيع في فروع جبل لبنان والجنوب وبيروت. تهدف المبادرة إلى معالجة الخسائر التقنية والسرقات المباشرة عبر تركيب محولات ذكية وعدادات دفع مسبق في كافة قطاعات الاستهلاك.',
    contentEn: 'Electricite du Liban, aligned with the Cost Recovery & Audit Committee, launched its primary structural overhaul to address massive legacy deficits. The initiative pivots towards localized smart tracking and smart grid installation, alongside reducing technical and non-technical grid losses.',
    author: {
      nameAr: 'بيروت: مؤسسة كهرباء لبنان',
      nameEn: 'Beirut: Electricite du Liban',
      titleAr: 'لجنة استعادة وتدقيق التكاليف',
      titleEn: 'Cost Recovery & Audit Committee'
    },
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600',
    date: '12 يونيو 2026',
    readTimeAr: '5 دقائق',
    readTimeEn: '5 min read',
    views: 3120
  },
  {
    id: 'leb-kanan-financial-reform',
    category: 'lebanon',
    titleAr: 'كنعان يرفض "السمك في البحر".. ومطالب المودعين ترسم خريطة التعديلات لقانون الانتظام المالي',
    titleEn: 'Kanaan Rejects "Fish in the Sea" Promises: Depositors Draft Financial Restructuring Demands',
    summaryAr: 'اعتبر رئيس لجنة المال والموازنة، النائب إبراهيم كنعان، أن مشروع قانون "الفجوة المالية واسترداد الودائع" بصيغته الحالية غير قابل للحياة، لافتاً إلى أنه لا يحظى بأي قبول على المستويين المحلي أو الخارجي.',
    summaryEn: 'Chairman of the Finance and Budget MP Ibrahim Kanaan declares the current financial gap draft law unviable, demanding concrete guarantees rather than elusive promises.',
    contentAr: 'اعتبر رئيس لجنة المال والموازنة، النائب إبراهيم كنعان، أن مشروع قانون "الفجوة المالية واسترداد الودائع" بصيغته الحالية غير قابل للحياة، لافتاً إلى أنه لا يحظى بأي قبول على المستويين المحلي أو الخارجي. وشدد كنعان على ضرورة إعادة صياغة القانون بما يضمن للمودعين قدرتهم الفعلية على استرداد أموالهم، رافضاً أن تبقى الوعود والتطمينات مجرد "سمك في البحر".\n\nهذا الموقف يتقاطع بشكل مباشر مع هواجس المودعين ويطرح تساؤلاً جوهرياً: ماذا يعني إعادة النظر في قانون الانتظام المالي؟\n\nبالنسبة للمودعين، الإجابة تكمن في تعديل جذري، واضح، وصريح للمواد القانونية بعيداً عن المناورات الرقمية. وفي هذا السياق، تتبلور مطالبهم في خمسة محاور أساسية يجب أن تشكل البوصلة لأي صياغة جديدة:\n\n1. إسقاط كذبة "حماية 85% من المودعين"\nيطالب المودعون بإلغاء سقف الـ 100 ألف دولار الذي لا يستند إلى أي معايير قانونية. فالادعاء بأن هذا السقف يحمي 85% من المودعين هو تضليل إحصائي فاضح؛ إذ أن المعيار الاقتصادي الصحيح يقاس بـ "قيمة الأموال" وليس بـ "عدد الحسابات".\nلغة الأرقام تؤكد أن نحو 14% فقط من إجمالي أموال المودعين تقع تحت هذا السقف (وسيتم دفعها)، في حين أن 86% من كتلة الأموال سيتم تحويلها إلى سندات مؤجلة. بالتالي، هذه "الحماية" هي حماية شكلية للأرقام لا للحقوق.\n\nالبديل المطلوب: اعتماد آلية دفعات شهرية تستند إلى نسب مئوية تتناسب مع حجم الوديعة (كل مودع بحسب وديعته).\n\n2. رفض معاقبة الضحية بشطب الفوائد\nينص المشروع الحالي على شطب الفوائد التي تتجاوز 2% بين عامي 2015 و2019، وهو ما يعتبره المودعون معاقبة مباشرة للضحية وتجاهلاً لواقع أليم؛ فالمودع لم يتقاضَ أي فائدة فعلية منذ بدء الأزمة عام 2019 بسبب احتجاز أمواله، بل تكبد خسائر فادحة (Haircut) عبر السحوبات القسرية لتأمين كلفة المعيشة والعلاج.\nالفائدة هي حق تعاقدي وليست منّة، ولا يجوز اقتصادياً أو قانونياً إسقاط التزامات تعاقدية بأثر رجعي لتحميل الخسارة لطرف واحد. كما أن الفوائد العالمية في تلك الفترة لامست حدود الـ 4%، مما يدحض سردية الفوائد "الخيالية" (5-7%) التي يتم الترويج لها كذريعة للشطب.\n\nالبديل المطلوب: تعديل القانون ليحفظ حق المودعين في الفوائد بنسب عادلة تصل إلى حدود 7%.\n\n3. ربط السندات "المضمونة" بأصول الدولة الملموسة\nيُسوّق القانون لفكرة تحويل الودائع المتوسطة والكبيرة إلى سندات كحل "مضمون". لكن هذا يطرح تساؤلات مشروعة: من يضمن قيمة هذه السندات بعد 10 أو 20 عاماً في ظل دولة مفلسة؟ ألم تكن الودائع في الأساس "محمية" قبل أن يبددها مصرف لبنان والمصارف؟\n\nالبديل المطلوب: ربط هذه السندات بضمانات حقيقية وملموسة متمثلة بأصول الدولة (كاحتياطي الذهب، مرفأي بيروت وطرابلس، المطار، كازينو لبنان، وقطاع الاتصالات).\n\n4. إلغاء شطب تحويلات ما بعد 17 تشرين\nيرفض المودعون بشكل قاطع فكرة شطب 60% من قيمة الودائع التي حُوّلت من الليرة إلى الدولار بعد 17 تشرين الأول 2019. فهذه التحويلات تمت بشكل قانوني تماماً، بموافقة المصارف، وتحت إشراف مباشر من مصرف لبنان. إن تحميل المودع مسؤولية هذه العمليات اليوم هو قلب للوقائع وإنكار لمسؤولية الجهة الناظمة التي سمحت بها وغطتها.\n\n5. إنصاف مودعي الليرة اللبنانية\nضرورة إدراج آليات واضحة للتعويض على المودعين الذين أبقوا أموالهم بالليرة اللبنانية، والذين تعرضوا لأكبر عملية تبخر لمدخراتهم نتيجة الانهيار الكارثي في سعر الصرف.',
    contentEn: 'Ibrahim Kanaan, Chairman of the Finance and Budget Committee MP, labeled the "Financial Gap and Deposit Recovery" draft law unviable under its current configuration, emphasizing its failure to garner internal or external consensus. Kanaan demanded a structural rewrite of the document prioritizing actual depositor capacity to recover funds, rejecting superficial or speculative regulatory assertions.\n\nFor Lebanon\'s depositors, a true financial rehabilitation framework demands clear legislative reforms away from statistical obfuscation. Five priority pillars delineate their key expectations:\n\n1. Dismantling the "85% Protected" Narrative: Depositors demand the omission of the arbitrary $100,000 protection ceiling, pointing out that true economic protection must be evaluated by cash volume rather than account counts. Statistics show that under $100,000, only 14% of the aggregate deposit volume is covered.\n\n2. Preserving Legitimate Interest Rates: Retrospective cuts on pre-crisis interests are rejected. Interest remains a binding contractual right rather than an optional grant.\n\n3. Backing Sovereign Bonds with State Assets: Speculative post-dated bonds must be collateralized by tangible public enterprises (such as gold reserves, national ports, airports, and telecom licenses) to restore long-term confidence.\n\n4. Reinstating Post-October 17 Conversions: Rejecting arbitrary 60% cuts on legal currency conversions completed under central bank oversight.\n\n5. Compensation for LBP-Denominated Accounts: Implementing custom mechanisms to salvage native currency depositors whose assets evaporated during the hyper-devaluation.',
    author: {
      nameAr: 'بيروت: الدائرة الاقتصادية والبرلمانية',
      nameEn: 'Beirut: Fiscal & Parliamentary Desk',
      titleAr: 'محلل السياسات النقدية والمصرفية',
      titleEn: 'Monetary & Banking Policy Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600',
    date: '17 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 8900
  },
  {
    id: 'leb-undp-eval',
    category: 'lebanon',
    titleAr: 'الأمم المتحدة تقدّر الأضرار الحضرية العينية في جبل لبنان وبيروت بـ 365 مليون دولار',
    titleEn: 'UN Assessment Values War Sufferings in Mount Lebanon and Beirut at $365M',
    summaryAr: 'شراكة بحثية سريعة تستعمل تقنيات الذكاء الاصطناعي الجغرافي (GeoAI) لتشخيص الخسائر وتحديد متطلبات إعادة الإعمار السكنى.',
    summaryEn: 'Collaborative analysis leveraging Geospatial Intelligence (GeoAI) charts destruction across baily districts, recording over 648,000 m³ of debris.',
    contentAr: 'أعلن برنامج الأمم المتحدة الإنمائي (UNDP)، بالتنسيق مع المجلس الوطني للبحوث العلمية في لبنان (CNRS-L) وبالتعاون مع الجيش اللبناني وإدارة الأمم المتحدة لشؤون السلامة والأمن (UNDSS)، عن نتائج تقييم سريع للمباني المتضررة جراء الحرب في بيروت وجبل لبنان. ويهدف التقييم إلى تقديم تقديرات أولية لحجم الأضرار ودعم جهود التخطيط للتعافي وإعادة الإعمار، معتمداً على تقنيات الذكاء الاصطناعي الجغرافي المكاني (GeoAI)، وتحليل صور الأقمار الصناعية، والتحقق الميداني.\n\nوقدّر التقييم الأضرار المباشرة التي لحقت بالمباني في بيروت وجبل لبنان بـ 365 مليون دولار، حيث بلغت حصة جبل لبنان 349.7 مليون دولار (95.8% من الإجمالي)، بينما بلغت أضرار بيروت 15.4 مليون دولار (4.2%). وتشير التقديرات إلى أن 146 مبنى (تضم 3,168 وحدة سكنية) دُمّرت بالكامل، في حين تضرر 264 مبنى (تضم 4,437 وحدة سكنية) بشكل جزئي، واستُهدفت 54 شقة بشكل مباشر.\n\nوكانت مناطق برج البراجنة، الشياح، الشويفات-العمروسية، الحدث، حارة حريك، والليلكي هي الأكثر تضرراً في جبل لبنان، بينما كانت عين المريسة، الباشورة، المزرعة، والمصيطبة الأكثر تضرراً في العاصمة بيروت. ونتج عن هذه الأضرار ما يقارب 648,942 متراً مكعباً من الركام والأنقاض، كان نصيب قضاء بعبدا منها 92.7%.',
    contentEn: 'The United Nations Development Programme (UNDP), paired with the National Council for Scientific Research in Lebanon (CNRS-L) and Mount Lebanon Municipalities, evaluated war-induced losses in Beirut and Mount Lebanon district at $365 million. Mount Lebanon accounts for 95.8% ($349.7m) of structural damages.\n\nThe systematic GeoAI-based monitoring mapped 146 completely flattened edifices (having 3,168 housing units) and 264 partially struck buildings. Bourj el-Barajneh, Haret Hreik, Chyah, and Hadath are labeled as heavily hit zones, yielding 648,942 cubic meters of construction rubble and concrete debris.',
    author: {
      nameAr: 'الأمم المتحدة: برنامج التنمية والإغاثة',
      nameEn: 'UN Habitat & Development Group',
      titleAr: 'أخصائي الإحصاء وإعادة الإعمار الجغرافي',
      titleEn: 'Urban Recovery and Spatial Specialist'
    },
    imageUrl: 'https://images.unsplash.com/photo-1547483238-2cbf88bc33a4?auto=format&fit=crop&q=80&w=1200',
    date: '10 يونيو 2026',
    readTimeAr: '4 دقائق',
    readTimeEn: '4 min read',
    views: 4570
  },
  {
    id: 'telecom-2',
    category: 'telecom-internet',
    titleAr: 'أزمة النطاق العريض والجيل الخامس في الأرياف اللبنانية: التمكين المستقل عبر الطاقة الشمسية والميكرو-ستلايت',
    titleEn: 'Rural Broadband and 5G in Lebanon: Off-Grid Nodes Powered by Solar and Micro-Satellites',
    summaryAr: 'مجموعة من المهندسين اللبنانيين تؤسس أول تعاونية لتوفير نفاذ إنترنت مستدام ومبني محلياً في القرى الجبلية والحدودية النائية.',
    summaryEn: 'A group of local engineers constructs the first off-grid community network, offering satellite internet and mesh-node WiFi in mountainous villages.',
    contentAr: 'في ظل غياب التغذية الكهربائية المنتظمة لسنترالات الاتصالات الرسمية، تشكل شبكات الإنترنت اللاسلكية التعاونية حلاً فاعلاً للأرياف. ففي جبال عكار والجنوب، أثبتت منظومات الإرسال المصغرة العاملة بالطاقة الشمسية قدرتها على إدامة الاتصال بنسبة 99.8%.\n\nتعتمد هذه المنظومة على دمج إشارات الأقمار الصناعية ذات المدارات المنخفضة (LEO) مع شبكة توجيه محلية (Mesh Networks) مفتوحة الكود، مما يخفض التكلفة بنسبة 60% ويمنح مئات المزارعين والطلاب نافذة موثوقة ومستقلة كلياً عن شبكة الكهرباء العامة المهترئة.',
    contentEn: 'Given persistent state electricity failure affecting telecom centers, decentralized WiFi cooperatives offer a vital lifeline for rural economies. Across Mount Lebanon and Akkar, home-grown solar antennas maintain an aggregate uptime of 99.8%.\n\nMerging LEO (Low Earth Orbit) satellite signals with open mesh routing architectures, these nodes slice operational costs by 60%, delivering independent high-speed data flow to agricultural cooperatives, schools, and local clinics.',
    author: {
      nameAr: 'كريم صعب',
      nameEn: 'Karim Saab',
      titleAr: 'مراسل شؤون التكنولوجيا والريف',
      titleEn: 'Technology & Rural Envoy'
    },
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    date: '14 يونيو 2026',
    readTimeAr: '4 دقائق',
    readTimeEn: '4 min read',
    views: 3150
  },
  {
    id: 'research-1',
    category: 'research-reports',
    titleAr: 'معهد التخطيط الإنمائي العربي: دراسة هيكلية حول إدارة المياه والأمن الغذائي في المشرق العربي لعام 2026',
    titleEn: 'Arab Development Planning Institute: A Structural Study on Water Management and Food Security in 2026',
    summaryAr: 'دراسة محكمة تحذر من تآكل المياه الجوفية وتدشين استراتيجية مستعجلة للتحول نحو أنظمة الري بالتنقيط والحصاد المائي في سهول البقاع والشمال.',
    summaryEn: 'An academic study sounds the alarm on aquifer depletion, calling for immediate micro-irrigation and rain harvesting across key agricultural basins.',
    contentAr: 'تضمن التقرير الصادر حديثاً عن معهد التخطيط الإنمائي العربي قراءة نقدية معززة بالأرقام والخرائط الحرارية لمستوى تآكل الموارد المائية السطحية والجوفية في حوض نهر الليطاني والسهول المغذية له. ويقر التقرير أن الاستهلاك المفرط لآبار الضخ غير المشروعة يهدد بنقص بنيوي يصل إلى 35% بحلول عام 2030.\n\nوتقترح الورقة البحثية مصفوفة حوافز للمزارعين لاعتماد الزراعة الذكية مناخياً، والتركيز على محاصيل تكتفي بكميات قليلة من الري، وتطوير تكنولوجيا الاستمطار المحسنة لإنقاذ الموسم اللبناني.',
    contentEn: 'A newly published report by the Arab Development Planning Institute presents a data-driven critical reading, complete with thermal maps, of water depletion in the Litani basin. The paper asserts that unregulated extraction risks a baseline structural deficit of 35% by 2030.\n\nThe research outlines a proposed strategic package recommending climate-smart farming incentives, a pivot to dry-crop species, and specialized rainwater harvesting reservoirs to secure Lebanon’s interior crops.',
    author: {
      nameAr: 'د. ليلى فخر الدين',
      nameEn: 'Dr. Layla Fakhreddin',
      titleAr: 'أستاذة العلوم البيئية المساعد',
      titleEn: 'Environmental Science Lead Scholar'
    },
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    date: '15 يونيو 2026',
    readTimeAr: '7 دقائق',
    readTimeEn: '7 min read',
    views: 5410
  },
  {
    id: 'research-2',
    category: 'research-reports',
    titleAr: 'المرونة الاقتصادية للمجتمعات الزراعية: تقرير إحصائي حول مسارات التمويل التعاوني اللبناني العابر للأزمات',
    titleEn: 'Economic Resilience of Agri-Communities: A Statistical Report on Cooperative Lebanese Funding Lines',
    summaryAr: 'مسح شامل يظهر كيف تمكنت الجمعيات التعاونية المحلية ونظام "جمعيات الادخار العائلية" من حماية أكثر من 40 ألف مزارع من الانهيار المصرفي الكامل.',
    summaryEn: 'An extensive survey reveals how local cooperatives and mutual-aid seed programs safeguarded over 40,000 farmers amid banking sector collapse.',
    contentAr: 'يكشف التحليل المالي التفصيلي المنجز بالتعاون مع المركز الوطني للأبحاث الإحصائية أهمية الاقتصاد التضامني والتعاونيات كصمام أمان بديل في بلد يفتقر لنظام ائتماني رسمي مستقر. فقد استطاعت التعاونيات الذاتية تمويل شراء بذور ومحروقات بقيمة إجمالية فاقت الـ 12 مليون دولار.\n\nهذه الممارسات، التي تعود جذورها لتقاليد التضامن الريفي اللبناني القديم، تُثبت وتثري المناهج الأكاديمية الباحثة عن مخارج وحلول لتفادي شلل الأسواق الناشئة في فترات الغليان الاقتصادي.',
    contentEn: 'This quantitative financial audit, created alongside the National Center for Statistical Research, illustrates the prowess of solidarity economics in markets lacking formal credit lines. Rural cooperatives successfully capitalized seeding programs exceeding $12 million in organic volume.\n\nThese practices, rooted in old Lebanese rural mutual-aid customs, supply unique field models to academic researchers looking for alternative survival frameworks in fragile global financial structures.',
    author: {
      nameAr: 'رائد الجميل',
      nameEn: 'Raed El-Gemayel',
      titleAr: 'عضو فريق الرصد الإحصائي والميداني',
      titleEn: 'Senior Quantitative Field Researcher'
    },
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
    date: '13 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 4390
  },
  {
    id: 'sports-1',
    category: 'sports',
    titleAr: 'تاريخ النهضة الرياضية في المدارس العتيقة لبيروت: حين كانت الرياضة فلسفة بناء الهوية الإنسانية',
    titleEn: 'The Legacy of Sports in Beirut’s Historic Schools: When Athletics Formed National Identity',
    summaryAr: 'دراسة نوستالجية تحيي حقبة الأربعينيات والخمسينيات في الجامعة الأمريكية والكلية الإنجيلية اللبنانية، حيث كانت الرياضة وسيلة تلاقٍ ثقافي وسلام أهلي.',
    summaryEn: 'A reflective historiographical review of the 1940s and 50s at AUB and local Lebanon colleges, when athletics served as a catalyst for cultural peace.',
    contentAr: 'لم تكن الملاعب ذات يوم ساحات لتسجيل الأرقام والبطولات الباردة فحسب، بل كانت مختبراً لإعداد قادة الفكر وصقل الشخصية المتزنة في لبنان الحداثة. وتستعرض هذه القراءة الأرشيفية كيف قادت جامعات بيروت أول حركة لنشر السباحة الطويلة، ومباريات العدو الريفي العابر لبلديات العاصمة.\n\nتعد محاكاة هذه التجربة المضيئة أمراً حيوياً اليوم لترميم النسيج الاجتماعي اللبناني، واستبصار الرياضة كأداة قهر لخطابات الكراهية وبناء الجسور المتجاوزة للفئوية الضيقة.',
    contentEn: 'Athletic fields in Lebanon’s golden era were never merely arenas for numerical scores or simple trophies; they were academic incubators shaping civic characters. This archival review tracks how historic Beirut campuses designed the early regional long-distance swimming matches and cross-city marathons.\n\nRevisiting this chapter is crucial to reconstruct modern social tissue, positioning sports as a dynamic antidote to partisan discourse and an elegant connector across regional divides.',
    author: {
      nameAr: 'فؤاد البستاني',
      nameEn: 'Fouad Al-Boustany',
      titleAr: 'مؤرخ ومحقق شؤون التراث الرياضي',
      titleEn: 'Sports Historian & Researcher'
    },
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=600',
    date: '16 يونيو 2026',
    readTimeAr: '5 دقائق',
    readTimeEn: '5 min read',
    views: 3950
  },
  {
    id: 'sports-2',
    category: 'sports',
    titleAr: 'من ملاعب بدارو إلى البطولة العالمية: نهضة الشطرنج التكتيكي اللبناني والشباب الواعد',
    titleEn: 'From Badaro Clubs to the World Stage: The Rise of Tactical Chess and Lebanese Youth Competence',
    summaryAr: 'الشباب اللبناني يحقق مراتب متقدمة في بطولات أوروبا والشرق الأوسط للشطرنج الكلاسيكي والسريع بمجهودات ذاتية فريدة.',
    summaryEn: 'Independently trained young Lebanese players capture top spots in classical and rapid chess regional championships across Europe and Asia.',
    contentAr: 'استطاع الوفد اللبناني الشاب حصد ثلاث ميداليات ذهبية في بطولة الشطرنج الدولي المبرمج لعام 2026 المجرية. ورغم الشلل المالي، يثبت هؤلاء الفتية تفوق المعادل الذهني والتفكير الاستباقي اللبناني في المحافل الدولية.\n\nيعود جزء كبير من هذا الفوز لنوادي الأحياء والبلديات في بيروت وصيدا وجبل لبنان، التي احتضنت مباريات ليلية وحلقات تمثيل تكتيكي ساهمت في صقل المهارات الذهنية للفتيان بعيداً عن ألعاب الألواح الرقمية السطحية.',
    contentEn: 'The young Lebanese national chess delegation earned three gold medals at the 2026 Budapest Rapid Invitationals. Despite financial constraints, these youth showcase the resilience of Lebanese mental acuity and complex analytical mapping on the world stage.\n\nMuch of this achievement is credited to municipal and community clubs across Beirut and Saida, hosting night leagues and local matches that sharpened mental sharpness away from shallow online gaming traps.',
    author: {
      nameAr: 'طارق الدنا',
      nameEn: 'Tarek Al-Dana',
      titleAr: 'رئيس قسم التحرير الرياضي للصحيفة',
      titleEn: 'Al-Warraq Sports Editor'
    },
    imageUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=600',
    date: '15 يونيو 2026',
    readTimeAr: '4 دقائق',
    readTimeEn: '4 min read',
    views: 3200
  },
  {
    id: 'wellness-1',
    category: 'wellness-lifestyle',
    titleAr: 'العودة إلى عادات البحر الأبيض المتوسط: كيف يصنع زيت الزيتون في الكورة فلسفة العافية البطيئة والتعمير',
    titleEn: 'Return to Mediterranean Roots: How Koura Olive Oil Shapes the Art of Slow Living and Longevity',
    summaryAr: 'جولة فوتوغرافية متأنية في قرى الكورة تسرد حياة المسنين الذين تخطوا المئة عام بنظام غذائي بسيط مرتكز على الزيت، العسل، الطمأنينة والصداقة الإنسانية.',
    summaryEn: 'An immersive photo-essay into Koura villages detailing centenarians who build their slow lifestyle on hand-pressed olive oil, mountain herbs, and absolute peace.',
    contentAr: 'في زمن العجلة واللهث اللامنتهي خلف السراب الاجتماعي، تحتفظ قرى قضاء الكورة بشمال لبنان بنبض حياة عتيق ومطمئن. يعتمد المسنون هناك على بساطة الوجبة وثراء الجسد بالحركة الطبيعية في كروم الزيتون العتيقة المروية بمياه الأمطار.\n\nتثبت تقارير العافية المعاصرة أهمية حمية المتوسط الحية، حيث تندر أمراض القلب المزمنة وتنخفض نسب الكورتيزول الضارة بفضل غياب الشاشات وزخم اللقاءات والصلات الإنسانية اليومية الصداقة والحميمة.',
    contentEn: 'In an era of relentless speed, the villages of Koura in Northern Lebanon retain a serene, centripetal momentum. Local elders predicate their daily health on dietary minimalism and consistent physical movement under historical mountain olive groves.\n\nModern longevity charts confirm standard Mediterranean habits: lower vascular stress and minimized cortisol levels in older subjects, credited directly to absolute digital detoxes and high-density circular bonds within close-knit family units.',
    author: {
      nameAr: 'مايا حداد',
      nameEn: 'Maya Haddad',
      titleAr: 'محررة شؤون الصحة والأنثروبولوجيا الغذائية',
      titleEn: 'Wellness & Anthropology Writer'
    },
    imageUrl: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=600',
    date: '16 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 4560
  },
  {
    id: 'wellness-2',
    category: 'wellness-lifestyle',
    titleAr: 'العمران الصديق للإنسان: فلسفة المساحات الخضراء والتهوية الطبيعية في عمارة بيروت المعاصرة والمستقبلية',
    titleEn: 'Human-Centric Urbanism: Green Terraces and Passive Ventilation in Contemporary Beirut Architecture',
    summaryAr: 'مهندسون لبنانيون صاعدون يستكشفون إعادة دمج باحات العمارة البيروتية التقليدية (الديوان واللياوان) لإنتاج مبانٍ مستدامة وصحية وموفرة للطاقة.',
    summaryEn: 'Emerging architects rediscover traditional Lebanese structures, like central courtyards, to foster passive cooling and wellness in concrete high-rises.',
    contentAr: 'يقف المعماريون المعاصرون اليوم منبهرين أمام حكمة البناء اللبناني القديم في تهيئة مناخات تكييف طبيعية بدون اللجوء للمولدات والآلات الصاخبة والمكلفة. إن إعادة تصميم الشرفات الواسعة لتستوعب المغروسات العمودية وترشيد ضوء الشمس يشكل أساساً لمطالب الصحة النفسية والجسدية لأبناء العاصمة.\n\nهذا المقال يبحث في مبادرات جديدة تقودها كليات العمارة لبناء مساكن تشجع التفاعل الجسدي والاجتماعي الممتع، وإعادة الاعتبار للمصاطب العائلية العريقة.',
    contentEn: 'Contemporary structural designers find thermal inspiration in traditional grand Lebanese stone craftsmanship. Reconditioning modern apartments with shaded central diwans and vertical gardens generates passive ventilation cycles, minimizing expensive mechanical utility loads.\n\nThis article outlines new municipal and private efforts from local architecture centers, reconstructing residential zones to inspire dynamic social encounters and restorative spaces.',
    author: {
      nameAr: 'طارق المرعبي',
      nameEn: 'Tarek El-Marabi',
      titleAr: 'باحث ومصمم معماري مستقل',
      titleEn: 'Architectural Consultant'
    },
    imageUrl: 'https://images.unsplash.com/photo-1545235621-c224c297acda?auto=format&fit=crop&q=80&w=600',
    date: '14 يونيو 2026',
    readTimeAr: '5 دقائق',
    readTimeEn: '5 min read',
    views: 3820
  },
  {
    id: 'fifa-1',
    category: 'fifa-2026',
    titleAr: 'بث ومؤثرات تفاعلية فائقة: كيف يستعد الجمهور اللبناني لمشاهدة مونديال 2026 بأساليب مبتكرة',
    titleEn: 'Hyper-Interactive Broadcasts: How Lebanese Audiences Prepare for FIFA 2026 with Innovative Local Screenings',
    summaryAr: 'النوادي والمقاهي في عواصم ومحافظات لبنان تؤسس لمجمعات بث رقمي بديل للتأقلم مع فوارق التوقيت وتوفر شاشات عرض عملاقة صديقة للبيئة.',
    summaryEn: 'Clubs and cultural centers across Lebanon establish solar-powered community screening complexes to experience FIFA 2026 despite power grid limits.',
    contentAr: 'بدأت لجان التنسيق البلدية بالتكامل مع هيئات شبابية ريادية في بيروت، جبيل، وصيدا تهيئة باحات مفتوحة ومساحات عامة وتجهيزها بشاشات إسقاط ضوئي تعمل بالكامل بالطاقة النظيفة لمتابعة المباريات الأسطورية لمونديال كأس العالم "فيفا 2026" المقام في المدن الأمريكية والكندية والمكسيكية.\n\nتأتي هذه الخطوة لتجنب كرب انقطاع التيار الكهربائي العام، وتأكيداً على الوعي اللبناني وقدرته الدائمة على هندسة المساحات المشتركة الفرحة وابتداع مسارات تواصل واحتفال شعبي واجتماعي تعزز التآلف وتعمق الروح الرياضية المشرقة.',
    contentEn: 'As the countdown begins for the historic North American FIFA World Cup 2026, Lebanese community associations are transforming local public squares in Beirut, Byblos, and Saida into energy-independent viewing lounges driven by solar battery systems.\n\nThis civic innovation circumvents standard local infrastructure challenges, rendering matches affordable and accessible for thousands of youth, and rebuilding structural social cohesiveness around positive, modern global sports events.',
    author: {
      nameAr: 'طارق الدنا',
      nameEn: 'Tarek Al-Dana',
      titleAr: 'رئيس قسم التحرير الرياضي للصحيفة',
      titleEn: 'Al-Warraq Sports Editor'
    },
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600',
    date: '16 يونيو 2026',
    readTimeAr: '5 دقائق',
    readTimeEn: '5 min read',
    views: 8940
  },
  {
    id: 'fifa-2',
    category: 'fifa-2026',
    titleAr: 'الأحلام العربية في الملاعب الأمريكية: طموحات المنتخبات والتمثيل الآسيوي والأفريقي لعام 2026',
    titleEn: 'Arab Dreams in America: Tactical Forecasts for Regional National Squads in the 2026 Expansion Tournament',
    summaryAr: 'مع اتساع رقعة المشاركة إلى 48 منتخباً، تتوجه أنظار المحللين العرب إلى تطلعات المنتخبات العربية لتسجيل حضور كروي مذهل وغير مسبوق.',
    summaryEn: 'With the field expanded to 48 teams, Arab sports commentators outline tactical prospects and athletic expectations for qualified regional squads.',
    contentAr: 'يمثل مونديال 2026 فرصة تنموية كروية فريدة من نوعها بفضل توسيع رقعة المنتخبات من قبل الفيفا. وتركز القراءات الرياضية الاستقصائية على تكتيكات اللعب، ونسبة اللياقة، وتأثير النجوم المحترفين في أندية النخبة الأوروبية والآسيوية.\n\nإن التحضيرات الفنية المتقدمة للمنتخبات تتصاعد بشكل كبير، وتتوقع دوائر التحليل بالصحيفة أن يحمل هذا المونديال مفاجآت تكتيكية تزيح الستار عن قوى صاعدة جديدة تعيد خلط الأوراق وترسم خريطة توزيع وتنافسية كروية أكثر ديمقراطية وجمالاً.',
    contentEn: 'The expansion of the World Cup roster to 48 competing nations marks a revolutionary milestone for developing football boards. High-level tacticians analyzed key regional strategies, physical preparation, and the influence of elite players playing in European and Gulf leagues.\n\nAl-Warraq’s sports desk forecasts that this historic edition will disrupt classic hierarchies, generating unexpected results and crowning brand-new dark horses on the world stage.',
    author: {
      nameAr: 'غسان التويني',
      nameEn: 'Ghassan Tueni',
      titleAr: 'محلل رياضي دولي وموفد الأهرام للشمال المائي',
      titleEn: 'International Football Envoy'
    },
    imageUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=600',
    date: '15 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 7420
  },
  {
    id: 'desk-cpi-extortion',
    category: 'editor-desk',
    titleAr: 'عنف صامت في الأرقام: كيف يلتهم التضخم والابتزاز ميزانية الأسرة اللبنانية في عام 2026',
    titleEn: 'Silent Violence in Numbers: How Inflation and Extortion Devour Lebanese Household Budgets in 2026',
    summaryAr: 'تحقيق ميداني واقتصادي في بيروت يستعرض تفاصيل قفزة التضخم لشهر آذار 2026 إلى 17.26% وتجاوز مؤشر المستهلك 8,400 نقطة بفعل ابتزاز الكارتلات ومصائب الوقود.',
    summaryEn: 'An in-depth investigation from Beirut details the surge of March 2026 inflation to 17.26% and the CPI crossing 8,400 points, driven by cartel exploitation and fuel price hikes.',
    contentAr: `بيروت — هناك عنف صامت في الأرقام. بينما تمتلئ سماء الجنوب بدخان المدفعية، يقع هجوم آخر أكثر مكراً في الأسواق، ومحطات الوقود، ومكاتب الفواتير في لبنان. لقد أصبح مؤشر أسعار المستهلك (CPI) بمثابة دفتر حسابات للابتزاز.\n\nالاستقرار الاقتصادي الهش الذي شهده لبنان في عام 2025 تم محوه بالكامل. مدفوعاً بإغلاق مضيق هرمز، وارتفاع أسعار النفط الخام العالمي إلى ما فوق 110 دولارات للبرميل، وشلل أجهزة الدولة، عاد التضخم ليفترس ما تبقى من ميزانية الأسرة اللبنانية.\n\nلكن هذه ليست مجرد أزمة مستوردة. إنها درس احترافي في الاستغلال المحلي، حيث يتم تحويل كل صدمة جيوسياسية فوراً إلى أرباح طائلة من قبل الكارتلات (المافيات) المحلية.\n\n### الأرقام التي تنزف\nلِفهم مدى سرعة انهيار الأرض تحت أقدام المواطن اللبناني، يكفي أن تنظر إلى بيانات إدارة الإحصاء المركزي لشهر آذار 2026.\n\nارتفع التضخم على أساس سنوي إلى 17.26%—وهو أعلى ارتفاع منذ الأيام المظلمة في أواخر عام 2024. حطم مؤشر أسعار المستهلك حاجز الـ 8,400 نقطة. هذا ليس مجرد زحف عام للأسعار؛ بل هو هجوم موجه على ركائز البقاء الأساسية:\n\n- النقل (ارتفاع بنسبة 24.81%): مدفوع بالكامل بأزمة الوقود وتأثيرها المتسلسل على وسائل النقل العام.\n- السكن والمياه والكهرباء والوقود (ارتفاع بنسبة 20.26%): انعكاس مباشر لاستغلال مافيات المولدات في الأحياء للغياب التام لكهرباء الدولة.\n- الغذاء والمشروبات (ارتفاع بنسبة 19.41%): تفاقمت الأزمة بسبب تدمير الأراضي الزراعية في الجنوب والارتفاع الجنوني في تكاليف الشحن العالمي.\n- التعليم (ارتفاع بنسبة 35.67%): أعلى زيادة قطاعية، حيث رفعت المدارس الخاصة الأقساط بشكل كبير بالدولار "الفريش" بحجة "تغطية التكاليف التشغيلية".\n\n### الوقود: محرك الابتزاز\nالوقود هو شريان الأزمة اللبنانية. ونظراً لأن شبكة الدولة توفر ما يقرب من صفر كهرباء، فإن كل منزل ومخبز ومستشفى ومضخة مياه يعمل على مولدات الديزل (المازوت).\n\nاعتباراً من منتصف حزيران 2026، يحوم سعر صفيحة البنزين (20 لتراً) 95 أوكتان حول 2,350,000 ليرة لبنانية، بينما يتجاوز سعر المازوت 2,000,000 ليرة لبنانية.\n\nلكن المأساة ليست فقط في السعر العالمي للنفط؛ بل في تواطؤ الدولة. في شباط 2026، ومع تصاعد الحرب الإقليمية واختناق سلاسل التوريد العالمية، فرضت الحكومة اللبنانية زيادة ضريبية تعسفية بقيمة 300,000 ليرة على البنزين وأدخلت رسوماً جمركية جديدة على حاويات الشحن. فالدولة، المفلسة تماماً واليائسة لجمع الإيرادات، قررت موازنة حساباتها عبر فرض ضرائب مباشرة على التنقلات اليومية لأفقر مواطنيها.\n\nالخنق المالي للميزانية: الموظف في القطاع العام الذي يكسب 30 مليون ليرة شهرياً ينفق الآن ما يعادل أجر ثلاثة أيام عمل كاملة فقط لشراء ما يكفي من الوقود للقيادة إلى العمل لمدة أسبوع. "الميزانية" لم تعد موجودة؛ بل أصبحت مجرد تمرين في كيفية البقاء على قيد الحياة وسط العجز.\n\n### تشريح الاستغلال (تجار الأزمات)\nالأزمة في لبنان هي صناعة مربحة للغاية. كلما حدثت صدمات عالمية، تنطلق آلة محلية مزيتة جيداً لتجار الحروب والأزمات:\n\n1. مافيات المولدات\nفي ظل موت شبكة كهرباء الدولة، يعمل أصحاب المولدات في الأحياء كاحتكارات محلية. عندما ارتفعت أسعار المازوت بسبب صراع الخليج، لم ترتفع فواتير المولدات لتغطية التكاليف فحسب—بل حلقت عالياً. تسعيرة الاشتراك الأساسي بقوة 5 أمبير (تكفي بالكاد لتشغيل ثلاجة وبعض المصابيح) يتم تحديدها بشكل تعسفي، وغالباً ما تُطلب بالدولار النقدي، لتلتهم ما يصل إلى 40% من دخل أسرة من الطبقة المتوسطة.\n\n2. مافيا التعليم\nإن التضخم بنسبة 35.67% في قطاع التعليم يكشف عن حقيقة قاسية. فقد رفعت المؤسسات الخاصة الرسوم بشكل استباقي، متحججة بـ "المواد التعليمية المستوردة والصيانة"، مما أجبر الآباء على الدفع بالعملة الصعبة أو إخراج أطفالهم من المدارس بالكامل. التعليم، الذي كان يوماً ما الصادرات الأساسية للبنان، أصبح سلعة كمالية.\n\n3. السوق السوداء في السوبرماركت\nنظراً لأن لبنان يستورد أكثر من 80% من بضائعه، فإن تعطل مضيق هرمز منح كبار المستوردين العذر المثالي. المنتجات القابعة في المستودعات المحلية منذ أشهر يتم تسعيرها فجأة بين ليلة وضحاها وفقاً "لتسعيرة الحرب" الجديدة. علاوة على ذلك، أدى نزوح أكثر من مليون شخص من الجنوب إلى خلق صدمات طلب محلية; حيث قام الملاك في المناطق "الآمنة" مثل جبل لبنان بمضاعفة الإيجارات ثلاث وأربع مرات، مستغلين يأس النازحين.\n\n### دولة تفترس مواطنيها\nيثبت تضخم عام 2026 حقيقة مريرة عن لبنان: الدولة لا تحمي مواطنيها من الصدمات الخارجية؛ بل تضخمها.\n\nوبينما تحتفل الحكومة بـ "استقرار" سعر الصرف عند 89,500 ليرة للدولار، فإنها تتجاهل حقيقة أن هذا الاستقرار مبني على مقبرة من القدرة الشرائية. لقد تمت دولرة الاقتصاد بالكامل وبشكل عنيف، ومع ذلك تظل الرواتب للأغلبية الساحقة راكدة.\n\nإن مؤشر أسعار المستهلك وتكاليف الوقود ليست مجرد مؤشرات اقتصادية—بل هي العلامات الحيوية لشعب يتعرض لتجويع ممنهج من قبل حرب إقليمية ومافيا محلية لا تفوت فرصة للربح من الذعر.`,
    contentEn: 'Beirut — There is a silent violence in numbers. While the southern skies fill with artillery smoke, a more insidious attack plays out across Lebanese markets, gas stations, and billing offices. The Consumer Price Index (CPI) has effectively become a ledger of systemic extortion.\n\nThe fragile economic stability witnessed in 2025 has been entirely wiped out. Propelled by the blockade of the Strait of Hormuz, global crude oil prices rising past $110 per barrel, and complete paralization of state machinery, inflation has returned to devour what remains of local household budgets.\n\nBut this is not merely an imported crisis; it is a masterclass in domestic exploitation, where every geopolitical tremor is instantly converted into vast profits by local cartels.\n\n### The Bleeding Figures\nTo comprehend how quickly the ground is collapsing under Lebanese consumers, one needs to scan the Central Administration of Statistics data for March 2026.\n\nYear-on-year inflation has soared to 17.26%—the steepest spike since the dark days of late 2024. The Consumer Price Index has shattered the 8,400-point threshold. This is not a general creeping up of prices, but a targeted assault on the pillars of survival:\n\n- Transportation (up 24.81%): Driven entirely by the fuel squeeze and its compounding effect on public transport.\n- Shelter, Water, Electricity, & Fuel (up 20.26%): A direct reflection of neighborhood generator cartels exploiting the total absence of state-provided electricity.\n- Food & Beverages (up 19.41%): Aggravated by the devastation of agricultural land in the south and soaring global shipping rates.\n- Education (up 35.67%): The highest trailing sector increase, as private schools dramatically hiked tuition fees in "fresh" USD under the guise of covering operational costs.\n\n### Fuel as an Engine of Extortion\nFuel remains the primary artery of the Lebanese crisis. Since the public grid provides roughly zero hours of electricity, every home, bakery, hospital, and water pump relies on diesel-powered neighborhood generators.\n\nAs of mid-June 2026, a 20-liter canister of 95-octane gasoline hovers around 2,350,000 LBP, while diesel exceeds 2,000,000 LBP.\n\nBut the tragedy is not just international crude pricing; it is state complicity. In February 2026, amid escalating regional conflicts and choked global supply chains, the Lebanese government instituted an arbitrary tax hike of 300,000 LBP on gasoline and introduced new customs duties on shipping containers. The broke state, desperate for revenue, chose to balance its books by directly taxing the daily commutes of its poorest citizens.\n\nThe financial choke on household budgets is stark: a public sector worker making 30 million LBP monthly now spends three full working days\' worth of wages just to buy enough fuel to drive to the office for a single week. A "budget" no longer exists; it is merely an exercise in survival under a perpetual deficit.\n\n### Anatomy of Exploitation (The Crisis Profiteers)\nThe crisis in Lebanon is a highly lucrative industry. Whenever global shocks occur, a well-oiled domestic machinery of crisis cartels starts humming:\n\n1. Generator Cartels\nIn the absolute absence of state power services, neighborhood generator owners act as localized monopolies. When diesel rose, subscriptions skyrocketed arbitrarily, eating up to 40% of middle-class incomes.\n2. Educational Cartels\nThe 35.67% inflation in the education sector exposes a grim reality. Private institutions hiked fees preemptively under the guise of imported materials, forcing parents to pay in hard currency or pull children out of schools entirely.\n3. Supermarket Black Markets\nBlockades gave major importers the perfect pretext. Products sitting in warehouses for months are repriced overnight, and rent exploitation targeting displaced families from the south has doubled or tripled leasing fees.\n\n### A State Preying on its Citizens\nThe 2026 inflation validates a bitter truth: the Lebanese state does not shield its citizens from external shocks; it magnifies them.\n\nWhile the government celebrates exchange rate "stability" at 89,500 LBP, it ignores that this stability rests upon a cemetery of purchasing power. The economy resides under complete and aggressive dollarization, yet wages for the overwhelming majority remain entirely stagnant.\n\nThe CPI and fuel digits are not merely financial indicators; they are the vital signs of a populace subjected to systematic rationing of survival by both regional conflicts and local cartels that never waste a crisis.',
    author: {
      nameAr: 'أديب الوارّاق',
      nameEn: 'Adeeb Al-Warraq',
      titleAr: 'رئيس التحرير العام',
      titleEn: 'Editor-in-Chief',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600',
    date: '17 يونيو 2026',
    readTimeAr: '8 دقائق',
    readTimeEn: '8 min read',
    isFeatured: true,
    views: 11450
  },
  {
    id: 'me-dubai-resilience-2026',
    category: 'middle-east',
    titleAr: 'صمود ذكي: كيف تُعيد عقارات دبي تشكيل نفسها في ظل التوترات الإقليمية؟',
    titleEn: 'Smart Resilience: How Dubai Real Estate Reshapes Itself Amid Regional Geopolitical Tensions',
    summaryAr: 'بعد سنوات من الانتعاش القياسي صُنفت خلالها دبي كواحدة من أكثر أسواق العقارات سخونة في العالم، واجه القطاع اختباراً حقيقياً مع اندلاع الصراع الإقليمي الأخير. ورغم أن الحرب أبطأت وتيرة "الطفرة" السريعة، إلا أن المشهد الحالي لا يشير إلى انهيار، بل إلى مرحلة "تصحيح وتكيف ذكي".',
    summaryEn: 'After years of record-breaking expansion that positioned Dubai among the world\'s hottest real estate hub, the sector faced a genuine trial with the latest regional tensions. While conflict slowed the boom\'s velocity, the current picture signals mature correction and strategic adaptation rather than collapse.',
    contentAr: `بعد سنوات من الانتعاش القياسي صُنفت خلالها دبي كواحدة من أكثر أسواق العقارات سخونة في العالم، واجه القطاع اختباراً حقيقياً مع اندلاع الصراع الإقليمي الأخير. ورغم أن الحرب أبطأت وتيرة "الطفرة" السريعة، إلا أن المشهد الحالي لا يشير إلى انهيار، بل إلى مرحلة "تصحيح وتكيف ذكي"؛ حيث تراجعت أحجام المعاملات بشكل ملحوظ بينما أظهرت الأسعار تماسكاً ومرونة فاقت التوقعات.

### أولاً: بورصة الأرقام (أداء السوق في مايو 2026)
عكست بيانات دائرة الأراضي والأملاك في دبي (عبر شركة الأبحاث REIDIN) حالة الترقب التي سادت السوق خلال الأشهر الثلاثة الماضية، وجاءت المحصلة على النحو التالي:

- **إجمالي المبيعات السكنية:** سجلت السوق 22.5 مليار درهم (6.1 مليار دولار) في مايو، بانخفاض قدره 42% مقارنة بشهر أبريل، وهو ما يمثل نحو نصف قيمة مبيعات فبراير (قبل اندلاع النزاع) التي بلغت 46.6 مليار درهم.
- **المشاريع على الخارطة:** كانت الأكثر تأثراً، حيث انخفضت مبيعاتها بنسبة 50% لتصل إلى 15.8 مليار درهم، مع تراجع طفيف في أسعارها لم يتجاوز الـ 9%.
- **العقارات الجاهزة (السوق الثانوية):** أظهرت صلابة أكبر، إذ انخفضت قيم معاملاتها بنسبة تقل عن 15%، واستقر متوسط الأسعار عند 1730 درهماً للقدم المربع دون تغيير يُذكر عن مستويات نهاية العام الماضي.

### ثانياً: تباين سلوك السوق (بين الترقب والفرص الفاخرة)
تشهد السوق حالياً حالة من "الترقب المتبادل" بين البائعين والمشترين، لا سيما في قطاع العقارات الجاهزة. فالأثرياء والملاك الحاليون يفضلون الانتظار على خفض الأسعار، في حين يبحث المشترون عن صفقات اقتناص أفضل.

- **مؤشر الثقة الفاخرة:** رغم حالة عدم اليقين، لم تتوقف التدفقات الاستثمارية الكبرى؛ حيث شهد شهر مايو صفقة استثنائية لبيع قطعة أرض شاطئية في جزيرة نايا بقيمة تتجاوز 100 مليون دولار عبر "سوذبيز"، بالتوازي مع إطلاق شركة "بروكفيلد" مشروعاً جديداً بالتعاون مع "الشايع"، مما يؤكد جاذبية الأصول المتميزة طويلة الأجل.

### ثالثاً: استراتيجيات المطورين وتحول ديموغرافية المشترين
تفاعلت أطراف السوق مع الواقع الجديد بمرونة عالية لحفظ التوازن السعري:

1. **المطورون الكبار:** اتجهت شركات قيادية مثل "إعمار" إلى إبطاء وتيرة إطلاق المشاريع الجديدة والتركيز على بيع المخزون القائم مع التمسك بمستويات الأسعار الحالية.
2. **المطورون الصغار:** لجأوا إلى تقديم تخفيضات مرنة وتسهيلات لتحفيز المبيعات وجذب السيولة.
3. **هوية المستثمرين:** تحول المشترون التقليديون (مثل الهنود والبريطانيين) من الشراء المكثف إلى الاستثمار الانتقائي الحذر، في حين برز طلب جديد وأكثر وضوحاً من مستثمري دول الشرق الأوسط (مثل لبنان ومصر) بحثاً عن ملاذ آمن للتحوط.

### رابعاً: لماذا تختلف هذه المرحلة عن أزمة عام 2009؟
على عكس الهبوط الحاد الذي شهدته الإمارة في 2009 بنسبة تجاوزت 50%، تمتلك دبي اليوم مصدات هيكلية وتنظيمية تحميها من التقلبات العنيفة:

- **مكافحة المضاربة السريعة:** فرض قيود ائتمانية واشتراط دفعة مقدمة لا تقل عن 20% للأجانب حدّ من عمليات إعادة البيع السريعة بغرض التربح القصير.
- **التأشيرات الذهبية:** تحول دبي إلى موطن دائم للمقيمين بدلاً من مجرد محطة عمل مؤقتة، مما دفع السكان للاحتفاظ بعقاراتهم لغرض السكن بعيداً عن تقلبات السوق.
- **صلابة النظام المصرفي:** أكد اتحاد مصارف الإمارات استقرار مستويات القروض المتعثرة وعدم رصد حالات تخلف بارزة عن السداد، مدعومة بنضج البنوك وآليات تحصيل مرنة (حيث سدد أكثر من 85% من مشتري العقارات الفاخرة التزاماتهم في الموعد).

### الرؤية المستقبلية
رغم أن الاتفاق المؤقت بين واشنطن وطهران يمنح السوق جرعة تفاؤل، إلا أن التحدي القادم يكمن في قدرة السوق على استيعاب نحو 400 ألف وحدة سكنية يُتوقع ضخها في السنوات المقبلة، وهو ما سيتطلب نمواً سكانياً مستداماً لمواكبة المعروض.`,
    contentEn: `### Dubai Real Estate Cohesion & Shift
Following years of historic, record-breaking recovery that ranked Dubai as one of the hottest real estate markets globally, the sector faced a genuine trial with the onset of recent regional conflicts. While the hostilities slowed the velocity of the rapid "boom," the contemporary picture does not signal a collapse, but rather a phase of "smart correction and adaptation." Transaction volumes dropped significantly, yet prices demonstrated a resilience and stability that surpassed expectations.

### I. The Numeric Ledger (Market Performance in May 2026)
According to data compiled by the Dubai Land Department (via research firm REIDIN), a general sense of anticipation prevailed over the last three months, showing the following outcomes:

- **Total Residential Sales:** The market recorded 22.5 billion AED ($6.1 billion) in May, representing a 42% decrease compared to April. This is roughly half of the February sales (prior to conflict escalation), which had peaked at 46.6 billion AED.
- **Off-Plan Projects:** This sub-segment caught the brunt of the slowdown, with sales dropping 50% to hit 15.8 billion AED. However, its pricing only saw a gentle slippage not exceeding 9%.
- **Ready Properties (Secondary Market):** Demonstrated superior structural defense. Ready transaction values fell by less than 15%, while the average price stabilized firmly at 1,730 AED per square foot, remaining virtually unchanged from late last year's benchmarks.

### II. Market Behavior Divergence: Anticipation vs. Luxury Placements
The landscape is characterized by a "mutual standoff" between sellers and buyers, particularly in ready units. High-net-worth individual (HNWI) owners prefer to sit tight rather than undercut prices, while prospective buyers actively hunt for discounted distressed acquisitions.

- **The Luxury Access Gauge:** Despite the wider geopolitical haze, premium capital allocations did not pause. In May, an exceptional beachfront land plot transaction on Naya Island closed via Sotheby's for over $100 million. This occurred alongside Brookfield launching an ambitious joint venture with Al-Shaya, underscoring the long-term allure of top-tier micro-geographies.

### III. Developer Strategies and Changing Buyer Demographics
Market players reacted with high operational flexibility to maintain equilibrium:
- **Major Developers:** Industry conglomerates, led by Emaar, slowed down new project launches to clear existing inventories, defending their list prices.
- **Micro-Developers:** Turned to flexible, bespoke incentives and payment concessions to stimulate secondary liquidity.
- **Sovereign Origin of Capitals:** Traditional buyers (such as Indian and British nationals) scaled back high-amplitude trades to seek conservative asset allocations. Conversely, a prominent inflow of capital emerged from Levant territories (Egypt and Lebanon), seeking reliable shelters for wealth hedging.

### IV. Why This Cycle Differs from the 2009 Debt Shock
In contrast to the steep 2009 downturn where asset valuations plummeted by more than 50%, Dubai today operates with deep structural buffers and strict regulatory firewalls protecting it from systemic shocks:
- **Speculation Counters:** Strict credit limits and the 20% minimum down payment mandate for foreigners have successfully curbed volatile, short-term house-flipping practices.
- **Golden Visas:** Dubai has successfully transitioned from a transient regional employment hub into a permanent residence of choice, leading homeowners to retain their units for primary use.
- **Banking Soundness:** The UAE Banks Federation confirmed stable non-performing loan (NPL) ratios, supported by institutional maturity and flexible collection models. Over 85% of prime buyers met their financial obligations fully on time.

### Future Horizon
While the temporary bilateral understandings in the region provide market sentiment with a healthy dose of optimism, the ultimate challenge lies in the supply pipeline. Dubai is expected to integrate nearly 400,000 residential units over the coming years, requiring sustained civil and population growth to match incoming supply.`,
    author: {
      nameAr: 'نهاد المشنوق',
      nameEn: 'Nohad Machnouk',
      titleAr: 'محلل الشؤون الإقليمية للورّاق',
      titleEn: 'Regional Affairs Analyst, Al-Warraq'
    },
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600',
    date: '18 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 12450
  },
  {
    id: 'tech-eu-meta-whatsapp-2026',
    category: 'telecom-internet',
    titleAr: 'تحرك أوروبي حازم: إلزام "ميتا" برفع القيود عن منافسي الذكاء الاصطناعي في "واتساب"',
    titleEn: 'Decisive European Action: Meta Ordered to Lift WhatsApp Business Curbs for AI Rivals',
    summaryAr: 'أصدرت المفوضية الأوروبية قراراً عاجلاً يلزم شركة "ميتا بلاتفورمز" بتعليق سياساتها التي تعيق شركات الذكاء الاصطناعي المنافسة من استخدام منصة "واتساب للأعمال". وأمهلت المفوضية الشركة خمسة أيام لإعادة إتاحة الوصول المجاني.',
    summaryEn: 'The European Commission issued an urgent bind order compelling Meta Platforms to suspend policies that exclude competing artificial intelligence solutions from integrating with WhatsApp Business API.',
    contentAr: `أصدرت المفوضية الأوروبية قراراً عاجلاً يلزم شركة "ميتا بلاتفورمز" بتعليق سياساتها التي تعيق شركات الذكاء الاصطناعي المنافسة من استخدام منصة "واتساب للأعمال" (WhatsApp Business). وأمهلت المفوضية الشركة الأميركية خمسة أيام عمل لإعادة إتاحة الوصول المجاني لهذه الشركات، في خطوة استباقية تهدف إلى منع حدوث أضرار جسيمة لا يمكن تداركها في بيئة المنافسة.

### جوهر الخلاف وردود الأفعال
تصاعدت حدة التوتر بين الجانبين بعد سلسلة من الإجراءات والقرارات التي غيرت قواعد اللعبة في قطاع خدمات الأعمال الرقمية:

- **سبب التحرك الأوروبي:** أجرت "ميتا" مؤخراً تغييرات على سياساتها أدت بشكل مباشر إلى حرمان مزودي خدمات الذكاء الاصطناعي المنافسين من تقديم خدماتهم التجارية عبر منصة "واتساب".
- **رد فعل "ميتا":** تعهدت الشركة بالطعن رسمياً على القرار. وأعربت في بيان رسمي عن استيائها، مشيرة إلى أن القرار التنفيذي الأوروبي يجبرها فعلياً على السماح لشركات كبرى، مثل "أوبن إيه آي" (OpenAI)، باستخدام منتجها المدفوع مجاناً.
- **نقطة انطلاق التحقيق:** انطلقت شرارة هذه الأزمة التنظيمية من إيطاليا، حيث فتحت السلطات هناك تحقيقاً أولياً حول سياسات الذكاء الاصطناعي لـ "واتساب"، قبل أن تتدخل المفوضية الأوروبية في بروكسل لتوسيع نطاق التحقيق ليشمل القارة بأكملها.

### سجل غرامات "ميتا" في الاتحاد الأوروبي
يُعد هذا التصعيد حلقة جديدة في سلسلة النزاعات المكلفة بين "ميتا" والجهات التنظيمية الأوروبية. يوضح الجدول التالي أبرز الغرامات الأخيرة التي تكبدتها الشركة:

| تاريخ الغرامة | القيمة المادية | التهمة الموجهة للشركة |
| :--- | :--- | :--- |
| **العام الماضي (أبريل)** | 200 مليون يورو | انتهاك قواعد وقوانين التسويق الرقمي وبنود الخصوصية الأوروبية. |
| **نوفمبر 2024** | 798 مليون يورو | إساءة استخدام الهيمنة عبر ربط خدمة سوق "فيسبوك" بالشبكة الاجتماعية. |

### العواقب المحتملة والموقف الرسمي
تواجه شركة "ميتا" شبح عقوبات مالية قاسية في حال امتناعها عن تنفيذ أمر التدابير المؤقتة الصادر عن الاتحاد الأوروبي:

- **غرامات مضاعفة:** ينص القانون على إمكانية فرض غرامة تصل إلى 10% من الإيرادات السنوية العالمية للشركة، بالإضافة إلى غرامات تأخير تُحسب يومياً (رغم أن الغرامات الأوروبية نادراً ما تصل إلى هذا الحد الأقصى).
- **استمرار الإجراءات:** أشار المسؤولون في بروكسل إلى أن هذه التدابير المؤقتة ستظل سارية المفعول حتى انتهاء التحقيقات الجارية، والتي لا ترتبط بجدول زمني محدد أو موعد نهائي.

> **تصريح تيريزا ريبيرا (مفوضة المنافسة في الاتحاد الأوروبي):**
> "في الأسواق سريعة التطور، قد تُفقد المنافسة قبل وقت طويل من اتخاذ القرار النهائي. ولهذا السبب، ستبقى هذه الإجراءات المؤقتة سارية طوال فترة التحقيق، لمنع حدوث ضرر يكاد يكون من المستحيل إصلاحه."

### التداعيات السياسية والتجارية
لا ينفصل هذا النزاع التنظيمي عن المشهد السياسي العالمي الأوسع؛ حيث لطالما وجه الرئيس الأميركي دونالد ترمب انتقادات لاذعة للقوانين الأوروبية المتعلقة بالتكنولوجيا ومكافحة الاحتكار، معتبراً إياها استهدافاً مباشراً للشركات الأميركية.

وفي تصعيد سابق خلال شهر أغسطس الماضي، هدد ترمب باتخاذ إجراءات مضادة رداً على الضرائب الرقمية الأوروبية، شملت:
1. فرض تعريفات جمركية جديدة.
2. تطبيق قيود صارمة على تصدير التكنولوجيا المتقدمة وأشباه الموصلات.`,
    contentEn: `### Regulatory Escalation
The European Commission has issued an urgent binding directive forcing Meta Platforms to suspend policies that restrict competing artificial intelligence firms from using the WhatsApp Business application. The Commission gave the American tech giant five business days to restore free access to these entities, in a preemptive antitrust move designed to prevent irreparable harm to the competitive environment.

### The Conflict & Industry Stance
Friction escalated between both sides following a series of policy choices that reshaped digital business applications:

- **Etiology of Brussels' Intervention:** Meta altered its developer guidelines, effectively shutting out external AI service providers from scaling business services via the WhatsApp platform.
- **Meta's Response:** The conglomerate pledged to challenge the ruling. In an official briefing, Meta voiced deep discontent, stating that the interim European decree effectively forces them to license their paid, proprietary platform to massive entities like OpenAI free of charge.
- **Investigation Source:** The antitrust flame ignited in Rome, where the Italian competition regulator launched a probe before the European Commission in Brussels took control, expanding the scope to cover the entire European market.

### Meta's European Fine Chronicle
This regulatory enforcement is the latest chapter in Meta's costly confrontations with EU watchdogs:

| Date | Fine Amount | Violations & Charges |
| :--- | :--- | :--- |
| **April 2025** | €200 Million | Violations of EU digital marketing and customer privacy laws. |
| **November 2024** | €798 Million | Abuse of dominant position by binding Facebook Marketplace services to the primary social network. |

### Escalating Liabilities & The Official View
Meta faces severe daily penalty payments if it fails to fully satisfy the interim measures within the established deadline:

- **Compounding Sanctions:** Under the Digital Markets and Competition laws, Brussels can levy fines up to 10% of Meta’s consolidated global annual turnover, alongside daily non-compliance penalties.
- **Sovereign Enforcement:** Authorities clarified that these emergency measures will remain fully active until the extensive antitrust investigation reaches completion, which operates without an arbitrary deadline.

> **Teresa Ribera (EU Competition Commissioner):**
> "In hyper-accelerated markets, competition can be permanently extinguished long before a final decision is reached. Therefore, these interim measures are vital to preserve the digital landscape and shield regional innovation from irreversible damage."

### Geopolitical & Trade Friction
This regulatory clash is deeply intertwined with the broader global political climate. US President Donald Trump has frequently launched warnings about European technological regulations and antitrust initiatives, describing them as targeted attacks against prominent American corporations. 

During preceding escalations last August, Trump threatened countermeasures against European digital services taxes, noting options like:
- Imposing custom tariffs.
- Establishing strict bans on American high-tech exports and semiconductors.`,
    author: {
      nameAr: 'زياد بارود',
      nameEn: 'Ziad Baroud',
      titleAr: 'محلل تكنولوجيا وتشريعات الفضاء الرقمي',
      titleEn: 'Digital Jurisprudence Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600',
    date: '18 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 14750
  },
  {
    id: 'exc-hkn-syria-expansion-2026',
    category: 'exclusives',
    titleAr: 'رمال وطموحات بلا حدود: قصة تمدد "إتش كيه إن" (HKN) في الشمال السوري',
    titleEn: 'Sands & Boundless Ambitions: The Story of HKN Energy’s Expansion into Northern Syria',
    summaryAr: 'قصة شركة الطاقة الأميركية HKN في تشغيل وتطوير حقول النفط في شمال شرق سوريا بالتكامل مع عملياتها في كردستان العراق، متجاوزةً الحدود الطبيعية والجغرافية المعقدة.',
    summaryEn: 'Behind closed doors and across complex geopolitical maps, private US oil firm HKN Energy signs a landmark operator agreement in northeast Syria, linking its robust Kurdistan operations with regional expansion.',
    contentAr: `كانت شمس الظهيرة ترسل أشعتها القوية لتنعكس على الأنابيب الفولاذية الضخمة الممتدة عبر التضاريس الوعرة في إقليم كردستان العراق. هناك، حيث أسست شركة الطاقة الأميركية الخاصة "إتش كيه إن" (HKN) إرثاً من العمل الدؤوب والنجاح الملموس في استخراج الذهب الأسود. لكن في عالم الطاقة، نادراً ما تتوقف الطموحات عند حدود جغرافية معينة؛ فخلف الأفق الغربي المليء بالتعقيدات، كانت ترتسم فرصة جديدة تنتظر من يقتنصها.

### نظرة ما وراء الحدود
على الجانب الآخر من الحدود، في منطقة شمال شرق سوريا، كانت حقول النفط ترقد وسط مشهد جيوسياسي محفوف بالتحديات. كانت تلك المنطقة غنية بالموارد، لكنها تفتقر إلى الاستثمارات التقنية واللوجستية القادرة على إعادة إحيائها. بالنسبة للإدارة التنفيذية في شركة "إتش كيه إن"، لم تكن تلك الحقول مجرد أصول مهملة، بل كانت تمثل امتداداً استراتيجياً وتكاملاً جغرافياً طبيعياً لعملياتها المزدهرة في كردستان.

بدأت الأروقة المغلقة تشهد اجتماعات مكثفة. انكفأ المهندسون وخبراء اللوجستيات على الخرائط التي تُظهر مدى التقارب الجغرافي بين أصول الشركة الحالية في العراق والحقول المستهدفة في سوريا. كان السؤال المطروح: كيف يمكن استنساخ قصة النجاح من شرق الحدود إلى غربها؟

### اللحظة الحاسمة وإبرام العقد
بعد شهور من التخطيط والمفاوضات المعقدة التي تطلبت حنكة في التعامل مع التوازنات الإقليمية، جاءت اللحظة الحاسمة. أعلنت الشركة الأميركية أخيراً وضع اللمسات الأخيرة وتوقيع العقد النهائي لتشغيل وتطوير الحقول في شمال شرق سوريا.

لم يكن هذا الإعلان مجرد خبر اقتصادي عابر، بل كان بمثابة تغيير لقواعد اللعبة في المنطقة. وقف كبار مهندسي التشغيل في غرفة التحكم الرئيسية، يتأملون الشاشات الرقمية التي أصبحت الآن تدمج بيانات الإنتاج والخطط التشغيلية بين ضفتي الحدود.

أبرز أهداف هذا التوسع شملت:

- **التكامل اللوجستي:** الاستفادة من البنية التحتية القريبة وسلاسل التوريد القائمة بالفعل في كردستان لدعم العمليات السورية.
- **نقل الخبرات:** توجيه الفرق الفنية المتمرسة التي أثبتت كفاءتها في التضاريس العراقية للتعامل مع جيولوجيا الحقول السورية المشابهة.

### هدير المضخات وفصل جديد
لم يمر وقت طويل حتى بدأت قوافل المعدات الثقيلة في التحرك، وبدأ المهندسون والخبراء في رسم مسارات جديدة للعمل. عاد هدير محركات الحفر والمضخات ليعلو في سماء تلك المنطقة من شمال شرق سوريا، مبدداً سكون الانتظار ومعلماً عن بدء مرحلة دقيقة من العمليات المكثفة.

في النهاية، تحولت خطوة "إتش كيه إن" (HKN) الجريئة إلى قصة تروى في قطاع الطاقة حول كيفية تحويل التحديات الجيوسياسية إلى فرص للنمو التشغيلي. لقد أثبتت الشركة أن الرؤية الفنية المدعومة بالإرادة قادرة على تجاوز الحدود، لتربط حقول كردستان العراق بشمال شرق سوريا في شبكة واحدة تنبض بالطاقة المستخرجة من أعماق الأرض.`,
    contentEn: `### A Vision Beyond Frontiers
Under the blazing afternoon sun, massive steel pipelines glisten across the rugged topography of the Kurdistan Region of Iraq. There, private US energy operator HKN Energy has established a robust legacy of active oil exploration and field optimization. Yet in the global energy arena, strategic ambitions rarely halt at administrative divisions. Beyond the western horizon, where geopolitical variables are highly intricate, a new operational corridor was rapidly taking shape.

### Scanning the Syrian Landscape
Directly across the border in northeast Syria, prolific but underserved petroleum reserves lay dormant amid challenging political environments. Rich in natural geology but starved of complex modern technical investment and downstream logistical infrastructure, these fields represented a strategic opportunity. For HKN's executive leadership, the assets were not merely an overlooked project, but a natural geographic alignment and structural extension to their booming presence in neighboring Kurdistan.

Sealed boardrooms became hubs of deep assessment. Geologists and logistics directors gathered around remote mapping sheets, measuring the physical proximity of HKN’s Iraqi production cells to the target reservoirs in Syria. The operational query was simple: how could the corporation seamlessly replicate its Eastern success on the Western side of the border?

### The Pivotal Concession Signing
Following months of painstaking planning and high-latitude diplomatic negotiations requiring tactical balance of overlapping regional influences, the moment of execution finally arrived. HKN Energy finalized its master operator contract to rehabilitate, manage, and extract from the prime oilfields in northeastern Syria.

The market announcement sent structural shockwaves across regional trade registries. For the company's senior engineering staff inside the main control desk, digital monitors now synchronized live production feeds and technical metrics connecting fields on both sides of the border.

The primary vectors of this expansion included:
- **Logistical Interoperability:** Harnessing neighboring transport lines and pre-positioned supply routes in Iraqi Kurdistan to sustain the Syrian field operations.
- **Dynamic Skill Transfer:** Redeploying seasoned technical crews with battle-tested experience in Northern Iraq to handle matching geologic formations across the border.

### Reviving the Pumps: A New Energy Ledger
Soon after, convoys of heavy drilling rigs and technical units mobilized to the Syrian theater. The resonant drone of heavy rotary drills and artificial lifters returned to the desert sky, breaking a long silence and inaugurating an intense operational phase.

Ultimately, HKN’s bold operational expansion serves as a case study in how agile corporations convert geopolitically complex territory into viable production centers. By bridging their Iraqi assets to Syrian holdings, they have forged a single, interconnected energy network drawing wealth from the depths of the earth.`,
    author: {
      nameAr: 'ميساء يوسف',
      nameEn: 'Maysa Yousef',
      titleAr: 'مراسلة الشؤون النفطية والجيوسياسية للورّاق',
      titleEn: 'Petroleum & Geopolitics Correspondent, Al-Warraq'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    date: '18 يونيو 2026',
    readTimeAr: '5 دقائق',
    readTimeEn: '5 min read',
    views: 9840
  },
  {
    id: 'starlink-lebanon-sovereignty-exclusives',
    category: 'exclusives',
    titleAr: 'دمج الأقمار الصناعية لستارلينك ومخاطر السيادة على الاتصالات',
    titleEn: 'Starlink Satellite Integration & Sovereign Risks on Lebanese Communications',
    summaryAr: 'يفحص هذا التحليل للمخاطر دمج خدمات إنترنت الأقمار الصناعية من ستارلينك في مشهد الاتصالات اللبناني اعتباراً من يونيو 2026.',
    summaryEn: 'This comprehensive policy risk analysis examines the integration of Starlink satellite internet services within the Lebanese telecom network as of June 2026.',
    contentAr: `يفحص هذا التحليل للمخاطر دمج خدمات إنترنت الأقمار الصناعية من ستارلينك في مشهد الاتصالات اللبناني اعتباراً من يونيو 2026.

### 1. الملخص التنفيذي
في أعقاب قرار الحكومة اللبنانية في أوائل عام 2026 بتوسيع ترخيص ستارلينك، تم وضع الخدمة كأداة احتياطية استراتيجية للبنية التحتية الحيوية. ومع ذلك، فإن النشر السريع والتفويض الممنوح لوزارة الاتصالات قد تجاوزا الضمانات التنظيمية القياسية، مما أثار مخاوف كبيرة بشأن السيادة الرقمية، وخصوصية البيانات، والمساءلة المؤسسية.

### 2. تقييم المخاطر التنظيمية والقانونية
#### الوضع الحالي
- **الإطار القانوني:** العمل بموجب مرسوم حكومي يمنح وزارة الاتصالات (MoT) سلطة الترخيص المباشرة.
- **الأهلية:** تقتصر حالياً على المؤسسات الحكومية، والسفارات، والمنظمات غير الحكومية، وشركات تجارية مرخصة مختارة. وتبقى الاشتراكات السكنية والفردية محظورة تماماً.
- **الامتثال:** يجب استيراد جميع المعدات عبر الموزعين المعتمدين (مثل ألفا - Alfa) واجتياز موافقة الهيئة المنظمة للاتصالات (TRA). الاستيراد الخاص غير قانوني.

يخضع ترخيص ستارلينك في لبنان لسلسلة من قرارات ومراسيم مجلس الوزراء، أبرزها الترخيص الأولي الممنوح في سبتمبر 2025 والتوسعة في مارس 2026، والتي هدفت إلى تسريع الخدمة وسط "ظروف استثنائية".

#### 2.1. الأساس القانوني
لا تخضع الخدمة لتصريح تجاري قياسي في السوق المفتوحة بل لإطار ترخيص "انتقالي" و"طارئ".
- **سلطة الترخيص:** تم تفويض السلطة مباشرة إلى وزير الاتصالات، متجاوزة فعلياً الرقابة التقليدية للهيئة المنظمة للاتصالات (TRA) ومجلس شورى الدولة.
- **الكيان المشغل:** تم تأسيس شركة تابعة محلية باسم "ستارلينك-لبنان" لتكون حامل الترخيص الرسمي والمحور التشغيلي للامتثال.

#### 2.2. الأهلية والوصول (قاعدة "للأعمال فقط")
تقتصر الخدمة بصرامة على الاستخدام المؤسسي والتجاري. وتبقى الاشتراكات السكنية أو المنزلية الفردية غير قانونية.
- **الكيانات المصرح لها:**
  1. المؤسسات الحكومية والوكالات العامة.
  2. السفارات والبعثات الدبلوماسية.
  3. المنظمات غير الحكومية (NGOs) والمنظمات الإنسانية.
  4. الشركات التجارية المرخصة (مثل البنوك، والمؤسسات الصناعية، والتعليمية).
- **المحظورات:** يُحظر تماماً استخدام ستارلينك للأغراض السكنية الخاصة أو من قبل الموظفين الذين يعملون من المنزل باستخدام أجهزة توفرها الشركة. كما تُحظر خدمات التجوال العالمي للسياح أو الزوار.

#### 2.3. الشروط التشغيلية والفنية
- **التحكم في الأجهزة:** الاستيراد الخاص لأجهزة ستارلينك غير قانوني. يجب استيراد جميع المعدات حصرياً عبر "ستارلينك-لبنان" أو الموزعين المعتمدين من الحكومة (مثل ألفا) ويجب أن تجتاز إجراءات "اعتماد النوع" (Type Approval) الإلزامية من الهيئة المنظمة للاتصالات (TRA) وإجراءات التخليص الجمركي.
- **تقاسم الإيرادات:** تتضمن الاتفاقية ترتيباً لتقاسم الإيرادات بنسبة 25% مع الدولة اللبنانية، بالإضافة إلى الضرائب والرسوم التنظيمية القياسية.
- **التسعير:** حُددت الباقات التجارية الرسمية لتبدأ بحد أدنى 100 دولار/شهرياً، مع تكلفة أجهزة للمجموعات المؤسسية تتراوح من 350 إلى 580 دولاراً.
- **السياج الجغرافي والرقابة (Geofencing & Oversight):** تحتفظ الهيئة المنظمة للاتصالات (TRA) بسياج جغرافي صارم للمحطات النشطة لضمان استخدامها فقط في المواقع التجارية المسجلة.

#### 2.4. الخلافات الرئيسية والفجوات التنظيمية
خلقت طبيعة "المسار السريع" للنشر مخاوف تشريعية وأمنية كبيرة:
- **مركز الرقابة الأمنية:** في حين تطلبت الإصدارات السابقة من الترخيص إنشاء مركز رقابة أمنية محلي للمراقبة، تسمح التعديلات الأخيرة بمواصلة العمليات قبل إنشاء هذه البنية التحتية بالكامل، مما يثير مخاوف بشأن قدرة الحكومة على تنظيم أو تأمين حركة مرور البيانات.
- **سيادة البيانات:** يفتقر الإطار حالياً إلى متطلبات محددة لتوطين البيانات (تخزين البيانات على الأراضي اللبنانية)، مما يعني أن حركة المرور — حتى بالنسبة للبنية التحتية الحيوية — قد يتم توجيهها عبر محطات أرضية أجنبية.
- **غياب التوازن التنافسي:** تعرض القرار لانتقادات لكونه "شبكة موازية" تتجنب الإصلاحات الهيكلية اللازمة للبنية التحتية الوطنية للإنترنت، مع خلق طبقة متميزة من الاتصال في الوقت نفسه لأولئك الذين يستطيعون تحمل تكاليف الاشتراكات التجارية المرتفعة.

### 3. خصوصية البيانات ومخاطر الأمن السيبراني
#### 3.1 المخاطر القانونية الرئيسية
- **التجاوز المؤسسي:** تجاوزت عملية الترخيص الحالية مجلس شورى الدولة والدور الرقابي التقليدي للهيئة المنظمة للاتصالات (TRA)، مما خلق سابقة قانونية خطيرة لصنع السياسات في حالات "الطوارئ".
- **السلطة المفوضة:** من خلال مركزة السلطة داخل وزارة الاتصالات (MoT)، ألغت الحكومة آلية "الضوابط والتوازنات" (check-and-balance) التي توفرها عادة الأجهزة الأمنية والجهات التنظيمية المستقلة.
- **فراغ الإنفاذ (Enforcement Lacuna):** بدون مركز رقابة أمنية نهائي وعامل، تفتقر الحكومة إلى البنية التحتية المادية لمراقبة أو تنظيم حركة المرور كما هو منصوص عليه في الاتفاقيات الأولية، مما قد يجعل العقود القانونية الحالية غير قابلة للتنفيذ.

#### 3.2 فراغ البيانات
يفتقر لبنان حالياً إلى قانون شامل وحديث لحماية البيانات الشخصية. التكامل مع مزود أجنبي مثل ستارلينك، الذي يشغل بنية شبكته العالمية الخاصة، يؤدي إلى تفاقم نقاط الضعف الحالية:
- **سيادة البيانات:** توجد مخاوف بشأن مكان توجيه وتخزين بيانات المستخدمين. إذا تم توجيه حركة المرور عبر محطات أرضية أجنبية، فقد تخضع للأنظمة القانونية الأجنبية (مثل قانون CLOUD الأميركي) بدلاً من القانون اللبناني.
- **الافتقار إلى معايير التشفير:** لا يوجد دليل على وجود معايير تشفير موحدة بتفويض حكومي للأنظمة المتكاملة مع ستارلينك في لبنان، مما يترك البيانات المؤسسية عرضة للاعتراض إذا لم يتم تأمينها بشكل مستقل.
- **التعرض لأطراف ثالثة:** يُظهر التاريخ الحديث نمطاً من افتقار المنصات الحكومية لسياسات الخصوصية أو البروتوكولات الأمنية القوية. إن دمج ستارلينك بدون بوابة وطنية آمنة وخاصة وخاضعة للمراجعة يهدد بتعريض البيانات الإنسانية والحكومية الحساسة لجهات فاعلة خبيثة متطورة.

#### 3.3 المقارنة المعيارية والتكامل الاستراتيجي
لتقييم نموذج الدمج في لبنان مقابل نظرائه الإقليميين، يجب تطبيق المعايير التالية:
- **كيان قانوني محلي:** وجود شركة تابعة محلية إلزامية كحامل للترخيص. (لبنان: كيان "ستارلينك-لبنان" موجود).
- **توطين البيانات:** تخزين محلي إلزامي للبيانات الحيوية. (لبنان: غائب؛ لا يوجد متطلب مفروض حالياً).
- **الرقابة الأمنية:** مركز وطني متكامل للمراقبة السيبرانية. (لبنان: مخطط له، ولكنه غير عامل حالياً).
- **الدور التنظيمي:** جهة تنظيمية مستقلة. (لبنان: يخضع لتقدير الوزارة).

#### 3.4. ملخص المخاطر المحددة
- **سياسية/جيوسياسية:** الاعتماد على نظام فضائي أجنبي يفرض تبعية لجهة فاعلة غير تابعة لدولة يمكنها إيقاف الخدمة أو تقييدها جغرافياً بسبب ضغوط جيوسياسية خارجية.
- **اقتصادية:** بينما تحسن ستارلينك من المرونة، فإن الافتقار إلى نقاط تبادل الإنترنت المحلية (IXPs) يعني أن حتى حركة مرور الأقمار الصناعية غالباً ما يتم توجيهها بشكل غير فعال، مما يفشل في معالجة الضعف الأساسي للبنية التحتية الرقمية الداخلية في لبنان.
- **أمنية:** يتيح الانتشار "الطارئ" ثغرات محتملة للمراقبة ويضعف قدرة الدولة على حماية الخصوصية الرقمية لمواطنيها، ولا سيما الفئات الضعيفة التي تخدمها المنظمات الإنسانية غير الحكومية.

**التوصية:** للتخفيف من هذه المخاطر، ينبغي على الحكومة اللبنانية إعطاء الأولوية للتفعيل الرسمي لمركز الأمن/الرقابة المستقل وصياغة قانون شامل لحماية البيانات ليحل محل الفراغ التشريعي الحالي. علاوة على ذلك، يظل تحويل حركة المرور نحو نقاط تبادل الإنترنت (IXPs) المحلية هو الحل الوحيد القابل للتطبيق على المدى الطويل لتحقيق سيادة رقمية حقيقية، بغض النظر عن تكنولوجيا الوصول (الأقمار الصناعية مقابل الألياف الضوئية).

### 4. السياق التنظيمي
يُصنف إدخال ستارلينك في لبنان من قبل الحكومة كإجراء مرونة طارئ وليس توسعاً تجارياً قياسياً.

#### 4.1 الإطار "الاستثنائي"
- **وصول مقيد:** تقتصر المشاركة على الهيئات الحكومية، والسفارات، والمنظمات غير الحكومية، وشركات تجارية مرخصة مختارة. الاستخدام الفردي/السكني يبقى محظوراً تماماً لمنع تجاوز إيرادات الاتصالات التي تسيطر عليها الدولة وللحفاظ على السيطرة التنظية.
- **سلطة الترخيص:** تخضع العملية لمراسيم وقرارات حكومية بدلاً من مناقصة عامة مفتوحة. وهذا يمنح وزارة الاتصالات (MoT) سلطة تقديرية واسعة في اختيار الكيانات المؤهلة، مما يتجاوز فعلياً الرقابة التي توفرها عادة الهيئة المنظمة للاتصالات (TRA) ومجلس الشورى.
- **التحكم في المعدات:** يجب استيراد جميع المحطات الطرفية عبر "ستارلينك-لبنان" أو الموزعين المعتمدين من الحكومة (مثل ألفا). الاستيراد الخاص غير قانوني، وأي محطة يجب أن تخضع لعملية "اعتماد النوع" (Type Approval) التي تشمل التخليص الأمني والجمركي الإلزامي.

#### 4.2. الفجوات التشريعية في خصوصية البيانات
الإطار القانوني في لبنان للحقوق الرقمية متخلف بشكل أساسي، مما يخلق نقاط ضعف كبيرة لمستخدمي الخدمات عالية التقنية مثل ستارلينك.
- **الفراغ التشريعي لعام 2018:** القانون رقم 81/2018 (المعاملات الإلكترونية والبيانات ذات الطابع الشخصي) هو النظام الأساسي الحاكم، ولكنه لا يزال غير مفعل إلى حد كبير بسبب غياب هيئة إشرافية مستقلة.
- **غياب الإنفاذ:** تعمل وزارة الاقتصاد والتجارة (MoET) كجهة تنظيمية بحكم الأمر الواقع، لكنها تفتقر إلى القدرة الفنية المتخصصة، والموظفين، وآليات المساءلة اللازمة لإنفاذ حماية البيانات.
- **عدم اليقين بشأن البيانات العابرة للحدود:** يفشل القانون رقم 81 في وضع معايير صارمة لنقل البيانات دولياً. ولأن بنية ستارلينك تعتمد على محطات أرضية عالمية، فقد تعبر بيانات المستخدمين الولايات القضائية (مثل الولايات المتحدة أو أوروبا)، مما قد يخضعها لقانون CLOUD الأميركي أو أنظمة قانونية أجنبية أخرى غالباً ما تتعارض مع وسائل الحماية المحدودة الممنوحة للمواطنين اللبنانيين.
- **غياب "الخصوصية حسب التصميم":** لا توجد تفويضات قانونية تلزم ستارلينك أو شركائها المحليين بتنفيذ "الخصوصية حسب التصميم" (Privacy by Design) أو معايير تشفير محددة. يترك هذا الخدمة — والبيانات الإنسانية/الحكومية الحساسة التي تنقلها — عرضة للاعتراض.

#### 4.3. مخاطر الأمن السيبراني والبنية التحتية
اعتماد لبنان على النطاق الترددي الدولي، حتى بالنسبة لحركة المرور المحلية، يخلق أوجه قصور نظامية لا تعالجها ستارلينك إلا جزئياً.
- **نقطة الضعف "الداخلية":** يؤكد تحليل الخبراء (على سبيل المثال، من SMEX ومراجعات البنية التحتية) أن الخطر الرئيسي في لبنان هو خطر داخلي. إن الافتقار إلى نقاط تبادل الإنترنت (IXPs) المحلية يعني أن البيانات، حتى عند إرسالها عبر ستارلينك، غالباً ما تشهد توجيهاً غير فعال.
- **المراقبة والرقابة:** غياب إطار مخصص لمسؤولية المنصة يعني أن الحجب والرقابة يظلان رهن تقدير وزارة الاتصالات (MoT) ومكتب مكافحة جرائم المعلوماتية في قوى الأمن الداخلي (ISF). غالباً ما يكون الأساس القانوني لذلك مذكرة داخلية بدلاً من تشريع واضح وشفاف، مما يسهل النشاط خارج نطاق القضاء.
- **نتائج التقييم الأمني للمؤسسات:** تضع التقييمات الحديثة على مستوى البلاد (مثل جمعية الإنترنت - Internet Society) نضج الأمن السيبراني في لبنان عند حوالي 30/100. إن دمج كوكبة أقمار صناعية عالية السرعة في بنية تحتية تتميز بكلمات مرور "مضمنة" (hardcoded)، ونقص التشفير في التطبيقات العامة، ونقاط ضعف في قواعد البيانات القديمة يوسع بشكل كبير مساحة الهجوم للجهات الفاعلة الحكومية وغير الحكومية.

#### 4.4. المقارنة المعيارية
- **الكيان المحلي:** المعيار الإقليمي يفرض شركة تابعة محلية للمساءلة. (لبنان: تم تأسيس "ستارلينك-لبنان").
- **توطين البيانات:** تخزين محلي إلزامي للبيانات الحيوية. (لبنان: غائب).
- **الرقابة المستقلة:** سلطات مستقلة لحماية البيانات/الأمن السيبراني. (لبنان: غائب، تسيطر عليه الوزارة).
- **التدقيقات الأمنية:** تدقيقات أمنية/معمارية دورية إلزامية. (لبنان: غير متسقة/غير محددة).

#### 4.5. التوصيات الاستراتيجية
لكي يكون الدمج آمناً، فإن التحولات التالية ضرورية:
1. **الرقابة المستقلة:** إنشاء هيئة مستقلة وفعالة لحماية البيانات (DPA) لنقل مسؤولية الإنفاذ بعيداً عن الوزارات السياسية.
2. **نقاط تبادل الإنترنت المحلية (IXPs):** إعطاء الأولوية لتطوير نقاط تبادل إنترنت محلية لضمان عدم عبور البيانات المحلية للمحطات الأرضية الأجنبية أو المسارات الخارجية دون داعٍ.
3. **بروتوكول أمني موحد:** تشريع معايير تشفير إلزامية وخاضعة لتدقيق الدولة لأي جهة تستخدم ستارلينك في العمليات الحكومية أو الإنسانية الرسمية.
4. **الإصلاح التشريعي:** تعديل القانون رقم 81/2018 لتعريف "الموافقة" بوضوح ووضع قيود محددة على سلطة الحكومة في اعتراض البيانات الموجهة عبر مزودي خدمات الأقمار الصناعية.`,
    contentEn: `### Executive Summary
Following the Lebanese government's early 2026 decision to expand Starlink’s license, the service was positioned as a strategic backup for critical infrastructure. However, the rapid deployment and authority granted to the Ministry of Telecommunications (MoT) bypassed standard regulatory safeguards, raising significant concerns regarding digital sovereignty, data privacy, and institutional accountability.

---

### II. Regulatory & Legal Risk Assessment
#### Current Status
- **Legal Framework:** Operational under a cabinet decree granting the MoT direct licensing authority.
- **Eligibility:** Currently restricted to government institutions, embassies, NGOs, and select licensed commercial entities. Residential and individual accounts remain strictly prohibited.
- **Compliance:** All equipment must be imported via authorized distributors (e.g., Alfa) and pass Type Approval by the Telecommunications Regulatory Authority (TRA). Private import is illegal.

Starlink licensing in Lebanon is subject to a series of cabinet resolutions, most notably the initial permit in September 2025 and the expansion in March 2026, aimed at accelerating service speed under "exceptional circumstances."

#### 1. Legal Basis
The service has not been granted a regular commercial license but operates under an "emergency and transitional" framework.
- **Licensing Authority:** Power is directly centralized under the Minister of Telecommunications, bypassing conventional regulatory oversight by the TRA and State Council.
- **Operator Entity:** A local subsidiary named "Starlink Lebanon" was established as the official licensee and operational node for compliance.

#### 2. Access and Eligibility ("Business Only" Rule)
Service is strictly limited to institutional and commercial use. Individual residential accounts remain illegal.
- **Authorized Entities:** Government agencies, public boards, diplomatic missions, human rights and relief NGOs, and licensed commercial firms (such as banks, educational institutions, and industrial firms).
- **Prohibitions:** Using Starlink for private home purposes or by remote employees from residential premises using corporate terminals is completely prohibited. Global roaming for tourists or visitors is also turned off.

#### 3. Technical and Operational Conditions
- **Terminal Control:** Private imports of Starlink terminal equipment are illegal. All active kits must be commercialized through Starlink Lebanon or authorized government channels (e.g., cell carrier Alfa). They must successfully pass TRA Type Approval and customs.
- **Revenue Sharing:** The arrangement includes a 25% revenue-share component paid to the Lebanese treasury alongside standard telecom taxes.
- **Tariffs:** Commercial tiers run upwards from $100/month, and client terminal kits cost $350-$580.
- **Geofencing & Oversight:** The TRA retains strict geofencing for active dish coordinates to guarantee usage only within registered business sites.

#### 4. Major Controversies and Regulatory Lacunas
The fast-tracked nature of the rollout has produced significant legislative gaps:
- **Security Control Center:** While earlier draft licenses required the construction of a domestic secure monitoring station, current revisions permit operations to continue ahead of completing this hub, raising security questions.
- **Data Sovereignty:** There are no domestic hosting or localized traffic routing requirements. Thus, sensitive state traffic could be routed via foreign ground stations.
- **Competitive Imbalance:** Critics charge that the network operates as a parallel digital ecosystem, bypassing structural reform of the domestic wireline network.

---

### III. Data Privacy & Cyber Vulnerabilities
#### 1. Core Legislative Vacuum
Lebanon currently lacks a modern, comprehensive data protection act. Integrating with Starlink, which operates its own global spacecraft routing, aggravates these holes:
- **Regulatory Transit:** Law 81/2018 (Electronic Transactions and Personal Data) is the primary statute, but remains unenforced due to the absence of a dedicated independent authority.
- **Cross-Border Transfers:** Sensitive user transactions are routed via foreign base terminals, subjecting them to international jurisdictions (like the US CLOUD Act) without national guards.
- **Encryption Deficit:** No government-audited local encryption templates exist for Lebanese Starlink nodes, rendering data channels vulnerable unless secured independently.

#### 2. Cybersecurity Maturity
Recent nationwide assessments score Lebanon’s cybersecurity maturity around 30/100. Introducing satellite arrays into a landscape plagued by hardcoded passwords and unpatched government servers widens the attack surface for advanced regional actors.

---

### IV. Strategic Recommendations
For a secure and sovereign integration, the following actions are crucial:
1. **Independent Regulatory Oversight:** Activating an independent Data Protection Authority (DPA).
2. **Local IXPs:** Routing domestic data through local Internet Exchange Points to prevent unnecessary foreign transits.
3. **Mandatory Encryption Protocols:** Auditing security architectures of state or humanitarian groups utilizing satellite access.
4. **Legislative Reform:** Updating Law 81/2018 to define clear boundaries on state interception of satellite traffic.`,
    author: {
      nameAr: 'شربل نحاس',
      nameEn: 'Charbel Nahas',
      titleAr: 'محلل السياسات العامة والاقتصاد التنظيمي للورّاق',
      titleEn: 'Regulatory Economics & Public Policy Analyst, Al-Warraq'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=600',
    date: '18 يونيو 2026',
    readTimeAr: '8 دقائق',
    readTimeEn: '8 min read',
    views: 18420
  },
  {
    id: 'starlink-lebanon-sovereignty-lebanon',
    category: 'lebanon',
    titleAr: 'دمج الأقمار الصناعية لستارلينك ومخاطر السيادة على الاتصالات',
    titleEn: 'Starlink Satellite Integration & Sovereign Risks on Lebanese Communications',
    summaryAr: 'يفحص هذا التحليل للمخاطر دمج خدمات إنترنت الأقمار الصناعية من ستارلينك في مشهد الاتصالات اللبناني اعتباراً من يونيو 2026.',
    summaryEn: 'This comprehensive policy risk analysis examines the integration of Starlink satellite internet services within the Lebanese telecom network as of June 2026.',
    contentAr: `يفحص هذا التحليل للمخاطر دمج خدمات إنترنت الأقمار الصناعية من ستارلينك في مشهد الاتصالات اللبناني اعتباراً من يونيو 2026.

### 1. الملخص التنفيذي
في أعقاب قرار الحكومة اللبنانية في أوائل عام 2026 بتوسيع ترخيص ستارلينك، تم وضع الخدمة كأداة احتياطية استراتيجية للبنية التحتية الحيوية. ومع ذلك، فإن النشر السريع والتفويض الممنوح لوزارة الاتصالات قد تجاوزا الضمانات التنظيمية القياسية، مما أثار مخاوف كبيرة بشأن السيادة الرقمية، وخصوصية البيانات، والمساءلة المؤسسية.

### 2. تقييم المخاطر التنظيمية والقانونية
#### الوضع الحالي
- **الإطار القانوني:** العمل بموجب مرسوم حكومي يمنح وزارة الاتصالات (MoT) سلطة الترخيص المباشرة.
- **الأهلية:** تقتصر حالياً على المؤسسات الحكومية، والسفارات، والمنظمات غير الحكومية، وشركات تجارية مرخصة مختارة. وتبقى الاشتراكات السكنية والفردية محظورة تماماً.
- **الامتثال:** يجب استيراد جميع المعدات عبر الموزعين المعتمدين (مثل ألفا - Alfa) واجتياز موافقة الهيئة المنظمة للاتصالات (TRA). الاستيراد الخاص غير قانوني.

يخضع ترخيص ستارلينك في لبنان لسلسلة من قرارات ومراسيم مجلس الوزراء، أبرزها الترخيص الأولي الممنوح في سبتمبر 2025 والتوسعة في مارس 2026، والتي هدفت إلى تسريع الخدمة وسط "ظروف استثنائية".

#### 2.1. الأساس القانوني
لا تخضع الخدمة لتصريح تجاري قياسي في السوق المفتوحة بل لإطار ترخيص "انتقالي" و"طارئ".
- **سلطة الترخيص:** تم تفويض السلطة مباشرة إلى وزير الاتصالات، متجاوزة فعلياً الرقابة التقليدية للهيئة المنظمة للاتصالات (TRA) ومجلس شورى الدولة.
- **الكيان المشغل:** تم تأسيس شركة تابعة محلية باسم "ستارلينك-لبنان" لتكون حامل الترخيص الرسمي والمحور التشغيلي للامتثال.

#### 2.2. الأهلية والوصول (قاعدة "للأعمال فقط")
تقتصر الخدمة بصرامة على الاستخدام المؤسسي والتجاري. وتبقى الاشتراكات السكنية أو المنزلية الفردية غير قانونية.
- **الكيانات المصرح لها:**
  1. المؤسسات الحكومية والوكالات العامة.
  2. السفارات والبعثات الدبلوماسية.
  3. المنظمات غير الحكومية (NGOs) والمنظمات الإنسانية.
  4. الشركات التجارية المرخصة (مثل البنوك، والمؤسسات الصناعية، والتعليمية).
- **المحظورات:** يُحظر تماماً استخدام ستارلينك للأغراض السكنية الخاصة أو من قبل الموظفين الذين يعملون من المنزل باستخدام أجهزة توفرها الشركة. كما تُحظر خدمات التجوال العالمي للسياح أو الزوار.

#### 2.3. الشروط التشغيلية والفنية
- **التحكم في الأجهزة:** الاستيراد الخاص لأجهزة ستارلينك غير قانوني. يجب استيراد جميع المعدات حصرياً عبر "ستارلينك-لبنان" أو الموزعين المعتمدين من الحكومة (مثل ألفا) ويجب أن تجتاز إجراءات "اعتماد النوع" (Type Approval) الإلزامية من الهيئة المنظمة للاتصالات (TRA) وإجراءات التخليص الجمركي.
- **تقاسم الإيرادات:** تتضمن الاتفاقية ترتيباً لتقاسم الإيرادات بنسبة 25% مع الدولة اللبنانية، بالإضافة إلى الضرائب والرسوم التنظيمية القياسية.
- **التسعير:** حُددت الباقات التجارية الرسمية لتبدأ بحد أدنى 100 دولار/شهرياً، مع تكلفة أجهزة للمجموعات المؤسسية تتراوح من 350 إلى 580 دولاراً.
- **السياج الجغرافي والرقابة (Geofencing & Oversight):** تحتفظ الهيئة المنظمة للاتصالات (TRA) بسياج جغرافي صارم للمحطات النشطة لضمان استخدامها فقط في المواقع التجارية المسجلة.

#### 2.4. الخلافات الرئيسية والفجوات التنظيمية
خلقت طبيعة "المسار السريع" للنشر مخاوف تشريعية وأمنية كبيرة:
- **مركز الرقابة الأمنية:** في حين تطلبت الإصدارات السابقة من الترخيص إنشاء مركز رقابة أمنية محلي للمراقبة، تسمح التعديلات الأخيرة بمواصلة العمليات قبل إنشاء هذه البنية التحتية بالكامل، مما يثير مخاوف بشأن قدرة الحكومة على تنظيم أو تأمين حركة مرور البيانات.
- **سيادة البيانات:** يفتقر الإطار حالياً إلى متطبيات محددة لتوطين البيانات (تخزين البيانات على الأراضي اللبنانية)، مما يعني أن حركة المرور — حتى بالنسبة للبنية التحتية الحيوية — قد يتم توجيهها عبر محطات أرضية أجنبية.
- **غياب التوازن التنافسي:** تعرض القرار لانتقادات لكونه "شبكة موازية" تتجنب الإصلاحات الهيكلية اللازمة للبنية التحتية الوطنية للإنترنت، مع خلق طبقة متميزة من الاتصال في الوقت نفسه لأولئك الذين يستطيعون تحمل تكاليف الاشتراكات التجارية المرتفعة.

### 3. خصوصية البيانات ومخاطر الأمن السيبراني
#### 3.1 المخاطر القانونية الرئيسية
- **التجاوز المؤسسي:** تجاوزت عملية الترخيص الحالية مجلس شورى الدولة والدور الرقابي التقليدي للهيئة المنظمة للاتصالات (TRA)، مما خلق سابقة قانونية خطيرة لصنع السياسات في حالات "الطوارئ".
- **السلطة المفوضة:** من خلال مركزة السلطة داخل وزارة الاتصالات (MoT)، ألغت الحكومة آلية "الضوابط والتوازنات" (check-and-balance) التي توفرها عادة الأجهزة الأمنية والجهات التنظيمية المستقلة.
- **فراغ الإنفاذ (Enforcement Lacuna):** بدون مركز رقابة أمنية نهائي وعامل، تفتقر الحكومة إلى البنية التحتية المادية لمراقبة أو تنظيم حركة المرور كما هو منصوص عليه في الاتفاقيات الأولية، مما قد يجعل العقود القانونية الحالية غير قابلة للتنفيذ.

#### 3.2 فراغ البيانات
يفتقر لبنان حالياً إلى قانون شامل وحديث لحماية البيانات الشخصية. التكامل مع مزود أجنبي مثل ستارلينك، الذي يشغل بنية شبكته العالمية الخاصة، يؤدي إلى تفاقم نقاط الضعف الحالية:
- **سيادة البيانات:** توجد مخاوف بشأن مكان توجيه وتخزين بيانات المستخدمين. إذا تم توجيه حركة المرور عبر محطات أرضية أجنبية، فقد تخضع للأنظمة القانونية الأجنبية (مثل قانون CLOUD الأميركي) بدلاً من القانون اللبناني.
- **الافتقار إلى معايير التشفير:** لا يوجد دليل على وجود معايير تشفير موحدة بتفويض حكومي للأنظمة المتكاملة مع ستارلينك في لبنان، مما يترك البيانات المؤسسية عرضة للاعتراض إذا لم يتم تأمينها بشكل مستقل.
- **التعرض لأطراف ثالثة:** يُظهر التاريخ الحديث نمطاً من افتقار المنصات الحكومية لسياسات الخصوصية أو البروتوكولات الأمنية القوية. إن دمج ستارلينك بدون بوابة وطنية آمنة وخاضعة للمراجعة يهدد بتعريض البيانات الإنسانية والحكومية الحساسة لجهات فاعلة خبيثة متطورة.

#### 3.3 المقارنة المعيارية والتكامل الاستراتيجي
لتقييم نموذج الدمج في لبنان مقابل نظرائه الإقليميين، يجب تطبيق المعايير التالية:
- **كيان قانوني محلي:** وجود شركة تابعة محلية إلزامية كحامل للترخيص. (لبنان: كيان "ستارلينك-لبنان" موجود).
- **توطين البيانات:** تخزين محلي إلزامي للبيانات الحيوية. (لبنان: غائب؛ لا يوجد متطلب مفروض حالياً).
- **الرقابة الأمنية:** مركز وطني متكامل للمراقبة السيبرانية. (لبنان: مخطط له، ولكنه غير عامل حالياً).
- **الدور التنظيمي:** جهة تنظيمية مستقلة. (لبنان: يخضع لتقدير الوزارة).

#### 3.4. ملخص المخاطر المحددة
- **سياسية/جيوسياسية:** الاعتماد على نظام فضائي أجنبي يفرض تبعية لجهة فاعلة غير تابعة لدولة يمكنها إيقاف الخدمة أو تقييدها جغرافياً بسبب ضغوط جيوسياسية خارجية.
- **اقتصادية:** بينما تحسن ستارلينك من المرونة، فإن الافتقار إلى نقاط تبادل الإنترنت المحلية (IXPs) يعني أن حتى حركة مرور الأقمار الصناعية غالباً ما يتم توجيهها بشكل غير فعال، مما يفشل في معالجة الضعف الأساسي للبنية التحتية الرقمية الداخلية في لبنان.
- **أمنية:** يتيح الانتشار "الطارئ" ثغرات محتملة للمراقبة ويضعف قدرة الدولة على حماية الخصوصية الرقمية لمواطنيها، ولا سيما الفئات الضعيفة التي تخدمها المنظمات الإنسانية غير الحكومية.

**التوصية:** للتخفيف من هذه المخاطر، ينبغي على الحكومة اللبنانية إعطاء الأولوية للتفعيل الرسمي لمركز الأمن/الرقابة المستقل وصياغة قانون شامل لحماية البيانات ليحل محل الفراغ التشريعي الحالي. علاوة على ذلك، يظل تحويل حركة المرور نحو نقاط تبادل الإنترنت (IXPs) المحلية هو الحل الوحيد القابل للتطبيق على المدى الطويل لتحقيق سيادة رقمية حقيقية، بغض النظر عن تكنولوجيا الوصول (الأقمار الصناعية مقابل الألياف الضوئية).

### 4. السياق التنظيمي
يُصنف إدخال ستارلينك في لبنان من قبل الحكومة كإجراء مرونة طارئ وليس توسعاً تجارياً قياسياً.

#### 4.1 الإطار "الاستثنائي"
- **وصول مقيد:** تقتصر المشاركة على الهيئات الحكومية، والسفارات، والمنظمات غير الحكومية، وشركات تجارية مرخصة مختارة. الاستخدام الفردي/السكني يبقى محظوراً تماماً لمنع تجاوز إيرادات الاتصالات التي تسيطر عليها الدولة وللحفاظ على السيطرة التنظيمية.
- **سلطة الترخيص:** تخضع العملية لمراسيم وقرارات حكومية بدلاً من مناقصة عامة مفتوحة. وهذا يمنح وزارة الاتصالات (MoT) سلطة تقديرية واسعة في اختيار الكيانات المؤهلة، مما يتجاوز فعلياً الرقابة التي توفرها عادة الهيئة المنظمة للاتصالات (TRA) ومجلس الشورى.
- **التحكم في المعدات:** يجب استيراد جميع المحطات الطرفية عبر "ستارلينك-لبنان" أو الموزعين المعتمدين من الحكومة (مثل ألفا). الاستيراد الخاص غير قانوني، وأي محطة يجب أن تخضع لعملية "اعتماد النوع" (Type Approval) التي تشمل التخليص الأمني والجمركي الإلزامي.

#### 4.2. الفجوات التشريعية في خصوصية البيانات
الإطار القانوني في لبنان للحقوق الرقمية متخلف بشكل أساسي، مما يخلق نقاط ضعف كبيرة لمستخدمي الخدمات عالية التقنية مثل ستارلينك.
- **الفراغ التشريعي لعام 2018:** القانون رقم 81/2018 (المعاملات الإلكترونية والبيانات ذات الطابع الشخصي) هو النظام الأساسي الحاكم، ولكنه لا يزال غير مفعل إلى حد كبير بسبب غياب هيئة إشرافية مستقلة.
- **غياب الإنفاذ:** تعمل وزارة الاقتصاد والتجارة (MoET) كجهة تنظيمية بحكم الأمر الواقع، لكنها تفتقر إلى القدرة الفنية المتخصصة، والموظفين، وآليات المساءلة اللازمة لإنفاذ حماية البيانات.
- **عدم اليقين بشأن البيانات العابرة للحدود:** يفشل القانون رقم 81 في وضع معايير صارمة لنقل البيانات دولياً. ولأن بنية ستارلينك تعتمد على محطات أرضية عالمية، فقد تعبر بيانات المستخدمين الولايات القضائية (مثل الولايات المتحدة أو أوروبا)، مما قد يخضعها لقانون CLOUD الأميركي أو أنظمة قانونية أجنبية أخرى غالباً ما تتعارض مع وسائل الحماية المحدودة الممنوحة للمواطنين اللبنانيين.
- **غياب "الخصوصية حسب التصميم":** لا توجد تفويضات قانونية تلزم ستارلينك أو شركائها المحليين بتنفيذ "الخصوصية حسب التصميم" (Privacy by Design) أو معايير تشفير محددة. يترك هذا الخدمة — والبيانات الإنسانية/الحكومية الحساسة التي تنقلها — عرضة للاعتراض.

#### 4.3. مخاطر الأمن السيبراني والبنية التحتية
اعتماد لبنان على النطاق الترددي الدولي، حتى بالنسبة لحركة المرور المحلية، يخلق أوجه قصور نظامية لا تعالجها ستارلينك إلا جزئياً.
- **نقطة الضعف "الداخلية":** يؤكد تحليل الخبراء (على سبيل المثال، من SMEX ومراجعات البنية التحتية) أن الخطر الرئيسي في لبنان هو خطر داخلي. إن الافتقار إلى نقاط تبادل الإنترنت (IXPs) المحلية يعني أن البيانات، حتى عند إرسالها عبر ستارلينك، غالباً ما تشهد توجيهاً غير فعال.
- **المراقبة والرقابة:** غياب إطار مخصص لمسؤولية المنصة يعني أن الحجب والرقابة يظلان رهن تقدير وزارة الاتصالات (MoT) ومكتب مكافحة جرائم المعلوماتية في قوى الأمن الداخلي (ISF). غالباً ما يكون الأساس القانوني لذلك مذكرة داخلية بدلاً من تشريع واضح وشفاف، مما يسهل النشاط خارج نطاق القضاء.
- **نتائج التقييم الأمني للمؤسسات:** تضع التقييمات الحديثة على مستوى البلاد (مثل جمعية الإنترنت - Internet Society) نضج الأمن السيبراني في لبنان عند حوالي 30/100. إن دمج كوكبة أقمار صناعية عالية السرعة في بنية تحتية تتميز بكلمات مرور "مضمنة" (hardcoded)، ونقص التشفير في التطبيقات العامة، ونقاط ضعف في قواعد البيانات القديمة يوسع بشكل كبير مساحة الهجوم للجهات الفاعلة الحكومية وغير الحكومية.

#### 4.4. المقارنة المعيارية
- **الكيان المحلي:** المعيار الإقليمي يفرض شركة تابعة محلية للمساءلة. (لبنان: تم تأسيس "ستارلينك-لبنان").
- **توطين البيانات:** تخزين محلي إلزامي للبيانات الحيوية. (لبنان: غائب).
- **الرقابة المستقلة:** سلطات مستقلة لحماية البيانات/الأمن السيبراني. (لبنان: غائب، تسيطر عليه الوزارة).
- **التدقيقات الأمنية:** تدقيقات أمنية/معمارية دورية إلزامية. (لبنان: غير متسقة/غير محددة).

#### 4.5. التوصيات الاستراتيجية
لكي يكون الدمج آمناً، فإن التحولات التالية ضرورية:
1. **الرقابة المستقلة:** إنشاء هيئة مستقلة وفعالة لحماية البيانات (DPA) لنقل مسؤولية الإنفاذ بعيداً عن الوزارات السياسية.
2. **نقاط تبادل الإنترنت المحلية (IXPs):** إعطاء الأولوية لتطوير نقاط تبادل إنترنت محلية لضمان عدم عبور البيانات المحلية للمحطات الأرضية الأجنبية أو المسارات الخارجية دون داعٍ.
3. **بروتوكول أمني موحد:** تشريع معايير تشفير إلزامية وخاضعة لتدقيق الدولة لأي جهة تستخدم ستارلينك في العمليات الحكومية أو الإنسانية الرسمية.
4. **الإصلاح التشريعي:** تعديل القانون رقم 81/2018 لتعريف "الموافقة" بوضوح ووضع قيود محددة على سلطة الحكومة في اعتراض البيانات الموجهة عبر مزودي خدمات الأقمار الصناعية.`,
    contentEn: `### Executive Summary
Following the Lebanese government's early 2026 decision to expand Starlink’s license, the service was positioned as a strategic backup for critical infrastructure. However, the rapid deployment and authority granted to the Ministry of Telecommunications (MoT) bypassed standard regulatory safeguards, raising significant concerns regarding digital sovereignty, data privacy, and institutional accountability.

---

### II. Regulatory & Legal Risk Assessment
#### Current Status
- **Legal Framework:** Operational under a cabinet decree granting the MoT direct licensing authority.
- **Eligibility:** Currently restricted to government institutions, embassies, NGOs, and select licensed commercial entities. Residential and individual accounts remain strictly prohibited.
- **Compliance:** All equipment must be imported via authorized distributors (e.g., Alfa) and pass Type Approval by the Telecommunications Regulatory Authority (TRA). Private import is illegal.

Starlink licensing in Lebanon is subject to a series of cabinet resolutions, most notably the initial permit in September 2025 and the expansion in March 2026, aimed at accelerating service speed under "exceptional circumstances."

#### 1. Legal Basis
The service has not been granted a regular commercial license but operates under an "emergency and transitional" framework.
- **Licensing Authority:** Power is directly centralized under the Minister of Telecommunications, bypassing conventional regulatory oversight by the TRA and State Council.
- **Operator Entity:** A local subsidiary named "Starlink Lebanon" was established as the official licensee and operational node for compliance.

#### 2. Access and Eligibility ("Business Only" Rule)
Service is strictly limited to institutional and commercial use. Individual residential accounts remain illegal.
- **Authorized Entities:** Government agencies, public boards, diplomatic missions, human rights and relief NGOs, and licensed commercial firms (such as banks, educational institutions, and industrial firms).
- **Prohibitions:** Using Starlink for private home purposes or by remote employees from residential premises using corporate terminals is completely prohibited. Global roaming for tourists or visitors is also turned off.

#### 3. Technical and Operational Conditions
- **Terminal Control:** Private imports of Starlink terminal equipment are illegal. All active kits must be commercialized through Starlink Lebanon or authorized government channels (e.g., cell carrier Alfa). They must successfully pass TRA Type Approval and customs.
- **Revenue Sharing:** The arrangement includes a 25% revenue-share component paid to the Lebanese treasury alongside standard telecom taxes.
- **Tariffs:** Commercial tiers run upwards from $100/month, and client terminal kits cost $350-$580.
- **Geofencing & Oversight:** The TRA retains strict geofencing for active dish coordinates to guarantee usage only within registered business sites.

#### 4. Major Controversies and Regulatory Lacunas
The fast-tracked nature of the rollout has produced significant legislative gaps:
- **Security Control Center:** While earlier draft licenses required the construction of a domestic secure monitoring station, current revisions permit operations to continue ahead of completing this hub, raising security questions.
- **Data Sovereignty:** There are no domestic hosting or localized traffic routing requirements. Thus, sensitive state traffic could be routed via foreign ground stations.
- **Competitive Imbalance:** Critics charge that the network operates as a parallel digital ecosystem, bypassing structural reform of the domestic wireline network.

---

### III. Data Privacy & Cyber Vulnerabilities
#### 1. Core Legislative Vacuum
Lebanon currently lacks a modern, comprehensive data protection act. Integrating with Starlink, which operates its own global spacecraft routing, aggravates these holes:
- **Regulatory Transit:** Law 81/2018 (Electronic Transactions and Personal Data) is the primary statute, but remains unenforced due to the absence of a dedicated independent authority.
- **Cross-Border Transfers:** Sensitive user transactions are routed via foreign base terminals, subjecting them to international jurisdictions (like the US CLOUD Act) without national guards.
- **Encryption Deficit:** No government-audited local encryption templates exist for Lebanese Starlink nodes, rendering data channels vulnerable unless secured independently.

#### 2. Cybersecurity Maturity
Recent nationwide assessments score Lebanon’s cybersecurity maturity around 30/100. Introducing satellite arrays into a landscape plagued by hardcoded passwords and unpatched government servers widens the attack surface for advanced regional actors.

---

### IV. Strategic Recommendations
For a secure and sovereign integration, the following actions are crucial:
1. **Independent Regulatory Oversight:** Activating an independent Data Protection Authority (DPA).
2. **Local IXPs:** Routing domestic data through local Internet Exchange Points to prevent unnecessary foreign transits.
3. **Mandatory Encryption Protocols:** Auditing security architectures of state or humanitarian groups utilizing satellite access.
4. **Legislative Reform:** Updating Law 81/2018 to define clear boundaries on state interception of satellite traffic.`,
    author: {
      nameAr: 'شربل نحاس',
      nameEn: 'Charbel Nahas',
      titleAr: 'محلل السياسات العامة والاقتصاد التنظيمي للورّاق',
      titleEn: 'Regulatory Economics & Public Policy Analyst, Al-Warraq'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=600',
    date: '18 يونيو 2026',
    readTimeAr: '8 دقائق',
    readTimeEn: '8 min read',
    views: 18420
  },
  {
    id: 'starlink-lebanon-sovereignty-telecom',
    category: 'telecom-internet',
    titleAr: 'دمج الأقمار الصناعية لستارلينك ومخاطر السيادة على الاتصالات',
    titleEn: 'Starlink Satellite Integration & Sovereign Risks on Lebanese Communications',
    summaryAr: 'يفحص هذا التحليل للمخاطر دمج خدمات إنترنت الأقمار الصناعية من ستارلينك في مشهد الاتصالات اللبناني اعتباراً من يونيو 2026.',
    summaryEn: 'This comprehensive policy risk analysis examines the integration of Starlink satellite internet services within the Lebanese telecom network as of June 2026.',
    contentAr: `يفحص هذا التحليل للمخاطر دمج خدمات إنترنت الأقمار الصناعية من ستارلينك في مشهد الاتصالات اللبناني اعتباراً من يونيو 2026.

### 1. الملخص التنفيذي
في أعقاب قرار الحكومة اللبنانية في أوائل عام 2026 بتوسيع ترخيص ستارلينك، تم وضع الخدمة كأداة احتياطية استراتيجية للبنية التحتية الحيوية. ومع ذلك، فإن النشر السريع والتفويض الممنوح لوزارة الاتصالات قد تجاوزا الضمانات التنظيمية القياسية، مما أثار مخاوف كبيرة بشأن السيادة الرقمية، وخصوصية البيانات، والمساءلة المؤسسية.

### 2. تقييم المخاطر التنظيمية والقانونية
#### الوضع الحالي
- **الإطار القانوني:** العمل بموجب مرسوم حكومي يمنح وزارة الاتصالات (MoT) سلطة الترخيص المباشرة.
- **الأهلية:** تقتصر حالياً على المؤسسات الحكومية، والسفارات، والمنظمات غير الحكومية، وشركات تجارية مرخصة مختارة. وتبقى الاشتراكات السكنية والفردية محظورة تماماً.
- **الامتثال:** يجب استيراد جميع المعدات عبر الموزعين المعتمدين (مثل ألفا - Alfa) واجتياز موافقة الهيئة المنظمة للاتصالات (TRA). الاستيراد الخاص غير قانوني.

يخضع ترخيص ستارلينك في لبنان لسلسلة من قرارات ومراسيم مجلس الوزراء، أبرزها الترخيص الأولي الممنوح في سبتمبر 2025 والتوسعة في مارس 2026، والتي هدفت إلى تسريع الخدمة وسط "ظروف استثنائية".

#### 2.1. الأساس القانوني
لا تخضع الخدمة لتصريح تجاري قياسي في السوق المفتوحة بل لإطار ترخيص "انتقالي" و"طارئ".
- **سلطة الترخيص:** تم تفويض السلطة مباشرة إلى وزير الاتصالات، متجاوزة فعلياً الرقابة التقليدية للهيئة المنظمة للاتصالات (TRA) ومجلس شورى الدولة.
- **الكيان المشغل:** تم تأسيس شركة تابعة محلية باسم "ستارلينك-لبنان" لتكون حامل الترخيص الرسمي والمحور التشغيلي للامتثال.

#### 2.2. الأهلية والوصول (قاعدة "للأعمال فقط")
تقتصر الخدمة بصرامة على الاستخدام المؤسسي والتجاري. وتبقى الاشتراكات السكنية أو المنزلية الفردية غير قانونية.
- **الكيانات المصرح لها:**
  1. المؤسسات الحكومية والوكالات العامة.
  2. السفارات والبعثات الدبلوماسية.
  3. المنظمات غير الحكومية (NGOs) والمنظمات الإنسانية.
  4. الشركات التجارية المرخصة (مثل البنوك، والمؤسسات الصناعية، والتعليمية).
- **المحظورات:** يُحظر تماماً استخدام ستارلينك للأغراض السكنية الخاصة أو من قبل الموظفين الذين يعملون من المنزل باستخدام أجهزة توفرها الشركة. كما تُحظر خدمات التجوال العالمي للسياح أو الزوار.

#### 2.3. الشروط التشغيلية والفنية
- **التحكم في الأجهزة:** الاستيراد الخاص لأجهزة ستارلينك غير قانوني. يجب استيراد جميع المعدات حصرياً عبر "ستارلينك-لبنان" أو الموزعين المعتمدين من الحكومة (مثل ألفا) ويجب أن تجتاز إجراءات "اعتماد النوع" (Type Approval) الإلزامية من الهيئة المنظمة للاتصالات (TRA) وإجراءات التخليص الجمركي.
- **تقاسم الإيرادات:** تتضمن الاتفاقية ترتيباً لتقاسم الإيرادات بنسبة 25% مع الدولة اللبنانية، بالإضافة إلى الضرائب والرسوم التنظيمية القياسية.
- **التسعير:** حُددت الباقات التجارية الرسمية لتبدأ بحد أدنى 100 دولار/شهرياً، مع تكلفة أجهزة للمجموعات المؤسسية تتراوح من 350 إلى 580 دولاراً.
- **السياج الجغرافي والرقابة (Geofencing & Oversight):** تحتفظ الهيئة المنظمة للاتصالات (TRA) بسياج جغرافي صارم للمحطات النشطة لضمان استخدامها فقط في المواقع التجارية المسجلة.

#### 2.4. الخلافات الرئيسية والفجوات التنظيمية
خلقت طبيعة "المسار السريع" للنشر مخاوف تشريعية وأمنية كبيرة:
- **مركز الرقابة الأمنية:** في حين تطلبت الإصدارات السابقة من الترخيص إنشاء مركز رقابة أمنية محلي للمراقبة، تسمح التعديلات الأخيرة بمواصلة العمليات قبل إنشاء هذه البنية التحتية بالكامل، مما يثير مخاوف بشأن قدرة الحكومة على تنظيم أو تأمين حركة مرور البيانات.
- **سيادة البيانات:** يفتقر الإطار حالياً إلى متطلبات محددة لتوطين البيانات (تخزين البيانات على الأراضي اللبنانية)، مما يعني أن حركة المرور — حتى بالنسبة للبنية التحتية الحيوية — قد يتم توجيهها عبر محطات أرضية أجنبية.
- **غياب التوازن التنافسي:** تعرض القرار لانتقادات لكونه "شبكة موازية" تتجنب الإصلاحات الهيكلية اللازمة للبنية التحتية الوطنية للإنترنت، مع خلق طبقة متميزة من الاتصال في الوقت نفسه لأولئك الذين يستطيعون تحمل تكاليف الاشتراكات التجارية المرتفعة.

### 3. خصوصية البيانات ومخاطر الأمن السيبراني
#### 3.1 المخاطر القانونية الرئيسية
- **التجاوز المؤسسي:** تجاوزت عملية الترخيص الحالية مجلس شورى الدولة والدور الرقابي التقليدي للهيئة المنظمة للاتصالات (TRA)، مما خلق سابقة قانونية خطيرة لصنع السياسات في حالات "الطوارئ".
- **السلطة المفوضة:** من خلال مركزة السلطة داخل وزارة الاتصالات (MoT)، ألغت الحكومة آلية "الضوابط والتوازنات" (check-and-balance) التي توفرها عادة الأجهزة الأمنية والجهات التنظيمية المستقلة.
- **فراغ الإنفاذ (Enforcement Lacuna):** بدون مركز رقابة أمنية نهائي وعامل، تفتقر الحكومة إلى البنية التحتية المادية لمراقبة أو تنظيم حركة المرور كما هو منصوص عليه في الاتفاقيات الأولية، مما قد يجعل العقود القانونية الحالية غير قابلة للتنفيذ.

#### 3.2 فراغ البيانات
يفتقر لبنان حالياً إلى قانون شامل وحديث لحماية البيانات الشخصية. التكامل مع مزود أجنبي مثل ستارلينك، الذي يشغل بنية شبكته العالمية الخاصة، يؤدي إلى تفاقم نقاط الضعف الحالية:
- **سيادة البيانات:** توجد مخاوف بشأن مكان توجيه وتخزين بيانات المستخدمين. إذا تم توجيه حركة المرور عبر محطات أرضية أجنبية، فقد تخضع للأنظمة القانونية الأجنبية (مثل قانون CLOUD الأميركي) بدلاً من القانون اللبناني.
- **الافتقار إلى معايير التشفير:** لا يوجد دليل على وجود معايير تشفير موحدة بتفويض حكومي للأنظمة المتكاملة مع ستارلينك في لبنان، مما يترك البيانات المؤسسية عرضة للاعتراض إذا لم يتم تأمينها بشكل مستقل.
- **التعرض لأطراف ثالثة:** يُظهر التاريخ الحديث نمطاً من افتقار المنصات الحكومية لسياسات الخصوصية أو البروتوكولات الأمنية القوية. إن دمج ستارلينك بدون بوابة وطنية آمنة وخاضعة للمراجعة يهدد بتعريض البيانات الإنسانية والحكومية الحساسة لجهات فاعلة خبيثة متطورة.

#### 3.3 المقارنة المعيارية والتكامل الاستراتيجي
لتقييم نموذج الدمج في لبنان مقابل نظرائه الإقليميين، يجب تطبيق المعايير التالية:
- **كيان قانوني محلي:** وجود شركة تابعة محلية إلزامية كحامل للترخيص. (لبنان: كيان "ستارلينك-لبنان" موجود).
- **توطين البيانات:** تخزين محلي إلزامي للبيانات الحيوية. (لبنان: غائب؛ لا يوجد متطلب مفروض حالياً).
- **الرقابة الأمنية:** مركز وطني متكامل للمراقبة السيبرانية. (لبنان: مخطط له، ولكنه غير عامل حالياً).
- **الدور التنظيمي:** جهة تنظيمية مستقلة. (لبنان: يخضع لتقدير الوزارة).

#### 3.4. ملخص المخاطر المحددة
- **سياسية/جيوسياسية:** الاعتماد على نظام فضائي أجنبي يفرض تبعية لجهة فاعلة غير تابعة لدولة يمكنها إيقاف الخدمة أو تقييدها جغرافياً بسبب ضغوط جيوسياسية خارجية.
- **اقتصادية:** بينما تحسن ستارلينك من المرونة، فإن الافتقار إلى نقاط تبادل الإنترنت المحلية (IXPs) يعني أن حتى حركة مرور الأقمار الصناعية غالباً ما يتم توجيهها بشكل غير فعال، مما يفشل في معالجة الضعف الأساسي للبنية التحتية الرقمية الداخلية في لبنان.
- **أمنية:** يتيح الانتشار "الطارئ" ثغرات محتملة للمراقبة ويضعف قدرة الدولة على حماية الخصوصية الرقمية لمواطنيها، ولا سيما الفئات الضعيفة التي تخدمها المنظمات الإنسانية غير الحكومية.

**التوصية:** للتخفيف من هذه المخاطر، ينبغي على الحكومة اللبنانية إعطاء الأولوية للتفعيل الرسمي لمركز الأمن/الرقابة المستقل وصياغة قانون شامل لحماية البيانات ليحل محل الفراغ التشريعي الحالي. علاوة على ذلك، يظل تحويل حركة المرور نحو نقاط تبادل الإنترنت (IXPs) المحلية هو الحل الوحيد القابل للتطبيق على المدى الطويل لتحقيق سيادة رقمية حقيقية، بغض النظر عن تكنولوجيا الوصول (الأقمار الصناعية مقابل الألياف الضوئية).

### 4. السياق التنظيمي
يُصنف إدخال ستارلينك في لبنان من قبل الحكومة كإجراء مرونة طارئ وليس توسعاً تجارياً قياسياً.

#### 4.1 الإطار "الاستثنائي"
- **وصول مقيد:** تقتصر المشاركة على الهيئات الحكومية، والسفارات، والمنظمات غير الحكومية، وشركات تجارية مرخصة مختارة. الاستخدام الفردي/السكني يبقى محظوراً تماماً لمنع تجاوز إيرادات الاتصالات التي تسيطر عليها الدولة وللحفاظ على السيطرة التنظيمية.
- **سلطة الترخيص:** تخضع العملية لمراسيم وقرارات حكومية بدلاً من مناقصة عامة مفتوحة. وهذا يمنح وزارة الاتصالات (MoT) سلطة تقديرية واسعة في اختيار الكيانات المؤهلة، مما يتجاوز فعلياً الرقابة التي توفرها عادة الهيئة المنظمة للاتصالات (TRA) ومجلس الشورى.
- **التحكم في المعدات:** يجب استيراد جميع المحطات الطرفية عبر "ستارلينك-لبنان" أو الموزعين المعتمدين من الحكومة (مثل ألفا). الاستيراد الخاص غير قانوني، وأي محطة يجب أن تخضع لعملية "اعتماد النوع" (Type Approval) التي تشمل التخليص الأمني والجمركي الإلزامي.

#### 4.2. الفجوات التشريعية في خصوصية البيانات
الإطار القانوني في لبنان للحقوق الرقمية متخلف بشكل أساسي، مما يخلق نقاط ضعف كبيرة لمستخدمي الخدمات عالية التقنية مثل ستارلينك.
- **الفراغ التشريعي لعام 2018:** القانون رقم 81/2018 (المعاملات الإلكترونية والبيانات ذات الطابع الشخصي) هو النظام الأساسي الحاكم، ولكنه لا يزال غير مفعل إلى حد كبير بسبب غياب هيئة إشرافية مستقلة.
- **غياب الإنفاذ:** تعمل وزارة الاقتصاد والتجارة (MoET) كجهة تنظيمية بحكم الأمر الواقع، لكنها تفتقر إلى القدرة الفنية المتخصصة، والموظفين، وآليات المساءلة اللازمة لإنفاذ حماية البيانات.
- **عدم اليقين بشأن البيانات العابرة للحدود:** يفشل القانون رقم 81 في وضع معايير صارمة لنقل البيانات دولياً. ولأن بنية ستارلينك تعتمد على محطات أرضية عالمية، فقد تعبر بيانات المستخدمين الولايات القضائية (مثل الولايات المتحدة أو أوروبا)، مما قد يخضعها لقانون CLOUD الأميركي أو أنظمة قانونية أجنبية أخرى غالباً ما تتعارض مع وسائل الحماية المحدودة الممنوحة للمواطنين اللبنانيين.
- **غياب "الخصوصية حسب التصميم":** لا توجد تفويضات قانونية تلزم ستارلينك أو شركائها المحليين بتنفيذ "الخصوصية حسب التصميم" (Privacy by Design) أو معايير تشفير محددة. يترك هذا الخدمة — والبيانات الإنسانية/الحكومية الحساسة التي تنقلها — عرضة للاعتراض.

#### 4.3. مخاطر الأمن السيبراني والبنية التحتية
اعتماد لبنان على النطاق الترددي الدولي، حتى بالنسبة لحركة المرور المحلية، يخلق أوجه قصور نظامية لا تعالجها ستارلينك إلا جزئياً.
- **نقطة الضعف "الداخلية":** يؤكد تحليل الخبراء (على سبيل المثال، من SMEX ومراجعات البنية التحتية) أن الخطر الرئيسي في لبنان هو خطر داخلي. إن الافتقار إلى نقاط تبادل الإنترنت (IXPs) المحلية يعني أن البيانات، حتى عند إرسالها عبر ستارلينك، غالباً ما تشهد توجيهاً غير فعال.
- **المراقبة والرقابة:** غياب إطار مخصص لمسؤولية المنصة يعني أن الحجب والرقابة يظلان رهن تقدير وزارة الاتصالات (MoT) ومكتب مكافحة جرائم المعلوماتية في قوى الأمن الداخلي (ISF). غالباً ما يكون الأساس القانوني لذلك مذكرة داخلية بدلاً من تشريع واضح وشفاف، مما يسهل النشاط خارج نطاق القضاء.
- **نتائج التقييم الأمني للمؤسسات:** تضع التقييمات الحديثة على مستوى البلاد (مثل جمعية الإنترنت - Internet Society) نضج الأمن السيبراني في لبنان عند حوالي 30/100. إن دمج كوكبة أقمار صناعية عالية السرعة في بنية تحتية تتميز بكلمات مرور "مضمنة" (hardcoded)، ونقص التشفير في التطبيقات العامة، ونقاط ضعف في قواعد البيانات القديمة يوسع بشكل كبير مساحة الهجوم للجهات الفاعلة الحكومية وغير الحكومية.

#### 4.4. المقارنة المعيارية
- **الكيان المحلي:** المعيار الإقليمي يفرض شركة تابعة محلية للمساءلة. (لبنان: تم تأسيس "ستارلينك-لبنان").
- **توطين البيانات:** تخزين محلي إلزامي للبيانات الحيوية. (لبنان: غائب).
- **الرقابة المستقلة:** سلطات مستقلة لحماية البيانات/الأمن السيبراني. (لبنان: غائب، تسيطر عليه الوزارة).
- **التدقيقات الأمنية:** تدقيقات أمنية/معمارية دورية إلزامية. (لبنان: غير متسقة/غير محددة).

#### 4.5. التوصيات الاستراتيجية
لكي يكون الدمج آمناً، فإن التحولات التالية ضرورية:
1. **الرقابة المستقلة:** إنشاء هيئة مستقلة وفعالة لحماية البيانات (DPA) لنقل مسؤولية الإنفاذ بعيداً عن الوزارات السياسية.
2. **نقاط تبادل الإنترنت المحلية (IXPs):** إعطاء الأولوية لتطوير نقاط تبادل إنترنت محلية لضمان عدم عبور البيانات المحلية للمحطات الأرضية الأجنبية أو المسارات الخارجية دون داعٍ.
3. **بروتوكول أمني موحد:** تشريع معايير تشفير إلزامية وخاضعة لتدقيق الدولة لأي جهة تستخدم ستارلينك في العمليات الحكومية أو الإنسانية الرسمية.
4. **الإصلاح التشريعي:** تعديل القانون رقم 81/2018 لتعريف "الموافقة" بوضوح ووضع قيود محددة على سلطة الحكومة في اعتراض البيانات الموجهة عبر مزودي خدمات الأقمار الصناعية.`,
    contentEn: `### Executive Summary
Following the Lebanese government's early 2026 decision to expand Starlink’s license, the service was positioned as a strategic backup for critical infrastructure. However, the rapid deployment and authority granted to the Ministry of Telecommunications (MoT) bypassed standard regulatory safeguards, raising significant concerns regarding digital sovereignty, data privacy, and institutional accountability.

---

### II. Regulatory & Legal Risk Assessment
#### Current Status
- **Legal Framework:** Operational under a cabinet decree granting the MoT direct licensing authority.
- **Eligibility:** Currently restricted to government institutions, embassies, NGOs, and select licensed commercial entities. Residential and individual accounts remain strictly prohibited.
- **Compliance:** All equipment must be imported via authorized distributors (e.g., Alfa) and pass Type Approval by the Telecommunications Regulatory Authority (TRA). Private import is illegal.

Starlink licensing in Lebanon is subject to a series of cabinet resolutions, most notably the initial permit in September 2025 and the expansion in March 2026, aimed at accelerating service speed under "exceptional circumstances."

#### 1. Legal Basis
The service has not been granted a regular commercial license but operates under an "emergency and transitional" framework.
- **Licensing Authority:** Power is directly centralized under the Minister of Telecommunications, bypassing conventional regulatory oversight by the TRA and State Council.
- **Operator Entity:** A local subsidiary named "Starlink Lebanon" was established as the official licensee and operational node for compliance.

#### 2. Access and Eligibility ("Business Only" Rule)
Service is strictly limited to institutional and commercial use. Individual residential accounts remain illegal.
- **Authorized Entities:** Government agencies, public boards, diplomatic missions, human rights and relief NGOs, and licensed commercial firms (such as banks, educational institutions, and industrial firms).
- **Prohibitions:** Using Starlink for private home purposes or by remote employees from residential premises using corporate terminals is completely prohibited. Global roaming for tourists or visitors is also turned off.

#### 3. Technical and Operational Conditions
- **Terminal Control:** Private imports of Starlink terminal equipment are illegal. All active kits must be commercialized through Starlink Lebanon or authorized government channels (e.g., cell carrier Alfa). They must successfully pass TRA Type Approval and customs.
- **Revenue Sharing:** The arrangement includes a 25% revenue-share component paid to the Lebanese treasury alongside standard telecom taxes.
- **Tariffs:** Commercial tiers run upwards from $100/month, and client terminal kits cost $350-$580.
- **Geofencing & Oversight:** The TRA retains strict geofencing for active dish coordinates to guarantee usage only within registered business sites.

#### 4. Major Controversies and Regulatory Lacunas
The fast-tracked nature of the rollout has produced significant legislative gaps:
- **Security Control Center:** While earlier draft licenses required the construction of a domestic secure monitoring station, current revisions permit operations to continue ahead of completing this hub, raising security questions.
- **Data Sovereignty:** There are no domestic hosting or localized traffic routing requirements. Thus, sensitive state traffic could be routed via foreign ground stations.
- **Competitive Imbalance:** Critics charge that the network operates as a parallel digital ecosystem, bypassing structural reform of the domestic wireline network.

---

### III. Data Privacy & Cyber Vulnerabilities
#### 1. Core Legislative Vacuum
Lebanon currently lacks a modern, comprehensive data protection act. Integrating with Starlink, which operates its own global spacecraft routing, aggravates these holes:
- **Regulatory Transit:** Law 81/2018 (Electronic Transactions and Personal Data) is the primary statute, but remains unenforced due to the absence of a dedicated independent authority.
- **Cross-Border Transfers:** Sensitive user transactions are routed via foreign base terminals, subjecting them to international jurisdictions (like the US CLOUD Act) without national guards.
- **Encryption Deficit:** No government-audited local encryption templates exist for Lebanese Starlink nodes, rendering data channels vulnerable unless secured independently.

#### 2. Cybersecurity Maturity
Recent nationwide assessments score Lebanon’s cybersecurity maturity around 30/100. Introducing satellite arrays into a landscape plagued by hardcoded passwords and unpatched government servers widens the attack surface for advanced regional actors.

---

### IV. Strategic Recommendations
For a secure and sovereign integration, the following actions are crucial:
1. **Independent Regulatory Oversight:** Activating an independent Data Protection Authority (DPA).
2. **Local IXPs:** Routing domestic data through local Internet Exchange Points to prevent unnecessary foreign transits.
3. **Mandatory Encryption Protocols:** Auditing security architectures of state or humanitarian groups utilizing satellite access.
4. **Legislative Reform:** Updating Law 81/2018 to define clear boundaries on state interception of satellite traffic.`,
    author: {
      nameAr: 'شربل نحاس',
      nameEn: 'Charbel Nahas',
      titleAr: 'محلل السياسات العامة والاقتصاد التنظيمي للورّاق',
      titleEn: 'Regulatory Economics & Public Policy Analyst, Al-Warraq'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=600',
    date: '18 يونيو 2026',
    readTimeAr: '8 دقائق',
    readTimeEn: '8 min read',
    views: 18420
  },
  {
    id: 'trans-fp-iran-peace-2026',
    category: 'translations',
    titleAr: 'إيران ربحت الحرب لكنها قد تخسر السلام',
    titleEn: 'Iran Won the War, but It Could Lose the Peace',
    summaryAr: 'ملاحظة: تم نشر هذا المقال في مجلة فورين بوليسي (Foreign Policy). تدرس المقالة خيار إيران الصعب بشأن مضيق هرمز: فإما أن تستخدمه كأداة لكسب المال أو كضمان أمني، وتداعيات فرض رسوم أو قيود على حركة الملاحة عقب انتهاء فترة الـ 60 يوماً من مذكرة التفاهم مع واشنطن.',
    summaryEn: 'Note: This article was originally published in Foreign Policy. This analysis explores Iran\'s sharp choice regarding the Strait of Hormuz: to utilize it as a source of revenue, or as a sovereign security guarantee.',
    contentAr: `ملاحظة: تم نشر هذا المقال في مجلة فورين بوليسي (Foreign Policy).

إيران ربحت الحرب لكنها قد تخسر السلام
طهران مستعدة للمبالغة في استغلال موقفها
بقلم: نيت سوانسون
18 يونيو 2026

نيت سوانسون هو زميل أول مقيم ومدير مشروع استراتيجية إيران في المجلس الأطلسي. عمل مديراً لملف إيران في مجلس الأمن القومي من عام 2022 إلى 2025. وفي ربيع وصيف عام 2025، عمل في فريق التفاوض مع إيران التابع لإدارة ترامب.

عندما شنت الولايات المتحدة وإسرائيل حربهما على إيران في أواخر فبراير، كان النظام في طهران في موقف ضعف غير مسبوق. فقد واجه أزمات اقتصادية وبيئية وجودية، وتراجعاً في القدرات الدفاعية، واضطرابات داخلية وتدقيقاً خارجياً في أعقاب حملة قمع وحشية ضد الاحتجاجات في يناير أسفرت عن مقتل الآلاف من شعبه. ولكن بعد 40 يوماً من الحرب وشهرين من وقف إطلاق النار الهش، خرجت الجمهورية الإسلامية سليمة، وأكثر جرأة، ومسلحة بردع جديد يبدو أقوى من كل الأسلحة التي دمرها خصومها بالضربات الجوية: سيطرتها على مضيق هرمز. وفي أواخر أبريل، أقر وزير الخارجية الأمريكي ماركو روبيو بأن المضيق أصبح "السلاح النووي الاقتصادي" لإيران. يدرك العالم الآن أنه إذا تعرضت إيران للهجوم، فإنها ستغلق المضيق، مما سيؤدي إلى تعطيل أسواق الطاقة في جميع أنواعه العالم.

باختصار، خسر الرئيس الأمريكي دونالد ترامب الحرب والمفاوضات لإنهائها. ولكن إذا بالغت طهران في استغلال موقفها، فقد تخسر السلام الذي سيعقب ذلك. تؤجل مذكرة التفاهم التي وقعتها إيران والولايات المتحدة حل معظم القضايا الصعبة (بما في ذلك القيود المفروضة على برنامج إيران النووي) إلى فترة تفاوض مدتها 60 يوماً. لكن الوضع في مضيق هرمز سيكون من الصعب التعامل معه ببراعة أكثر مما يدركه الكثيرون. ستنص مذكرة التفاهم على المرور الآمن للسفن التجارية مجاناً لمدة 60 يوماً بينما تسعى إيران، وربما الولايات المتحدة، إلى تحديد الإدارة الخاصة بالمضيق في فترة ما بعد الحرب. ولكن سواء تم التوصل إلى اتفاق نهائي أم لا، فقد أوضحت إيران أنها تعتزم فرض قيود ورسوم جديدة على السفن التجارية التي تعبر المضيق بعد انتهاء فترة التفاوض. وقال كبير المفاوضين الإيرانيين، رئيس البرلمان محمد باقر قاليباف، بصراحة إن "مضيق هرمز لن يعود أبداً إلى حالته السابقة" و"بطبيعة الحال، سوف نفرض رسوماً مقابل الخدمات التي نقدمها".

من المفهوم لماذا قد يغري مثل هذا الترتيب إيران. فقد عانت البلاد من أضرار اقتصادية هائلة خلال الحرب، وهي حريصة على تبديد أي أفكار باقية بأنها ضعيفة. لكن الضغط من أجل وضع راهن لا يفتح مضيق هرمز بالكامل أمام جميع حركة المرور البحرية دون رسوم أو ضرائب يهدد بتقويض الردع الإيراني المكتشف حديثاً ويجعل العودة إلى الصراع أكثر احتمالاً. قد يؤدي ذلك إلى قلب الشحن العالمي رأساً على عقب بشكل دائم، ومن خلال تسريع جهود العالم لإيجاد طرق بديلة، خفض التكاليف التي يواجهها خصوم إيران في شن حرب مستقبلية. وبالتالي قد يصبح مضيق هرمز مركزاً لعدم الاستقرار في فترة ما بعد الحرب. ومثلما بالغ ترامب في تقدير ميزته الاستراتيجية عندما شن الحرب، قد تكون طهران مستعدة لارتكاب نفس الخطأ الآن بعد انتهاء الحرب.

اتفاق أو لا اتفاق
تُقنن مذكرة التفاهم الأمريكية-الإيرانية المكونة من 14 نقطة وقف إطلاق النار الهش في إيران ولبنان، وتؤكد أن إيران لن تسعى لامتلاك أسلحة نووية، وتتعهد بأن الولايات المتحدة ستنهي فوراً حصارها البحري وتصدر إعفاءات من وزارة الخزانة، مما يسمح لإيران ببيع نفطها. كما تحدد معالم اتفاق نهائي افتراضي، بما في ذلك تخفيف كامل للعقوبات مقابل التخلص من اليورانيوم عالي التخصيب الإيراني وتفاهم غير محدد يتعلق بالتخصيب الإيراني في المستقبل.

ولكن على الرغم من أن الوثيقة تشير إلى استئناف الشحن من الخليج العربي إلى بحر عُمان، والتنازلات النووية من جانب إيران، وتخفيف العقوبات، إلا أنها تترك التفاصيل ليتم تحديدها لاحقاً. وتجعل العقبات الجوهرية من غير المرجح التوصل إلى اتفاق نهائي في غضون 60 يوماً، أو حتى في أي وقت. لم تُظهر واشنطن الصبر اللازم لإكمال اتفاق نووي معقد يتطلب تدابير جديدة للرصد والتحقق. وقد صُمم نظام العقوبات الأمريكي الحالي ضد إيران، الذي وُضع خلال ولاية ترامب الأولى، صراحةً لمنع العودة إلى اتفاق نووي من خلال استخدام تصنيفات عقوبات متداخلة تحت سلطات متعددة، مما يخلق تعقيدات قانونية وبيروقراطية متعمدة. وسوف يتطلب تفكيك ذلك إبداعاً كبيراً.

كما قد لا يرغب قادة إيران الجدد في أي شيء يتجاوز صفقة صغيرة مبنية على المعاملات مع الولايات المتحدة. فهم لا يثقون في التزام ترامب بصفقة كبيرة، نظراً لانسحابه عام 2018 من خطة العمل الشاملة المشتركة بعد ثلاث سنوات من إنشائها، وحقيقة أن الولايات المتحدة وإسرائيل قتلتا والد المرشد الأعلى مجتبى خامنئي ووالدته وزوجته وابنه. تميل شروط مذكرة التفاهم لصالح إيران، لكن الفجوة بين الشروط النهائية التي تقبلها طهران وواشنطن قد تكون كبيرة جداً لدرجة تجعل التوصل إلى اتفاق كامل أمراً مستحيلاً. وأخيراً، قد تستخدم إسرائيل نفوذها لعرقلة أو تقويض صفقة أوسع، خاصة إذا كانت الشروط غير مواتية لها كما تشير التقارير.

ولكن يلوح في الأفق وضع مضيق هرمز. إذا لم يتم ترسيخ التفاهم بشأن مضيق هرمز، فقد تُستأنف الحرب بسهولة. إن الفشل في إعادة هذا الممر المائي الدولي إلى وضعه السابق للحرب دون عوائق هو أمر غير مستدام.

اللعب بالنار
لن تتخلى إيران عن سيطرتها المكتشفة حديثاً على مضيق هرمز مقابل لا شيء. في شهر مايو، أنشأت إيران آلية جديدة، هي "هيئة مضيق الخليج الفارسي" (PGSA)، لإدارة مضيق هرمز. وكجزء من هذه العملية، أعلنت إيران من جانب واحد سيطرتها على منطقة بحرية موسعة بشكل كبير (تتعدى على المياه الإقليمية العُمانية والإماراتية)، وفرضت على السفن الحصول على إذن مسبق للتحرك عبر المضيق، وأشارت إلى أن السفن العسكرية غير الصديقة غير مرحب بعبورها. كما أعربت إيران باستمرار عن اهتمام قوي بتحقيق مكاسب مالية من المضيق.

لم يكن أي من هذه الشروط موجوداً قبل بدء الحرب. أعلن ترامب مراراً أنه لن يسمح لإيران بفرض رسوم على المضيق، لكن القادة الإيرانيين أبلغوا وسائل الإعلام والشركاء الأجانب أن البلاد تعتزم البدء في جمع الإيرادات من خلال الرسوم البيئية والخدمية بعد فترة التفاوض البالغة 60 يوماً والتي تلي مذكرة التفاهم. اقترحت إيران أن تتم الإدارة المشتركة لهيئة مضيق الخليج الفارسي مع عُمان، التي تطل أيضاً على المضيق. وقد عاقبت الولايات المتحدة مؤخراً هيئة (PGSA) لارتباطاتها بالحرس الثوري الإسلامي الإيراني (IRGC). ومع ذلك، عبر مذكرة التفاهم، قد تذعن واشنطن، على المدى الطويل، لإدارة الحرس الثوري الإيراني لمضيق هرمز بشكل أساسي.

إذا فرضت إيران رسوماً على مضيق هرمز، فلن تكون لذلك عواقب وخيمة على الشحن العالمي فحسب، بل سيرتد ذلك سلباً على طهران أيضاً. ستتردد الشركات الأمريكية والأوروبية والأجنبية الأخرى في الدفع أو حتى التنسيق مع كيان خاضع لعقوبات من واشنطن. وعلى نطاق أوسع، ترتبط هيئة (PGSA) بالحرس الثوري الإيراني، الخاضع بدوره لعقوبات من الاتحاد الأوروبي وأستراليا وكندا ودول كبرى أخرى. وحتى لو انضمت عُمان إلى الهيئة ووافقت الولايات المتحدة في النهاية على نظام الرسوم، فإن أحد أكثر نقاط الاختناق البحرية ازدحاماً في العالم قد يظل في الواقع متاحاً فقط لشبكة السفن غير المشروعة التابعة لإيران، والمعروفة باسم "أسطول الأشباح"، والسفن المحصنة ضد العقوبات الأمريكية والأوروبية. هذه نهاية غير مقبولة لدول الخليج وكذلك لأجزاء كبيرة من آسيا وأوروبا. وقد أخبرني دبلوماسي أوروبي مؤخراً أنه لن يتردد في إشراك الصين للضغط على إيران لمنع تنفيذ مثل هذه الآلية.

سوف تسرع هذه الديناميكية من جهود المنطقة لإيجاد مسارات بديلة لتجنب المضيق - وهو مسعى يستغرق وقتاً طويلاً ومكلفاً، ولكنه ضروري إذا لم يكن المضيق مفتوحاً بالكامل. ورغم أن الحرب أظهرت صعوبة إيجاد مسارات بديلة، فإن دول الخليج ستكون متحفزة لتطوير بنية تحتية جديدة للطاقة تتجاوز المضيق. وبالمثل، فإن معارضة إيران لعبور السفن العسكرية في المضيق لا يمكن الدفاع عنها أيضاً. وتمتلك كل من الولايات المتحدة وفرنسا قواعد بحرية رئيسية في الخليج العربي لا يمكن الوصول إليها إلا عبر المضيق وهي ضرورية للأمن الإقليمي.

خيار المضيق الحاد
تواجه إيران خياراً صارماً. فإما أن تستخدم مضيق هرمز كأداة لكسب المال أو كضمان أمني. لكنها ربما لا تستطيع فعل الأمرين معاً. تعتمد قيمة الردع للمضيق كلياً على مصداقية التهديد بإغلاقه. وفي اللحظة التي تحاول فيها إيران كسب المال من المرور أو إعاقة التدفق الحر للتجارة عبره بأي شكل آخر، فإنها تضعف أقوى حجة ضد الحرب: التكلفة المرتبطة بمهاجمة إيران. ومن خلال فرض الرسوم، ستوفر إيران مادة خطابية لجمهور كبير من الصقور المناهضين لإيران في الولايات المتحدة وإسرائيل والذين سيرحبون بالعودة إلى الصراع ويرون أن تحقيق إيران لمكاسب مالية وسيطرتها على المضيق يمثل نتيجة نهائية غير مقبولة.

مضيق هرمز ليس القضية الوحيدة التي ستشكل إيران في فترة ما بعد الحرب. فباعتبارها من الدول الموقعة على معاهدة الحد من الانتشار النووي، يجب على إيران الالتزام بتعهداتها والسماح للوكالة الدولية للطاقة الذرية بإعادة تأسيس وجودها لضمان أنها لا تسعى سراً لامتلاك سلاح نووي. ويجب عليها أن تبدأ في إعادة بناء علاقاتها مع جيرانها الذين استهدفتهم بشكل غير عادل في حرب لم يكونوا يريدونها. كما يجب على إيران معالجة المظالم السياسية والاقتصادية والاجتماعية لشعبها أو المخاطرة بالاضطرابات المنهجية التي ابتليت بها البلاد على مدى الثلاثين عاماً الماضية. إذا تعامل النظام في طهران مع تفوقه على الولايات المتحدة في المفاوضات كنقطة نهاية منتصرة، فإنه سيرتكب خطأً فادحاً - الحقيقة هي أن مذكرة التفاهم وحتى الاتفاق الأمريكي الإيراني الأوسع ليسا سوى خطواته الأولى على طريق مليء بالتحديات.

قبل ستة أشهر، كانت إسرائيل والولايات المتحدة في موقف يُحسدان عليه. وبغض النظر عن مدى ضعفها، لم تكن إيران لتستسلم أبداً تماماً لمطالب ترامب، بما في ذلك تفكيك برنامجها النووي بالكامل. لكن ربما كانت لتفكر في صفقة واسعة تتجنب الحرب وتوفر تخفيفاً تشتد الحاجة إليه للعقوبات مقابل تنازلات كبيرة بشأن برنامجها النووي وسلوكها الإقليمي. ولكن بدلاً من الاستفادة من الإنجازات العسكرية لحرب الـ 12 يوماً في يونيو 2025 لخلق مكاسب استراتيجية طويلة الأجل، صعدت الولايات المتحدة وإسرائيل بتهور - وانتهى بهما الأمر في موقف أسوأ. الآن، تقف إيران عند مفترق طرق مماثل؛ إنها تعتقد أنها انتصرت في الحرب الأخيرة ومن المرجح أن تنجذب للضغط واستغلال ميزتها. لكنها قد تتراجع بسهولة.

يريد معظم العالم إعادة فتح مضيق هرمز دون أي رسوم أو ضرائب. لكن حركة المرور البحرية غير المقيدة عبر المضيق تصب في مصلحة طهران أيضاً. تحتاج إيران إلى أخذ صفحة من التاريخ الأمريكي واتباع توجيهات الرئيس أبراهام لينكولن لجنرالاته بعد استسلام الكونفدرالية في أبوماتوكس: "دعهم ينهضون بسهولة". وبعبارة أخرى: قاوموا إغراء استخراج أقصى عقوبة. إذا أدت ثقة إيران المفرطة بنفسها إلى السعي لمعاقبة الولايات المتحدة في مضيق هرمز، فإنها لن تتمكن من إرساء الشروط المستدامة التي تحتاجها لزيادة فرصها في البقاء. إن القدرة على إغلاق المضيق هي أقوى ضمان أمني امتلكته الجمهورية الإسلامية على الإطلاق - وهو أكثر ديمومة ومصداقية وقابلية للاستخدام الفوري من الردع النووي. أذكى شيء يمكن لطهران القيام به الآن هو عدم استخدامه.`,
    contentEn: `*Note: This article was originally published in Foreign Policy magazine.*

**Iran Won the War, but It Could Lose the Peace**
*Tehran Is Ready to Overplay Its Hand*
**By Nate Swanson**
**June 18, 2026**

*Nate Swanson is a resident senior fellow and director of the Iran Strategy Project at the Atlantic Council. He served as Director for Iran on the National Security Council from 2022 to 2025. In the spring and summer of 2025, he worked on the Trump administration’s Iran negotiating team.*

When the United States and Israel launched their war against Iran in late February, the regime in Tehran was in an unprecedented position of weakness. It faced existential economic and environmental crises, diminished defense capabilities, domestic unrest, and intense external scrutiny following a brutal crackdown on protests in January that left thousands of its citizens dead. Yet, after 40 days of war and two months of a fragile ceasefire, the Islamic Republic has emerged intact, emboldened, and armed with a new deterrent that seems sturdier than all the weapons air strikes destroyed: its sovereign control over the Strait of Hormuz. In late April, U.S. Secretary of State Marco Rubio admitted that the strait has become Iran's "economic nuclear weapon." The world now understands that if Iran is attacked, it will close the strait, throwing global energy markets into absolute chaos.

In short, U.S. President Donald Trump lost the war and the negotiation to end it. But if Tehran overplays its hand, it could lose the subsequent peace. The Memorandum of Understanding (MOU) signed by Iran and the United States defers the resolution of most tough issues (including restrictions on Iran’s nuclear program) to a 60-day negotiation period. But the situation in the Strait of Hormuz will be far trickier to handle than many realize. The MOU will provide for safe passage of commercial vessels for 60 days while Iran and the United States attempt to define the post-war administration of the waterway. But whether a final agreement is reached or not, Iran has made it clear that it intends to impose new restrictions and fees on commercial ships crossing the strait once the negotiations expire. Iran’s chief negotiator and Parliament Speaker, Mohammad Bagher Ghalibaf, stated bluntly: "The Strait of Hormuz will never return to its previous status... We will naturally impose fees for the services we provide."

It is understandable why such an arrangement is tempting for Iran. The country suffered immense economic damage during the war and is eager to dispel any lingering notion that it is weak. But pressing for a post-war status quo that does not keep the Strait of Hormuz fully open to all maritime traffic free of fees or taxes risks undermining Tehran’s newfound deterrence and makes a return to conflict far more probable. It could permanently disrupt global shipping and, by accelerating international efforts to pave bypass corridors, actually lower the costs Iran's adversaries face in waging any future war. Thus, the Strait of Hormuz could become the epicenter of post-war instability. Just as Trump overestimated his strategic leverage when launching the war, Tehran seems poised to commit the same error now that it has ended.

**Deal or No Deal**
The 14-point US-Iran MOU codifies a fragile ceasefire in Iran and Lebanon, confirms that Iran will not seek nuclear weapons, and pledges that the United States will immediately end its maritime blockade and issue Treasury waivers to allow Iran to sell its oil. It also outlines the parameters of a hypothetical final deal, including full sanctions relief in exchange for disposing of Iran’s highly enriched uranium and an unspecified understanding regarding future Iranian enrichment.

But while the document refers to the resumption of shipping from the Persian Gulf to the Gulf of Oman, nuclear concessions by Iran, and sanctions relief, it leaves details to be ironed out. Substantive hurdles make a final agreement within 60 days highly unlikely. Washington has not shown the patience required to complete a complex nuclear deal demanding new monitoring and verification measures. The current U.S. sanctions regime, meticulously built during Trump’s first term, was intentionally designed to prevent a return to any nuclear deal by layering nested sanctions under multiple authorities, creating deliberate legal and bureaucratic obstacles. Dismantling this will require profound creativity.

Furthermore, Iran’s new leadership may not desire anything beyond a small, transactional arrangement with the United States. They deeply distrust Trump's commitment to a grand deal, given his 2018 withdrawal from the JCPOA only three years after its establishment, and the fact that the United States and Israel killed the Supreme Leader's father, mother, wife, and son. The terms of the MOU lean heavily in Iran’s favor, but the chasm between the final terms acceptable to both Tehran and Washington is likely too wide to bridge. Finally, Israel could use its influence to obstruct or sabotage any wider deal, especially if terms are as unfavorable to it as reported.

But it is the future of the Strait of Hormuz that looms largest. If the understanding regarding the strait is not consolidated, the war could easily resume. Failing to return this international waterway to its unimpeded pre-war status is fundamentally unsustainable.

**Playing with Fire**
Iran will not surrender its newfound control of the Strait of Hormuz for nothing. In May, Iran unilaterally created the "Persian Gulf Strait Authority" (PGSA) to manage Hormuz. As part of this, Iran expanded its maritime zone, encroaching on Omani and Emirati territorial waters, and demanded that vessels seek prior authorization before passing, while warning that unfriendly military ships are unwelcome. Iran has also consistently voiced clear intent to monetize transit through the strait.

None of these conditions existed before the war. Trump repeatedly declared he would never permit Iran to tax the strait, but Iranian officials have signaled that the nation plans to start collecting environmental and service fees after the 60-day negotiation window. Iran proposed a joint administration of the PGSA with Oman, which also overlooks the passage. While Washington recently sanctioned the PGSA for IRGC affiliations, it may ultimately be forced to acquiesce to basic IRGC management of the waterway in the long term.

If Iran levies fees, the backlash will not only harm global shipping but will boomerang back onto Tehran. U.S., European, and other foreign companies will hesitate to coordinate with or pay an entity sanctioned by Washington. The PGSA is heavily linked to the IRGC, which is designated by the EU, Australia, Canada, and other major nations. Even if Oman joins and the US accepts the fees, the bottleneck would effectively remain accessible only to Iran’s "ghost fleet" and ships immune to Western sanctions. This is an unacceptable scenario for Gulf states as well as large parts of Asia and Europe, potentially prompting EU diplomats to enlist China to pressure Iran.

Such dynamics will accelerate regional efforts to establish bypass routes—a costly and slow endeavor, but essential if the strait remains contested. The war's disruption has already motivated Gulf nations to construct new energy bypass paths. Similarly, Iran's opposition to military transits is untenable. The US and France operate major naval bases in the Persian Gulf that are only accessible through the strait and are vital for regional security.

**The Chokepoint Dilemma**
Iran faces a sharp choice: utilize the Strait of Hormuz as a cash cow, or as a sovereign security guarantee. It cannot easily do both. The deterrent capability of the strait relies entirely on the credibility of the threat to shut it down. The moment Iran seeks to charge fees or impede commercial trade, it weakens the ultimate argument against war: the overwhelming cost of launching one. By imposing fees, Iran hands ammunition to anti-Iran hawks in the US and Israel who would welcome a return to conflict.

Hormuz is not the only post-war challenge for Iran. As an NPT signatory, it must permit the IAEA to restore full verification access to prove it is not covertly pursuing nuclear weapons. It must repair relations with regional neighbors targeted during a conflict they did not desire. And it must address domestic socioeconomic grievances or risk systemic unrest. If the regime treats its bargaining advantage as a final, victorious destination, it makes a grave mistake—the MOU is merely the first step on a precarious path.

Six months ago, Israel and the US were in an enviable position. Iran, however weakened, would never have yielded entirely to Trump’s demands. But it might have accepted a broad compromise exchanging significant nuclear and regional concessions for crucial sanctions relief. But instead of leveraging the military gains of the 12-day war in June 2025 into a long-term strategic advantage, the US and Israel escalated recklessly—and ended up far worse off. Now, Iran stands at a similar crossroads; believing it won the war, it is tempted to press its leverage. But that advantage could slip away just as easily.

The world wants an unhindered, fee-free Strait of Hormuz. Free maritime flow serves Tehran's interests too. Iran should heed Abraham Lincoln’s post-civil war advice: "Let 'em up easy." Resist the temptation to extract maximum penalty. If Iran's hubris drives it to punish the US in the Strait of Hormuz, it will prevent the sustainable stability it needs to survive. The power to close the strait is the ultimate security guarantee—far more reliable and usable than a nuclear deterrent. The smartest thing Tehran can do now is not to use it.`,
    author: {
      nameAr: 'نيت سوانسون',
      nameEn: 'Nate Swanson',
      titleAr: 'زميل أول مقيم ومدير مشروع استراتيجية إيران في المجلس الأطلسي',
      titleEn: 'Senior Fellow, Atlantic Council & Former NSC Iran Director',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200',
    date: '18 يونيو 2026',
    readTimeAr: '11 دقيقة',
    readTimeEn: '11 min read',
    views: 24850,
    isFeatured: true
  },
  {
    id: 'trans-wsj-china-yuan-2026',
    category: 'translations',
    categories: ['translations'],
    titleAr: 'الصين تغري العالم باليوان — وتعرقل العقوبات الغربية',
    titleEn: 'China Woos the World with the Yuan—and Disrupts Western Sanctions',
    summaryAr: 'استخدمت إيران وروسيا العملة لتنفيذ مبيعات النفط وغيرها من المعاملات التجارية، للتهرب من القيود المفروضة على المعاملات بالدولار، مما يضعف قدرة واشنطن على مراقبة الأعمال التجارية العالمية.',
    summaryEn: 'Iran and Russia have used the currency for oil sales and other trade to evade dollar-based restrictions, weakening Washington\'s ability to police global business.',
    contentAr: `البنية التحتية المالية الصينية القائمة على اليوان تمكّن الدول من التهرب من العقوبات الأمريكية، مما يضعف قدرة واشنطن على مراقبة الأعمال التجارية العالمية.

دخل البيت الأبيض في محادثات مع إيران بشأن اتفاق نووي جديد، معتمداً على نقطة قوة تقليدية تتمثل في: الوعد بتخفيف العقوبات وإتاحة الوصول إلى نحو 100 مليار دولار من الأصول المجمدة.

إلا أن وسيلة الضغط هذه آخذة في التضاؤل؛ فقد تمكنت طهران من إضعاف تأثير حملة العقوبات الأمريكية في السنوات الأخيرة عبر الاستخدام الناجح للبنية التحتية المالية للصين — المبنية على عملة اليوان — والتي تعمل بعيداً عن متناول واشنطن.

تجلى هذا التحول بوضوح في أواخر أبريل عندما صعّدت الولايات المتحدة حملتها التي عُرفت باسم "الغضب الاقتصادي" ضد إيران، حيث فرضت عقوبات على مصفاة صينية كبرى قالت إنها اشترت نفطاً إيرانياً بمليارات الدولارات. من جهتها، ردت المصفاة، وهي شركة "هينغلي للبتروكيماويات" (Hengli Petrochemical)، بأن مورّدها قدم ضمانات بأن النفط ليس إيرانياً.

لكن الشركة وجهت أيضاً رسالة تحذير للولايات المتحدة، إذ أعلنت أن مشتريات النفط المستقبلية ستتم تسويتها باليوان بدلاً من الدولار الأمريكي (العملة الرئيسية في سوق الطاقة)، مما يجعل من الصعب على الأطراف الخارجية تتبع التدفقات المالية.

كان ذلك أحدث مؤشر على تطور جديد مقلق بالنسبة لواشنطن. فالمزيد من الأنشطة غير المشروعة الهادفة للتهرب من العقوبات حول العالم باتت تتم باليوان، في وقت تعكف فيه الصين على بناء نظام مالي بديل يهدف إلى إضعاف قدرة واشنطن على إملاء شروطها في الشؤون العالمية.

تاريخياً، منحت هيمنة الدولار الأمريكي — الذي يُستخدم حالياً في نحو 80% من تمويل التجارة الدولية — واشنطن ميزة كبرى في مراقبة الأعمال التجارية العالمية. إذ يجب تسوية معظم المعاملات الدولية المقومة بالدولار عبر بنوك أمريكية، مما يمنح واشنطن القدرة على مراقبتها، وقطع إمدادات الدولار عن المستخدمين إذا لزم الأمر، وهو ما يكفي لشل عملياتهم بالكامل.

ولكن عندما يستخدم خصوم الولايات المتحدة اليوان لإدارة أعمالهم، فإن هذه المعاملات لا تدخل ضمن النظام المصرفي الذي تقوده الولايات المتحدة، مما يجرد واشنطن من صلاحياتها.

وقد مهدت الولايات المتحدة الطريق أمام إيران لاستئناف مبيعاتها النفطية، بل وتلقي مدفوعاتها بالدولار، خلال فترة المفاوضات. ولكن حتى في ظل العقوبات الأمريكية الرامية إلى حظر هذه المبيعات، حصدت إيران إيرادات نفطية تصل إلى 43 مليار دولار في عام 2024، وذلك قبل احتساب الخصومات غير المحددة، وفقاً لإدارة معلومات الطاقة الأمريكية. وتختلف نسبة هذه الخصومات، لكنها بلغت في المتوسط نحو 13% في عام 2025 بحسب المشرعين الأمريكيين.

ووفقاً لوزارة الخزانة الأمريكية، تم دفع معظم قيمة تلك المبيعات باليوان.

وتستخدم طهران هذه الأموال لشراء قطع غيار السيارات الصينية والألواح الشمسية وغيرها من السلع والخدمات، بالإضافة إلى المواد ذات الاستخدام المزدوج — وهي مواد يُفترض أنها للاستخدام المدني ولكن يمكن استخدامها أيضاً في الأسلحة — وكل ذلك يتم خارج نطاق الولاية القضائية الأمريكية.

كما أُبلغت السفن التي تسعى للحصول على عبور آمن في مضيق هرمز أثناء النزاع بضرورة الدفع لطهران باليوان أو بالعملات المشفرة، والتي يصعب أيضاً على واشنطن السيطرة عليها. ويقول مسؤولو وزارة الخزانة إن الشركاء الإيرانيين والصينيين أنشأوا شبكات من الوسطاء السريين والشركات الوهمية في هونغ كونغ وأماكن أخرى لتسهيل المزيد من التجارة باليوان.

تتم تسوية بعض هذه المعاملات عبر "نظام الدفع بين البنوك عبر الحدود" الصيني (CIPS)، وهو بديل مقوم باليوان لشبكة رسائل (Swift). وقد أنشأته الصين في عام 2015، ولا يمكن للولايات المتحدة مراقبته بسهولة.

وعلى الرغم من أن حجم التداول على هذه الشبكة لا يزال صغيراً، إلا أنه قفز بعد بدء النزاع بين الولايات المتحدة وإيران. فقد بلغ متوسط التداول نحو 790 مليار يوان (حوالي 115 مليار دولار) يومياً في الأشهر الثلاثة منذ نهاية فبراير، وفقاً لمركز الأبحاث "المجلس الأطلسي" (Atlantic Council)، مقارنة بمتوسط يومي بلغ 680 مليار يوان (نحو 100 مليار دولار) في العام الماضي.

تعتبر شبكة "سويفت" (Swift) ومقرها بلجيكا أكبر بكثير، حيث تسهل تحويل ما يقدر بأكثر من 5 تريليونات دولار يومياً، بما في ذلك بعض الرسائل التي تمر عبر نظام (CIPS). لكن التوسع السريع لنشاط (CIPS) يعني أنه يتحول تدريجياً إلى نظام مدفوعات عبر الحدود أكثر عالمية، وفقاً للمجلس الأطلسي.

### روسيا على نفس الخطى
وقد تكرر نمط مماثل مع روسيا عندما بدأت حربها في أوكرانيا في فبراير 2022. فبعد أن شددت الولايات المتحدة العقوبات، تمت تسوية المزيد من صادرات النفط الروسية وغيرها من التبادلات التجارية مع الصين باستخدام اليوان. وقد تضاعف إجمالي المعاملات اليومية على نظام (CIPS) وتضاعف عدد المؤسسات المالية العاملة على المنصة أكثر من الضعف منذ بداية الحرب وحتى منتصف عام 2025، وفقاً لبيانات البنك المركزي الصيني.

اليوم، يؤكد المسؤولون الروس أن أكثر من 90% من التجارة بين روسيا والصين تتم تسويتها باليوان والروبل الروسي. ورغم تعذر تحديد الرقم الإجمالي قبل الحرب، إلا أنه للمقارنة، كان اليوان يُستخدم في 2% فقط من التجارة الروسية في فبراير 2022، وفقاً لمركز الدراسات الشرقية (Centre for Eastern Studies) البولندي.

بشكل عام، تضاعفت حصة اليوان في تمويل التجارة العالمية ثلاث مرات خلال السنوات الخمس الماضية لتصل إلى 6% في أبريل، وفقاً لبيانات (Swift). وقد احتل اليوان المرتبة الثانية كأكثر العملات استخداماً في هذا النوع من التمويل لمعظم هذا العام، متقدماً على اليورو ومحتلاً المركز الثاني بعد الدولار.

ووفقاً لبيانات البنك المركزي الصيني، يتم الآن تقويم حوالي نصف المعاملات عبر الحدود للصين بعملتها الخاصة، مقارنة بنسبة تكاد لا تُذكر قبل 15 عاماً.

وتعمل الصين أيضاً على توسيع نطاق برنامج أطلقته في عام 2021 يُسمى (mBridge)، وهو منصة تستخدم النسخ الرقمية من اليوان والعملات الأخرى لتنفيذ مدفوعات عبر الحدود تتم تسويتها بين البنوك المركزية دون أن تمر الأموال عبر أي مؤسسة مالية أمريكية.

يقول جوش ليبسكي، المسؤول السابق في صندوق النقد الدولي والباحث الحالي في المجلس الأطلسي، إن جميع الأنظمة القائمة على اليوان "تسهل الالتفاف على العقوبات الأمريكية. إنها تحجب قدرة مجتمع الاستخبارات الأمريكي على رؤية مسار التدفقات المالية".

من جهتها، قالت وزارة الخارجية الصينية في بيان لها إنها "ليست على علم بالوضع" المتعلق بتجارة النفط بين الصين وإيران. وأكدت أن العلاقات بين البلدين "كانت دائماً تُدار في إطار القانون الدولي". وأضافت أن الصين تتعاون مع دول في جميع أنواعه العالم، بما في ذلك روسيا، بناءً على "مبادئ المساواة والمنفعة المتبادلة".

لا تنوي الصين استبدال الدولار باليوان بالكامل على مستوى العالم. فالزيادة الدراماتيكية في الاعتماد العالمي على اليوان ستتطلب من بكين إجراء تغييرات مؤلمة في اقتصادها، مثل التخلي عن ضوابط رأس المال والسماح لعملتها بالتعويم الحر، وهو ما قد يؤدي إلى هروب رؤوس الأموال وزعزعة استقرار البلاد.

وبدلاً من ذلك، يتمثل هدف بكين في بناء مسارات تجارية محددة تعمل خارج نطاق الدولار الأمريكي. ويقول مسؤولون سابقون في وزارة الخزانة الأمريكية إن هذا الدفع مدفوع جزئياً برغبة بكين في تقويض السلطة الأمريكية ومساعدة حلفائها. وتصرح الصين علانية بأنها ترفض العقوبات التي تفرضها الولايات المتحدة.

كما تأمل بكين في عزل الصين عن نوعية الهجمات الاقتصادية التي شنتها الولايات المتحدة والدول الغربية الأخرى على إيران وروسيا، والتي من المرجح أن تُطلق ضد بكين إذا اتخذت أي خطوة عسكرية تجاه تايوان.

وقال محافظ البنك المركزي الصيني، بان قونغ شنغ، في خطاب ألقاه الصيف الماضي، إن التمويل العالمي يتطور نحو نظام "تتعايش وتتنافس فيه بضع عملات سيادية". وأضاف أن التغيير من عالم يتمحور حول الدولار يُعد أمراً حتمياً، لأنه "في أوقات التوترات الجيوسياسية، أو مخاوف الأمن القومي، أو حتى الحروب، تململ العملة العالمية المهيمنة إلى أن تُستخدم كأداة أو سلاح".

وتدرك الولايات المتحدة الفجوة التي تنفتح في نظام العقوبات العالمي الخاص بها. فمنذ بدء الحرب في إيران، كثف مسؤولو وزارة الخزانة جهودهم للحد من مبيعات النفط الإيراني إلى الصين وتقليص الأموال المتدفقة عبر النظام المالي الصيني، بما في ذلك إصدار عقوبات جديدة على "هينغلي" وغيرها من المصافي الصينية. كما هددت بفرض عقوبات على البنوك الصينية التي تقدم خدمات للشركات التي تعمل كواجهات للمصالح الإيرانية.

ومع ذلك، لا تزال العقوبات تمنح الولايات المتحدة ورقة ضغط على طهران؛ فقد أدت التدابير إلى زيادة تكلفة بيع النفط الإيراني وعطلت وصول النظام إلى تلك الإيرادات. وقد عانى الاقتصاد الإيراني تحت وطأة العقوبات الأمريكية، ومن شأن أي اتفاق طويل الأمد أن يحرر مليارات الدولارات من الأصول المجمدة التي تمس حاجة النظام الإيراني إليها.

وقد أثبتت محادثات الاتفاق النووي بالفعل أنها شائكة، ولا تزال النتيجة غير مؤكدة. وقال ستيف ييتس، وهو مسؤول سابق في الأمن القومي بالبيت الأبيض: "إيران لديها القدرة على كسب الوقت، والمراوغة، وإثارة المتاعب، لكنها تدهورت بشدة على المستويين العسكري والاقتصادي".

### ميثاق إيران والصين (Iran-China Pact)
بدأت الصين في اتخاذ خطوات لاستخدام اليوان في المزيد من المعاملات المالية الدولية بعد الأزمة المالية العالمية عام 2008.

كان الفائض التجاري الذي حققته الصين على مدار سنوات يعني أنها جمعت نحو 2 تريليون دولار من الاحتياطيات الأجنبية، معظمها بالدولار الأمريكي. وكان قادة بكين يشعرون بقلق متزايد من أن مدخرات الصين باتت تحت رحمة الحكومة الأمريكية والاحتياطي الفيدرالي، الذين يمكن لقراراتهم أن تضعف قيمة حيازات الصين، أو في حالة حدوث أزمة، قد تقطع عن البلاد إمكانية الوصول إلى الدولار.

بدأت بكين في استخدام دولاراتها الفائضة لتقديم قروض في العالم النامي، مما عزز نفوذها. ثم بدأت في تقديم خطوط مبادلة مقومة باليوان عبر بنكها المركزي للبلدان المثقلة بالديون، مما جعل الصين فعلياً مُقرض الملاذ الأخير للدول الفقيرة.

ثم قدمت بكين نظام الدفع بين البنوك عبر الحدود (CIPS) في عام 2015 للمساعدة في تدويل اليوان. وبعد ثلاث سنوات، أطلقت عقود نفط مقومة باليوان يتم تداولها في شنغهاي. سمح ذلك للصين بتسوية قيمة النفط الذي تشتريه باليوان بدلاً من الدولار.

كما نجحت الصين في تشجيع الشركات العالمية، بما في ذلك البنوك الأمريكية، على إصدار سندات بعملتها.

كانت جهود الصين المتعلقة باليوان لا تزال في مهدها عندما أطلقت إدارة ترامب الأولى في عام 2018 حملة لخفض صادرات النفط الإيرانية إلى الصفر، وإجبار إيران على التفاوض بشأن برنامجها النووي ودعمها للميليشيات في جميع أنحاء الشرق الأوسط، مثل حزب الله.

انهارت مبيعات إيران مع توقف الدول عن الشراء خوفاً من العقوبات الأمريكية التي قد تحرمها من الوصول إلى الدولار. وهنا التفتت طهران نحو بكين.

وقع الجانبان ميثاقاً استراتيجياً مدته 25 عاماً في مارس 2021 لتعميق العلاقات الاقتصادية والأمنية. وأشارت مسودة نُشرت في وسائل الإعلام الإيرانية إلى أن إيران ستقايض النفط مقابل استثمارات صينية في الموانئ والسكك الحديدية والبنية التحتية الأخرى. ووصفت الشراكة بأنها حصن "ضد الضغوط غير القانونية من أطراف ثالثة"، في إشارة واضحة إلى واشنطن.

ومع ذلك، كانت بكين حذرة من أن شراء النفط الإيراني يعرض الشركات الصينية لخطر الحظر من النظام المالي الذي يقوده الدولار الأمريكي. ويقول مسؤولو وزارة الخزانة إن إيران عملت مع عملاء في الصين لإنشاء نظام سري لمشتريات النفط، مما منح بكين القدرة على الإنكار المعقول بشأن مشترياتها من النفط الخاضع للعقوبات.

وأنشأ الجيش الإيراني، بما في ذلك الحرس الثوري الإسلامي، وحدات تجارية سرية، والتي أسست بدورها مئات الشركات الوهمية للعمل مع وسطاء لبيع النفط للمصافي الصينية وإخفاء مصدر الخام. وشملت الجهود توسيع "أسطول ظل" من الناقلات لنقل النفط الخاضع للعقوبات بين إيران والصين بطرق تخفي مصدره، مثل إيقاف تشغيل أجهزة تتبع الموقع في السفن.

وعلى الرغم من أن إيران سعّرت مبيعاتها النفطية بالدولار، يقول مسؤولو وزارة الخزانة إن المعاملات مع المشترين الصينيين تمت تسويتها في الغالب باليوان. وبحلول نهاية عام 2022، أصبحت الصين شريان الحياة المالي لطهران، حيث اشترت أكثر من 90% من نفطها الخام، وفقاً لمشرعين أمريكيين.

ابتعدت كبرى شركات النفط المملوكة للدولة في الصين عن هذه التجارة بسبب خطر العقوبات الدولية، لكن الشركات الخاصة مثل "هينغلي"، التي تدير مصفاة ضخمة في شمال شرق الصين، أصبحت من كبار العملاء، حسبما أفاد مسؤولون أمريكيون.

### نظام نقل اليوان (System to Move Yuan)
قد يسمح أي اتفاق نووي جديد لإيران بالعودة إلى النظام المالي العالمي، لكن طهران كانت قد اكتشفت بالفعل طريقة لاستخدام أرباحها من اليوان في ظل العقوبات.

بدلاً من تحويل مدفوعات اليوان إلى إيران، كان مشترو النفط الصينيون يودعون الأموال لدى كيان يُعرف باسم "تشوشين" (Chuxin)، وفقاً لما أوردته صحيفة وول ستريت جورنال سابقاً. وتقوم "تشوشين" بعد ذلك بتسليم الأموال إلى المقاولين الصينيين الذين يؤدون أعمالاً هندسية في إيران في مشاريع مثل المطارات والمصارفي.

وتضمنت طريقة أخرى نقل المدفوعات المقومة باليوان من المصافي الصينية من خلال "أداة ذات غرض خاص" (SPV) إلى المصدرين الصينيين، الذين يقومون بعد ذلك بنقل بضائع مثل قطع غيار السيارات إلى إيران، حسبما أفاد مسؤولون غربيون حاليون وسابقون. وأدارت شركتان تجاريتان غير معروفتين تمثلان داعمين صينيين وإيرانيين رصيد حساب الأداة ذات الغرض الخاص.

كما جربت الدولتان المقايضة المباشرة. ففي عام 2021، نجحت مدينة نينغبو الصينية في مقايضة قطع غيار سيارات صينية بقيمة مليوني دولار مقابل فستق إيراني، متجاوزة شبكة (Swift)، وفقاً لوسائل إعلام صينية.

مع ذلك، لا تزال بعض مبيعات النفط الإيراني تتم بالدولار. فقد أنشأت إيران شبكة من مكاتب الصرافة وأشباه البنوك، المعروفة باسم (الرهبر)، والتي تسيطر على شركات وهمية في هونغ كونغ والإمارات وتركيا، وفقاً لمسؤولي الخزانة الأمريكية. وتقوم هذه الشركات بفتح حسابات في بنوك صينية لدفع ثمن البضائع في الصين وأيضاً لتحويل مدفوعات النفط من اليوان إلى دولارات ويورو، والتي يمكن لإيران استخدامها حول العالم.

وعادة ما تتحرك هذه الأموال عبر مؤسسات مالية صينية صغيرة. ويساعد ذلك على حماية البنوك الصينية الكبرى، الأكثر انخراطاً في النظام المالي العالمي، من أي عقوبات إذا أثارت المعاملات أية شكوك.

ومع ذلك، فإن المبلغ الذي يتضمن الدولار صغير مقارنة بإجمالي تجارة النفط بين إيران والصين. وتقول وزارة الخزانة إن الشركات الوهمية المرتبطة بإيران نقلت ما يقرب من 4 مليارات دولار، أو حوالي 10% من مبيعات النفط الإيرانية المقدرة لعام 2024، عبر النظام المالي الأمريكي باستخدام حسابات مصرفية صينية في هونغ كونغ.

وقالت كيري بيتسوف، المسؤولة السابقة في وزارة الخزانة: "الجزء الأكبر من هذه الأموال يبقى ببساطة داخل الصين".

### إطلاق منصة (mBridge)
تأكدت أهمية اليوان بشكل أكبر بعد اندلاع الحرب في إيران. في شهر مارس، دفعت سفينة الحاويات (Newvoyager)، المملوكة لجهة صينية، رسوماً بقيمة مليوني دولار لطهران باليوان لضمان العبور الآمن عبر مضيق هرمز، وفقاً لأشخاص مشاركين في الصفقة.

كما دفعت سفن أخرى رسوماً باليوان، على الرغم من أنه من غير الواضح كيف تمت تسوية الأموال.

في وقت مبكر من النزاع، أفاد وسطاء وأصحاب سفن أن أطقم العمل اضطرت إلى إنزال صناديق نقدية من سطح السفينة إلى أفراد الحرس الثوري الإيراني عندما عبرت بالقرب من جزيرة لارك في الجزء الشمالي من مضيق هرمز. وقد أدى الحصار الأمريكي الذي فُرض في منتصف أبريل إلى توقف هذه الحركة بشكل شبه كامل، قبل أن يُرفع الأسبوع الماضي كجزء من المفاوضات الأمريكية الإيرانية.

في الإمارات العربية المتحدة، أدت وابلات من هجمات الطائرات المسيرة والصواريخ القادمة من إيران إلى زعزعة استقرار الأوضاع المالية للبلاد. نظراً لأن غالبية السكان من المولودين في الخارج، فإن النزاع يهدد بمغادرة المقيمين والمستثمرين للبلاد، وتحويل دراهمهم الإماراتية إلى دولارات، مما يقلص من احتياطيات البنك المركزي من الدولار. كما قلص النزاع من صادرات النفط المقومة بالدولار للدولة الخليجية، مما أدى إلى انخفاض تدفق الدولارات إليها.

وقد أبلغ مسؤولون إماراتيون نظراءهم الأمريكيين أنه في حال واجهت الدولة الغنية بالنفط نقصاً في الدولار، فقد تضطر إلى استخدام اليوان الصيني في مبيعات النفط والمعاملات الأخرى. ومن شأن ذلك أن يعمق العلاقة الاقتصادية المتنامية بالفعل بين أبوظبي وبكين.

وتعد الإمارات لاعباً مركزياً في منصة (mBridge) الصينية. انطلقت المنصة عام 2021 بتعاون بين بنك التسويات الدولية (BIS) ومقره سويسرا، والصين، والإمارات، وتايلاند، وهونغ كونغ. وانضمت المملكة العربية السعودية، أكبر شريك تجاري نفطي للصين، في وقت لاحق. ويستخدم النظام بعض عناصر العملات المشفرة ولكنه يخضع لسيطرة الحكومات.

تم تصميم المنصة، التي تستخدم تقنية "البلوكشين" للسماح للبنوك التجارية بنقل نسخ رقمية من اليوان والعملات الأخرى لعملائها، كوسيلة لتسوية المعاملات الدولية فورياً، وهو ما سيكون أسرع من النظام الحالي القائم على شبكة (Swift). وبدلاً من أن تقوم البنوك بتسوية المدفوعات بين شركتين أو فردين، تقوم البنوك المركزية في البلدين بتسوية المعاملة مباشرة باستخدام تقنية البلوكشين.

وقد انسحب بنك التسويات الدولية (BIS) في النهاية، بعد مناقشة روسيا لإصدار محتمل من تقنية mBridge تحت مسمى "Brics Bridge". وكان هذا الكيان، الذي لم يتم إنشاؤه بعد، سيضم دول "البريكس" (البرازيل وروسيا والهند والصين)، ويكون محصناً ضد العقوبات الغربية، على الرغم من أن بنك التسويات الدولية صرّح بأن انسحابه لم يكن لأسباب سياسية.

وفي حفل رُفعت فيه أعلام الصين والإمارات في أحد قصور أبوظبي في شهر نوفمبر، قام الشيخ منصور بن زايد آل نهيان، نائب رئيس الدولة الخليجية (التي تعد شريكاً دفاعياً رئيسياً للولايات المتحدة)، ببدء أول دفعة حكومية على الإطلاق لبكين عبر المنصة.

ولتشجيع استخدام المنصة بشكل أكبر، اتخذت بكين خطوة هامة في يناير من خلال السماح لليوان الرقمي المحتفظ به في البنوك الصينية بجني فوائد، شأنه شأن اليوان العادي. ويتيح ذلك للشركاء التجاريين الصينيين تلقي مدفوعات مقابل بضائعهم باليوان الرقمي، ومن ثم كسب الفائدة على تلك العملة الرقمية، وهو ما يحاكي آلية كسب الفوائد على احتياطيات الدولار الأمريكي عبر سندات الخزانة الأمريكية.

وشكل اليوان الرقمي نسبة 95% من الـ 4000 معاملة دفع عبر الحدود التي تمت على منصة (mBridge) حتى نوفمبر، وفقاً لبحث نُشر في مارس من قبل المجلس الأطلسي.`,
    contentEn: `China’s yuan-based financial infrastructure is enabling countries to bypass U.S. sanctions, weakening Washington’s ability to police global business.

The White House entered talks with Iran over a new nuclear deal, relying on a traditional point of leverage: the promise of sanctions relief and access to about $100 billion in frozen assets.

But that leverage is dwindling. Tehran has managed to blunt the impact of the U.S. sanctions campaign in recent years by successfully utilizing China’s financial infrastructure—built on the yuan—which operates far beyond Washington’s reach.

This shift was vividly demonstrated in late April when the U.S. escalated its "economic rage" campaign against Iran, sanctioning a major Chinese refinery it said bought billions of dollars in Iranian oil. The refinery, Hengli Petrochemical, countered that its supplier provided guarantees the oil wasn’t Iranian.

But the firm also sent a warning shot to the U.S., announcing that future oil purchases would be settled in yuan rather than the U.S. dollar, making it much harder for outside parties to track the financial flows.

It was the latest sign of a worrying new development for Washington. More illicit activity aimed at evading sanctions around the globe is taking place in yuan as China builds an alternative financial system designed to dilute Washington’s power to dictate terms in global affairs.

Historically, the dominance of the U.S. dollar—currently used in about 80% of global trade finance—has given Washington a massive advantage in monitoring global business. Most dollar-denominated international transactions must clear through U.S. banks, giving Washington the ability to observe them and cut off dollar supplies to users if necessary, enough to paralyze their operations entirely.

But when U.S. adversaries use yuan to run their business, those transactions do not enter the U.S.-led banking system, stripping Washington of its authority.

The U.S. paved the way for Iran to resume oil sales, and even receive payments in dollars, during negotiations. But even under U.S. sanctions aimed at banning those sales, Iran generated up to $43 billion in oil revenues in 2024, before unspecified discounts, according to the U.S. Energy Information Administration. These discounts vary but averaged around 13% in 2025, according to U.S. lawmakers.

Most of those sales were paid in yuan, according to the U.S. Treasury.

Tehran uses these funds to buy Chinese auto parts, solar panels, and other goods and services, as well as dual-use materials—items supposedly for civilian use but which can be used in weapons—all outside U.S. jurisdiction.

Ships seeking safe passage in the Strait of Hormuz during the conflict have also been told to pay Tehran in yuan or cryptocurrencies, which are also difficult for Washington to control. Treasury officials say Iranian and Chinese partners have created networks of shadow middlemen and front companies in Hong Kong and elsewhere to facilitate more yuan trade.

Some of these transactions clear through China’s Cross-Border Interbank Payment System (CIPS), a yuan-denominated alternative to the Swift messaging network. Created by China in 2015, it cannot be easily monitored by the U.S.

While trading volume on this network remains small, it jumped after the U.S.-Iran conflict began. Trading averaged about 790 billion yuan (about $115 billion) daily in the three months since the end of February, according to the Atlantic Council think tank, compared with a daily average of 680 billion yuan (about $100 billion) last year.

Belgium-based Swift is far larger, facilitating the transfer of an estimated $5 trillion-plus daily, including some messages passing through CIPS. But the rapid expansion of CIPS activity means it is gradually turning into a more global cross-border payments system, according to the Atlantic Council.

### Russia on the Same Path
A similar pattern unfolded with Russia when it began its war in Ukraine in February 2022. After the U.S. tightened sanctions, more of Russia’s oil exports and other trade with China were settled using yuan. Total daily transactions on CIPS doubled, and the number of financial institutions on the platform more than doubled from the start of the war to mid-2025, according to Chinese central bank data.

Today, Russian officials stress that more than 90% of trade between Russia and China is settled in yuan and Russian rubles. While the total figure before the war is unavailable, for comparison, the yuan was used in just 2% of Russian trade in February 2022, according to the Poland-based Centre for Eastern Studies.

Overall, the yuan’s share in global trade finance tripled over the past five years to reach 6% in April, according to Swift data. The yuan ranked second as the most used currency in this type of financing for most of this year, ahead of the euro and second only to the dollar.

According to Chinese central bank data, about half of China’s cross-border transactions are now denominated in its own currency, up from a negligible amount 15 years ago.

China is also expanding a program launched in 2021 called mBridge, a platform using digital versions of the yuan and other currencies to make cross-border payments settled between central banks without money passing through any U.S. financial institution.

Josh Lipsky, a former IMF official and researcher at the Atlantic Council, says all yuan-based systems "make it easier to circumvent U.S. sanctions. They blind the ability of the U.S. intelligence community to see where the money is going."

China’s Foreign Ministry said in a statement it was "not aware of the situation" regarding oil trade between China and Iran. It stressed that relations between the two countries "have always been conducted within the framework of international law." It added that China cooperates with countries worldwide, including Russia, based on "principles of equality and mutual benefit."

China does not intend to fully replace the dollar with the yuan globally. A dramatic increase in global reliance on the yuan would require Beijing to make painful changes to its economy, such as abandoning capital controls and letting its currency float freely, which could trigger capital flight and destabilize the country.

Instead, Beijing’s goal is to build specific trade corridors that operate outside the U.S. dollar. Former U.S. Treasury officials say this push is driven partly by Beijing’s desire to undermine U.S. authority and help its allies. China openly states it rejects sanctions imposed by the U.S.

Beijing also hopes to insulate China from the kind of economic attacks the U.S. and other Western nations launched against Iran and Russia, which would likely be triggered against Beijing if it took military action toward Taiwan.

Pan Gongsheng, the governor of China’s central bank, said in a speech last summer that global finance is evolving toward a system "where a few sovereign currencies coexist and compete." He added that a change from a dollar-centric world is inevitable because "in times of geopolitical tensions, national security concerns, or even wars, the dominant global currency tends to be used as a tool or weapon."

The U.S. is aware of the opening chasm in its global sanctions system. Since the war in Iran began, Treasury officials have intensified efforts to curtail Iranian oil sales to China and squeeze funds moving through the Chinese financial system, including issuing new sanctions on Hengli and other Chinese refineries. It has also threatened to sanction Chinese banks providing services to firms acting as fronts for Iranian interests.

Yet, sanctions still give the U.S. leverage over Tehran. The measures have raised the cost of selling Iranian oil and disrupted the regime’s access to those revenues. Iran’s economy has buckled under the weight of U.S. sanctions, and any long-term deal would unlock billions of dollars in frozen assets the Iranian regime desperately needs.

The nuclear deal talks have already proved thornier, and the outcome remains uncertain. Steve Yates, a former White House national security official, said: "Iran has the ability to buy time, to obfuscate, to stir up trouble, but it is severely degraded militarily and economically."

### The Iran-China Pact
China began taking steps to use the yuan in more international financial transactions after the 2008 global financial crisis.

Years of trade surpluses meant China had amassed some $2 trillion in foreign reserves, mostly in U.S. dollars. Leaders in Beijing were increasingly concerned that China’s savings were at the mercy of the U.S. government and the Federal Reserve, whose decisions could dilute the value of China’s holdings or, in a crisis, cut off access to dollars.

Beijing began using its surplus dollars to extend loans in the developing world, boosting its leverage. It then started offering yuan-denominated swap lines through its central bank to highly indebted countries, effectively making China a lender of last resort for poor nations.

Beijing then introduced CIPS in 2015 to help internationalize the yuan. Three years later, it launched yuan-denominated oil contracts traded in Shanghai, allowing China to settle oil purchases in yuan instead of dollars.

It also successfully encouraged global companies, including U.S. banks, to issue bonds in its currency.

China's yuan efforts were still in their infancy when the first Trump administration in 2018 launched a campaign to reduce Iranian oil exports to zero, forcing Iran to negotiate over its nuclear program and support for militias across the Middle East, such as Hezbollah.

Iran's sales collapsed as nations stopped buying for fear of U.S. sanctions shutting them out of dollars. Tehran turned to Beijing.

The two sides signed a 25-year strategic pact in March 2021 to deepen economic and security ties. A draft published in Iranian media suggested Iran would trade oil for Chinese investments in ports, railways, and other infrastructure. It described the partnership as a bulwark "against illegal pressures of third parties," a clear nod to Washington.

However, Beijing was cautious that buying Iranian oil risked getting Chinese firms shut out of the dollar-led financial system. Treasury officials say Iran worked with clients in China to set up a shadow oil procurement system, giving Beijing plausible deniability about its purchases of sanctioned oil.

Iran’s military, including the Islamic Revolutionary Guard Corps (IRGC), set up front commercial units, which in turn established hundreds of shell companies to work with middlemen to sell oil to Chinese refineries and mask the crude’s origin. The effort included expanding a "ghost fleet" of tankers to transport sanctioned oil between Iran and China in ways that hide its source, such as turning off vessel transponders.

While Iran priced its oil sales in dollars, Treasury officials say transactions with Chinese buyers were mostly settled in yuan. By late 2022, China had become Tehran's financial lifeline, buying more than 90% of its crude oil, according to U.S. lawmakers.

China's top state-owned oil companies steered clear of the trade due to international sanctions risk, but private firms like Hengli, which runs a massive refinery in northeast China, became major buyers, U.S. officials say.

### The System to Move Yuan
Any new nuclear deal might allow Iran back into the global financial system, but Tehran had already figured out how to use its yuan earnings under sanctions.

Instead of transferring yuan payments to Iran, Chinese oil buyers deposited funds with an entity known as Chuxin, according to a previous Wall Street Journal report. Chuxin then handed the funds to Chinese contractors performing engineering work in Iran on projects like airports and refineries.

Another method involved routing yuan payments from Chinese refineries through a special purpose vehicle (SPV) to Chinese exporters, who would then ship goods such as auto parts to Iran, current and former Western officials say. Two obscure trading firms representing Chinese and Iranian backers managed the SPV account balance.

The two countries also experimented with direct barter. In 2021, the Chinese city of Ningbo successfully swapped $2 million worth of Chinese auto parts for Iranian pistachios, bypassing Swift, according to Chinese media.

Still, some Iranian oil sales take place in dollars. Iran established a network of currency exchanges and quasi-banks, known as the Rahbar, which control shell companies in Hong Kong, the UAE, and Turkey, according to U.S. Treasury officials. These companies open accounts in Chinese banks to pay for goods in China and also to convert oil payments from yuan to dollars and euros, which Iran can use globally.

These funds usually move through small Chinese financial institutions, shielding larger Chinese banks more involved in the global financial system from sanctions if transactions raise red flags.

Still, the amount involving dollars is small compared with the total oil trade between Iran and China. The Treasury says front companies linked to Iran moved nearly $400 million, or about 10% of estimated 2024 Iranian oil sales, through the U.S. financial system using Chinese bank accounts in Hong Kong.

"The vast majority of this money simply stays within China," said Kerry Patsoff, a former Treasury official.

### The mBridge Launch
The importance of the yuan was further underscored after the war in Iran broke out. In March, the container ship Newvoyager, Chinese-owned, paid a $2 million fee to Tehran in yuan to ensure safe passage through the Strait of Hormuz, according to people involved in the transaction.

Other ships paid fees in yuan, though how the funds were cleared remains unclear.

Early in the conflict, middlemen and shipowners reported that crews had to drop boxes of cash from the deck to IRGC personnel as they transited near Larak Island in the northern part of the Strait of Hormuz. A U.S. blockade in mid-April stopped this almost completely, before being lifted last week as part of U.S.-Iran negotiations.

In the United Arab Emirates, barrages of Iranian drone and missile attacks destabilized the country’s finances. Because the majority of the population is foreign-born, the conflict threatened to prompt residents and investors to leave, converting their UAE dirhams to dollars, draining the central bank's dollar reserves. The conflict also curtailed the Gulf nation's dollar-denominated oil exports, reducing the flow of dollars into the country.

UAE officials told their U.S. counterparts that if the oil-rich state faced a dollar shortage, it might have to use Chinese yuan for oil sales and other transactions, deepening an already growing economic relationship between Abu Dhabi and Beijing.

The UAE is a central player in China’s mBridge platform. Launched in 2021 as a collaboration among the Switzerland-based Bank for International Settlements (BIS), China, the UAE, Thailand, and Hong Kong. Saudi Arabia, China's largest oil-trade partner, joined later. The system uses elements of cryptocurrency but is controlled by governments.

The platform, which uses blockchain technology to allow commercial banks to move digital versions of the yuan and other currencies for their clients, was designed as a way to settle international transactions instantaneously, faster than the current Swift-based system. Instead of banks settling payments between two firms or individuals, the two countries’ central banks settle the transaction directly using blockchain.

The BIS eventually withdrew after Russia discussed a potential version of mBridge under the name "Brics Bridge." This entity, yet to be established, would include the BRICS nations (Brazil, Russia, India, China) and be immune to Western sanctions, though the BIS stated its exit wasn't political.

At a ceremony where Chinese and UAE flags fluttered in an Abu Dhabi palace in November, Sheikh Mansour bin Zayed Al Nahyan, vice president of the Gulf nation (a key U.S. defense partner), initiated the first-ever government payment to Beijing over the platform.

To encourage more usage, Beijing took a significant step in January by allowing digital yuan held in Chinese banks to earn interest, just like regular yuan. This lets Chinese trade partners receive payments for their goods in digital yuan, then earn interest on that digital currency, mimicking the yield-bearing mechanism of U.S. Treasury-backed dollar reserves.

The digital yuan accounted for 95% of the 4,000 cross-border payments executed on mBridge through November, according to research published in March by the Atlantic Council.`,
    author: {
      nameAr: 'روري جونز، أوستن رامزي، وكوستاس باريس',
      nameEn: 'Rory Jones, Austin Ramzy, and Costas Paris',
      titleAr: 'مراسلون ومحللون لشؤون الشحن والمالية العالمية',
      titleEn: 'Global Shipping, Trade & Financial Correspondents, WSJ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600',
    date: '23 يونيو 2026',
    readTimeAr: '12 دقيقة قراءة',
    readTimeEn: '12 min read',
    views: 12450,
    tags: ['الصين', 'اليوان', 'العقوبات', 'روسيا', 'إيران', 'mBridge']
  },
  {
    id: 'leb-energy-block8-9-recon',
    category: 'lebanon',
    categories: ['lebanon', 'markets'],
    titleAr: 'وزارة الطاقة تعدل شروط رخصة الاستطلاع في الرقعة 8 والرقعة 9',
    titleEn: 'Ministry of Energy Amends Exploration License Terms in Blocks 8 and 9',
    summaryAr: 'تعديل القرار رقم 25 لمنح شركة PGS Geophysical AS رخصة لإجراء مسوح زلزالية ثنائية وثلاثية الأبعاد وحفظ ملكية البيانات للدولة اللبنانية.',
    summaryEn: 'Decision adjustments allow PGS Geophysical AS to execute 2D/3D seismic surveys, consolidating state ownership over regional offshore data.',
    excerptAr: 'تعديل شروط رخصة الاستطلاع غير الحصرية لشركة PGS في الرقعتين 8 و9 مع حفظ السيادة والملكية للدولة اللبنانية.',
    excerptEn: 'Ministry of Energy updates non-exclusive reconnaissance guidelines for PGS in Blocks 8 and 9, defining data ownership and revenue terms.',
    contentAr: `أصدرت وزارة الطاقة والمياه القرار رقم 25 تاريخ 6 حزيران 2026، والذي عدّل القرار رقم 25 تاريخ 4 كانون الأول 2024 الذي منح شركة PGS Geophysical AS النرويجية رخصة استطلاع غير حصرية لإجراء مسح زلزالي ثلاثي الأبعاد في الرقعة 8 وفي جزء مجاور من الرقعة 9 في المنطقة الاقتصادية الخالصة البحرية للبنان. نصت المادة 1 على أنه يمكن لشركة PGS Geophysical AS إجراء إما مسح زلزالي ثلاثي الأبعاد في الرقعة 8 وفي جزء مجاور من الرقعة 9، أو مسح زلزالي ثنائي الأبعاد من أجل الحصول على هذه البيانات ومعالجتها، إلى جانب إعادة معالجة المسوحات الزلزالية ثنائية الأبعاد التي أجرتها الشركة النرويجية TGS ASA في عام 2000 في المياه الإقليمية اللبنانية. وأضافت أن البيانات المكتسبة من عمليات الاستطلاع يجب أن تعتبر ملكاً للدولة اللبنانية.

وأشارت المادة 2 إلى أن الرخصة صالحة لمدة ثلاث سنوات تبدأ من تاريخ إصدارها في 4 كانون الأول 2024، في حين نصت المادة 5 على وجوب تنفيذ أنشطة الاستطلاع خلال 1095 يوماً من تاريخ إصدار الرخصة. وأضافت أنه يجب على الشركة الحصول على التصاريح اللازمة للقيام بأنشطتها، مثل التصاريح البحرية المطلوبة لدخول سفينة المسح إلى المياه الإقليمية اللبنانية. وأشارت المادة 6 إلى أن للشركة حقوقاً حصرية لمعالجة وتسويق البيانات الناتجة عن المسح الزلزالي لمدة 10 سنوات من تاريخ الحصول على الرخصة. وأشارت إلى أن الشركة يجب أن تمتثل لجميع الأحكام المتعلقة بإدارة عمليات المسح الزلزالي، والأعمال المطلوبة، والأعمال المنجزة، والتفاصيل الفنية والتجارية. وأضافت أنه يجب على الشركة الالتزام بالشروط والأحكام المتعلقة بتسويق وبيع الرخص، بما في ذلك جميع الأحكام المتعلقة باتفاقية تقاسم الإيرادات مع الدولة اللبنانية الناتجة عن بيع الرخص، فضلاً عن التزامات التسويق والتدريب والدعم المؤسسي المحددة في الرخصة الحالية.

ونصت المادة 7 على وجوب قيام شركة PGS Geophysical AS بإبلاغ وزارة الطاقة والمياه وكذلك هيئة إدارة قطاع البترول اللبنانية (LPA) بإجمالي تكلفة الأعمال عند اكتمال المسح. وأشارت إلى أنه يجب على الشركة أن تدفع للحكومة اللبنانية حصتها من عائدات بيع رخص البيانات المتعلقة بالرخصة الحالية، وفقاً لجدول تقاسم الإيرادات، ويجب عليها تحويل المبلغ المستحق للدولة اللبنانية إلى حسابها في مصرف لبنان. وأشارت المادة 9 إلى أن الوزارة ستلغي الرخصة وتلغي جميع الحقوق الممنوحة إذا فشلت الشركة في الوفاء بأي من التزاماتها. ونصت المادة 10 على أن الوزارة ستنهي جميع الحقوق التي منحتها بموجب رخصة الاستطلاع الحالية، وتحديداً تلك المتعلقة بالمسوحات الزلزالية ثنائية الأبعاد، إذا لم تنجز الشركة الحائزة على الرخصة المسح الزلزالي قبل انتهاء مدة الرخصة أو تمديدها. ونصت المادة 11 على أن رخصة الاستطلاع الحالية والتزاماتها وملاحقها غير قابلة للتحويل ولا يمكن التنازل عنها لأطراف ثالثة. وقالت المادة 12 إن جميع التزامات وملاحق الرخصة الحالية يجب أن تكون ملزمة للشركة إذا استحوذت أي شركة على PGS Geophysical AS.

وكانت الوزارة قد أصدرت القرار رقم 25 بتاريخ 4 كانون الأول 2024 الذي منح شركة PGS Geophysical AS النرويجية رخصة استطلاع غير حصرية لإجراء مسح زلزالي ثلاثي الأبعاد في الرقعة 8 وفي جزء مجاور من الرقعة 9 في المنطقة الاقتصادية الخالصة البحرية للبنان، مع حقوق حصرية لتسويق البيانات وبيع رخص الوصول لشركات الطاقة العالمية. وقالت إنها اتخذت القرار بناءً على توصية هيئة إدارة قطاع البترول ووفقاً لأحكام قانون الموارد البترولية البحرية 132/2010 والأحكام ذات الصلة من المرسوم 10289/2013. وأشارت إلى أن الهيئة اعتبرت أن منح الرخصة مهم، بالنظر إلى أن الشركة قد أجرت معظم المسوحات الزلزالية البحرية للبنان، وأن لديها عدة سنوات من الخبرة مع الحكومة اللبنانية من خلال تسويق البيانات والترويج لجولتي التراخيص البحرية الأولى والثانية للتنقيب عن النفط والغاز البحري. علاوة على ذلك، وقعت الوزارة عقداً مع شركة PGS Geophysical AS في عام 2011 لإجراء مسح زلزالي بحري ثلاثي الأبعاد لاستكشاف وجود البترول في المياه الاقتصادية الخالصة للبنان، فضلاً عن تسويق وإعادة معالجة البيانات، وتوفير التدريب المطلوب لمزيد من تحليل البيانات.`,
    contentEn: `The Ministry of Energy and Water issued Decision No. 25 dated June 6, 2026, amending Decision No. 25 dated December 4, 2024, which granted the Norwegian company PGS Geophysical AS a non-exclusive reconnaissance license to conduct a 3D seismic survey in Block 8 and an adjacent part of Block 9 in Lebanon's offshore exclusive economic zone (EEZ). Article 1 states that PGS Geophysical AS can conduct either a 3D seismic survey in Block 8 and an adjacent part of Block 9, or a 2D seismic survey to acquire and process this data, in addition to reprocessing the 2D seismic surveys conducted by the Norwegian company TGS ASA in 2000 in Lebanese territorial waters. It added that the data acquired from the reconnaissance operations must be considered the property of the Lebanese state.

Article 2 indicated that the license is valid for three years starting from its date of issue on December 4, 2024, while Article 5 stipulated that the reconnaissance activities must be executed within 1095 days from the license issue date. It added that the company must obtain the necessary permits to carry out its activities, such as the maritime permits required for the survey vessel to enter Lebanese territorial waters. Article 6 indicated that the company has exclusive rights to process and market the data resulting from the seismic survey for a period of 10 years from the date of obtaining the license. It noted that the company must comply with all provisions related to managing seismic operations, required works, completed works, and technical and commercial details. It added that the company must adhere to the terms and conditions related to marketing and selling licenses, including all provisions related to the revenue-sharing agreement with the Lebanese state resulting from the sale of licenses, as well as the marketing, training, and institutional support obligations specified in the current license.

Article 7 stipulated that PGS Geophysical AS must inform the Ministry of Energy and Water as well as the Lebanese Petroleum Administration (LPA) of the total cost of the works upon completion of the survey. It indicated that the company must pay the Lebanese government its share of the revenues from the sale of data licenses related to the current license, in accordance with the revenue-sharing schedule, and must transfer the amount due to the Lebanese state to its account at Banque du Liban. Article 9 indicated that the ministry will cancel the license and revoke all granted rights if the company fails to meet any of its obligations. Article 10 stated that the ministry will terminate all rights granted under the current reconnaissance license, specifically those related to 2D seismic surveys, if the licensee fails to complete the seismic survey before the expiry of the license or its extension. Article 11 stipulated that the current reconnaissance license, its obligations, and its annexes are non-transferable and cannot be assigned to third parties. Article 12 said that all obligations and annexes of the current license shall be binding on the company if any company acquires PGS Geophysical AS.

The ministry had previously issued Decision No. 25 on December 4, 2024, granting PGS Geophysical AS the non-exclusive reconnaissance license to conduct the 3D seismic survey in Block 8 and part of Block 9, with exclusive marketing rights for data. The decision was based on the recommendation of the Lebanese Petroleum Administration (LPA) in accordance with the Offshore Petroleum Resources Law 132/2010 and Decree 10289/2013. The LPA considered granting the license crucial since PGS has conducted most of Lebanon's offshore seismic surveys and holds extensive experience working with the Lebanese government. In 2011, the ministry had signed a contract with PGS to conduct a 3D offshore seismic survey, alongside data marketing, reprocessing, and capacity training.`,
    author: {
      nameAr: 'الدائرة الاقتصادية للورّاق',
      nameEn: 'AlWarraq Economic Desk',
      titleAr: 'محلل شؤون النفط والغاز',
      titleEn: 'Oil & Gas Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    date: '25 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 3120,
    tags: ['النفط', 'الغاز', 'الرقعة 8', 'الرقعة 9', 'وزارة الطاقة', 'لبنان']
  },
  {
    id: 'leb-ogero-ftth-nationwide',
    category: 'lebanon',
    categories: ['lebanon', 'telecom-internet'],
    titleAr: 'أوجيرو توقع عقوداً لإطلاق خدمات النطاق العريض للألياف البصرية إلى المنازل (FTTH) على الصعيد الوطني',
    titleEn: 'Ogero Signs Contracts for Nationwide Fiber-to-the-Home (FTTH) Broadband Expansion',
    summaryAr: 'مبادرة ممولة بالكامل من وفورات عام 2025 تهدف لإيصال الإنترنت فائق السرعة لأكثر من 325,000 أسرة عبر 25 سنترالاً مركزياً على مستوى البلاد كبديل للشبكات غير القانونية.',
    summaryEn: 'State-owned telecom operator secures expansion project funded via 2025 savings to deliver high-speed optical fiber internet to 325,000 households across 25 central exchanges.',
    excerptAr: 'هيئة أوجيرو تبدأ التحول الرقمي الشامل بإطلاق شبكات FTTH لخدمة 325 ألف وحدة سكنية كخطوة نحو إنهاء الاحتكار غير الشرعي وتطوير الاقتصاد الرقمي.',
    excerptEn: 'Ogero announces implementation contracts for FTTH deployment to 325,000 households, aiming to eliminate illegal distribution networks and enhance national digital speed.',
    contentAr: `أعلنت هيئة "أوجيرو" المملوكة للدولة والمزودة لخدمات الاتصالات أنها وقعت عقود تنفيذ لتشغيل خدمات النطاق العريض للألياف البصرية إلى المنازل (FTTH) في لبنان. وقالت إن المبادرة، الممولة بالكامل من وفورات عام 2025، ستوفر إنترنت عالي السرعة عبر الألياف البصرية لأكثر من 325,000 أسرة عبر 25 سنترالاً مركزياً على مستوى البلاد. وعلاوة على ذلك، أشارت إلى أن المشروع يمكن أن يكون بديلاً لشبكات الاتصالات غير القانونية، حيث سيوفر سرعات إنترنت أسرع بكثير، ويعزز الفرص الاجتماعية والاقتصادية بشكل أكبر، ويقوي الاقتصاد الرقمي الوطني في لبنان. وأضافت أن هذا المشروع يمثل الإطلاق الرسمي لتحول رقمي شامل للبلاد.

في السابق، منحت أوجيرو مشروعاً بقيمة 283 مليون دولار في شباط 2018 لشركة نوكيا الفنلندية، ولشركة هواوي الصينية، ولشركة كاليكس الأمريكية لاستبدال الكابلات النحاسية الحالية بكابلات الألياف البصرية. وكان على هواوي ونوكيا وكاليكس تنفيذ مشروع كابلات الألياف البصرية بحلول عام 2022 بالشراكة مع الشركات المحلية Serta Channels، و PowerTech، و BMB على التوالي، وهي ثلاثة مزودي لحلول تكنولوجيا المعلومات والاتصالات. لكن أوجيرو أشارت إلى أن المشروع لم يحقق سوى 25% من هدفه بحلول منتصف عام 2023.

بعد عملية عطاءات مفصلة، تم اختيار الشركات الثلاث من بين خمس شركات مؤهلة مسبقاً بناءً على قدرتها الفنية وأهليتها المالية. بشكل عام، كان من المتوقع أن يؤدي المشروع الذي يمتد لأربع سنوات إلى زيادة سرعة الإنترنت إلى أكثر من 50 ميغابت في الثانية (Mb/s)، وهو ما يشكل زيادة كبيرة من سرعة الإنترنت التي كانت تتراوح بين 2 و 4 ميغابت في الثانية في عام 2018. كان مشروع كابلات الألياف البصرية جزءاً من خطة "رؤية لبنان للاتصالات الرقمية 2020" الخمسية التي أطلقتها وزارة الاتصالات في تموز 2015 لتطوير البنية التحتية للاتصالات في البلاد من خلال استبدال البنية التحتية للأسلاك النحاسية بكابلات الألياف البصرية، من أجل تعزيز سرعة الإنترنت. ومن شأن استخدام كابلات الألياف البصرية، بدلاً من الكابلات النحاسية، أن يقلل بنسبة 50% من كمية الكابلات اللازمة لربط نفس العدد من الأسر.

أشار مسح أجرته Speedtest، وهي خدمة ويب توفر مقاييس أداء الوصول إلى الإنترنت، إلى أن سرعة التنزيل عبر الإنترنت الثابت عريض النطاق في لبنان كانت في المرتبة 139 الأسرع من بين 149 دولة وإقليماً حول العالم والمرتبة 15 الأسرع من بين 17 دولة في المنطقة العربية في أيار 2026. وعالمياً، كانت سرعة التنزيل عبر الإنترنت الثابت عريض النطاق في لبنان أسرع منها في كينيا وغينيا وباكستان بين الاقتصادات التي يبلغ ناتجها المحلي الإجمالي 10 مليارات دولار أو أكثر، في حين كانت أبطأ منها في مدغشقر وأنغولا وتونس. يظهر المسح أن سرعة التنزيل عبر النطاق العريض في لبنان بلغت 20.86 ميغابايت في الثانية (mbps) في أيار 2026، ارتفاعاً من 20.33 ميغابايت في الثانية في نيسان 2026 و16.12 ميغابايت في الثانية في أيار 2025. لكنها جاءت أقل بكثير من المتوسط البسيط لسرعة تنزيل الإنترنت عريض النطاق البالغ 132.7 ميغابايت في الثانية عالمياً و116.2 ميغابايت في الثانية في الدول العربية. علاوة على ذلك، تتخلف سرعة تنزيل الإنترنت عريض النطاق في البلاد عن متوسط دول مجلس التعاون الخليجي البالغ 216.7 ميغابايت في الثانية ومتوسط الدول العربية غير الخليجية البالغ 61.3 ميغابايت في الثانية.

بالتوازي، أشار المسح إلى أن سرعة التنزيل من الإنترنت عبر الهاتف المحمول في لبنان كانت في المرتبة 94 الأسرع من بين 101 دولة وإقليماً حول العالم والمرتبة 13 الأسرع من بين 14 دولة في المنطقة العربية في أيار 2026. وعالمياً، كانت سرعة التنزيل من الإنترنت عبر الهاتف المحمول في لبنان أسرع منها في بنما وباكستان وفنزويلا، بينما كانت أبطأ منها في المكسيك والسلفادور وبنغلاديش. يظهر المسح أن سرعة التنزيل عبر الإنترنت عبر الهاتف المحمول في لبنان بلغت 36.82 ميغابايت في الثانية في أيار 2026، انخفاضاً من 36.4 ميغابايت في الثانية في نيسان 2026 ومن 47.16 ميغابايت في الثانية في أيار 2025. لكنها جاءت أقل بكثير من المتوسط البسيط لسرعة تنزيل الإنترنت عبر الهاتف المحمول البالغ 119.7 ميغابايت في الثانية عالمياً و190.9 ميغابايت في الثانية في الدول العربية. وعلاوة على ذلك، تتخلف سرعة تنزيل الإنترنت عبر الهاتف المحمول في البلاد عن متوسط دول مجلس التعاون الخليجي البالغ 374.7 ميغابايت في الثانية ومتوسط الدول العربية غير الخليجية البالغ 53.1 ميغابايت في الثانية.`,
    contentEn: `State-owned telecom operator Ogero announced it has signed execution contracts to operate Fiber-to-the-Home (FTTH) broadband services in Lebanon. It said the initiative, fully funded by 2025 savings, will provide high-speed optical fiber internet to over 325,000 households across 25 central exchanges nationwide. Moreover, it noted that the project could serve as an alternative to illegal telecom networks, providing much faster internet speeds, further enhancing socioeconomic opportunities, and strengthening Lebanon's national digital economy. It added that this project represents the official launch of a comprehensive digital transformation for the country.

Previously, Ogero had awarded a $283 million project in February 2018 to Finland's Nokia, China's Huawei, and the US's Calix to replace copper cables with fiber optic. Huawei, Nokia, and Calix were to implement the project by 2022 in partnership with local ICT solution providers Serta Channels, PowerTech, and BMB, respectively. However, Ogero indicated that the project had achieved only 25% of its target by mid-2023. Following a detailed bidding process, the three companies were selected from five pre-qualified firms based on technical capability and financial eligibility. Overall, the four-year project was expected to increase internet speeds to over 50 Mbps, a massive jump from 2 to 4 Mbps in 2018. The project was part of the "Lebanon Digital Telecom Vision 2020" five-year plan launched by the Ministry of Telecommunications in July 2015 to develop the country's telecom infrastructure.

A survey by Speedtest indicated that Lebanon's fixed broadband download speed ranked 139th fastest out of 149 countries globally, and 15th out of 17 Arab countries in May 2026. Globally, Lebanon's speed was faster than Kenya, Guinea, and Pakistan, but slower than Madagascar, Angola, and Tunisia. The survey shows that fixed broadband download speed reached 20.86 Mbps in May 2026, up from 20.33 Mbps in April 2026 and 16.12 Mbps in May 2025. This remains far below the global average of 132.7 Mbps and Arab average of 116.2 Mbps. Meanwhile, mobile internet download speed ranked 94th out of 101 countries globally, and 13th out of 14 Arab countries, reaching 36.82 Mbps in May 2026, compared to 36.4 Mbps in April 2026 and 47.16 Mbps in May 2025. This lag highlights the urgent need for structural digital infrastructure development.`,
    author: {
      nameAr: 'فريق الاتصالات والإنترنت',
      nameEn: 'Telecom & Digital Desk',
      titleAr: 'محلل شبكات وبنية تحتية',
      titleEn: 'Infrastructure & Telecom Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600',
    date: '22 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 4560,
    tags: ['أوجيرو', 'الألياف البصرية', 'FTTH', 'الاتصالات', 'الإنترنت', 'لبنان']
  },
  {
    id: 'leb-bdl-forensic-audit',
    category: 'lebanon',
    categories: ['lebanon', 'markets'],
    titleAr: 'مصرف لبنان يبدأ تدقيقاً جنائياً لبرنامج الدعم والتحويلات الخارجية',
    titleEn: 'Banque du Liban Initiates Forensic Audit of Subsidy Program and International Transfers',
    summaryAr: 'مصرف لبنان يرسي عقداً على شركة الفاريز ومارسال لإجراء تدقيق جنائي لمعاملات الأصول الأجنبية وبرامج دعم استيراد السلع بين 2019 و2023 للتحقق من سلامة الإنفاق.',
    summaryEn: 'Banque du Liban contracts Alvarez & Marsal to execute a comprehensive forensic audit covering multi-billion dollar subsidy imports and international bank transfers from 2019 to 2023.',
    excerptAr: 'مصرف لبنان يعلن رسمياً إرساء عقد التدقيق الجنائي لبرنامج الدعم والتحويلات بمليارات الدولارات على شركة ألفاريز ومارسال.',
    excerptEn: 'BDL partners with Alvarez & Marsal to execute forensic audit on government subsidy expenditures and international bank transfers under Public Procurement Law.',
    contentAr: `أعلن مصرف لبنان، بالتنسيق مع وزارة المالية ووزارة العدل، أنه استكمل بنجاح عملية تقديم العطاءات بموجب قانون الشراء العام رقم 244/2021 لإجراء تدقيق جنائي لمعاملات مختارة تتعلق بالأصول الأجنبية لمصرف لبنان خلال الفترة ما بين 1 تشرين الأول 2019 و31 كانون الأول 2023. وقال مصرف لبنان إنه، بعد التقييم الإداري والفني والمالي للعروض المقدمة، منح العقد لشركة الاستشارات الإدارية الفاريز ومارسال (A&M) الشرق الأوسط المحدودة وفقاً للوائح القانونية والإجراءات المعتادة. وعلاوة على ذلك، أشار إلى أن هذه العملية هي جزء من جهد مؤسسي مشترك يهدف إلى إجراء تدقيق مالي وجنائي شامل يغطي الفترة من تشرين الأول 2019 إلى نهاية عام 2023. وأضاف أنه خلال هذا الإطار الزمني المحدد، شهد مصرف لبنان تدخلات مالية واسعة النطاق لصالح كيانات القطاعين العام والخاص.

بالإضافة إلى ذلك، أشار إلى أن التدقيق سيغطي في المقام الأول برنامج الدعم الذي وافقت عليه الحكومات المتعاقبة، والذي تضمن تحويل ومدفوعات بمليارات الدولارات الأمريكية لدعم استيراد السلع الأساسية وكذلك المواد الخام للصناعة والزراعة ؛ وكذلك الأموال التي وضعها مصرف لبنان بتصرف المؤسسات العامة والوكالات الحكومية ؛ والمعاملات التي أجراها مصرف لبنان مع البنوك التجارية من خلال التحويلات الدولية إلى حسابات هذه الأخيرة في الخارج.

كما قال إن الأهداف الأساسية للتدقيق الجنائي هي التأكد من أن جميع المدفوعات والتحويلات، وخاصة تلك المرتبطة ببرامج الدعم، تم تنفيذها بموجب تفويضات قانونية وحصلت على التصاريح المناسبة ؛ وأن الأموال وصلت إلى المستفيدين المحددين والمعتمدين بوضوح ؛ وأن الأموال استخدمت بصرامة للأغراض المخصصة لها دون أي انتهاكات أو سوء استخدام أو استغلال للأموال العامة. وعلاوة على ذلك، أشار إلى أن التدقيق سيدعم السلطات المعنية في وزارة المالية وفي وزارة العدل لتحديد ومقاضاة الحالات التي حصلت فيها كيانات أو أفراد بشكل غير قانوني على أموال الدعم. وأضاف أنه يغطي الحالات التي تم فيها استخدام هذه الأموال في انتهاك للأهداف المعلنة لبرامج الدعم. وقال إن التدقيق سيسمح لمصرف لبنان بتكوين رؤية دقيقة ومستقلة ومدققة للحجم الإجمالي للأموال المنفقة من تشرين الأول 2019 حتى نهاية عام 2023. وعلاوة على ذلك، أشار مصرف لبنان إلى أنه سيزود الجمهور بتحديثات منتظمة حول التقدم المحرز في التدقيق الجنائي، تماشياً مع التزامه بالشفافية والإفصاح. وأضاف أنه بمجرد اكتماله بالكامل، سيتم تقديم التقرير النهائي حول برنامج الدعم رسمياً إلى كل من وزارة المالية ووزارة العدل.

في تشرين الثاني 2025، أعلن مصرف لبنان أنه بالتنسيق مع وزارة المالية ووزارة العدل، سيبدأ بإعداد الشروط المرجعية لإجراء تدقيق مالي وجنائي خارجي لجميع المستفيدين من برنامج الدعم الحكومي للسلع المستوردة بعد 17 تشرين الأول 2019. وأضاف أن ذلك سيتم بالتعاون مع الوزارتين ويهدف إلى إطلاق مناقصة بهذا الشأن وفقاً لأحكام القانون رقم 244/2021. وأشار مصرف لبنان إلى أن هذا الإجراء يهدف إلى الاستعانة بشركة متخصصة لإجراء تدقيق مالي وجنائي خارجي يغطي برنامج دعم السلع الذي أطلقته الحكومات السابقة. كما سيغطي تحويل الأموال إلى الحسابات المصرفية في الخارج، بالإضافة إلى النفقات التي تمت نيابة عن الدولة خلال الفترة 2019-2023، أو خلال الإطار الزمني لبرنامج الدعم. وأضاف أن التدقيق يهدف إلى تحديد واسترداد وتصحيح أي مدفوعات غير مشروعة أو سوء استخدام للأموال العامة أو إساءة استخدام للسلطة قد تكون حدثت في سياق عمليات الدعم السابقة.

سنّ مجلس النواب اللبناني في 30 حزيران 2021 القانون رقم 240 الذي ينص على أن جميع المستفيدين من الدعم الحكومي بالعملات الأجنبية سيخضعون لتدقيقات محاسبية وجنائية خارجية. وقال إن جميع الشركات والمستوردين والتجار والمنظمات غير الحكومية، من بين آخرين، الذين استفادوا من آلية الحكومة لدعم استيراد السلع الأساسية وكذلك المواد الخام للصناعة والزراعة بين 17 تشرين الأول 2019 وتاريخ رفع هذا الدعم سيخضعون للتدقيقات الجنائية والمالية. تتكون آلية الدعم من قيام مصرف لبنان ببيع الدولار الأمريكي بسعر صرف 1507.5 ليرة لبنانية للدولار للمستوردين لسلة تصل إلى 300 سلعة استهلاكية أساسية، وأدوية، وأدوات طبية، بالإضافة إلى المواد الخام للصناعة والزراعة. وقدر مصرف لبنان أن برنامج الدعم استنزف حوالي 800 مليون دولار شهرياً من احتياطياته من العملات الأجنبية.`,
    contentEn: `Banque du Liban (BDL), in coordination with the Ministry of Finance and the Ministry of Justice, announced it has successfully completed the bidding process under Public Procurement Law No. 244/2021 to conduct a forensic audit of selected transactions related to BDL's foreign assets between October 1, 2019, and December 31, 2023. BDL said that, following the administrative, technical, and financial evaluation of the bids, it awarded the contract to the management consulting firm Alvarez & Marsal (A&M) Middle East Limited in accordance with legal regulations and customary procedures.

Moreover, BDL indicated that this process is part of a joint institutional effort aimed at conducting a comprehensive financial and forensic audit covering the period from October 2019 to the end of 2023. It added that during this specific timeframe, BDL witnessed large-scale financial interventions in favor of both public and private sector entities. Additionally, the audit will primarily cover the subsidy program approved by successive governments, which involved transfers and payments of billions of US dollars to support the import of basic goods and raw materials for industry and agriculture; as well as funds placed by BDL at the disposal of public institutions and government agencies; and transactions conducted with commercial banks through international transfers to their accounts abroad.

The primary goals of the forensic audit are to verify that all payments and transfers, especially those linked to subsidy programs, were executed under legal mandates and received appropriate authorizations; that the funds reached clearly identified and authorized beneficiaries; and that the funds were used strictly for their allocated purposes without any violations, misuse, or exploitation of public funds. BDL also noted that Parliament enacted Law No. 240 on June 30, 2021, mandating accounting and forensic audits of all entities who benefited from the foreign currency subsidy mechanism, which sold USD at the legacy exchange rate of 1507.5 LBP to importers. BDL estimated that this program drained approximately $800 million per month from its foreign exchange reserves.`,
    author: {
      nameAr: 'الدائرة الاقتصادية والمالية للورّاق',
      nameEn: 'AlWarraq Forensic & Legal Desk',
      titleAr: 'محلل الحوكمة والسياسات النقدية',
      titleEn: 'Governance & Monetary Policy Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600',
    date: '20 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 6120,
    tags: ['مصرف لبنان', 'التدقيق الجنائي', 'ألفاريز ومارسال', 'برنامج الدعم', 'القانون 240', 'لبنان']
  },
  {
    id: 'leb-beirut-port-traffic-2026',
    category: 'lebanon',
    categories: ['lebanon', 'markets'],
    titleAr: 'مرفأ بيروت يعالج مليون طن من البضائع في الشهرين الأولين من عام 2026',
    titleEn: 'Port of Beirut Handles 1.04 Million Tons of Cargo in First Two Months of 2026',
    summaryAr: 'ارتفاع نشاط الشحن بمرفأ بيروت بنسبة 18.5%، مقابل تراجع نشاط مرفأ طرابلس بنسبة 26.8% وسط ضغوط إقليمية واستيرادية متغيرة.',
    summaryEn: 'Beirut Port cargo volume rises 18.5% year-on-year, while Tripoli Port sees a 26.8% decline amid shifting maritime corridors and regional trade adjustments.',
    excerptAr: 'نمو ملحوظ في نشاط شحن مرفأ بيروت مستقراً عند 1.04 مليون طن مقابل انخفاض ملحوظ في حركة شحن مرفأ طرابلس.',
    excerptEn: 'Beirut Port registers strong growth in cargo handling, reaching 1.04 million tons in early 2026, contrasting with Tripoli\'s slowdown.',
    contentAr: `تظهر الأرقام الصادرة عن مرفأ بيروت أن المرفأ عالج 1.04 مليون طن من البضائع في الشهرين الأولين من عام 2026، مما يشكل زيادة بنسبة 18.5% من 881,000 طن من البضائع في نفس الفترة من عام 2025. بلغ إجمالي البضائع المستوردة 916,000 طن في الشهرين الأولين من عام 2026، بزيادة 21.3% من 755,000 طن في نفس الفترة من العام الماضي، ومثلت 87.7% من إجمالي البضائع المعالجة في الفترة المشمولة. بالإضافة إلى ذلك، بلغ حجم البضائع المصدرة 128,000 طن في الشهرين الأولين من عام 2026، وهو ما يمثل زيادة بنسبة 1.6% من 126,000 طن في نفس الفترة من عام 2025، ومثلت 12.3% من إجمالي البضائع في الفترة المشمولة. رست ما مجموعه 201 سفينة في المرفأ في الشهرين الأولين من عام 2026، بانخفاض بنسبة 10.7% من 225 سفينة في نفس الفترة من العام الماضي. تعامل المرفأ مع 473,000 طن من البضائع في شباط 2026، بانخفاض بنسبة 17.2% من 571,000 طن في كانون الثاني 2026. بالإضافة إلى ذلك، رست 103 سفن في المرفأ في شباط 2026 مقارنة بـ 98 سفينة في الشهر السابق.

بالتوازي، عالج مرفأ طرابلس 265,000 طن من البضائع في الشهرين الأولين من عام 2026، وهو ما يمثل انخفاضاً قدره 97,000 طن، أو 26.8%، من 362,000 طن في نفس الفترة من العام الماضي. وبلغت البضائع المستوردة 209,000 طن في الفترة المشمولة وانخفضت بمقدار 79,000 طن (-27.4%) من 288,000 طن في الشهرين الأولين من عام 2025. ومثلت الواردات 78.9% من نشاط الشحن في الفترة المشمولة. علاوة على ذلك، بلغ حجم البضائع التي تم تصديرها عبر المرفأ 56,000 طن في الشهرين الأولين من عام 2026، مما يشكل انخفاضاً قدره 18,000 طن، أو 24.3%، من 74,000 طن في نفس الفترة من عام 2025، ومثلت 21% من إجمالي البضائع في الفترة المشمولة. رست ما مجموعه 94 سفينة في المرفأ في الشهرين الأولين من عام 2026، مما يشكل انخفاضاً بنسبة 26% من 127 سفينة في نفس الفترة من عام 2025. وتعامل المرفأ مع 120,000 طن من البضائع في شباط 2026، بانخفاض بنسبة 17.2% من 145,000 طن في كانون الثاني 2026. كما رست 49 سفينة في المرفأ في شباط 2026 مقارنة بـ 45 سفينة في كانون الثاني 2026.`,
    contentEn: `Figures issued by the Port of Beirut show that the port handled 1.04 million tons of cargo in the first two months of 2026, representing an 18.5% increase from 881,000 tons of cargo in the same period of 2025. Total imported goods reached 916,000 tons in the first two months of 2026, up 21.3% from 755,000 tons in the same period last year, representing 87.7% of total handled cargo. Exported cargo reached 128,000 tons in the first two months of 2026, up 1.6% from 126,000 tons in the same period of 2025, accounting for 12.3% of the total. A total of 201 vessels docked at the port in the first two months of 2026, down 10.7% from 225 vessels in the same period last year. In February 2026 alone, the port handled 473,000 tons, down 17.2% from 571,000 in January 2026.

In parallel, the Port of Tripoli handled 265,000 tons of cargo in the first two months of 2026, representing a 26.8% decrease from 362,000 tons in the same period last year. Imported cargo fell to 209,000 tons (-27.4%), representing 78.9% of activity. Export cargo through Tripoli fell to 56,000 tons (-24.3%). A total of 94 vessels docked at Tripoli, down 26% year-on-year. The divergence in activities highlights the dynamic shifts in domestic shipping routes and import structures.`,
    author: {
      nameAr: 'شؤون المرافئ والشحن',
      nameEn: 'Maritime & Shipping Desk',
      titleAr: 'محلل حركة الشحن والتجارة',
      titleEn: 'Maritime Trade Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600',
    date: '18 يونيو 2026',
    readTimeAr: '4 دقائق',
    readTimeEn: '4 min read',
    views: 3120,
    tags: ['مرفأ بيروت', 'مرفأ طرابلس', 'الشحن', 'الاستيراد والتصدير', 'البضائع', 'لبنان']
  },
  {
    id: 'leb-treasury-bonds-maturities',
    category: 'lebanon',
    categories: ['lebanon', 'markets'],
    titleAr: 'مايقرب من 85% من سندات الخزينة لها آجال استحقاق سبع سنوات أو أكثر في نهاية أيار 2026',
    titleEn: 'Nearly 85% of LBP Treasury Bonds Have Maturities of Seven Years or More',
    summaryAr: 'أرقام جمعية المصارف تظهر تراجع القيمة الاسمية للسندات القائمة بالليرة إلى 42.192 مليار ليرة (حوالي 471.4 مليون دولار) وتركز الاستحقاقات طويلة الأجل.',
    summaryEn: 'Association of Banks figures reveal outstanding nominal value of LBP-denominated treasury debt at LBP 42,192 billion ($471.4M), with longer tenures dominating the sovereign profile.',
    excerptAr: 'جمعية المصارف تظهر هيمنة السندات طويلة الأجل على الدين العام المقوم بالليرة وتراجع القيمة الاسمية الإجمالية.',
    excerptEn: 'Sovereign debt metrics indicate a shift towards ultra-long maturities in Lebanese Liras as total outstanding nominal values decline.',
    contentAr: `تظهر الأرقام الصادرة عن جمعية مصارف لبنان أن القيمة الاسمية لسندات الخزينة القائمة المقومة بالليرة اللبنانية بلغت 42,192 مليار ليرة لبنانية في نهاية أيار 2026، مقارنة بـ 47,847 مليار ليرة لبنانية في نهاية 2025 و 60,237 مليار ليرة لبنانية في نهاية أيار 2025. كانت السندات تعادل 471.4 مليون دولار في نهاية أيار 2026 بناءً على سعر صرف 89,500 ليرة لبنانية للدولار الأمريكي، وفقاً لقرار المجلس المركزي لمصرف لبنان رقم 48/4/24 تاريخ 15 شباط 2024. وبلغ متوسط سعر الفائدة المرجح على سندات الخزينة اللبنانية 6.6% في أيار 2026 مقارنة بـ 6.54% في أيار 2025.

كما يُظهر توزيع سندات الخزينة القائمة أن سندات الخزينة لأجل 10 سنوات بلغ مجموعها 25,340 مليار ليرة لبنانية ومثلت 60% من إجمالي السندات المقومة بالليرة اللبنانية في نهاية أيار 2026، تليها سندات الخزينة لأجل سبع سنوات بقيمة 8,848 مليار ليرة لبنانية (21%)، وسندات الخزينة لأجل خمس سنوات بقيمة 3,487 مليار ليرة لبنانية (8.3%)، وسندات الخزينة لأجل ثلاث سنوات بقيمة 3,100 مليار ليرة لبنانية (7.3%)، وسندات الخزينة لأجل 15 سنة بقيمة 1,417 مليار ليرة لبنانية (3.4%). على هذا النحو، فإن 84.5% من سندات الخزينة القائمة لها آجال استحقاق سبع سنوات أو أكثر و 92.8% لها آجال استحقاق خمس سنوات أو أكثر.

بالتوازي، استحقت 1,698 مليار ليرة لبنانية من سندات الخزينة القائمة المقومة بالليرة اللبنانية في أيار 2026. ويُظهر توزيع السندات المستحقة أن 88.4% تألفت من سندات خزينة لأجل 10 سنوات، و 9.4% كانت من سندات خزينة لأجل خمس سنوات، و 2% تألفت من سندات خزينة لأجل سبع سنوات، و 0.1% تألفت من سندات خزينة لأجل ثلاث سنوات. ووفقاً لجمعية مصارف لبنان، ستستحق 10,955 مليار ليرة لبنانية من سندات الخزينة القائمة بالليرة اللبنانية في الفترة المتبقية من عام 2026.`,
    contentEn: `Figures released by the Association of Banks in Lebanon (ABL) show that the nominal value of outstanding Lebanese Lira-denominated Treasury bonds reached LBP 42,192 billion at the end of May 2026, compared to LBP 47,847 billion at the end of 2025 and LBP 60,237 billion at the end of May 2025. This was equivalent to $471.4 million at the end of May 2026 based on the official Central Council exchange rate of LBP 89,500 per US dollar. The weighted average interest rate on Lebanese Treasury bonds stood at 6.6% in May 2026 compared to 6.54% in May 2025.

The distribution of outstanding bonds shows that 10-year bonds totaled LBP 25,340 billion, representing 60% of the total, followed by 7-year bonds at LBP 8,848 billion (21%), 5-year bonds at LBP 3,487 billion (8.3%), 3-year bonds at LBP 3,100 billion (7.3%), and 15-year bonds at LBP 1,417 billion (3.4%). As such, 84.5% of the outstanding bonds have maturities of seven years or more, and 92.8% have maturities of five years or more.

In parallel, LBP 1,698 billion of outstanding Lira-denominated bonds matured in May 2026. According to the ABL, LBP 10,955 billion of outstanding Lira bonds will mature in the remainder of 2026, showing the persistent roll-over structure of local sovereign debt.`,
    author: {
      nameAr: 'الدائرة المالية والنقدية',
      nameEn: 'Sovereign Debt Desk',
      titleAr: 'محلل الأسواق المالية والائتمان',
      titleEn: 'Financial Markets & Credit Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600',
    date: '15 يونيو 2026',
    readTimeAr: '4 دقائق',
    readTimeEn: '4 min read',
    views: 2980,
    tags: ['سندات الخزينة', 'الدين العام', 'جمعية المصارف', 'الليرة اللبنانية', 'سعر الصرف', 'لبنان']
  },
  {
    id: 'leb-electricity-imf-diagnostic',
    category: 'lebanon',
    categories: ['lebanon', 'research-reports'],
    titleAr: 'قطاع الكهرباء في قلب الأزمة المالية والاقتصادية اللبنانية',
    titleEn: 'Electricity Sector at the Core of Lebanon\'s Financial and Economic Crisis',
    summaryAr: 'تشخيص الحوكمة لصندوق النقد الدولي يكشف مخاطر الفساد في الصفقات وغياب المساءلة مع توسع سوق المولدات ومقترحات لتبني الشفافية الشاملة.',
    summaryEn: 'IMF Governance Diagnostic places Electricite du Liban at the center of legacy deficits, highlighting opaque contracting, private generator cartels, and solar trends.',
    excerptAr: 'دراسة معمقة لصندوق النقد الدولي تشخص الهدر والفساد في قطاع الكهرباء والمولدات غير القانونية وتطالب بنشر العقود للعامة.',
    excerptEn: 'A sweeping IMF Governance Diagnostic details the deep-seated structural issues in Lebanon\'s power sector, calling for proactive transparency.',
    contentAr: `كجزء من تشخيصه للحوكمة والفساد في لبنان، اعتبر صندوق النقد الدولي (IMF) أن الافتقار إلى إمدادات كهرباء موثوقة ومستمرة يشكل مشكلة رئيسية في لبنان، وأن عملية التعاقد المبهمة، وضعف الرقابة على الأشخاص المعرضين سياسياً، وشبكات المحسوبية القوية، وغياب المساءلة أدت إلى تفاقم مخاطر الفساد في قطاع الكهرباء. وقال إن وجود المولدات الخاصة كان استجابة للفشل المستمر للسلطات على مدى عقود في إصلاح وتحديث قطاع الكهرباء، مما خلق فجوة بنسبة 37% بين الطلب على الكهرباء والعرض بدءاً من عام 2018 بسبب عدم كفاية توفير الطاقة. وأشار إلى أن مولدات الطاقة الخاصة غير القانونية تتبع نموذجاً قائماً على الاشتراك وتخلق اقتصاداً غير رسمي معقداً، يقع إلى حد كبير خارج لوائح الحكومة ورقابتها. وأضاف أن دراسة للبنك الدولي في عام 2020 تظهر أن مستوردي الوقود وتجار المولدات والوكلاء هم الأكثر استفادة من وجود مولدات الديزل وكسبوا ما مجموعه حوالي 2 مليار دولار من الإيرادات السنوية من قطاع الطاقة غير الرسمي.

بالإضافة إلى ذلك، أشار إلى أن قطاع الكهرباء لطالما كان في قلب التحديات المالية والاقتصادية في لبنان. وقال إن مؤسسة كهرباء لبنان (EdL) المملوكة للدولة، وهي شركة المرافق العامة التي تتمتع بحقوق حصرية لتوليد ونقل وتوزيع الكهرباء، تعمل باستمرار بعجز تم تمويله من خلال التحويلات المالية منذ عام 1993. وأشار إلى أن التعديلات على تعرفة الكهرباء وعلى سعر صرف الليرة اللبنانية مقابل الدولار الأمريكي في عامي 2022 و 2023 قلصت العجز التشغيلي لمؤسسة كهرباء لبنان، لكنه أشار إلى أن هذه الأخيرة لا تزال بعيدة عن الاكتفاء الذاتي وتستمر في الاعتماد على دعم الدولة لتمويل واردات الوقود. كما قدر أن الحكومة أنفقت حوالي 3.66 مليار دولار على مشاريع في قطاع الكهرباء بين عامي 1990 و 2019، وأن المانحين الدوليين ساهموا بـ 1.28 مليار دولار في تمويل مشاريع الكهرباء من خلال مجلس الإنماء والإعمار بين عامي 1992 و 2021.

كما أشار إلى أن القدرات التشغيلية وهياكل الحوكمة الضعيفة في لبنان سمحت للنخب السياسية والاقتصادية بالسيطرة على مؤسسة كهرباء لبنان، وزيادة تقويض أدائها. وقال إن السلطات أساءت إدارة الاستثمارات لعقود من الزمن والتي كانت تهدف إلى توسيع وتنويع قدرة توليد الطاقة، مما أدى إلى استمرار الاعتماد على زيت الوقود المستورد لإنتاج الكهرباء وحابى الكارتلات المرتبطة سياسياً. وأضاف أن هذا بدوره أبقى تعريفات الكهرباء دون مستويات استرداد التكاليف ؛ وسمح بانتشار المولدات الخاصة الصغيرة غير القانونية التي غالباً ما ترتبط بالأحزاب السياسية أو السلطات المحلية ؛ وأضعف قدرة مؤسسة كهرباء لبنان على تقليل الخسائر غير الفنية وتحسين معدلات الجباية. وأضاف أن السلطات اعتمدت أطراً معقدة ومبهمة لمقدمي خدمات التوزيع لكنها فشلت في تنفيذها ؛ ورفضت تنفيذ الإصلاحات القانونية الحالية التي تهدف إلى إنشاء هيئة تنظيمية للسوق، وإعادة هيكلة مؤسسة كهرباء لبنان، وتسهيل المشاركة المنظمة للقطاع الخاص ؛ واستحوذت على إدارة وهياكل المشتريات في مؤسسة كهرباء لبنان؛ ومنعت عمليات التدقيق الخارجي ؛ وتسامحت مع أعداد كبيرة من العمال المؤقتين مع تجميد توظيف الموظفين الدائمين.

بالتوازي، أشار إلى أن العديد من المواطنين اللبنانيين قاموا بشراء وتركيب أنظمة طاقة شمسية كحل بديل لضعف وصولهم إلى الكهرباء من مؤسسة كهرباء لبنان. وقال إن سوق الأنظمة الشمسية المنزلية نما من غياب القدرة المتجددة المركبة في عام 2010 إلى 100 ميجاوات (MW) بحلول عام 2019، في حين تضاعف إجمالي القدرة المركبة إلى 200 ميجاوات في عام 2021 وإلى ما يقدر بـ 1,300 ميجاوات بحلول نهاية عام 2023. وأشار إلى أن 17 مجتمعاً على الأقل في جميع أنحاء لبنان تبنت شبكات صغيرة هجينة تجمع بين الألواح الشمسية ومولدات الديزل للتعويض عن ضعف الشبكة المركزية. وقال إن هذه المجتمعات تحاول دمج الطاقة الشمسية في شبكات مولدات الأحياء الموجودة مسبقاً، من أجل تقليل الاعتماد على الديزل وتزويد المستهلكين بطاقة أرخص وأكثر موثوقية. لكنه اعتبر أن اللجوء إلى الطاقة المتجددة يظل بعيد المنال بالنسبة للعديد من المواطنين اللبنانيين.

علاوة على ذلك، حث صندوق النقد الدولي مجلس الوزراء على اعتماد سياسة شفافية استباقية شاملة لقطاع الكهرباء. وقال إن السياسة يجب أن تلزم السلطات بنشر النص الكامل لجميع العقود والامتيازات الحالية والمستقبلية التي تأذن لكيانات القطاع الخاص بتوليد الكهرباء لمؤسسة كهرباء لبنان ؛ بالإضافة إلى العقود والاتفاقيات مع مقدمي خدمات التوزيع جنباً إلى جنب مع صيغ ومبالغ الدفع ؛ وعقود شراء الوقود المطروحة للمناقصة من قبل المديرية العامة للنفط أو أي وكالة أو هيئة حكومية أخرى منذ عام 2015 ؛ وتراخيص استيراد الوقود النشطة؛ والتقارير نصف السنوية عن التدفقات المالية بين الحكومة ومؤسسة كهرباء لبنان.

علاوة على ذلك، أشار إلى أن محدودية الوصول إلى الكهرباء كان لها تأثير شديد على الأسر الأكثر ضعفاً في البلاد. وقال إن دراسة استقصائية أجرتها منظمة هيومن رايتس ووتش وجدت أن الأسر أنفقت 44% من دخلها الشهري على فواتير المولدات في عام 2023، وأن الأسر في الخمس الأدنى التي حصلت على مولد أنفقت في المتوسط 88% من دخلها الشهري على فواتير المولدات مقارنة بـ 21% للأسر في الخمس الأعلى. قال صندوق النقد الدولي إنه أجرى تشخيص الحوكمة والفساد من تشرين الأول 2022 إلى نيسان 2023 بناءً على طلب حكومة رئيس الوزراء نجيب ميقاتي في ذلك الوقت. وأضاف أنه شارك مسودة التقرير مع السلطات في آذار 2025 لمراجعتها وإبداء الرأي فيها، وقدم المسودة إلى رئيس الوزراء وأعضاء مجلس الوزراء في 30 نيسان 2025. وأشار إلى أنه أدرج في التقرير المزيد من التحديثات بناءً على سلسلة الاجتماعات التي عقدت في أيار 2025 وعلى المدخلات المكتوبة من السلطات.`,
    contentEn: `As part of its diagnosis of governance and corruption in Lebanon, the International Monetary Fund (IMF) considered that the lack of a reliable and continuous electricity supply is a major problem in Lebanon, and that opaque contracting processes, weak oversight of politically exposed persons (PEPs), strong patronage networks, and the absence of accountability have exacerbated corruption risks in the electricity sector. It said that the existence of private generators was a response to the continuous failure of the authorities over decades to reform and modernize the electricity sector, creating a 37% gap between electricity demand and supply starting in 2018 due to inadequate power supply. It noted that illegal private power generators follow a subscription-based model and create a complex informal economy, largely outside government regulations and control. It added that a World Bank study in 2020 shows that fuel importers, generator dealers, and agents are the main beneficiaries of diesel generators and earned a total of about $2 billion in annual revenues from the informal power sector.

In addition, it indicated that the electricity sector has long been at the heart of Lebanon's fiscal and economic challenges. State-owned Electricité du Liban (EdL) has consistently run a deficit funded by fiscal transfers since 1993. The IMF urged the cabinet to adopt a comprehensive proactive transparency policy, including publishing the text of all power-generation contracts and fuel purchases. It also noted the severe impact on vulnerable households, with some spending up to 88% of their income on generator bills.`,
    author: {
      nameAr: 'مراسل صندوق النقد وشؤون الحوكمة',
      nameEn: 'IMF & Governance Desk',
      titleAr: 'أخصائي السياسات الاقتصادية والفساد',
      titleEn: 'Governance & Economic Policy Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600',
    date: '12 يونيو 2026',
    readTimeAr: '8 دقائق',
    readTimeEn: '8 min read',
    views: 5210,
    tags: ['كهرباء لبنان', 'صندوق النقد الدولي', 'المولدات الخاصة', 'الحوكمة', 'الفساد', 'لبنان']
  },
  {
    id: 'leb-qs-university-rankings-2027',
    category: 'lebanon',
    categories: ['lebanon', 'research-reports'],
    titleAr: 'تسع جاموات لبنانية من بين أفضل 109 جامعات في العالم العربي وفق تصنيف QS لعام 2027',
    titleEn: 'Nine Lebanese Universities Ranked Among the Top 109 in the Arab World',
    summaryAr: 'الجامعة الأميركية في بيروت (AUB) تحل ثامنة إقليمياً، تليها اللبنانية الأميركية (LAU) واليسوعية (USJ)، في تقدم ملموس للمؤشرات الأكاديمية.',
    summaryEn: 'Nine Lebanese universities feature in the latest QS World University Rankings, with AUB leading nationally and ranking 8th in the Arab region.',
    excerptAr: 'الجامعات اللبنانية تحقق تقدماً لافتاً في تصنيف QS الإقليمي لعام 2027، وتتصدر الجامعة الأميركية في بيروت القائمة المحلية.',
    excerptEn: 'Lebanon\'s higher education institutions demonstrate academic resilience, securing prominent spots in the 2027 QS Arab region lists.',
    contentAr: `تضمنت تصنيفات QS للجامعات لعام 2027 تسع جامعات لبنانية من بين 1504 جامعة على مستوى العالم ومن بين 109 جامعات مصنفة في المنطقة العربية. كانت الجامعة الأميركية في بيروت (AUB) المؤسسة الأعلى تصنيفاً في لبنان وثامن أعلى تصنيف في العالم العربي، وجاءت في المركز 223 عالمياً. كما صنّف المسح الجامعة اللبنانية الأميركية (LAU) في المركز 477، وجامعة القديس يوسف في بيروت (USJ) في المركز 537، والجامعة اللبنانية (LU) في المركز 626، وجامعة بيروت العربية (BAU) في المركز 670، وجامعة الروح القدس - الكسليك (USEK) في نطاق 761-770. وجامعة البلمند (UOB) في نطاق 1001-1200، وكذلك الجامعة الإسلامية في لبنان (IUL) وجامعة سيدة اللويزة (NDU) في نطاق 1201-1400 لكل منهما.

وعلاوة على ذلك، منحت QS الجامعة الأميركية في بيروت درجة إجمالية بلغت 53.7 نقطة من أصل 100 نقطة كحد أقصى، تليها الجامعة اللبنانية الأميركية بـ 33.4 نقطة، وجامعة القديس يوسف بـ 30.6 نقطة، والجامعة اللبنانية بـ 27.7 نقطة، وجامعة بيروت العربية بـ 26.3 نقطة ؛ بينما لم تقدم درجات لجامعة الروح القدس وجامعة البلمند والجامعة الإسلامية وجامعة سيدة اللويزة. تحسن تصنيف جامعة القديس يوسف بمقدار 81 مركزاً عن عام 2026، وزاد تصنيف الجامعة اللبنانية الأميركية بمقدار 58 درجة، وتحسن تصنيف الجامعة الأميركية بمقدار 14 مركزاً، وزاد تصنيف جامعة بيروت العربية بمقدار 6 درجات على أساس سنوي ؛ في حين تقدم تصنيف جامعة الروح القدس من نطاق 771-780. في مقابل ذلك، تدهور تصنيف الجامعة اللبنانية بمقدار 111 مركزاً في 2026، وتراجعت تصنيفات الجامعة الإسلامية وجامعة سيدة اللويزة من نطاق 1001-1200، ولم يتغير تصنيف جامعة البلمند على أساس سنوي.

استحوذت كل من الإمارات العربية المتحدة والمملكة العربية السعودية على ست من أفضل 21 جامعة في العالم العربي من بين أفضل 500 جامعة في العالم، تليها قطر ولبنان والأردن ومصر بمؤسستين للتعليم العالي لكل منها، وعمان بجامعة واحدة من بين أفضل 500 جامعة. تعتمد التصنيفات على متوسط مرجح لـ 10 عوامل هي السمعة الأكاديمية بوزن 30%، يليها الاستشهادات لكل هيئة تدريس (20%)، وسمعة صاحب العمل (15%)، ونسبة أعضاء هيئة التدريس إلى الطلاب (10%)، بالإضافة إلى أداء الاستدامة، ونتائج التوظيف، وشبكة البحث الدولية، ونسبة أعضاء هيئة التدريس الدوليين إلى إجمالي عدد أعضاء هيئة التدريس، ونسبة الطلاب الدوليين إلى العدد الإجمالي للطلاب (5% لكل منها)، وتنوع الطلاب الدوليين. يتم تجميع تصنيفات QS للجامعات بواسطة شركة Quacquarelli Symonds Limited، وهي شركة متخصصة في التعليم والدراسة في الخارج.

بالتوازي، احتلت الجامعة الأميركية في بيروت المرتبة الأولى بين الجامعات اللبنانية في عوامل الاستشهادات لكل هيئة تدريس، والسمعة الأكاديمية، وسمعة صاحب العمل، ونتائج التوظيف، والاستدامة. وعلاوة على ذلك، جاءت الجامعة الأميركية في المركز 12 بين الجامعات العربية وفي المركز 412 عالمياً في مؤشر الاستشهادات لكل هيئة تدريس، وفي المركز الثامن إقليمياً والمركز 282 عالمياً في عامل السمعة الأكاديمية. كما جاءت في المركز الرابع بين الجامعات العربية وفي المركز 172 عالمياً في مؤشر سمعة صاحب العمل، وفي المركز الثاني إقليمياً والمركز 18 عالمياً في عامل نتائج التوظيف، فضلاً عن المركز الأول بين الجامعات العربية والمركز 176 عالمياً في عامل الاستسدامة. علاوة على ذلك، جاءت الجامعة اللبنانية الأميركية في المركز الأول في لبنان، وفي المركز الثامن بين الجامعات العربية، وفي المركز 226 عالمياً من حيث شبكة أبحاثها الدولية، والتي تقيس مستوى التعاون مع المؤسسات والباحثين حول العالم. كما كانت الجامعة اللبنانية الأميركية ثاني أعلى جامعة تصنيفاً في لبنان في عوامل الاستشهادات لكل هيئة تدريس، وسمعة صاحب العمل، والاستسدامة ؛ وثالث أعلى جامعة في السمعة الأكاديمية؛ ورابع أعلى جامعة من حيث نتائج التوظيف. وعلاوة على ذلك، جاءت الجامعة اللبنانية الأميركية في المركز 25 بين الجامعات العربية في مؤشر الاستشهادات لكل هيئة تدريس، وفي المركز 28 إقليمياً في عامل السمعة الأكاديمية ؛ وفي المركز 12 في مؤشر سمعة صاحب العمل، وفي المركز 31 في العالم العربي في عامل نتائج التوظيف، وكذلك في المركز الخامس في عامل الاستسدامة. بالإضافة إلى ذلك، احتلت جامعة الروح القدس المرتبة الأولى في لبنان في مؤشر نسبة أعضاء هيئة التدريس إلى الطلاب ونسبة أعضاء هيئة التدريس الدوليين إلى إجمالي عدد أعضاء هيئة التدريس. وجاءت في المركز التاسع بين الجامعات العربية والمركز 240 عالمياً في مؤشر نسبة أعضاء هيئة التدريس إلى الطلاب، وكذلك في المركز 40 إقليمياً والمركز 136 عالمياً في نسبة أعضاء هيئة التدريس الدوليين إلى إجمالي عدد أعضاء هيئة التدريس. علاوة على ذلك، جاءت الجامعة الإسلامية في لبنان في المركز الأول في لبنان في نسبة الطلاب الدوليين إلى إجمالي عدد الطلاب. واحتلت المرتبة 13 بين الجامعات العربية والمرتبة 83 عالمياً في نسبة الطلاب الدوليين إلى إجمالي عدد الطلاب.`,
    contentEn: `The 2027 QS World University Rankings included nine Lebanese universities out of 1,504 universities globally and 109 classified in the Arab region. The American University of Beirut (AUB) was the highest-ranked institution in Lebanon and eighth in the Arab world, ranking 223rd globally. The survey also ranked the Lebanese American University (LAU) at 477th, Saint Joseph University of Beirut (USJ) at 537th, the Lebanese University (LU) at 626th, Beirut Arab University (BAU) at 670th, and the Holy Spirit University of Kaslik (USEK) in the 761-770 range.

AUB scored an overall 53.7 points out of 100, followed by LAU (33.4) and USJ (30.6). Academic resilience was widely demonstrated by higher citations, robust employer reputations, and deep international research collaboration across these top-tier institutions.`,
    author: {
      nameAr: 'القسم الأكاديمي والتعليمي',
      nameEn: 'Academic & Education Desk',
      titleAr: 'محلل شؤون التعليم العالي والبحث العلمي',
      titleEn: 'Higher Education Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
    date: '10 يونيو 2026',
    readTimeAr: '5 دقائق',
    readTimeEn: '5 min read',
    views: 3120,
    tags: ['تصنيف QS', 'الجامعة الأميركية', 'الجامعة اللبنانية الأميركية', 'جامعة القديس يوسف', 'التعليم العالي', 'لبنان']
  },
  {
    id: 'leb-environmental-taxes-waste',
    category: 'lebanon',
    categories: ['lebanon', 'research-reports'],
    titleAr: 'وزارة البيئة تعدّل الضرائب البيئية على المنتجات المولدة للنفايات',
    titleEn: 'Ministry of Environment Overhauls Ecological Taxes on Waste-Generating Goods',
    summaryAr: 'المرسوم رقم 3314 يدخل حيز التنفيذ بتوقيع رئاسي ويفرض ضرائب متدرجة من 1% إلى 3% بناءً على نسبة النفايات وسمية المنتجات.',
    summaryEn: 'Decree 3314 enacts progressive environmental duties scaled from 1% to 3% relative to waste volumes and toxicity to fund national solid waste treatment.',
    excerptAr: 'وزير البيئة يوقع مرسوماً لتعديل الرسوم البيئية استناداً إلى قانون حماية البيئة ومبدأ مسؤولية المنتج الملوث.',
    excerptEn: 'Lebanon implements progressive green taxes on manufacturing and raw materials, adhering to the polluter-pays principle.',
    contentAr: `أصدرت وزارة البيئة المرسوم رقم 3314 تاريخ 15 حزيران 2026 بشأن تعديل الضرائب البيئية على المنتجات المولدة للنفايات. دخل المرسوم حيز التنفيذ فور صدوره، بعد توقيعه من قبل الرئيس جوزيف عون في 15 حزيران 2026. تعدل المادة 1 معدلات الضرائب المطبقة على منتجات معينة، بناءً على كمية أو نوعية النفايات المنتجة أثناء تصنيعها أو استخدامها.

يفرض المرسوم ضريبة بيئية بنسبة 1% على السلع الأساسية والمواد الأولية، بما في ذلك الحيوانات الحية واللحوم ومنتجات الألبان والحبوب والمنتجات الصيدلانية والمعادن الأساسية مثل الألومنيوم والحديد والنيكل والصلب. كما يفرض ضريبة بيئية بنسبة 1.5% على السلع الاستهلاكية الوسيطة وسلع المعالجة، مثل المشروبات والمشروبات الروحية والخل والورق والورق المقوى والزجاج والآلات الكهربائية. علاوة على ذلك، يفرض ضريبة بيئية بنسبة 2% على المواد الصناعية الثقيلة والملوثات البيئية المحتملة، بما في ذلك الأسمنت والوقود المعدني والزيوت المعدنية والمواد الكيميائية العضوية والمواد البلاستيكية المتنوعة والسجاد. علاوة على ذلك، يفرض ضريبة بيئية بنسبة 2.5% على السلع الكيميائية والصناعية ذات التأثير العالي، بما في ذلك الدهون الحيوانية أو النباتية، والمواد الكيميائية غير العضوية، والمطاط، والجلود الخام، والجلود، ومصنوعات الجلود، ولوازم السفر، ومصنوعات الحجر أو الأسمنت. وأخيراً، يفرض ضريبة بيئية بنسبة 3% على المواد الخطرة أو شديدة السمية أو الخاضعة لتنظيم شديد، وتحديداً مستخلصات الدباغة أو الصباغة، والمتفجرات، ومنتجات الألعاب النارية، وأعواد الثقاب، والأسلحة والذخائر.

استندت الوزارة في قرارها إلى قانون حماية البيئة رقم 444 تاريخ 29 تموز 2002، والذي رسخ مبدأ "الملوث يدفع" ؛ وإلى القانون رقم 38 تاريخ 5 كانون الثاني 2026 الذي عدل إطار الإدارة المتكاملة للنفايات الصلبة، والذي ينص على فرض ضرائب على منتجات معينة نسبة إلى كمية أو نوعية النفايات المتولدة أثناء تصنيعها أو الناتجة عن استخدامها, تطبيقاً لمبدأ مسؤولية المنتج ووفقاً للجدول المرفق بالقانون الذي يحدد معدلات الضريبة كنسبة مئوية من قيمة المنتج ؛ وإلى التعديل التشريعي للقانون رقم 80 تاريخ 10 تشرين الأول 2018 حول الإطار القانوني للإدارة المتكاملة للنفايات الصلبة الذي أقره مجلس النواب والذي أعاد التأكيد على أن إدارة النفايات تظل مسؤولية الدولة، الأمر الذي يفرض نفقات إضافية على الخزينة يجب تمويلها.`,
    contentEn: `The Ministry of Environment issued Decree No. 3314 regarding the modification of environmental taxes on waste-generating products. The decree entered into force immediately upon its signing on June 15, 2026. Article 1 modifies tax rates applied to certain products, based on the quantity or quality of waste produced during manufacturing or use.

The decree imposes a 1% environmental tax on basic commodities, 1.5% on intermediate consumer goods, 2% on heavy industrial materials and potential pollutants, 2.5% on high-impact chemicals, and 3% on highly toxic or regulated substances like explosives and matches. The reform utilizes the "polluter pays" principle under Environmental Protection Law No. 444 to establish fiscal sustainability for national waste processing.`,
    author: {
      nameAr: 'شؤون البيئة والاستدامة',
      nameEn: 'Environmental & Green Policy Desk',
      titleAr: 'محلل السياسات البيئية والتنمية',
      titleEn: 'Environmental Policy Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600',
    date: '15 يونيو 2026',
    readTimeAr: '5 دقائق',
    readTimeEn: '5 min read',
    views: 2890,
    tags: ['الضرائب البيئية', 'وزارة البيئة', 'الملوث يدفع', 'النفايات الصلبة', 'القانون 444', 'لبنان']
  },
  {
    id: 'leb-imf-economic-forecast-2026',
    category: 'lebanon',
    categories: ['lebanon', 'markets'],
    titleAr: 'صندوق النقد الدولي يتوقع انكماش الاقتصاد اللبناني في 2026 جراء النزاع المستمر',
    titleEn: 'IMF Forecasts Economic Contraction in 2026 Amid Escalating Geopolitical Conflict',
    summaryAr: 'صندوق النقد يشير إلى تداعيات الصراع العسكري على السياحة والزراعة، ويستمر في محادثات الإصلاح الهيكلي للمصارف رغم تعافي النمو بنسبة 4% في عام 2025.',
    summaryEn: 'IMF warns that renewed hostility since March will induce real GDP contraction in 2026, following a 4% growth rebound recorded in 2025.',
    excerptAr: 'تداعيات النزاع العسكري تضغط على الاقتصاد اللبناني في عام 2026 وتوقعات بانكماش ملحوظ بعد تعافٍ مؤقت في العام الماضي.',
    excerptEn: 'Renewed military operations strain tourism and agriculture, leading the IMF to project a recession in 2026 despite previous macro improvements.',
    contentAr: `أشار صندوق النقد الدولي (IMF) إلى أن لبنان يواجه ظروفاً اقتصادية واجتماعية وإنسانية صعبة للغاية بسبب استئناف الحرب بين إسرائيل وحزب الله في آذار من هذا العام. وقال إن الحرب أسفرت عن أضرار لحقت بالإسكان والبنية التحتية والنشاط الاقتصادي، فضلاً عن خسائر بشرية كبيرة. وقدر أن النشاط الاقتصادي سينكمش في عام 2026، نظراً لتأثير الحرب على القطاعات الرئيسية للاقتصاد اللبناني مثل السياحة والزراعة، وكذلك بسبب تأثيرها على الثقة وحالة عدم اليقين السائدة. لكنه أشار إلى أن التأثير الكامل للصراع لن يُعرف إلا بمرور الوقت، وسيعتمد على مدة الحرب وشدتها.

بالتوازي، أشار صندوق النقد الدولي إلى أنه يواصل انخراطه الوثيق مع السلطات اللبنانية من خلال مسارين. وقال إن المسار الأول يتمثل في مساعدة الحكومة على تحديد تدابير السياسة الاقتصادية التي يمكنها معالجة الأزمة المباشرة وكيفية تنفيذ هذه التدابير للتخفيف من تأثير الصراع على الاقتصاد. وأشار إلى أن لبنان عزز وضعه المالي واحتياطياته الدولية قبل الصراع، مما يوفر بعض المجال لتقديم دعم في السياسات لتلبية الاحتياجات الإنسانية الأكثر إلحاحاً في البلاد. وأضاف أن المسار الثاني يتألف من مناقشاته مع السلطات اللبنانية حول خطة إصلاحات أكثر شمولاً يمكن أن يدعمها في نهاية المطاف برنامج لصندوق النقد الدولي. وأشار إلى أن هذه المداولات ركزت بشكل أساسي على استراتيجية السلطات لإعادة هيكلة القطاع المصرفي وعلى إطارها المالي متوسط الأجل.

قدر صندوق النقد الدولي أن الناتج المحلي الإجمالي الحقيقي للبنان نما بنسبة 4% في عام 2025 مقارنة بانكماش بنسبة 7.5% في 2024 و 0.7% في 2023، وأن الناتج المحلي الإجمالي الاسمي للبلاد بلغ 34.5 مليار دولار في 2025 مقارنة بـ 29.3 مليار دولار في 2024 و 24.5 مليار دولار في 2023. على هذا النحو، قال إن نصيب الفرد من الناتج المحلي الإجمالي في لبنان بلغ 6,443.2 دولاراً في 2025 مقارنة بـ 5,480 دولاراً في 2024 و 4,574.4 دولاراً في 2023. وعلاوة على ذلك، قال إن متوسط معدل التضخم في البلاد كان 14.6% في عام 2025، مقارنة بمتوسط معدلات التضخم البالغة 12.9% في منطقة الشرق الأوسط وشمال أفريقيا العام الماضي. بالتوازي، أشار إلى أن الفائض المالي ارتفع من 0.4% من الناتج المحلي الإجمالي في 2024 إلى 3.25% من الناتج المحلي الإجمالي في 2025، مقارنة بعجز قدره 1.6% من الناتج المحلي الإجمالي في 2023، وأن مستوى الدين العام تراجع من 185.8% من الناتج المحلي الإجمالي في نهاية 2023 إلى 157.9% من الناتج المحلي الإجمالي في نهاية 2024 و 139.4% من الناتج المحلي الإجمالي في نهاية 2025. بالإضافة إلى ذلك، قدر أن صادرات السلع والخدمات من لبنان انخفضت بنسبة 2.1% في 2025 وأن واردات السلع والخدمات إلى البلاد زادت بنسبة 7.5% العام الماضي، مقارنة بانخفاض قدره 25% للصادرات و 10.3% للواردات في 2024.`,
    contentEn: `The International Monetary Fund (IMF) indicated that Lebanon faces extremely difficult economic, social, and humanitarian conditions due to the resumption of the war in March of this year. It estimated that economic activity will contract in 2026, given the impact on key sectors such as tourism and agriculture, as well as its impact on confidence and uncertainty.

The IMF estimated that Lebanon's real GDP grew by 4% in 2025 compared to a contraction of 7.5% in 2024 and 0.7% in 2023, while nominal GDP stood at $34.5 billion in 2025. Per capita GDP stood at $6,443.2 in 2025. Average inflation was 14.6% in 2025. Public debt declined from 185.8% of GDP in 2023 to 139.4% in 2025. Discussions with authorities focus on banking sector restructuring and a medium-term fiscal framework.`,
    author: {
      nameAr: 'الدائرة الاقتصادية لصندوق النقد',
      nameEn: 'IMF & Macroeconomic Desk',
      titleAr: 'مراسل شؤون التنمية الاقتصادية',
      titleEn: 'Macroeconomic Policy Correspondent'
    },
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600',
    date: '05 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 4890,
    tags: ['صندوق النقد الدولي', 'انكماش الاقتصاد', 'الناتج المحلي', 'النمو الاقتصادي', 'التضخم', 'لبنان']
  },
  {
    id: 'leb-south-building-damage-undp',
    category: 'lebanon',
    categories: ['lebanon', 'research-reports'],
    titleAr: 'الأضرار في المباني في جنوب لبنان بلغت 1.38 مليار دولار وفق تقييم سريع للأمم المتحدة',
    titleEn: 'Direct Building Damage in South Lebanon Valued at $1.38 Billion',
    summaryAr: 'تقييم سريع لبرنامج الأمم المتحدة الإنمائي يوثق دمار أكثر من 11,000 مبنى بالكامل في محافظتي الجنوب والنبطية بمساهمة تقنيات الذكاء الاصطناعي الجيومكاني.',
    summaryEn: 'Rapid UNDP geospatial assessment reveals extensive physical destruction across Nabatieh and South Governorates, tracking 3.1 million cubic meters of debris.',
    excerptAr: 'برنامج الأمم المتحدة الإنمائي يصدر تقريراً يوثق حجم الدمار في الوحدات السكنية والأنقاض بالمحافظات الجنوبية.',
    excerptEn: 'UNDP rapid structural monitoring maps heavy losses in Bint Jbeil, Marjayoun, and Tyre, calling for systemic recovery planning.',
    contentAr: `أعلن برنامج الأمم المتحدة الإنمائي (UNDP)، بالتنسيق مع المجلس الوطني اللبناني للبحوث العلمية (CNRS-L) وبالتعاون مع القوات المسلحة اللبنانية (LAF) وإدارة شؤون السلامة والأمن التابعة للأمم المتحدة (UNDSS)، عن نتائج تقييم سريع للمباني المتضررة من الحرب الإسرائيلية في جنوب لبنان. وقال إن التقييم يهدف إلى توفير تقديرات أولية لحجم الأضرار ودعم جهود التخطيط للتعافي وإعادة الإعمار في المناطق المتضررة. وأشار إلى أن التقييم اعتمد على تقنيات الذكاء الاصطناعي الجيومكاني (GeoAI)، وتحليل صور الأقمار الصناعية، وعمليات التحقق الميداني لضمان دقة وموثوقية البيانات.

وقدر الأضرار المباشرة، باستثناء الأضرار الطفيفة، للمباني في محافظتي الجنوب والنبطية بـ 1.38 مليار دولار، حيث بلغت الأضرار في قضاء بنت جبيل 668.1 مليون دولار، أو 49.7% من الإجمالي، يليه قضاء مرجعيون بأضرار بلغت 333 مليون دولار (24.1%)، وقضاء صور بـ 315 مليون دولار (22.8%)، وقضاء النبطية بـ 32.2 مليون دولار (2.3%)، وقضاء صيدا بـ 16.1 مليون دولار (1.2%).

كما قدر أن 11,095 مبنى يتكون من 17,891 وحدة سكنية قد دُمرت بالكامل ؛ وتعرض 2,242 مبنى، بما في ذلك 5,219 وحدة سكنية، لأضرار جزئية؛ وأن 9,311 مبنى يتكون من 18,282 وحدة سكنية تعرضت لأضرار طفيفة في محافظتي الجنوب والنبطية اعتباراً من 29 نيسان 2026. وقال إن الضربات الإسرائيلية دمرت 14,357 وحدة في 8,989 مبنى، بينما ألحقت أضراراً جزئية بـ 1,190 مبنى يحتوي على 2,476 وحدة، وتسببت بأضرار طفيفة لـ 8,384 وحدة في 5,247 مبنى في محافظة النبطية. كما دمرت الضربات 2,106 مبان تتكون من 3,534 وحدة، وألحقت أضراراً جزئية بـ 1,052 مبنى تتكون من 2,743 وحدة، وتسببت في أضرار طفيفة لـ 9,898 وحدة في 4,064 مبنى في محافظة الجنوب. علاوة على ذلك، أشار إلى أن العقارات الأكثر تضرراً في قضاء بنت جبيل تشمل عيترون بـ 1,658 مبنى مدمراً، وبلدة بنت جبيل بـ 1,076 مبنى ؛ في حين أن العقارات الأكثر تضرراً في قضاء مرجعيون تشمل ميس الجبل بـ 969 مبنى متضرراً وطيبة مرجعيون بـ 824 مبنى مدمراً ؛ والعقارات الأكثر تضرراً في قضاء النبطية تشمل يحمر الشقيف بـ 71 مبنى متضرراً وزوطر الشرقية بـ 69 مبنى. كما قال إن المناطق التي عانت من أكبر قدر من الأضرار في قضاء صور تشمل برج الشمالي بـ 370 مبنى مدمراً وبرج الناقورة بـ 216 مبنى مدمراً ؛ بينما تشمل العقارات الأكثر تضرراً في قضاء صيدا زرارية بـ 65 مبنى متضرراً وأرزي بـ 62 مبنى متضرراً.

وعلاوة على ذلك، قدر برنامج الأمم المتحدة الإنمائي أن الأضرار أنتجت ما يقرب من 3.1 مليون متر مكعب (m3) من الأنقاض في محافظتي الجنوب والنبطية، حيث يمثل قضاء بنت جبيل 1.51 مليون متر مكعب، أو 48.7% من الإجمالي، يليه قضاء مرجعيون بـ 787,940 متراً مكعباً (25.4%)، وقضاء صور بـ 689,603 متراً مكعباً (22.2%)، وقضاء النبطية بـ 77,538 متراً مكعباً (2.5%)، وقضاء صيدا بـ 39,263 متراً مكعباً (1.3%). كما أشار إلى أن هذه النتائج توفر قاعدة أدلة أولية لدعم السلطات الوطنية والشركاء في تحديد الأولويات وتوجيه جهود التعافي وإعادة الإعمار بشكل أكثر فعالية وبطريقة مستدامة.

بالتوازي، قدر برنامج الأمم المتحدة الإنمائي في وقت سابق الأضرار المباشرة التي لحقت بالمباني في بيروت وجبل لبنان بـ 365 مليون دولار مع أضرار في جبل لبنان بلغت 349.7 مليون دولار، أو 95.8% من الإجمالي، وأضرار في بيروت بلغت 15.4 مليون دولار، وتمثل الرصيد البالغ 4.2%. كما قدر أن 146 مبنى، يتكون من 3,168 وحدة سكنية، قد دُمرت بالكامل ؛ وتعرض 264 مبنى، بما في ذلك 4,437 وحدة سكنية، لأضرار جزئية؛ واستهدفت الضربات الإسرائيلية 54 شقة بشكل مباشر. بالإضافة إلى ذلك، قدر أن الأضرار أنتجت ما يقرب من 648,942 متراً مكعباً (m3) من الأنقاض، حيث يمثل قضاء بعبدا 601,384 متراً مكعباً، أو 92.7% من الإجمالي، تليه بيروت بـ 27,337 متراً مكعباً (4.2%)، وقضاء عاليه بـ 20,221 متراً مكعباً (3.1%).`,
    contentEn: `The United Nations Development Programme (UNDP), in coordination with the Lebanese National Council for Scientific Research (CNRS-L) and in cooperation with the Lebanese Armed Forces (LAF) and the United Nations Department of Safety and Security (UNDSS), announced the results of a rapid assessment of buildings damaged by the war in South Lebanon. It aims to support recovery planning in affected areas, relying on Geospatial AI (GeoAI), satellite imagery analysis, and field validation.

The assessment estimated direct damages, excluding minor damage, to buildings in South and Nabatieh governorates at $1.38 billion. Bint Jbeil district suffered $668.1 million (49.7% of total), followed by Marjayoun ($333 million, 24.1%), Tyre ($315 million, 22.8%), Nabatieh ($32.2 million, 2.3%), and Saida ($16.1 million, 1.2%).

It estimated that 11,095 buildings consisting of 17,891 housing units were completely destroyed; 2,242 buildings (5,219 housing units) suffered partial damage; and 9,311 buildings (18,282 housing units) suffered minor damage as of April 29, 2026. The damages produced approximately 3.1 million cubic meters of rubble. This structural inventory provides crucial baseline figures for international post-war recovery efforts.`,
    author: {
      nameAr: 'الدائرة الحضرية وتقييم الكوارث',
      nameEn: 'Urban Assessment & Post-Disaster Desk',
      titleAr: 'أخصائي التقييم الجغرافي والتعافي',
      titleEn: 'Geospatial Assessment & Recovery Specialist'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600',
    date: '01 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 8120,
    tags: ['برنامج الأمم المتحدة الإنمائي', 'أضرار الحرب', 'جنوب لبنان', 'الأنقاض والركام', 'النبطية', 'لبنان']
  },
  
  {
    id: 'leb-industrial-exports-2025',
    category: 'instats',
    categories: ['instats', 'lebanon', 'markets'],
    titleAr: 'الصادرات الصناعية ترتفع بنسبة 15.3% إلى 2.9 مليار دولار في 2025',
    titleEn: 'Lebanese Industrial Exports Surge by 15.3% to $2.9 Billion in 2025',
    summaryAr: 'تظهر أرقام وزارة الصناعة اللبنانية أن الصادرات الصناعية بلغت 2.9 مليار دولار في 2025، مما يشكل زيادة قدرها 386 مليون دولار (+15.3%) مقارنة بعام 2024. وتصدرت صادرات المعادن الأساسية القائمة بقيمة 600.7 مليون دولار تمثل 20.7% من الإجمالي.',
    summaryEn: 'Ministry of Industry figures reveal that Lebanese industrial exports reached $2.9 billion in 2025, recording a 15.3% ($386M) expansion from 2024. Base metals topped the list at $600.7 million, accounting for 20.7% of total exports.',
    excerptAr: 'الصادرات الصناعية تسجل قفزة ملحوظة بزيادة 386 مليون دولار لتصل إلى 2.9 مليار دولار مدفوعة بنمو صادرات المعادن الأساسية والمنتجات الكيماوية.',
    excerptEn: 'Lebanese industrial shipments grew 15.3% in 2025 to $2.9bn, led by robust gains in base metals and chemicals, despite macroeconomic hurdles.',
    contentAr: `تظهر الأرقام الصادرة عن وزارة الصناعة أن الصادرات الصناعية بلغت 2.9 مليار دولار في 2025، مما يشكل زيادة قدرها 386 مليون دولار، أو 15.3%، من 2.5 مليار دولار في 2024. وبالمقارنة، بلغت الصادرات الصناعية 2.5 مليار دولار في 2019، و 2.2 مليار دولار في 2020، و 2.55 مليار دولار في 2023. بلغت صادرات المعادن الأساسية 600.7 مليون دولار في 2025 ومثلت 20.7% من إجمالي الصادرات الصناعية في العام الماضي. وتلتها صادرات الآلات والأجهزة الإلكترونية بـ 560.1 مليون دولار (19.3%)، والمنتجات الكيماوية بـ 509.4 مليون دولار (17.6%)، والمواد الغذائية المحضرة والتبغ بـ 455.2 مليون دولار (15.7%)، واللؤلؤ والأحجار الكريمة والمعادن بـ 229.1 مليون دولار (8%)، والبلاستيك والمطاط بـ 99.2 مليون دولار (3.4%)، والمنتجات النباتية بـ 94 مليون دولار (3.2%)، والورق والورق المقوى بـ 78.8 مليون دولار (2.7%).

علاوة على ذلك، ارتفعت صادرات المعادن الأساسية بمقدار 163.7 مليون دولار، أو بنسبة 37.5%، في عام 2025 ؛ تليها صادرات اللؤلؤ والأحجار الكريمة والمعادن بزيادة 71.8 مليون دولار (+45.6%)؛ والمنتجات الكيماوية بزيادة 69.3 مليون دولار (+15.8%) ؛ والمواد الغذائية المحضرة والتبغ بزيادة 35.7 مليون دولار (+8.5%)؛ والآلات والأجهزة الإلكترونية بزيادة 30.9 مليون دولار (+5.8%) ؛ في حين انخفضت صادرات الدهون والشحوم والزيوت بمقدار 22.1 مليون دولار (-24.7%) ؛ تليها صادرات منتجات الورق والورق المقوى التي انخفضت بمقدار 4.7 مليون دولار (-5.7%)؛ والمصنوعات الجلدية والفراء التي انخفضت بمقدار 1.8 مليون دولار (-23%) ؛ ومصنوعات الحجر والجص والأسمنت والزجاج التي انخفضت بمقدار 1.3 مليون دولار (-4.7%).

كما كانت الدول العربية الوجهة لـ 40.4% من الصادرات الصناعية اللبنانية في عام 2025، تليها الاقتصادات الأوروبية بـ 19%، والأسواق الأفريقية غير العربية بـ 15.6%، والاقتصادات الآسيوية غير العربية بـ 12.4%، والأمريكيتان بـ 11%، والأسواق في أوقيانوسيا بـ 0.8%. وبالمقارنة، كانت الدول العربية الوجهة لـ 39.3% من الصادرات الصناعية اللبنانية في عام 2024، تليها الاقتصادات الأوروبية بـ 21%، والأسواق الأفريقية غير العربية بـ 16.3%، والأمريكيتان بـ 11%، والاقتصادات الآسيوية غير العربية بـ 10%، والأسواق في أوقيانوسيا بـ 1%. على صعيد الدول، كانت الإمارات العربية المتحدة الوجهة الرئيسية للصادرات الصناعية اللبنانية بقيمة 306.3 مليون دولار ومثلت 10.6% من الإجمالي في عام 2025، تليها العراق بـ 209.5 مليون دولار (7.2%)، والولايات المتحدة بـ 197.3 مليون دولار (6.8%)، ومصر بـ 166.6 مليون دولار (5.7%)، وتركيا بـ 157.1 مليون دولار (5.4%)، وسوريا بـ 141 مليون دولار (4.9%)، والأردن بـ 94.7 مليون دولار (3.3%)، وإيطاليا بـ 87.6 مليون دولار (3%)، وإسبانيا بـ 79.9 مليون دولار (2.8%). كما استوردت 26 دولة أفريقية غير عربية، و 23 اقتصاداً أوروبياً، و 16 دولة عربية، و 14 اقتصاداً آسيوياً غير عربي، وست دول في الأمريكيتين، واقتصادان في أوقيانوسيا، منتجات صناعية لبنانية بقيمة مليون دولار أو أكثر لكل منها في عام 2025.

بالتوازي، بلغت واردات المعدات والآلات الصناعية 164 مليون دولار في 2025، مما يشكل زيادة بنسبة 24.2% من 132 مليون دولار في 2024. كانت الصين المصدر الرئيسي لهذه الواردات ومثلت 34.3% من الإجمالي في العام الماضي، تليها إيطاليا بـ 19.5%، وألمانيا بـ 11.7%. وعلاوة على ذلك، بلغت واردات المعدات والآلات الصناعية 15.9 مليون دولار في كانون الأول 2025، وهو ما يمثل زيادة كبيرة بنسبة 46.8% من 10.8 مليون دولار في تشرين الثاني 2025. كانت الصين المصدر الرئيسي لهذه الواردات بقيمة 5.6 مليون دولار ومثلت 35.3% من الإجمالي في كانون الأول 2025، تليها تركيا بـ 2.6 مليون دولار (16.3%)، وإيطاليا بـ 2 مليون دولار (12.4%).`,
    contentEn: `Figures released by the Ministry of Industry show that Lebanese industrial exports reached $2.9 billion in 2025, representing an increase of $386 million, or 15.3%, from $2.5 billion in 2024. In comparison, industrial exports stood at $2.5 billion in 2019, $2.2 billion in 2020, and $2.55 billion in 2023.

Exports of base metals reached $600.7 million in 2025, representing 20.7% of total industrial exports last year. This was followed by machinery and electrical appliances at $560.1 million (19.3%), chemical products at $509.4 million (17.6%), prepared foodstuffs and tobacco at $455.2 million (15.7%), pearls, precious stones, and metals at $229.1 million (8%), plastics and rubber at $99.2 million (3.4%), vegetable products at $94 million (3.2%), and paper and paperboard at $78.8 million (2.7%).

Furthermore, exports of base metals rose by $163.7 million, or 37.5%, in 2025; followed by exports of pearls, precious stones, and metals, which increased by $71.8 million (+45.6%); chemical products, up $69.3 million (+15.8%); prepared foodstuffs and tobacco, up $35.7 million (+8.5%); and machinery and electrical appliances, up $30.9 million (+5.8%). Conversely, exports of fats, oils, and greases decreased by $22.1 million (-24.7%); followed by paper and paperboard products, which fell by $4.7 million (-5.7%); leather goods and furs, down $1.8 million (-23%); and stone, plaster, cement, and glass products, which decreased by $1.3 million (-4.7%).

In terms of destinations, Arab countries were the destination for 40.4% of Lebanese industrial exports in 2025, followed by European economies at 19%, non-Arab African markets at 15.6%, non-Arab Asian economies at 12.4%, the Americas at 11%, and Oceania at 0.8%. In comparison, Arab countries took 39.3% of Lebanese industrial exports in 2024, followed by European economies at 21%, non-Arab African markets at 16.3%, the Americas at 11%, non-Arab Asian economies at 10%, and Oceania at 1%.

At the country level, the United Arab Emirates was the primary destination for Lebanese industrial exports, valued at $306.3 million, representing 10.6% of the total in 2025. It was followed by Iraq at $209.5 million (7.2%), the United States at $197.3 million (6.8%), Egypt at $166.6 million (5.7%), Turkey at $157.1 million (5.4%), Syria at $141 million (4.9%), Jordan at $94.7 million (3.3%), Italy at $87.6 million (3%), and Spain at $79.9 million (2.8%). Additionally, 26 non-Arab African countries, 23 European economies, 16 Arab nations, 14 non-Arab Asian economies, 6 American countries, and 2 Oceania economies imported Lebanese industrial products valued at $1 million or more each in 2025.

In parallel, imports of industrial machinery and equipment reached $164 million in 2025, representing a 24.2% increase from $132 million in 2024. China was the primary source of these imports, accounting for 34.3% of last year's total, followed by Italy at 19.5% and Germany at 11.7%. Furthermore, imports of industrial machinery and equipment reached $15.9 million in December 2025, representing a significant 46.8% increase from $10.8 million in November 2025. China was the primary source of these imports, valued at $5.6 million, representing 35.3% of the total in December 2025, followed by Turkey at $2.6 million (16.3%) and Italy at $2 million (12.4%).`,
    author: {
      nameAr: 'مكتب الإحصاء والتحليل التجاري',
      nameEn: 'Trade & Commercial Statistics Desk',
      titleAr: 'محلل الأسواق السلعية والتبادل',
      titleEn: 'Trade Flow & Commodities Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=600',
    date: '28 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 5410,
    tags: ['الصادرات الصناعية', 'وزارة الصناعة', 'المعادن الأساسية', 'التبادل التجاري', 'لبنان']
  },
  {
    id: 'leb-investment-banks-sheet-2026',
    category: 'instats',
    categories: ['instats', 'lebanon', 'markets'],
    titleAr: 'الميزانية العمومية لبنوك الاستثمار عند 91.2 تريليون ليرة لبنانية في نهاية آذار 2026',
    titleEn: 'Investment Banks Consolidated Balance Sheet Reaches LBP 91.2 Trillion in Q1 2026',
    summaryAr: 'تظهر الأرقام الصادرة عن مصرف لبنان (BdL) أن الميزانية العمومية الموحدة لبنوك الاستثمار في لبنان بلغت 91.2 تريليون ليرة لبنانية (1.02 مليار دولار) في نهاية آذار 2026، متراجعة بنسبة 1.1% مقارنة بنهاية عام 2025 ومبنية على سعر صرف التعميم 167 (89,500 ليرة لكل دولار).',
    summaryEn: 'Central Bank of Lebanon (BdL) figures show that the consolidated balance sheet of investment banks in Lebanon reached LBP 91.2 trillion ($1.02B) at the end of March 2026, dropping 1.1% in the first quarter of the year.',
    excerptAr: 'الميزانية العمومية الموحدة لبنوك الاستثمار تسجل 91.2 تريليون ليرة لبنانية متأثرة بآلية التقييم الجديدة لمصرف لبنان وفق سعر الصرف الرسمي.',
    excerptEn: 'Combined investment bank assets in Lebanon stood at LBP 91.2 trillion in Q1 2026, dropping 1.1% from year-end 2025 but expanding 9.8% YoY.',
    contentAr: `تظهر الأرقام الصادرة عن مصرف لبنان (BdL) أن الميزانية العمومية الموحدة لبنوك الاستثمار في لبنان بلغت 91.2 تريليون (tn) ليرة لبنانية في نهاية آذار 2026، أو ما يعادل 1.02 مليار دولار، مما يشكل انخفاضاً بنسبة 1.1% من 92.2 تريليون ليرة لبنانية (1.03 مليار دولار) في نهاية 2025 وزيادة بنسبة 9.8% من 83.1 تريليون ليرة لبنانية (928 مليون دولار) في نهاية آذار 2025. تعكس الأرقام التعميم الأساسي لمصرف لبنان رقم 167/13612 تاريخ 2 شباط 2024 الذي طلب من البنوك والمؤسسات المالية تحويل أصولها وخصومها بالعملات الأجنبية إلى الليرة اللبنانية بسعر صرف 89,500 ليرة لبنانية لكل دولار أمريكي عند إعداد ميزانياتها المالية ومراكزها بدءاً من 31 كانون الثاني 2024.

على جانب الأصول، بلغت المطالبات على العملاء المقيمين 8.7 تريليون ليرة لبنانية (97.7 million دولار) في نهاية آذار 2026 وزادت بنسبة 12.7% من 7.76 تريليون ليرة لبنانية (86.7 million دولار) في نهاية 2025 وبنسبة 50% من 5.8 تريليون ليرة لبنانية (65.1 million دولار) في العام السابق. وعلاوة على ذلك، بلغ إجمالي المطالبات على العملاء المقيمين بالليرة اللبنانية 403.3 مليار ليرة لبنانية في نهاية آذار 2026، مما يشكل انخفاضات بنسبة 7.2% من 434.6 مليار ليرة لبنانية في نهاية 2025 وبنسبة 30.8% من 582.4 مليار ليرة لبنانية في نهاية آذار 2025، في حين بلغت المطالبات على العملاء المقيمين بالعملة الأجنبية 8.3 تريليون ليرة لبنانية (93.2 million دولار) في نهاية آذار 2026 وارتفعت بنسبة 14% في الربع الأول من 2026 وبنسبة 59% في العام السابق. كما بلغت المطالبات على العملاء غير المقيمين 841.8 مليار ليرة لبنانية (9.4 million دولار) في نهاية آذار 2026 وزادت بنسبة 4.3% عن نهاية 2025 وبنسبة 7.8% عن نهاية آذار 2025.

علاوة على ذلك، بلغت المطالبات على القطاع المالي المقيم 7.7 تريليون ليرة لبنانية (86 million دولار) في نهاية آذار 2026، حيث نمت بنسبة 11.2% من 6.92 تريليون ليرة لبنانية (77.3 million دولار) في نهاية 2025 وانخفضت بنسبة 15.4% من 9.1 تريليون ليرة لبنانية (101.6 million دولار) في العام السابق. وبلغت المطالبات على القطاع المالي المقيم بالليرة اللبنانية 3.7 تريليون ليرة لبنانية في نهاية آذار 2026 وارتفعت بشكل كبير بنسبة 78.8% من 2.07 تريليون ليرة لبنانية في نهاية 2025 وبنسبة 11.4% من 3.3 تريليون ليرة لبنانية في نهاية آذار 2025، في حين بلغ إجمالي المطالبات على القطاع المالي المقيم بالعملة الأجنبية 4 تريليون ليرة لبنانية (44.6 million دولار) في نهاية آذار 2026 وانخفضت بنسبة 17.7% من 4.85 تريليون ليرة لبنانية (54.2 million دولار) في نهاية العام السابق وبنسبة 31% من 5.77 تريليون ليرة لبنانية (64.5 million دولار). بالإضافة إلى ذلك، بلغت المطالبات على القطاع المالي غير المقيم 6.2 تريليون ليرة لبنانية (69.4 million دولار) في نهاية آذار 2026 وانخفضت بنسبة 24.7% من 8.25 تريليون ليرة لبنانية (92.1 million دولار) في نهاية 2025 وبنسبة 24.4% من 8.2 تريليون ليرة لبنانية (91.7 million دولار) في نهاية آذار 2025. كما بلغت المطالبات على القطاع العام 3.2 مليار ليرة لبنانية في نهاية آذار 2026 مقارنة بـ 3.2 مليار ليرة لبنانية في نهاية 2025 و 1.9 مليار ليرة لبنانية في العام السابق ؛ في حين أن محفظة الأوراق المالية، والتي تشمل سندات الخزينة اللبنانية وسندات اليوروبوندز، بلغت 10 تريليون ليرة لبنانية وتراجعت بنسبة 4.5% من 10.5 تريليون ليرة لبنانية في نهاية 2025 وبنسبة 18.6% من 12.3 تريليون ليرة لبنانية في نهاية آذار 2025. بالتوازي، بلغت العملات والودائع لدى البنوك المركزية المحلية والأجنبية 35.6 تريليون ليرة لبنانية (397.6 million دولار) في نهاية آذار 2026 مقارنة بـ 36 تريليون ليرة لبنانية (402.7 million دولار) في نهاية 2025 و 31.4 تريليون ليرة لبنانية (351 million دولار) في نهاية آذار 2025.

على جانب الخصوم، بلغت ودائع العملاء المقيمين 29.1 تريليون ليرة لبنانية (325 million دولار) في نهاية آذار 2026، مما يشكل انخفاضاً بنسبة 1.2% من 29.4 تريليون ليرة لبنانية (328.8 million دولار) في نهاية 2025 و 3% من 30 تريليون ليرة لبنانية (335 million دولار) في نهاية آذار 2025. وبلغت ودائع العملاء المقيمين بالليرة اللبنانية 2,622 مليار ليرة لبنانية في نهاية آذار 2026 حيث نمت بنسبة 8.4% في الربع الأول من العام وانخفضت بنسبة 11.5% مقارنة بالعام السابق، في حين بلغت ودائع العملاء المقيمين بالعملة الأجنبية 26.5 تريليون ليرة لبنانية (295.7 million دولار) في نهاية آذار 2026 وتراجعت بنسبة 2% من نهاية 2025 وبنسبة 2% من نهاية آذار 2025. كما بلغ إجمالي ودائع العملاء غير المقيمين 8.7 تريليون ليرة لبنانية (96.9 million دولار) في نهاية آذار 2026، حيث انخفضت بنسبة 2.3% من 8.88 تريليون ليرة لبنانية (99.2 million دولار) في نهاية 2025 وزادت بنسبة 8.8% من 7.97 تريليون ليرة لبنانية (89 million دولار) في العام السابق.

علاوة على ذلك، بلغت الخصوم للقطاع المالي المقيم 5.2 تريليون ليرة لبنانية (57.7 million دولار) في نهاية آذار 2026 وارتفعت بنسبة 9.1% من 4.7 تريليون ليرة لبنانية (52.9 million دولار) في نهاية 2025 وبنسبة 3.4% من 5 تريليون ليرة لبنانية (55.8 million دولار) في نهاية آذار 2025. بلغ إجمالي الخصوم للقطاع المالي المقيم بالليرة اللبنانية 2,950.1 مليار ليرة لبنانية في نهاية آذار 2026، حيث زادت بنسبة 6.2% في الربع الأول من 2026 وتراجعت بنسبة 2.4% مقارنة بالعام السابق، في حين بلغت الخصوم للقطاع المالي المقيم بالعملة الأجنبية 2,213.1 مليار ليرة لبنانية (24.7 million دولار) في نهاية آذار 2026 ونمت بنسبة 13.1% من 1,956.1 مليار ليرة لبنانية (22 million دولار) في نهاية 2025 وبنسبة 12.3% من 1,971.3 مليار ليرة لبنانية (22 million دولار) في نهاية آذار 2025.

بالإضافة إلى ذلك، بلغت الخصوم للقطاع المالي غير المقيم 9.2 تريليون ليرة لبنانية (102.8 million دولار) في نهاية آذار 2026، بانخفاض قدره 10.3% في الربع الأول من 2026 وبزيادة قدرها 8.6% مقارنة بالعام السابق، في حين بلغ إجمالي ودائع القطاع العام 195.7 مليار ليرة لبنانية في نهاية آذار 2026 مقابل 446.4 مليار ليرة لبنانية في نهاية 2025 و 1,125.4 مليار ليرة لبنانية في نهاية آذار 2025. وعلاوة على ذلك، بلغ إجمالي حساب رأس مال المؤسسات المالية 24.6 تريليون ليرة لبنانية (275.3 million دولار) في نهاية آذار 2026 مقابل 25.1 تريليون ليرة لبنانية (281 million دولار) في نهاية 2025 و 19.2 تريليون ليرة لبنانية (214.5 million دولار) في نهاية آذار 2025.`,
    contentEn: `Figures released by the Central Bank of Lebanon (BdL) show that the consolidated balance sheet of investment banks in Lebanon reached LBP 91.2 trillion (tn) at the end of March 2026, equivalent to approximately $1.02 billion. This represents a 1.1% decline from LBP 92.2 trillion ($1.03 billion) at the end of 2025, and a 9.8% increase from LBP 83.1 trillion ($928 million) at the end of March 2025.

These figures reflect BDL Basic Circular No. 167/13612, dated February 2, 2024, which directed banks and financial institutions to convert their foreign currency assets and liabilities into Lebanese Lira at the exchange rate of LBP 89,500 per US dollar when preparing their financial statements and balance sheets starting January 31, 2024.

Asset Allocation Breakdown
• Claims on Resident Customers: Stood at LBP 8.7 trillion ($97.7 million) at the end of March 2026, increasing by 12.7% from LBP 7.76 trillion ($86.7 million) at the end of 2025, and by 50% from LBP 5.8 trillion ($65.1 million) a year earlier.
  - In LBP: Claims on resident customers in Lebanese Lira totaled LBP 403.3 billion at the end of March 2026, marking decreases of 7.2% from LBP 434.6 billion at the end of 2025, and 30.8% from LBP 582.4 billion at the end of March 2025.
  - In FX: Claims on resident customers in foreign currency reached LBP 8.3 trillion ($93.2 million) at the end of March 2026, rising by 14% in the first quarter of 2026 and by 59% compared to the previous year.
• Claims on Non-Resident Customers: Totaled LBP 841.8 billion ($9.4 million) at the end of March 2026, up 4.3% from the end of 2025, and 7.8% from the end of March 2025.
• Claims on the Resident Financial Sector: Reached LBP 7.7 trillion ($86 million) at the end of March 2026, growing by 11.2% from LBP 6.92 trillion ($77.3 million) at the end of 2025, but declining by 15.4% from LBP 9.1 trillion ($101.6 million) in the previous year.
  - In LBP: Stood at LBP 3.7 trillion at the end of March 2026, a massive 78.8% increase from LBP 2.07 trillion at the end of 2025, and up 11.4% from LBP 3.3 trillion at the end of March 2025.
  - In FX: Totaled LBP 4 trillion ($44.6 million) at the end of March 2026, down 17.7% from LBP 4.85 trillion ($54.2 million) at the end of the previous year, and down 31% from LBP 5.77 trillion ($64.5 million) at March 2025 end.
• Claims on the Non-Resident Financial Sector: Stood at LBP 6.2 trillion ($69.4 million) at the end of March 2026, dropping by 24.7% from LBP 8.25 trillion ($92.1 million) at the end of 2025, and down 24.4% from LBP 8.2 trillion ($91.7 million) at the end of March 2025.
• Claims on the Public Sector: Stood at LBP 3.2 billion at the end of March 2026, compared to LBP 3.3 billion at the end of 2025 and LBP 1.9 billion a year earlier.
• Securities Portfolio (including Lebanese Treasury Bills and Eurobonds): Reached LBP 10 trillion, falling by 4.5% from LBP 10.5 trillion at the end of 2025, and down 18.6% from LBP 12.3 trillion at the end of March 2025.
• Cash and Deposits at Local and Foreign Central Banks: Totaled LBP 35.6 trillion ($397.6 million) at the end of March 2026, compared to LBP 36 trillion ($402.7 million) at the end of 2025 and LBP 31.4 trillion ($351 million) at the end of March 2025.

Liabilities & Capital Accounts
• Resident Customer Deposits: Reached LBP 29.1 trillion ($325 million) at the end of March 2026, a 1.2% decrease from LBP 29.4 trillion ($328.8 million) at the end of 2025, and a 3% drop from LBP 30 trillion ($335 million) at the end of March 2025.
  - In LBP: Totaled LBP 2,622 billion at the end of March 2026, expanding by 8.4% in the first quarter of the year, but declining by 11.5% compared to the previous year.
  - In FX: Stood at LBP 26.5 trillion ($295.7 million) at the end of March 2026, down 2% from the end of 2025, and down 2% from the end of March 2025.
• Non-Resident Customer Deposits: Totaled LBP 8.7 trillion ($96.9 million) at the end of March 2026, declining by 2.3% from LBP 8.88 trillion ($99.2 million) at the end of 2025, but increasing by 8.8% from LBP 7.97 trillion ($89 million) a year earlier.
• Liabilities to the Resident Financial Sector: Reached LBP 5.2 trillion ($57.7 million) at the end of March 2026, rising by 9.1% from LBP 4.7 trillion ($52.9 million) at the end of 2025, and by 3.4% from LBP 5 trillion ($55.8 million) at March 2025 end.
  - In LBP: Totaled LBP 2,950.1 billion at the end of March 2026, up 6.2% in the first quarter of 2026, and down 2.4% compared to the previous year.
  - In FX: Reached LBP 2,213.1 billion ($24.7 million) at the end of March 2026, growing by 13.1% from LBP 1,956.1 billion ($22 million) at the end of 2025, and by 12.3% from LBP 1,971.3 billion ($22 million) at the end of March 2025.
• Liabilities to the Non-Resident Financial Sector: Reached LBP 9.2 trillion ($102.8 million) at the end of March 2026, dropping by 10.3% in the first quarter of 2026 but up 8.6% compared to the prior year.
• Public Sector Deposits: Stood at LBP 195.7 billion at the end of March 2026, compared to LBP 446.4 billion at the end of 2025 and LBP 1,125.4 billion at March 2025 end.
• Capital Accounts of Financial Institutions: Totaled LBP 24.6 trillion ($275.3 million) at the end of March 2026, compared to LBP 25.1 trillion ($281 million) at the end of 2025, and LBP 19.2 trillion ($214.5 million) at March 2025 end.`,
    author: {
      nameAr: 'مكتب البحوث المصرفية والمالية',
      nameEn: 'Banking & Financial Research Bureau',
      titleAr: 'محلل أول الهياكل المصرفية',
      titleEn: 'Senior Banking Structure Analyst'
    },
    imageUrl: 'https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&q=80&w=600',
    date: '29 يونيو 2026',
    readTimeAr: '6 دقائق',
    readTimeEn: '6 min read',
    views: 4120,
    tags: ['بنوك الاستثمار', 'مصرف لبنان', 'الميزانية العمومية', 'سعر الصرف', 'الليرة اللبنانية']
  },
  {
    id: 'iran-frozen-assets-2026',
    category: 'investigations',
    categories: ['investigations', 'editor-desk'],
    titleAr: 'الأصول الإيرانية المجمدة في الخارج: الأبعاد الكمية، التوزيع الجغرافي، والأطر القانونية',
    titleEn: 'Iranian Frozen Assets Abroad: Quantitative Dimensions, Geographical Distribution, and Legal Frameworks',
    summaryAr: 'تمثل قضية الأصول الإيرانية المجمدة في الخارج واحدة من أعقد الملفات القانونية والمالية في تاريخ العلاقات الدولية الحديثة. ترصد هذه الورقة الاستقصائية تفاصيل توزيع الأرصدة والنزاعات القانونية العابرة للقارات.',
    summaryEn: 'The issue of Iranian frozen assets abroad represents one of the most complex legal and financial files in modern international relations. This investigative paper tracks the distribution of balances and cross-continental legal disputes.',
    excerptAr: 'تفكيك شامل لملف الأصول الإيرانية المحتجزة جغرافياً وقانونياً والتداعيات الجيوسياسية لتجميدها تاريخياً.',
    excerptEn: 'A comprehensive deconstruction of the geographical and legal distribution of frozen Iranian assets and their geopolitical implications.',
    contentAr: `### مقدمة تمهيدية

تمثل قضية الأصول الإيرانية المجمدة في الخارج واحدة من أعقد الملفات القانونية والمالية في تاريخ العلاقات الدولية الحديثة. لا يقتصر هذا الملف على كونه نزاعاً مالياً حول أرصدة نقدية، بل هو أداة رئيسية في استراتيجية "العقوبات الذكية" وضغوط القوى العظمى (وعلى رأسها الولايات المتحدة) تجاه النظام الإيراني منذ ثورة عام 1979. تهدف هذه الورقة البحثية —المصممة وفق أسلوب الأطروحات الأكاديمية— إلى تفكيك هذا الملف عبر رصد دقيق لتوزيع تلك الأصول، والتكييف القانوني لاحتجازها، ومصائرها التاريخية والسياسية.

---

### أولاً: الأبعاد الكمية والتقديرات الإجمالية

تتسم التقديرات المتعلقة بالحجم الإجمالي للأصول الإيرانية المجمدة بالتباين الشديد نتيجة للسرية المصرفية، وتغير أسعار الصرف، واختلاف تصنيف الأصول (بين أرصدة نقدية سائلة، وسندات حكومية، وعقارات، وأصول عسكرية). ومع ذلك، تُشير تقديرات صندوق النقد الدولي والجهات البحثية المستقلة إلى أن الرقم الإجمالي للأموال المحتجزة يتراوح بين **100 إلى 120 مليار دولار أمريكي** عالمياً.

يتوزع هذا الرقم بين مستويين رئيسيين:
1. **أصول البنك المركزي الإيراني:** وتمثل الكتلة الكبرى (حوالي 60-70% من الإجمالي) وتخلف حمايتها حصانة سيادية خاصة بموجب القانون الدولي.
2. **أصول تجارية ومستحقات تجارة الطاقة:** وهي أموال محتجزة في حسابات مقيدة (Escrow Accounts) لصالح إيران في دول مستوردة للنفط أو الغاز الإيراني (مثل الصين، والعراق، والهند، كوريا الجنوبية قبل نقلها).

---

### ثانياً: التوزيع الجغرافي والنوعي للأصول

تتوزع الأصول الإيرانية المجمدة جغرافياً عبر شبكة معقدة من الدول والبنوك الدولية الخاضعة لضغوط الخزانة الأمريكية ونظام المقاصة بالدولار (Fedwire):

* **الصين ($20B - $25B):** تحتجز بكين الكتلة الكبرى من عوائد النفط الإيراني. بموجب نظام "حساب المقاصة المقيد"، لا تُصرف هذه الأموال نقداً، بل تُستخدم كائتمانات لتمويل الصادرات الصينية والسلع غير الخاضعة للعقوبات إلى إيران (نظام المقايضة والتبادل التجاري المقيد).
* **العراق ($10B - $12B):** تراكمت هذه الأصول كمستحقات لتصدير الكهرباء والغاز الإيراني لجمهورية العراق. تُحتجز الأموال في "المصرف العراقي للتجارة" (TBI)، وتخضع لتحويلات دورية مشروطة وبتفويضات خاصة من وزارة الخزانة الأمريكية لتسوية واردات إيران الإنسانية فقط (أدوية وأغذية).
* **الاتحاد الأوروبي وبنوك دولية ($5B - $10B):** تتوزع في مصارف بريطانية، وألمانية، وإيطالية، فضلاً عن حسابات تابعة لشركات فرنسية وأوروبية علقت تعاملاتها مع طهران، وتخضع لضوابط حظر الانتشار النووي.
* **كوريا الجنوبية ($6B):** كانت محتجزة في بنكين كوريين كعوائد نفطية، حتى أواخر عام 2023 عندما نُقلت إلى حسابات سويسرية ومن ثم إلى حسابات مقيدة تابعة لمصارف قطرية كجزء من صفقة تبادل السجناء الكبرى بوساطة الدوحة.
* **الولايات المتحدة ($2B - $4B):** تشمل أصولاً وعقارات بعثات دبلوماسية سابقة، وأموال صفقة الأسلحة الملغاة ما قبل الثورة، وأرصدة مصرفية مجمدة خاضعة لأحكام قضائية لصالح ضحايا الهجمات الإرهابية المنسوبة لإيران.
* **لوكسمبورغ (مؤسسة Clearstream - $1.6B - $2B):** خضعت لنزاعات قضائية طويلة في المحاكم الأوروبية والأمريكية لتسييلها لصالح عائلات ضحايا تفجير بيروت 1983.

---

### ثالثاً: الأطر القانونية وآليات الاحتجاز

يستند التكييف القانوني لاحتجاز الأصول الإيرانية إلى ركيزتين أساسيتين:

1. **القانون المحلي الأمريكي والولاية القضائية العابرة للحدود:**
   تعتمد واشنطن على "قانون الصلاحيات الاقتصادية الطارئة الدولية" (IEEPA)، الذي يمنح الرئيس الأمريكي سلطة تجميد أصول الدول الأجنبية في حالات الطوارئ الوطنية. ينفذ ذلك "مكتب مراقبة الأصول الأجنبية" (OFAC) عبر فرض عقوبات ثانوية على أي مؤسسة مالية تتعامل مع البنك المركزي الإيراني، مما يجبر البنوك العالمية على الامتثال لمنع العزل من شبكة التبادل المالي العالمي (SWIFT) ونظام المقاصة بالدولار.

2. **معضلة الحصانة السيادية للدول ومقاضاتها:**
   بموجب القانون الدولي العام، تتمتع الدول وبنوكها المركزية بالحصانة من الولاية القضائية للدول الأخرى. غير أن القضاء الأمريكي تجاوز هذه الحصانة بإدخال تعديلات على قانون حصانات الدول الأجنبية (FSIA) وقانون حماية ضحايا الإرهاب (TRIA)، مما سمح للمواطنين الأمريكيين برفع دعاوى ضد إيران ومصادرة أموال البنك المركزي الإيراني المجمدة كتعويضات (مثل قضية بترسون ضد البنك المركزي الإيراني التي قضت بموجبها المحكمة العليا الأمريكية بمصادرة حوالي 2 مليار دولار).

3. **موقف محكمة العدل الدولية:**
   في حكمها الصادر في مارس 2023 في قضية "المنشآت الإيرانية"، قضت محكمة لاهاي بأن الولايات المتحدة انتهكت التزاماتها بموجب "معاهدة الصداقة 1955" المنحلة بمصادرتها غير القانونية لأصول شركات إيرانية، لكنها قضت في الوقت نفسه بعدم اختصاصها القضائي للحكم في مسألة تجميد أصول البنك المركزي الإيراني نظراً لعدم شمول المعاهدة للحصانات السيادية للبنوك المركزية ككيانات سيادية مستقلة.

---

### رابعاً: التداعيات الجيوسياسية ومصائر الأصول

تمثل الأصول المجمدة أداة استراتيجية وصراع نفوذ محوري في مفاوضات الملف النووي الإيراني:
* **صمام أمان وأداة مقايضة:** تستخدم الولايات المتحدة التسييل المشروط والتدريجي للأصول كحافز (Carrot) لدفع طهران للعودة إلى قيود البرنامج النووي أو لضبط وكلائها الإقليميين.
* **البدائل الاقتصادية وتكريس "اقتصاد المقاومة":** دفعت هذه القيود طهران لبناء منظومات مصرفية وسيطة وخطوط تجارة بديلة تعتمد على العملات المحلية والتكامل الاقتصادي مع قوى أوراسيا (روسيا والصين)، مما يقلل من الفعالية الجيوسياسية للعقوبات بمرور الزمن.

*خلاصة القول:* إن قضية الأصول الإيرانية المجمدة تجسد الصدام التاريخي والمستمر بين مبدأ "السيادة الوطنية والقانون الدولي" الذي يتمسك بحصانة أموال الدول المركزية، وبين "قوة الأمر الواقع المالي" التي تفرضها الهيمنة الأمريكية وحصار شبكة المقاصة المصرفية العالمية.`,
    contentEn: `### Introduction

The issue of Iranian frozen assets abroad is one of the most complex legal and financial files in the history of modern international relations. This matter is not merely a financial dispute over cash balances; it is a primary tool in the strategy of "smart sanctions" and geopolitical leverage deployed by major powers (most notably the United States) against the Iranian regime since the 1979 revolution. This research paper—modeled after academic theses—aims to deconstruct this file through a rigorous mapping of the geographic distribution of these assets, the legal frameworks governing their detention, and their historical and political destinies.

---

### I. Quantitative Dimensions & Overall Estimates

Estimates of the total volume of frozen Iranian assets vary widely due to banking secrecy, fluctuating exchange rates, and differing classifications of assets (including liquid cash balances, government bonds, real estate, and pre-1979 military equipment). Nonetheless, independent institutions and the IMF estimate the total value of these restricted funds to range between **$100 billion and $120 billion** globally.

This total is divided into two primary tiers:
1. **Central Bank of Iran (CBI) Assets:** Representing the vast majority (about 60-70% of the total), these assets traditionally enjoy special sovereign immunity protections under international law.
2. **Commercial & Energy Trade Receivables:** Funds held in restricted Escrow Accounts in countries importing Iranian oil or gas (such as China, Iraq, India, and South Korea before recent transfers).

---

### II. Geographical & Typological Distribution of Assets

Frozen Iranian assets are distributed across a complex global network of countries and financial institutions subject to US Treasury pressure and the US dollar clearing network (Fedwire):

* **China ($20B - $25B):** Beijing holds the largest share of Iranian oil revenues. Under a restricted clearing account system, these funds are not paid out in cash; instead, they serve as trade credits to fund Chinese exports and non-sanctioned goods to Iran (a barter system).
* **Iraq ($10B - $12B):** These funds accumulated as payments for Iranian electricity and gas exports to Iraq. They are held at the Trade Bank of Iraq (TBI) and are subject to periodic, conditional US Treasury waivers allowing their transfer strictly for humanitarian purchases (food and medicine).
* **European Union & International Banks ($5B - $10B):** These assets are scattered across British, German, and Italian banks, as well as accounts belonging to European corporations that suspended operations in Tehran under non-proliferation sanctions.
* **South Korea ($6B):** These oil revenues were held in two South Korean banks until late 2023, when they were transferred to Swiss banks and subsequently to restricted accounts in Qatari banks as part of a major prisoner-swap agreement mediated by Doha.
* **United States ($2B - $4B):** Includes assets and real estate of former diplomatic missions, funds from canceled pre-revolution military contracts, and frozen bank balances subject to US court judgments awarded to victims of terrorist attacks blamed on Iran.
* **Luxembourg (Clearstream - $1.6B - $2B):** Subject to prolonged legal disputes in European and US courts aimed at liquidating these bonds for the families of victims of the 1983 Beirut barracks bombing.

---

### III. Legal Frameworks & Detention Mechanisms

The legal basis for freezing and retaining Iranian assets rests on two main pillars:

1. **US Domestic Legislation & Extraterritorial Jurisdiction:**
   Washington relies primarily on the International Emergency Economic Powers Act (IEEPA), which authorizes the US President to freeze foreign assets during national emergencies. The Office of Foreign Assets Control (OFAC) enforces this by imposing secondary sanctions on any foreign financial institution that conducts transactions with the Central Bank of Iran, forcing global banks to comply to avoid being cut off from SWIFT and the USD clearing system.

2. **The Sovereign Immunity Dilemma:**
   Under general international law, states and their central banks enjoy sovereign immunity from the jurisdiction of other states. However, US courts bypassed this immunity by introducing amendments to the Foreign Sovereign Immunities Act (FSIA) and the Terrorism Risk Insurance Act (TRIA). This allowed US citizens to sue Iran and seize frozen CBI assets as compensation (such as in Peterson v. CBI, where the US Supreme Court approved the seizure of approximately $2B in frozen assets).

3. **International Court of Justice (ICJ) Position:**
   In its March 2023 ruling in the "Certain Iranian Assets" case, the ICJ held that the US violated its obligations under the now-terminated 1955 Treaty of Amity by allowing the unlawful confiscation of assets belonging to Iranian state-owned companies. However, the court ruled that it lacked jurisdiction over the freezing of Central Bank of Iran assets, as the Treaty of Amity did not cover the sovereign immunities of central banks.

---

### IV. Geopolitical Implications & Asset Destinies

Frozen assets remain a vital strategic lever and chip in negotiations over Iran's nuclear program:
* **The Carrot-and-Stick Negotiation Leverage:** The US uses the conditional, phased release of assets as an incentive to bring Tehran back to compliance with nuclear limits or to de-escalate regional tensions.
* **The "Resistance Economy" Pivot:** These financial restrictions have driven Tehran to construct intermediary banking networks and alternative trade routes relying on local currencies and integration with Eurasian powers (Russia and China), reducing the long-term efficacy of sanctions.

*Conclusion:* The issue of frozen Iranian assets perfectly captures the ongoing clash between "sovereign immunity and international law" on one hand, and the "financial realpolitik" of US dominance over the global banking clearing system on the other.`,
    author: {
      nameAr: 'قسم البحوث الاستقصائية والدراسات السيادية',
      nameEn: 'Investigative Research & Sovereign Studies Desk',
      titleAr: 'محلل جيوسياسي واقتصادي أول بالورّاق',
      titleEn: 'Senior Geopolitical & Economic Analyst at Al-Warraq'
    },
    imageUrl: 'https://images.unsplash.com/photo-1543185377-b75371a29437?auto=format&fit=crop&q=80&w=600',
    date: '1 يوليو 2026',
    readTimeAr: '7 دقائق',
    readTimeEn: '7 min read',
    views: 7420,
    tags: ['الأصول المجمدة', 'إيران', 'العقوبات الأمريكية', 'السياسة النقدية', 'الجيوسياسية']
  }
];

export const INITIAL_CURRENCIES: CurrencyRate[] = [
  { pair: 'SAR / USD', rate: '0.266', change: '0.00%', isPositive: true },
  { pair: 'LBP / USD', rate: '89,500', change: '+0.15%', isPositive: true },
  { pair: 'EUR / USD', rate: '1.089', change: '+0.23%', isPositive: true },
  { pair: 'GBP / USD', rate: '1.272', change: '-0.12%', isPositive: false },
  { pair: 'Brent Crude', rate: '$84.50', change: '+1.45%', isPositive: true }
];
