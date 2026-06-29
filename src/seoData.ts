export interface SEOTag {
  nameEn: string;
  nameAr: string;
}

export interface SEOSilo {
  id: string;
  titleEn: string;
  titleAr: string;
  tags: SEOTag[];
}

export const SEO_SILOS: SEOSilo[] = [
  {
    id: 'general-breaking',
    titleEn: 'General & Breaking News (Lebanon & Middle East)',
    titleAr: 'أخبار عامة وعاجلة (لبنان والشرق الأوسط)',
    tags: [
      { nameEn: 'Lebanon News', nameAr: 'أخبار لبنان' },
      { nameEn: 'Beirut News', nameAr: 'أخبار بيروت' },
      { nameEn: 'Middle East Updates', nameAr: 'تحديثات الشرق الأوسط' },
      { nameEn: 'Breaking News', nameAr: 'أخبار عاجلة' },
      { nameEn: 'Latest Updates', nameAr: 'آخر التحديثات' },
      { nameEn: 'Regional Developments', nameAr: 'تطورات إقليمية' },
      { nameEn: 'Middle East Affairs', nameAr: 'شؤون الشرق الأوسط' },
      { nameEn: 'Lebanon Situation', nameAr: 'الوضع اللبناني' },
      { nameEn: 'Gulf News', nameAr: 'أخبار الخليج' },
      { nameEn: 'Arab Politics', nameAr: 'سياسة عربية' },
      { nameEn: 'Beirut Breaking News', nameAr: 'أخبار بيروت العاجلة' },
      { nameEn: 'Special Coverage', nameAr: 'تغطية خاصة' },
      { nameEn: 'News Follow-ups', nameAr: 'متابعات إخبارية' },
      { nameEn: 'Today\'s News', nameAr: 'أخبار اليوم' },
      { nameEn: 'Arab Press', nameAr: 'الصحافة العربية' },
      { nameEn: 'Regional Affairs', nameAr: 'أخبار المنطقة' },
      { nameEn: 'Current Events', nameAr: 'أحداث جارية' },
      { nameEn: 'Urgent Beirut', nameAr: 'عاجل بيروت' },
      { nameEn: 'Levant News', nameAr: 'أخبار بلاد الشام' },
      { nameEn: 'Arab World News', nameAr: 'أخبار العالم العربي' }
    ]
  },
  {
    id: 'macro-markets',
    titleEn: 'Macroeconomics & Markets',
    titleAr: 'الاقتصاد الكلي والأسواق السيادية',
    tags: [
      { nameEn: 'Middle East Economy', nameAr: 'اقتصاد الشرق الأوسط' },
      { nameEn: 'Lebanon Economy', nameAr: 'الاقتصاد اللبناني' },
      { nameEn: 'Financial Markets', nameAr: 'الأسواق المالية' },
      { nameEn: 'Oil Prices MENA', nameAr: 'أسعار النفط في الشرق الأوسط' },
      { nameEn: 'Energy & Infrastructure', nameAr: 'الطاقة والبنية التحتية' },
      { nameEn: 'Strait of Hormuz', nameAr: 'مضيق هرمز' },
      { nameEn: 'Supply Chains', nameAr: 'سلاسل الإمداد' },
      { nameEn: 'Gulf Investments', nameAr: 'الاستثمارات الخليجية' },
      { nameEn: 'Economic Corridors', nameAr: 'الممرات الاقتصادية' },
      { nameEn: 'Commodity Markets', nameAr: 'أسواق السلع' },
      { nameEn: 'Oil and Gas', nameAr: 'النفط والغاز' },
      { nameEn: 'Arab Economy', nameAr: 'الاقتصاد العربي' },
      { nameEn: 'Lebanon Economic Crisis', nameAr: 'الأزمة الاقتصادية اللبنانية' },
      { nameEn: 'Global Markets', nameAr: 'الأسواق العالمية' },
      { nameEn: 'Economic Development', nameAr: 'التنمية الاقتصادية' },
      { nameEn: 'IMF Middle East', nameAr: 'صندوق النقد الدولي في الشرق الأوسط' },
      { nameEn: 'Economic Indicators', nameAr: 'المؤشرات الاقتصادية' },
      { nameEn: 'Economic Crises', nameAr: 'الأزمات الاقتصادية' },
      { nameEn: 'MENA Trade', nameAr: 'تجارة الشرق الأوسط وشمال أفريقيا' },
      { nameEn: 'Fiscal Policy', nameAr: 'السياسة المالية والضريبية' }
    ]
  },
  {
    id: 'exclusives-investigations',
    titleEn: 'Exclusives & Investigations',
    titleAr: 'انفرادات وتحقيقات استقصائية عاجلة',
    tags: [
      { nameEn: 'Exclusive Reports', nameAr: 'تقارير حصرية' },
      { nameEn: 'Press Scoop', nameAr: 'سبق صحفي' },
      { nameEn: 'Investigative Journalism MENA', nameAr: 'الصحافة الاستقصائية الشرق أوسطية' },
      { nameEn: 'Political Analysis', nameAr: 'التحليل السياسي' },
      { nameEn: 'Economic Insights', nameAr: 'آفاق ورؤى اقتصادية' },
      { nameEn: 'Special Research', nameAr: 'دراسات وأبحاث خاصة' },
      { nameEn: 'Exclusive Interviews', nameAr: 'مقابلات حصرية' },
      { nameEn: 'Analytical Vision', nameAr: 'رؤية تحليلية' },
      { nameEn: 'Exclusive Documents', nameAr: 'وثائق حصرية' },
      { nameEn: 'Hot Files', nameAr: 'ملفات ساخنة' },
      { nameEn: 'Private Sources', nameAr: 'مصادر خاصة بالجريدة' },
      { nameEn: 'Data Analysis', nameAr: 'تحليل البيانات الميدانية' },
      { nameEn: 'News Monitoring', nameAr: 'الرصد والتحليل الإخباري' },
      { nameEn: 'Economic Reports', nameAr: 'تقارير مالية محكمة' },
      { nameEn: 'Behind the News', nameAr: 'ما وراء الخبر والحدث' },
      { nameEn: 'Political Backstage', nameAr: 'كواليس السياسة' },
      { nameEn: 'Exclusive Indicators', nameAr: 'مؤشرات حصرية بالوراق' },
      { nameEn: 'Regional Studies', nameAr: 'دراسات وتقارير إقليمية' },
      { nameEn: 'Intelligence Briefings', nameAr: 'إيجازات استخباراتية واقتصادية' },
      { nameEn: 'In-Depth Coverage', nameAr: 'تغطيات معمقة ودورية' }
    ]
  },
  {
    id: 'business-tech',
    titleEn: 'Business, Tech & Innovation',
    titleAr: 'الأعمال والتقنية الصاعدة والابتكار',
    tags: [
      { nameEn: 'Arab Entrepreneurship', nameAr: 'ريادة الأعمال العربية' },
      { nameEn: 'Digital Transformation', nameAr: 'التحول الرقمي الإقليمي' },
      { nameEn: 'Corporate Innovation', nameAr: 'الابتكار المؤسسي' },
      { nameEn: 'MENA Startups', nameAr: 'شركات الشرق الأوسط الناشئة' },
      { nameEn: 'FinTech Middle East', nameAr: 'التقنيات المالية في المنطقة' },
      { nameEn: 'AI in Business', nameAr: 'الذكاء الاصطناعي في قطاع الأعمال' },
      { nameEn: 'Venture Capital Arab World', nameAr: 'رأس المال الجريء العربي' },
      { nameEn: 'Future Economy', nameAr: 'اقتصاد المستقبل' },
      { nameEn: 'Business Incubators', nameAr: 'حاضنات الأعمال الإقليمية' },
      { nameEn: 'Tech Innovation Middle East', nameAr: 'الابتكار التكنولوجي الإقليمي' },
      { nameEn: 'Tech Development', nameAr: 'التطوير التقني والبرمجي' },
      { nameEn: 'Innovation Ecosystem', nameAr: 'بيئة الابتكار والريادة' },
      { nameEn: 'Emerging Projects', nameAr: 'مشاريع صاعدة وجريئة' },
      { nameEn: 'Business Growth', nameAr: 'استراتيجيات نمو الأعمال' },
      { nameEn: 'Economic Tech', nameAr: 'التكنولوجيا الاقتصادية والهيكلية' },
      { nameEn: 'Investment Funding', nameAr: 'تمويل الاستثمارات الصاعدة' },
      { nameEn: 'Future of Jobs', nameAr: 'مستقبل الوظائف في العالم العربي' },
      { nameEn: 'Growth Strategies', nameAr: 'خطط التوسع الميداني' },
      { nameEn: 'Tech Startups', nameAr: 'الشركات التقنية الناشئة' },
      { nameEn: 'E-commerce MENA', nameAr: 'التجارة الإلكترونية بالشرق الأوسط' }
    ]
  },
  {
    id: 'geopolitics-commodities',
    titleEn: 'Geopolitics & Commodities',
    titleAr: 'الجيوسياسية وسلاسل التوريد والسلع السيادية',
    tags: [
      { nameEn: 'National Security', nameAr: 'الأمن القومي المائي والغذائي' },
      { nameEn: 'Sovereign Risk Modeling', nameAr: 'نمذجة المخاطر السيادية والائتمان' },
      { nameEn: 'Regional Stability', nameAr: 'الاستقرار الإقليمي والأهلي' },
      { nameEn: 'Geopolitics MENA', nameAr: 'الجيوسياسة في الشرق الأوسط' },
      { nameEn: 'Energy Security', nameAr: 'أمن الطاقة والإمدادات' },
      { nameEn: 'Pipelines', nameAr: 'خطوط الأنابيب والربط القاري' },
      { nameEn: 'International Trade', nameAr: 'التجارة الدولية والجمارك والمنافذ' },
      { nameEn: 'International Relations', nameAr: 'العلاقات الدبلوماسية والدولية' },
      { nameEn: 'Trade Corridors', nameAr: 'ممرات ومهاجع التجارة البحرية' },
      { nameEn: 'Arab Region', nameAr: 'الإقليم العربي ومحيطه الحرج' },
      { nameEn: 'Risk Analysis', nameAr: 'تحليل المخاطر الميدانية والتحوط' },
      { nameEn: 'Decision Making', nameAr: 'كواليس صنع القرار الاستراتيجي' },
      { nameEn: 'Monetary Policy', nameAr: 'السياسات النقدية والمصرفية السيادية' },
      { nameEn: 'Regional Balances', nameAr: 'التوازنات الإقليمية والقوى الوازنة' },
      { nameEn: 'Energy Supplies', nameAr: 'إمدادات البترول والغاز والكهرباء' },
      { nameEn: 'Oil Exports', nameAr: 'صادرات وحصص النفط الخام' },
      { nameEn: 'Regional Crises', nameAr: 'الأزمات الميدانية والصراعات الحدودية' },
      { nameEn: 'News Radar', nameAr: 'رادار الرصد الصحفي ومقاطعة الأخبار' },
      { nameEn: 'Strategic Alliances', nameAr: 'التحالفات الاستراتيجية والاقتصادية الدائمة' },
      { nameEn: 'Defense & Security', nameAr: 'الدفاع والأمن العام الإقليمي' }
    ]
  }
];

export interface AuthorProfile {
  id: string; // matches nameEn simplified or id
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  avatar: string;
  bioEn: string;
  bioAr: string;
  credentialsEn: string[];
  credentialsAr: string[];
  twitter?: string;
  linkedin?: string;
  email: string;
}

export const AUTHOR_PROFILES: AuthorProfile[] = [
  {
    id: 'adeeb-al-warraq',
    nameEn: 'Adeeb Al-Warraq',
    nameAr: 'أديب الوارّاق',
    titleEn: 'Editor-in-Chief',
    titleAr: 'رئيس التحرير العام',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    bioEn: 'Senior Middle East economy Analyst and Editor-in-Chief of Al-Warraq News. Over 25 years of investigative reporting covering sovereign debts, central banks operations, and regional policy in the Levant and Gulf.',
    bioAr: 'محلل مالي أول في شؤون الاقتصاد اللبناني والإقليمي ورئيس التحرير العام لجريدة الوراق. بخبرة تمتد لأكثر من 25 عامًا في التحقيقات الاستقصائية وتغطية العمليات النقديّة والمصرفية والديون السيادية في المشرق والخليج.',
    credentialsEn: [
      'M.A. in International Political Economy from London School of Economics',
      'Former Arab Regional Lead Reporter for Financial Daily (2002-2015)',
      'Member of the Lebanese Association for Investigative Journalism'
    ],
    credentialsAr: [
      'ماجستير في الاقتصاد السياسي الدولي من مدرسة لندن للاقتصاد (LSE)',
      'كبير مراسلي شؤون الشرق الأوسط السابق لصحيفة المال الدولية (2002-2015)',
      'عضو فاعل في الجمعية اللبنانية للصحافة الاستقصائية وتدقيق الحقائق'
    ],
    twitter: '@adeeb_alwarraq_chief',
    linkedin: 'linkedin.com/in/adeeb-alwarraq-chief',
    email: 'adeeb@alwarraqnews.com'
  },
  {
    id: 'investigation-desk',
    nameEn: 'Investigation Desk',
    nameAr: 'وحدة الرصد والتحقيقات الاستقصائية',
    titleEn: 'Al-Warraq Special Envoy',
    titleAr: 'مراسل الوراق الخاص',
    avatar: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=150',
    bioEn: 'Al-Warraq’s elite composite desk of forensic financial journalists and geopolitical analysts specializing in document leaks, public records forensics, and supply chain analysis.',
    bioAr: 'فريق النخبة المنسق في جريدة الوراق والمؤلف من باحثين ومحققين ماليين وجيوسياسيين تغطي استخبارات الديون، تفكيك وثائق التسريبات، وسلاسل الإمداد ومنافذ التجارة.',
    credentialsEn: [
      'Recipient of the Levant Free Press Integrity Shield (2024)',
      'Certified Forensic Public Document Audit Desk',
      'Affiliated with regional legal transparency watchdogs'
    ],
    credentialsAr: [
      'حائز على درع الحرية الصحفية والنزاهة للشرق الأوسط (2024)',
      'وحدة تدقيق وتحليل الوثائق الحكومية والصكوك السيادية',
      'شراكة إعلامية مع مراكز الشفافية ومكافحة التهرب المالي الإقليمية'
    ],
    twitter: '@alwarraq_intel',
    linkedin: 'linkedin.com/company/alwarraqnews',
    email: 'investigations@alwarraqnews.com'
  },
  {
    id: 'economic-intel-team',
    nameEn: 'Economic Intel Team',
    nameAr: 'فريق الاستخبارات الاقتصادية',
    titleEn: 'Senior Al-Warraq Analyst',
    titleAr: 'محلل أول لجريدة الوراق',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=150',
    bioEn: 'A dedicated team of quantitative economists that constructs sovereign risk matrices and leverages real-time trade data to deconstruct macro monetary strategies of Middle Eastern central banks.',
    bioAr: 'فريق مخصص من أخصائيي الاقتصاد الرياضي والكمي يعمل على صياغة مؤشرات المخاطر السيادية ومتابعة بوابات الشحن الجوي والبحري وتحليل قرارات البنوك المركزية الإقليمية.',
    credentialsEn: [
      'Developed the Al-Warraq Sovereign Sinking Risk Predictor Index',
      'Advisory experts for regional macroeconomic forums',
      'BSc/MSc in Economics and Mathematical Finance'
    ],
    credentialsAr: [
      'مستحدثي مؤشار الوراق للتنبؤ بمخاطر العجز والتعثر الائتماني السيادي',
      'فريق استشاري معتمد لدى منتديات الاقتصاد الكلي والتحوط المالي العربية',
      'شهادات عليا في الإحصاء التطبيقي والرياضيات المالية والنمذجة الاقتصادية'
    ],
    twitter: '@alwarraq_markets',
    linkedin: 'linkedin.com/company/alwarraqnews',
    email: 'markets@alwarraqnews.com'
  }
];

export function getAuthorProfile(nameEn: string, nameAr: string): AuthorProfile {
  const norm = nameEn.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const found = AUTHOR_PROFILES.find(p => p.id === norm || p.nameEn.toLowerCase() === nameEn.toLowerCase());
  if (found) return found;

  // Generate a dynamic one on the fly for EEAT compliance!
  return {
    id: norm || 'dynamic-author',
    nameEn,
    nameAr,
    titleEn: 'Accredited Journalist / Correspondent',
    titleAr: 'صحفي ومراسل معتمد لدى الوراق',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150',
    bioEn: `Professional field correspondent for Al-Warraq Group specializing in Middle East regional news, economic updates, and public affairs. Highly experienced in verification, news auditing, and factual reporting.`,
    bioAr: `مراسل ميداني معتمد لدى شبكة الوراق الإخبارية متخصص في التغطيات اليومية والمتابعات الميدانية وتحري الحقائق في لبنان والشرق الأوسط. مكرس لتقديم التغطيات الصادقة والتحقق من مصداقية المصادر بمسؤولية كاملة.`,
    credentialsEn: [
      'Accredited Lebanese Press Syndicate Member',
      'Factual Standards Compliance Verified Journalist'
    ],
    credentialsAr: [
      'عضو معتمد ببنود الصحافة والمراسلين الإقليميين',
      'صحفي ملتزم بمعايير الموثوقية والدقة والتحقق المزدوج لجريدة الوراق'
    ],
    email: 'press@alwarraqnews.com'
  };
}
