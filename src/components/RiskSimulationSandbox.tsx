import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle, Shield, CheckCircle, Brain, RefreshCw, Award } from 'lucide-react';

interface RiskSimulationSandboxProps {
  language: 'ar' | 'en';
}

export default function RiskSimulationSandbox({ language }: RiskSimulationSandboxProps) {
  const isAr = language === 'ar';
  const [activeScenario, setActiveScenario] = useState<'supply' | 'currency' | 'geopolitics'>('supply');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [traditionalResilience, setTraditionalResilience] = useState<number[]>([]);
  const [antifragileResilience, setAntifragileResilience] = useState<number[]>([]);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scenarios = {
    supply: {
      titleAr: 'تعطّل الموانئ وسلاسل الإمداد',
      titleEn: 'Port & Supply Chain Disruptions',
      descAr: 'فرض حصار مفاجئ، تضرر البنية التحتية، أو حدوث جمود جمركي في النقاط الحيوية.',
      descEn: 'Sudden blockade, infrastructure damage, or customs gridlock at vital entry ports.',
      traditionalBaseDrop: 45,
      antifragileBaseDrop: 15,
      recoverySpeedTrad: 0.8,
      recoverySpeedAnti: 2.2,
      hedgingImpact: ' Day 3: AI detects port congestion premiums; reroutes shipping to safe routes.'
    },
    currency: {
      titleAr: 'التقلب المفاجئ في أسعار العملات',
      titleEn: 'Sudden Currency Volatility',
      descAr: 'تقلبات سريعة وغير متوقعة في أسعار صرف السوق الموازية تخلق فخاخ سيولة مفاجئة.',
      descEn: 'Rapid and unpredictable fluctuations in parallel market exchange rates creating liquidity traps.',
      traditionalBaseDrop: 60,
      antifragileBaseDrop: 10,
      recoverySpeedTrad: 0.4,
      recoverySpeedAnti: 2.8,
      hedgingImpact: ' Day 3: AI detects abnormal forex trade flows; triggers auto hedging and dollar pricing.'
    },
    geopolitics: {
      titleAr: 'التصعيد الجيوسياسي الإقليمي',
      titleEn: 'Regional Geopolitical Escalation',
      descAr: 'اتساع مفاجئ في رقعة الصراع الإقليمي يؤدي لهروب رؤوس الأموال وانقطاع تشغيلي.',
      descEn: 'Sudden expansion of regional conflict leading to immediate capital flight and operational halts.',
      traditionalBaseDrop: 55,
      antifragileBaseDrop: 20,
      recoverySpeedTrad: 0.5,
      recoverySpeedAnti: 2.5,
      hedgingImpact: ' Day 3: AI scans diplomatic statements and air transport risks; secures remote cloud and distributed assets.'
    }
  };

  const currentScenarioInfo = scenarios[activeScenario];

  // Initialize simulation data
  const initializeData = () => {
    const trad: number[] = [];
    const anti: number[] = [];
    const initialLogs: string[] = [];

    for (let day = 1; day <= 30; day++) {
      if (day < 5) {
        // Normal baseline
        trad.push(100);
        // Antifragile model does early warning adjustment on day 3
        if (day === 3 || day === 4) {
          anti.push(102); // slight proactive bump or hedge cost
        } else {
          anti.push(100);
        }
      } else if (day === 5) {
        // Shock occurs
        trad.push(100 - currentScenarioInfo.traditionalBaseDrop);
        anti.push(102 - currentScenarioInfo.antifragileBaseDrop);
      } else {
        // Recovery path
        // Traditional drops a bit more due to panic, then recovers very slowly
        const prevTrad = trad[day - 2];
        const prevAnti = anti[day - 2];
        
        let nextTrad = prevTrad;
        if (day <= 8) {
          nextTrad = Math.max(25, prevTrad - 3); // continues to panic/bleed
        } else {
          nextTrad = Math.min(90, prevTrad + currentScenarioInfo.recoverySpeedTrad);
        }
        
        // Antifragile starts immediate adaptation and evolves PAST 100
        let nextAnti = prevAnti;
        if (day <= 7) {
          nextAnti = Math.max(75, prevAnti + currentScenarioInfo.recoverySpeedAnti * 0.5); // minor recovery, stabilizing
        } else {
          nextAnti = Math.min(125, prevAnti + currentScenarioInfo.recoverySpeedAnti); // evolves past 100
        }
        
        trad.push(Math.round(nextTrad));
        anti.push(Math.round(nextAnti));
      }
    }

    setTraditionalResilience(trad);
    setAntifragileResilience(anti);

    // Initial log message
    if (isAr) {
      initialLogs.push(`[اليوم الأول] البداية: كلا النظامين يعملان بكفاءة ١٠٠٪ كخط مرجعي.`);
    } else {
      initialLogs.push(`[Day 1] Baseline: Both structures are running at 100% capacity.`);
    }
    setSimulationLogs(initialLogs);
  };

  useEffect(() => {
    initializeData();
    setCurrentDay(1);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [activeScenario, language]);

  // Handle Play/Pause
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentDay((prev) => {
          if (prev >= 30) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 30;
          }
          const nextDay = prev + 1;
          
          // Generate log message for the day
          let logMsg = '';
          if (isAr) {
            if (nextDay === 3) {
              logMsg = `[اليوم ٣ - إنذار خوارزمي] رصد الذكاء الاصطناعي مؤشرات أولية للخلل وقام بالتحوط تلقائياً.`;
            } else if (nextDay === 5) {
              logMsg = `[اليوم ٥ - صدمة كبرى!] وقوع الحدث الصادم: ${currentScenarioInfo.titleAr}. هبوط فوري للنظام التقليدي.`;
            } else if (nextDay === 8) {
              logMsg = `[اليوم ٨] الشلل يصيب الهيكل التقليدي؛ أما البنية التطورية فتبدأ مرحلة التكيف والتعلم الديناميكي.`;
            } else if (nextDay === 15) {
              logMsg = `[اليوم ١٥] تعافي مرن للبنية التكيفية بفضل النمذجة وإجراءات التحوط؛ في حين يرزح الهيكل التقليدي تحت الخسائر.`;
            } else if (nextDay === 20) {
              logMsg = `[اليوم ٢٠] تجاوزت البنية المضادة للهشاشة خط القيمة الأصلي محققة نمواً استباقياً.`;
            } else if (nextDay === 30) {
              logMsg = `[اليوم ٣٠] نهاية المحاكاة: البنية المضادة للهشاشة سجلت ${antifragileResilience[29]}٪ بينما التقليدية تراوح عند ${traditionalResilience[29]}٪.`;
            }
          } else {
            if (nextDay === 3) {
              logMsg = `[Day 3 - Algorithmic Alert] AI detects early signals of stress; automatically deploys hedging mechanisms.`;
            } else if (nextDay === 5) {
              logMsg = `[Day 5 - MASSIVE SHOCK] Shock event triggered: ${currentScenarioInfo.titleEn}. Traditional model collapses.`;
            } else if (nextDay === 8) {
              logMsg = `[Day 8] Traditional rigid system paralyzed. Antifragile adaptive node initiates dynamic learning loops.`;
            } else if (nextDay === 15) {
              logMsg = `[Day 15] Antifragile system recovers strongly via alternate routes; Traditional system is bleeding value.`;
            } else if (nextDay === 20) {
              logMsg = `[Day 20] Antifragile architecture surpasses original baseline, turning volatility into capital growth.`;
            } else if (nextDay === 30) {
              logMsg = `[Day 30] Simulation ends. Antifragile finishes at ${antifragileResilience[29]}% capacity; Traditional stagnates at ${traditionalResilience[29]}%.`;
            }
          }

          if (logMsg) {
            setSimulationLogs((prevLogs) => [logMsg, ...prevLogs.slice(0, 5)]);
          }
          
          return nextDay;
        });
      }, 400);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, activeScenario, traditionalResilience, antifragileResilience, language]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentDay(1);
    initializeData();
  };

  const handleScenarioChange = (scen: 'supply' | 'currency' | 'geopolitics') => {
    setActiveScenario(scen);
  };

  // Safe SVG rendering variables
  const currentAntiValue = antifragileResilience[currentDay - 1] || 100;
  const currentTradValue = traditionalResilience[currentDay - 1] || 100;

  // Generate SVG path string
  const generatePath = (data: number[]) => {
    if (data.length === 0) return '';
    return data
      .slice(0, currentDay)
      .map((val, i) => {
        const x = (i / 29) * 100; // percent based width
        const y = 100 - (val / 130) * 100; // scaled height
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  return (
    <div id="risk-simulation-sandbox" className="border-4 border-black bg-white p-5 font-sans shadow-[5px_5px_0_0_rgba(0,0,0,1)] select-none text-right rtl:text-right ltr:text-left my-8 rounded">
      {/* Header */}
      <div className="border-b-2 border-black pb-3 mb-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Brain className="text-[#b91c1c] animate-pulse" size={24} />
          <div>
            <h4 className="font-black text-black text-base uppercase tracking-tight">
              {isAr ? 'صندوق الرمل التفاعلي: محاكاة مضاد الهشاشة' : 'Simulation Sandbox: Antifragility Sandbox'}
            </h4>
            <p className="text-[10px] text-zinc-500 font-bold">
              {isAr ? 'مقارنة أداء الأنظمة المدعومة بالذكاء الاصطناعي مع الأنظمة التقليدية تحت وطأة الصدمات' : 'Benchmark reactive vs. AI-powered proactive risk infrastructure.'}
            </p>
          </div>
        </div>
        <div className="bg-black text-white px-2 py-1 text-[9px] font-mono font-black border border-white tracking-wider">
          {isAr ? 'إصدار استراتيجي لعام ٢٠٢٦' : '2026 STRATEGIC DISPATCH'}
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        {(Object.keys(scenarios) as Array<'supply' | 'currency' | 'geopolitics'>).map((scenKey) => {
          const s = scenarios[scenKey];
          const active = activeScenario === scenKey;
          return (
            <button
              key={scenKey}
              onClick={() => handleScenarioChange(scenKey)}
              className={`p-3 border-2 text-right rtl:text-right ltr:text-left transition-all cursor-pointer rounded ${
                active 
                  ? 'border-black bg-neutral-900 text-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]' 
                  : 'border-zinc-300 bg-zinc-50 text-neutral-800 hover:bg-zinc-100 hover:border-black'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 justify-between">
                <span className="font-sans font-black text-xs">
                  {isAr ? s.titleAr : s.titleEn}
                </span>
                {active && <CheckCircle size={12} className="text-emerald-400" />}
              </div>
              <p className={`text-[10px] leading-relaxed line-clamp-2 ${active ? 'text-zinc-300' : 'text-zinc-500'}`}>
                {isAr ? s.descAr : s.descEn}
              </p>
            </button>
          );
        })}
      </div>

      {/* Play Controls & Dynamic Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mb-5">
        
        {/* Playback Box */}
        <div className="lg:col-span-4 border-2 border-black p-4 bg-zinc-50 flex flex-col justify-between space-y-4 rounded">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
            <span className="font-mono text-xs font-black uppercase text-zinc-400">
              {isAr ? 'أدوات التحكم بالزمن' : 'Timeline Control'}
            </span>
            <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-mono font-black px-2 py-0.5 rounded">
              {isAr ? `اليوم: ${currentDay} / ٣٠` : `Day ${currentDay} of 30`}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 py-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center justify-center gap-1.5 bg-black hover:bg-neutral-800 text-white font-sans font-black text-xs px-4 py-2 border border-black cursor-pointer shadow-[2px_2px_0_0_rgba(255,255,255,1)] transition-all rounded-xs"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? (isAr ? 'إيقاف مؤقت' : 'Pause') : (isAr ? 'بدء المحاكاة' : 'Start Simulation')}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-1 bg-white hover:bg-zinc-100 border border-black text-black font-sans font-black text-xs px-3 py-2 cursor-pointer transition-all rounded-xs"
              title={isAr ? 'إعادة تعيين' : 'Reset Timeline'}
            >
              <RotateCcw size={14} />
              <span>{isAr ? 'إعادة' : 'Reset'}</span>
            </button>
          </div>

          {/* Slider Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-mono font-black text-zinc-400 uppercase">
              <span>{isAr ? 'اليوم ١' : 'Day 1'}</span>
              <span className="text-[#b91c1c]">{isAr ? 'اليوم ٥: صدمة' : 'Day 5: Shock'}</span>
              <span>{isAr ? 'اليوم ٣٠' : 'Day 30'}</span>
            </div>
            <div className="w-full bg-zinc-200 h-2 rounded overflow-hidden relative">
              <div 
                className="bg-black h-full transition-all duration-300" 
                style={{ width: `${(currentDay / 30) * 100}%` }}
              ></div>
              <div className="absolute top-0 bottom-0 left-[16.6%] w-1 bg-red-650" title="Day 5 Shock"></div>
            </div>
          </div>
        </div>

        {/* Real-time comparison metrics */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Antifragile Node info */}
          <div className="border-2 border-emerald-600 p-4 bg-emerald-50/50 flex flex-col justify-between rounded">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5">
              <span className="text-[9px] font-mono font-black text-emerald-800 uppercase tracking-widest flex items-center gap-1">
                <Shield size={11} />
                {isAr ? 'النموذج المرن المضاد للهشاشة' : 'PROACTIVE ANTIFRAGILE ARCHITECTURE'}
              </span>
              <span className="text-[9px] font-mono font-black text-emerald-600 uppercase">
                {isAr ? 'مدعوم بالذكاء' : 'AI-DRIVEN'}
              </span>
            </div>
            
            <div className="py-2 flex items-baseline justify-between">
              <span className="text-[10px] font-bold text-neutral-500">
                {isAr ? 'مؤشر استمرارية القيمة:' : 'Resilience Indicator:'}
              </span>
              <span className="text-3xl font-black text-emerald-700 tracking-tight">
                {currentAntiValue}%
              </span>
            </div>

            <p className="text-[10px] text-emerald-800 bg-white/70 p-2 border border-emerald-200 leading-relaxed font-sans font-medium rounded-xs">
              {currentDay < 3 
                ? (isAr ? 'نظام استباقي يحلل تدفقات الشحن ومقايضات العملات...' : 'AI scanning global freight rates and forex volumes...') 
                : currentDay < 5 
                ? (isAr ? 'تم رصد إنذار مبكر! تفعيل حوكمة وتحوط استباقي.' : 'Warning flag raised! Proactive hedging & routing deployed.')
                : (isAr ? 'تم عزل الأصول التالفة بنجاح، وامتصاص الصدمة وتنمية رأس المال البديل.' : 'Crisis isolated; alternate cash loops secured. Turning chaos into market capture.')}
            </p>
          </div>

          {/* Traditional node info */}
          <div className="border-2 border-zinc-400 p-4 bg-zinc-50/80 flex flex-col justify-between rounded">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5">
              <span className="text-[9px] font-mono font-black text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                <AlertTriangle size={11} className="text-zinc-650" />
                {isAr ? 'البنية المؤسسية التقليدية' : 'TRADITIONAL RIGID STRUCTURE'}
              </span>
              <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">
                {isAr ? 'قائم على ردود الفعل' : 'REACTIVE'}
              </span>
            </div>

            <div className="py-2 flex items-baseline justify-between">
              <span className="text-[10px] font-bold text-neutral-500">
                {isAr ? 'مؤشر استمرارية القيمة:' : 'Resilience Indicator:'}
              </span>
              <span className="text-3xl font-black text-zinc-700 tracking-tight">
                {currentTradValue}%
              </span>
            </div>

            <p className="text-[10px] text-zinc-600 bg-white p-2 border border-zinc-200 leading-relaxed font-sans font-medium rounded-xs">
              {currentDay < 5 
                ? (isAr ? 'يعمل بالخطوط الدفترية الثابتة والتقييم الربع السنوي.' : 'Operating on quarterly ledgers and offline databases.') 
                : (isAr ? 'صدمة غير متوقعة! جمود في القرار، تجميد العمليات ونزيف الأصول.' : 'Sudden shock! Command paralysis. Operations frozen, assets bleeding value.')}
            </p>
          </div>

        </div>
      </div>

      {/* Graphical Comparison Grid */}
      <div className="border-2 border-black p-4 mb-4 bg-zinc-50 rounded">
        <div className="flex items-center justify-between mb-3 border-b border-zinc-200 pb-2">
          <span className="font-mono text-[10px] font-black uppercase text-zinc-400">
            {isAr ? '📈 مخطط الاستجابة والصمود الفوري عبر ٣٠ يوماً' : '📈 REAL-TIME RESILIENCE PROFILE (30-DAY TIMELINE)'}
          </span>
          <div className="flex items-center gap-3 text-[10px] font-bold">
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full inline-block"></span>
              {isAr ? 'بنية تطورية مرنة' : 'Antifragile'}
            </span>
            <span className="flex items-center gap-1 text-zinc-500">
              <span className="w-2.5 h-2.5 bg-zinc-400 rounded-full inline-block"></span>
              {isAr ? 'نموذج تقليدي جامد' : 'Traditional'}
            </span>
          </div>
        </div>

        {/* Dynamic Responsive Chart Stage */}
        <div className="w-full h-48 relative border border-zinc-300 bg-white p-2 rounded">
          {traditionalResilience.length > 0 && (
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
              {/* Day 5 Vertical Shock Line */}
              <line x1="16.6" y1="0" x2="16.6" y2="100" stroke="#b91c1c" strokeWidth="0.5" strokeDasharray="1.5,1.5" />
              <text x="18" y="15" fill="#b91c1c" fontSize="3" fontWeight="bold" fontFamily="monospace">
                {isAr ? 'اليوم ٥: صدمة' : 'Day 5 Shock'}
              </text>
              
              {/* Grid lines */}
              <line x1="0" y1="50" x2="100" y2="50" stroke="#eee" strokeWidth="0.25" />
              <line x1="0" y1="23" x2="100" y2="23" stroke="#eee" strokeWidth="0.25" />
              <text x="1" y="22" fill="#ccc" fontSize="2.5">100%</text>

              {/* Traditional system path */}
              <path
                d={generatePath(traditionalResilience)}
                fill="none"
                stroke="#a1a1aa"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Antifragile system path */}
              <path
                d={generatePath(antifragileResilience)}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 animate-dash"
              />
            </svg>
          )}

          {/* Quick simulation end result overlay */}
          {currentDay === 30 && (
            <div className="absolute inset-0 bg-neutral-900/90 text-white flex flex-col items-center justify-center p-4 text-center animate-fade-in rounded">
              <Award className="text-amber-400 animate-bounce mb-1" size={28} />
              <span className="font-sans font-black text-xs uppercase tracking-tight">
                {isAr ? 'اكتمال تجربة التقييم الاستباقي لعام ٢٠٢٦' : '2026 FORECAST SCENARIO COMPLETE'}
              </span>
              <p className="text-[10px] text-zinc-300 max-w-md mx-auto leading-relaxed mt-1">
                {isAr 
                  ? 'بينما يعاني الهيكل التقليدي من خسائر فادحة وعجز في التعافي، يتعلم النظام المضاد للهشاشة من الأزمة ليتخطى القيمة المرجعية الأصلية بنجاح.' 
                  : 'While the traditional enterprise suffers deep value destruction, the Antifragile AI system integrates local data loops to evolve and outgrow its previous baseline.'}
              </p>
              <button
                onClick={handleReset}
                className="mt-3 bg-[#b91c1c] text-white text-[9px] font-mono font-black py-1 px-2.5 rounded hover:bg-red-700 transition-colors cursor-pointer border border-white"
              >
                {isAr ? 'إعادة تشغيل صندوق الرمل' : 'RELOAD SIMULATOR'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Terminal Live logs */}
      <div className="border-2 border-black bg-neutral-900 p-3.5 font-mono text-[10px] text-zinc-300 rounded shadow-inner">
        <div className="flex items-center justify-between border-b border-neutral-700 pb-1.5 mb-2 text-zinc-500 font-bold select-none">
          <span>{isAr ? '📋 سجل أحداث المحاكاة الفوري' : '📋 REAL-TIME INCIDENT TELEMETRY'}</span>
          <span>{isAr ? 'سجل وكيل الذكاء الاصطناعي' : 'AL-WARRAQ MULTI-AGENT SHELL'}</span>
        </div>
        <div className="space-y-1.5 max-h-28 overflow-y-auto font-medium">
          {simulationLogs.map((log, i) => (
            <div key={i} className={`flex items-start gap-1 ${i === 0 ? 'text-[#10b981] font-black' : 'text-zinc-400'}`}>
              <span>▶</span>
              <span className="flex-1">{log}</span>
            </div>
          ))}
          {simulationLogs.length === 0 && (
            <span className="text-zinc-500 italic">{isAr ? 'بانتظار تشغيل المحاكاة...' : 'Awaiting timelines start...'}</span>
          )}
        </div>
      </div>
    </div>
  );
}
