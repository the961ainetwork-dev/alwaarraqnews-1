import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Flame, 
  Activity, 
  Crosshair, 
  Compass, 
  Info, 
  AlertTriangle,
  Radio,
  Sliders,
  Sparkles,
  Clock,
  BookOpen,
  Search,
  Filter,
  CheckCircle,
  TrendingUp,
  Skull,
  Globe,
  FileText,
  Volume2,
  VolumeX,
  MapPin,
  Anchor,
  Zap,
  Lock,
  Unlock,
  MessageCircle
} from 'lucide-react';

interface WarRoomProps {
  language: 'ar' | 'en';
  layoutMode?: string;
}

interface TacticalDossier {
  id: string;
  codeName: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  contentEn: string;
  contentAr: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
  regionEn: string;
  regionAr: string;
  coordinates: string;
  dateEn: string;
  dateAr: string;
  sourceEn: string;
  sourceAr: string;
}

const TACTICAL_DOSSIERS: TacticalDossier[] = [
  {
    id: 'us-iran-escalation-ceasefire-2026',
    codeName: 'OPERATION BREAKING STORM',
    titleEn: 'US-Iran Military Tensions Escalate: Ceasefire and Peace Accord Under Imminent Collapse',
    titleAr: 'تصاعد التوترات العسكرية بين الولايات المتحدة وإيران وتهديد اتفاق وقف إطلاق النار',
    summaryEn: 'A dangerous military escalation in the Strait of Hormuz has triggered intense direct strikes between US forces and Iran, threatening the complete collapse of the historic ceasefire and MOU signed just 10 days ago.',
    summaryAr: 'شهدت منطقة مضيق هرمز تصعيداً عسكرياً خطيراً وتبادلاً مكثفاً للضربات بين القوات الأمريكية وإيران، مما يهدد بانهيار مذكرة التفاهم واتفاق وقف إطلاق النار الذي وُقّع قبل نحو 10 أيام فقط لإنهاء الحرب بين البلدين.',
    contentEn: `The Strait of Hormuz is witnessing a dangerous military escalation, marked by intense exchange of fire between US military assets and Iranian forces. This active crisis threatens to collapse the newly signed ceasefire agreement and memorandum of understanding (MOU) inked just 10 days ago to end the conflict. These updates come amid decisive warnings from US President Donald Trump of a return to full military measures if provocations do not halt.

### Chronological Timeline of the Military Escalation
- **Thursday (Initial Strike):** Tensions erupted when Iran deployed loitering munitions targeting commercial vessels in the Strait of Hormuz, including a Singapore-flagged cargo ship named "Ever Lovely" near the Omani coast.
- **Friday (First US Strike Wave):** US military aircraft launched retaliatory air strikes targeting Iranian missile and drone storage bunkers, alongside coastal radar sites around the Strait of Hormuz. The IRGC retaliated with artillery fire and strikes against US assets in the region.
- **Saturday Morning (Iranian Counter-strike):** The IRGC launched drone attacks on the "M/T Kiku" oil tanker carrying over 2 million barrels of crude oil, coinciding with strikes targeting assets in the Kingdom of Bahrain.
- **Saturday Night (Second US Strike Wave):** US forces executed a second round of air strikes, termed by President Trump as a "strong response." These targeted Iranian military surveillance infrastructure, command and control nodes, air defense sites, drone stockpiles, and mine-laying facilities.
- **Recent Developments:** Iran retaliated with drone and missile salvos targeting areas in Kuwait and Bahrain (verified by the Bahraini Ministry of Interior and Kuwaiti Army). The IRGC issued a warning that it would halt the peace process entirely and launch heavier attacks on shipping lanes.

### Key Geopolitical Statements
- **President Donald Trump (via Truth Social):** "We may reach a point where we can no longer deal rationally, and we will be forced militarily to complete the task we started with great success. If that happens, the Islamic Republic of Iran will no longer exist!" Trump described the attacks as a "stupid violation of the ceasefire agreement."
- **Vice President JD Vance:** "Violence will be met with violence. Iran signed the ceasefire agreement and we respected it. If they have disagreements on how to implement the MOU, they can pick up the phone and reach out, but violence will be met with violence."
- **The Islamic Revolutionary Guard Corps (IRGC):** Accused the "treaty-breaking American regime" of violating obligations and launching air strikes on Omani/Iranian coastal zones under false pretexts, warning that "any repeated aggression will be met with a wider and more extensive response."

### Strategic Context and Dimensions
- **A Fragile Accord:** This violent escalation occurs a mere 10 days after the signing of the historic MOU ending active hostilities and commencing diplomatic negotiations, an agreement previously characterized by Trump as an "unconditional surrender" by Tehran.
- **International Shipping Security:** US Central Command (CENTCOM) announced its forces remain highly vigilant, coordinating safe transit corridors, supporting commercial vessels crossing the Strait of Hormuz, and ensuring complete compliance with the agreement.
- **Future of the Conflict:** The international community is waiting to see whether backchannel diplomacy will calm the situation in the coming days, or if the region will slide back into an open, all-out war.`,
    contentAr: `شهدت منطقة مضيق هرمز تصعيداً عسكرياً خطيراً وتبادلاً مكثفاً للضربات بين القوات الأمريكية وإيران، مما يهدد بانهيار مذكرة التفاهم واتفاق وقف إطلاق النار الذي وُقّع قبل نحو 10 أيام فقط لإنهاء الحرب بين البلدين. وجاءت هذه التطورات وسط تهديدات حاسمة من الرئيس الأمريكي دونالد ترامب بالعودة إلى الخيار العسكري الكامل وتدمير النظام الإيراني إذا استمرت الاستفزازات.

### تفاصيل التسلسل الزمني للتصعيد العسكري
- **الخميس (الضربة الأولى):** بدأت الدورة الجديدة من التوترات بعدما أطلقت إيران طائرات مسيرة استهدفت سفناً تجارية في مضيق هرمز، من بينها سفينة شحن تحمل علم سنغافورة تُدعى "Ever Lovely" أثناء خروجها من المضيق بالقرب من الساحل العُماني.
- **الجمعة (الموجة الأمريكية الأولى):** شنت الطائرات العسكرية الأمريكية ضربات استهدفت مواقع تخزين الصواريخ والطائرات المسيرة الإيرانية، بالإضافة إلى محطات الرادار الساحلية حول مضيق هرمز. ورد الحرس الثوري الإيراني باستهداف مواقع تابعة لـ "الجيش الأمريكي" في المنطقة.
- **السبت صباحاً (الرد الإيراني):** هاجم الحرس الثوري بطائرة مسيرة ناقلة النفط "M/T Kiku" التي كانت تحمل أكثر من مليوني برميل من النفط الخام، بالتزامن مع توجيه ضربات لأهداف في مملكة البحرين.
- **السبت ليلاً (الموجة الأمريكية الثانية):** نفذت القوات الأمريكية جولة ثانية من الضربات وصفها ترامب بـ "الرد القوي"، واستهدفت البنية التحتية للمراقبة العسكرية الإيرانية، وأنظمة الاتصالات، ومواقع الدفاع الجوي، ومخازن المسيرات، وقدرات زرع الألغام.
- **التطورات الأخيرة:** ردت إيران بقصف صاروخي وبطائرات مسيرة استهدف الكويت والبحرين (وفقاً لوزارة الداخلية البحرينية والجيش الكويتي)، مع تهديد الحرس الثوري بوقف عملية السلام تماماً وشن هجمات أعنف على السفن.

### المواقف والتصريحات السياسية
- **الرئيس دونالد ترامب (عبر منصة Truth Social):** "قد نصل إلى نقطة لا نعود فيها قادرين على التعامل بعقلانية، وسنكون مجبرين عسكرياً على إكمال المهمة التي بدأناها بنجاح كبير. إذا حدث ذلك، فلن يكون للجمهورية الإسلامية الإيرانية وجود بعد الآن!" واصفاً الهجمات الإيرانية بأنها "انتهاك غبي لاتفاق وقف إطلاق النار".
- **نائب الرئيس جيه دي فانس:** "العنف سيقابل بالعنف. إيران وقعت على اتفاق وقف إطلاق النار ونحن احترمناه. إذا كان لديهم خلافات حول كيفية تطبيق مذكرة التفاهم، يمكنهم رفع سماعة الهاتف والتواصل، لكن العنف سيقابل بالعنف".
- **الحرس الثوري الإيراني (IRGC):** اتهم "النظام الأمريكي الناقض للعهود" بانتهاك التزاماته وشن ضربات جوية على السواحل الإيرانية تحت ذرائع واهية، محذراً من أن "أي اعتداء يتكرر سيقابل برد أكثر اتساعاً".

### السياق والأبعاد (لماذا يهم الأمر؟)
- **اتفاقية هشّة:** يأتي هذا التراشق العنيف بعد 10 أيام فقط من توقيع اتفاق ومذكرة تفاهم (MOU) لإنهاء الحرب وبدء المحادثات الدبلوماسية، وهو الاتفاق الذي وصفه ترامب سابقاً بأنه "استسلام غير مشروط" من قِبل الإيرانيين.
- **تأمين الملاحة الدولية:** أعلنت القيادة المركزية الأمريكية (CENTCOM) أن قواتها مستمرة في التواجد واليقظة لتنسيق الممر الآمن وتقديم الدعم للسفن التجارية العابرة لمضيق هرمز، وضمان الامتثال الكامل للاتفاقية.
- **مستقبل الصراع:** تترقب الأوساط الدولية ما إذا كانت الأيام القادمة ستشهد تهدئة دبلوماسية عبر القنوات الخلفية، أم أن المنطقة ستنزلق مجدداً نحو حرب شاملة ومفتوحة بناءً على التهديدات المتبادلة.`,
    threatLevel: 'CRITICAL',
    regionEn: 'Persian Gulf / Strait of Hormuz',
    regionAr: 'الخليج العربي / مضيق هرمز',
    coordinates: '26.56° N, 56.25° E',
    dateEn: 'June 28, 2026',
    dateAr: '٢٨ يونيو ٢٠٢٦',
    sourceEn: 'Al-Warraq Geopolitical Intelligence Bureau',
    sourceAr: 'مكتب الوراق للاستخبارات الجيوسياسية'
  },
  {
    id: 'hormuz-choke-blockade-2026',
    codeName: 'OPERATION BRASS ANCHOR',
    titleEn: 'Hormuz Strait Blockade Tactics & The Oil Bypass Shunts',
    titleAr: 'تكتيكات إغلاق مضيق هرمز ومسارات الالتفاف النفطي البديلة',
    summaryEn: 'An elite tactical assessment of Iranian naval blockade capabilities in the Strait of Hormuz, US anti-mine operations, and Gulf oil diversion logistics.',
    summaryAr: 'تقييم تكتيكي رفيع المستوى للقدرات البحرية الإيرانية على إغلاق مضيق هرمز، وعمليات مكافحة الألغام الأمريكية، ولوجستيات تحويل مسارات النفط الخليجية.',
    contentEn: `Following the dramatic escalation of maritime skirmishes in the Persian Gulf, military analysts at Al-Warraq have synthesized intelligence on the contested Strait of Hormuz checkpoint. The blockade threat is no longer a rhetorical leverage point but an active tactical reality.

### 1. Iranian Naval Strategy: Asymmetric Swarming & Subsea Mines
Iran's Islamic Revolutionary Guard Corps Navy (IRGCN) operates a decentralized coastal defense doctrine. Rather than conventional destroyers, Tehran deploys:
- **Asymmetric Swarm Boats:** High-speed catamaran vessels armed with short-range anti-ship missiles (C-704/C-802 derivatives) and heavy machine guns.
- **Subsea Minefields:** Smart influence mines (EM52/MDM series) anchored in the narrow shallow channels of the Strait (typically near Larak and Greater Tunb islands).
- **Loitering Munitions:** Coast-launched Shahed-136 suicide drones paired with Noor over-the-horizon radar-guided cruise missiles.

### 2. The US and Coalition Countermeasures: Operation Sentinel II
The US Fifth Fleet, headquartered in Bahrain, has activated a protective dome utilizing unmanned surface vessels (USVs) and advanced mine countermeasures:
- **Autonomous Mine Hunting:** Deploying Remus 600 autonomous underwater vehicles to map and neutralize subsea mines.
- **Air Defense Umbrellas:** Aegis-equipped destroyers operating in the Gulf of Oman, intercepting incoming drone swarms before they reach commercial shipping lanes.
- **Convoy Escort Protocols:** Implementing mandatory armed escorts for highly vulnerable crude oil tankers.

### 3. Gulf Power Bypass Initiatives: Rapid-Run Pipelines
To avoid the choke point entirely, Gulf states have accelerated infrastructure bypasses to transport crude directly to the Red Sea and Arabian Sea:
- **Abu Dhabi West-East Bypass:** The Habshan–Fujairah pipeline routing 1.5 million barrels/day directly to the Gulf of Oman.
- **Saudi East-West Petroline Expansion:** Upgrading the dual-conduit trans-peninsula pipeline to push maximum capacity toward Yanbu terminals.
- **The Arabian Rail Link:** Accelerated railway freight corridors bypassing the maritime choke nodes entirely.`,
    contentAr: `في أعقاب التصعيد الدراماتيكي للمناوشات البحرية في الخليج العربي، قام محللو الشؤون الاستراتيجية في صحيفة الوراق بتركيب وتجميع البيانات الاستخباراتية حول نقطة الاختناق المتنازع عليها في مضيق هرمز. لم يعد تهديد الإغلاق مجرد ورقة ضغط خطابية، بل تحول إلى واقع تكتيكي نشط وعملياتي.

### ١. الاستراتيجية البحرية الإيرانية: الزوارق السريعة والألغام الذكية
تعتمد القوة البحرية التابعة للحرس الثوري الإيراني عقيدة دفاع ساحلي لامركزية مفرطة. وبدلاً من المدمرات التقليدية الكبيرة، تنشر طهران:
- **أسراب الزوارق الهجومية السريعة:** قوارب كاتاماران فائقة السرعة مسلحة بصواريخ مضادة للسفن قصيرة المدى (مشتقات C-704 و C-802) ورشاشات ثقيلة.
- **حقول الألغام البحرية:** ألغام ذكية ذات تأثير قاعي (من طراز EM52 و MDM) راسية في الممرات الضيقة والضحلة للمضيق (تحديداً قرب جزيرتي لارك وطنب الكبرى).
- **المسيرات الانتحارية والصواريخ الجوالة:** طائرات "شاهد-١٣٦" انتحارية تطلق من الساحل بالتوازي مع صواريخ "نور" المجنحة الموجهة بالرادار خلف الأفق.

### ٢. التدابير المضادة للولايات المتحدة والتحالف الدولي
قامت الأسطول الأمريكي الخامس، ومقره المنامة، بتنشيط قبة دفاعية بحرية مستعينة بالمركبات المسيرة وأنظمة مكافحة الألغام المتطورة:
- **صيد الألغام الذاتي:** نشر غواصات مسيرة مستقلة من طراز Remus 600 لرصد وتحييد الألغام البحرية المخفية في القاع.
- **مظلات الدفاع الجوي الصاروخي:** عمل المدمرات المجهزة بنظام Aegis في بحر عمان لاعتراض أسراب الطائرات الانتحارية والصواريخ قبل وصولها لممرات الشحن الدولية.
- **بروتوكولات مرافقة القوافل النفطية:** تسيير دوريات عسكرية لمرافقة ناقلات النفط العملاقة الأكثر عرضة للاستهداف المباشر.

### ٣. مبادرات التفاف الطاقة الخليجية: خطوط الأنابيب البرية السريعة
لتفادي نقطة الاختناق بشكل كامل، سرعت الدول الخليجية استخدام وتوسيع خطوط الأنابيب البرية لنقل الخام مباشرة إلى البحر الأحمر وبحر العرب:
- **خط حبشان-الفجيرة (الإمارات):** ينقل حوالي ١.٥ مليون برميل يومياً مباشرة إلى ميناء الفجيرة على بحر عمان خارج الخليج العربي.
- **توسعة خط أنابيب شرق-غرب السعودي:** ترقية خطوط الأنابيب العملاقة لضخ أقصى طاقة استيعابية نحو مرافئ ينبع على البحر الأحمر.
- **شبكة سكة حديد الخليج المشتركة:** تسريع ربط حاويات البضائع الجافة لتعمل كبديل شحن سريع يتجاوز المضائق البحرية المهددة بالكامل.`,
    threatLevel: 'CRITICAL',
    regionEn: 'Persian Gulf / Strait of Hormuz',
    regionAr: 'الخليج العربي / مضيق هرمز',
    coordinates: '26.56° N, 56.25° E',
    dateEn: 'June 28, 2026',
    dateAr: '٢٨ يونيو ٢٠٢٦',
    sourceEn: 'Al-Warraq Geopolitical Intelligence Bureau',
    sourceAr: 'مكتب الوراق للاستخبارات الجيوسياسية'
  },
  {
    id: 'proxy-logistics-syria-iraq-2026',
    codeName: 'OPERATION COLD CONDUIT',
    titleEn: 'US-Iran Proxy Logistics & Strategic Transport Shunts',
    titleAr: 'لوجستيات المحاور بين أمريكا وإيران وممرات الإمداد البرية',
    summaryEn: 'An in-depth investigation of land bridges linking Western Iran through Iraq to Eastern Syria, and US coalition interdiction networks.',
    summaryAr: 'تحقيق متعمق في الممرات البرية التي تربط غرب إيران عبر العراق بشرق سوريا، وشبكات الحظر والاعتراض التابعة للتحالف بقيادة الولايات المتحدة.',
    contentEn: `Overland logistics supply chains form the spine of regional proxy capabilities. The strategic land corridor starting in Kermanshah, traversing Anbar province in Iraq, and terminating in Deir ez-Zor and Damascus represents the critical artery of supply:

### 1. The Land Bridge Logistics: Abu Kamal & Al-Qaim
The border crossing of Abu Kamal-Al-Qaim remains the primary operational nexus. Heavy transport trucks masquerading as civilian agricultural freight utilize secondary desert trails to transport hardware:
- **Secure Staging Areas:** Underground fortified storage depots dug beneath sandstone hills outside Meyadin.
- **Inter-Theater Transit:** Utilizing local proxy divisions to shield cargo transport between Iraqi border checkpoints and Western Syrian staging grounds.

### 2. US Forward Base Interdictions: Al-Tanf Garrison
The US military maintains a strategic footprint at the Al-Tanf Garrison, located inside Syria near the tri-border area (Syria, Jordan, Iraq):
- **30-Mile Exclusion Zone:** Controlling a tactical buffer zone that effectively blocks the southern desert highway route.
- **Preemptive Reconnaissance:** Utilizing long-range high-altitude drones (MQ-9 Reaper) to track heavy vehicles emerging from Iraqi borders and conducting targeted strikes on verified military shipments.
- **Partner Forces on the Ground:** Assisting local security forces in conducting desert sweeps to secure transport corridors from hostile reconnaissance.

### 3. Economic and Sanctions Shunts
Tehran has adapted to the high risk of air and land interdictions by creating complex public-private commercial fronts:
- **Industrial Barter Operations:** Swapping crude and petroleum products for machinery and medicine, avoiding SWIFT-based wire tracking entirely.
- **The Sovereign Clearinghouse:** Utilizing regional currency exchanges in Baghdad and Beirut to execute offshore dollar settlements in safe caches.`,
    contentAr: `تشكل سلاسل الإمداد اللوجستي البري العمود الفقري للقدرات العسكرية للمحاور الإقليمية. يمثل الممر الاستراتيجي الذي يبدأ من كرمانشاه مروراً بمحافظة الأنبار في العراق وينتهي في دير الزور ودمشق الشريان الأهم للإمداد الاستراتيجي:

### ١. لوجستيات الجسر البري: معبر البوكمال-القائم
يظل معبر البوكمال-القائم السوري العراقي نقطة الارتباط العملياتية الرئيسية. تستخدم شاحنات النقل الثقيل المموهة كشحن تجاري زراعي مسارات صحراوية ثانوية لنقل العتاد الحساس:
- **محطات التخزين المحصنة:** مستودعات تحت الأرض محفورة أسفل الهضاب الرملية في ريف الميادين لضمان عدم استهداف الشحنات.
- **تأمين النقل البيني:** تكليف فصائل محلية لتأمين وحراسة قوافل الشحن العابرة بين الحدود البرية العراقية ومستودعات التوزيع السورية.

### ٢. عمليات الاعتراض الجوي بقاعدة التنف الأمريكية
يحتفظ الجيش الأمريكي بوجود استراتيجي في حامية التنف الواقعة داخل الأراضي السورية قرب المثلث الحدودي (السوري الأردني العراقي):
- **منطقة حظر ممتدة بقطر ٣٠ ميلاً:** تسيطر القوة على منطقة أمان دائرية تمنع بشكل فعال مرور أي إمدادات عبر طريق الصحراء الجنوبي السريع.
- **الاستطلاع الاستباقي:** توظيف مسيرات الاستطلاع بعيدة المدى (MQ-9 Reaper) لتعقب حركة الشاحنات الضخمة فور خروجها من الحدود العراقية وتنفيذ ضربات جراحية دقيقة ضد الأهداف العسكرية المؤكدة.
- **دعم الشركاء المحليين:** تدريب فصائل أمنية محلية لتسيير دوريات صحراوية واسعة النطاق لقطع خطوط التسلل اللوجستي.

### ٣. الالتفاف الاقتصادي وتجنب تتبع العقوبات
تكيفت طهران مع المخاطر المرتفعة للاعتراض البري والجوي عبر خلق واجهات تجارية عامة وخاصة معقدة:
- **المقايضات الصناعية المباشرة:** استبدال المشتقات النفطية والوقود بالآلات والمعدات الطبية مما يلغي الحاجة لنظام التحويلات الدولي "سويفت".
- **المقاصات الإقليمية السيادية:** تشغيل شبكة معقدة من مكاتب الصرافة المعتمدة في بغداد وبيروت لتسوية الدفوعات المالية بالدولار عبر قنوات موازية آمنة.`,
    threatLevel: 'HIGH',
    regionEn: 'Syrian-Iraqi Desert Corridor',
    regionAr: 'البادية السورية العراقية',
    coordinates: '34.42° N, 40.91° E',
    dateEn: 'June 25, 2026',
    dateAr: '٢٥ يونيو ٢٠٢٦',
    sourceEn: 'Al-Warraq Geopolitical Intelligence Bureau',
    sourceAr: 'مكتب الوراق للاستخبارات الجيوسياسية'
  },
  {
    id: 'cyber-sanctions-evasion-2026',
    codeName: 'OPERATION SILICON SHIELD',
    titleEn: 'Digital Blockades: Cyber Warfare & Crypto-Sanctions Evasion',
    titleAr: 'حظر الرقمنة: الحرب السيبرانية والتملص الرقمي من العقوبات',
    summaryEn: 'An elite assessment of digital operations between the Pentagon Cyber Command and Tehran-sponsored advanced persistent threat groups.',
    summaryAr: 'تقييم رفيع المستوى للعمليات الرقمية والسيبرانية الدائرة بين القيادة السيبرانية للبنتاغون ومجموعات التهديد المتقدم طهران.',
    contentEn: `In parallel with kinetic deployment, the US-Iran war is heavily contested across digital networks. The financial system and industrial control networks serve as primary targets for strategic sabotage:

### 1. Tehran-backed Cyber Actors: Agrius & Mint Sandstorm
Tehran has mobilized skilled civilian-military hacking syndicates targeting sensitive critical infrastructure across the Western hemisphere:
- **Ransomware-as-Sabotage:** Utilizing wiper malware masked as industrial ransomware to paralyze seaport logistics and municipal water supplies.
- **Credential Harvesting:** Systematic cyber espionage targeting aerospace, marine freight logistics, and energy consulting firms to gain structural blueprints of alternative shipping routes.

### 2. US Cyber Command Operations: Active Defense & Infiltration
Under the doctrine of "Defend Forward," the US Cyber National Mission Force conducts persistent hunting operations within compromised remote systems:
- **Preemptive Disruption:** Planting digital blocks within known command-and-control command servers to neutralize threat campaigns before execution.
- **Joint Advisory Shields:** Partnering with regional financial clearinghouses to block illegal wire routes and detect crypto-mixers used by sanctioned entities.

### 3. Cryptocurrency Sanctions Evasion Protocols
To bypass standard banking controls, Iranian entities have developed robust alternative monetary pipelines:
- **Sovereign Mining Fields:** Allocating industrial energy grids to extract Bitcoin and other decentralized assets, turning domestic natural gas directly into global spending power.
- **DeFi Mixing Pools:** Leveraging decentralized finance protocols to obscure the path of digital funds before converting them to physical currencies in Asian hubs.`,
    contentAr: `بالتوازي مع التصعيد العسكري على الأرض، تدور رحى الحرب الأمريكية الإيرانية بضراوة شديدة عبر الفضاء السيبراني وشبكات البيانات الرقمية. وتعتبر الأنظمة المالية والتحكم الصناعي الهدف الأول لأعمال التخريب الاستراتيجي المتبادل:

### ١. الفاعلون السيبرانيون المدعومون من طهران: Mint Sandstorm
حركت طهران فرق قرصنة مدربة وممولة حكومياً تستهدف البنية التحتية الحيوية والحساسة في الدول الغربية الشريكة:
- **برمجيات التدمير المتخفية (Wipers):** نشر فيروسات مسح البيانات المتخفية كبرامج فدية لتعطيل موانئ الشحن ومحطات تحلية المياه والبلديات الخدمية.
- **تجميع وسرقة الهويات الرقمية:** حملات تجسس سيبراني منهجية تستهدف شركات الطيران والشحن البحري واستشارات الطاقة لسرقة المخططات الفنية للمسارات اللوجستية البديلة.

### ٢. عمليات القيادة السيبرانية الأمريكية (Cyber Command)
تحت عقيدة "الدفاع الاستباقي المتقدم"، تنفذ القوات السيبرانية الأمريكية عمليات ملاحقة واختراق مستمرة داخل الخوادم المعادية لمنع انطلاق الهجمات:
- **التعطيل الاستباقي للمخدمات:** ضرب وتعطيل خوادم القيادة والتحكم (C2) المستخدمة في إدارة هجمات برامج الفدية والتخريب قبل تفعيلها.
- **الحماية المشتركة للمقاصات المالية:** تقديم استشارات تقنية حية للمصارف الإقليمية لقطع مسارات التحويل غير القانونية ورصد الخلايا الرقمية للتحويلات المشبوهة.

### ٣. بروتوكولات التملص المالي باستخدام العملات الرقمية
لتجاوز القيود المصرفية التقليدية، أنشأت كيانات إيرانية قنوات مالية بديلة تعتمد بشكل كامل على تكنولوجيا العملات المشفرة:
- **مزارع التعدين السيادية:** تخصيص فائض شبكة الكهرباء ومحطات الغاز لتعدين البيتكوين والعملات الرقمية، مما يحول الغاز المحلي إلى سيولة نقدية عالمية فوراً.
- **مجمعات الخلط غير المركزية (DeFi Mixing):** استخدام أدوات التمويل اللامركزي المعقدة لتشويش وتعمية مسار التحويلات المالية قبل تسييلها في أسواق آسيوية مرنة.`,
    threatLevel: 'MODERATE',
    regionEn: 'Global Digital Space',
    regionAr: 'الفضاء الرقمي العالمي',
    coordinates: 'N/A (Cyber Realm)',
    dateEn: 'June 20, 2026',
    dateAr: '٢٠ يونيو ٢٠٢٦',
    sourceEn: 'Al-Warraq Cybersecurity Operations Unit',
    sourceAr: 'وحدة عمليات الأمن السيبراني بالورّاق'
  }
];

export default function WarRoom({ language, layoutMode = 'digital' }: WarRoomProps) {
  const isAr = language === 'ar';
  
  const [selectedDossierId, setSelectedDossierId] = useState<string>('us-iran-escalation-ceasefire-2026');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [threatFilter, setThreatFilter] = useState<string>('ALL');
  
  // Tactical telemetry display states
  const [blockadeRisk, setBlockadeRisk] = useState<number>(78);
  const [activeSensors, setActiveSensors] = useState<number>(14);
  const [straitStatus, setStraitStatus] = useState<'CONTRASTED' | 'BLOCKED' | 'NORMAL'>('CONTRASTED');

  const activeDossier = TACTICAL_DOSSIERS.find(d => d.id === selectedDossierId) || TACTICAL_DOSSIERS[0];

  // Calculate dynamic stats
  const getReadTimeEstimate = (content: string) => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / (isAr ? 150 : 200)));
    return {
      words,
      minutes,
      display: isAr 
        ? `${minutes} دقائق قراءة (${words.toLocaleString()} كلمة)` 
        : `${minutes} min read (${words.toLocaleString()} words)`
    };
  };

  const filteredDossiers = useMemo(() => {
    return TACTICAL_DOSSIERS.filter(d => {
      const matchesThreat = threatFilter === 'ALL' || d.threatLevel === threatFilter;
      
      const title = isAr ? d.titleAr : d.titleEn;
      const summary = isAr ? d.summaryAr : d.summaryEn;
      const content = isAr ? d.contentAr : d.contentEn;
      const codeName = d.codeName;
      
      const query = searchQuery.toLowerCase();
      const matchesSearch = !query || 
        title.toLowerCase().includes(query) || 
        summary.toLowerCase().includes(query) || 
        content.toLowerCase().includes(query) ||
        codeName.toLowerCase().includes(query) ||
        d.id.toLowerCase().includes(query);
        
      return matchesThreat && matchesSearch;
    });
  }, [threatFilter, searchQuery, isAr]);

  const activeEstimate = useMemo(() => {
    const content = isAr ? activeDossier.contentAr : activeDossier.contentEn;
    return getReadTimeEstimate(content);
  }, [activeDossier, isAr]);

  const toggleStraitSimulation = () => {
    if (straitStatus === 'NORMAL') {
      setStraitStatus('CONTRASTED');
      setBlockadeRisk(78);
      setActiveSensors(14);
    } else if (straitStatus === 'CONTRASTED') {
      setStraitStatus('BLOCKED');
      setBlockadeRisk(94);
      setActiveSensors(22);
    } else {
      setStraitStatus('NORMAL');
      setBlockadeRisk(24);
      setActiveSensors(8);
    }
  };

  const downloadDossierPDF = () => {
    const title = isAr ? activeDossier.titleAr : activeDossier.titleEn;
    const summary = isAr ? activeDossier.summaryAr : activeDossier.summaryEn;
    const content = isAr ? activeDossier.contentAr : activeDossier.contentEn;
    const date = isAr ? activeDossier.dateAr : activeDossier.dateEn;
    const source = isAr ? activeDossier.sourceAr : activeDossier.sourceEn;
    const codeName = activeDossier.codeName;
    const coordinates = activeDossier.coordinates;
    const threat = activeDossier.threatLevel;

    // 1. Open beautiful print window for saving as a custom styled PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>CLASSIFIED_DECREE_${activeDossier.id.toUpperCase()}</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Inter:wght@400;700;900&display=swap');
              body {
                font-family: 'Courier Prime', 'Inter', monospace;
                color: #000000;
                background-color: #ffffff;
                padding: 40px;
                line-height: 1.6;
                direction: ${isAr ? 'rtl' : 'ltr'};
              }
              .header {
                border-bottom: 3px double #000000;
                padding-bottom: 20px;
                margin-bottom: 30px;
              }
              .security-stamp {
                border: 3px solid #ff0000;
                color: #ff0000;
                display: inline-block;
                padding: 5px 15px;
                font-weight: bold;
                font-size: 14px;
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 2px;
              }
              .title {
                font-size: 24px;
                font-weight: 900;
                margin-top: 15px;
                margin-bottom: 10px;
                line-height: 1.2;
              }
              .meta-grid {
                display: grid;
                grid-template-cols: 1fr 1fr;
                gap: 10px;
                font-size: 11px;
                border: 1px solid #000;
                padding: 10px;
                margin-bottom: 25px;
                background-color: #f8f9fa;
              }
              .meta-item {
                margin-bottom: 4px;
              }
              .meta-label {
                font-weight: bold;
                color: #555;
              }
              .summary {
                font-style: italic;
                background-color: #f1f3f5;
                border-left: 4px solid #ff0000;
                padding: 15px;
                margin-bottom: 30px;
                font-size: 13px;
              }
              .content {
                font-size: 13px;
                white-space: pre-line;
              }
              h3 {
                font-size: 15px;
                border-bottom: 1px solid #000;
                padding-bottom: 5px;
                margin-top: 25px;
                text-transform: uppercase;
              }
              .footer {
                margin-top: 50px;
                border-top: 1px dashed #000;
                padding-top: 15px;
                font-size: 10px;
                text-align: center;
                color: #777;
              }
              @media print {
                body { padding: 20px; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="security-stamp">
                ${isAr ? 'سري للغاية // وثيقة استخباراتية' : 'SECRET // CLASSIFIED INTEL BRIEF'}
              </div>
              <div class="title">${title}</div>
            </div>

            <div class="meta-grid">
              <div class="meta-item"><span class="meta-label">${isAr ? 'رمز العملية:' : 'CODE NAME:'}</span> ${codeName}</div>
              <div class="meta-item"><span class="meta-label">${isAr ? 'تاريخ الرصد:' : 'INTERCEPT DATE:'}</span> ${date}</div>
              <div class="meta-item"><span class="meta-label">${isAr ? 'مستوى الخطورة:' : 'THREAT LEVEL:'}</span> ${threat}</div>
              <div class="meta-item"><span class="meta-label">${isAr ? 'الإحداثيات:' : 'COORDINATES:'}</span> ${coordinates}</div>
              <div class="meta-item" style="grid-column: span 2;"><span class="meta-label">${isAr ? 'مصدر التدفق:' : 'INTELLIGENCE AUTHORITY:'}</span> ${source}</div>
            </div>

            <div class="summary">
              <strong>${isAr ? 'الموجز التكتيكي:' : 'EXECUTIVE SUMMARY:'}</strong><br/>
              ${summary}
            </div>

            <div class="content">
              ${content}
            </div>

            <div class="footer">
              ${isAr ? 'وثيقة رسمية صادرة عن ديوان تحليلات الورّاق - ٢٠٢٦ ©' : 'OFFICIAL DISPATCH FROM AL-WARRAQ GEOPOLITICAL SUITE - 2026 ©'}
            </div>

            <script>
              window.onload = function() {
                window.print();
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }

    // 2. Fallback offline-ready dispatch text file download
    const fileContent = `
====================================================================
${isAr ? 'سري للغاية // وثيقة استخباراتية مغلقة' : 'SECRET // CLASSIFIED INTEL DISPATCH'}
====================================================================

${isAr ? 'عنوان الملف:' : 'SUBJECT:'} ${title}
${isAr ? 'رمز العملية:' : 'CODE NAME:'} ${codeName}
${isAr ? 'مستوى التهديد:' : 'THREAT LEVEL:'} ${threat}
${isAr ? 'تاريخ النشر:' : 'DATE OF INTERCEPT:'} ${date}
${isAr ? 'الإحداثيات الجغرافية:' : 'COORDINATES:'} ${coordinates}
${isAr ? 'المصدر:' : 'SOURCE AUTHORITY:'} ${source}

--------------------------------------------------------------------
${isAr ? 'الموجز الاستراتيجي:' : 'EXECUTIVE SUMMARY:'}
--------------------------------------------------------------------
${summary}

--------------------------------------------------------------------
${isAr ? 'التقرير التفصيلي:' : 'DETAILED INTEL BRIEFING:'}
--------------------------------------------------------------------
${content}

====================================================================
${isAr ? 'تنبيه: يحظر نشر هذه المواد خارج المنصات المعتمدة.' : 'NOTICE: EXPORTED FOR ARCHIVAL AND JOURNALISTIC PURPOSES ONLY.'}
====================================================================
    `;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AlWarraq_Briefing_${activeDossier.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="war-room-container" className="bg-[#0c0d0f] text-[#d4d4d8] min-h-screen border border-zinc-800 p-4 md:p-8 font-sans transition-all">
      {/* War Room Intelligence Header */}
      <div className="border-b border-zinc-800 pb-6 mb-8 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-[10px] font-mono font-extrabold text-red-500 tracking-widest uppercase">
              {isAr ? 'قناة اتصال مشفرة ومصنفة' : 'CLASSIFIED SITUATIONAL INTERCEPTED TRANSMISSION'}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-sans font-black text-white tracking-tight leading-none uppercase">
            {isAr ? 'غرفة الحرب الاستخباراتية' : 'Al-Warraq Geopolitical War Room'}
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 mt-2 max-w-2xl font-sans">
            {isAr 
              ? 'ديوان الرصد الفوري والتحليل العسكري للأزمة الدائرة بين إيران والولايات المتحدة وحلفائهما الإقليميين والنزاع البحري المستمر.' 
              : 'Real-time intercept mapping, naval doctrine assessments, and strategic logistical shunts concerning the ongoing US-Iran geopolitical conflict.'}
          </p>
        </div>

        {/* Header Widgets Container */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full xl:w-auto">
          {/* Visual Threat Level Gauge Widget */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-3 rounded-md flex items-center gap-4 text-xs font-mono select-none shadow-md flex-1 md:flex-none">
            <div className="relative w-16 h-10 flex items-center justify-center overflow-hidden">
              <svg className="w-16 h-16 absolute -bottom-8" viewBox="0 0 100 100">
                {/* Background Arc */}
                <path d="M 15,85 A 35,35 0 0,1 85,85" stroke="#27272a" strokeWidth="10" fill="none" strokeLinecap="round" />
                {/* Green (Moderate), Yellow (High), Red (Critical) sectors */}
                <path d="M 15,85 A 35,35 0 0,1 38,55" stroke="#10b981" strokeWidth="10" fill="none" />
                <path d="M 38,55 A 35,35 0 0,1 62,55" stroke="#f59e0b" strokeWidth="10" fill="none" />
                <path d="M 62,55 A 35,35 0 0,1 85,85" stroke="#ef4444" strokeWidth="10" fill="none" />
                
                {/* Dynamic needle based on TACTICAL_DOSSIERS[0].threatLevel (which is CRITICAL) */}
                <line 
                  x1="50" 
                  y1="85" 
                  x2={
                    TACTICAL_DOSSIERS[0].threatLevel === 'CRITICAL' ? "80" :
                    TACTICAL_DOSSIERS[0].threatLevel === 'HIGH' ? "50" : "20"
                  } 
                  y2={
                    TACTICAL_DOSSIERS[0].threatLevel === 'CRITICAL' ? "70" :
                    TACTICAL_DOSSIERS[0].threatLevel === 'HIGH' ? "50" : "70"
                  } 
                  stroke="#ffffff" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  className="origin-[50px_85px]" 
                />
                <circle cx="50" cy="85" r="5.5" fill="#ffffff" />
              </svg>
            </div>
            <div>
              <span className="text-zinc-500 block uppercase text-[8px] font-black tracking-widest">{isAr ? 'مقياس التوتر العسكري الحرج' : 'MILITARY TENSION GAUGE'}</span>
              <span className="text-red-500 font-extrabold text-[11px] tracking-wider uppercase flex items-center gap-1.5 mt-0.5 animate-pulse">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block"></span>
                {isAr ? `الحالة الحالية: ${TACTICAL_DOSSIERS[0].threatLevel}` : `CURRENT STATUS: ${TACTICAL_DOSSIERS[0].threatLevel}`}
              </span>
            </div>
          </div>

          {/* Telemetry quick status */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded flex items-center gap-4 text-xs font-mono select-none flex-1 md:flex-none">
            <div>
              <span className="text-zinc-500 block uppercase text-[9px]">{isAr ? 'مؤشر خطورة المضيق' : 'HORMA CHOKE RISK'}</span>
              <span className="text-red-500 font-bold text-base">{blockadeRisk}%</span>
            </div>
            <div className="h-8 w-px bg-zinc-800"></div>
            <div>
              <span className="text-zinc-500 block uppercase text-[9px]">{isAr ? 'أجهزة الرصد الحية' : 'ACTIVE INTERCEPTS'}</span>
              <span className="text-amber-500 font-bold text-base">{activeSensors}</span>
            </div>
            <div className="h-8 w-px bg-zinc-800"></div>
            <div>
              <span className="text-zinc-500 block uppercase text-[9px]">{isAr ? 'حالة المضيق' : 'STRAIT STATUS'}</span>
              <button 
                onClick={toggleStraitSimulation}
                className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold cursor-pointer transition-all ${
                  straitStatus === 'BLOCKED' ? 'bg-red-950 text-red-400 border border-red-800' :
                  straitStatus === 'CONTRASTED' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                  'bg-emerald-950 text-emerald-400 border border-emerald-800'
                }`}
              >
                {straitStatus} ↻
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Dossier Selector & Controls (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Filtering & Search Controls */}
          <div className="bg-[#121418] border border-zinc-800 p-4 rounded-md space-y-3">
            <h3 className="text-xs font-mono font-bold text-zinc-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Sliders size={12} className="text-red-500" />
              <span>{isAr ? 'تصفية الملفات التكتيكية' : 'BRIEF SEARCH & FILTER'}</span>
            </h3>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={isAr ? 'ابحث في الملفات...' : 'Search intercept briefs...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded text-xs py-2 px-3 pl-8 rtl:pl-3 rtl:pr-8 focus:outline-none focus:border-red-500 font-mono transition-colors"
              />
              <Search size={13} className="absolute left-2.5 top-2.5 text-zinc-500 rtl:left-auto rtl:right-2.5" />
            </div>

            {/* Threat Level Buttons */}
            <div className="flex gap-1.5 text-[10px] font-mono">
              {['ALL', 'CRITICAL', 'HIGH', 'MODERATE'].map((level) => (
                <button
                  key={level}
                  onClick={() => setThreatFilter(level)}
                  className={`flex-1 py-1 rounded cursor-pointer border transition-all ${
                    threatFilter === level 
                      ? 'bg-red-950 text-red-400 border-red-700 font-black' 
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {level === 'ALL' ? (isAr ? 'الكل' : 'ALL') : level}
                </button>
              ))}
            </div>
          </div>

          {/* Dossier Item List */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-black text-zinc-400 tracking-wider uppercase flex items-center gap-2">
              <Radio size={14} className="text-red-500 animate-pulse" />
              <span>{isAr ? 'ملفات رصد الحرب الإيرانية الأمريكية' : 'DOSSIERS: IRAN-US WAR'}</span>
            </h3>

            {filteredDossiers.length === 0 ? (
              <div className="border border-dashed border-zinc-800 p-6 text-center text-xs text-zinc-500 font-mono">
                {isAr ? 'لا يوجد ملفات مطابقة للبحث.' : 'No active intercepts match query.'}
              </div>
            ) : (
              filteredDossiers.map((dossier) => {
                const isActive = dossier.id === selectedDossierId;
                const dTitle = isAr ? dossier.titleAr : dossier.titleEn;
                const dSummary = isAr ? dossier.summaryAr : dossier.summaryEn;
                const dRegion = isAr ? dossier.regionAr : dossier.regionEn;
                const estimate = getReadTimeEstimate(isAr ? dossier.contentAr : dossier.contentEn);

                return (
                  <button
                    key={dossier.id}
                    onClick={() => setSelectedDossierId(dossier.id)}
                    className={`w-full text-left rtl:text-right p-4 rounded-md border transition-all duration-250 flex flex-col gap-2.5 cursor-pointer relative group overflow-hidden ${
                      isActive 
                        ? 'bg-[#15181d] border-red-600/70 shadow-[0_0_12px_rgba(239,68,68,0.15)] text-white' 
                        : 'bg-[#101215] border-zinc-800 text-zinc-300 hover:bg-[#12151a] hover:border-zinc-700'
                    }`}
                  >
                    {/* Lateral indicator indicator */}
                    <div className={`absolute top-0 bottom-0 left-0 w-1 transition-all ${
                      isActive ? 'bg-red-600' : 'bg-transparent group-hover:bg-zinc-700'
                    }`} />

                    <div className="flex justify-between items-center text-[9px] font-mono select-none">
                      <span className="font-extrabold text-red-500 bg-red-950/40 px-1.5 py-0.5 border border-red-900/60 rounded">
                        {dossier.codeName}
                      </span>
                      <span className={`font-black uppercase px-1 py-0.5 rounded ${
                        dossier.threatLevel === 'CRITICAL' ? 'text-red-400 bg-red-950' :
                        dossier.threatLevel === 'HIGH' ? 'text-amber-400 bg-amber-950' :
                        'text-emerald-400 bg-emerald-950'
                      }`}>
                        {dossier.threatLevel}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-sans font-bold text-xs md:text-sm leading-snug group-hover:text-white transition-colors">
                        {dTitle}
                      </h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 font-sans leading-relaxed">
                        {dSummary}
                      </p>
                    </div>

                    <div className="border-t border-dashed border-zinc-800 pt-2 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={8} className="text-zinc-400" />
                        {dRegion}
                      </span>
                      <span className="flex items-center gap-1 text-[#b91c1c]">
                        <Clock size={8} />
                        {estimate.minutes} min
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Tactical Overlay Widget */}
          <div className="bg-[#101215] border border-zinc-800 p-4 rounded-md">
            <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase mb-3 flex items-center gap-1.5 select-none">
              <Compass size={13} className="text-red-500 animate-spin-slow" />
              <span>{isAr ? 'مخطط تكتيكي للمضيق والعمق' : 'HORMA SECTOR PATROL PLOT'}</span>
            </h4>
            
            {/* Custom SVG Radar/Mapping Graphic */}
            <div className="bg-zinc-950 rounded border border-zinc-800 p-4 flex flex-col items-center justify-center relative overflow-hidden h-36">
              <svg className="w-full h-full text-red-500/10 absolute inset-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.3" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.3" />
                {/* Simulated Radar Sweep Line */}
                <line x1="50" y1="50" x2="100" y2="10" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" className="origin-center animate-[spin_4s_linear_infinite]" />
              </svg>
              
              {/* Map Pins / Targets */}
              <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-ping"></span>
                <span className="text-[7px] font-mono text-zinc-500 mt-0.5">LARAK_ISL</span>
              </div>
              <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center">
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                <span className="text-[7px] font-mono text-zinc-500 mt-0.5">TUNB_SDR</span>
              </div>
              <div className="absolute top-1/2 right-1/2 flex flex-col items-center">
                <span className="h-1.5 w-1.5 bg-red-600 rounded-full animate-ping"></span>
                <span className="text-[7px] font-mono text-red-500 mt-0.5">USN_PATROL</span>
              </div>

              <div className="z-10 text-center pointer-events-none">
                <span className="text-[10px] font-mono uppercase font-black text-red-400 block tracking-widest">
                  {straitStatus === 'BLOCKED' ? '⚠️ MILITARY BLOCKADE DETECTED' : 
                   straitStatus === 'CONTRASTED' ? '⚡ ELEVATED MILITARY FRICTION' : 
                   '✓ NORMAL FREIGHT FLOW'}
                </span>
                <span className="text-[8px] font-mono text-zinc-500 block mt-1">
                  GRID SEC_4 - 26.56° N, 56.25° E
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Immersive Dossier Reader (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="bg-[#121418] border border-zinc-800 rounded-md p-6 md:p-8 space-y-6 relative">
            
            {/* Header elements */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-5 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 select-none">
                  <span className="text-red-500 font-mono text-xs font-extrabold bg-red-950/60 px-2 py-0.5 border border-red-900/60 rounded">
                    {activeDossier.codeName}
                  </span>
                  <span className="text-zinc-500 font-mono text-[10px]">
                    {activeDossier.coordinates}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-sans font-black text-white leading-tight">
                  {isAr ? activeDossier.titleAr : activeDossier.titleEn}
                </h2>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-mono select-none">
                <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-1 rounded">
                  {isAr ? activeDossier.dateAr : activeDossier.dateEn}
                </span>
                
                {/* Download PDF button */}
                <button
                  onClick={downloadDossierPDF}
                  className="bg-red-950/60 hover:bg-red-900 border border-red-800 hover:border-red-600 text-red-200 hover:text-white px-2.5 py-1 rounded flex items-center gap-1.5 transition-all cursor-pointer text-[10px] font-extrabold uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                  title={isAr ? 'تحميل كملف PDF' : 'Download PDF Brief'}
                >
                  <FileText size={11} className="text-red-400" />
                  <span>{isAr ? 'تنزيل PDF' : 'Download PDF'}</span>
                </button>

                {/* Share on WhatsApp link */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    (isAr ? 'إيجاز استخباري عاجل من الوراق: ' : 'Urgent Al-Warraq Geopolitical Intercept: ') +
                    (isAr ? activeDossier.titleAr : activeDossier.titleEn) +
                    ' - ' + (isAr ? activeDossier.summaryAr : activeDossier.summaryEn) +
                    ' Read more in the War Room.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 hover:border-emerald-600 text-emerald-200 hover:text-white px-2.5 py-1 rounded flex items-center gap-1.5 transition-all cursor-pointer text-[10px] font-extrabold uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                  title={isAr ? 'مشاركة عبر واتساب' : 'Share on WhatsApp'}
                >
                  <MessageCircle size={11} className="text-emerald-400" />
                  <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
                </a>
              </div>
            </div>

            {/* Read Time Summary alert */}
            <div className="p-3 bg-red-950/20 border-r-2 border-red-600 rounded flex flex-col md:flex-row md:items-center justify-between gap-2.5 select-text">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono font-extrabold text-red-400 block uppercase tracking-wider">
                  {isAr ? '● تفاصيل الملف وزمن المطالعة' : '● DOSSIER METRICS & INTERCEPT ESTIMATE'}
                </span>
                <p className="text-xs text-white font-sans italic">
                  {isAr ? activeDossier.summaryAr : activeDossier.summaryEn}
                </p>
              </div>
              <div className="shrink-0 text-right md:text-left font-mono text-[10px] text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
                <span className="text-red-500 font-extrabold">{activeEstimate.minutes} min read</span>
                <span className="block text-[8px] text-zinc-500 mt-0.5">{activeEstimate.words} {isAr ? 'كلمة' : 'words'}</span>
              </div>
            </div>

            {/* Immersive content reader */}
            <div className="text-white space-y-5 font-sans leading-relaxed text-base md:text-lg border-b border-zinc-800 pb-6 prose prose-invert max-w-none select-text">
              {(isAr ? activeDossier.contentAr : activeDossier.contentEn).split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('###')) {
                  const headingText = paragraph.replace('###', '').trim();
                  return (
                    <h3 key={index} className="text-white font-sans font-black text-sm md:text-base tracking-tight uppercase border-b border-zinc-800 pb-1 pt-3">
                      {headingText}
                    </h3>
                  );
                }
                if (paragraph.startsWith('-')) {
                  return (
                    <ul key={index} className="list-disc pl-5 rtl:pl-0 rtl:pr-5 space-y-1.5 my-2 text-white font-sans text-sm md:text-base font-normal">
                      {paragraph.split('\n').map((item, i) => {
                        const cleanItem = item.replace(/^[-\s*]+/, '').trim();
                        // Bold parsing (renders as normal weight per user's plain/not bold request)
                        const boldParts = cleanItem.split('**');
                        if (boldParts.length > 2) {
                          return (
                            <li key={i} className="font-normal text-white">
                              <span className="text-white font-normal">{boldParts[1]}</span>
                              {boldParts.slice(2).join('')}
                            </li>
                          );
                        }
                        return <li key={i} className="font-normal text-white">{cleanItem}</li>;
                      })}
                    </ul>
                  );
                }

                // Parse inline formatting (renders as normal weight per user's plain/not bold request)
                const parts = paragraph.split('**');
                if (parts.length > 2) {
                  return (
                    <p key={index} className="leading-relaxed text-white font-normal">
                      {parts.map((p, pIdx) => {
                        if (pIdx % 2 === 1) {
                          return <span key={pIdx} className="text-white font-normal">{p}</span>;
                        }
                        return p;
                      })}
                    </p>
                  );
                }

                return (
                  <p key={index} className="leading-relaxed text-white font-normal">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Footnote / Authority Signatures */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono text-zinc-500 gap-3 select-none">
              <div className="flex items-center gap-1.5">
                <Shield size={12} className="text-red-500" />
                <span>
                  {isAr ? `المصدر: ${activeDossier.sourceAr}` : `Authority Source: ${activeDossier.sourceEn}`}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>{isAr ? 'رقم ترخيص الاستخبارات:' : 'INTERCEPT NO:'}</span>
                <span className="text-zinc-400">#WAR-RM-{activeDossier.id.substring(0, 8).toUpperCase()}</span>
              </div>
            </div>

            {/* Warning Footer Notice */}
            <div className="bg-[#1b1214] border border-red-950/60 p-3 rounded text-[10.5px] font-mono text-red-400 leading-relaxed flex gap-2 select-none">
              <AlertTriangle size={14} className="shrink-0 text-red-500 mt-0.5" />
              <p>
                {isAr 
                  ? 'تنبيه عسكري: البيانات الواردة في هذه الصفحة مستقاة من رادارات بحرية ومصادر استخباراتية حية لجريدة الوراق. أي استغلال للمعلومات لغير أغراض التوثيق الصحفي يخضع لقوانين العقوبات الفيدرالية.' 
                  : 'Sovereign Warning: Telemetry data herein is synthesized from naval radar sweeps and local assets. Information is intended strictly for credentialed archival and journalism analysis.'}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* FULL WIDTH HIGH IMPACT CTA SECTION */}
      <div className="mt-12 border-4 border-double border-red-800 bg-zinc-950 p-6 md:p-8 text-white relative overflow-hidden shadow-[8px_8px_0px_rgba(220,38,38,0.1)] rounded-none text-left rtl:text-right" id="war-room-page-cta">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[9px] uppercase tracking-widest font-bold">
              <Sparkles size={11} className="text-amber-400 animate-pulse" />
              <span>{isAr ? 'الاشتراك الاستراتيجي الممتاز' : 'SOVEREIGN DIRECT INTELLIGENCE SUITE'}</span>
            </div>
            <h3 className="font-sans font-black text-xl md:text-3xl text-white tracking-tight uppercase leading-none">
              {isAr ? 'تلقَّ البرقيات الاستخباراتية الفورية على واتساب مباشرة' : 'Receive Direct Tactical Intercepts Straight to Your WhatsApp'}
            </h3>
            <p className="text-zinc-300 text-xs md:text-sm font-sans leading-relaxed">
              {isAr 
                ? 'انضم إلى شبكة المستشارين وصناع القرار لتلقي تحديثات فورية حول تحركات الجيوش، إغلاق المضائق البحرية، والأزمات الجيوسياسية فور حدوثها مباشرة على هاتفك.'
                : 'Accelerate your situational awareness. Get direct military dispatches, naval corridor threat levels, and priority diplomatic overrides forwarded straight to your WhatsApp as they are decrypted.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <a 
              href="https://api.whatsapp.com/send?phone=1234567890&text=I%20want%20to%20subscribe%20to%20Al-Warraq%20Geopolitical%20Direct%20Briefings"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-extrabold text-xs px-6 py-4 uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[4px_4px_0px_#064e3b]"
            >
              <MessageCircle size={15} />
              <span>{isAr ? 'تفعيل خدمة واتساب العاجلة' : 'Activate WhatsApp Dispatches'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
