import React, { useState } from 'react';
import { Shield, AlertTriangle, Database, DollarSign, Award, Layers, Globe, Zap, Compass, HelpCircle } from 'lucide-react';

interface SubseaCablesInfographicProps {
  language: 'ar' | 'en';
}

export const SubseaCablesInfographic: React.FC<SubseaCablesInfographicProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'infographic' | 'economist' | 'chatham'>('infographic');
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  // Recreating the 8 items from the Chatham House infographic exactly as provided
  const infographicNodes = [
    {
      id: 1,
      titleAr: '١. حادثة كاشفة',
      titleEn: '1. Revelatory Incident',
      icon: <AlertTriangle className="text-red-500" size={20} />,
      shortAr: 'استهداف مراكز بيانات AWS في الإمارات والبحرين واضطراب Careem وبنوك ومواقع دفع.',
      shortEn: 'Targeting AWS data centers in UAE & Bahrain; disrupting Careem, banks & payments.',
      detailsAr: 'تثبت الضربات بطائرات مسيرة إيرانية لمراكز البيانات أن الأنشطة اليومية الحيوية من المنصات المصرفية والدفع ونقل الركاب هشة ومترابطة رقمياً دون حماية كافية.',
      detailsEn: 'Drone strikes targeting AWS cloud centers exposed the fragility of localized daily apps (Careem, Hubpay, Alaan) showing how vulnerable basic digital dependencies are to targeted action.'
    },
    {
      id: 2,
      titleAr: '٢. الأصول الحرجة',
      titleEn: '2. Critical Assets',
      icon: <Database className="text-amber-500" size={20} />,
      shortAr: 'منظومة مترابطة تشمل مراكز البيانات، الكابلات البحرية، والأقمار الصناعية.',
      shortEn: 'Interconnected web of data hubs, undersea lines, and orbital satellites.',
      detailsAr: 'لم تعد البنية الرقمية ترفاً، بل ركيزة وطنية حيوية مثل شبكات الكهرباء وموانئ الشحن، تنبني عليها السجلات الصحية والأنظمة الانتخابية والخدمات الحكومية برمتها.',
      detailsEn: 'Data centers are only part of a unified tri-pillar system. Undersea fiber and satellites now constitute vital national infrastructure matching ports, roads, or power grids in importance.'
    },
    {
      id: 3,
      titleAr: '٣. أرقام إستراتيجية',
      titleEn: '3. Strategic Statistics',
      icon: <DollarSign className="text-emerald-500" size={20} />,
      shortAr: '١٠ تريليونات دولار معاملات يومية، ١٧٪ من الإنترنت بالبحر الأحمر، ٩٠٪ بين أوروبا وآسيا.',
      shortEn: '$10T daily transactions, 17% Red Sea internet traffic, 90% of Europe-Asia comms.',
      detailsAr: 'تجري تداولات هائلة عبر هذه الخطوط البحرية الممتدة. البحر الأحمر لوحده يمثل الشريان الأهم للشرق الأوسط وبوابة الربط بين الشرق والغرب، بجانب ٤ كابلات تخدم مضيق هرمز وموانئ الخليج.',
      detailsEn: 'Massive economic volume travels below sea levels. 17% of total global web routing and 90% of all Europe-Asia digital traffic flows through the Red Sea alone, with 4 critical cables serving Strait of Hormuz.'
    },
    {
      id: 4,
      titleAr: '٤. نقاط الضعف',
      titleEn: '4. Critical Vulnerabilities',
      icon: <Shield className="text-red-400" size={20} />,
      shortAr: 'إغلاق هرمز والبحر الأحمر معاً يشل الكابلات وسفينة واحدة فقط نشطة للإصلاح بالخليج.',
      shortEn: 'Hormuz and Red Sea closures threaten internet. Only 1 repair vessel active in Gulf.',
      detailsAr: 'سيناريو تعطل المسارين معاً حدث غير مسبوق عالمياً. يزيد من تعقيد الأمر غياب الحماية لسفن الصيانة وعجزها عن العمل بأمان في مياه الصراع المتوترة.',
      detailsEn: 'Simultaneous disruption of both Red Sea and Strait of Hormuz is an unprecedented cataclysm. Only 1 out of 5 e-Marine repair ships is operational in the Gulf, and zero repair safety is possible in conflict areas.'
    },
    {
      id: 5,
      titleAr: '٥. تحول الملكية',
      titleEn: '5. Ownership Shift',
      icon: <Layers className="text-blue-400" size={20} />,
      shortAr: 'سيطرة كبرى لعمالقة التكنولوجيا: Google, Meta, Microsoft, Amazon تمتلك أكثر من ٣٠ كابلاً.',
      shortEn: 'Big Tech supremacy: Google, Meta, Microsoft & Amazon own 30+ subsea cables.',
      detailsAr: 'انتقلت البنية الرقمية من سيطرة حكومية واتحادات اتصالات وطنية متفرقة إلى قبضة عمالقة التكنولوجيا الأربعة الكبار الذين يديرون نصف مراكز البيانات الكبرى عالمياً.',
      detailsEn: 'Infrastructure has transitioned from traditional multi-carrier state consortia to direct private dominance by Google, Meta, Microsoft, and Amazon. They now control over 50% of hyperscale global data centers.'
    },
    {
      id: 6,
      titleAr: '٦. الفجوة القانونية',
      titleEn: '6. Legal Gaps',
      icon: <Award className="text-amber-400" size={20} />,
      shortAr: 'اتفاقية ١٨٨٤ قديمة، قانون البحار ١٩٩٤ غير كافٍ، والشركات تفتقر لملاحقة الدول.',
      shortEn: '1884 Cable treaty is archaic, 1994 UNCLOS is insufficient. Private firms cannot sue states.',
      detailsAr: 'القانون الدولي يعجز عن مواكبة العصر الرقمي. لا توجد مظلة سيادية لحماية منشآت بحرية تجارية في المياه المفتوحة ضد غارات عسكرية أو هجمات تخريبية غير معلنة.',
      detailsEn: 'Submarine cable protection rests on an archaic 1884 Convention and 1994 UNCLOS. Private operators possess zero solid legal machinery to prosecute sovereign state entities who sabotage commercial assets.'
    },
    {
      id: 7,
      titleAr: '٧. اتجاهات الحل',
      titleEn: '7. Solution Directions',
      icon: <Compass className="text-emerald-400" size={20} />,
      shortAr: 'إطار دولي جديد للرصد والوقاية والاستجابة، ممرات آمنة، وردع لحماية الأصول.',
      shortEn: 'New international monitoring framework, safe lanes for repair, military deterrence.',
      detailsAr: 'يحتاج الكوكب إلى تعاون استخباري وعسكري صلب وتوفير حصانة كاملة وممرات آمنة لسفن إصلاح الأعطال الفنية، بجانب ردع سياسي راديكالي يحذر من العواقب الكارثية.',
      detailsEn: 'Solutions demand a unified multilateral defense treaty, verified safe transit zones for repair vessels, automated sensory monitoring, and clear deterrence warnings equating data attacks to physical warfare.'
    },
    {
      id: 8,
      titleAr: '٨. الدلالة النهائية',
      titleEn: '8. Ultimate Takeaway',
      icon: <Globe className="text-indigo-400" size={20} />,
      shortAr: 'البنية الرقمية لم تعد أصولاً تجارية بل فضاء مشتركاً عالمياً كالملاحة والطيران.',
      shortEn: 'Digital infrastructure is no longer purely commercial; it is global common domain.',
      detailsAr: 'مراكز البيانات والكابلات هي شريان الحياة الحديث المشترك. الحرب مع إيران أو استهدافها للأصول يعرض الكل للخطر، مما يبرز حتمية تبني بروتوكول دولي عاجل للحماية الحصينة.',
      detailsEn: 'Cables and servers are now the sovereign common sky of our century. Redefining subsea structures as shared global commons—like global maritime shipping routes—is the only way to safeguard continuous life.'
    }
  ];

  return (
    <div className="bg-[#0D0E12] text-[#E4E6EB] border-4 border-black p-4 md:p-6 my-6 font-mono text-right rtl:text-right ltr:text-left relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      
      {/* Cyber-grid backdrop effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(244,196,48,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(244,196,48,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      {/* Visual Header */}
      <div className="relative z-10 border-b border-zinc-800 pb-4 mb-6">
        <div className="flex justify-between items-center text-[10px] text-amber-500 font-bold tracking-widest">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            {isAr ? 'تقرير استخباري ومقارنة الخرائط السيادية' : 'GEOPOLITICAL DISPATCH & DATA INTERCEPT'}
          </span>
          <span>{isAr ? 'من وثائق معن البرازي' : 'MAAN BARAZY INTEL DOSSIER'}</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-sans font-black text-white tracking-tight mt-2">
          {isAr ? '«البنية التحتية الرقمية تحت التهديد» من مراكز البيانات إلى الكابلات البحرية' : '«Digital Infrastructure Under Threat» - Data Hubs to Subsea Fiber'}
        </h3>
        
        <div className="bg-red-950/40 border border-red-900/50 p-2.5 text-xxs text-red-300 rounded-sm mt-3 leading-relaxed">
          <strong>{isAr ? 'الخلاصة الإستراتيجية:' : 'STRATEGIC OUTCOME:'}</strong> {isAr ? 'الإنترنت العالمي ومخازن البيانات أصبحت بنية أساسية فائقة الخطورة دون أي مظلة حماية دولية أو تشريعات سيادية رادعة.' : 'Hyperscale digital nodes and undersea backbones have evolved into highly critical targets devoid of legal immunity or structured naval protection.'}
        </div>
      </div>

      {/* Tabs */}
      <div className="relative z-10 flex border-b border-zinc-800 gap-2 mb-6 font-sans text-xs">
        <button
          onClick={() => setActiveTab('infographic')}
          className={`py-2 px-3 font-bold uppercase transition-all border-b-2 cursor-pointer ${
            activeTab === 'infographic' 
              ? 'border-amber-500 text-amber-400 font-black' 
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          {isAr ? 'الرسم البياني للتهديدات (Chatham House)' : 'Threat Matrix Graph (Chatham)'}
        </button>
        <button
          onClick={() => setActiveTab('economist')}
          className={`py-2 px-3 font-bold uppercase transition-all border-b-2 cursor-pointer ${
            activeTab === 'economist' 
              ? 'border-amber-500 text-amber-400 font-black' 
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          {isAr ? 'تقرير الإيكونوميست: إعادة رسم الخريطة' : 'The Economist: Realigning the Map'}
        </button>
        <button
          onClick={() => setActiveTab('chatham')}
          className={`py-2 px-3 font-bold uppercase transition-all border-b-2 cursor-pointer ${
            activeTab === 'chatham' 
              ? 'border-amber-500 text-amber-400 font-black' 
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          {isAr ? 'تقرير تشاتام هاوس: حرب الظل' : 'Chatham House: Shadow Warfare'}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10">
        
        {/* TAB 1: INTERACTIVE 8-NODE INFOGRAPHIC */}
        {activeTab === 'infographic' && (
          <div className="space-y-6">
            <p className="text-xxs text-zinc-400 max-w-4xl leading-relaxed italic">
              {isAr 
                ? '✦ محاكاة تفاعلية للوحات الإنفوجرافيك المرفقة بتقرير تشاتام هاوس. اضغط على أي نقطة أدناه لولوج التفاصيل والتحليلات العميقة:' 
                : '✦ Interactive translation dashboard mapped exactly from Chatham House intelligence. Click any item below to render granular data segments:'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {infographicNodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  className={`border p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between group h-40 ${
                    selectedNode === node.id
                      ? 'border-amber-500 bg-amber-950/30 shadow-[0_0_15px_rgba(245,158,11,0.15)] scale-[1.02]'
                      : 'border-zinc-800 bg-[#12141C] hover:border-zinc-600 hover:bg-[#161922]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="font-sans font-black text-xs text-white group-hover:text-amber-400 transition-colors">
                        {isAr ? node.titleAr : node.titleEn}
                      </span>
                      <div className="p-1 bg-[#1A1C26] border border-zinc-850 rounded-sm">
                        {node.icon}
                      </div>
                    </div>
                    <p className="text-xxs text-zinc-400 leading-relaxed font-serif line-clamp-4">
                      {isAr ? node.shortAr : node.shortEn}
                    </p>
                  </div>
                  <div className="text-[9px] text-amber-500 font-bold flex items-center justify-end gap-1 border-t border-zinc-850 pt-2 mt-2">
                    <span>{selectedNode === node.id ? (isAr ? 'إغلاق التفاصيل ✕' : 'CLOSE INFO ✕') : (isAr ? 'اضغط للتفاصيل العميقة ➜' : 'EXPAND CITATION ➜')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Expanded Node Detail Box */}
            {selectedNode !== null && (
              <div className="p-4 bg-amber-950/20 border-2 border-amber-500/40 animate-fade-in text-xs leading-relaxed text-zinc-200">
                <div className="flex items-center gap-2 mb-2 border-b border-amber-500/20 pb-2">
                  <span className="text-amber-400 text-lg">✦</span>
                  <h4 className="font-sans font-black text-sm text-white">
                    {isAr ? infographicNodes[selectedNode - 1].titleAr : infographicNodes[selectedNode - 1].titleEn}
                  </h4>
                </div>
                <p className="font-serif text-sm text-amber-50/90 leading-relaxed">
                  {isAr ? infographicNodes[selectedNode - 1].detailsAr : infographicNodes[selectedNode - 1].detailsEn}
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: THE ECONOMIST REPORT */}
        {activeTab === 'economist' && (
          <div className="space-y-4">
            <div className="border-l-2 border-amber-500 pl-4 text-xs">
              <h4 className="font-sans font-black text-sm text-white mb-2">
                {isAr ? 'طفرة الذكاء الاصطناعي وجغرافيا الكابلات البديلة (قراءة في تقرير الإيكونوميست)' : 'The AI Boom & Cable Geopolitics - Economist Readout'}
              </h4>
              <p className="text-zinc-400 text-xxs font-mono uppercase mb-4">
                {isAr ? 'إعادة رسم الخرائط وتجنب المياه الصينية والتايوانية' : 'Bypassing the South China Sea & Nine-Dash Line Repair Lockouts'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed font-serif text-zinc-300">
              <div className="space-y-3 bg-[#111319] p-4 border border-zinc-850">
                <h5 className="font-sans font-black text-[#F4C430] text-xxs uppercase tracking-wider">{isAr ? '✦ عمالقة الحوسبة يستبدلون الاتحادات' : '✦ HYPERSCALERS REWRITE INVESTMENTS'}</h5>
                <p>
                  {isAr 
                    ? 'تغيرت الجهة الممولة للكابلات كلياً. في السابق، كانت كبرى الاتصالات الوطنية تتقاسم الأكلاف وتمرر الخطوط بالمناطق الكثيفة سكانياً. أما اليوم، فتمول شركات السحابة الكبرى مثل غوغل وميتا ومايكروسوفت الكابلات منفردة، لتوجيهها وفق احتياجات الحوسبة ومراكز بيانات الذكاء الاصطناعي.' 
                    : 'The historical consortia-based funding model has vanished. Today, hyperscale technology firms like Google, Meta, and Microsoft fund intercontinental lines independently, affording them complete sovereign control over routing directly between cloud data hubs, rather than chasing traditional commercial population centers.'}
                </p>
                <p>
                  {isAr
                    ? 'استثمرت غوغل بأول كابل في ٢٠٠٨ ومولت ٣٤ كابلاً بحرياً إضافياً منذئذ، وتمتلك نصفها منفردة. سيبلغ الاستثمار الإجمالي ٤ مليارات دولار سنوياً في الكابلات البحرية للسنوات الأربع المقبلة.'
                    : 'Google bought into its first cable in 2008 and has since financed at least 34 other routes, holding sole ownership over nearly half. Hyperscalers are projected to pour $4 Billion annually into subsea networks over the next four years.'}
                </p>
              </div>

              <div className="space-y-3 bg-[#111319] p-4 border border-[#1C1F2B]">
                <h5 className="font-sans font-black text-[#F4C430] text-xxs uppercase tracking-wider">{isAr ? '✦ المسار البديل: سلطنة عُمان نحو أستراليا' : '✦ THE NEW ROUTE: OMAN TO AUSTRALIA'}</h5>
                <p>
                  {isAr
                    ? 'باتت الشركات تتجنب مضيق ملقا ومياه بحر الصين الجنوبي الخاضعة لنفوذ بكين المتزايد. فالوصول لقاع البحر وإصلاح الأعطال داخل "خط النقاط التسع" الصيني يستلزم تصاريح شاقة من بكين.'
                    : 'Tech giants are pivoting away from the Malacca Strait and South China Sea due to Chinese geopolitical friction. Repairing cables within Chinas "Nine-Dash Line" requires extensive state clearance, which US operators view as a critical national security vulnerability.'}
                </p>
                <p>
                  {isAr
                    ? 'المشاريع البديلة تسير من سلطنة عُمان إلى أستراليا ثم الهادئ نحو أمريكا. كابل عُمان-أستراليا (٢٠٢٢) يخدم قواعد عسكرية هامة مثل دييغو غارسيا وجزر كوكوس. وتحول غوغل جزيرة كريسماس لعقدة إستراتيجية.'
                    : 'The emerging paradigm links Oman directly to Australia, then across the Pacific to the US mainland. Google\'s Christmas Island hub and Meta\'s Waterworth project bypass Southeast Asia entirely, utilizing strategic outposts like the US-UK military base at Diego Garcia.'}
                </p>
              </div>
            </div>

            <div className="bg-amber-950/10 border border-amber-900/30 p-3 text-xxs text-amber-500 font-mono flex items-center justify-between">
              <span>{isAr ? 'نسبة حركة الإنترنت العابرة للمحيطات عبر الكابلات البحرية مقابل الأقمار الصناعية:' : 'Subsea Cables Share of Transoceanic Data Capacity vs. Satellites:'}</span>
              <span className="font-black font-sans text-xs">99.0% / 1.0%</span>
            </div>
          </div>
        )}

        {/* TAB 3: CHATHAM HOUSE SHADOW WARFARE */}
        {activeTab === 'chatham' && (
          <div className="space-y-4 font-serif text-xs text-zinc-300">
            <h4 className="font-sans font-black text-sm text-white mb-2">
              {isAr ? 'عسكرة الفضاء البحري الرقمي وحرب المسيرات (تحليل تشاتام هاوس)' : 'Militarization of the Subsea Domain & Drone Threat (Chatham Analysis)'}
            </h4>
            
            <p className="leading-relaxed">
              {isAr
                ? 'ينطلق التقرير من هجمات المسيرات الإيرانية التي استهدفت مراكز بيانات AWS في الإمارات والبحرين. تسببت الضربات في اضطراب فوري لمنصات الدفع مثل Alaan وHubpay، وتعطيل خدمات Careem ومواقع بنكية حيوية لعدة أيام، كاشفة عمق اعتماد الحياة اليومية والمالية على السحب الحوسبية ومراكز معالجة البيانات.'
                : 'The study details a critical precedent: drone attacks on AWS data processing facilities in Bahrain and the UAE. The immediate fallout paralyzed digital finance facilitators like Alaan and Hubpay, while putting the Careem super-app offline for nearly two days, proving how rapidly localization layers collapse when raw servers are physically hit.'}
            </p>

            <div className="bg-[#12141C] p-4 border border-zinc-800 font-mono text-xxs space-y-2">
              <strong className="text-red-400 block border-b border-zinc-850 pb-1 mb-2">⚠ {isAr ? 'المخاطر الجيواستراتيجية بالبحر الأحمر والخليج:' : 'RED SEA & GULF CORE THREAT MATRIX:'}</strong>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span>{isAr ? '• مضيق هرمز ومحيطه:' : '• Strait of Hormuz Network:'}</span>
                  <p className="text-zinc-500 font-serif leading-relaxed">
                    {isAr ? 'أربعة كابلات دولية تمر عبر المضيق وتربط دول الخليج بالغرب. إغلاقه مع التهديدات بالبحر الأحمر سيعزل الاتصال.' : 'Four key trunk lines serve Hormuz directly, wiring Bahrain, Qatar, Kuwait, and UAE. A concurrent closure with the Red Sea would freeze major global routing.'}
                  </p>
                </div>
                <div className="space-y-1">
                  <span>{isAr ? '• أزمة البحر الأحمر المستمرة:' : '• Ongoing Red Sea Crisis:'}</span>
                  <p className="text-zinc-500 font-serif leading-relaxed">
                    {isAr ? 'يمر عبره ١٧٪ من الإنترنت العالمي و٩٠٪ من كابلات الاتصال بين آسيا وأوروبا. تعذر صيانة الكابلات المدمرة يهدد الكوكب بعزلة ممتدة.' : 'Carries 17% of overall world traffic. Complete suspension of safe vessel repairs in active war zones translates to indefinite outages for damaged subsea fibers.'}
                  </p>
                </div>
              </div>
            </div>

            <p className="leading-relaxed">
              {isAr
                ? 'وفي ظل الفجوة التشريعية العالمية، تلح شركات التكنولوجيا اليوم على الإدارة الأمريكية للحصول على ضمانات عسكرية رسمية ودعم صريح للردع لحماية مراكز بياناتها التجارية باعتبارها أصولاً أمنية سيادية هامة، منتقلين من الحلول التقنية الفنية البسيطة إلى الاستقواء بموازين القوى السياسية الكبرى.'
                : 'Faced with weak international protections, tech giants have abandoned quiet engineering solutions. Since April 2026, Google, Microsoft, and Amazon have aggressively lobbied Washington for direct naval escort commitments, classifying their private undersea assets as strategic national defense zones.'}
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
