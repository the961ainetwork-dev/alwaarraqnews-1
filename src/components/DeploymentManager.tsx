import React, { useState, useEffect } from 'react';
import { 
  GitCommit, GitBranch, GitPullRequest, Terminal, ArrowUpRight, 
  Database, UploadCloud, CheckCircle2, Clock, History, FileCode, Play, AlertCircle 
} from 'lucide-react';
import { Article } from '../types';

interface DeploymentManagerProps {
  language: 'ar' | 'en';
  articles: Article[];
}

export interface GitCommitRecord {
  hash: string;
  author: string;
  date: string;
  message: string;
  articlesCount: number;
  filesChanged: number;
  insertions: number;
  deletions: number;
  active: boolean;
}

export default function DeploymentManager({ language, articles }: DeploymentManagerProps) {
  const isAr = language === 'ar';
  
  // State managers
  const [gitHistory, setGitHistory] = useState<GitCommitRecord[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [currentCommitMessage, setCurrentCommitMessage] = useState<string>('');
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<'idle' | 'staging' | 'committing' | 'pushing' | 'complete'>('idle');

  // Track active timers to clear them safely on unmount
  const activeTimersRef = React.useRef<any[]>([]);

  useEffect(() => {
    return () => {
      activeTimersRef.current.forEach((t) => {
        clearTimeout(t);
        clearInterval(t);
      });
    };
  }, []);

  // Load initial history or seed if empty
  useEffect(() => {
    const cachedHistory = localStorage.getItem('alwarraq_git_history');
    if (cachedHistory) {
      try {
        const parsed = JSON.parse(cachedHistory);
        if (Array.isArray(parsed)) {
          setGitHistory(parsed);
        } else {
          seedInitialHistory();
        }
      } catch (err) {
        seedInitialHistory();
      }
    } else {
      seedInitialHistory();
    }
  }, []);

  // Helper to generate preseeded historical records
  const seedInitialHistory = () => {
    const historicalSeeds: GitCommitRecord[] = [
      {
        hash: 'e8fa4d1',
        author: 'maanbarazy@gmail.com',
        date: new Date(Date.now() - 3.6e5 * 36).toLocaleString(isAr ? 'ar-EG' : 'en-US'),
        message: isAr ? 'ترقية فهارس العناوين وتحسين التوطين ثنائي اللغة' : 'Refactor headline indexing & enhance bilingual localization layout',
        articlesCount: articles && articles.length > 0 ? articles.length : 18,
        filesChanged: 4,
        insertions: 112,
        deletions: 14,
        active: false,
      },
      {
        hash: 'b9921fa',
        author: 'maanbarazy@gmail.com',
        date: new Date(Date.now() - 3.6e5 * 24).toLocaleString(isAr ? 'ar-EG' : 'en-US'),
        message: isAr ? 'تأمين طبقة خوارزميات خلاصة التلغراف بالذكاء الاصطناعي' : 'Secure and integrate Telegram-AI news aggregation and parsing layer',
        articlesCount: Math.max(12, (articles ? articles.length : 14) - 2),
        filesChanged: 2,
        insertions: 54,
        deletions: 2,
        active: false,
      },
      {
        hash: 'c8c9a3d',
        author: 'maanbarazy@gmail.com',
        date: new Date(Date.now() - 3.6e5 * 10).toLocaleString(isAr ? 'ar-EG' : 'en-US'),
        message: isAr ? 'تحديث الفهارس الاقتصادية ومؤشرات أسواق المال العربية واللبنانية' : 'Update Lebanese economic indicators and regional Arabian capital indices',
        articlesCount: Math.max(15, (articles ? articles.length : 16) - 1),
        filesChanged: 3,
        insertions: 89,
        deletions: 8,
        active: false,
      },
    ];

    localStorage.setItem('alwarraq_git_history', JSON.stringify(historicalSeeds));
    setGitHistory(historicalSeeds);
  };

  // Obtain current logged in user metadata
  const getCurrentUserIdentity = (): string => {
    const rawUser = localStorage.getItem('alwarraq_current_user');
    if (rawUser) {
      try {
        const u = JSON.parse(rawUser);
        if (u && typeof u === 'object' && u.email) return u.email;
      } catch (e) {}
    }
    return 'maanbarazy@gmail.com';
  };

  // Perform Simulated Git push
  const handleSimulateDeploy = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSuccessBanner(null);
    setActiveStep(0);
    setProgress(0);
    setCurrentStage('staging');

    const userEmail = getCurrentUserIdentity();
    const totalCount = articles.length;
    
    // Choose custom descriptive commit message or fallback based on current articles state
    const commitMsg = currentCommitMessage.trim() || (isAr 
      ? `مزامنة وتدقيق أرشيف الأخبار المحلية (${totalCount} مادة صحفية)` 
      : `Sync and validate local editorial feed (${totalCount} articles processed)`);

    setTerminalLogs([
      `$ Initializing sandboxed local tracking channel...`,
      `[STAGING 0%] -> Initialized build context on branch 'main'.`,
      `$ git status --short`
    ]);

    // Track simulated progress smoothly using an interval
    const duration = 5400; // total duration
    const intervalTime = 100;
    let elapsed = 0;

    const progressInterval = setInterval(() => {
      elapsed += intervalTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 99);
      setProgress(pct);

      // Transition stages based on percentage
      if (pct >= 75) {
        setCurrentStage('pushing');
      } else if (pct >= 40) {
        setCurrentStage('committing');
      } else {
        setCurrentStage('staging');
      }
    }, intervalTime);
    activeTimersRef.current.push(progressInterval);

    // Simulated terminal steps with realistic delays
    const steps = [
      {
        text: () => {
          const changedCount = Math.floor(Math.random() * 3) + 1;
          return isAr 
            ? `[STAGING 15%] M  src/components/ArticleViewer.tsx\n[STAGING 22%] M  localStorage/alwarraq_all_articles.json (${changedCount} items modified offline)`
            : `[STAGING 15%] M  src/components/ArticleViewer.tsx\n[STAGING 22%] M  localStorage/alwarraq_all_articles.json (${changedCount} items modified offline)`;
        },
        delay: 600,
      },
      {
        text: () => `$ git add .`,
        delay: 1100,
      },
      {
        text: () => isAr 
          ? `[STAGING 35%] ✓ تم تجهيز وإضافة التعديلات والملفات بنجاح إلى مؤشر التعقب.` 
          : `[STAGING 35%] ✓ Successfully staged all loose assets and localStorage payloads.`,
        delay: 1600,
      },
      {
        text: () => `[COMMITTING 45%] -> Initiating seal cryptographic signature...\n$ git commit -m "${commitMsg}"`,
        delay: 2200,
      },
      {
        text: () => {
          const hash = Math.random().toString(16).substring(2, 9);
          const changed = Math.floor(Math.random() * 2) + 1;
          const ins = Math.floor(Math.random() * 35) + 5;
          const del = Math.floor(Math.random() * 8) + 1;
          return `[COMMITTING 60%] [main ${hash}] commit: "${commitMsg}"\n[COMMITTING 65%]  ${changed} files changed, ${ins} insertions(+), ${del} deletions(-)`;
        },
        delay: 2900,
      },
      {
        text: () => `[PUSHING 75%] -> Preparing secure transfer capsule...\n$ git push origin main`,
        delay: 3600,
      },
      {
        text: () => isAr 
          ? `[PUSHING 85%] → جاري الإرسال والاتصال بالخادم السحابي الآمن github.com/maanbarazy/...` 
          : `[PUSHING 85%] → Uploading pack stream via SSH capsule to github.com/maanbarazy/al-warraq-platform.git`,
        delay: 4300,
      },
      {
        text: () => {
          const currentHash = Math.random().toString(16).substring(2, 9);
          return `[PUSHING 95%] ✓ Authentication handshake verified.\n[PUSHING 98%] ⚡ Upstream synchronizing complete:\n   bc581d0..${currentHash}  main -> main\n[PUSHING 100%] ✓ Sync completed cleanly with live production channel (SSL Authorized).`;
        },
        delay: 4950,
      }
    ];

    // Trigger step callbacks sequentially
    steps.forEach((step, idx) => {
      const t = setTimeout(() => {
        setTerminalLogs(prev => [...prev, step.text()]);
        setActiveStep(idx + 1);
      }, step.delay);
      activeTimersRef.current.push(t);
    });

    // Final action: update list, store in localStorage, and reset
    const finalT = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setCurrentStage('complete');

      const generatedHash = Math.random().toString(16).substring(2, 9);
      const isCorrectAr = isAr;
      const finalRecord: GitCommitRecord = {
        hash: generatedHash,
        author: userEmail,
        date: new Date().toLocaleString(isCorrectAr ? 'ar-EG' : 'en-US'),
        message: commitMsg,
        articlesCount: totalCount,
        filesChanged: Math.floor(Math.random() * 2) + 1,
        insertions: Math.floor(Math.random() * 45) + 10,
        deletions: Math.floor(Math.random() * 10) + 1,
        active: true,
      };

      // Set all other history records active status to false
      setGitHistory(prev => {
        const next = [finalRecord, ...prev.map(r => ({ ...r, active: false }))];
        localStorage.setItem('alwarraq_git_history', JSON.stringify(next));
        return next;
      });

      setSuccessBanner(isAr 
        ? `✓ تم حفظ الرمز (${generatedHash}) ونشر التعديلات إلى البيئة الإنتاجية المستهدفة بنجاح!` 
        : `✓ Successfully logged commit ${generatedHash} and pushed live to the production channel (100% complete)!`);
      
      setIsSimulating(false);
      setCurrentCommitMessage('');
      setActiveStep(-1);
    }, 5500);
    activeTimersRef.current.push(finalT);
  };

  // Reset the simulated history to original seeds
  const handleResetHistory = () => {
    if (window.confirm(isAr 
      ? "هل تود استعادة السجل الابتدائي الافتراضي وإعادة تهيئة مستودع جيت المحاكي؟" 
      : "Reset the simulated repository history to default seed values?")) {
      seedInitialHistory();
      setTerminalLogs([]);
      setSuccessBanner(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="border-t-2 border-black border-dashed pt-5 mt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
          <div>
            <h4 className="font-mono text-xs font-black uppercase text-zinc-500 tracking-wider flex items-center gap-1.5">
              <GitBranch size={13} className="text-[#b91c1c]" />
              {isAr ? 'قسم إدارة النشر والتحكم بالمستندات (جيت)' : 'LOCAL COMPONENT: GIT METADATA ENVELOPE'}
            </h4>
            <h3 className="font-sans font-black text-base uppercase mt-1">
              {isAr ? 'شاشة مراقبة الاتساق السحابي للمقالات' : 'Simulated Repository & Deployment Manager'}
            </h3>
          </div>
          <button 
            type="button"
            onClick={handleResetHistory}
            className="text-[10px] font-mono font-bold text-zinc-500 hover:text-black border-b border-zinc-300 hover:border-black py-0.5 cursor-pointer uppercase transition-colors"
          >
            {isAr ? 'إعادة ضبط السجل' : 'Reset Git Seeds'}
          </button>
        </div>
        <p className="text-[11px] text-zinc-650 leading-relaxed max-w-3xl">
          {isAr 
            ? 'يقوم هذا المكون الفرعي بقراءة حالة وتعداد المواد الصحفية المحلية المخزنة بالمتصفح ويقيدها في سجل مستندات جيت محلي مُسجل كلياً في قاعدة الإعدادات لضمان جودة الأرشفة.'
            : 'Envelopes the client-side editorial state by parsing saved articles count within the sandbox, then simulating production commit trees. Preserved locally across reboots.'}
        </p>
      </div>

      {successBanner && (
        <div className="bg-emerald-50 border border-emerald-600 p-3 text-xs font-semibold text-emerald-800 flex items-start gap-2 animate-fade-in">
          <CheckCircle2 size={15} className="mt-0.5 text-emerald-600 shrink-0" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Control Actions & Push Trigger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Run Deploy Terminal console (7/12) */}
        <div className="lg:col-span-7 border-2 border-black p-4 bg-zinc-50 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
              <span className="font-mono text-xxs font-black text-zinc-700 uppercase flex items-center gap-1.5">
                <Terminal size={12} className="text-[#b91c1c]" />
                {isAr ? 'تلقين أمر المزامنة المحلي' : 'Simulated Shell Launcher'}
              </span>
              <span className="font-mono text-[9px] bg-[#b91c1c] text-white px-1.5 py-0.5 font-bold uppercase rounded-none select-none">
                {isAr ? 'آمن بنسبة ١٠٠٪' : 'LOCAL WORKSPACE'}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
                  {isAr ? 'رسالة التعهد والتبليغ (Commit Message)' : 'Custom Commit Message'}
                </label>
                <input
                  type="text"
                  placeholder={isAr ? `مثال: تحديث عاجل لمقالات البث، المقالات الإجمالية: ${articles.length}` : `e.g. Publish geopolitical dispatches. Current: ${articles.length} news`}
                  value={currentCommitMessage}
                  onChange={(e) => setCurrentCommitMessage(e.target.value)}
                  disabled={isSimulating}
                  className="w-full text-xs p-2.5 border border-zinc-300 font-mono focus:border-black outline-none bg-white font-bold placeholder-zinc-450"
                />
              </div>

              {/* Quick Metadata parameters */}
              <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-zinc-650 bg-white p-2 border border-zinc-200 rounded-sm">
                <div className="text-center border-r border-zinc-150 py-1">
                  <span className="text-[9px] font-bold text-zinc-400 block uppercase">{isAr ? 'عدد المقالات' : 'Total Articles'}</span>
                  <span className="font-black text-black text-xs md:text-sm">{articles.length}</span>
                </div>
                <div className="text-center border-r border-zinc-150 py-1">
                  <span className="text-[9px] font-bold text-zinc-400 block uppercase">{isAr ? 'قنوات المقال' : 'Target Branch'}</span>
                  <span className="font-black text-[#b91c1c] text-xs">origin/main</span>
                </div>
                <div className="text-center py-1">
                  <span className="text-[9px] font-bold text-zinc-400 block uppercase">{isAr ? 'المطور المعتمد' : 'Lead Author'}</span>
                  <span className="font-bold text-zinc-800 text-[9px] truncate block max-w-[80px] mx-auto" title={getCurrentUserIdentity()}>
                    {getCurrentUserIdentity().split('@')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Real-time progress bar and step checkpoints */}
            {isSimulating && (
              <div className="bg-zinc-100 border border-zinc-300 p-3 space-y-2.5 rounded-xs animate-fade-in font-mono text-[10px]">
                <div className="flex items-center justify-between font-black uppercase text-zinc-700">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="text-[#b91c1c] animate-spin shrink-0" />
                    <span>{isAr ? 'حالة البث المباشر:' : 'DEPLOYMENT STATUS:'}</span>
                    <span className="text-white bg-[#b91c1c] text-[9.5px] px-1.5 py-0.5 rounded-none font-black select-none tracking-wider">
                      {currentStage.toUpperCase()}
                    </span>
                  </span>
                  <span className="text-sm font-black text-black">
                    {progress}%
                  </span>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-zinc-200 border border-zinc-400 h-3.5 relative overflow-hidden rounded-xs">
                  <div 
                    className="bg-[#b91c1c] h-full transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Decorative stripe backdrop */}
                  <div 
                    className="absolute inset-0 bg-repeat-x opacity-10" 
                    style={{ 
                      backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', 
                      backgroundSize: '10px 10px' 
                    }} 
                  />
                </div>

                {/* Stage Checkpoints Grid */}
                <div className="grid grid-cols-3 gap-1.5 text-center text-[9px]">
                  {/* Stage 1: Staging */}
                  <div className={`p-1.5 border transition-all ${
                    currentStage === 'staging' 
                      ? 'border-[#b91c1c] bg-red-50 text-[#b91c1c] font-black' 
                      : progress >= 40 
                        ? 'border-zinc-300 text-zinc-400 line-through bg-zinc-50' 
                        : 'border-zinc-200 text-zinc-400 bg-white'
                  }`}>
                    <div className="font-extrabold truncate">{isAr ? '١. تجهيز' : '1. STAGING'}</div>
                    <div className="scale-90 opacity-75">0% - 39%</div>
                  </div>

                  {/* Stage 2: Committing */}
                  <div className={`p-1.5 border transition-all ${
                    currentStage === 'committing' 
                      ? 'border-[#b91c1c] bg-red-50 text-[#b91c1c] font-black' 
                      : progress >= 75 
                        ? 'border-zinc-300 text-zinc-400 line-through bg-zinc-50' 
                        : 'border-zinc-200 text-zinc-400 bg-white'
                  }`}>
                    <div className="font-extrabold truncate">{isAr ? '٢. توثيق وثاق' : '2. COMMITTING'}</div>
                    <div className="scale-90 opacity-75">40% - 74%</div>
                  </div>

                  {/* Stage 3: Pushing */}
                  <div className={`p-1.5 border transition-all ${
                    currentStage === 'pushing' 
                      ? 'border-[#b91c1c] bg-red-50 text-[#b91c1c] font-black' 
                      : progress === 100 
                        ? 'border-zinc-300 text-zinc-400 bg-zinc-50' 
                        : 'border-zinc-200 text-zinc-400 bg-white'
                  }`}>
                    <div className="font-extrabold truncate">{isAr ? '٣. بث سحابي' : '3. PUSHING'}</div>
                    <div className="scale-90 opacity-75">75% - 100%</div>
                  </div>
                </div>
              </div>
            )}

            {/* Launch action button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleSimulateDeploy}
                disabled={isSimulating}
                className={`w-full py-3.5 px-5 font-sans font-black text-xs uppercase tracking-wider border-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  isSimulating 
                    ? 'bg-zinc-100 border-zinc-300 text-zinc-400 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-neutral-800 border-black shadow-custom hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]'
                }`}
              >
                {isSimulating ? (
                  <>
                    <UploadCloud size={14} className="animate-bounce" />
                    <span>
                      {isAr 
                        ? `جاري النشر... ${progress}%` 
                        : `Deploying... ${progress}%`}
                    </span>
                  </>
                ) : (
                  <>
                    <Play size={14} className="text-[#b91c1c]" />
                    <span>{isAr ? 'تنفيذ بروتوكول جيت السحابي وتحديث الأرشيف' : 'Stage, Commit & Push Local Articles'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Terminal Console Stream Monitor */}
          <div className="mt-4 border border-zinc-300 bg-black text-emerald-400 font-mono text-[9.5px] p-3 rounded-none overflow-y-auto max-h-[170px] flex-grow leading-relaxed">
            <div className="text-zinc-500 mb-1 border-b border-zinc-850 pb-1 flex justify-between items-center select-none">
              <span>{isAr ? 'شاشة الإطلاق وعمليات جيت المحاكاة:' : 'LIVE VIRTUAL TERMINAL BUFFER:'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            </div>
            {terminalLogs.length === 0 ? (
              <span className="text-zinc-650 italic">
                {isAr 
                  ? '$ موجه القذيفة خامل حالياً. قم ببرقية ونشر المزامنة لبدء بث التعليمات البرمجية.' 
                  : '$ Shell terminal dormant. Run the Stage & Push task trigger to trace output streams.'}
              </span>
            ) : (
              <div className="space-y-1">
                {terminalLogs.map((log, index) => {
                  const isCmd = log.startsWith('$');
                  return (
                    <div key={index} className={isCmd ? 'text-zinc-300 font-bold' : 'text-emerald-400 whitespace-pre-wrap'}>
                      {log}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Repository History Record Tracker (5/12) */}
        <div className="lg:col-span-5 border-2 border-black p-4 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-zinc-200">
              <History size={13} className="text-[#b91c1c]" />
              <span className="font-mono text-xxs font-black text-zinc-700 uppercase">
                {isAr ? 'سجل مستودع التحليلات والالتزامات' : 'Git Repository History Tree'}
              </span>
            </div>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {gitHistory.length === 0 ? (
                <div className="text-center text-zinc-400 py-6 font-mono text-xxs">
                  {isAr ? 'سجل الالتزامات فارغ.' : 'Commit history tree is empty.'}
                </div>
              ) : (
                gitHistory.map((commit, idx) => (
                  <div 
                    key={commit.hash} 
                    className={`p-2.5 border transition-all ${
                      commit.active 
                        ? 'border-[#b91c1c] bg-red-50/40 shadow-xs' 
                        : 'border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1 font-mono text-[9px] text-zinc-500">
                      <span className="font-bold flex items-center gap-1">
                        <GitCommit size={11} className={commit.active ? "text-[#b91c1c]" : "text-zinc-400"} />
                        <span className={`px-1.5 py-px font-extrabold ${commit.active ? 'bg-red-100 text-[#b91c1c]' : 'bg-zinc-200 text-zinc-700'}`}>
                          {commit.hash}
                        </span>
                        {commit.active && (
                          <span className="animate-pulse px-1 text-[8px] tracking-wide font-black bg-emerald-600 text-white uppercase rounded-none select-none">
                            {isAr ? 'الإنتاج النشط' : 'HEAD'}
                          </span>
                        )}
                      </span>
                      <span>{commit.date}</span>
                    </div>

                    <h5 className="font-sans font-bold text-[11px] text-zinc-900 mt-1.5 leading-snug">
                      {commit.message}
                    </h5>

                    <div className="grid grid-cols-2 gap-1.5 pt-2 mt-2 border-t border-zinc-150/60 font-mono text-[9px] text-zinc-500">
                      <div>
                        <span className="text-zinc-400 block">{isAr ? 'الصحفي المعتمد:' : 'Author:'}</span>
                        <span className="font-semibold text-zinc-700 truncate block max-w-[120px]">{commit.author}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-zinc-400 block">{isAr ? 'الإحصائيات الفرعية:' : 'Silo Delta Changes:'}</span>
                        <span className="font-semibold text-zinc-700">
                          {commit.filesChanged}chg / <span className="text-emerald-600">+{commit.insertions}</span> / <span className="text-red-500">-{commit.deletions}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-200">
            <div className="flex items-start gap-1.5 font-mono text-[9.5px] text-zinc-500 bg-zinc-50 p-2 rounded-xs">
              <Database size={11} className="shrink-0 mt-0.5 text-zinc-500" />
              <span>
                {isAr 
                  ? 'يتم تخزين جميع الالتزامات والمستندات المحاكية بنجاح تزامناً مع الفهرسة السحابية داخل المتصفح.'
                  : 'All simulated commits and staging indexes map dynamically with localStorage indicators.'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
