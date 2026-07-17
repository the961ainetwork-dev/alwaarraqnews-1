import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  MessageCircle,
  QrCode,
  Link,
  Check
} from 'lucide-react';
import { Article } from '../types';
import { BypassInteractiveMap } from './BypassInteractiveMap';

interface WarRoomProps {
  language: 'ar' | 'en';
  layoutMode?: string;
  selectedDossierId?: string;
  onSelectDossier?: (id: string) => void;
  onOpenQrShare?: (url: string) => void;
  latestBreaking?: Article | null;
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
    id: 'strait-of-fire-2026',
    codeName: 'OPERATION FIRE STRAIT',
    titleEn: 'Strait of Fire: The Collapse of the Ceasefire and Ignition of the Spark',
    titleAr: 'مضيق النار: انهيار الهدنة واشتعال الشرارة',
    summaryEn: 'A sovereign intelligence deep-dive on the active collapse of the 60-day maritime ceasefire in the Strait of Hormuz, outlining the breakdown of the MOU, subsequent US Tomahawk cruise missile strikes, and Iranian counter-attacks targeting regional US installations.',
    summaryAr: 'تقرير استخباري سيادي مفصل حول انهيار الهدنة البحرية المؤقتة في مضيق هرمز ومسار التصعيد العسكري المفتوح بعد ضربات التوماهوك وتصريحات قادة الطرفين.',
    contentEn: `In the heart of complete darkness, where the raging waves of the Gulf clash, embracing the scent of salt and the heavy smell of oil, the Strait of Hormuz stood as a global artery pulsing with black gold, surrounded by the ghosts of a war that had not yet ended. What once began as a surgical US military campaign aimed at paralyzing Iranian missile capabilities and destroying what remained of its nuclear ambitions has now turned radically into an open, blazing conflict over the world's most critical energy chokepoint.

In the hallways of the White House, maps were spread out, and faces were grim, preparing for what could become an exchange of fire that lasts for days, if not weeks. The length and severity of this new campaign hung by a thin thread waiting for Tehran's next moves. In the corridors of intelligence and the Pentagon, a single conviction crystallized, expressed by a US official in a sharp, unequivocal phrase: "We will give them a strong slap so they realize we are not playing at all."

Diplomacy stumbled and promises of peace faded. The strategy of "military pressure" returned to the forefront of President Trump's policy. The 60-day truce, documented by the Memorandum of Understanding (MOU), evaporated like a drop of water on a hot tin plate.

President Trump announced with clear decisiveness that the ceasefire was "over," after the quiet waters turned into a theater of fire exchanges following Iranian attacks targeting commercial vessels. The MOU clearly stated that Iran would allow safe passage for ships, but Tehran quickly accused Washington of violating the agreement by directing vessels toward a southern shipping lane near Omani shores without Iranian approval.

### Iranian Internal Anger and the Influence Dilemma
Behind the scenes, fire was burning in the hearts of the divided Iranian leadership. The hardline faction was seething with frustration; the MOU had brought them no real gains. Despite exemptions from US sanctions, Tehran stood unable to sell its oil, as financial institutions shivered at the thought of passing any transactions, and nations were reluctant to rely on temporary exemptions.

It did not stop there; frozen Iranian funds remained locked in foreign vaults due to Tehran not taking the conditioned nuclear steps. Moreover, the US-sponsored framework agreement between Israel and Lebanon made the "Lebanese part" of the MOU useless. With hundreds of oil tankers successfully slipping through the Strait by taking a southern route close to Oman, Tehran felt its strongest leverage card—control of Hormuz—slipping through its fingers.

"They started shooting, so we decided it was time to slap them hard," a US official stated, adding confidently: "It is a gradual process. We have patience, and if we do not get the deal we want, we will not move forward."

### Tomahawk Storm and Counter-Reaction
The American response was not delayed. On a memorable night, US cruise missiles launched like angry meteors to strike two railway bridges in northeastern Iran, marking the first time Iranian infrastructure was hit since April 8th.

The next day, the circle of hell expanded. US strikes targeted military coastal radars, anti-ship missile sites, and air defense systems along the southern Iranian coast, turning the skies of Bandar Abbas, Sirik, Chabahar, and Lavan Island into a canvas of flames and smoke. US Central Command (CENTCOM) explicitly declared that it was holding Iran accountable for its "unprovoked aggression" to guarantee freedom of navigation.

Tehran did not stand idle. In the dead of night, sirens pierced the silence of the Kingdom of Bahrain's skies, while the Kuwaiti Army declared alert for its air defense systems to intercept swarms of drones and hostile missiles launched from Iranian territory targeting US bases there.

On platform X, the chief Iranian negotiator, Mohammad Baqer Qalibaf, threatened with the arrogance of a warrior: "If you strike, you will be struck. The Strait of Hormuz will only be opened by 'Iranian arrangements,' not by American threats."

### From Aboard Air Force One
While missiles crossed paths in the skies of the Middle East, President Trump watched the scene from aboard Air Force One. He hinted to reporters, with a mix of condescension and anticipation, that Iranian officials "called a little while ago, they want to make a deal."

Despite Tehran not confirming this contact, Trump did not hesitate to issue his scathing judgment: "I don't know if they deserve to make a deal. I don't know if they would respect the agreement... they are kind of crazy, let's be honest." Warning on Truth Social that any new targeting of commercial vessels would be met with a response "that will be much worse!"

### Calculations of Power and Oil
The central American goal has become clear: keeping the Strait open and securing navigation for the stability of global energy markets. In Washington, the administration feels a tactical comfort and more space for escalation. Oil is still flowing; hundreds of tankers have crossed the Strait successfully in recent weeks, calming the administration's fears of an oil shock or a crazy spike in oil prices.

Amidst this chaos, Vice President Vance summarized the US stance in clear, unambiguous terms: "The position is simple: the Strait of Hormuz must remain open. If they try to close it, there will be a response from the US military... they can either comply with that, or face what happened to them last night. This will continue to happen until they open that passage and stop shooting at ships."

Thus, the waters of Hormuz stand today as witness to an extremely dangerous game of chess, where the roar of the waves mixes with the sound of cannons, and the fate of the world's most critical artery remains suspended between Tehran's stubbornness and Washington's anger, in an open war whose end is known only to God.`,
    contentAr: `في قلب الظلام الدامس، حيث تتلاطم أمواج الخليج العاتية محتضنةً عبق الملح ورائحة النفط الثقيلة، كان "مضيق هرمز" يقف كشريانٍ عالمي ينبض بالذهب الأسود، تحيط به أشباح حربٍ لم تضع أوزارها بعد. ما بدأ ذات يوم كحملة عسكرية أمريكية جراحية تهدف إلى شل القدرات الصاروخية الإيرانية وتدمير ما تبقى من طموحاتها النووية، تحول الآن، وبشكل جذري، إلى صراعٍ مفتوح ومستعر على أهم نقطة اختناق للطاقة في العالم.

في أروقة البيت الأبيض، كانت الخرائط ممددة، والوجوه عابسة، استعداداً لما قد يصبح تبادلاً لإطلاق النار يستمر لأيام، بل لأساميع. طول هذه الحملة الجديدة وقسوتها باتا معلقين بخيط رفيع ينتظر التحركات التالية لطهران. وفي أروقة الاستخبارات والبنتاغون، تبلورت قناعة واحدة عبر عنها مسؤول أمريكي بعبارة حادة لا تقبل التأويل، قائلاً: "سنوجه لهم صفعة قوية ليدركوا أننا لا نعبث مطلقاً".

تعثرت الدبلوماسية وتلاشت وعود السلام. وعادت استراتيجية "الضغط العسكري" لتتصدر المشهد في سياسة الرئيس ترامب. لقد تبخرت الهدنة التي استمرت ستين يوماً، والتي وثقتها مذكرة التفاهم (MOU)، كقطرة ماء سقطت على صفيح ساخن.
أعلن الرئيس ترامب، بصرامة واضحة، أن وقف إطلاق النار قد "انتهى"، وذلك بعد أن تحولت المياه الهادئة إلى مسرح لتبادل النيران إثر هجمات إيرانية استهدفت سفناً تجارية. كانت مذكرة التفاهم تنص بوضوح على أن تسمح إيران بمرور آمن للسفن، لكن طهران سرعان ما اتهمت واشنطن بانتهاك الاتفاق عبر توجيه السفن نحو ممر ملاحي جنوبي بالقرب من السواحل العمانية دون موافقة إيرانية.

### غضب الداخل الإيراني وعقدة النفوذ
خلف الكواليس، كانت النيران تشتعل في صدور القيادة الإيرانية المنقسمة. الجناح المتشدد كان يغلي إحباطاً؛ فمذكرة التفاهم لم تجلب لهم أي مكاسب حقيقية. ورغم الإعفاءات من العقوبات الأمريكية، وقفت طهران عاجزة عن بيع نفطها، إذ ارتعدت المؤسسات المالية من فكرة تمرير أي معاملات، وكانت الدول مترددة في الاعتماد على إعفاءات مؤقتة.

ولم يتوقف الأمر عند هذا الحد، فالأموال الإيرانية المجمدة ظلت حبيسة الخزائن الأجنبية لعدم اتخاذ طهران الخطوات النووية المشروطة. كما أن الاتفاق الإطاري الذي رعته الولايات المتحدة بين إسرائيل ولبنان جعل "الشق اللبناني" من مذكرة التفاهم غير ذي جدوى. ومع نجاح مئات ناقلات النفط في التسلل عبر المضيق متخذة مساراً جنوبياً قريباً من عمان، شعرت طهران بأن ورقة ضغطها الأقوى—السيطرة على هرمز—تنسل من بين أصابعها.

"لقد بدأوا بإطلاق النار، فقررنا أنه حان الوقت لصفعهم بقوة"، هكذا صرح مسؤول أمريكي، مضيفاً بثقة: "إنها عملية متدرجة. نحن نمتلك الصبر، وإذا لم نحصل على الصفقة التي نريدها، فلن نمضي قدماً".

### عاصفة التوماهوك ورد الفعل المضاد
لم يتأخر الرد الأمريكي، ففي ليلة مشهودة، انطلقت صواريخ كروز الأمريكية كشهبٍ غاضبة لتدك جسرين للسكك الحديدية في شمال شرق إيران، لتكون تلك المرة الأولى التي تُضرب فيها البنية التحتية الإيرانية منذ الثامن من أبريل.

وفي اليوم التالي، اتسعت دائرة الجحيم. استهدفت الضربات الأمريكية رادارات ساحلية عسكرية، ومواقع صواريخ مضادة للسفن، ومنظومات دفاع جوي على امتداد الساحل الجنوبي الإيراني، محولةً سماء "بندر عباس"، و"سيريك"، و"جابهار"، و"جزيرة لاوان" إلى لوحة من اللهب والدخان. وأعلنت القيادة المركزية الأمريكية (CENTCOM) صراحة أنها تحاسب إيران على "عدوانها غير المبرر" لضمان حرية الملاحة.

لم تقف طهران مكتوفة الأيدي. وفي جنح الليل، مزقت صفارات الإنذار صمت سماء مملكة البحرين، بينما أعلن الجيش الكويتي استنفار دفاعاته الجوية للتصدي لأسراب من الطائرات المسيرة والصواريخ المعادية التي انطلقت من الأراضي الإيرانية لاستهداف القواعد الأمريكية هناك.

على منصة (X)، وقف كبير المفاوضين الإيرانيين، محمد باقر قليباف، متوعداً بغطرسة المحارب: "إن ضربتم، ستُضربون. مضيق هرمز لن يُفتح إلا بـ'ترتيبات إيرانية'، وليس بتهديدات أمريكية".

### من على متن "إير فورس وان"
وبينما كانت الصواريخ تتقاطع في سماء الشرق الأوسط، كان الرئيس ترامب يراقب المشهد من على متن طائرة الرئاسة الأمريكية (Air Force One). ألمح للصحفيين بنبرة تحمل مزيجاً من التعالي والترقب إلى أن مسؤولين إيرانيين "اتصلوا قبل قليل، إنهم يريدون إبرام صفقة".

ورغم عدم تأكيد طهران لهذا التواصل، لم يتردد ترامب في إطلاق حكمه اللاذع: "لا أعرف ما إذا كانوا يستحقون إبرام صفقة. لا أعرف ما إذا كانوا سيحترمون الاتفاق... إنهم مجانين نوعاً ما، لنكن صادقين". محذراً عبر منصة "تروث سوشيال" من أن أي استهداف جديد للسفن التجارية سيُقابل بردٍ "سيكون أسوأ بكثير!".

### حسابات القوة والنفط
الهدف الأمريكي المركزي بات واضحاً: إبقاء المضيق مفتوحاً وتأمين الملاحة لاستقرار أسواق الطاقة العالمية. وفي واشنطن، تشعر الإدارة بأريحية تكتيكية وبمساحة أكبر للتصعيد. فالنفط لا يزال يتدفق؛ ومئات الناقلات عبرت المضيق بنجاح في الأسابيع الأخيرة، مما هدأ من روع الإدارة بشأن حدوث صدمة أو ارتفاع جنوني في أسعار النفط.

وفي خضم هذه الفوضى، لخص نائب الرئيس فانس الموقف الأمريكي بكلمات قاطعة لا لبس فيها: "الموقف بسيط: يجب أن يبقى مضيق هرمز مفتوحاً. إذا حاولوا إغلاقه، فسيكون هناك رد من الجيش الأمريكي... يمكنهم إما الالتزام بذلك، أو مواجهة ما حدث لهم الليلة الماضية. سيستمر هذا الأمر في الحدوث حتى يفتحوا ذلك الممر ويتوقفوا عن إطلاق النار على السفن".

وهكذا، تقف مياه هرمز اليوم شاهدة على لعبة شطرنج بالغة الخطورة، حيث يختلط هدير الأمواج بأصوات المدافع، ويبقى مصير الشريان الأهم في العالم معلقاً بين عناد طهران، وغضب واشنطن، في حرب مفتوحة لا يعلم نهايتها إلا الله.`,
    threatLevel: 'CRITICAL',
    regionEn: 'Strait of Hormuz / Iran / USA',
    regionAr: 'مضيق هرمز / إيران / الولايات المتحدة',
    coordinates: '26.56° N, 56.25° E',
    dateEn: 'July 9, 2026',
    dateAr: '٩ يوليو ٢٠٢٦',
    sourceEn: 'Al-Warraq Diplomatic & Military Intercept Unit',
    sourceAr: 'وحدة الرصد العسكري والدبلوماسي بالورّاق'
  },
  {
    id: 'gulf-explosive-clash-2026',
    codeName: 'OPERATION BRASS HAMMER',
    titleEn: 'All-Out Clash Ignites the Gulf, Burying the MOU: Trump Tests Erdoğan at NATO, While Millions Gather in Najaf & Karbala Preparing for Hour of Decision',
    titleAr: 'الاشتباك الناري الشامل يشعل الخليج ويدفن مذكرة التفاهم... ترامب يختبر أردوغان في الناتو، والملايين في النجف وكربلاء يمهدون لساعة القرار بعد "مشهد"',
    summaryEn: 'Regional escalation erupted into full-scale conflict today, marking the active collapse of the Washington-Tehran MOU on its 21st day. Heavy US airstrikes targeted over 80 sites in southern Iran, met by a massive Iranian retaliatory swarm of ballistic missiles and drones hitting 85 US facilities across Bahrain and Kuwait, amid historic funeral processions for Ayatollah Ali Khamenei in Iraq.',
    summaryAr: 'دخلت المواجهة الإقليمية مرحلة الانفجار الشامل اليوم، معلنةً الانهيار الفعلي لمذكرة التفاهم بين واشنطن وطهران في يومها الحادي والعشرين، بعد ضربات جوية أمريكية مكثفة طالت 80 موقعاً في جنوب إيران، ورد إيراني كاسح بـ 85 قذيفة طالت القواعد الأمريكية بالبحرين والكويت، وسط حشود مليونية في العراق تشيع خامنئي وتمهد لساعة الصفر بعد مشهد.',
    contentEn: `The regional confrontation entered a stage of all-out explosion today, declaring the actual collapse of the MOU between Washington and Tehran on its twenty-first day. The Gulf arena turned into a mutual firing range of ballistic missiles and drones, as US Central Command executed large-scale strikes on southern Iran, met by Tehran's sweeping retaliation targeting US military installations in Bahrain and Kuwait.

This accelerating military escalation coincides with a dangerous strategic shift led by US President Donald Trump from Ankara, utilizing the NATO summit to incite European allies and place Turkish President Recep Tayyip Erdoğan before a historic, decisive test. On the other side, the gathering of millions in the holy cities of Najaf and Karbala, mourning the late Supreme Leader Ayatollah Ali Khamenei today, outlines the ideological and battlefield cohesion of the Axis of Resistance, paving the way for his burial tomorrow, Thursday, in the holy city of Mashhad—a moment set to launch a new, more fierce phase of military and political struggle.

### I. The Gulf Inferno: Vast US Strikes Met by Devastating Iranian Retaliation
The past hours witnessed an unprecedented military escalation since the signing of the MOU, as both sides bypassed warnings, shifting into direct, large-scale kinetic engagements:

* **US Airstrikes on Southern Iran:** President Donald Trump issued orders from his residence in Turkey to launch intense aggressive attacks, described as four to five times stronger than last week’s strikes. US Central Command (CENTCOM) announced targeting over 80 sites with precision-guided munitions, including air defense systems, command networks, coastal radar stations, and cruise missile sites in Hormozgan province, Mahshahr, Bandar Abbas, Sirik, and Qeshm Island, in addition to targeting about 60 IRGC fast boats. The aggression resulted in the death of an IRGC naval officer in Mahshahr and damaged commercial and fishing port docks.
* **Sweeping Iranian Retaliation (85 Military Facilities Target List):** Tehran moved rapidly to activate its "offensive doctrine," as IRGC and Iranian military naval and air forces conducted massive joint operations using ballistic missiles and kamikaze drones. The strikes targeted 85 US military facilities across the Fifth Fleet headquarters at Salman Port, Isa Air Base in Bahrain, and Ali Al Salem Air Base in Kuwait.
* **Downing of US MQ-9 Reaper & Air Defense Alerts:** IRGC air defenses successfully shot down a sophisticated US MQ-9 spy drone over Bushehr province. In response, sirens wailed twice in Bahrain and Kuwait, and the Kuwaiti Army announced that its air defense systems intercepted massive missile and drone strikes.
* **Massive US Aerial Refueling Bridge (28 Tankers):** Flight tracking systems revealed heavy US aerial activity between Ben Gurion and the Gulf of Aden, featuring 28 aerial refueling aircraft (9 KC-46A and 19 KC-135R tankers) flying continuously. This confirms that Washington is operating a complex, sustained air bridging campaign to secure coverage for its fighters and drones in the region's inflamed skies.`,
    contentAr: `دخلت المواجهة الإقليمية مرحلة الانفجار الشامل اليوم، معلنةً الانهيار الفعلي لمذكرة التفاهم بين واشنطن وطهران في يومها الحادي والعشرين. وتحولت ساحة الخليج إلى ميدان رماية متبادل بالصواريخ الباليستية والطائرات المسيرة، حيث نفذت القيادة المركزية الأمريكية ضربات واسعة النطاق على جنوب إيران، ردت عليها طهران باستهداف كاسح للمنشآت العسكرية الأمريكية في البحرين والكويت.

يتزامن هذا التصعيد العسكري المتسارع مع تحول استراتيجي خطير يقوده الرئيس الأمريكي دونالد ترامب من أنقرة، مستغلًا قمة حلف شمال الأطلسي (الناتو) لتحريض حلفائه الأوروبيين ووضع الرئيس التركي رجب طيب أردوغان أمام اختبار تاريخي وحاسم. وعلى الجانب الآخر، فإن الحشود المليونية في النجف وكربلاء المقدستين، والتي تشيع اليوم جثمان الإمام الشهيد علي خامنئي، ترسم ملامح التماسك العقائدي والميداني لعاصمة محور المقاومة. ويمهد ذلك لدفنه غدًا الخميس في مدينة مشهد، وهي اللحظة التي ستشكل إشارة الانطلاق لمرحلة جديدة وأكثر ضراوة من الصراع العسكري والسياسي.

### أولاً: جحيم الخليج... ضربات أمريكية واسعة ورد إيراني يضرب في عمق البحرين والكويت
شهدت الساعات الماضية تصعيدًا عسكريًا غير مسبوق منذ توقيع مذكرة التفاهم، حيث تجاوز الطرفان مرحلة الرسائل التحذيرية إلى اشتباك ناري مباشر وواسع النطاق:

* **الغارات الأمريكية على جنوب إيران:** أصدر الرئيس دونالد ترامب أوامر من مقر إقامته في تركيا بشن هجمات عدوانية مكثفة، وُصفت بأنها أقوى بأربع إلى خمس مرات من ضربات الأسبوع الماضي. وأعلنت القيادة المركزية الأمريكية (سنتكوم) استهداف أكثر من 80 موقعًا بذخائر دقيقة، شملت أنظمة دفاع جوي، وشبكات قيادة، ومواقع رادار ساحلية، ومواقع صواريخ كروز في محافظة هرمزغان، ومدينة ماهشهر، وبندر عباس، وسيريك، وجزيرة قشم، بالإضافة إلى استهداف نحو 60 زورقاً تابعة للحرس الثوري. وأسفر العدوان عن استشهاد أحد عناصر القوة البحرية للحرس الثوري في ماهشهر وتضرر أرصفة موانئ تجارية وموانئ صيد.
* **الرد الإيراني المدمر (85 منشأة عسكرية):** لم تتأخر طهران في تفعيل "العقيدة الهجومية"؛ حيث نفذت القوات البحرية والجوية للحرس الثوري والجيش الإيراني عمليات مشتركة واسعة النطاق باستخدام الصواريخ الباليستية والطائرات المسيرة. واستهدفت العمليات 85 منشأة عسكرية أمريكية في مقر الأسطول الخامس بميناء سلمان وقاعدة عيسى الجوية في البحرين، بالإضافة إلى قاعدة علي السالم الجوية في الكويت.
* **إسقاط المسيرة الأمريكية واستنفار الدفاع الجوي:** نجحت الدفاعات الجوية للحرس الثوري في إسقاط طائرة تجسس أمريكية متطورة من طراز (MQ-9) في أجواء محافظة بوشهر. وفي المقابل، دوت صافرات الإنذار مرتين في البحرين والكويت، وأعلن الجيش الكويتي أن دفاعاته الجوية اعترضت هجمات صاروكية وجوية مكثفة بالطائرات المسيرة.
* **الجسر الجوي الأمريكي (28 طائرة تزويد بالوقود):** كشفت أجهزة الرصد الملاحي عن نشاط جوي أمريكي مكثف بين بن غوريون وخليج عدن، تمثل في تحليق 28 طائرة صهريج للتزويد بالوقود في الجو (9 طائرات من طراز KC-46A و19 طائرة من طراز KC-135R). ويؤكد هذا أن واشنطن تدير عملية جوية مستمرة ومعقدة لتأمين الغطاء لمقاتلاتها ومسيراتها في الأجواء الملتهبة للمنطقة.`,
    threatLevel: 'CRITICAL',
    regionEn: 'Persian Gulf / Southern Iran / Iraq / Turkey',
    regionAr: 'الخليج العربي / جنوب إيران / العراق / تركيا',
    coordinates: '27.18° N, 56.27° E',
    dateEn: 'July 8, 2026',
    dateAr: '٨ يوليو ٢٠٢٦',
    sourceEn: 'Al-Warraq Strategic Operations Hub',
    sourceAr: 'غرفة العمليات الاستراتيجية بالورّاق'
  },
  {
    id: 'gcc-ma-surge-investment-banking-2026',
    codeName: 'OPERATION GOLDEN HORIZONS',
    titleEn: 'GCC M&A Surge: Global Investment Banks Expand Teams Betting on Long-Term Growth',
    titleAr: 'طفرة الاندماج والاستحواذ في الخليج: بنوك الاستثمار العالمية توسع فرقها مراهنةً على نمو طويل الأجل',
    summaryEn: 'Contrary to the pessimistic forecasts that accompanied the recent geopolitical tensions in the Middle East at the beginning of this year, the mergers and acquisitions (M&A) sector in the GCC has demonstrated exceptional resilience. Instead of a slowdown, deal-making activity experienced a qualitative leap, prompting Wall Street giants and global financial institutions to pivot from conservative strategies toward intensive hiring and expanding regional teams, driven by an optimistic outlook and a serious bet on sustainable, long-term economic growth.',
    summaryAr: 'على خلاف التوقعات المتشائمة التي واكبت اندلاع التوترات الجيوسياسية الأخيرة في منطقة الشرق الأوسط مطلع هذا العام، أظهر قطاع الصفقات والاندماجات في دول مجلس التعاون الخليجي مرونة استثنائية. وبدلاً من التباطؤ، شهد نشاط إبرام الصفقات قفزة نوعية، مما دفع كبرى بنوك "وول ستريت" والمؤسسات المالية العالمية إلى تغيير استراتيجياتها التحفظية والاتجاه نحو تكثيف التوظيف وتوسيع فرق عملها الإقليمية، مدفوعة برؤية متفائلة ومراهنة جادة على نمو اقتصادي مستدام طويل الأجل.',
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
    contentAr: `على خلاف التوقعات المتشائمة التي واكبت اندلاع التوترات الجيوسياسية الأخيرة في منطقة الشرق الأوسط مطلع هذا العام، أظهر قطاع الصفقات والاندماجات في دول مجلس التعاون الخليجي مرونة استثنائية. وبدلاً من التباطؤ، شهد نشاط إبرام الصفقات قفزة نوعية، مما دفع كبرى بنوك "وول ستريت" والمؤسسات المالية العالمية إلى تغيير استراتيجياتها التحفظية والاتجاه نحو تكثيف التوظيف وتوسيع فرق عملها الإقليمية، مدفوعة برؤية متفائلة ومراهنة جادة على نمو اقتصادي مستدام طويل الأجل.

### أرقام قياسية: الذكاء الاصطناعي والبنية التحتية يقودان الصفقات
وفقاً للبيانات الصادرة عن "بلومبرغ"، سجلت قيمة الصفقات التي شاركت فيها جهات خليجية ارتفاعاً قياسياً بنسبة 200% خلال النصف الأول من العام الحالي، لتصل إلى نحو 300 مليار دولار.

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
* **دولة الإمارات:** تعمل على خطة استراتيجية لتوسيع موانئها الشرقية الواقعة على ساحل خليج عُمان لتقليل الاعتماد على مضيق هرمز. كما تقود شركة "لِعماد" في أبوظبي مع شركاء محليين ودوليين مشروعاً يستهدف بنية تحتية بقيمة 30 مليار دولار.
* **المملكة العربية السعودية:** يمضي مسؤولو "أرامكو" قُدماً في واحدة من أكثر خطط الخصخصة طموحاً في تاريخ الشركة لتعزيز الميزانية العمومية، وسط توقعات بأن تجمع هذه الصفقات ما يصل إلى 35 مليار دولار.
* **دولة الكويت:** تشهد منافسة محتدمة بين كبار المستثمرين العالميين (مثل "بلاك روك" عبر ذراعها "GIP" ومجموعة "بروكفيلد") للفوز بحصة قيمتها 7.5 مليار دولار في شبكة خطوط الأنابيب التابعة لشركة النفط الحكومية.

### مرونة مصرفية مستدامة وتحديات قائمة
على الرغم من الطفرة الحالية، تشير التقارير التحليلية، ومنها تقرير شركة "بي إم آي" (BMI) التابعة لـ"فيتش سوليوشنز"، إلى أن المخاطر لم تختفِ تماماً بل أصبحت أكثر تركيزاً:
* **صلابة الودائع:** أظهر القطاع المصرفي في دول مجلس التعاون مرونة أعلى من المتوقع؛ حيث ساعدت التدفقات الحكومية والدعم السيادي وحزم السيولة في استقرار الأوضاع ومنع أي هروب جماعي للرساميل.
* **تركيز المخاطر:** باتت المخاطر تتركز في مصادر التمويل الحساسة لثقة المستثمرين، مثل ودائع القطاع الخاص وغير المقيمين، لا سيما في الأسواق الأكثر اعتماداً على التمويل الأجنبي مثل البحرين وقطر.
* **تحدي استقطاب الكفاءات:** أصبح المرشحون للوظائف القيادية أكثر انتقائية؛ حيث باتت اعتبارات السلامة الشخصية والرؤية طويلة الأجل وحزم التعويضات التنافسية تلعب دوراً حاسماً في اتخاذ القرار.
* **توقعات نمو الائتمان:** يُتوقع أن يتباطأ نمو القروض في دول الخليج خلال الفترة المقبلة بحدود عام 2026، وهو تباطؤ يأخذ طابعاً هيكلياً (كما في السوق السعودية نتيجة تشديد معايير الإقراض وتأخر بعض القرارات الاستثمارية غير النفطية)، في حين يواصل القطاع المصرفي الإماراتي تفوقه بدعم من التنوع الاقتصادي القوي.`,
    threatLevel: 'MODERATE',
    regionEn: 'GCC / Middle East',
    regionAr: 'دول مجلس التعاون الخليجي / الشرق الأوسط',
    coordinates: '25.20° N, 55.27° E',
    dateEn: 'July 2, 2026',
    dateAr: '٢ يوليو ٢٠٢٦',
    sourceEn: 'Al-Warraq Financial Intelligence Agency',
    sourceAr: 'وكالة الوراق للاستخبارات المالية'
  },
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
  },
  {
    id: 'us-iran-halt-strikes-2026',
    codeName: 'OPERATION BRASS SHIELD',
    titleEn: 'U.S. and Iran Agree to Halt Strikes and Meet This Week',
    titleAr: 'مسؤول أمريكي: واشنطن وطهران تتفقان على وقف الضربات المتبادلة والاجتماع هذا الأسبوع',
    summaryEn: 'The U.S. and Iran have agreed to stop attacking each other as the two sides plan to meet in Qatar to work out their dispute over the Strait of Hormuz.',
    summaryAr: 'تفاصيل الاتفاق الأمريكي الإيراني المفاجئ لوقف الضربات العسكرية المتبادلة واستباق جولة مفاوضات حاسمة في الدوحة بشأن تأمين الملاحة المائية.',
    contentEn: `The U.S. and Iran agreed to stop attacking each other, according to a senior U.S. official, as the two sides plan to meet Tuesday in Qatar's capital to work out their dispute over the Strait of Hormuz.

**Why it matters:** The ceasefire is barely 11 days old and already on shaky ground with renewed strikes by both sides and President Trump's threat to restart the war and "complete the job."

The renewed fighting was sparked by competing interpretations of the memorandum of understanding (MOU) to end the war — especially its terms on the Strait of Hormuz.

**The latest:** "We decided to stop all the kinetic activity," a senior U.S. official tells Axios, using the military's term for strikes and other attacks.

A second U.S. official tells Axios both sides will stand down "for now" and that "vessels can move freely" as technical talks are set to continue.
Both U.S. officials and a third source with knowledge confirmed Tuesday's planned meeting.

**Catch up quick:** Under the MOU, Iran committed to make its best efforts to allow safe passage of commercial vessels through the strait. In return, the U.S. lifted its blockade of Iranian ports.

During negotiations in Switzerland last week, the U.S. delegation — headed by Vice President Vance — agreed with Iran to establish a "hotline" between the U.S. military and the IRGC (Islamic Revolutionary Guard Corps), Iran's military command, to coordinate traffic in the strait.
As of Saturday, the "hotline" still wasn't operational even as Iran started claiming, again, that ships need to coordinate passage.

**State of play:** The Tuesday talks were originally set to happen in Switzerland to address Iran's nuclear program, a source with knowledge of the talks said. The escalation moved them to a different venue and refocused them on the Strait of Hormuz.

Nick Stewart, who heads the U.S. technical team, is expected to participate in the talks, according to a U.S. official and a source with knowledge.`,
    contentAr: `وافقت الولايات المتحدة وإيران على وقف الهجمات المتبادلة، وفقاً لما صرح به مسؤول أمريكي رفيع المستوى، حيث يعتزم الجانبان الاجتماع يوم الثلاثاء في العاصمة القطرية الدوحة لتسوية خلافهما المتصاعد بشأن مضيق هرمز.

**لماذا يهم الأمر:** لم يمر على اتفاق وقف إطلاق النار سوى 11 يوماً فقط، وهو يقف بالفعل على أرضية مهتزة للغاية في ظل الضربات المتجددة من كلا الطرفين وتهديدات الرئيس ترامب باستئناف الحرب و"إكمال المهمة".

وقد اندلع القتال المتجدد بسبب التفسيرات المتعارضة لمذكرة التفاهم (MOU) الموقعة لإنهاء الحرب - وخاصة البنود المتعلقة بمضيق هرمز.

**آخر المستجدات:** وصرح مسؤول أمريكي رفيع لـ "أكسيوس" قائلاً: "لقد قررنا وقف جميع الأنشطة الحركية (القتالية)"، مستخدماً المصالح العسكري للإشارة إلى الغارات والهجمات الأخرى.

وأكد مسؤول أمريكي ثانٍ لـ "أكسيوس" أن كلا الجانبين سيتراجعان "في الوقت الحالي" وأن "السفن يمكنها التحرك بحرية" مع الاستعداد لمواصلة المحادثات الفنية والتقنية.
وقد أكد المسؤولان الأمريكيان ومصدر ثالث مطلع التخطيط لعقد هذا الاجتماع المرتقب يوم الثلاثاء.

**موجز سريع:** بموجب مذكرة التفاهم الموقعة، التزمت إيران ببذل قصارى جهدها للسماح بالمرور الآمن للسفن التجارية عبر مضيق هرمز. وفي المقابل, رفعت الولايات المتحدة حصارها عن الموانئ الإيرانية.

وخلال المفاوضات التي جرت في سويسرا الأسبوع الماضي، وافق الوفد الأمريكي - برئاسة نائب الرئيس جيه دي فانس - مع إيران على إنشاء "خط ساخن" بين الجيش الأمريكي والحرس الثوري الإيراني لتنسيق حركة الملاحة في المضيق.
وحتى يوم السبت، لم يكن "الخط الساخن" قد دخل حيز التشغيل الفعلي بعد، في حين بدأت إيران تطالب مجدداً بضرورة قيام السفن بتنسيق مرورها مسبقاً.

**الوضع الراهن:** وكانت محادثات الثلاثاء مقررة في الأصل في سويسرا لمناقشة البرنامج النووي الإيراني، وفقاً لمصدر مطلع على سير المحادثات. إلا أن التصعيد العسكري الأخير نقلها إلى موقع جديد (الدوحة) وأعاد توجيهها بالكامل للتركيز على ملف مضيق هرمز الشائك.

ومن المتوقع أن يشارك نيك ستيوارت، الذي يرأس الفريق الفني الأمريكي، في هذه المحادثات، وفقاً لمسؤول أمريكي ومصدر مطلع.`,
    threatLevel: 'HIGH',
    regionEn: 'Qatar / Strait of Hormuz',
    regionAr: 'قطر / مضيق هرمز',
    coordinates: '25.28° N, 51.53° E',
    dateEn: 'June 29, 2026',
    dateAr: '٢٩ يونيو ٢٠٢٦',
    sourceEn: 'Barak Ravid (Axios News Intercept)',
    sourceAr: 'باراك رافيد (أكسيوس - تغطية خاصة)'
  },
  {
    id: 'israel-lebanon-deal-behind-scenes',
    codeName: 'OPERATION LEBANON FIRST',
    titleEn: 'Behind the Scenes: How Shared Fear of Iran Led to an Israel-Lebanon Deal',
    titleAr: 'كواليس المفاوضات: كيف أدى الخوف المشترك من نفوذ إيران إلى اتفاق لبناني-إسرائيلي',
    summaryEn: 'Four days of nonstop negotiations in Washington between the Israeli and Lebanese governments were propelled by one clear shared interest: weakening the influence of Hezbollah and Iran in Lebanon.',
    summaryAr: 'مستند استخباري خاص يكشف تفاصيل الدبلوماسية السرية والضغوط المكثفة من إدارة ترامب لإبرام اتفاقية لبنان والالتفاف على النفوذ الإيراني.',
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
On Saturday, Lebanese security forces took down dozens of posters placed by Hezbollah on the main road to Beirut's international airport, thanking Iran's supreme leader for the ceasefire.
In their place, the Lebanese government hung its own posters with the slogan, "Lebanon first" — some of which were burned by Hezbollah supporters on Saturday night.

**What they're saying:** Hezbollah leader Naim Qassem declared the agreement with Israel "null and void" and called it "a humiliation, disgrace, and a surrender of sovereignty."
He stressed Hezbollah will continue its "resistance" to the Israeli occupation.

**What's next:** Later on Saturday, Trump spoke with Aoun and congratulated him on the deal.
Trump said the U.S. would provide everything necessary to implement the agreement and to support Lebanon's sovereignty and the extension of the Lebanese state's authority over the entire Lebanese territory, Aoun's office said.
At the end of the call, Trump told Aoun he looked forward to meeting him soon at the White House. The visit is expected in mid-July.`,
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
وتبع ذلك مطالبة ممثلي لبنان بإيضاحات مماثلة، حيث صرح مصدر مطلع بشكل مباشر: "كان اللبنانيون في حالة من التوجس والترقب الشديد".

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
    threatLevel: 'HIGH',
    regionEn: 'Washington D.C. / Israel / Lebanon',
    regionAr: 'واشنطن / إسرائيل / لبنان',
    coordinates: '38.89° N, 77.03° W',
    dateEn: 'June 29, 2026',
    dateAr: '٢٩ يونيو ٢٠٢٦',
    sourceEn: 'Al-Warraq Washington Bureau (Axios Exclusive)',
    sourceAr: 'مكتب الوراق بواشنطن (تغطية حصرية - أكسيوس)'
  },
  {
    id: 'baghdad-diplomacy-shift-2026',
    codeName: 'OPERATION BAGHDAD SHIFT',
    titleAr: 'مفارقات الزمن الكبرى: عندما يصفق "العم سام" لدبلوماسية بغداد... تقرير استقصائي في المشهد العراقي الجديد',
    titleEn: "The Great Paradoxes of Time: When 'Uncle Sam' Applauds Baghdad's Diplomacy... An Investigative Report on the New Iraqi Landscape",
    summaryAr: 'مقدمة تحريرية مذهلة حول "عملية الفجر" وتجريد حيتان الفساد في العراق من ذهبها المخبأ بالجدران وأموال البالوعات، والكيمياء الرائعة بين رئيس الوزراء علي الزيدي والجرىء دونالد ترامب.',
    summaryEn: "An incredible editorial report on 'Operation Fajr' and stripping Iraq's corrupt tycoons of gold hidden in walls and cash in sewers, alongside the wonderful chemistry between PM Ali Al-Zaidi and Donald Trump.",
    threatLevel: 'HIGH',
    regionAr: 'العراق / الولايات المتحدة / الشرق الأوسط',
    regionEn: 'Iraq / USA / Middle East',
    coordinates: '33.3152° N, 44.3661° E',
    dateAr: '١٤ يوليو ٢٠٢٦',
    dateEn: 'July 14, 2026',
    sourceAr: 'وحدة الصحافة الاستقصائية والرصد الدبلوماسي بالورّاق',
    sourceEn: 'Al-Warraq Diplomatic & Investigative Unit',
    contentAr: `### مقدمة تحريرية: كيف يُعيد التاريخ كتابة نصوصه الساخرة؟

لكل زمان دولة ورجال، ولكل غزو أمريكي عواقب يغصّ بها التاريخ ضحكاً. في عام 2003، هبطت الدبابات الأمريكية في بغداد لتبشر بـ'الديمقراطية المستوردة' و'العراق الجديد' الذي انتهى به المطاف غارقاً في طوفان من المليشيات والفساد العابر للقارات. واليوم، في يوليو 2026، يقف الرئيس دونالد ترامب في المكتب البيضاوي ليُبدي إعجابه الشديد بـ'الكيمياء الرائعة' ودبلوماسية رئيس الوزراء العراقي الجديد، علي الزيدي، الذي لم يكن يوماً جزءاً من طبقة اللصوص السياسيين التي رعتها واشنطن لسنوات. يا لها من مفارقة: واشنطن التي تسببت في الفوضى، تصفق اليوم للرجل الذي يكنس ركام هذه الفوضى.

---

### أولاً: زلزال "الفجر" وتجريد الحيتان من ذهبها

لم تبدأ قصة الدور العراقي الجديد من واشنطن، بل من أزقة "المنطقة الخضراء" المحصنة وباحات وزارة النفط في بغداد. لطالما كان الفساد في العراق نظاماً متكاملاً محصناً بميليشيات مسلحة وهياكل طائفية، إلا أن رئيس الوزراء الجديد، رجل الأعمال المستقل علي الزيدي الذي تسلم السلطة في مايو 2026 كمرشح تسوية غير حزبي، قرر اللعب بأوراق مغايرة تماماً.

في أواخر يونيو ومطلع يوليو 2026، استيقظت بغداد على "عملية الفجر". تحت جنح الظلام، تحركت قوات مكافحة الإرهاب النخبوية لتنفيذ مذكرات اعتقال بحق 47 مسؤولاً رفيعاً، بينهم 12 برلمانياً حالياً ونواب وزراء نفط سابقين وحاليين.

#### حصاد الجبايات المنهوبة:
ولأن تفاصيل الكوميديا السوداء العراقية لا تنتهي، كشفت التحقيقات القضائية المدعومة باعترافات نائب وزير النفط السابق "عدنان الجميلي" عن حيازة المسؤولين لثروات خيالية:
* **ذهب مخبأ في الجدران**: استعادت السلطات أكثر من 375 كيلوغراماً من السبائك الذهبية التي تم تسليمها للبنك المركزي.
* **أموال في حفر الصرف الصحي**: سحبت الأجهزة الأمنية ملايين الدولارات وعشرة مليارات دينار عراقي كانت مخبأة داخل "بلاعات ومجاري صرف مياه الأمطار".
* **حلم الحقيبة الوزارية بـ250 مليون دولار**: أثبتت التحقيقات أن الجميلي كان يتفاوض على دفع ربع مليار دولار لجهات سياسية من أجل تنصيبه وزيراً للتخطيط أو الدفاع.

أثارت هذه الهجمة الشرسة حفيظة "الإطار التنسيقي" والقوى التقليدية الموالية لإيران التي وضعت الزيدي في المنصب أصلاً، معتبرة تحركاته انفرادية وتستهدف تقويض نفوذها. لكن الشارع، ومعه المرجعية الدينية والتيار الصدري، تضامنوا سريعاً، مما منح رئيس الوزراء غطاءً شعبياً نادراً للمضي قُدماً.

---

### ثانياً: دبلوماسية "الكيمياء الرائعة" في واشنطن

بعد إثبات جديته في الداخل، طار علي الزيدي إلى واشنطن في منتصف يوليو 2026 كأول محطة خارجية له منذ تويله المنصب. والهدف؟ تسويق "العراق المستقل الجديد" بعيداً عن كونه مجرد حديقة خلفية للنفوذ الإيراني.

في 14 يوليو 2026، استقبله الرئيس دونالد ترامب بحفاوة بالغة في المكتب البيضاوي. ترامب، الباحث دائماً عن الصفقات والزعماء الاقتصاديين الذين يشبهونه (كون الزيدي رجل أعمال غني بلا خلفية سياسية تذكر)، صرّح علانية بوجود "كيمياء رائعة" تجمعه بالضيف العراقي، ووصفه بأنه "سيكون قائداً عظيماً ليس فقط للعراق بل للشرق الأوسط بأكمله".

أثنى ترامب بشكل خاص على "الدبلوماسية العراقية الجديدة" الشجاعة، والتي تتلخص في:
1. **نزع سلاح الفصائل**: تحديد موعد نهائي صارم (30 سبتمبر 2026) لجميع الميليشيات لتسليم سلاحها للدولة العراقية.
2. **العقود التجارية مقابل الدعم**: فتح الباب للشركات الأمريكية للاستثمار الموسع في مجالات الطاقة والبنية التحتية، وإزالة القيود القانونية التي تمنع الشركات الأجنبية من امتلاك أكثر من 49% من المشاريع المحلية.
3. **تفكيك شبكات الفساد المالي**: وهي الشبكات التي تستغلها طهران للالتفاف على العقوبات الدولية.

---

### ثالثاً: العراق في فوهة المدفع.. دور "ساعي البريد" في حرب المحاور

تزامنت هذه الخطوات الدبلوماسية مع بقاء العراق ساحة مشتعلة بالوكالة. مع اشتعال شرارة المواجهة العسكرية الشاملة والضربات المتبادلة بين الولايات المتحدة وإسرائيل من جهة، وإيران من جهة أخرى (والتي بلغت ذروتها في ربيع 2026)، تحولت الأجواء والأراضي العراقية إلى مسرح للدراما الحربية.

#### تفاصيل الصراع على السيادة:
* **موجات المسيرات**: استخدمت الفصائل الموالية لإيران الأراضي العراقية لإطلاق طائرات مسيرة باتجاه القواعد الأمريكية وحلفاء واشنطن في المنطقة (مثل السعودية والخليج).
* **الضربات الأمريكية المضادة**: شنت واشنطن غارات جوية قوية داخل العراق، مستهدفة مقار الفصائل ومستودعات صواريخها، مما أسفر عن سقوط ضحايا من القوات الرسمية العراقية وإثارة احتجاجات برلمانية حادة.
* **الرفض العراقي القاطع**: أبلغ وزير الخارجية العراقي، فؤاد حسين، نظراءه في دول مجلس التعاون الخليجي صراحة في يوليو 2026 بأن بغداد ترفض استخدام أراضيها أو أجوائها كمنطلق للهجوم على جيرانها، محذراً من أن انزلاق العراق في أتون حرب أمريكية-إيرانية شاملة سيعني نهايته.

هنا يكمن التحدي التاريخي للعراق: كيف يحافظ على توازنه وهو يلعب دور "الإسفنجة الدبلوماسية" التي تمتص الضربات، بينما تحاول واشنطن جاهدة دفعه لإعلان قطيعة تامة مع الجارة إيران؟

---

### رابعاً: مقارنة سريعة لتغير مواقف واشنطن تجاه حكام بغداد

| الفترة الزمنية | الحاكم العراقي | طبيعة الموقف الأمريكي | النتيجة السياسية |
| :--- | :--- | :--- | :--- |
| **2003 - 2004** | الحاكم المدني بول بريمر | فرض الوصاية المباشرة، وحل مؤسسات الدولة العراقية. | تأسيس نظام المحاصصة الطائفية وسرقة الموارد. |
| **2006 - 2014** | نوري المالكي | دعم وتغاضٍ عن تمدد النفوذ الإيراني بحجة حفظ الاستقرار. | تهديد ترامب الأخير بقطع المساعدات في حال عودته. |
| **يوليو 2026** | علي الزيدي | احتفاء حار بالدبلوماسية المستقلة، وإشادة بـ"الكيمياء الرائعة". | محاولة لدمج العراق في الاقتصاد العالمي واستثمار أموال الإعمار. |

---

### الخلاصة: هل ينجو "العراق الجديد" من هذا العناق الأمريكي؟

تحت سخرية الأقدار، تقف بغداد اليوم في موقف لم يتخيله أكثر المخططين تفاؤلاً في البنتاغون عام 2003. فالدولة التي تم تفكيكها وتدمير مؤسساتها بذريعة جلب الديمقراطية، أصبحت اليوم مركز الجذب الدبلوماسي الأهم لتهدئة صراعات المنطقة.

الرئيس ترامب يثق بالزيدي لأنه يتحدث لغة الأرقام والاستثمار، ويرى فيه فرصة لإخراج أمريكا من مستنقع التدخل العسكري المباشر عبر "صيغة تجارية ومكافحة فساد" ذاتية التمويل. ومع ذلك، فإن نجاح هذه المغامرة العراقية يعتمد كلياً على قدرة بغداد على سحب فتيل الميليشيات قبل حلول الموعد النهائي في نهاية سبتمبر، دون أن يتسبب ذلك في اندلاع حرب أهلية جديدة تحرق الأخضر واليابس والذهب المسترجع حديثاً من بالوعات الفساد.`,
    contentEn: `### Editorial Introduction: How History Writes Its Satirical Scripts?

For every era there is a state and men, and for every American invasion there are consequences that history chokes with laughter. In 2003, American tanks rolled into Baghdad to herald an "imported democracy" and a "New Iraq" that ended up drowning in a flood of militias and transcontinental corruption. Today, in July 2026, President Donald Trump stands in the Oval Office to express his profound admiration for the "wonderful chemistry" and diplomacy of Iraq's new Prime Minister, Ali Al-Zaidi, who was never part of the political class of thieves nurtured by Washington for years. What a paradox: Washington, which caused the chaos, applauds today the man sweeping away its ruins.

---

### I. The 'Fajr' Earthquake and Stripping the Whales of Their Gold

The story of the new Iraqi role did not begin in Washington, but rather from the alleys of the fortified "Green Zone" and the courtyards of the Ministry of Oil in Baghdad. Corruption in Iraq has long been an integrated system protected by armed militias and sectarian structures. However, the new Prime Minister, independent businessman Ali Al-Zaidi, who assumed office in May 2026 as a non-partisan compromise candidate, decided to play entirely different cards.

In late June and early July 2026, Baghdad woke up to "Operation Fajr" (Dawn). Under the cover of darkness, elite counter-terrorism forces moved to execute arrest warrants against 47 high-ranking officials, including 12 current members of parliament and former and current deputy oil ministers.

#### Harvest of Plundered Levies:
And because the details of Iraqi black comedy never end, judicial investigations backed by the confessions of former Deputy Oil Minister "Adnan Al-Jumaili" revealed that officials possessed astronomical wealth:
* **Gold hidden in walls**: Authorities recovered more than 375 kilograms of gold bullion, which was handed over to the Central Bank.
* **Cash in sewers**: Security forces retrieved millions of dollars and ten billion Iraqi dinars hidden inside "rainwater drainage systems and sewers".
* **A $250M ministerial portfolio dream**: Investigations proved Al-Jumaili was negotiating a quarter-billion dollar payment to political factions to appoint him Minister of Planning or Defense.

This fierce offensive raised the ire of the "Coordination Framework" and traditional pro-Iran forces that originally backed Al-Zaidi's appointment, viewing his moves as unilateral efforts to undermine their influence. However, the public, along with the religious authority (Marjaiya) and the Sadrist movement, quickly rallied, giving the Prime Minister rare public cover to press forward.

---

### II. The 'Wonderful Chemistry' Diplomacy in Washington

After proving his domestic resolve, Ali Al-Zaidi flew to Washington in mid-July 2026 for his first foreign visit since taking office. The goal? Marketing a "new independent Iraq" far from being a mere backyard for Iranian influence.

On July 14, 2026, President Donald Trump warmly received him in the Oval Office. Trump, ever on the hunt for deals and business-oriented leaders (since Al-Zaidi is a wealthy businessman with virtually no political background), declared publicly that a "wonderful chemistry" unites them, predicting Al-Zaidi "will be a great leader not just for Iraq but for the entire Middle East."

Trump particularly praised the bold "new Iraqi diplomacy," which focuses on:
1. **Disarming factions**: Setting a strict deadline (September 30, 2026) for all militias to hand over their weapons to the Iraqi state.
2. **Business contracts in exchange for support**: Opening the door to massive US corporate investment in energy and infrastructure, removing legal barriers that prevent foreign firms from owning more than 49% of local projects.
3. **Dismantling financial corruption networks**: The very networks used by Tehran to bypass international sanctions.

---

### III. Iraq in the Crosshairs: The 'Messenger' Role in the War of Axes

These diplomatic steps coincided with Iraq remaining a hot proxy theater. With the ignition of a full military confrontation and retaliatory strikes between the US/Israel and Iran (which peaked in the spring of 2026), Iraqi skies and lands transformed into a war drama.

#### Sovereignty Conflict Details:
* **Drone Waves**: Pro-Iran factions used Iraqi territory to launch drone swarms toward US bases and regional allies (like Saudi Arabia and the Gulf).
* **US Counterstrikes**: Washington launched heavy air raids within Iraq, targeting militia headquarters and missile caches, leading to official Iraqi security casualties and sparking sharp parliamentary protests.
* **Absolute Iraqi Rejection**: Iraqi Foreign Minister Fuad Hussein explicitly informed his GCC counterparts in July 2026 that Baghdad rejects the use of its land or skies to attack neighbors, warning that dragging Iraq into a full US-Iran war would spell its demise.

Here lies the historic challenge: How can Iraq maintain balance while acting as a "diplomatic sponge" absorbing blows, while Washington pushes hard for a total break with neighbor Iran?

---

### IV. Comparison of Washington's Shifting Stance Toward Baghdad's Rulers

| Time Period | Iraqi Ruler | US Stance | Political Outcome |
| :--- | :--- | :--- | :--- |
| **2003 - 2004** | Civil Governor Paul Bremer | Direct mandate and dissolving state institutions. | Establishing sectarian quotas and resource plundering. |
| **2006 - 2014** | Nouri Al-Maliki | Support and tolerance of Iranian influence expansion under the guise of stability. | Trump's recent threat to cut off aid should he return to power. |
| **July 2026** | Ali Al-Zaidi | Warm celebration of independent diplomacy and praise for 'wonderful chemistry'. | Efforts to integrate Iraq into the global economy and channel reconstruction investments. |

---

### Conclusion: Will the 'New Iraq' Survive This American Embrace?

By a twist of historical irony, Baghdad stands today in a position unimaginable to the most optimistic Pentagon planners of 2003. The state dismantled under the banner of importing democracy has become the most critical diplomatic gravity center to de-escalate regional wars.

President Trump trusts Al-Zaidi because he speaks the language of investments and numbers, seeing an opportunity to extract America from direct military entanglements through a self-funding business-and-anti-corruption formula. However, the success of this Iraqi gamble depends entirely on Baghdad's capacity to defuse the militia fuse before the late September deadline, without triggering a civil war that would burn everything, including the newly retrieved gold from the gutters of corruption.`
  },
  {
    id: 'strait-hormuz-loss-2026',
    codeName: 'HORMUZ RISK assessment',
    titleAr: 'تقدير خسائر إغلاق مضيق هرمز لعام 2026 وتحليل تأثيره العالمي',
    titleEn: '2026 Strait of Hormuz Blockade Economic Loss Assessment & Global Macro Impact',
    summaryAr: 'التقييم الأساسي: يشكل الإغلاق المستمر لمضيق هرمز أكبر اضطراب في الإمدادات في تاريخ سوق النفط العالمي، حيث يعمل كصدمة منظومية للاقتصاد الكلي تكلف الاقتصاد العالمي ما يقدر بـ مليار دولار يومياً.',
    summaryEn: 'Baseline Assessment: The ongoing closure of the Strait of Hormuz constitutes the largest supply disruption in the history of the global oil market, acting as a systemic macroeconomic shock costing the global economy an estimated $1 billion daily.',
    threatLevel: 'CRITICAL',
    regionAr: 'مضيق هرمز / أسواق الطاقة العالمية',
    regionEn: 'Strait of Hormuz / Global Energy Markets',
    coordinates: '26.56° N, 56.25° E',
    dateAr: '١٦ يوليو ٢٠٢٦',
    dateEn: 'July 16, 2026',
    sourceAr: 'وحدة الاقتصاد السيادي واستخبارات الطاقة بالورّاق',
    sourceEn: 'Al-Warraq Sovereign Econometrics & Energy Intelligence Desk',
    contentAr: `### الإطار الزمنّي: بيانات محدّثة حتى يوليو 2026

### التقييم الأساسي: صدمة منظومية للاقتصاد الكلي
يشكل الإغلاق المستمر لمضيق هرمز أكبر اضطراب في الإمدادات في تاريخ سوق النفط العالمي، حيث يعمل كصدمة منظومية للاقتصاد الكلي تكلف الاقتصاد العالمي ما يقدر بـ مليار دولار يومياً.

---

### أولاً: معادلة الخسائر المباشرة المحددة كمياً
قبل اندلاع الأعمال العدائية في 28 فبراير 2026، كان مضيق هرمز ينقل ما يقرب من 20% من إمدادات البترول اليومية في العالم (حوالي 20-21 مليون برميل يومياً) و20% من الغاز الطبيعي المسال (LNG) العالمي. وقد أدى الإغلاق المنظومي لهذا الممر إلى إحداث عجز عميق في ميزان السوق العالمي:

* **عجز الإمدادات**: تم إخراج ما يقرب من 11 مليون برميل يومياً من إنتاج النفط الخام بالكامل عن الخدمة بعد التصعيد الأولي. وحتى مع استغلال الطرق البديلة بطاقتها القصوى، يواجه السوق العالمي عجزاً نشطاً وغير مخفف يبلغ 6 ملايين برميل يومياً.
* **قفزات أسعار السلع الأساسية**: ارتفع خام برنت على الفور من حوالي 80 دولاراً إلى أكثر من 120-126 دولاراً للبرميل في ذروته. ولا تزال علاوات المخاطر للتسليم في المدى القريب مرتفعة بمقدار 15 إلى 40 دولاراً للبرميل.
* **حجم الثروة النفطية المفقودة**: بحلول منتصف عام 2026، يقدّر محللو الطاقة أن الحجم التراكمي لإنتاج النفط المفقود أو العالق قد وصل إلى ما بين 600 مليون و700 مليون برميل، وهو في طريقه للوصول إلى مليار برميل إجمالي مفقود إذا استمر الحصار البحري خلال النصف الثاني من العام.

---

### ثانياً: من المتأثر؟ مصفوفة التأثير متعددة المستويات

#### المستوى الأول: الدول الخليجية المصدرة (ضربات مالية وبنيوية شديدة)
على الرغم من امتلاكها لثروات سيادية هائلة، إلا أن المنتجين الإقليميين يواجهون العبء الأكبر محلياً بسبب قيود البنية التحتية المادية:

| الدولة | واقع الصادرات قبل الحرب | الوضع التشغيلي الحالي والخسائر (يوليو 2026) |
| :--- | :--- | :--- |
| **العراق** | كان يصدر ~4 ملايين برميل يومياً. | الأكثر تضرراً على الإطلاق. انهار إنتاجه بمقدار 3.3 مليون برميل يومياً (انخفاض بنسبة 80% في قدرة التصدير). إنه يواجه عنق زجاجة كامل، معتمداً على خط أنابيب واحد عبر تركيا ينقل 300 ألف برميل يومياً فقط. |
| **المملكة العربية السعودية** | كانت تعتمد بشكل كبير على موانئ الخليج العربي. | فقدت 2.5 مليون برميل يومياً في العبور البحري. ومع ذلك، خففت من الانهيار المطلق عبر تشغيل خط أنابيب شرق-غرب المؤدي إلى ميناء ينبع على البحر الأحمر بطاقته القصوى البالغة 7 ملايين برميل يومياً. |
| **الإمارات العربية المتحدة** | مدمجة بقوة في ممرات الشحن الخليجية. | انخفض إنتاجها بمقدار 2 مليون برميل يومياً. وتعتمد حالياً على تحويلات تصدير محدودة (~1.5 مليون برميل يومياً) يتم ضخها عبر ميناء الفجيرة الواقع خارج المضيق على خليج عمان. |
| **قطر** | الركيزة الأساسية للغاز الطبيعي المسال في العالم. | أعلنت القوة القاهرة على جميع الصادرات بعد استهداف منشآتها في رأس لفان، مما أدى إلى سحب 20% من إمدادات الغاز الطبيعي المسال في العالم بين عشية وضحاها والتسبب في ذعر بأسواق الغاز العالمية. |
| **إيران** | القوة المحاصِرة (بكسر الصاد). | تعاني من حصار مضاد مدمر من قبل القوات البحرية الأمريكية. وتكلف الخسارة المشتركة لصادرات النفط واضطرابات الاستيراد الداخلية الاقتصاد الإيراني المحلي ما يقدر بـ 435 مليون دولار يومياً. |

#### أزمة السعرات الحرارية المحلية في مجلس التعاون الخليجي:
أبعد من قطاع الطاقة، تواجه دول مجلس التعاون الخليجي "حالة طوارئ حادة في إمدادات الغذاء". ولأن هذه الدول تعتمد على المضيق في تأمين أكثر من 80% من احتياجاتها الغذائية، فقد تعطّلت 70% من واردات الأغذية فوراً، مما أجبر كبار تجار التجزئة الإقليميين على إجراء عمليات جسر جوي طارئة ومكلفة لمنع حدوث نقص في السلع الأساسية.

#### المستوى الثاني: الدول المستوردة الصافية (آسيا تتلقى الضربة الأولى والأعنف)
يعتبر التدفق المادي للطاقة من هرمز ركيزة بنيوية للبقاء الصناعي الآسيوي. وكانت الصين، والهند، واليابان، وكوريا الجنوبية تستحوذ تاريخياً على 75% من النفط و59% من الغاز الطبيعي المسال الذي يمر عبر المضيق الحاد.

* **الدول النامية شديدة التأثر**: شهدت الاقتصامات الناشئة مثل الهند وباكستان وبنغلاديش وسريلانكا ونيبال نقصاً حاداً. وشملت العواقب المباشرة فرض حصص إلزامية لتوزيع الغاز البترولي المسال (LPG) وتطبيق خطط صارمة للعمل عن بعد لخفض استهلاك الوقود المحلي بشكل مصطنع.
* **المصد الصيني**: في حين تقع أحجام واردات الصين من النفط الخام تحت ضغوط شديدة، فإن تحولها الهيكلي السريع نحو المركبات الكهربائية (EVs) وشبكات القطارات فائقة السرعة الضخمة وفر لها مصداً اقتصادياً، مما سمح لها بتحمل صدمة الإمدادات بأضرار صناعية أساسية أقل مقارنة بالعقود الماضية.

#### المستوى الثالث: الاقتصادات الغربية (ضغوط متأخرة على الاقتصاد الكلي)
رغم ابتعادها الجغرافي عن اضطرابات الإمدادات الفورية، إلا أن الأسواق الغربية تمتص موجات الصدمة الاقتصادية الثانوية:

* **أوروبا**: بعد أن حُرمت بالفعل من غاز الأنابيب الروسي، أدى التعليق المفاجئ للغاز الطبيعي المسال القطري إلى اندلاع أزمة طاقة أوروبية ثانوية. ونتيجة لذلك، اضطر البنك المركزي الأوروبي (ECB) إلى تعديل دورة التيسير النقدي، ورفع توقعاته للتضخم وخفض توقعات نمو الناتج المحلي الإجمالي وسط مؤشرات تحذيرية من ركود تقني.
* **الولايات المتحدة**: تتمتع بعزلة نسبية من حيث استقلال النفط الخام، لكنها لا تزال عرضة لانتقال الأسعار العالمي المنظومي. وارتفعت معدلات أسعار البنزين بالتجزئة في الولايات المتحدة نحو 4.00 دولارات للجالون، مما أجبر مجلس الاحتياطي الفيدرالي على الموازنة بدقة بين مخاطر الركود التضخمي وتأخير خفض أسعار الفائدة.

---

### ثالثاً: الفشل المنظومي اللوجستي والتأثيرات الارتدادية
نظراً لأن ممر البحر الأحمر / باب المندب يواجه في الوقت نفسه اختناقاً أو يعمل بطاقات منخفضة للغاية بسبب الأعمال العدائية الموازية، فلا يوجد اختصار بحري قابل للتطبيق.

* **الالتفاف الطويل**: يجب على حركة الحاويات والناقلات التجارية تغيير مسارها حول رأس الرجاء الصالح (جنوب أفريقيا)، مما يضيف 10 إلى 14 يوماً من وقت العبور الإضافي. هذا الأمر يجمد مليارات الدولارات من رأس المال ويفرض رسوماً إضافية طارئة على الشحن عبر جميع الخطوط العالمية الكبرى.
* **شح الحاويات**: تسببت الأزمة في احتجاز ملايين الحاويات الفارغة أو تكدسها داخل مراكز الخليج العربي المغلقة (مثل جبل علي)، مما أدى إلى تعطيل دوران المعدات العالمي بالكامل وإبطاء سلاسل توريد الأجهزة التكنولوجية المتقدمة في جميع أنحاء العالم.
* **التهديد الزراعي**: ينتج الخليج العربي حوالي ثلث اليوريا والأمونيا المتداولة دولياً في العالم. ويهدد توقف شحن الأسمدة عبر هرمز بخفض إنتاجية المحاصيل الزراعية عالمياً بحلول دورة الحصاد المقبلة، مما يحول الحرب البحرية إلى قضية تسعير غذاء هيكلية على مستوى العالم.`,
    contentEn: `### Timeframe: Updated Data to July 2026

### Baseline Assessment: Systemic Macroeconomic Shock
The ongoing blockade of the Strait of Hormuz represents the largest supply disruption in the history of global oil markets, acting as a systemic macroeconomic shock costing the global economy an estimated $1 billion per day.

---

### I. Quantified Direct Losses Equation
Before the outbreak of hostilities on February 28, 2026, the Strait of Hormuz transported approximately 20% of the world's daily petroleum supply (about 20-21 million barrels per day) and 20% of global liquefied natural gas (LNG). The systemic closure of this gateway created a deep deficit in the global market balance:

* **Supply Deficit**: Approximately 11 million barrels per day of crude oil production was knocked entirely offline after the initial escalation. Even with alternative routes running at maximum capacity, the global market faces an active, unmitigated deficit of 6 million bpd.
* **Commodity Price Spikes**: Brent crude immediately surged from around $80 to over $120-$126 per barrel at its peak. Near-term delivery risk premiums remain elevated by $15 to $40 per barrel.
* **Volume of Lost Oil Wealth**: By mid-2026, energy analysts estimate that the cumulative volume of lost or stranded oil production reached between 600 million and 700 million barrels, on track to hit 1 billion total lost barrels if the naval blockade persists through the second half of the year.

---

### II. Who is Affected? The Multi-Level Impact Matrix

#### Level 1: Exporting GCC Nations (Severe Financial & Structural Blows)
Despite possessing immense sovereign wealth, regional producers face the heaviest domestic burden due to physical infrastructure constraints:

| Country | Pre-War Export Reality | Current Operational Status & Losses (July 2026) |
| :--- | :--- | :--- |
| **Iraq** | Exported ~4 million bpd. | Hardest hit overall. Its production collapsed by 3.3 million bpd (80% drop in export capacity). It faces a complete bottleneck, relying on a single pipeline through Turkey carrying only 300,000 bpd. |
| **Saudi Arabia** | Heavily dependent on Gulf ports. | Lost 2.5 million bpd in maritime transit. However, mitigated an absolute collapse by operating the East-West pipeline to the Red Sea port of Yanbu at its full capacity of 7 million bpd. |
| **UAE** | Strongly integrated into Gulf shipping corridors. | Production fell by 2 million bpd. Currently relies on limited export diversions (~1.5 million bpd) pumped via Fujairah port outside the Strait on the Gulf of Oman. |
| **Qatar** | The global backbone of liquefied natural gas. | Declared force majeure on all exports after its Ras Laffan facilities were targeted, withdrawing 20% of the world's LNG supply overnight and causing panic in global gas markets. |
| **Iran** | The blockading power. | Suffers from a devastating counter-blockade by the US Navy. The combined loss of oil exports and domestic import disruptions costs the Iranian local economy an estimated $435 million daily. |

#### Local Calorie Crisis in the GCC:
Beyond the energy sector, GCC states face an "acute food supply emergency." Because these nations rely on the Strait to secure over 80% of their food needs, 70% of food imports were immediately disrupted, forcing regional retailers to run costly emergency airlifts to prevent basic commodity shortages.

#### Level 2: Net Importers (Asia Takes the Hardest & Earliest Blow)
The physical flow of energy from Hormuz is a structural pillar of Asian industrial survival. China, India, Japan, and South Korea historically absorbed 75% of the oil and 59% of the LNG passing through the narrow Strait.

* **Highly Vulnerable Developing Nations**: Emerging economies like India, Pakistan, Bangladesh, Sri Lanka, and Nepal experienced severe shortages. Direct consequences included mandatory LPG rationing and strict remote work policies to artificially curb local fuel consumption.
* **The Chinese Buffer**: While China's crude import volumes are under severe stress, its rapid structural shift toward electric vehicles (EVs) and massive high-speed rail networks provided an economic buffer, allowing it to withstand the supply shock with less core industrial damage compared to prior decades.

#### Level 3: Western Economies (Delayed Macroeconomic Pressures)
Despite geographical distance from immediate supply disruptions, Western markets absorb secondary economic shockwaves:

* **Europe**: Already deprived of Russian pipeline gas, the abrupt suspension of Qatari LNG triggered a secondary European energy crisis. Consequently, the European Central Bank (ECB) was forced to adjust its monetary easing cycle, raising inflation forecasts and cutting GDP growth outlooks amid warning signs of a technical recession.
* **United States**: Relatively insulated in terms of crude independence, but remains vulnerable to systemic global price transmission. US retail gasoline averages rose toward $4.00 per gallon, forcing the Federal Reserve to carefully balance stagflation risks and delay interest rate cuts.

---

### III. Systemic Logistical Failures & Ricochet Effects
Since the Red Sea / Bab-el-Mandeb corridor simultaneously faces choking or runs at extremely low capacity due to parallel hostilities, no viable maritime shortcut exists.

* **The Long Detour**: Commercial container and tanker traffic must reroute around the Cape of Good Hope (South Africa), adding 10 to 14 days of extra transit time. This freezes billions in capital and imposes emergency shipping surcharges across all major global lines.
* **Container Crunch**: The crisis trapped millions of empty containers inside closed Arabian Gulf hubs (like Jebel Ali), disrupting global equipment rotation and slowing down high-tech hardware supply chains worldwide.
* **Agricultural Threat**: The Arabian Gulf produces about one-third of the world's internationally traded urea and ammonia. The disruption of fertilizer shipments through Hormuz threatens to reduce global agricultural crop yields by the next harvest cycle, transforming a naval war into a structural global food pricing issue.`
  },
  {
    id: 'bab-el-mandeb-closure-2026',
    codeName: 'GATE OF TEARS ANALYSIS',
    titleAr: 'مضيق باب المندب وتداعيات الإغلاق الكامل في عام 2026',
    titleEn: 'The Bab-el-Mandeb Strait and the Consequences of a Complete Closure in 2026',
    summaryAr: 'دراسة جيوسياسية واستخبارية استثنائية حول تضاعف الأهمية الاستراتيجية لباب المندب كحلقة وصل بديلة وحرجة للتجارة العالمية، والأبعاد الاقتصادية والإنسانية الكارثية المترتبة على سيناريو الإغلاق الكامل.',
    summaryEn: 'An exceptional intelligence and geopolitical study on the doubled strategic importance of the Bab-el-Mandeb Strait as an alternative maritime node, outlining the catastrophic economic and humanitarian impacts of a potential full closure scenario.',
    threatLevel: 'HIGH',
    regionAr: 'البحر الأحمر / مضيق باب المندب / القرن الإفريقي',
    regionEn: 'Red Sea / Bab-el-Mandeb Strait / Horn of Africa',
    coordinates: '12.58° N, 43.32° E',
    dateAr: '١٧ يوليو ٢٠٢٦',
    dateEn: 'July 17, 2026',
    sourceAr: 'وحدة الرصد الجيوسياسي واللوجستي بالورّاق',
    sourceEn: 'Al-Warraq Geopolitical & Logistical Monitoring Desk',
    contentAr: `### الإطار الجغرافي: "بوابة الدموع"

يُعد مضيق باب المندب، المعروف تاريخياً بـ "بوابة الدموع"، أحد أهم الشرايين الجيوسياسية والاقتصادية في العالم. يربط المضيق البحر الأحمر بخليج عدن والمحيط الهندي، ويمثل البوابة الجنوبية لقناة السويس. في ظل الاضطرابات الإقليمية المستمرة والحرب الإيرانية وتأثر مضيق هرمز في عام 2026، تضاعفت الأهمية الاستراتيجية لباب المندب كحلقة وصل بديلة وحرجة للتجارة العالمية.

*المصدر: Al Jazeera + 2*

---

### أولاً: الأهمية الحالية بالأرقام والإحصائيات

* **حجم التجارة العالمية**: يمر عبر المضيق ما بين 10% إلى 12% من إجمالي التجارة البحرية العالمية سنوياً، بقيمة تتجاوز 1 تريليون دولار.  
  *المصدر: horn review*
* **حركة الحاويات**: يستوعب المضيق وقناة السويس حوالي 30% من حركة نقل الحاويات عالمياً، وهو الرابط الأساسي لسلع آسيا المتجهة إلى الأسواق الأوروبية.
* **إمدادات الطاقة**: يتدفق عبر المضيق حوالي 4.2 إلى 4.9 مليون برميل من النفط الخام والمنتجات البترولية يومياً، بالإضافة إلى شحنات ضخمة من الغاز الطبيعي المسال (LNG) المتجهة لأوروبا.  
  *المصدر: Council on Foreign Relations*
* **السلع الاستهلاكية والغذائية**: يعبر المضيق ثلث واردات أوروبا، بما في ذلك 13% من السيارات وأجزائها، والعديد من السلع الأساسية والمواد الزراعية كالقمح والأسمدة.  
  *المصدر: Observer Research Foundation Middle East*

---

### ثانياً: سيناريو الإغلاق الكامل وتأثيره المباشر

إذا أُغلق مضيق باب المندب بشكل كامل نتيجة تصعيد عسكري (مثل توسع هجمات جماعة أنصار الله "الحوثيين" أو زرع الألغام البحرية)، فإن التداعيات ستكون كارثية فوراً:  
*المصدر: Al Jazeera*

#### 1. الصدمة المزدوجة للطاقة والتجارة (معضلة هرمز وباب المندب)
في ظل الإغلاق الفعلي الفترات السابقة لمضيق هرمز في عام 2026، فإن إغلاق باب المندب بالتزامن معه يعني شل ما يقرب من 25% من إمدادات النفط والغاز العالمية. هذا السيناريو قد يدفع بأسعار النفط (خام برنت) للقفز فوراً لتتجاوز حاجز 150 إلى 200 دولار للبرميل.

#### 2. سلاسل الإمداد العالمية والبديل الإفريقي
إغلاق المضيق يعني حظر الملاحة عبر قناة السويس تلقائياً. ستضطر السفن إلى الدوران حول إفريقيا عبر طريق رأس الرجاء الصالح. هذا البديل يفرض الأعباء التالية:  
*المصدر: Observer Research Foundation Middle East + 2*

* **زيادة في مسافة الرحلة**: زيادة في المسافة بنسبة تصل إلى 48%.
* **زيادة زمن الشحن**: إضافة 10 إلى 14 يوماً إضافية لزمن الشحن.
* **كلفة الوقود والـتأمين**: زيادة تكاليف الوقود بمقدار 1.2 إلى 1.8 مليون دولار لكل رحلة ذهاب وإياب، فضلاً عن قفزات في أقساط التأمين ضد مخاطر الحرب بنسب تتجاوز 1000%.

---

### ثالثاً: الأثر الاقتصادي والإنساني على المنطقة (الشرق الأوسط وإفريقيا)

\`\`\`
                       أثر إغلاق باب المندب على المنطقة
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
   مصر (قناة السويس)          القرن الإفريقي واليمن          دول الخليج العربي
  خسارة خطيرة للإيرادات        تفاقم المجاعة والأزمات        شلل موانئ البحر الأحمر
   التي تدعم الموازنة           بسبب توقف استيراد           وتعطل خطوط الأنابيب البديلة
  والاحتياطي النقدي.            المواد الغذائية والقمح.      (مثل خط شرق-غرب السعودي).
\`\`\`

* **مصر وقناة السويس**: تُعد مصر المتضرر الأكبر المباشر؛ حيث إن شل حركة باب المندب يُترجم مباشرة إلى توقف شبه تام لعوائد قناة السويس، وهي مصدر رئيسي للنقد الأجنبي للبلاد، مما يهدد الاستقرار المالي الإجمالي.
* **اليمن ودول القرن الإفريقي (جيبوتي، إريتريا، الصومال)**: يعتمد القرن الإفريقي واليمن بشكل شبه كامل على المساعدات والواردات البحرية. إغلاق المضيق سيتسبب في أزمة أمن غذائي حادة، وتشير تقديرات الأمم المتحدة إلى احتمالية دفع 45 مليون شخص إضافي نحو انعدام الأمن الغذائي الحاد في المنطقة.
* **المملكة العربية السعودية ودول الخليج**: رغم امتلاك السعودية لخط أنابيب "شرق-غرب" لنقل النفط إلى الموانئ على البحر الأحمر (ينبع) لتفادي أزمة هرمز، إلا أن إغلاق باب المندب يجعل موانئ البحر الأحمر محاصرة من الجنوب، مما يعطل استراتيجية الالتفاف التصديرية تماماً ويشل موانئ تجارية عملاقة كـ "ميناء جدة الإسلامي".

---

### رابعاً: ميزان الاحتماليات (هل الإغلاق الكامل ممكن؟)

رغم خطورة السيناريو، فإن الاحتمالية تظل متوسطة إلى منخفضة للإغلاق الفيزيائي الكامل الطويل، ولكنه مرتفع جداً من حيث التعطيل العملياتي المستمر، وذلك للأسباب التالية:

* **التعقيد الجغرافي**: يبلغ عرض المضيق 29 كم، وهو مقسوم بجزيرة "بريم" (ميون) اليمنيّة إلى قنوات ملاحة. تسيطر قوى مختلفة على ضفتيه (اليمن من الشرق، وجيبوتي وإريتريا من الغرب). لا تستطيع دولة واحدة إغلاقه قانونياً أو فيزيائياً بسهولة.  
  *المصدر: Al Jazeera*
* **الرد الدولي العسكري**: الإغلاق الكامل لباب المندب يمثل خطاً أحمر للولايات المتحدة، دول الاتحاد الأوروبي، والصين (التي تمتلك قاعدة عسكرية في جيبوتي). أي محاولة للإغلاق الشامل ستجابه برد عسكري دولي عنيف وفوري لحماية حرية الملاحة.
* **سلاح المسيرات والصواريخ (الإغلاق الفعلي)**: الاحتمال الأقرب للواقع —والذي حدثت نماذج منه بالفعل— هو الإغلاق الاقتصادي بفرض حظر ناري؛ حيث تستطيع القوى المحلية (كالحوثيين) عبر الصواريخ المضادة للسفن والمسيرات جعل المرور انتحارياً للشركات التجارية، وهو ما يحقق تأثير الإغلاق دون الحاجة لسيطرة عسكرية بحرية كاملة.`,
    contentEn: `### Geographical Framework: The "Gate of Tears"

The Bab-el-Mandeb Strait, historically known as the "Gate of Tears," is one of the most critical geopolitical and economic arteries in the world. Connecting the Red Sea to the Gulf of Aden and the Indian Ocean, it represents the southern gateway to the Suez Canal. In light of ongoing regional conflicts, the Iranian war, and the disruption of the Strait of Hormuz in 2026, the strategic importance of Bab-el-Mandeb has doubled as an alternative and highly critical link for global trade.  
*Source: Al Jazeera + 2*

---

### I. Current Importance in Numbers and Statistics

* **Global Trade Volume**: Between 10% and 12% of total global maritime trade passes through the strait annually, with a value exceeding $1 trillion.  
  *Source: horn review*
* **Container Traffic**: The strait and the Suez Canal accommodate approximately 30% of global container shipping movement, serving as the primary link for Asian goods heading to European markets.
* **Energy Supplies**: Around 4.2 to 4.9 million barrels of crude oil and petroleum products flow through the strait daily, alongside massive shipments of Liquefied Natural Gas (LNG) bound for Europe.  
  *Source: Council on Foreign Relations*
* **Consumer and Agricultural Goods**: The strait carries one-third of Europe's imports, including 13% of vehicles and automotive parts, as well as essential commodities and agricultural materials such as wheat and fertilizers.  
  *Source: Observer Research Foundation Middle East*

---

### II. Full Closure Scenario and Immediate Impact

If the Bab-el-Mandeb Strait is completely closed due to military escalation (such as expanded attacks by the Ansar Allah "Houthi" group or maritime mining), the consequences would be immediately catastrophic:  
*Source: Al Jazeera*

#### 1. The Double Energy and Trade Shock (The Hormuz & Bab-el-Mandeb Dilemma)
In light of the effective closure of the Strait of Hormuz during previous periods in 2026, a simultaneous closure of Bab-el-Mandeb would paralyze nearly 25% of global oil and gas supplies. This scenario could push crude oil prices (Brent) to instantly surge past $150 to $200 per barrel.

#### 2. Global Supply Chains and the African Alternative
Closing the strait automatically blocks navigation through the Suez Canal. Vessels would be forced to circumnavigate Africa via the Cape of Good Hope. This alternative imposes severe burdens:  
*Source: Observer Research Foundation Middle East + 2*
* **Route Distance Increase**: A journey distance increase of up to 48%.
* **Transit Delay**: Adding an extra 10 to 14 days of shipping time.
* **Fuel and Insurance Costs**: An increase of $1.2M to $1.8M in fuel costs per round trip, alongside war risk insurance premium surges exceeding 1000%.

---

### III. Economic and Humanitarian Impact on the Region (Middle East & Africa)

\`\`\`
                     Impact of Bab-el-Mandeb Closure on the Region
                                          │
             ┌────────────────────────────┼────────────────────────────┐
             ▼                            ▼                            ▼
      Egypt (Suez Canal)           Horn of Africa & Yemen         Gulf Arab States
    Severe revenue losses         Exacerbated famine & crisis    Red Sea ports paralyzed
    supporting budget & forex     due to halting of food         and bypass pipelines (like
    reserves stability.           and wheat imports.             Saudi East-West) blocked.
\`\`\`

* **Egypt and the Suez Canal**: Egypt would be the most direct major victim. Paralyzing Bab-el-Mandeb translates directly into a near-complete shutdown of Suez Canal revenues—a key source of foreign currency for the country, threatening overall fiscal stability.
* **Yemen and the Horn of Africa (Djibouti, Eritrea, Somalia)**: The Horn of Africa and Yemen rely almost entirely on maritime imports and aid. A closure would trigger an acute food security crisis, with UN estimates predicting that an additional 45 million people could be pushed into severe food insecurity.
* **Saudi Arabia and the Gulf States**: Although Saudi Arabia possesses the "East-West" pipeline to transport oil to Red Sea ports (Yanbu) to bypass a Hormuz crisis, the closure of Bab-el-Mandeb blockades the Red Sea ports from the south. This completely disrupts the export bypass strategy and paralyzes massive commercial hubs like the "Jeddah Islamic Port."

---

### IV. Balance of Probabilities (Is a Complete Closure Likely?)

Despite the severity of the scenario, the probability remains moderate-to-low for a prolonged physical closure, but highly elevated for continuous operational disruption, due to:

* **Geographical Complexity**: The strait is 29 km wide, split by Yemen's Perim (Mayun) Island into shipping channels. Different powers control its shores (Yemen on the east, Djibouti and Eritrea on the west). No single nation can easily block it legally or physically.  
  *Source: Al Jazeera*
* **International Military Response**: A complete closure of Bab-el-Mandeb represents a red line for the United States, EU countries, and China (which has a military base in Djibouti). Any attempt at a full blockade would be met with an immediate, massive international military response to protect freedom of navigation.
* **Drone and Missile Warfare (Effective Blockade)**: The most realistic probability—instances of which have already occurred—is an economic blockade via a "fire lock." Local forces (such as the Houthis) using anti-ship missiles and drones can make passage suicidal for commercial operators, achieving the effect of a closure without needing full naval control.`
  },
  {
    id: 'ny-time-ruin-betrayal-2026',
    codeName: 'NEW YORK DESPATCH',
    titleAr: 'بتوقيت نيويورك والخراب: حين تصبح "خيانة" الحلفاء خبراً يوازي في أهميته تغطية مجازر الحروب!',
    titleEn: 'New York Time & Ruin: When "Betrayal" of Allies Rivals War Massacre Coverage!',
    summaryAr: 'قراءة استثنائية في المقال الافتتاحي لصحيفة وول ستريت جورنال حول التصويت الدراماتيكي في الكابيتول لحظر الأسلحة عن إسرائيل وتداعياته التاريخية والسياسية المشابهة لسيناريو فيتنام.',
    summaryEn: 'An exceptional read of the Wall Street Journal editorial on the dramatic Capitol vote to block arms to Israel, its historical implications, and its eerie similarity to the Vietnam War finale.',
    threatLevel: 'HIGH',
    regionAr: 'الولايات المتحدة / الكابيتول / واشنطن - نيويورك',
    regionEn: 'United States / Capitol / Washington - New York',
    coordinates: '40.71° N, 74.00° W',
    dateAr: '١٧ يوليو ٢٠٢٦',
    dateEn: 'July 17, 2026',
    sourceAr: 'بقلم: معن برازي - رئيس التحرير',
    sourceEn: 'By: Maan Barazy - Editor-in-Chief',
    contentAr: `### افتتاحية رئيس التحرير: بتوقيت نيويورك والخراب

نقلت صحيفة "وول ستريت جورنال" (WSJ) قراءةً "مفجعة" -بالمعايير السياسية الأميركية- تكاد من فرط دلالاتها توازي في الأهمية التغطيات الميدانية الساخنة القادمة من خطوط النار وجبهات الحروب المشتعلة. المقال الافتتاحي للصحيفة جاء مشحوناً بسخرية سوداء وذهول مريب من تحوّل دراماتيكي داخل أروقة الكابيتول؛ حيث صوّت 103 نواب ديمقراطيين يوم الأربعاء لصالح مشروع قانون يهدف إلى حظر الأسلحة الأميركية عن إسرائيل وهي تخوض "حرباً متعددة الجبهات". الصحيفة اعتبرت خطوتهم هذه بمثابة "تخلٍّ صادم عن حليف"، وعلامة فارقة على السقوط السريع للحزب الديمقراطي في قبضة جناحه المناهض لإسرائيل، في استعادةٍ درامية لسيناريو خيانة أخرى جرت قبل نصف قرن.. في فيتنام!

المفارقة الساخرة أن هذا المشروع الراديكالي -الذي يهدف لتجريد إسرائيل من كافة أشكال الدعم، بما في ذلك المساعدات الإنسانية والعسكرية، الدفاعية والهجومية على حد سواء- لم يكن من صنيعة الديمقراطيين أصلاً، بل طرحه النائب الجمهوري "الانعزالي" توماس ماسي (من ولاية كنتاكي). وكان هو الجمهوري الوحيد الذي صوّت لصالحه، ليسقط المشروع في النهاية بأغلبية 314 صوتاً مقابل 104.

---

### الصدمة الحقيقية: انقسام ديمقراطي حاد

لكن "الصدمة" الحقيقية التي تستحق مانشيتات الحروب، تكمن في أن نصف الديمقراطيين تقريباً صوّتوا مع المشروع! ولم يكن هؤلاء مجرد نواب هامشيين، بل شملت القائمة رئيسة مجلس النواب السابقة نانسي بيلوسي، والرجل الثاني في قيادة الحزب كاثرين كلارك (من ماساتشوستس)، في حين فضّل 10 نواب آخرين التصويت بـ "ممتنع" في استعراض "شجاع" لعدم اتخاذ موقف! كلارك بررت موقفها قبل التصويت معلنةً بجرأة: "من الواضح أن الوضع الحالي غير قابل للاستمرار.. لا ينبغي لنا تقديم شيك على بياض لأي دولة لا تمتثل للقوانين والمصالح والقيم الأميركية، وحكومة بنيامين نتنياهو فشلت في تلبية هذا المعيار".

بالطبع، تعقب "وول ستريت جورنال" بنبرة متهكمة: إسرائيل لم تنتهك أي قانون أميركي نعلمه. أما عن "المصالح الأميركية"، فإسرائيل تقاتل جنباً إلى جنب مع الولايات المتحدة ضد إيران، وتقاتل بمفردها وكلاء إيران الذين قتلوا أميركيين. إن الشراكة الدفاعية مع إسرائيل هي ميزة عسكرية أميركية تحافظ على التفوق التكنولوجي لواشنطن في مواجهة الخصوم. وعندما يصوّت الديمقراطيون للتخلي حتى عن منظومة "القبة الحديدية" الدفاعية، فإن هذا لا يعدو كونه "تخريباً ذاتياً" مدفوعاً بعداء أعمى لإسرائيل.

---

### استدعاء شبح فيتنام والانهيار التاريخي

إن معارضة سياسات ترامب تجاه إيران شيء، أما اتخاذ خطوة راديكالية بقطع الحبل عن حليف صامد فشيء آخر تماماً. كيف أصبحت "القيم" الأميركية تفرض تجريد حليف من السلاح وهو يقاتل أعداء يطلقون الصواريخ على بلدات مدنية؟

كل هذا المشهد يعيد إلى الأذهان النهاية الحزينة لحرب فيتنام، عندما قاتل الديمقراطيون لسنوات لقطع التمويل عن فيتنام الجنوبية, وقيدوا المساعدات، ورفضوا استغاثاتها في عام 1975، مما سمح للهجوم الشيوعي الفيتنامي الشمالي باجتياح الجنوب، ودفع بأكثر من مليون من "سكان القوارب" (اللاجئين) إلى عرض المحيط.

هذا هو المنحدر الذي يبدو أن الحزب الديمقراطي -وبعض أطراف اليمين المتطرف- يتجهون نحوه بسرعة. ولعل الإشارة الأكثر تعبيراً هنا هي أن نائباً مثل سيث مولتون، الذي طالما اتسم بالعقلانية في السياسة الخارجية، صوّت لتجريد إسرائيل من السلاح لمجرد أنه ينافس في الانتخابات التمهيدية لمجلس الشيوخ الديمقراطي في ماساتشوستس؛ ما يعني أن القواعد الشعبية للحزب أصبحت هناك تماماً.

---

### الخلاصة الجيوسياسية: انزياح أيديولوجي عميق

\`\`\`
                         الخريطة الأيديولوجية للتصويت في الكابيتول
                                            │
               ┌────────────────────────────┴────────────────────────────┐
               ▼                                                         ▼
       الحزب الديمقراطي                                          الحزب الجمهوري
   انقسام حاد (١٠٣ نواب مع الحظر)                           تماسك شبه تام ضد الحظر
   نانسي بيلوسي وكاثرين كلارك مع الحظر                       (النائب توماس ماسي الاستثناء الوحيد)
\`\`\`

قد يقلل البعض من أهمية هذا التصويت البرلماني بحجة أن الجميع كان يعلم أن مشروع "ماسي" سيسقط لا محالة. لكن الخطأ الفادح يكمن في الاعتقاد بأن هذه مجرد حادثة عابرة. إن الزخم السياسي المناهض لإسرائيل ينمو ويتصاعد، وحتى لو أطاح الإسرائيليون برئيس الوزراء نتنياهو في انتخابات تشرين الأول (أكتوبر) المقبلة، فإن هذه الحركة الأيديولوجية ترى في إسرائيل "شراً مطلقاً" وفي الإرهابيين الفلسطينيين "ضحايا".

باختصار؛ إن الحزب الذي أسسه هاري ترومان، الذي اعترف بإسرائيل في لحظة أزمة تأسيسها، يتحول اليوم بسرعة وبسخرية القدر إلى حزب "زهران ممداني" (الاشتكي الديمقراطي الراديكالي). إنها، بلا شك، خيانة للتاريخ.. خيانة تاريخية بكل المقاييس.`,
    contentEn: `### Editor-in-Chief Editorial: New York Time & Ruin

The Wall Street Journal (WSJ) published a "devastating" analysis—by American political standards—whose implications run so deep that they rival the heat of live battlefield coverage from active war zones. The journal's editorial was charged with dark irony and a sense of shock at a dramatic shift within the halls of Capitol Hill; on Wednesday, 103 Democratic representatives voted in favor of a bill aimed at banning U.S. weapons from Israel as it fights a "multi-front war." The Journal deemed their move a "shocking abandonment of an ally," marking a milestone in the Democratic Party’s swift descent into the grip of its anti-Israel wing, echoing a historic betrayal from half a century ago in Vietnam.

The ultimate irony is that this radical bill—which targeted the stripping of all forms of support, including humanitarian, military, defensive, and offensive aid alike—was not even a Democratic creation. It was introduced by the "isolationist" Republican Representative Thomas Massie of Kentucky, who was the sole Republican to support it, leading the bill to fail in a final 314-104 vote.

---

### The Real Shock: A Deep Democratic Fracture

However, the real shockworthy development is that nearly half of the House Democrats voted for the bill. These were not marginal backbenchers; the list included former House Speaker Nancy Pelosi and the second-ranking House Democrat Katherine Clark of Massachusetts, while 10 other Democrats chose to vote "present" in a "courageous" display of avoiding taking a stance. Before the vote, Clark boldly justified her position: "It is clear that the status quo is unsustainable... we should not write a blank check to any nation that does not align with American laws, interests, and values—and Benjamin Netanyahu’s government has failed to meet that standard."

The Wall Street Journal reacted with biting sarcasm: Israel has not violated any American law that we know of. As for "American interests," Israel is fighting side-by-side with the United States against Iran, fighting alone against Iranian proxies who have killed Americans. The defense partnership with Israel is a military asset for the U.S. that maintains Washington's technological edge against adversaries. For Democrats to vote to abandon even the defensive "Iron Dome" system is nothing short of "self-sabotage" driven by blind hostility.

---

### Summoning the Ghost of Vietnam and Historical Collapse

Opposing Trump's policy toward Iran is one thing; taking a radical step to cut the cord on a resilient ally is entirely another. How have American "values" come to dictate stripping an ally of weapons as they battle adversaries firing missiles at civilian towns?

This entire spectacle recalls the sad end of the Vietnam War, when Democrats fought for years to cut off funding for South Vietnam, restricted aid, and ignored its desperate pleas in 1975, paving the way for the North Vietnamese communist offensive to overrun the South and driving more than a million "boat people" refugees into the ocean.

This is the precipice toward which the Democratic Party—and some far-right factions—appear to be rapidly heading. The most telling sign is that a representative like Seth Moulton, historically known for rational foreign policy views, voted to disarm Israel simply because he is competing in a Democratic primary for the U.S. Senate in Massachusetts. This suggests the party's grassroots base has moved entirely to that corner.

---

### Geopolitical Summary: A Deep Ideological Shift

\`\`\`
                        Ideological Map of the Capitol Vote
                                         │
             ┌───────────────────────────┴───────────────────────────┐
             ▼                                                       ▼
      Democratic Party                                       Republican Party
   Deep split (103 votes for ban)                         Near-total cohesion against ban
   Nancy Pelosi & Katherine Clark supported ban            (Rep. Thomas Massie sole exception)
\`\`\`

Some might downplay this parliamentary vote, arguing that everyone knew the Massie bill was bound to fail. But the fatal error lies in believing this is just a passing anomaly. The anti-Israel political momentum is growing and escalating. Even if Israelis oust Prime Minister Netanyahu in the upcoming October elections, this ideological movement views Israel as an "absolute evil" and Palestinian terrorists as "victims."

In short, the party founded by Harry Truman, who recognized Israel at the critical moment of its birth, is rapidly and ironically transforming into the party of Zohran Mamdani (the radical democratic socialist). It is, without a doubt, a historic betrayal—by all measures.`
  }
];

export default function WarRoom({ 
  language, 
  layoutMode = 'digital',
  selectedDossierId: propSelectedDossierId,
  onSelectDossier: propOnSelectDossier,
  onOpenQrShare,
  latestBreaking
}: WarRoomProps) {
  const isAr = language === 'ar';
  
  const [localSelectedDossierId, setLocalSelectedDossierId] = useState<string>('strait-of-fire-2026');
  
  const selectedDossierId = propSelectedDossierId && TACTICAL_DOSSIERS.some(d => d.id === propSelectedDossierId)
    ? propSelectedDossierId 
    : localSelectedDossierId;
    
  const setSelectedDossierId = (id: string) => {
    if (propOnSelectDossier) {
      propOnSelectDossier(id);
    }
    setLocalSelectedDossierId(id);
  };
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [threatFilter, setThreatFilter] = useState<string>('ALL');
  const [copiedDossierId, setCopiedDossierId] = useState<string | null>(null);
  const [copiedMainDossier, setCopiedMainDossier] = useState<boolean>(false);
  
  // Tactical telemetry display states
  const [blockadeRisk, setBlockadeRisk] = useState<number>(78);
  const [activeSensors, setActiveSensors] = useState<number>(14);
  const [straitStatus, setStraitStatus] = useState<'CONTRASTED' | 'BLOCKED' | 'NORMAL'>('CONTRASTED');

  // Breathing glow states triggered by new breaking reports
  const [isGlowing, setIsGlowing] = useState<boolean>(false);
  const [lastSeenBreakingId, setLastSeenBreakingId] = useState<string | null>(null);
  const [simulatedBreaking, setSimulatedBreaking] = useState<{
    titleEn: string;
    titleAr: string;
    active: boolean;
  } | null>(null);

  // Trigger glow effect when a new breaking report is pushed to the live wire
  useEffect(() => {
    if (latestBreaking) {
      if (!lastSeenBreakingId) {
        // Initialize with current latest breaking without flashing initially
        setLastSeenBreakingId(latestBreaking.id);
      } else if (latestBreaking.id !== lastSeenBreakingId) {
        // A new breaking report has been pushed!
        setLastSeenBreakingId(latestBreaking.id);
        setIsGlowing(true);
        
        // Auto-turn off intense breathing glow after 25 seconds to keep it elegant and non-intrusive
        const timer = setTimeout(() => {
          setIsGlowing(false);
        }, 25000);
        return () => clearTimeout(timer);
      }
    }
  }, [latestBreaking, lastSeenBreakingId]);

  // Helper to trigger simulated breaking wire push
  const triggerSimulatedBreakingPush = () => {
    setIsGlowing(true);
    setSimulatedBreaking({
      titleEn: "FLASH WIRE: Fifth Fleet signals increased radar clutter; threat level synchronized",
      titleAr: "بث عاجل: الأسطول الخامس يرصد تشويشاً رادارياً متصاعداً وتأهب مستوى التهديد",
      active: true
    });
    
    // Auto-clear simulation text after 15 seconds
    setTimeout(() => {
      setSimulatedBreaking(prev => prev ? { ...prev, active: false } : null);
    }, 15000);
    
    // Auto-fade threat glow after 25 seconds
    setTimeout(() => {
      setIsGlowing(false);
    }, 25000);
  };

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

  const downloadDossierPDF = (d?: TacticalDossier) => {
    const targetDossier = d || activeDossier;
    const title = isAr ? targetDossier.titleAr : targetDossier.titleEn;
    const summary = isAr ? targetDossier.summaryAr : targetDossier.summaryEn;
    const content = isAr ? targetDossier.contentAr : targetDossier.contentEn;
    const date = isAr ? targetDossier.dateAr : targetDossier.dateEn;
    const source = isAr ? targetDossier.sourceAr : targetDossier.sourceEn;
    const codeName = targetDossier.codeName;
    const coordinates = targetDossier.coordinates;
    const threat = targetDossier.threatLevel;

    // 1. Open beautiful print window for saving as a custom styled PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>CLASSIFIED_DECREE_${targetDossier.id.toUpperCase()}</title>
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
          <div className={`border p-3 rounded-md flex items-center gap-4 text-xs font-mono select-none shadow-md flex-1 md:flex-none transition-all duration-500 ${
            isGlowing 
              ? 'breathing-threat-glow border-red-500/80 bg-red-950/20' 
              : 'bg-zinc-900/40 border-zinc-800'
          }`}>
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
              <span className={`${
                isGlowing 
                  ? 'text-red-400 font-black drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' 
                  : 'text-red-600 font-bold'
              } text-[11px] tracking-wider uppercase flex items-center gap-1.5 mt-0.5 transition-all duration-500`}>
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                  isGlowing ? 'bg-red-400 animate-ping shadow-[0_0_8px_#ef4444]' : 'bg-red-600'
                }`}></span>
                {isGlowing ? (
                  isAr 
                    ? `مستوى الخطر: حرج (صدمة جديدة نشطة)` 
                    : `Level: CRITICAL (ACTIVE REPORT PUSH)`
                ) : (
                  isAr 
                    ? `الحالة الحالية: ${TACTICAL_DOSSIERS[0].threatLevel}` 
                    : `CURRENT STATUS: ${TACTICAL_DOSSIERS[0].threatLevel}`
                )}
              </span>
            </div>
          </div>

          {/* Telemetry quick status */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded flex flex-wrap items-center gap-4 text-xs font-mono select-none flex-1 md:flex-none">
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
            <div className="h-8 w-px bg-zinc-800"></div>
            <div>
              <span className="text-zinc-500 block uppercase text-[9px]">{isAr ? 'البث المباشر' : 'LIVE WIRE'}</span>
              <button 
                onClick={triggerSimulatedBreakingPush}
                className="px-1.5 py-0.5 rounded text-[10px] font-extrabold cursor-pointer transition-all bg-red-950 text-red-400 border border-red-800 hover:bg-red-900 hover:text-white"
                title={isAr ? 'بث خبر عاجل محاكي' : 'Push simulated breaking wire briefing'}
              >
                {isAr ? 'بث ⚡' : 'PUSH ⚡'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Live Wire Alert Banner */}
      <AnimatePresence>
        {isGlowing && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-red-950/40 border border-red-900/60 p-3 rounded-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-[9px] font-mono font-black text-red-400 bg-red-950/80 px-1.5 py-0.5 border border-red-900/40 rounded uppercase tracking-widest whitespace-nowrap">
                  {isAr ? 'إشارة عاجلة واردة' : 'LIVE WIRE INTERCEPT'}
                </span>
                <p className="text-xs font-sans text-zinc-100 font-extrabold leading-tight">
                  {simulatedBreaking?.active 
                    ? (isAr ? simulatedBreaking.titleAr : simulatedBreaking.titleEn)
                    : (latestBreaking 
                        ? (isAr ? `عاجل: ${latestBreaking.titleAr}` : `FLASH: ${latestBreaking.titleEn}`)
                        : (isAr ? 'تم رصد نشاط عسكري متزايد في المنطقة المجاورة' : 'Increased military activity detected in the active quadrant')
                      )
                  }
                </p>
              </div>
              <button 
                onClick={() => setIsGlowing(false)}
                className="text-zinc-500 hover:text-white font-mono text-[9px] font-black uppercase px-1.5 py-0.5 border border-zinc-800 rounded hover:border-zinc-700 transition-colors cursor-pointer shrink-0"
              >
                {isAr ? 'تجاهل' : 'DISMISS'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Map Section */}
      <div className="mb-8">
        <BypassInteractiveMap language={language} />
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
                  <div
                    key={dossier.id}
                    onClick={() => setSelectedDossierId(dossier.id)}
                    className={`w-full text-left rtl:text-right p-4 rounded-md border transition-all duration-250 flex flex-col gap-2.5 cursor-pointer relative group overflow-hidden ${
                      isActive 
                        ? 'bg-[#15181d] border-red-600/70 shadow-[0_0_12px_rgba(239,68,68,0.15)] text-white' 
                        : 'bg-[#101215] border-zinc-800 text-zinc-300 hover:bg-[#12151a] hover:border-zinc-700'
                    }`}
                  >
                    {/* Lateral indicator */}
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

                    {/* Share, Copy, WhatsApp, and PDF buttons */}
                    <div 
                      className="border-t border-dashed border-zinc-800 pt-2.5 mt-1 flex items-center justify-between gap-1.5 text-[10px] font-mono"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-1">
                        <MapPin size={8} className="text-zinc-500" />
                        <span className="text-[9px] text-zinc-500 truncate max-w-[65px]">{dRegion}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[9px]">
                        {/* Share QR */}
                        <button
                          onClick={() => {
                            const shareUrl = `${window.location.origin}/?article=${dossier.id}`;
                            onOpenQrShare?.(shareUrl);
                          }}
                          className="px-1.5 py-0.5 bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 font-bold border border-amber-600/40 rounded cursor-pointer transition-colors"
                          title={isAr ? 'مشاركة عبر رمز QR' : 'Share via QR Code'}
                        >
                          {isAr ? 'مشاركة' : 'SHARE'}
                        </button>

                        {/* Copy Link */}
                        <button
                          onClick={() => {
                            const shareUrl = `${window.location.origin}/?article=${dossier.id}`;
                            navigator.clipboard.writeText(shareUrl).then(() => {
                              setCopiedDossierId(dossier.id);
                              setTimeout(() => setCopiedDossierId(null), 2000);
                            });
                          }}
                          className={`px-1.5 py-0.5 font-bold border rounded cursor-pointer transition-all ${
                            copiedDossierId === dossier.id
                              ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400 animate-pulse'
                              : 'bg-zinc-800/20 border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                          }`}
                          title={isAr ? 'نسخ الرابط المباشر للملف' : 'Copy direct link to dossier'}
                        >
                          {copiedDossierId === dossier.id ? (isAr ? 'تم!' : 'COPIED') : (isAr ? 'نسخ' : 'LINK')}
                        </button>

                        {/* WhatsApp */}
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                            (isAr ? 'إيجاز استخباري عاجل من ديوان تحريات الوراق:\n\n' : 'Urgent Sovereign Intelligence from Al-Warraq:\n\n') +
                            `*${isAr ? dossier.titleAr : dossier.titleEn}*\n\n` +
                            `👉 ${window.location.origin}/?article=${dossier.id}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-1.5 py-0.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 font-bold border border-emerald-600/40 rounded cursor-pointer transition-colors"
                          title={isAr ? 'مشاركة عبر واتساب' : 'Share on WhatsApp'}
                        >
                          WA
                        </a>

                        {/* PDF Download */}
                        <button
                          onClick={() => downloadDossierPDF(dossier)}
                          className="px-1.5 py-0.5 bg-red-650/20 hover:bg-red-650/40 text-red-400 font-bold border border-red-900/40 rounded cursor-pointer transition-colors"
                          title={isAr ? 'تحميل كملف PDF' : 'Download PDF'}
                        >
                          PDF
                        </button>
                      </div>
                    </div>
                  </div>
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

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono select-none">
                <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-1 rounded">
                  {isAr ? activeDossier.dateAr : activeDossier.dateEn}
                </span>

                {/* QR Share */}
                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/?article=${activeDossier.id}`;
                    onOpenQrShare?.(shareUrl);
                  }}
                  className="bg-amber-950/60 hover:bg-amber-900 border border-amber-800 hover:border-amber-600 text-amber-200 hover:text-white px-2.5 py-1 rounded flex items-center gap-1.5 transition-all cursor-pointer text-[10px] font-extrabold uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                  title={isAr ? 'مشاركة عبر رمز QR' : 'Share via QR Code'}
                >
                  <QrCode size={11} className="text-amber-400" />
                  <span>{isAr ? 'مشاركة' : 'SHARE'}</span>
                </button>

                {/* Copy Link (CTO) */}
                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/?article=${activeDossier.id}`;
                    navigator.clipboard.writeText(shareUrl).then(() => {
                      setCopiedMainDossier(true);
                      setTimeout(() => setCopiedMainDossier(false), 2000);
                    });
                  }}
                  className={`${
                    copiedMainDossier 
                      ? 'bg-emerald-950/60 text-emerald-200 border-emerald-800' 
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                  } border hover:border-zinc-700 px-2.5 py-1 rounded flex items-center gap-1.5 transition-all cursor-pointer text-[10px] font-extrabold uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,0.5)]`}
                  title={isAr ? 'نسخ الرابط المباشر للمستند' : 'Copy direct link to document'}
                >
                  {copiedMainDossier ? (
                    <>
                      <Check size={11} className="text-emerald-400" />
                      <span>{isAr ? 'تم!' : 'COPIED'}</span>
                    </>
                  ) : (
                    <>
                      <Link size={11} className="text-zinc-400" />
                      <span>{isAr ? 'نسخ' : 'LINK'}</span>
                    </>
                  )}
                </button>
                
                {/* Download PDF button */}
                <button
                  onClick={() => downloadDossierPDF()}
                  className="bg-red-950/60 hover:bg-red-900 border border-red-800 hover:border-red-600 text-red-200 hover:text-white px-2.5 py-1 rounded flex items-center gap-1.5 transition-all cursor-pointer text-[10px] font-extrabold uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                  title={isAr ? 'تحميل كملف PDF' : 'Download PDF Brief'}
                >
                  <FileText size={11} className="text-red-400" />
                  <span>{isAr ? 'تنزيل PDF' : 'Download PDF'}</span>
                </button>

                {/* Share on WhatsApp link */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    (isAr ? 'إيجاز استخباري عاجل من ديوان تحريات الوراق:\n\n' : 'Urgent Sovereign Intelligence from Al-Warraq:\n\n') +
                    `*${isAr ? activeDossier.titleAr : activeDossier.titleEn}*\n\n` +
                    `👉 ${window.location.origin}/?article=${activeDossier.id}`
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
                if (paragraph.trim().startsWith('|')) {
                  const rows = paragraph.trim().split('\n').filter(row => row.trim() !== '' && !row.includes('---'));
                  if (rows.length > 0) {
                    return (
                      <div key={index} className="overflow-x-auto my-6 border border-zinc-800 bg-zinc-950/40 rounded-sm">
                        <table className="min-w-full divide-y divide-zinc-800 text-xs md:text-sm font-sans text-right rtl:text-right ltr:text-left">
                          <thead>
                            <tr className="bg-zinc-900/80 text-amber-400 font-bold">
                              {rows[0].split('|').map(cell => cell.trim()).filter(cell => cell !== '').map((cell, cIdx) => (
                                <th key={cIdx} className="px-4 py-3 select-all border-x border-zinc-800/50">{cell}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-800 text-zinc-300">
                            {rows.slice(1).map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-zinc-900/30 transition-colors">
                                {row.split('|').map(cell => cell.trim()).filter(cell => cell !== '').map((cell, cIdx) => (
                                  <td key={cIdx} className="px-4 py-3 font-normal border-x border-zinc-800/50">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                }
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

            {/* Custom Dossier Specific CTA and WhatsApp Share */}
            <div className="mt-8 border border-zinc-800 bg-zinc-950/80 p-5 rounded-md flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
              <div className="space-y-1 text-right sm:text-right rtl:text-right ltr:text-left w-full sm:w-auto">
                <span className="text-[9px] font-mono font-extrabold text-emerald-400 block uppercase tracking-wider">
                  {isAr ? '● خدمة النشر والمتابعة العاجلة' : '● SECURE DISPATCH & ALERTS SERVICE'}
                </span>
                <p className="text-xs font-sans text-zinc-300 font-medium">
                  {isAr 
                    ? `هل ترغب في مشاركة هذا الملف (${activeDossier.codeName}) أو مناقشته؟`
                    : `Do you want to share or discuss this secure brief (${activeDossier.codeName})?`}
                </p>
                <p className="text-[11px] font-sans text-zinc-500">
                  {isAr 
                    ? 'شارك المستند فوراً مع دائرتك المقربة عبر واتساب أو احصل على إشعارات حية حول تحديثات هذا الملف.'
                    : 'Instantly forward this tactical brief to your network or receive live alerts regarding its updates.'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0">
                {/* Specific Story WhatsApp Share */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    (isAr ? 'إيجاز استخباري عاجل من ديوان تحريات الوراق:\n\n' : 'Urgent Sovereign Intelligence from Al-Warraq:\n\n') +
                    `*${isAr ? activeDossier.titleAr : activeDossier.titleEn}*\n\n` +
                    `👉 ${window.location.origin}/?article=${activeDossier.id}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-xs px-4 py-2.5 rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.5)] w-full sm:w-auto"
                >
                  <MessageCircle size={14} className="text-white" />
                  <span>{isAr ? 'مشاركة عبر واتساب' : 'Share via WhatsApp'}</span>
                </a>

                {/* Specific Story CTA (Consult or Alert Subscription) */}
                <a
                  href={`https://api.whatsapp.com/send?phone=96170123456&text=${encodeURIComponent(
                    isAr 
                      ? `مرحباً، أود الاستفسار والحصول على تحديثات مستمرة ومباشرة حول ملف: ${activeDossier.titleAr}`
                      : `Hello, I would like to inquire and receive direct live updates about dossier: ${activeDossier.titleEn}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-zinc-200 hover:text-white font-sans font-bold text-xs px-4 py-2.5 rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.5)] w-full sm:w-auto"
                >
                  <Shield size={14} className="text-amber-400" />
                  <span>{isAr ? 'تحديثات حية / استشارة' : 'Live Updates / Consult'}</span>
                </a>
              </div>
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
