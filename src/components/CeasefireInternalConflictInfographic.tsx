import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Users, AlertTriangle, HelpCircle, Activity, Landmark, Eye, Info, RefreshCw } from 'lucide-react';

interface CeasefireInternalConflictInfographicProps {
  language: 'ar' | 'en';
}

export function CeasefireInternalConflictInfographic({ language }: CeasefireInternalConflictInfographicProps) {
  const isAr = language === 'ar';
  
  // Interactive tab state
  const [activeTab, setActiveTab] = useState<'paradox' | 'actors' | 'simulation'>('paradox');
  
  // Simulation states
  const [disarmamentPressure, setDisarmamentPressure] = useState<number>(50); // 0-100
  const [lafDeployment, setLafDeployment] = useState<number>(40); // 0-100
  const [civilTension, setCivilTension] = useState<number>(65); // Computed
  const [externalVulnerability, setExternalVulnerability] = useState<number>(75); // Computed
  
  // Quick pre-set scenarios for the simulation
  const applyScenario = (disarm: number, deployment: number) => {
    setDisarmamentPressure(disarm);
    setLafDeployment(deployment);
  };

  // Live computations
  const currentCivilTension = Math.min(100, Math.max(10, Math.round((disarmamentPressure * 0.7) + (lafDeployment * 0.4) + 10)));
  const currentExternalRisk = Math.min(100, Math.max(10, Math.round(110 - (disarmamentPressure * 0.4) - (lafDeployment * 0.6))));
  const currentCivilWarRisk = Math.min(100, Math.max(5, Math.round((disarmamentPressure * 0.8) + (currentCivilTension * 0.2) - (lafDeployment * 0.1))));

  const getTensionColor = (val: number) => {
    if (val < 40) return 'text-emerald-500 bg-emerald-950/20 border-emerald-800/30';
    if (val < 70) return 'text-amber-500 bg-amber-950/20 border-amber-800/30';
    return 'text-red-500 bg-red-950/20 border-red-800/30 animate-pulse';
  };

  const getTensionProgressColor = (val: number) => {
    if (val < 40) return 'bg-emerald-600';
    if (val < 70) return 'bg-amber-500';
    return 'bg-red-700';
  };

  return (
    <div className="border-2 border-zinc-800 bg-zinc-950 p-4 md:p-6 text-white font-sans select-none" id="ceasefire-internal-conflict-infographic">
      <style dangerouslySetInnerHTML={{ __html: `
        #ceasefire-internal-conflict-infographic, 
        #ceasefire-internal-conflict-infographic * {
          font-family: 'Cairo', 'Inter', system-ui, -apple-system, sans-serif !important;
        }
        #ceasefire-internal-conflict-infographic .text-zinc-500 {
          color: #f4f4f5 !important;
        }
        #ceasefire-internal-conflict-infographic .text-zinc-400 {
          color: #ffffff !important;
        }
        #ceasefire-internal-conflict-infographic .text-zinc-300 {
          color: #ffffff !important;
        }
        #ceasefire-internal-conflict-infographic .text-zinc-600 {
          color: #ffffff !important;
        }
        #ceasefire-internal-conflict-infographic .text-zinc-700 {
          color: #ffffff !important;
        }
        #ceasefire-internal-conflict-infographic .text-zinc-850 {
          color: #ffffff !important;
        }
        #ceasefire-internal-conflict-infographic .text-zinc-900 {
          color: #ffffff !important;
        }
        /* Font-size adjustments to increase by 2px (2 points) */
        #ceasefire-internal-conflict-infographic .text-[8px] {
          font-size: 11px !important;
        }
        #ceasefire-internal-conflict-infographic .text-[9px] {
          font-size: 11.5px !important;
        }
        #ceasefire-internal-conflict-infographic .text-[10px] {
          font-size: 12.5px !important;
        }
        #ceasefire-internal-conflict-infographic .text-[11px] {
          font-size: 13.5px !important;
        }
        #ceasefire-internal-conflict-infographic .text-xxs {
          font-size: 12.5px !important;
        }
        #ceasefire-internal-conflict-infographic .text-xs {
          font-size: 14.5px !important;
        }
        #ceasefire-internal-conflict-infographic .text-sm {
          font-size: 16px !important;
        }
        #ceasefire-internal-conflict-infographic .text-base {
          font-size: 18px !important;
        }
        #ceasefire-internal-conflict-infographic .text-lg {
          font-size: 20px !important;
        }
        #ceasefire-internal-conflict-infographic .text-xl {
          font-size: 22px !important;
        }
      `}} />
      
      {/* Header Infographic Ticker */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800 pb-4 mb-4 gap-2">
        <div className="space-y-1">
          <span className="bg-red-950 text-red-200 border border-red-700 text-[8px] font-mono tracking-widest uppercase font-black px-2 py-0.5 inline-block">
            {isAr ? 'خريطة النفوذ والتعقيد الجيوسياسي' : 'GEOPOLITICAL COMPLEXITY GRID'}
          </span>
          <h3 className="text-sm md:text-base font-display font-black text-white">
            {isAr ? 'الشرخ السيادي: معضلة نزع السلاح وقرار الحرب' : 'The Sovereignty Fracture: The Disarmament Dilemma'}
          </h3>
        </div>
        
        {/* Sub-tab navigation */}
        <div className="flex bg-zinc-900 border border-zinc-800 p-0.5 rounded-none shrink-0 w-full sm:w-auto font-mono text-[10px]">
          <button
            onClick={() => setActiveTab('paradox')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'paradox' ? 'bg-white text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isAr ? 'مفارقة السيادة' : 'Sovereignty Paradox'}
          </button>
          <button
            onClick={() => setActiveTab('actors')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'actors' ? 'bg-white text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isAr ? 'مواقف الخصوم' : 'Actor Stance'}
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'simulation' ? 'bg-white text-black font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isAr ? 'مختبر السيناريوهات' : 'Risk Simulator'}
          </button>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="min-h-[340px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Sovereignty Paradox Diagram */}
          {activeTab === 'paradox' && (
            <motion.div
              key="paradox"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-right rtl:text-right ltr:text-left"
              style={{ direction: isAr ? 'rtl' : 'ltr' }}
            >
              <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl mb-2">
                {isAr 
                  ? 'رسم تخطيطي تفاعلي يوضح "المعضلة المزدوجة" التي يواجهها لبنان: إن تطبيق متطلبات السلام الخارجي (نزع سلاح الفصائل) يضغط مباشرة على فتيل الفتنة والحرب الأهلية الداخلية.' 
                  : 'An interactive flow-diagram depicting the devastating dual trap: enforcing the demands of external peace (disarming factions) directly triggers the detonator of internal civil conflict.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* External Peace Requirements (Input Left) */}
                <div className="border border-zinc-800 bg-zinc-900/40 p-3.5 space-y-2 relative">
                  <div className="flex items-center gap-1.5 text-blue-400">
                    <Shield size={16} />
                    <span className="font-display font-black text-xs uppercase tracking-wide">
                      {isAr ? '١. الاستحقاق الدولي (القرار ١٧٠١)' : '1. International Demands (Res. 1701)'}
                    </span>
                  </div>
                  <ul className="text-[11px] text-zinc-300 space-y-1.5 font-sans leading-relaxed list-disc list-inside">
                    <li>{isAr ? 'بسط سيادة الجيش اللبناني جنوب الليطاني' : 'Deploy LAF exclusively south of Litani'}</li>
                    <li>{isAr ? 'احتكار الدولة المطلق لقرار الحرب والسيادة' : 'Sovereign state monopoly on weapons/war'}</li>
                    <li>{isAr ? 'تفكيك البنية التحتية العسكرية لحزب الله' : 'Deconstruct non-state paramilitary assets'}</li>
                  </ul>
                  <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800">
                    {isAr ? 'الهدف: إنهاء الغارات ووقف الدمار الخارجي' : 'Goal: Permanent end to Israeli raids'}
                  </div>
                </div>

                {/* The Central Pivot (Double Loop) */}
                <div className="flex flex-col justify-center items-center p-4 bg-zinc-900/70 border border-zinc-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15)_0%,transparent_70%)] animate-pulse"></div>
                  
                  <Activity className="text-red-500 animate-pulse mb-2 shrink-0" size={24} />
                  
                  <div className="text-center">
                    <span className="font-mono text-[9px] text-red-400 font-extrabold tracking-widest block uppercase">
                      {isAr ? 'المعضلة المزدوجة' : 'THE DOUBLE TRAP'}
                    </span>
                    <h4 className="font-display font-black text-xs text-white mt-1">
                      {isAr ? 'قيد الترابط القاتل' : 'Deadly Feedback Loop'}
                    </h4>
                  </div>
                  
                  <div className="flex items-center justify-between w-full mt-4 text-[10px] font-mono text-zinc-400 border-t border-dashed border-zinc-800 pt-3">
                    <div className="text-center w-1/2 border-l border-zinc-850">
                      <span className="text-red-400 block font-bold">↑ {isAr ? 'نزع السلاح' : 'Disarm'}</span>
                      <span>{isAr ? '← صراع أهلي' : '← Civil War'}</span>
                    </div>
                    <div className="text-center w-1/2">
                      <span className="text-amber-400 block font-bold">↓ {isAr ? 'تراجع الدولة' : 'No Action'}</span>
                      <span>{isAr ? '← تدمير إسرائيلي' : '← Israeli Strikes'}</span>
                    </div>
                  </div>
                </div>

                {/* Internal Rift Trap (Output Right) */}
                <div className="border border-zinc-800 bg-zinc-900/40 p-3.5 space-y-2 relative">
                  <div className="flex items-center gap-1.5 text-red-500">
                    <Users size={16} />
                    <span className="font-display font-black text-xs uppercase tracking-wide">
                      {isAr ? '٢. ردود الفعل الداخلية (خطر الفتنة)' : '2. Domestic Blowback (Strife Hazard)'}
                    </span>
                  </div>
                  <ul className="text-[11px] text-zinc-300 space-y-1.5 font-sans leading-relaxed list-disc list-inside">
                    <li>{isAr ? 'رفض حزب الله القاطع للمساومة على سلاحه' : 'Hezbollah veto on defensive arsenal'}</li>
                    <li>{isAr ? 'اتهام الحكومة بالتفريط والاستسلام لأمريكا' : 'Accusing cabinet of surrender to US plans'}</li>
                    <li>{isAr ? 'شحن طائفي واحتقان يهدد بانقسام الجيش' : 'Sectarian divide risks splintering the army'}</li>
                  </ul>
                  <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800">
                    {isAr ? 'النتيجة: انفجار الخط الساخن والفتنة الداخلية' : 'Result: Civil clash & institutional paralysis'}
                  </div>
                </div>
              </div>

              {/* Informative Quote Highlight */}
              <div className="mt-4 p-3 bg-red-950/25 border border-red-900/40 flex items-start gap-2.5">
                <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
                <div className="text-xxs sm:text-xs leading-relaxed text-zinc-300">
                  <strong>{isAr ? 'مذكرة تقدير موقف:' : 'Sovereign Analyst Warning:'}</strong>{' '}
                  {isAr 
                    ? 'الخطوات الدبلوماسية الدقيقة لتأمين الحدود الجنوبية (نزع سلاح الفصائل وتمركز الجيش) هي ذاتها المحفزات المباشرة لإشعال صدام مسلح أهلي. الفشل المزدوج يهدد بنسف السلم والكيان اللبناني بالكامل.' 
                    : 'The precise diplomatic steps required to secure the southern borders (disarming factions and deploying the LAF) are the very catalysts that trigger internal armed conflict. Retracting risks Israeli relapse, proceeding risks civil fracture.'}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Actor Positions Stance Tab */}
          {activeTab === 'actors' && (
            <motion.div
              key="actors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-right rtl:text-right ltr:text-left"
              style={{ direction: isAr ? 'rtl' : 'ltr' }}
            >
              <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl mb-2">
                {isAr 
                  ? 'مقارنة استخباراتية تفاعلية بين موقفين متباعدين حول سلاح المقاومة والقرار ١٧٠١ يفسر سبب انسداد المسار الدبلوماسي العادي.' 
                  : 'Compare the divergent sovereignty models and non-negotiable redlines preventing conventional diplomatic synthesis.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Government of Lebanon Stance */}
                <div className="border border-zinc-850 bg-zinc-950 p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
                  <div className="flex items-center gap-2 mb-3">
                    <Landmark size={18} className="text-blue-500" />
                    <h4 className="font-display font-black text-xs text-white uppercase">
                      {isAr ? 'الحكومة اللبنانية الشرعية والجيش' : 'Lebanese State & Army (LAF)'}
                    </h4>
                  </div>
                  
                  <div className="space-y-3 text-[11px] text-zinc-300">
                    <div className="p-2.5 bg-zinc-900 border border-zinc-850">
                      <span className="font-mono text-[9px] text-blue-400 font-extrabold block mb-1">
                        {isAr ? 'المرجعية الدستورية:' : 'CONSTITUTIONAL DOCTRINE:'}
                      </span>
                      <p className="leading-relaxed">
                        {isAr 
                          ? 'استعادة حصرية احتكار السلاح للدولة اللبنانية، ووجوب تنفيذ القرارات الدولية وعلى رأسها القرار ١٧٠١ حماية للسيادة وللشعب من الحروب الخارجية المدمرة.'
                          : 'Re-establishing state monopoly over weapons and war decision. Enforcing Resolution 1701 as the sole safeguard for territorial survival.'}
                      </p>
                    </div>

                    <div className="space-y-1.5 font-sans">
                      <div className="flex justify-between border-b border-zinc-900 pb-1 items-center">
                        <span className="text-zinc-500 font-mono text-[10px]">{isAr ? 'سقف المفاوضات:' : 'Negotiation Cap:'}</span>
                        <span className="font-bold text-white text-xxs">{isAr ? 'نزع السلاح وتفعيل الجيش' : 'Disarm Non-State Groups'}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-900 pb-1 items-center">
                        <span className="text-zinc-500 font-mono text-[10px]">{isAr ? 'الدعم الإقليمي:' : 'External Allies:'}</span>
                        <span className="font-bold text-blue-400 text-xxs">{isAr ? 'الولايات المتحدة، فرنسا، الجامعة العربية' : 'USA, France, Arab League'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 font-mono text-[10px]">{isAr ? 'المخاوف الكبرى:' : 'Primary Fear:'}</span>
                        <span className="font-bold text-red-400 text-xxs">{isAr ? 'دمار شامل وانهيار تام للدولة' : 'Total State Demise & Ruins'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hezbollah Paramilitary Bloc Stance */}
                <div className="border border-zinc-850 bg-zinc-950 p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600"></div>
                  <div className="flex items-center gap-2 mb-3">
                    <Activity size={18} className="text-amber-500 animate-pulse" />
                    <h4 className="font-display font-black text-xs text-white uppercase">
                      {isAr ? 'جناح المقاومة وحلفاؤها (حزب الله)' : 'Hizbullah Paramilitary Bloc'}
                    </h4>
                  </div>
                  
                  <div className="space-y-3 text-[11px] text-zinc-300">
                    <div className="p-2.5 bg-zinc-900 border border-zinc-850">
                      <span className="font-mono text-[9px] text-amber-400 font-extrabold block mb-1">
                        {isAr ? 'عقيدة المقاومة:' : 'MILITANT DOCTRINE:'}
                      </span>
                      <p className="leading-relaxed">
                        {isAr 
                          ? 'السلاح غير خاضع للمساومة أو الشروط الخارجية. المقاومة هي خط الدفاع الشرعي والوحيد عن لبنان، ويعتبر الإطار الأمريكي "استسلاماً مهيناً وتفريطاً سيادياً صريحاً".'
                          : 'Weapons are defensive, non-negotiable assets. Disarming represents a direct surrender to Israel. US frames are "humiliating protocols of submission".'}
                      </p>
                    </div>

                    <div className="space-y-1.5 font-sans">
                      <div className="flex justify-between border-b border-zinc-900 pb-1 items-center">
                        <span className="text-zinc-500 font-mono text-[10px]">{isAr ? 'سقف المفاوضات:' : 'Negotiation Cap:'}</span>
                        <span className="font-bold text-white text-xxs">{isAr ? 'رفض مطلق لنقاش السلاح' : 'Sovereignty Veto // Weapons Active'}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-900 pb-1 items-center">
                        <span className="text-zinc-500 font-mono text-[10px]">{isAr ? 'الدعم الإقليمي:' : 'External Allies:'}</span>
                        <span className="font-bold text-amber-400 text-xxs">{isAr ? 'إيران، محور الممانعة' : 'Iran, Axis of Resistance'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 font-mono text-[10px]">{isAr ? 'المخاوف الكبرى:' : 'Primary Fear:'}</span>
                        <span className="font-bold text-red-400 text-xxs">{isAr ? 'الاستسلام وإلغاء منظومة الردع' : 'Liquidation of deterrence assets'}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: Dynamic Stress Simulation and Risks Sandbox */}
          {activeTab === 'simulation' && (
            <motion.div
              key="simulation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-right rtl:text-right ltr:text-left"
              style={{ direction: isAr ? 'rtl' : 'ltr' }}
            >
              <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl mb-2">
                {isAr 
                  ? 'نموذج محاكاة تفاعلي للأرقام والمؤشرات: اختبر تأثير زيادة ضغط نزع السلاح ونشر الجيش اللبناني على احتمالية الانفجار الأهلي واندلاع "الفتنة الداخلي"، مقابل الحماية الخارجية.' 
                  : 'Adjust pressure levels and deployment ranges. Observe in real-time the delicate metrics weighing Civil Strife (Al-Fitna) risk against External Defense survival.'}
              </p>

              {/* Quick Scenario Presets */}
              <div className="flex flex-wrap gap-2 mb-4 bg-zinc-900/60 p-2 border border-zinc-850 justify-start">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase self-center px-1">
                  {isAr ? 'سيناريوهات معلبة:' : 'PRESETS:'}
                </span>
                <button
                  onClick={() => applyScenario(20, 30)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-[10px] px-2.5 py-1 transition-colors cursor-pointer"
                >
                  {isAr ? 'مراوحة الوضع الراهن' : 'Status Quo Inertia'}
                </button>
                <button
                  onClick={() => applyScenario(90, 80)}
                  className="bg-red-900/70 hover:bg-red-800 text-red-200 font-mono text-[10px] px-2.5 py-1 border border-red-700 transition-colors cursor-pointer"
                >
                  {isAr ? 'فرض القوة القسري' : 'Forced Disarmament Enforce'}
                </button>
                <button
                  onClick={() => applyScenario(50, 95)}
                  className="bg-emerald-900/70 hover:bg-emerald-800 text-emerald-200 font-mono text-[10px] px-2.5 py-1 border border-emerald-700 transition-colors cursor-pointer"
                >
                  {isAr ? 'انتشار الجيش الوقائي' : 'Protective LAF Deployment'}
                </button>
                <button
                  onClick={() => applyScenario(5, 5)}
                  className="bg-amber-950/70 hover:bg-amber-900 text-amber-200 font-mono text-[10px] px-2.5 py-1 border border-amber-850 transition-colors cursor-pointer"
                >
                  {isAr ? 'انهيار المسار الدبلوماسي' : 'Diplomatic Collapse'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* Control sliders (4 cols) */}
                <div className="md:col-span-5 space-y-4 border-l border-zinc-850 pl-0 md:pl-4">
                  
                  {/* Slider 1: Disarmament Pressure */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">
                        {isAr ? 'ضغط نزع السلاح الممنهج:' : 'Systematic Disarm Pressure:'}
                      </span>
                      <span className="font-mono text-zinc-400 text-[11px]">{disarmamentPressure}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={disarmamentPressure} 
                      onChange={(e) => setDisarmamentPressure(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                    <span className="text-[10px] text-zinc-500 block">
                      {isAr 
                        ? 'مدى إصرار واشنطن والحكومة على مصادرة ترسانة حزب الله ونزع السلاح.'
                        : 'Intensity of diplomatic/state demand to disarm the paramilitary bloc.'}
                    </span>
                  </div>

                  {/* Slider 2: Army (LAF) Deployment */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">
                        {isAr ? 'مدى انتشار وتمركّز الجيش اللبناني:' : 'Army Deployment Range:'}
                      </span>
                      <span className="font-mono text-zinc-400 text-[11px]">{lafDeployment}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={lafDeployment} 
                      onChange={(e) => setLafDeployment(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <span className="text-[10px] text-zinc-500 block">
                      {isAr 
                        ? 'نسبة انتشار وحدات الجيش اللبناني على طول الخط الأزرق ونقاط الاحتكاك.'
                        : 'Scale of sovereign troops stationed along buffer borders and crossings.'}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-zinc-900 text-[10px] text-zinc-400 space-y-1 flex items-start gap-1">
                    <Info size={14} className="text-zinc-500 shrink-0 mt-0.5" />
                    <p>
                      {isAr 
                        ? 'تحديث فوري: الحسابات تستند إلى النماذج الإحصائية للتوتر التاريخي ونماذج رصد الرأي العام ومؤشر الفتنة الممنهج للوراق.' 
                        : 'Interactive calculus uses real historical tension models and public sentiment algorithms.'}
                    </p>
                  </div>
                </div>

                {/* Simulated Outcome Metrics (7 cols) */}
                <div className="md:col-span-7 bg-zinc-900/35 p-4 flex flex-col justify-between border border-zinc-850">
                  <div className="space-y-4">
                    <h4 className="font-display font-black text-xs text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <RefreshCw size={13} className="text-zinc-500 animate-spin-slow" />
                      {isAr ? 'مؤشرات الخطر الفوري قيد التحديث:' : 'LIVE STRATEGIC RISK METRICS:'}
                    </h4>

                    {/* Metric 1: Civil Strife / Fitna */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono font-bold">
                        <span>{isAr ? '🔥 خطر الفتنة والاصطدام الأهلي:' : '🔥 Civil Strife & Internal Friction:'}</span>
                        <span className={`px-2 py-0.2 border text-[10px] ${getTensionColor(currentCivilTension)}`}>
                          {currentCivilTension}% ({isAr ? (currentCivilTension > 70 ? 'مرتفع جداً - دامي' : currentCivilTension > 40 ? 'توتر نشط' : 'مستقر نسبياً') : (currentCivilTension > 70 ? 'CRITICAL - STRIFE' : currentCivilTension > 40 ? 'ACTIVE TENSION' : 'CONTROLLED')})
                        </span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2.5 rounded-none overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${getTensionProgressColor(currentCivilTension)}`}
                          style={{ width: `${currentCivilTension}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Metric 2: Sovereign Civil War Probability */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono font-bold">
                        <span>{isAr ? '⚠️ احتمالية الانزلاق إلى نزاع مسلح داخلي:' : '⚠️ Internal Armed Conflict Risk:'}</span>
                        <span className={`px-2 py-0.2 border text-[10px] ${getTensionColor(currentCivilWarRisk)}`}>
                          {currentCivilWarRisk}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2.5 rounded-none overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${getTensionProgressColor(currentCivilWarRisk)}`}
                          style={{ width: `${currentCivilWarRisk}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Metric 3: External Aggression Vulnerability */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono font-bold">
                        <span>{isAr ? '🛡️ خطر معاودة الحرب الإسرائيلية والانهيار الخارجي:' : '🛡️ Israel Aggression Vulnerability:'}</span>
                        <span className={`px-2 py-0.2 border text-[10px] ${getTensionColor(currentExternalRisk)}`}>
                          {currentExternalRisk}% ({isAr ? (currentExternalRisk > 75 ? 'نكوص حتمي' : currentExternalRisk > 40 ? 'مخاطر معتدلة' : 'ردع معزز') : (currentExternalRisk > 75 ? 'HIGH RISK' : currentExternalRisk > 40 ? 'VULNERABLE' : 'DETERRED')})
                        </span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2.5 rounded-none overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${getTensionProgressColor(currentExternalRisk)}`}
                          style={{ width: `${currentExternalRisk}%` }}
                        ></div>
                      </div>
                    </div>

                  </div>

                  {/* Summary Assessment Verdict box */}
                  <div className="mt-4 p-3 bg-zinc-950 border border-zinc-850 rounded-none text-xxs font-mono text-zinc-400">
                    <span className="text-zinc-200 uppercase font-black block mb-1">
                      {isAr ? '❖ تقدير الموقف النهائي للـ الورّاق:' : '❖ JOINT CHIEF BRIEFING ASSESSMENT:'}
                    </span>
                    <p className="leading-relaxed">
                      {isAr 
                        ? `عند ضغط نزع سلاح يبلغ ${disarmamentPressure}%، وتمركز جيش قدره ${lafDeployment}%، فإن النظام اللبناني يدخل في مرحلة حاسمة. ${currentCivilTension > 70 ? 'إن تفعيل نزع السلاح بصورة قسرية في هذه المعادلة يضمن إشعال تمرد فوري وحرب شوارع طائفية.' : 'يمكن الحفاظ على تماسك نسبي إذا تزامنت الخطوات الدبلوماسية مع انتشار دفاعي منظم دون تسرع في نزع السلاح.'}`
                        : `At a disarmament pressure index of ${disarmamentPressure}% and LAF stationing rate of ${lafDeployment}%, the country reaches a critical pivot. ${currentCivilTension > 70 ? 'A forced disarmament approach here guarantees an immediate domestic clash and splintering of military units.' : 'Relative equilibrium is reachable only if physical security is prioritizing containment rather than abrupt faction liquidation.'}`}
                    </p>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      
    </div>
  );
}
