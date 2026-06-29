import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  HelpCircle, 
  Sparkles, 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  Briefcase, 
  Newspaper, 
  Compass, 
  Server, 
  Scale, 
  Activity,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Award
} from 'lucide-react';

interface ScenarioDefinition {
  id: string;
  titleEn: string;
  titleAr: string;
  topicEn: string;
  topicAr: string;
  defaultProbability: number;
  variableNameEn: string;
  variableNameAr: string;
  variableOptions: string[];
}

const PREDEFINED_SCENARIOS: ScenarioDefinition[] = [
  {
    id: "telecom-lebanon",
    titleEn: "Beirut Telecom & Fiber Privatization Initiative",
    titleAr: "خصخصة شبكة الاتصالات والألياف الضوئية اللبنانية",
    topicEn: "Will the Lebanese government finalize the framework to privatize state-managed internet and mobile networks?",
    topicAr: "هل ستقوم الحكومة اللبنانية بإنهاء وصياغة اللائحة التنفيذية لخصخصة شبكات الإنترنت والهواتف النقالة الخاضعة لسيطرة الدولة بحلول نهاية العام؟",
    defaultProbability: 62,
    variableNameEn: "Independent Regulatory Oversight Mode",
    variableNameAr: "طبيعة سلطة تنظيم قطاع الاتصالات تابعة للهيئة المستقلة",
    variableOptions: ["Independent Commission (هيئة مستقلة تجارية)", "Ministry Direct Control (رقابة وزارية مباشرة)", "Sovereign Holding Asset (صندوق القوى السيادية السيادية)"]
  },
  {
    id: "east-west-pipeline",
    titleEn: "East-West Pipeline Expansion Boost",
    titleAr: "الجر الفوري لخط أنابيب شرق-غرب السعودي",
    topicEn: "Will Saudi Arabia successfully expand energy capacity on the overland dual-conduit East-West pipeline to bypass Strait of Hormuz completely?",
    topicAr: "هل ستقوم المملكة العربية السعودية بزيادة السعة الجارية لمجمعات ضخ الخام عبر الأنابيب البرية شرق-غرب لتجنب أي احتكاك في مضيق هرمز؟",
    defaultProbability: 78,
    variableNameEn: "Target Capacity Expansion Rate",
    variableNameAr: "معدل التدفق والضخ المستهدف ببراميل النفط",
    variableOptions: ["7.0 Million Barrels/day (7 ملايين برميل يومياً)", "8.2 Million Barrels/day (8.2 مليون برميل يومياً)", "5.5 Million Barrels/day - Safe Capacity (5.5 مليون برميل كحد آمن)"]
  },
  {
    id: "gulf-railway",
    titleEn: "Unified GCC Railway Freight Operations",
    titleAr: "التفعيل التجاري لخطوط سكة حديد الخليج الموحدة",
    topicEn: "Will the unified multi-state Gulf Rail service begin commercial bulk freight operations between Omani and Saudi borders?",
    topicAr: "هل ستدخل سكة الحديد الخليجية الموحدة الخدمة التجارية الفعلية لتيسير عبور شحنات البضائع والحاويات بين الحدود السعودية والعمانية؟",
    defaultProbability: 45,
    variableNameEn: "Customs Protocol Standard",
    variableNameAr: "بروتوكول التكامل الجمركي البيني",
    variableOptions: ["Automated Unified E-Gates (بوابات رقمية موحدة ذكية)", "Traditional Dual-Checkpoints (معاينات تقليدية مزدوجة)", "Hybrid Inter-State Waiver (أعفاء جمركي مرحلي خاص)"]
  },
  {
    id: "custom",
    titleEn: "Custom Simulation Node",
    titleAr: "شريحة رصد مخصصة",
    topicEn: "Specify your own scenario and variables below to generate a tailored forecast.",
    topicAr: "صغ سيناريو افتراضي من فضلك لتوسيع دائرة الرصد والاستكشاف في الشرق الأوسط.",
    defaultProbability: 50,
    variableNameEn: "Geopolitical Sentiment Driver",
    variableNameAr: "موجه المشاعر الجيوسياسية الإقليمية",
    variableOptions: ["High Stability Premium (علاوة استقرار مرتفعة)", "Moderate Trade Friction (احتكاك تجاري متوسط)", "Asymmetric Risk Spike (ارتفاع حاد في بند المخاطر الفريدة)"]
  }
];

interface SimulationReport {
  scenarioId: string;
  currentProbability: number;
  headlineAr: string;
  headlineEn: string;
  analysisAr: string;
  analysisEn: string;
  winnersAr: string[];
  winnersEn: string[];
  losersAr: string[];
  losersEn: string[];
  marketStrategyAr: string;
  marketStrategyEn: string;
  stabilityIndex: number;
}

interface BetPosition {
  id: string;
  scenarioId: string;
  scenarioTitleEn: string;
  scenarioTitleAr: string;
  type: 'YES' | 'NO';
  qty: number;
  buyPrice: number; // in credits, e.g. 0.62 per contract
}

interface WhatIfSimulatorProps {
  language: 'ar' | 'en';
  layoutMode?: string;
}

export default function WhatIfSimulator({ language, layoutMode }: WhatIfSimulatorProps) {
  const isAr = language === 'ar';

  // 1. Core simulation state
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("telecom-lebanon");
  const [probability, setProbability] = useState<number>(62);
  const [selectedVarOption, setSelectedVarOption] = useState<string>("");
  const [customQuestion, setCustomQuestion] = useState<string>("");
  const [customTitleEn, setCustomTitleEn] = useState<string>("Enforcement of Autonomous Data Safe Zones");
  const [customTitleAr, setCustomTitleAr] = useState<string>("تأسيس مناطق تخزين البيانات السيادية المستقلة");

  // Loading & reporting states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [report, setReport] = useState<SimulationReport | null>(null);

  // 2. Pocket betting credits system (Polymarket game)
  const [credits, setCredits] = useState<number>(() => {
    const saved = localStorage.getItem('alwarraq_sim_credits');
    return saved ? parseFloat(saved) : 1000;
  });

  const [positions, setPositions] = useState<BetPosition[]>(() => {
    const saved = localStorage.getItem('alwarraq_sim_positions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error("Failed to parse sim positions:", e);
      }
    }
    return [];
  });

  const [buyQty, setBuyQty] = useState<number>(100);
  const [betFeedback, setBetFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  // Auto load default variable option when scenario changes
  const activeScenario = PREDEFINED_SCENARIOS.find(s => s.id === selectedScenarioId) || PREDEFINED_SCENARIOS[0];

  useEffect(() => {
    setProbability(activeScenario.defaultProbability);
    setSelectedVarOption(activeScenario.variableOptions[0]);
    setBetFeedback(null);
  }, [selectedScenarioId]);

  // Persist credits & positions
  useEffect(() => {
    localStorage.setItem('alwarraq_sim_credits', credits.toFixed(2));
    localStorage.setItem('alwarraq_sim_positions', JSON.stringify(positions));
  }, [credits, positions]);

  // Loading screen texts cycle
  const loadingPhrasesAr = [
    "مناداة العقد الذكي التنبئي...",
    "مسح الجرد اللوجستي والبنية التحتية لحوض البحر الأبيض المتوسط...",
    "حقن البيانات الإحصائية في المحرك النيوروني لجريدة الوراق...",
    "صياغة مانشيت كسر الخبر وتقدير الموقف التحليلي المزدوج..."
  ];

  const loadingPhrasesEn = [
    "Calling predictive consensus contracts...",
    "Scanning Mediterranean cargo rosters & digital fiber nodes...",
    "Injecting statistical factors into Al-Warraq Neural Forecaster...",
    "Assembling situation report tables & contract hedging guidelines..."
  ];

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % 4);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Core API trigger: Run Simulation
  const handleRunSimulation = async () => {
    setIsLoading(true);
    setReport(null);

    const payload = {
      scenarioId: selectedScenarioId,
      titleEn: selectedScenarioId === 'custom' ? customTitleEn : activeScenario.titleEn,
      titleAr: selectedScenarioId === 'custom' ? customTitleAr : activeScenario.titleAr,
      probability: probability,
      variableAValue: selectedVarOption,
      customQuestion: customQuestion
    };

    try {
      const response = await fetch('/api/simulator/what-if', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Simulation endpoint failure");
      }

      const data = await response.json();
      setReport(data);
    } catch (e) {
      console.warn("Error running AI simulation, fallback template triggered", e);
    } finally {
      setIsLoading(false);
    }
  };

  // Prediction Contract trading calculations (Polymarket rules)
  const yesPrice = parseFloat((probability / 100).toFixed(2));
  const noPrice = parseFloat((1 - (probability / 100)).toFixed(2));

  // Quick trade execution
  const executeBuyContract = (type: 'YES' | 'NO') => {
    const contractPrice = type === 'YES' ? yesPrice : noPrice;
    const totalCost = contractPrice * buyQty;

    if (totalCost > credits) {
      setBetFeedback({
        message: isAr 
          ? `عفواً! الرصيد غير كافٍ. تحتاج إلى ${totalCost.toFixed(1)} من الائتمان لتنفيذ هذه المضاربة.` 
          : `Insufficient credits! This transaction requires ${totalCost.toFixed(1)} $WRQ credits.`,
        isError: true
      });
      return;
    }

    // Deduct state & append position
    setCredits(prev => prev - totalCost);
    
    // Check if we should consolidate existing position of same type and same scenario
    const existingIndex = positions.findIndex(pos => pos.scenarioId === selectedScenarioId && pos.type === type);

    if (existingIndex > -1) {
      const updatedPositions = [...positions];
      const exist = updatedPositions[existingIndex];
      const newTotalQty = exist.qty + buyQty;
      const newAveragePrice = ((exist.qty * exist.buyPrice) + (buyQty * contractPrice)) / newTotalQty;
      
      updatedPositions[existingIndex] = {
        ...exist,
        qty: newTotalQty,
        buyPrice: parseFloat(newAveragePrice.toFixed(2))
      };
      setPositions(updatedPositions);
    } else {
      const newPosition: BetPosition = {
        id: `pos-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        scenarioId: selectedScenarioId,
        scenarioTitleEn: selectedScenarioId === 'custom' ? customTitleEn : activeScenario.titleEn,
        scenarioTitleAr: selectedScenarioId === 'custom' ? customTitleAr : activeScenario.titleAr,
        type: type,
        qty: buyQty,
        buyPrice: contractPrice
      };
      setPositions([...positions, newPosition]);
    }

    setBetFeedback({
      message: isAr 
        ? `بنجاح! تم الاستحواذ على ${buyQty} من عقود ${type} بسعر قدره (¢${Math.round(contractPrice * 100)}) لكل عقد.` 
        : `Consensus Sealed! Acquired ${buyQty} ${type} contracts at ¢${Math.round(contractPrice * 100)} unit cost.`,
      isError: false
    });

    // Fade suggestion feedback after a few seconds
    setTimeout(() => {
      setBetFeedback(null);
    }, 4000);
  };

  // Close/Sell existing position
  const handleSellPosition = (posId: string) => {
    const pos = positions.find(p => p.id === posId);
    if (!pos) return;

    // Determine target scenario current probability for live settlement calculations
    const scan = PREDEFINED_SCENARIOS.find(s => s.id === pos.scenarioId);
    const activeProb = scan ? (pos.scenarioId === selectedScenarioId ? probability : scan.defaultProbability) : 50;
    
    // Current live price of this position
    const currentPrice = pos.type === 'YES' ? (activeProb / 100) : (1 - (activeProb / 100));
    const settlementCash = currentPrice * pos.qty;

    // Credit back & remove position
    setCredits(prev => prev + settlementCash);
    setPositions(positions.filter(p => p.id !== posId));

    setBetFeedback({
      message: isAr 
        ? `تم تصفية العقد بنجاح! وبيع الحيازة بقيمة اجمالية ${settlementCash.toFixed(1)} ائتمان.`
        : `Position Liquidated! Recovered ${settlementCash.toFixed(1)} $WRQ credits.`,
      isError: false
    });
  };

  // Reset wallet
  const handleResetCredits = () => {
    setCredits(1000);
    setPositions([]);
    setBetFeedback(null);
  };

  // Live simulation variables: dynamically calculate current P&L of all holdings
  const totalPortfolioValue = positions.reduce((total, pos) => {
    const currentProb = pos.scenarioId === selectedScenarioId ? probability : 50;
    const currentPrice = pos.type === 'YES' ? (currentProb / 100) : (1 - (currentProb / 100));
    return total + (pos.qty * currentPrice);
  }, 0);

  const initialCostOfPositions = positions.reduce((total, pos) => total + (pos.qty * pos.buyPrice), 0);
  const totalUnrealizedPnL = totalPortfolioValue - initialCostOfPositions;

  return (
    <div id="what-if-simulator-page" className="space-y-8 select-none">
      
      {/* Dynamic Banner & Head */}
      <div className="border-4 border-black p-6 bg-amber-50 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-4 select-none">
          <Activity size={320} className="text-[#b91c1c]" />
        </div>

        <div className="z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-[#b91c1c] text-white font-mono text-xxs font-black px-2.5 py-1 uppercase tracking-widest rounded-xs">
            <span className="animate-pulse">●</span> {isAr ? "تحليل مبني على السلاسل المعرفية" : "Asymmetric Prediction Engine"}
          </div>
          <h2 className="font-sans font-black text-3xl md:text-5xl leading-none tracking-tight text-black">
            {isAr ? 'محاكي الشؤون وماذا لو "الوراق"' : 'Al-Warraq Geopolitical "What-If" Simulator'}
          </h2>
          <p className="font-sans font-medium text-xs md:text-sm text-zinc-700 leading-relaxed">
            {isAr 
              ? 'تسمح لك هذه الواجهة المتقدمة بنمذجة ومحاكاة السيناريوهات الحيوية في الشرق الأوسط. غيّر احتماليات أسواق التنبؤ (Polymarket) لمراقبة الأثر المباشر على قرارات الاقتصاد الكلي، وشاهد فوراً مسودة تقييم الموقف المولّدة بذكاء الذكاء الاصطناعي.' 
              : 'Our advanced interactive simulator models predictive consensus in the Middle East. Adjust real-time "What If" parameters or place test consensus contracts on regional events to generate deep, dual-translated intelligence reports.'
            }
          </p>
        </div>

        {/* Dynamic score balance */}
        <div className="border-2 border-black bg-white p-4 font-mono z-10 w-full md:w-auto relative shadow-custom flex flex-row md:flex-col items-center justify-between md:justify-center gap-2">
          <div className="flex items-center gap-2">
            <Coins className="text-amber-500" size={22} />
            <span className="font-black text-xs text-zinc-500 uppercase">{isAr ? "محفظة التداول الافتراضية" : "Mock Credits Balance"}</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-black text-2xl md:text-3xl text-[#b91c1c]">{credits.toFixed(1)}</span>
            <span className="font-black text-xxs text-zinc-650 font-mono">$WRQ</span>
          </div>
          {positions.length > 0 && (
            <div className="text-[10px] font-bold flex items-center gap-1 text-zinc-600 mt-0.5">
              <span>PnL Real-Time:</span>
              <span className={totalUnrealizedPnL >= 0 ? "text-emerald-600" : "text-red-600"}>
                {totalUnrealizedPnL >= 0 ? "+" : ""}{totalUnrealizedPnL.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Simulator controls and Polymarket mock options (7 columns) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="border-2 border-black bg-white p-5 space-y-5">
            <div className="border-b-2 border-black pb-3 flex items-center gap-2">
              <Compass className="text-[#b91c1c]" size={18} />
              <h3 className="font-sans font-black text-lg text-black">{isAr ? "1. ضبط محددات نموذج المحاكاة" : "1. Adjust Simulation Bounds"}</h3>
            </div>

            {/* Scenario toggle selectors */}
            <div className="space-y-2">
              <label className="block text-xxs font-bold uppercase tracking-wider text-zinc-400">{isAr ? "اختر الحدث الرئيسي المراد محاكاته:" : "Select Geopolitical Scenario Node:"}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PREDEFINED_SCENARIOS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedScenarioId(s.id)}
                    className={`p-3 text-left border text-xs font-mono font-bold transition-all hover:bg-zinc-50 flex items-center justify-between rounded-xs cursor-pointer ${
                      selectedScenarioId === s.id 
                        ? 'border-2 border-black bg-zinc-100 ring-2 ring-black/5' 
                        : 'border-zinc-300 bg-white'
                    }`}
                  >
                    <span className="truncate">{isAr ? s.titleAr : s.titleEn}</span>
                    <span className="font-black text-[10px] text-zinc-500 ml-1.5">%{s.id === selectedScenarioId ? probability : s.defaultProbability}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* If Custom scenario is selected, display titles edit cards */}
            {selectedScenarioId === 'custom' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3 bg-zinc-50 p-3.5 border border-zinc-300"
              >
                <div className="space-y-1">
                  <label className="block text-[10px] font-black tracking-wider uppercase text-zinc-500">{isAr ? "عنوان القضية الافتراضية (بالعربية):" : "Custom Scenario Title (Arabic):"}</label>
                  <input
                    type="text"
                    value={customTitleAr}
                    onChange={(e) => setCustomTitleAr(e.target.value)}
                    className="w-full text-xs font-mono p-2 border border-zinc-300 bg-white focus:outline-none focus:border-black text-black"
                    placeholder="مثال: التدفق المتزامن للطاقة المائية عبر تلال الجولان"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black tracking-wider uppercase text-zinc-500">{isAr ? "عنوان القضية الافتراضية (بالإنجليزية):" : "Custom Scenario Title (English):"}</label>
                  <input
                    type="text"
                    value={customTitleEn}
                    onChange={(e) => setCustomTitleEn(e.target.value)}
                    className="w-full text-xs font-mono p-2 border border-zinc-300 bg-white focus:outline-none focus:border-black text-black"
                    placeholder="e.g. Hydro-electric Integration Across Inland Heights"
                  />
                </div>
              </motion.div>
            )}

            {/* Core Scenario Topic description display */}
            <div className="bg-zinc-50 border border-zinc-350 p-4 rounded-xs">
              <p className="font-mono text-[11px] text-zinc-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                <HelpCircle size={12} />
                {isAr ? "فرضية الرصد الاستقصائي:" : "Forecasting Hypothesis:"}
              </p>
              <p className="font-sans font-bold text-xs md:text-sm text-black leading-relaxed">
                {isAr ? activeScenario.topicAr : activeScenario.topicEn}
              </p>
            </div>

            {/* Simulated Live Variable Slide (doing line simulations) */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold flex items-center gap-1">
                  <Activity size={12} className="text-[#b91c1c] animate-pulse" />
                  {isAr ? "نسبة الاحتمال التنبؤية (تعديل مباشر):" : "Adjust Market Probability (YES Price):"}
                </span>
                <span className="font-black bg-black text-white px-2 py-0.5 rounded-xs font-mono text-xs">
                  {probability}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={probability}
                onChange={(e) => {
                  setProbability(parseInt(e.target.value));
                  if(report) {
                    setReport(null); // Clear active report to signal need to rerun AI, maintaining live feedback concept
                  }
                }}
                className="w-full h-2 rounded-lg bg-zinc-200 accent-black cursor-col-resize text-black"
              />
              <div className="flex justify-between text-[10px] font-mono font-bold text-zinc-400">
                <span>{isAr ? "مستبعد (10%)" : "Highly Unlikely (10%)"}</span>
                <span>{isAr ? "معتدل (50%)" : "Fifty-Fifty (50%)"}</span>
                <span>{isAr ? "شبه محتوم (95%)" : "Near Certainty (95%)"}</span>
              </div>
            </div>

            {/* Dynamic Dropdown variable */}
            <div className="space-y-1.5">
              <label className="block text-xxs font-bold uppercase tracking-wider text-zinc-400">
                🛠️ {isAr ? activeScenario.variableNameAr : activeScenario.variableNameEn}:
              </label>
              <select
                value={selectedVarOption}
                onChange={(e) => setSelectedVarOption(e.target.value)}
                className="w-full p-2 border-2 border-black bg-white focus:outline-none text-xs font-mono font-bold text-black"
              >
                {activeScenario.variableOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Custom Question input */}
            <div className="space-y-1.5">
              <label className="block text-xxs font-bold uppercase tracking-wider text-zinc-400">
                ✍️ {isAr ? "سؤال إضافي لاستخلاص أثر محدد:" : "Additional Specific Question (Dynamic Injection):"}
              </label>
              <textarea
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                rows={2}
                maxLength={200}
                className="w-full p-2.5 border border-zinc-350 font-mono text-xs text-black focus:outline-none focus:border-black"
                placeholder={isAr 
                  ? "مثال: كيف سيؤثر ذلك على السندات اللبنانية المقومة بالدولار؟ وعلاقة التحوط بالأسواق الخليجية؟" 
                  : "e.g. Will this trigger a capital flight to sovereign wealth sanctuaries in Dubai?"
                }
              />
            </div>

            {/* Execute Simulation Action button */}
            <button
              onClick={handleRunSimulation}
              disabled={isLoading}
              className="w-full border-2 border-black bg-black p-3.5 hover:bg-[#b91c1c] text-white font-mono font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-custom disabled:opacity-50"
            >
              <Sparkles size={16} />
              <span>{isAr ? "تفعيل المحاكي وصياغة التقرير" : "Activate Forecaster & Compile Situation Report"}</span>
            </button>
          </div>

          {/* Predict Market Interactive Betting Platform (YES / NO contracts) */}
          <div className="border-2 border-black bg-zinc-50 p-5 space-y-4">
            <div className="border-b-2 border-black pb-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Coins className="text-amber-500 animate-bounce" size={18} />
                <h3 className="font-sans font-black text-lg text-black">{isAr ? "2. استكشاف عقود المضاربة الافتراضية" : "2. Inter-Consensus Betting Ledger"}</h3>
              </div>
              <span className="font-mono text-[9px] font-black uppercase tracking-widest bg-zinc-250 text-black px-1.5 py-0.5 border border-black/20">
                Polymarket Heuristic Rules
              </span>
            </div>

            <p className="font-sans font-medium text-xs text-zinc-650 leading-relaxed">
              {isAr 
                ? 'استخدم احتماليتك كمرشح سعر تداول! يتأرجح سعر عقد YES وعقد NO تلقائياً حسب انزلاق المؤشر بالأعلى. يمكنك شراء YES أو NO وملاحظة تغير عوائد محفظتك مباشرة عند زحزحة ميزان الاحتمال!' 
                : 'Trade prediction contracts dynamically using our settle rates! When you drag the slider above, your YES and NO contract values shift. Test hedging strategies with zero real risk, using mock credits.'
              }
            </p>

            {/* Live Contract Prices */}
            <div className="grid grid-cols-2 gap-4">
              {/* YES contract */}
              <div className="border-2 border-black bg-white p-4 flex flex-col items-center space-y-2 rounded-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 bg-emerald-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded-br-xs font-mono">
                  YES
                </div>
                <span className="font-black text-4xl text-emerald-600 font-mono">
                  ¢{Math.round(yesPrice * 100)}
                </span>
                <span className="font-mono text-xxs text-zinc-400 font-bold uppercase">{isAr ? "سعر العقد نعم" : "Cost per YES Contract"}</span>
                <button
                  onClick={() => executeBuyContract('YES')}
                  className="w-full text-center py-2 bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-800 font-mono text-xxs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 rounded-xs mt-1"
                >
                  <TrendingUp size={11} />
                  <span>{isAr ? "شراء عقد نعم" : "Acquire YES Contracts"}</span>
                </button>
              </div>

              {/* NO contract */}
              <div className="border-2 border-black bg-white p-4 flex flex-col items-center space-y-2 rounded-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded-bl-xs font-mono">
                  NO
                </div>
                <span className="font-black text-4xl text-red-600 font-mono">
                  ¢{Math.round(noPrice * 100)}
                </span>
                <span className="font-mono text-xxs text-zinc-400 font-bold uppercase">{isAr ? "سعر العقد لـ لا" : "Cost per NO Contract"}</span>
                <button
                  onClick={() => executeBuyContract('NO')}
                  className="w-full text-center py-2 bg-red-600 hover:bg-red-700 text-white border border-red-800 font-mono text-xxs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 rounded-xs mt-1"
                >
                  <TrendingDown size={11} />
                  <span>{isAr ? "شراء عقد لا" : "Acquire NO Contracts"}</span>
                </button>
              </div>
            </div>

            {/* Config buy size */}
            <div className="flex items-center justify-between gap-4 py-2 border-t border-b border-zinc-200">
              <span className="font-mono font-bold text-xxs text-zinc-500 uppercase">{isAr ? "الكمية المراد حيازتها:" : "Contracts Transacted Unit Size:"}</span>
              <div className="flex items-center gap-2">
                {[55, 100, 250, 500].map((v) => (
                  <button
                    key={v}
                    onClick={() => setBuyQty(v)}
                    className={`px-2 py-1 font-mono text-xxs font-black border transition-all cursor-pointer ${
                      buyQty === v ? 'bg-black text-white border-black' : 'bg-white hover:bg-zinc-150 border-zinc-300 text-zinc-700'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback system messages */}
            {betFeedback && (
              <div className={`p-3 font-mono text-xxs border rounded-xs ${
                betFeedback.isError ? 'bg-rose-50 border-rose-350 text-rose-800' : 'bg-teal-50 border-teal-350 text-teal-800'
              }`}>
                {betFeedback.message}
              </div>
            )}
          </div>

        </div>

        {/* Right column: Situation Report Display or Loading animation (6 columns) */}
        <div className="lg:col-span-6 space-y-6">
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              /* Loading screen print style */
              <motion.div
                key="loading-board"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="border-2 border-dashed border-red-500 bg-red-50/40 p-12 text-center rounded-xs flex flex-col items-center justify-center min-h-[500px] space-y-6"
              >
                <div className="relative">
                  <RefreshCw className="text-[#b91c1c] animate-spin" size={48} />
                  <Server className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black/80" size={16} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-sans font-black text-xl text-[#b91c1c] uppercase tracking-wide">
                    {isAr ? "جاري تشغيل محاكي الوراق" : "Processing Forecasting Vector"}
                  </h4>
                  <p className="font-mono text-xxs text-zinc-400 font-extrabold tracking-widest">
                    AL-WARRAQ FORECASTING DEPT • DUAL CHANNELS ACTIVE
                  </p>
                </div>

                <div className="max-w-xs font-mono text-xs font-semibold text-zinc-650 min-h-[3rem] flex items-center justify-center">
                  <motion.span
                    key={loadingStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    {isAr ? loadingPhrasesAr[loadingStep] : loadingPhrasesEn[loadingStep]}
                  </motion.span>
                </div>
              </motion.div>
            ) : report ? (
              /* Simulated situation report result of Al-Warraq */
              <motion.div
                key="simulation-report"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-4 border-black bg-white shadow-custom p-6 space-y-6 relative"
                dir={isAr ? 'rtl' : 'ltr'}
              >
                {/* Vintage Header of Syndicate */}
                <div className="border-b-4 border-black pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[#b91c1c] font-mono text-xxs font-black tracking-widest uppercase">
                      <Award size={13} />
                      {isAr ? "صحيفة الوراق - تقدير مواطن ونمذجة" : "Al-Warraq Prediction Bureau"}
                    </div>
                    <h3 className="font-sans font-black text-2xl tracking-tight text-black leading-none uppercase">
                      {isAr ? "البيان الاستقصائي والتقويم الجيوسياسي" : "Strategic Intelligence Report"}
                    </h3>
                  </div>
                  <div className="font-mono text-[9px] font-black text-zinc-500 border border-zinc-300 p-2 leading-tight">
                    <div>DATE ROUTED: {new Date().toLocaleDateString()}</div>
                    <div>SETTLEMENT INDX: {report.stabilityIndex}%</div>
                  </div>
                </div>

                {/* Simulated Arabic Headline on Top */}
                <div className="border-b-2 border-black pb-4">
                  <h1 className="font-sans font-black text-2xl md:text-3xl tracking-tight text-[#b91c1c] text-center leading-normal">
                    « {isAr ? report.headlineAr : report.headlineEn} »
                  </h1>
                  {isAr ? (
                    <div className="font-mono text-xxs text-zinc-400 text-center font-bold mt-1.5 uppercase hover:underline">
                      English: {report.headlineEn}
                    </div>
                  ) : (
                    <div className="font-mono text-xxs text-zinc-400 text-center font-bold mt-1.5 uppercase hover:underline">
                      العربية: {report.headlineAr}
                    </div>
                  )}
                </div>

                {/* Macroeconomic Impact Analysis body */}
                <div className="space-y-4 border-b border-zinc-200 pb-5">
                  <div className="flex items-center gap-1 text-zinc-500 font-mono text-[10px] uppercase font-bold tracking-wider">
                    <Newspaper size={12} className="text-[#b91c1c]" />
                    <span>{isAr ? "تفكيك التحليل وسيناريوهات الاستحواذ:" : "Macroeconomic Simulation Report:"}</span>
                  </div>
                  <p className="font-sans font-medium text-xs md:text-sm text-zinc-800 whitespace-pre-line leading-relaxed">
                    {isAr ? report.analysisAr : report.analysisEn}
                  </p>
                  <p className="font-mono text-[10px] text-zinc-400 border-l-2 border-zinc-350 pl-3 leading-relaxed mt-2 italic">
                    {isAr 
                      ? `ترجمة تقرير الوراق: "${report.analysisEn}"` 
                      : `Al-Warraq Arabic Transcript: "${report.analysisAr}"`
                    }
                  </p>
                </div>

                {/* Indicators grid: Stability gauge & variable outcome */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-zinc-200 pb-5">
                  <div className="bg-zinc-50 p-3 border border-zinc-300 rounded-xs flex flex-col justify-between">
                    <span className="font-mono text-[10px] font-black text-zinc-450 uppercase">{isAr ? "مؤشر حماية السيادة والاستقرار:" : "Regional Stability Index:"}</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-black text-3xl font-mono text-black">{report.stabilityIndex}%</span>
                      <div className="w-full bg-zinc-200 h-2.5 rounded-xs relative overflow-hidden flex">
                        <div 
                          className={`h-full ${report.stabilityIndex > 60 ? 'bg-emerald-500' : report.stabilityIndex > 40 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                          style={{ width: `${report.stabilityIndex}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-50 p-3 border border-zinc-300 rounded-xs flex flex-col justify-between">
                    <span className="font-mono text-[10px] font-black text-zinc-450 uppercase">{isAr ? "المتغير المعالج:" : "Calculated Factor Variable:"}</span>
                    <span className="font-sans font-black text-xs text-[#b91c1c] mt-2 block truncate">
                      {selectedVarOption}
                    </span>
                  </div>
                </div>

                {/* Winners & Losers sectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-zinc-200 pb-5">
                  {/* Winners */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-emerald-600 font-black uppercase tracking-wider flex items-center gap-1">
                      <TrendingUp size={12} />
                      {isAr ? "القطاعات الرابحة بالفحص:" : "Beneficiary Sectors:"}
                    </span>
                    <ul className="space-y-1.5">
                      {(isAr ? report.winnersAr : report.winnersEn).map((item, id) => (
                        <li key={id} className="text-xs font-sans font-bold text-zinc-800 flex items-center gap-1.5">
                          <span className="text-emerald-500 font-mono text-xs">▲</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Losers */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-red-650 font-black uppercase tracking-wider flex items-center gap-1">
                      <TrendingDown size={12} />
                      {isAr ? "القطاعات الخاسرة والمتأثرة سلباً:" : "Devaluated Sectors / Friction:"}
                    </span>
                    <ul className="space-y-1.5">
                      {(isAr ? report.losersAr : report.losersEn).map((item, id) => (
                        <li key={id} className="text-xs font-sans font-bold text-zinc-800 flex items-center gap-1.5">
                          <span className="text-red-500 font-mono text-xs">▼</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technical Arbitrage advise box */}
                <div className="bg-[#b91c1c]/5 p-4 border border-[#b91c1c]/30 rounded-xs relative">
                  <div className="absolute top-0 right-3 transform -translate-y-1/2 bg-[#b91c1c] text-white text-[8px] font-black uppercase px-2 py-0.5 tracking-wider font-mono">
                    {isAr ? "توجيه استثمار التنبؤ" : "Contract Execution Advice"}
                  </div>
                  <p className="font-sans font-black text-xs text-black uppercase tracking-wider mb-1">
                    🎯 {isAr ? "استراتيجية حاملي عقود التحوط:" : "Strategy Guidelines for Contract Holders:"}
                  </p>
                  <p className="font-mono text-xxn md:text-xxs text-zinc-700 leading-relaxed font-bold">
                    {isAr ? report.marketStrategyAr : report.marketStrategyEn}
                  </p>
                </div>

              </motion.div>
            ) : (
              /* Initial state before simulating prompt info card */
              <div className="border-2 border-black bg-zinc-50 p-10 text-center rounded-xs flex flex-col items-center justify-center min-h-[500px] space-y-4">
                <Compass className="text-zinc-350 animate-pulse" size={64} />
                <div className="space-y-1 max-w-sm">
                  <h4 className="font-sans font-black text-base text-black uppercase uppercase">
                    {isAr ? "بانتظار تلقيم محاكي تقدير الموقف" : "Forecasting Console Staged"}
                  </h4>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                    {isAr 
                      ? "اضبط نسبة الاحتمال والمتغيرات في اللوحة اليسارية، ثم انقر على زر تشغيل المحاكي لصياغة أطروحة تقدير الموقف التحليلي لجريدة الوراق استناداً إلى نموذج الذكاء الاصطناعي."
                      : "Configure your target forecasting odds & contextual values in the configuration board on the left, then click simulated execute to trigger Al-Warraq situation report analysis."
                    }
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* User's simulated prediction portfolio (Active transacted ledger positions) */}
          <div className="border-4 border-black bg-white p-5 space-y-4 shadow-custom">
            <div className="border-b-2 border-black pb-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Briefcase className="text-emerald-600" size={17} />
                <h4 className="font-sans font-black text-sm uppercase tracking-wide text-black">
                  {isAr ? "3. كشف حيازات ومركز العقود الافتراضية" : "3. Active Portfolio Ledger"}
                </h4>
              </div>
              {positions.length > 0 && (
                <button
                  onClick={handleResetCredits}
                  className="px-2 py-1 bg-[#b91c1c] text-white hover:bg-black font-mono text-[9px] font-extrabold uppercase border border-black cursor-pointer transition-colors"
                >
                  {isAr ? "تصفير وتصفية الكل" : "Reset Portfolio"}
                </button>
              )}
            </div>

            {positions.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-zinc-200 text-zinc-400 font-mono text-xxs">
                {isAr ? "لا حيازات نشطة حالياً. اشترِ عقود YES أو NO باليسار للتجربة." : "No open consensus positions. Commit YES / NO orders above to populate ledger."}
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-1">
                {positions.map((pos) => {
                  // Determine dynamic live price matching this holding scenario
                  const matchingScan = PREDEFINED_SCENARIOS.find(s => s.id === pos.scenarioId);
                  const scenarioLiveProb = matchingScan ? (pos.scenarioId === selectedScenarioId ? probability : matchingScan.defaultProbability) : 50;
                  const livePrice = pos.type === 'YES' ? (scenarioLiveProb / 100) : (1 - (scenarioLiveProb / 100));

                  // Live value and profit
                  const buyValue = pos.buyPrice * pos.qty;
                  const liveValue = livePrice * pos.qty;
                  const uProfit = liveValue - buyValue;

                  return (
                    <div 
                      key={pos.id} 
                      className="border-2 border-zinc-250 p-3 bg-zinc-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 rounded-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`font-mono text-[9px] font-black px-1.5 py-0.5 border ${
                            pos.type === 'YES' 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                              : 'bg-rose-50 text-rose-800 border-rose-300'
                          }`}>
                            {pos.type}
                          </span>
                          <span className="font-sans font-black text-xs text-black truncate max-w-[180px]">
                            {isAr ? pos.scenarioTitleAr : pos.scenarioTitleEn}
                          </span>
                        </div>
                        <div className="font-mono text-[10px] text-zinc-450 font-bold flex gap-4">
                          <span>QTY: {pos.qty}</span>
                          <span>BUY PRICE: ¢{Math.round(pos.buyPrice * 100)}</span>
                          <span>CURRENT PRICE: ¢{Math.round(livePrice * 100)}</span>
                        </div>
                      </div>

                      {/* Cash value & action */}
                      <div className="flex sm:flex-col items-end justify-between sm:justify-center w-full sm:w-auto gap-2 border-t sm:border-t-0 border-zinc-200 pt-2 sm:pt-0">
                        <div className="text-right">
                          <div className="font-mono text-xs font-black text-black">
                            {liveValue.toFixed(1)} $WRQ
                          </div>
                          <div className={`font-mono text-[9px] font-extrabold ${uProfit >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                            {uProfit >= 0 ? "▲ +" : "▼ "}{uProfit.toFixed(1)} PnL
                          </div>
                        </div>
                        <button
                          onClick={() => handleSellPosition(pos.id)}
                          className="px-2 py-1 bg-black hover:bg-[#b91c1c] text-white font-mono text-[9px] font-black uppercase rounded-xs cursor-pointer transition-colors"
                        >
                          {isAr ? "بيع / تصفية" : "Sell Contract"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
