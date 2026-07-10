// Client-side fetch interceptor & robust mock API service
// Catches /api/* endpoints on static hosting environments to eliminate console 404 errors completely

// Robust Polyfills for localStorage and sessionStorage in iframe sandbox environments
class MemoryStorage implements Storage {
  private store: { [key: string]: string } = {};

  get length(): number {
    return Object.keys(this.store).length;
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] !== undefined ? this.store[key] : null;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return index >= 0 && index < keys.length ? keys[index] : null;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }
}

if (typeof window !== 'undefined') {
  let safeLocalStorage: any = null;
  let safeSessionStorage: any = null;

  // Safe probe of localStorage
  try {
    const test = window.localStorage;
    if (test) {
      test.getItem('__probe_storage_test__');
      safeLocalStorage = test;
    } else {
      throw new Error('localStorage is null');
    }
  } catch (e) {
    console.warn('[Mock API] localStorage is restricted/blocked in this sandbox. Injecting MemoryStorage polyfill.', e);
  }

  // Safe probe of sessionStorage
  try {
    const test = window.sessionStorage;
    if (test) {
      test.getItem('__probe_storage_test__');
      safeSessionStorage = test;
    } else {
      throw new Error('sessionStorage is null');
    }
  } catch (e) {
    console.warn('[Mock API] sessionStorage is restricted/blocked in this sandbox. Injecting MemoryStorage polyfill.', e);
  }

  // Inject localStorage mock if needed
  if (!safeLocalStorage) {
    const memoryStorage = new MemoryStorage();
    try {
      Object.defineProperty(window, 'localStorage', {
        get: () => memoryStorage,
        configurable: true,
        enumerable: true
      });
    } catch (e) {
      try {
        Object.defineProperty(Window.prototype, 'localStorage', {
          get: () => memoryStorage,
          configurable: true,
          enumerable: true
        });
      } catch (err) {
        console.error('[Mock API] Failed to override window.localStorage:', err);
      }
    }
  }

  // Inject sessionStorage mock if needed
  if (!safeSessionStorage) {
    const memoryStorage = new MemoryStorage();
    try {
      Object.defineProperty(window, 'sessionStorage', {
        get: () => memoryStorage,
        configurable: true,
        enumerable: true
      });
    } catch (e) {
      try {
        Object.defineProperty(Window.prototype, 'sessionStorage', {
          get: () => memoryStorage,
          configurable: true,
          enumerable: true
        });
      } catch (err) {
        console.error('[Mock API] Failed to override window.sessionStorage:', err);
      }
    }
  }
}

function generateMockSentimentData(keyword: string) {
  const isArKeyword = /[\u0600-\u06FF]/.test(keyword);
  
  const kwAr = isArKeyword ? keyword : `استقصاء ${keyword}`;
  const kwEn = isArKeyword ? `Insight on ${keyword}` : keyword;

  const isGeopoliticalQuery = /israel|lebanon|negotiation|ceasefire|border|clash|security|annex|إسرائيل|لبنان|مفاوضات|حدود|أمني|سلام|اتفاق/i.test(keyword);

  if (isGeopoliticalQuery) {
    const feed = [
      // X (Twitter)
      {
        platform: "X",
        userHandle: "@nadimb_tech",
        userName: "Nadim Bou-Ghanem",
        originalText: "Optimistic about the border stabilization. If the security guarantees hold and refugees can finally return safely, this is the first real step to peace. The 14-point framework provides a viable pathway.",
        summaryEn: "Expressed optimism about border stability, security guarantees, and the return of refugees via the 14-point framework.",
        summaryAr: "أبدى تفاؤلاً بشأن استقرار الحدود، والضمانات الأمنية، وعودة النازحين من خلال الاتفاق الإطاري المكون من 14 نقطة.",
        sentiment: "positive",
        score: 0.75,
        topics: ["ceasefire", "peace", "repatriation"],
        url: "https://x.com/nadimb_tech/status/1726501",
        timestamp: "2 hours ago"
      },
      {
        platform: "X",
        userHandle: "@samer_k_economy",
        userName: "Samer Khoury",
        originalText: "Article 13 is an absolute disaster for Lebanese legal sovereignty. We are literally surrendering our right to hold anyone accountable for war crimes in international courts just to secure a fragile deal. PM Nawaf Salam must answer for this legal compromise!",
        summaryEn: "Critiqued Article 13 of the agreement as a surrender of legal sovereignty and rights to international prosecution.",
        summaryAr: "انتقد المادة 13 من الاتفاق واصفاً إياها بالتنازل عن السيادة القانونية وحق الملاحقة القضائية الدولية.",
        sentiment: "negative",
        score: -0.85,
        topics: ["article-13", "sovereignty", "legal-surrender"],
        url: "https://x.com/samer_k_economy/status/1726558",
        timestamp: "4 hours ago"
      },

      // Facebook
      {
        platform: "Facebook",
        userHandle: "rola.haddad.business",
        userName: "Rola Haddad",
        originalText: "A historic opportunity for reconstruction. International funds will flow again, and Alfred Alfa/MTC networks can finally rebuild the telecom grid in southern Lebanon. A secure framework is better than infinite war.",
        summaryEn: "Highlighted the economic and reconstruction opportunities for telecom networks under the security framework.",
        summaryAr: "سلطت الضوء على فرص إعادة الإعمار وتدفق الصناديق لتأهيل شبكات الاتصالات في جنوب لبنان.",
        sentiment: "positive",
        score: 0.8,
        topics: ["reconstruction", "funding", "stability"],
        url: "https://facebook.com/rola.haddad/posts/99150",
        timestamp: "6 hours ago"
      },
      {
        platform: "Facebook",
        userHandle: "lebanon.telecom.watch",
        userName: "Lebanon Telecom Monitor",
        originalText: "How can we agree to a Secret Security Annex that gives Israeli jets operational freedom over our airspace? This isn't a peace deal, it's a structural occupation disguised as diplomacy. Absolute lack of transparency from the government.",
        summaryEn: "Condemned the Secret Security Annex for codifying foreign airspace access and lacking democratic transparency.",
        summaryAr: "أدان الملحق الأمني السري لمنحه الطيران الأجنبي حرية التحرك والعمل وغياب الشفافية الديمقراطية.",
        sentiment: "negative",
        score: -0.9,
        topics: ["security-annex", "airspace", "transparency"],
        url: "https://facebook.com/telecom.watch/posts/10085",
        timestamp: "8 hours ago"
      },

      // LinkedIn
      {
        platform: "LinkedIn",
        userHandle: "charbel-y-telecom",
        userName: "Charbel Yazbeck",
        originalText: "From a sovereign risk assessment perspective, the US-mediated framework shifts the geopolitical rating of Lebanon from 'unstable' to 'fragile but managed'. Corporate clients are carefully auditing the legal safety of rebuilding critical telecom and subsea cables.",
        summaryEn: "Analyzed the shift in sovereign risk rating and noted corporate caution regarding infrastructure investment legalities.",
        summaryAr: "حلل تحول تصنيف المخاطر السيادية ودعا للحذر الاستثماري بشأن البنية التحتية والاتصالات وكابلات البحر.",
        sentiment: "neutral",
        score: 0.15,
        topics: ["risk-assessment", "geopolitics", "infrastructure"],
        url: "https://linkedin.com/posts/charbel-y-telecom_1085",
        timestamp: "12 hours ago"
      },
      {
        platform: "LinkedIn",
        userHandle: "mona-atallah-legal",
        userName: "Mona Atallah",
        originalText: "The legal paradox of Nawaf Salam's administration: A former ICJ president who fought for international justice is now presiding over a framework that bars his own nation from seeking international judicial remedy. A tough pill for legal scholars.",
        summaryEn: "Highlighted the legal paradox of a former ICJ president presiding over a waiver of international legal recourse.",
        summaryAr: "أبرزت المفارقة القانونية لرئيس سابق لمحكمة العدل الدولية يترأس تنازلاً عن سبل الانتصاف القانوني الدولي.",
        sentiment: "negative",
        score: -0.7,
        topics: ["legal-paradox", "icj", "governance"],
        url: "https://linkedin.com/posts/mona-atallah_5120",
        timestamp: "1 day ago"
      },

      // Instagram
      {
        platform: "Instagram",
        userHandle: "beirut_tech_scene",
        userName: "Beirut Tech Scene",
        originalText: "Visualizing peace and safety at the southern border. Families are packing bags to return to Tyre and Nabatieh. The hope for permanent stability after months of fear is palpable. Let's rebuild! 🕊️🇱🇧",
        summaryEn: "Shared images showing hopeful border return preparations and community excitement about regional reconstruction.",
        summaryAr: "عرض صوراً تظهر الاستعدادات لعودة النازحين وتطلع المجتمعات المحلية لإعادة بناء الجنوب اللبناني.",
        sentiment: "positive",
        score: 0.85,
        topics: ["hope", "border-return", "peace"],
        url: "https://instagram.com/p/C8o9VbzIe_geo",
        timestamp: "14 hours ago"
      },
      {
        platform: "Instagram",
        userHandle: "ecogreen_leb",
        userName: "EcoGreen Lebanon",
        originalText: "Monitoring the UNEF patrol stations along the Blue Line. While the diplomatic signing happened in Washington, the real verification happens on the ground. Vetting pilot zones will take months. 📡🇱🇧",
        summaryEn: "Stressed that physical verification along the Blue Line and vetting pilot zones will require months of field telemetry.",
        summaryAr: "أكد أن عملية التحقق الميداني وتدقيق مناطق الانتشار التجريبية على طول الخط الأزرق ستتطلب شهوراً.",
        sentiment: "neutral",
        score: 0.05,
        topics: ["unef", "blue-line", "verification"],
        url: "https://instagram.com/p/C8p2Ky8Xy_geo",
        timestamp: "18 hours ago"
      },
    ];

    const topicsCloud = [
      { text: "lebanon-israel deal", weight: 10 },
      { text: "security annex", weight: 9 },
      { text: "article 13 waiver", weight: 9 },
      { text: "border ceasefire", weight: 8 },
      { text: "sovereignty", weight: 8 },
      { text: "nawaf salam", weight: 7 },
      { text: "reconstruction", weight: 7 },
      { text: "blue line", weight: 6 },
      { text: "airspace access", weight: 6 },
      { text: "pilot zones", weight: 5 },
    ];

    return {
      feed,
      globalSentimentScore: -12, // Volatile/divided public sentiment
      topicsCloud
    };
  }

  const feed = [
    // X (Twitter)
    {
      platform: "X",
      userHandle: "@nadimb_tech",
      userName: "Nadim Bou-Ghanem",
      originalText: `Extremely excited to see the latest infrastructure upgrades. Connecting decentralized local grids with satellite constellations for ${kwEn} represents a real leap toward sovereign internet. Minimal packet loss.`,
      summaryEn: `Sovereign technological leaps observed in regional hubs. Minimal latency parameters achieved.`,
      summaryAr: `تقدم تكنولوجي سيادي ملحوظ في المراكز الإقليمية مع تسجيل فترات تأخير دنيا ومعدلات ممتازة لنقل البيانات.`,
      sentiment: "positive",
      score: 0.9,
      topics: ["infrastructure", "satellite", "telecom"],
      url: "https://x.com/nadimb_tech/status/1726001",
      timestamp: "2 hours ago"
    },
    {
      platform: "X",
      userHandle: "@samer_k_economy",
      userName: "Samer Khoury",
      originalText: "The expansion of elite corporate satellite access while keeping individual digital subscriptions strictly illegal is typical centralized policy. High costs of deployment are prohibitive.",
      summaryEn: "Critique of asymmetric pricing schemes and high initial deployment expenditures for institutional bandwidth.",
      summaryAr: "انتقادات حادة موجهة لتفاوت تسعير الباقات الطارئة والاحتكار التجاري في غياب الاشتراكات الفردية.",
      sentiment: "negative",
      score: -0.8,
      topics: ["pricing", "centralization", "policy"],
      url: "https://x.com/samer_k_economy/status/1726058",
      timestamp: "4 hours ago"
    },

    // Facebook
    {
      platform: "Facebook",
      userHandle: "rola.haddad.business",
      userName: "Rola Haddad",
      originalText: `The latest reports suggest that ${kwEn} is continuing to pioneer high-bandwidth offshore integrations. If true, this represents a crucial backup for financial and engineering teams across the country.`,
      summaryEn: "Exploration of high-bandwidth contingency relays reinforcing national business continuity.",
      summaryAr: "رصد لمسارات الاتصال عالية العرض الفعالة في تأمين خطة طوارئ مستدامة للشركات الوطنية.",
      sentiment: "positive",
      score: 0.75,
      topics: ["business", "redundancy", "sovereign"],
      url: "https://facebook.com/rola.haddad/posts/99104",
      timestamp: "6 hours ago"
    },
    {
      platform: "Facebook",
      userHandle: "lebanon.telecom.watch",
      userName: "Lebanon Telecom Monitor",
      originalText: "تجاوز المراسيم والآليات الإشرافية المعتادة دون تدقيق فني سيادي يقرع أجراس الخطر حول سيادة البيانات الوطنية اللبنانية.",
      summaryEn: "National monitoring group raises severe digital sovereignty warnings regarding unauthorized cross-border routing.",
      summaryAr: "أجهزة وهيئات مستقلة تثير مخاوف حول سيادة البيانات ومرور حركة البيانات عبر محطات وأجواء أجنبية.",
      sentiment: "negative",
      score: -0.7,
      topics: ["sovereignty", "compliance", "oversight"],
      url: "https://facebook.com/telecom.watch/posts/10052",
      timestamp: "8 hours ago"
    },

    // LinkedIn
    {
      platform: "LinkedIn",
      userHandle: "charbel-y-telecom",
      userName: "Charbel Yazbeck",
      originalText: `Fascinated by how ${kwEn} is navigating the lack of standard legislative protocols. By utilizing robust local sub-licensing entities like Alfa and sovereign local hubs, they are making micro-progress despite structural stagnation.`,
      summaryEn: "Strategic analysis of regulatory workarounds and decentralized legal setups yielding continuous operational growth.",
      summaryAr: "تحليل استراتيجي للالتفاف البنيوي على الفراغ القانوني وتفعيل تراخيص طوارئ مؤقتة عبر كيانات سيادية معتمدة.",
      sentiment: "neutral",
      score: 0.2,
      topics: ["regulatory", "growth", "networks"],
      url: "https://linkedin.com/posts/charbel-y-telecom_1048",
      timestamp: "12 hours ago"
    },
    {
      platform: "LinkedIn",
      userHandle: "mona-atallah-legal",
      userName: "Mona Atallah",
      originalText: `Integrating complex global satellite architectures for ${kwEn} without a modern local Personal Data Protection Law (to replace the obsolete Law 81/2018) is a blind leap of faith. Corporate clients must audit their traffic independent of administrative claims.`,
      summaryEn: "Legal expert urges enterprise client-side encryption audits to mitigate standard telemetry exposures.",
      summaryAr: "مستشارة قانونية تدعو الشركات الكبرى لتفعيل لجان تشفير خاصة موازية لمعالجة غياب سلطة حماية البيانات.",
      sentiment: "negative",
      score: -0.65,
      topics: ["legal-vacuum", "encryption", "privacy"],
      url: "https://linkedin.com/posts/mona-atallah_5098",
      timestamp: "1 day ago"
    },

    // Instagram
    {
      platform: "Instagram",
      userHandle: "beirut_tech_scene",
      userName: "Beirut Tech Scene",
      originalText: `Checking the actual hardware terminals and dish arrays deployed. Speed test metrics are averaging 180Mbps download! Amazing telemetry result. Visualizing the satellite grid from above. 🌐📡`,
      summaryEn: "Field hardware audit showcases excellent satellite download capacity, confirming strong telemetry spikes.",
      summaryAr: "معاينة مرئية لأجهزة الاستقبال الفضائية تؤكد تحقيق سرعات فائقة تصل إلى 180 ميجابت للتحميل الفوري.",
      sentiment: "positive",
      score: 0.85,
      topics: ["hardware", "telemetry", "speed-test"],
      url: "https://instagram.com/p/C8o9VbzIe",
      timestamp: "14 hours ago"
    },
    {
      platform: "Instagram",
      userHandle: "ecogreen_leb",
      userName: "EcoGreen Lebanon",
      originalText: "While the technological leap is fantastic, let us not ignore the high visual pollution and energy offsets of heavy terminal operations under continuous diesel generator reliance.",
      summaryEn: "Environmental feedback highlighting structural overheads of high density off-grid diesel generation.",
      summaryAr: "ملاحظات بيئية تركز على الاحتياج العالي للطاقة والمولدات لتشغيل محطات الاتصال في ظل أزمة الطاقة المستمرة.",
      sentiment: "neutral",
      score: -0.1,
      topics: ["energy", "environment", "grid-offsets"],
      url: "https://instagram.com/p/C8p2Ky8Xy",
      timestamp: "18 hours ago"
    },
  ];

  // Pick topics from keyword
  const topicsCloud = [
    { text: "digital sovereignty", weight: 9 },
    { text: keyword.toLowerCase(), weight: 8 },
    { text: "satellite integration", weight: 8 },
    { text: "data localized", weight: 7 },
    { text: "cyber resilience", weight: 7 },
    { text: "law 81/2018", weight: 6 },
    { text: "national security", weight: 6 },
    { text: "infrastructure friction", weight: 5 },
    { text: "emergency warrant", weight: 5 },
    { text: "beirut digital scene", weight: 4 },
  ];

  return {
    feed,
    globalSentimentScore: 28, // Balanced realistic positive-neutral-leaning score
    topicsCloud
  };
}

if (typeof window !== 'undefined') {
  const originalFetch = window.fetch;
  const mockFetch = async function (input: RequestInfo | URL, init?: RequestInit) {
    try {
      if (input) {
        const url = typeof input === 'string' ? input : (input instanceof URL ? input.href : input.url);
        
        // 1. Intercept GET /api/news/custom
        if (url && url.includes('/api/news/custom')) {
          console.log('[Mock API Interceptor] Handled /api/news/custom');
          return new Response(JSON.stringify([]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // 2. Intercept GET /api/newsletter/generate
        if (url && url.includes('/api/newsletter/generate')) {
          console.log('[Mock API Interceptor] Handled /api/newsletter/generate');
          
          const response = {
            curation: [
              {
                id: "mou-bypass-curated",
                category: "resource-friction",
                headlineEn: "MOU BYPASS SECURED: ARCHITECTING REGIONAL LOGISTIC REDUNDANCY PIPELINES",
                headlineAr: "تدشين ممر التفتيت اللوجستي: إستراتيجية تجاوز المضائق البحرية في مذكرة تفاهم واشنطن وطهران",
                synopsisEn: "The newly signed US-Iran memorandum consolidates alternative trade bypass vectors. Key infrastructure focuses include expanding Saudi Arabia's East-West Petroline and developing integrated Arabian Rail Networks to offset critical shipping choke points.",
                synopsisAr: "شهدت تفاهمات واشنطن وطهران الأخيرة بلورة قنوات للنقل الرديف بعيداً عن المضائق البحرية الحساسة. تتركز الخطة على تدعيم مشروع الربط الحديدي العربي وتوسيع خط أنابيب شرق-غرب السعودي الممتد لتفادي أي احتكاك لوجستي مكلف.",
                ctaEn: "ANALYZE FRICTION",
                ctaAr: "تحليل الاحتكاك اللوجستي",
                url: "https://alwarraqnews.com/section/markets"
              },
              {
                id: "lebanon-bdd-curated",
                category: "lebanon",
                headlineEn: "BEIRUT DIGITAL DISTRICT (BDD): HARNESSING DISTRIBUTED COGNITIVE INFRASTRUCTURE",
                headlineAr: "بيروت الرقمية (BDD): إطلاق مبادرة الحوسبة الموزعة لتأجير عقول الغد التقنية بلبنان",
                synopsisEn: "Beirut's premier tech hub BDD registers record levels of software engineering growth despite regional power constraints, offering decentralized sovereign databases and decentralized cloud compute platforms for global developers.",
                synopsisAr: "أعلنت منطقة بيروت الرقمية (BDD) عن تقدم إنتاجي قياسي في تشغيل شبكات البرمجة واستضافة خوادم سيادية موزعة، مستفيدة من حلول الطاقة المستدامة ومراكز الاتصال اللامركزية للتغلب على التحديات المحيطة.",
                ctaEn: "OBSERVE TELEMETRY",
                ctaAr: "راقب القياس الميداني",
                url: "https://alwarraqnews.com/section/lebanon"
              },
              {
                id: "arabian-net-curated",
                category: "technology",
                headlineEn: "THE INTEGRATED ARABIAN RAILWAY: COUPLING MEGAPROJECT CONNECTIVITY ACROSS GCC",
                headlineAr: "قاطرة المستقبل: الربط السككي الخليجي الموحد يرسم معالم ممر التبادل التجاري الضخم",
                synopsisEn: "GCC states accelerate construction of high-speed heavy rail linkage corridors. Analysts forecast the unified network will slash freight transit times between Red Sea ports and the Arabian Gulf by forty-five percent.",
                synopsisAr: "شهد مشروع السكك الحديدية الموحد بدول الخليج وثبة تنفيذية لتفعيل مسارات النقل الثقيل الفائق. يؤكد محللون أن الربط المصلحي سيخفض زمن العبور اللوجستي للبضائع بين موانئ البحر الأحمر والخليج العربي بنسبة الثلثين.",
                ctaEn: "TRACK SINGULARITY",
                ctaAr: "تتبع نقطة التحول",
                url: "https://alwarraqnews.com/section/middle-east"
              }
            ]
          };
          
          return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // 3. Intercept POST /api/sentiment/analyze
        if (url && url.includes('/api/sentiment/analyze')) {
          console.log('[Mock API Interceptor] Handled /api/sentiment/analyze');
          
          let keyword = 'Beirut Digital District';
          if (init && init.body) {
            try {
              const bodyData = JSON.parse(init.body as string);
              if (bodyData && bodyData.keyword) {
                keyword = bodyData.keyword;
              }
            } catch (e) {}
          }

          const mockResult = generateMockSentimentData(keyword);
          return new Response(JSON.stringify(mockResult), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    } catch (e) {
      console.warn('[Mock API Interceptor] Error intercepting fetch, using native fallback:', e);
    }

    // Pass through all other fetches using standard native fallback correctly bound to window/global
    return originalFetch.call(window, input, init);
  };

  try {
    Object.defineProperty(window, 'fetch', {
      value: mockFetch,
      writable: true,
      configurable: true
    });
  } catch (err) {
    console.warn('[Mock API] Object.defineProperty failed, trying direct property assignment fallback:', err);
    try {
      (window as any).fetch = mockFetch;
    } catch (err2) {
      console.error('[Mock API] Critical: Direct assign also failed:', err2);
    }
  }
}

export {};
