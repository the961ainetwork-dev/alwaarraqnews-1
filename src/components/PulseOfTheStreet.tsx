import React from 'react';
import { 
  Activity, ArrowLeft, ArrowRight, MapPin, TrendingUp, AlertTriangle, 
  FileText, Landmark, Users, DollarSign, ArrowUpRight, BarChart3, HelpCircle 
} from 'lucide-react';

interface PulseOfTheStreetProps {
  language: 'ar' | 'en';
  layoutMode: 'digital' | 'classic-print';
  isFullPage?: boolean;
  onNavigateToPulse?: () => void;
}

export default function PulseOfTheStreet({ 
  language, 
  layoutMode, 
  isFullPage = false, 
  onNavigateToPulse 
}: PulseOfTheStreetProps) {
  const isAr = language === 'ar';
  const isPrint = layoutMode === 'classic-print';

  // Story excerpts for Home screen teasers
  const mainStoryExcerptAr = 'يتسم المشهد الاقتصادي في لبنان في منتصف عام 2026 بانتكاسة كارثية. فبعد سنوات من الانكماش الحاد والانهيار المالي الممنهج، شهدت البلاد أخيراً انتعاشاً اقتصادياً هشاً في عام 2025 بفضل قطاعات محلية. ومع ذلك، أدى اندلاع صراع إقليمي مدمر في أوائل عام 2026 إلى عرقلة هذا التقدم بالكامل، مما أغرق الأمة في حلقة قاسية من الركود التضخمي، والنزوح الجماعي العشوائي، والديون المتراكمة وتدمير البنى التحتية.';
  const mainStoryExcerptEn = 'The economic landscape of Lebanon in mid-2026 is defined by a catastrophic setback. Following years of severe contraction and financial decay, the nation had finally witnessed a fragile recovery in 2025 driven by local sectors. However, the outbreak of a devastating regional conflict in early 2026 completely derailed this progress, plunging the country into a severe cycle of stagflation, mass displacement, and mounting debts.';

  const southStoryExcerptAr = 'سماء نهر الليطاني لا تحمل اليوم غيوماً، بل سحباً من الدخان الرمادي الثقيل. إنه الركود الخانق لاقتصادٍ ينهار وسكانٍ دُفعوا إلى حافة الهاوية بسبب أزمات متراكمة وحربٍ حدودية مفتوحة تحولت إلى دمار شامل. هنا في جنوب لبنان، لا تُقاس حقيقة الصراع الحالي بالتصريحات الجيوسياسية فحسب، بل بأرقام الكارثة التي مسحت قرى كاملة وتدمير 23٪ من المحاصيل الزراعية.';
  const southStoryExcerptEn = 'The sky above the Litani River does not carry clouds today, but clouds of heavy grey smoke. It is the suffocating weight of an economy collapsing and residents pushed to the brink of the abyss due to accumulated crises and a border conflict that turned into total destruction. Here, conflict is measured in flattened villages and burnt olive groves.';

  const beirutStoryExcerptAr = 'هناك عنف صامت في الأرقام. بينما تمتلئ سماء الجنوب بدخان المدفعية، يقع هجوم آخر أكثر مكراً في الأسواق، ومحطات الوقود، ومكاتب الفواتير في لبنان. لقد أصبح مؤشر أسعار المستهلك (CPI) بمثابة دفتر حسابات للابتزاز، ليفترس ما تبقى من ميزانية الأسرة المنهكة بالتواطؤ مع الاحتكارات ومافيات المولدات والتجار المحلية.';
  const beirutStoryExcerptEn = 'There is silent violence in numbers. While the skies of the South fill with smoke, another insidious attack occurs in the markets, gasoline stations, and billing offices of Lebanon. The Consumer Price Index (CPI) has turned into an extortion ledger, devouring what is left of the family budget through local monopolies and generator syndicates.';

  // Render full dossier view
  if (isFullPage) {
    return (
      <div 
        id="pulse-dossier-page"
        className={`border-4 border-black p-6 md:p-10 transition-all space-y-12 ${
          isPrint ? 'vintage-paper text-[#1c1917]' : 'bg-zinc-950 text-white shadow-2xl'
        }`}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Back to Home Header Ribbon */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b-2 border-current gap-4">
          <div className="flex items-center gap-3">
            <Activity className="animate-pulse text-red-600" size={24} />
            <div>
              <h1 className="font-sans font-black text-2xl md:text-3.5xl uppercase tracking-tight">
                {isAr ? 'ملف نبض الشارع الاستقصائي الموحد' : 'The Pulse of the Street Dossier'}
              </h1>
              <p className="text-xxs font-mono opacity-85">
                {isAr ? 'صحيفة الوراق • رصد وتحليل ميداني مباشر لشؤون المجتمع والسيادة المالية ٢٠٢٦' : 'Al-Warraq • Direct Field Reporting on Public Well-being & Sovereign Finance 2026'}
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToPulse} // used here to trigger back-to-home in App.tsx
            className={`flex items-center gap-2 px-4 py-2 border-2 border-current text-xs font-black uppercase tracking-wider rounded-none cursor-pointer transition-colors duration-200 ${
              isPrint ? 'hover:bg-black hover:text-white' : 'hover:bg-white hover:text-black'
            }`}
          >
            {isAr ? <><ArrowRight size={14} /> العودة للصحيفة الرئيسية</> : <><ArrowLeft size={14} /> Back to Main Issue</>}
          </button>
        </div>

        {/* ==================== STORY 1: MAIN RECOVERY STORY ==================== */}
        <section className="space-y-6 pt-4">
          <div className="border-b-4 border-double border-current pb-4">
            <span className="font-mono text-xxs bg-red-650 text-white px-2 py-0.5 font-bold uppercase tracking-widest inline-block mb-2">
              {isAr ? 'الافتتاحية الكبرى' : 'PRIMARY RECORD'}
            </span>
            <h2 className="font-sans font-black text-2xl md:text-4.5xl leading-tight">
              {isAr ? 'ثمن الصراع: اقتصاد لبنان المحطم والطريق الشاق نحو التعافي' : 'The Price of Conflict: Lebanon\'s Shattered Economy and the Hard Road to Recovery'}
            </h2>
            <div className="mt-2 flex flex-wrap gap-4 text-xxs font-mono opacity-80">
              <span>{isAr ? 'تحليل ميداني استقصائي • بقلم نبيل الخوري' : 'Investigative Assessment • By Nabil Al-Khoury'}</span>
              <span>•</span>
              <span>{isAr ? 'تحديث: يونيو ٢٠٢٦' : 'Updated: June 2026'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-5 text-sm md:text-base leading-relaxed">
              <div className="border border-current overflow-hidden">
                <img 
                  src="/pulse_displaced_father.png" 
                  alt={isAr ? "أب نازح يطعم طفله الرضيع في مركز إيواء مؤقت" : "A displaced father feeds his infant baby in a shelter encampment"} 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-[250px] md:h-[450px] object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-300 contrast-110"
                />
                <div className="p-2 border-t border-current text-xxs font-mono opacity-80 bg-black/5 dark:bg-white/5 flex justify-between">
                  <span>{isAr ? 'خطوط الإيواء، ٢٠٢٦ - الأبوة الصامدة وسط الكارثة والنزوح' : 'Sovereign lines, 2026 - Fatherhood and survival amidst displacement.'}</span>
                  <span className="font-bold">TELEX INTEL PHOTO</span>
                </div>
              </div>

              <p className="font-bold">
                {isAr ? mainStoryExcerptAr : mainStoryExcerptEn}
              </p>

              <p>
                {isAr ? (
                  'اليوم، تواجه الحكومة واللجان اللبنانية تحدياً غير مسبوق: إدارة أزمة إنسانية مروعة ذات أبعاد هائلة وضغط ديموغرافي هائل، وفي الوقت نفسه محاولة إقناع الهيئات المانحة من أجل إعادة إطلاق العنان لتدفقات إعادة الإعمار الخارجية والمحافظة على ما تبقى من مقومات سيادة الدولة.'
                ) : (
                  'Today, the Lebanese government and civic committees face an unprecedented challenge: managing a catastrophic humanitarian crisis while trying to convince donor states to unlock sovereign reconstruction funds crucial to preventing complete state collapse.'
                )}
              </p>

              <h3 className="font-sans font-black text-lg pt-4 border-t border-dashed border-current flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-current inline-block"></span>
                <span>{isAr ? 'الخسائر الاقتصادية: أضرار هائلة وركود تضخمي متواصل' : 'Economic Loss: Tremendous Damages & Stagflation'}</span>
              </h3>
              <p>
                {isAr ? (
                  'إن الحجم الهائل للدمار المالي الناجم عن حرب ٢٠٢٦ يتجاوز كل الأزمات السابقة. فقد قدر خبراء الاقتصاد مؤخراً أن الصراع ألحق أضراراً مذهلة بلغت ٢٠ مليار دولار، مما محا سنوات من التنمية الاقتصادية وشل البنية التحتية الحيوية - لا سيما في المناطق الجنوبية وعطّل مطار بيروت وشل السياحة.'
                ) : (
                  'The sheer scale of financial devastation stemming from the 2026 war surpasses prior crises. Economists recently projected that the conflict caused a staggering $20 billion in total damage, decimating years of systemic developmental gains and shaking vital infrastructure, specifically in Southern Governorates.'
                )}
              </p>

              <div className="bg-current/5 p-4 border-l-4 border-current font-mono text-xs space-y-2">
                <div>
                  <strong>{isAr ? 'التكلفة اليومية للحرب: ' : 'Daily Cost of War: '}</strong>
                  {isAr ? 'خلال ذروة الصراع في مارس ٢٠٢٦، كلفت الحرب الاقتصاد اللبناني نحو ٧٥ مليون دولار يومياً كأضرار مباشرة وخسائر غير مباشرة.' : 'During the peak of the conflict in March 2026, the war drained the Lebanese economy of $75 million daily—factoring in direct and downstream costs.'}
                </div>
                <div>
                  <strong>{isAr ? 'شل حركة السياحة: ' : 'Tourism Collapse: '}</strong>
                  {isAr ? 'انخفض عدد المسافرين الوافدين عبر المطار بنسبة ٦٥٪ في الربع الأول من عام ٢٠٢٦، وهو ما تسبب في خسائر فادحة من العملة الصعبة للاقتصاد المحلي.' : 'Airport traveler inflows plummeted by 65% in Q1 2026, starving the local economy of vital foreign currency cash pools.'}
                </div>
              </div>

              <h4 className="font-sans font-black text-base pt-4">{isAr ? 'خيارات الدولة العاجلة وتعبئة الموارد:' : 'Sovereign Reconstruction & Repair Vectors:'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-current p-3 bg-current/5 space-y-1">
                  <h5 className="font-bold text-xs uppercase">{isAr ? '١. اتفاق قاطع مع صندوق النقد الدولي' : '1. Concluding IMF Reforms'}</h5>
                  <p className="text-xxs opacity-80">{isAr ? 'إقرار قوانين ضبط رأس المال والسرية المصرفية لحسم وتوزيع الفجوة الإجمالية للمصارف.' : 'Ratify capital controls and restructuring laws to clarify bank liabilities and draw external trust.'}</p>
                </div>
                <div className="border border-current p-3 bg-current/5 space-y-1">
                  <h5 className="font-bold text-xs uppercase">{isAr ? '٢. صندوق إعادة الإعمار المستقل' : '2. Independent Reconstruction Trust'}</h5>
                  <p className="text-xxs opacity-80">{isAr ? 'قنوات صرف خاضعة لتدقيق خارجي كامل تحت إشراف المنظمات الدولية تفادياً لمزاريب الفساد.' : 'Sovereign spending vehicles subject to strict external audits by the UN and World Bank.'}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 border border-current p-4 bg-current/5 space-y-5">
              <h4 className="font-sans font-black text-xs uppercase tracking-wider pb-2 border-b border-current flex justify-between items-center">
                <span>{isAr ? 'مؤشرات الأثر الاقتصادي' : 'Sovereign Deficit Matrix'}</span>
                <span className="text-[9px] font-mono opacity-80">2026 DATA</span>
              </h4>
              <div className="space-y-1">
                <span className="text-[10px] font-mono opacity-75">{isAr ? 'القيمة التقريبية لإعادة الإعمار' : 'Est. Reconstruction Cost'}</span>
                <div className="text-3xl font-black font-mono text-red-650">$20B</div>
              </div>
              <div className="space-y-1 pt-3 border-t border-dashed border-current">
                <span className="text-[10px] font-mono opacity-75">{isAr ? 'النزيف المالي اليومي للناتج الكلي' : 'Daily Economic Bleeding'}</span>
                <div className="text-2xl font-black font-mono">$75M</div>
              </div>
              <div className="space-y-1 pt-3 border-t border-dashed border-current">
                <span className="text-[10px] font-mono opacity-75">{isAr ? 'انخفاض حركة الطيران والسياحة' : 'Aviation & Lodging Dip'}</span>
                <div className="text-2xl font-black font-mono text-red-500">-65%</div>
              </div>
              <div className="space-y-1 pt-3 border-t border-dashed border-current">
                <span className="text-[10px] font-mono opacity-75">{isAr ? 'نسبة تمويل نداء الأمم المتحدة العاجل' : 'UN Emergency Appeal Funded'}</span>
                <div className="text-2xl font-black font-mono flex items-baseline gap-1">
                  <span>32.2%</span>
                  <span className="text-[10px] font-mono opacity-60">({isAr ? '٢٠٦ مليون فقط' : '$206M only'})</span>
                </div>
                <div className="w-full bg-current/15 h-1.5 mt-1">
                  <div className="bg-red-650 h-full" style={{ width: '32.2%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider separator */}
        <div className="border-t-4 border-double border-current my-8"></div>

        {/* ==================== STORY 2: SOUTH LEBANON & DEVASTATION ==================== */}
        <section className="space-y-6">
          <div className="border-b-4 border-double border-current pb-4">
            <span className="font-mono text-xxs bg-neutral-850 text-white dark:bg-neutral-200 dark:text-black px-2 py-0.5 font-bold uppercase tracking-widest inline-block mb-2">
              {isAr ? 'تحقيق الميدان الجنوبي' : 'OFFICIAL FIELD INQUEST: THE SOUTH'}
            </span>
            <h2 className="font-sans font-black text-2xl md:text-3.5xl text-black dark:text-zinc-200">
              {isAr ? 'أرقام الدمار وندوب الطائرات: محنة الجنوب وخط الليطاني المحروق' : 'Shattered Olive Groves: The Agrarian Plight and Ruins of South Lebanon'}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xxs font-mono opacity-80">
              <MapPin size={11} className="text-red-500" />
              <span>{isAr ? 'بصور وصيدا والنبطية، محافظة الجنوب' : 'Sour, Saida & Nabatieh, South Governorate'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="border border-current p-4 bg-red-650/5 rounded-none space-y-4">
                <h4 className="font-sans font-black text-xs uppercase tracking-wider pb-1 border-b border-current">
                  {isAr ? 'جدول الكارثة الموثق ميدانياً' : 'Documented Impact Data Table'}
                </h4>
                
                {/* Styled Table responsive structure */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left rtl:text-right text-xxs border-collapse border border-current font-mono">
                    <thead>
                      <tr className="bg-black text-white dark:bg-white dark:text-black">
                        <th className="p-1 px-2 border border-current text-purple-300 dark:text-purple-900">{isAr ? 'قطاع الضرر' : 'Damage Sector'}</th>
                        <th className="p-1 px-2 border border-current">{isAr ? 'حجم الكارثة الموثقة' : 'Metrics'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-current font-medium">
                      <tr>
                        <td className="p-1.5 px-2 border border-current font-bold">{isAr ? 'الخسائر الاقتصادية' : 'Economic Impact'}</td>
                        <td className="p-1.5 px-2 border border-current text-red-500 font-extrabold">{isAr ? '14 مليار دولار (تكلفة الصراع الإجمالية)' : '$14B (Conflict aggregate)'}</td>
                      </tr>
                      <tr className="bg-current/5">
                        <td className="p-1.5 px-2 border border-current font-bold">{isAr ? 'الدمار السكني' : 'Housing Flattens'}</td>
                        <td className="p-1.5 px-2 border border-current">{isAr ? 'تسوية أكثر من 61,000 وحدة سكنية بالأرض في الجنوب والنبطية وحدهما' : 'Over 61,000 units pulverized in Southern & Nabatieh towns'}</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 px-2 border border-current font-bold">{isAr ? 'النزوح العشوائي' : 'Displaced'}</td>
                        <td className="p-1.5 px-2 border border-current font-extrabold">{isAr ? '1.2 مليون شخص أُجبروا على ترك منازلهم' : '1.2M citizens driven out'}</td>
                      </tr>
                      <tr className="bg-current/5">
                        <td className="p-1.5 px-2 border border-current font-bold">{isAr ? 'الزراعة والأمن الغذائي' : 'Agriculture Loss'}</td>
                        <td className="p-1.5 px-2 border border-current">{isAr ? 'تضرر 23٪ من الأراضي الزراعية و 78٪ لا يصلون لحقولهم' : '23% agrarian rot; 78% of farmers lack land access'}</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 px-2 border border-current font-bold">{isAr ? 'الضحايا' : 'Casualties'}</td>
                        <td className="p-1.5 px-2 border border-current text-red-500">{isAr ? 'أكثر من 3,500 شهيد وما يزيد عن 10,000 جريح' : 'Over 3,500 dead and 10,000+ wounded'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[10px] leading-tight italic opacity-85 pt-1">
                  {isAr 
                    ? 'المصدر: تقارير المسح الميداني لمنظمات مجلس الأمن والخبراء الاقتصاديين للأمم المتحدة.' 
                    : 'Source: Field assessments by the World Bank, UNDP, and local agricultural syndicates.'}
                </p>
              </div>

              {/* Hassan Quote Box */}
              <div className="border border-double border-current p-3 bg-neutral-900/5 text-xs font-mono">
                <p className="italic">
                  {isAr 
                    ? '"لم نعد نبيع اللحم. لا أحد يشتري ملابس جديدة. الناس يشترون الطحين والعدس لتدبير قوت يومهم، وندعو الله ألا يتضاعف السعر بحلول الغد.. لم نعد نعرف كيف نسدد ديون المولد والاتصالات."' 
                    : '"We no longer sell meat. No one buys new clothes. People buy flour and lentils, and we pray to God that the price does not double by tomorrow. We do not even know how to pay our local electricity fee."'}
                </p>
                <div className="mt-2 text-xxs font-bold text-right rtl:text-left">
                  — {isAr ? 'حسن (٤٥ عاماً)، بائع في سوق النبطية المنهك' : 'Hassan (45), Merchant in the ruined Nabatieh market'}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-sm md:text-base leading-relaxed">
              <p className="font-semibold">
                {isAr ? (
                  'بصور، محافظة الجنوب — سماء نهر الليطاني لا تحمل اليوم غيوماً، بل سحباً من الدخان الرمادي الثقيل. إنه ليس مجرد دخان القذائف أو احتراق أشجار الزيتون المعمرة، بل هو الثقل الخانق لاقتصادٍ ينهار وسكانٍ دُفعوا إلى حافة الهاوية بسبب أزمات متراكمة وحربٍ حدودية مفتوحة تحولت إلى دمار شامل.'
                ) : (
                  'In Sour, South Governorate — The sky above the Litani River does not carry clouds today, but clouds of heavy grey smoke. It is not just the smoke of ordnance or the burning of ancient olive trees, but the suffocating weight of an economy collapsing and residents pushed to the brink of the abyss.'
                )}
              </p>

              <p>
                {isAr ? (
                  'هنا في جنوب لبنان، حيث لم تندمل يوماً ندوب الحروب والاجتياحات السابقة، لا تُقاس حقيقة الصراع الحالي بالتصريحات الجيوسياسية فحسب. بل تُقاس بأرقام الكارثة التي مسحت قرى بأكملها من الخريطة، وبسعر ربطة الخبز، والنظرات المنهكة في عيون النازحين.'
                ) : (
                  'Here in South Lebanon, where the scars of past wars never fully healed, the reality of the conflict is not measured by geopolitical rhetoric. It is measured by the sheer numbers of the disaster that erased whole villages, the soaring price of bread, and the exhausted looks of the displaced.'
                )}
              </p>

              <h3 className="font-sans font-black text-base pt-2 flex items-center gap-1.5 border-t border-dashed border-current">
                <span>{isAr ? 'اقتصاد الاستنزاف ولغة الأرقام الصعبة' : 'The Sapping Toll & Cruel Arithmetic'}</span>
              </h3>
              <p>
                {isAr ? (
                  'لِفهم مشاعر المواطنين في لبنان اليوم، عليك أن تنظر إلى الأسواق الشعبية وإلى تقارير الخسائر التي تفوق قدرة أي دولة على التحمل. قبل وقت طويل من دوي صفارات الإنذار، كانت الخطوط الأمامية الاقتصادية قد انهارت بالفعل، بعد خسارة الليرة أكثر من 98% من قيمتها منذ 2019. تكمن المشكلة في أن الاقتصاد فقد ركائزه في الجنوب، والذي يمثل تقليدياً سياجاً زراعياً وسياحياً ومصدر دخل صلب لمئات الآلاف من العائلات.'
                ) : (
                  'To understand public sentiments in Lebanon today, look at the popular markets and and look at the losses which exceed the capacity of any shattered state. Long before sirens wailed, the economic lines were broken already, with the Lira losing over 98% of its value since 2019.'
                )}
              </p>

              <h3 className="font-sans font-black text-base pt-2">{isAr ? 'أزمة الكرامة الصارخة في مدارس ومراكز الإيواء' : 'A Crisis of Dignity in Cold Classrooms'}</h3>
              <p>
                {isAr ? (
                  'مع اتجاه أكثر من مليون نازح نحو الداخل والشمال، تحولت المدارس الرسمية والمرافق العامة المحدودة في جبل لبنان وبيروت إلى مراكز إيواء مؤقتة. يوجد اليوم أكثر من 636 مركز إيواء جماعي يغص بالعائلات، نصفهم من الأطفال والنساء. وتظهر غرف المدارس عجزاً هيكلياً مروعاً في إدارة الكوارث.'
                ) : (
                  'With over a million displaced moving inland and north, state schools and sparse public facilities have transformed into temporary shelters. Today, over 636 crowded collective hubs host these families, exposing the structural failure of disaster management.'
                )}
              </p>

              <div className="bg-neutral-900/5 p-4 border border-current italic text-xs space-y-2">
                <p>
                  {isAr 
                    ? '"تخسر منزلك وبساتين الزيتون وعمرك الذي بنيته، وتخسر قيمة نقودك بالتضخم، ثم تفقد أبسط مقومات كرامتك لتقف في طابور طويل مهين من أجل الحصول على ربطة خبز أو علبة حليب أطفال.. ماذا تبقى من كرامتنا كبشر؟"' 
                    : '"You lose your home, your olive fields, and the life you built, your money is eaten by inflation, and then you lose the last drop of dignity to stand in long humiliating queues for a bag of flatbread or a can of formula.. what is left of us?"'}
                </p>
                <div className="text-right text-[10px] font-bold">— {isAr ? 'فاطمة، نازحة من قرى الجنوب الحدودية وتقطن مدرسة عامة' : 'Fatma, displaced mother of three from the border region, residing in a public school'}</div>
              </div>

              <h3 className="font-sans font-black text-base pt-2">{isAr ? 'مشاعر البقاء والرماد المتبقي' : 'The Survival Sentiment and the Ash'}</h3>
              <p>
                {isAr ? (
                  'الفرق هنا بين مؤشرات الثقة ومشاعر المواطنين شاسع للغاية. ثقة المستهلك تقاس بالأرقام والنمو، أما مشاعر النازحين فتمثل عاطفة غضب وإهانة وعصام صمود قسري. إنهم شعب عالق بين مطرقة الدمار العنيف من الخارج وسندان جشع مافيات الداخل، يتنقلون في عاصفة رملية خانقة لا يبدو أن غبارها الرمادي سينجلي قريباً.'
                ) : (
                  'The gap between economic confidence indices and actual citizen sentiment is vast. The public feels a mixture of rage, exhaustion, and forced resilience. They are trapped between external military devastation and domestic economic greed.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Divider separator */}
        <div className="border-t-4 border-double border-current my-8"></div>

        {/* ==================== STORY 3: BEIRUT CPI & EXPLOITATION ==================== */}
        <section className="space-y-6">
          <div className="border-b-4 border-double border-current pb-4">
            <span className="font-mono text-xxs bg-neutral-900 text-white dark:bg-white dark:text-black px-2 py-0.5 font-bold uppercase tracking-widest inline-block mb-2">
              {isAr ? 'التضخم والمافيات الأهلية' : 'BEIRUT CONSUMER REPORT: CORPORATE EXTRACTION'}
            </span>
            <h2 className="font-sans font-black text-2xl md:text-3.5xl">
              {isAr ? 'العنف الصامت في الأرقام: تشريح تضخم ٢٠٢٦ وجشع الكارتلات الأهلية' : 'Silent Extraction: The 2026 Monopoly Chronicles and the Anatomy of Exploitation'}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xxs font-mono opacity-80">
              <TrendingUp size={11} className="text-indigo-500" />
              <span>{isAr ? 'إدارة الإحصاء المركزي ومسح الأسواق، بيروت' : 'Central Administration of Statistics, Beirut Market Audits'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4 text-sm md:text-base leading-relaxed">
              <p className="font-semibold">
                {isAr ? (
                  'بيروت — هناك عنف صامت في الأرقام. بينما تمتلئ سماء الجنوب بدخان المدفعية، يقع هجوم آخر أكثر مكراً في الأسواق، ومحطات الوقود، ومكاتب الفواتير في لبنان. لقد أصبح مؤشر أسعار المستهلك (CPI) بمثابة دفتر حسابات للابتزاز.'
                ) : (
                  'Beirut — There is silent violence in numbers. While the skies of the South fill with military mortar smoke, another quiet attack is mounted across markets, neighborhood gas pumps, and monthly utilities receipts.'
                )}
              </p>

              <p>
                {isAr ? (
                  'إن الاستقرار الاقتصادي الهش الذي شهده لبنان في عام ٢٠٢٥ تم محوه بالكامل مدفوعاً بإغلاق سلاسل الإمداد ومضيق هرمز، وارتفاع النفط فوق ١١٠ دولارات للبرميل. لكن التضخم ليس مجرد صدمة مستوردة كلياً، بل هو بالمرتبة الأولى تمرين حريص في الجشع والاستغلال المحلي من كارتلات الموالدات والداية والمدارس الخاصة واحتكارات السلع الغذائية.'
                ) : (
                  'The fragile economic respite of 2025 has been erased, pushed by logistics chokeholds in the Strait of Hormuz and global crude rising past $110/barrel. Yet, this is not just an imported shock; it is a masterclass in local cartel greed.'
                )}
              </p>

              <h3 className="font-sans font-black text-base pt-2 flex items-center gap-2 border-t border-dashed border-current">
                <span className="w-2.5 h-2.5 bg-red-600 inline-block"></span>
                <span>{isAr ? 'الوقود والمشتقات النفطية: محرك الابتزاز الرئيسي' : 'Fuel Cartels: The Master Chokehold'}</span>
              </h3>
              <p>
                {isAr ? (
                  'نظراً لأن شبكة الدولة توفر ما يقرب من صفر ساعة كهرباء، فإن كل مخبز، معمل ومستشفى يعمل بمولدات الديزل (المازوت). وفي منتصف حزيران ٢٠٢٦، يحوم سعر صفيحة البنزين العادية ٩٥ أوكتان حول ٢,٣٥٠,٠٠٠ ليرة لبنانية، بينما يتجاوز سعر المازوت ٢,٠٠٠,٠٠٠ ليرة. وما يثير السخط هو تواطؤ الدولة المفلسة التي فرضت ضرائب ورسوم جمركية تعسفية إضافية مطلع العام لموازنة عجزها على حساب الفئات الأشد فقراً.'
                ) : (
                  'With national grids supplying zero electric power, every bakery and ventilator runs on diesel. In June 2026, 20 liters of gasoline bounds near 2,350,000 LBP, while fuel oil breaks 2,000,000 LBP. The bankrupt state aggravated this by imposing an additional 300,000 LBP tax on fuel to balance its dry coffers.'
                )}
              </p>

              <h3 className="font-sans font-black text-base pt-2">{isAr ? 'دولة تلتهم ما تبقى من رماد' : 'A Sovereign Vacuum Devouring Its Young'}</h3>
              <p>
                {isAr ? (
                  'بينما تحتفل الحكومة اللبنانية باستقرار صوري عند ٨٩,٥٠٠ ليرة للدولار، فإنها تتجاهل حقيقة مريرة: إن هذا السعر مبني فوق مقبرة من القوة الشرائية الميتة. لقد تمت دولرة وتطهير المعاملات التجارية بالكامل بعنف، ومع ذلك لا تزال رواتب الغالبية الساحقة وموظفي القطاع العام راكدة لا تسد حتى تكلفة التنقل إلى مقرات عملهم.'
                ) : (
                  'While the Central Bank touts a currency peg at 89,500 LBP/USD, they ignore a cruel truth: this stability is built over a cemetery of vanished purchasing power, where salaries remain frozen in a dollarized landscape.'
                )}
              </p>
            </div>

            <div className="lg:col-span-4 space-y-4">
              {/* CPI breakdown sub-cards with visual percentage highlights */}
              <div className="border border-current p-4 bg-zinc-900/5 dark:bg-white/5 space-y-4">
                <h4 className="font-sans font-black text-xs uppercase tracking-wider pb-1 border-b border-current">
                  {isAr ? 'الأرقام التي تنزف (زيادات مارس ٢٠٢٦)' : 'The Bleeding Indices (March 2026 CPI)'}
                </h4>

                <div className="space-y-3 font-mono text-xs">
                  {/* Category 1 */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>{isAr ? 'قطاع التعليم والأقساط' : 'Education Fees'}</span>
                      <span className="text-red-650">+35.67%</span>
                    </div>
                    <div className="w-full bg-current/10 h-1.5">
                      <div className="bg-red-650 h-full" style={{ width: '35.67%' }}></div>
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>{isAr ? 'قطاع النقل والمحروقات' : 'Transport Logistics'}</span>
                      <span className="text-red-500 font-black">+24.81%</span>
                    </div>
                    <div className="w-full bg-current/10 h-1.5">
                      <div className="bg-red-500 h-full" style={{ width: '24.81%' }}></div>
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>{isAr ? 'السكن، الكهرباء والمولدات' : 'Housing & neighborhood Gen-sets'}</span>
                      <span className="text-indigo-500 font-bold">+20.26%</span>
                    </div>
                    <div className="w-full bg-current/10 h-1.5">
                      <div className="bg-indigo-500 h-full" style={{ width: '20.26%' }}></div>
                    </div>
                  </div>

                  {/* Category 4 */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>{isAr ? 'الغذاء والمشروبات اليومية' : 'Food & Staples'}</span>
                      <span className="text-zinc-500 font-bold">+19.41%</span>
                    </div>
                    <div className="w-full bg-current/10 h-1.5">
                      <div className="bg-zinc-500 h-full" style={{ width: '19.41%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crisis Profiteers Grid list */}
              <div className="border border-current p-4 space-y-3">
                <h4 className="font-sans font-black text-xs uppercase text-red-650">
                  {isAr ? 'تشريح الاستغلال: كبار تجار الأزمات' : 'Anatomy of Crisis Profiteering'}
                </h4>
                <ol className="list-decimal list-inside text-xxs font-mono space-y-2 leading-relaxed">
                  <li>
                    <strong>{isAr ? 'مافيات المولدات الأهلية: ' : 'Generator Syndicates: '}</strong>
                    {isAr ? 'يقوم أصحاب المولدات بفرض فواتير اشتراك بالدولار الصافي لامتصاص ٤٠٪ من ميزانية عائلة من الطبقة المتوسطة مستغلين غياب شبكة الدولة.' : 'Neighborhood generator owners dictate extortionate dollar rates for basic electricity.'}
                  </li>
                  <li>
                    <strong>{isAr ? 'أباطرة ومؤسسات التعليم الخاص: ' : 'Private Education Lords: '}</strong>
                    {isAr ? 'رفع الرسوم الدراسية والكتب المستوردة مستغلين حاجة الأهالي لتعليم أبنائهم ليتحول التعليم لسلعة ترفيه مروعة.' : 'Hiked rates aggressively in fresh USD, converting schooling into an absolute privilege.'}
                  </li>
                  <li>
                    <strong>{isAr ? 'تحكّم السوق السوداء في السوبرماركت: ' : 'Retail Black Markets: '}</strong>
                    {isAr ? 'صدمة إمدادات مضيق هرمز منحت كبار التجار العذر لإعادة تسعير بضائع مكدسة بالمخازن مسبقاً، لمضاعفة الأرباح.' : 'Exporters re-price warehouse archives instantly under "war tariffs" to gouge displaced buyers.'}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Back button at the bottom */}
        <div className="pt-8 border-t-2 border-current flex justify-center">
          <button
            onClick={onNavigateToPulse}
            className={`px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-xs tracking-wider rounded-none cursor-pointer transition-all duration-200 hover:scale-102 flex items-center gap-2`}
          >
            {isAr ? <><ArrowRight size={14} /> العودة للصفحة الرئيسية للوراق</> : <><ArrowLeft size={14} /> Return to Al-Warraq Mainpage</>}
          </button>
        </div>
      </div>
    );
  }

  // ==================== HOME SCREEN TEASER VIEW (isFullPage === false) ====================
  return (
    <div 
      id="pulse-of-the-street"
      className={`border-4 border-black p-6 md:p-8 transition-all relative space-y-8 ${
        isPrint 
          ? 'vintage-paper text-[#1c1917]' 
          : 'bg-zinc-900 text-white shadow-xl'
      }`}
    >
      {/* Unique ribbon indicator */}
      <div className={`absolute top-0 ${isAr ? 'left-8' : 'right-8'} -translate-y-1/2 px-4 py-1 font-mono text-[9px] font-black tracking-widest uppercase border-2 border-black ${
        isPrint ? 'bg-[#1c1917] text-white' : 'bg-white text-black'
      }`}>
        {isAr ? 'تحليلات ونبض الشارع • زاوية خاصة' : 'THE PULSE OF THE STREET • IN-DEPTH'}
      </div>

      {/* Main Title Section */}
      <div className="border-b-2 border-current border-double pb-6 mb-8 text-center bg-transparent">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Activity size={18} className="animate-pulse text-red-600" />
          <span className="font-mono text-xs font-black uppercase tracking-widest opacity-80">
            {isAr ? 'نبض الشارع' : 'The Pulse of the Street'}
          </span>
        </div>
        <h2 className="font-sans font-black text-xl md:text-3xl lg:text-4.5xl tracking-tight max-w-4xl mx-auto leading-tight">
          {isAr 
            ? 'ثمن الصراع: اقتصاد لبنان المحطم والطريق الشاق نحو التعافي' 
            : 'The Price of Conflict: Lebanon\'s Shattered Economy and the Hard Road to Recovery'}
        </h2>
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1.5 font-mono text-xxs opacity-75">
          <span>{isAr ? 'تحليل ميداني استقصائي مقتضب' : 'Investigative Bureau Overview'}</span>
          <span>•</span>
          <span>{isAr ? 'منتصف يونيو ٢٠٢٦' : 'Mid-June 2026'}</span>
          <span>•</span>
          <span>{isAr ? 'رابط الصفحة: /section/pulse-of-the-street' : 'URL: /section/pulse-of-the-street'}</span>
        </div>
      </div>

      {/* Primary Layout Grid for Main Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Story 1 Excerpt & Photo (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border border-current overflow-hidden">
            <img 
              src="/pulse_displaced_father.png" 
              alt={isAr ? "أب نازح يطعم طفله الرضيع في مركز إيواء" : "A displaced father feeds his infant baby in a temporary shelter"} 
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";
              }}
              className="w-full h-[200px] md:h-[350px] object-cover filter grayscale opacity-95 hover:grayscale-0 transition-all duration-300 contrast-110"
            />
            <div className="p-2 border-t border-current text-xxs font-mono opacity-80 flex justify-between bg-black/5 dark:bg-white/5">
              <span>{isAr ? 'النزوح القسري، ٢٠٢٦ - أب يطعم رضيعه في مركز إيواء مؤقت' : 'Sovereign Displacements, 2026 - A father feeds his infant baby in a temporary shelter.'}</span>
              <span>Code: DIS-FATHER-26</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-bold text-sm md:text-base leading-relaxed">
              {isAr ? mainStoryExcerptAr : mainStoryExcerptEn}
            </p>
            <p className="text-xs md:text-sm opacity-85 leading-relaxed">
              {isAr 
                ? 'تشير التقييمات الحديثة الصادرة عن البنك الدولي والأمم المتحدة إلى أن الأضرار الإجمالية المباشرة وغير المباشرة المسجلة للصراع بلغت مستويات قياسية تناهز الـ ٢٠ مليار دولار، مما أغرق الأمة في حلقة مفرغة من شلل البنية التحتية والديون وعجز ميزانيات الأسر اليومية.' 
                : 'Recent damage assessments show aggregate toll bound near $20 Billion, crushing development and locking communities into a vicious cycle of household deficits and infrastructure failures.'}
            </p>

            {/* Read full link button for Story 1 */}
            <div className="pt-2">
              <button
                onClick={onNavigateToPulse}
                className={`group/btn px-5 py-2.5 border-2 border-current text-xs font-black uppercase tracking-wider rounded-none cursor-pointer flex items-center gap-2 transition-all duration-200 ${
                  isPrint ? 'bg-black text-white hover:bg-neutral-850' : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                <span>{isAr ? 'تابع قراءة التحليل الميداني والخيارات كاملاً' : 'Read the complete investigation & options'}</span>
                {isAr ? <ArrowLeft size={13} className="group-hover/btn:-translate-x-1 transition-transform" /> : <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Stats Sidebar (4 columns) */}
        <div className="lg:col-span-4 border border-current p-4 bg-black/5 dark:bg-white/5 space-y-4">
          <h4 className="font-sans font-black text-xs uppercase tracking-wider pb-2 border-b border-current flex items-center justify-between">
            <span>{isAr ? 'مؤشرات الأثر الكارثي' : 'War Damage Matrix'}</span>
            <span className="text-[9px] font-mono opacity-70">2026 EST</span>
          </h4>

          {/* Stat Item 1 */}
          <div className="space-y-1">
            <div className="flex justify-between items-baseline text-xxs font-mono font-bold opacity-80">
              <span>{isAr ? 'إجمالي أضرار البنى والإنتاج' : 'Total Reconstruction Deficit'}</span>
              <span className="text-red-500 font-extrabold">▲ SPECULATED</span>
            </div>
            <div className="text-2xl font-black font-mono">$20B</div>
          </div>

          {/* Stat Item 2 */}
          <div className="space-y-1 pt-3 border-t border-dashed border-current">
            <div className="flex justify-between items-baseline text-xxs font-mono font-bold opacity-80">
              <span>{isAr ? 'النزيف المالي اليومي الكلي' : 'Daily Economic Bleeding'}</span>
              <span className="text-[9px] font-mono bg-current text-white dark:text-neutral-900 px-1 font-bold">DAILY</span>
            </div>
            <div className="text-2xl font-black font-mono">$75M</div>
          </div>

          {/* Stat Item 3 */}
          <div className="space-y-1 pt-3 border-t border-dashed border-current">
            <div className="flex justify-between items-baseline text-xxs font-mono font-bold opacity-80">
              <span>{isAr ? 'معدل سد المساعدات العاجلة' : 'UN Appeal Funded Rate'}</span>
              <span className="text-red-650 font-bold">32.2%</span>
            </div>
            <div className="text-xl font-black font-mono">32.2% <span className="text-xxs font-mono opacity-60">($206.2M)</span></div>
          </div>
        </div>

      </div>

      {/* Double divider row before additional columns requested */}
      <div className="border-t-4 border-double border-current my-4"></div>

      {/* ==================== TWO COLUMNS ROW: STORIES 2 AND 3 TEASERS ==================== */}
      <div className="space-y-4">
        <div className="text-xs font-mono font-extrabold uppercase text-indigo-500 flex items-center gap-1.5 justify-start">
          <Activity size={12} className="text-red-600 animate-pulse" />
          <span>{isAr ? 'تغطيات وتحقيقات إضافية مرصودة ميدانياً' : 'Supplemental Investigative dispatches from the front'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Column 1: Teaser of South Story (Story 2) */}
          <div className="border border-current p-4 md:p-5 bg-black/5 dark:bg-white/5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-1 text-xxs text-red-600 font-mono font-bold">
                  <MapPin size={11} />
                  <span>{isAr ? 'بصور، محافظة الجنوب' : 'Sour, South Governorate'}</span>
                </div>
                <span className="font-mono text-[9px] opacity-60">#SOUTH-26</span>
              </div>
              <h3 className="font-sans font-black text-lg text-black dark:text-zinc-200 leading-tight">
                {isAr ? 'أرقام الدمار وخط الليطاني المحروق: محنة الجنوب' : 'Shattered Olive Groves & Flat Homes: Plight of the South'}
              </h3>
              <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed font-sans line-clamp-4">
                {isAr ? southStoryExcerptAr : southStoryExcerptEn}
              </p>
            </div>

            <div className="pt-2 border-t border-dashed border-current/30 flex justify-between items-center">
              <span className="text-xxs font-mono opacity-70">
                {isAr ? 'خسائر الجنوب: ١٤ مليار دولار' : 'South damages: $14B'}
              </span>
              <button 
                onClick={onNavigateToPulse}
                className="text-xs font-black uppercase text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{isAr ? 'اقرأ التقرير كاملاً ⭔' : 'Read full report ⭔'}</span>
                {isAr ? <ArrowLeft size={11} /> : <ArrowRight size={11} />}
              </button>
            </div>
          </div>

          {/* Column 2: Teaser of Beirut Story (Story 3) */}
          <div className="border border-current p-4 md:p-5 bg-black/5 dark:bg-white/5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-1 text-xxs text-indigo-500 font-mono font-bold">
                  <TrendingUp size={11} />
                  <span>{isAr ? 'بيروت، إدارة الإحصاء' : 'Beirut, Market Index'}</span>
                </div>
                <span className="font-mono text-[9px] opacity-60">#CPI-26</span>
              </div>
              <h3 className="font-sans font-black text-lg text-black dark:text-zinc-200 leading-tight">
                {isAr ? 'العنف الصامت في الأسواق: تشريح تضخم ٢٠٢٦ والابتزاز النفطي' : 'Silent Extraction: March 2026 CPI Hikes & Fuel Extortion'}
              </h3>
              <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed font-sans line-clamp-4">
                {isAr ? beirutStoryExcerptAr : beirutStoryExcerptEn}
              </p>
            </div>

            <div className="pt-2 border-t border-dashed border-current/30 flex justify-between items-center">
              <span className="text-xxs font-mono opacity-70">
                {isAr ? 'تضخم قطاع التعليم: +٣٥.٦٪' : 'Education Hikes: +35.6%'}
              </span>
              <button 
                onClick={onNavigateToPulse}
                className="text-xs font-black uppercase text-indigo-500 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{isAr ? 'اقرأ التقرير كاملاً ⭔' : 'Read full report ⭔'}</span>
                {isAr ? <ArrowLeft size={11} /> : <ArrowRight size={11} />}
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
