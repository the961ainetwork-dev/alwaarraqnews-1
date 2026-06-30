import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Article } from '../types';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Flame, 
  Tv, Film, Sparkles, ChevronRight, ChevronLeft, Plus,
  Shield, Check, ArrowRight, Video, Languages, Radio,
  BookOpen, Clock, Eye, AlertTriangle, ListMusic, Volume1
} from 'lucide-react';

interface AlWarraqVideosProps {
  language: 'ar' | 'en';
  allArticles: Article[];
  currentUser?: { role: string; email: string } | null;
}

interface VideoBrief {
  id: string;
  articleId?: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  views: number;
  duration: string;
  category: string;
  scenes: {
    titleAr: string;
    titleEn: string;
    textAr: string;
    textEn: string;
    highlightAr: string;
    highlightEn: string;
    visualType: 'map' | 'documents' | 'courtroom' | 'diplomacy' | 'radar';
  }[];
}

export default function AlWarraqVideos({ language, allArticles, currentUser }: AlWarraqVideosProps) {
  const isAr = language === 'ar';
  const isAdmin = currentUser?.role === 'admin';

  // State to manage list of videos (persisted in localStorage)
  const [videos, setVideos] = useState<VideoBrief[]>(() => {
    const cached = localStorage.getItem('alwarraq_videos');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }

    // Default Pilot Video pre-seeded as requested
    const pilotVideo: VideoBrief = {
      id: 'video-pilot-secret-annex',
      articleId: 'excl-leb-isr-secret-annex',
      titleAr: 'الإطار اللبناني-الإسرائيلي بوساطة أمريكية: الملاحق السرية وسؤال الاستسلام القانوني',
      titleEn: 'US-Mediated Lebanon-Israel Security Framework: The Secret Annexes and the Legal Surrender Question',
      descriptionAr: 'تحقيق استقصائي يكشف خفايا الملحق الأمني السري والتبعات القانونية للمادة 13 من الاتفاق الإطاري اللبناني الإسرائيلي.',
      descriptionEn: 'An exclusive video briefing on the unreleased security annex of the US-brokered deal, exposing Israeli operational freedom and Lebanon\'s legal retreat.',
      views: 12501,
      duration: '4:15',
      category: 'Exclusives',
      scenes: [
        {
          titleAr: 'مقدمة: العمود الفقري التنفيذي',
          titleEn: 'Chapter I: The Executive Backbone',
          textAr: 'على الرغم من نشر الاتفاق الإطاري الأساسي المكون من 14 نقطة بين لبنان وإسرائيل، إلا أن التنفيذ الفعلي يعتمد بشكل كبير على ملحق أمني منفصل وشديد الحساسية طلبت الحكومة اللبنانية حظره عن النشر لحجب تنازلاته الميدانية والقانونية الصادمة.',
          textEn: 'While the 14-point framework is public, its actual execution relies on a highly sensitive, unreleased Security Annex that Beirut requested to keep secret, raising deep concerns over Israeli operational freedom.',
          highlightAr: 'الحكومة اللبنانية طلبت رسمياً حجب المستند عن النشر لتفادي الحرج السياسي.',
          highlightEn: 'The Lebanese government formally requested the US to keep this document confidential.',
          visualType: 'radar'
        },
        {
          titleAr: 'خفايا الملحق الأمني السري',
          titleEn: 'Chapter II: Secrets of the Security Annex',
          textAr: 'يتضمن الملحق السري شروطاً ميدانية قاسية: أولها تشريع حرية العمل العسكري الإسرائيلي ضد أي تهديدات في جنوب لبنان، وثانيها ربط الانسحاب بنزع سلاح حزب الله، وثالثها إنشاء مناطق أمنية تجريبية بموافقة إسرائيلية.',
          textEn: 'The secret annex outlines severe field conditions: codifying Israeli operational freedom, keeping withdrawal timelines conditional on disarmament, and establishing experimental pilot zones supervised by international bodies.',
          highlightAr: 'تشريع حرية العمل العسكري الإسرائيلي وإقامة مناطق أمنية تجريبية.',
          highlightEn: 'Conditional Israeli withdrawals linked directly to Hezbollah disarmament.',
          visualType: 'map'
        },
        {
          titleAr: 'التبعات القانونية والمادة 13',
          titleEn: 'Chapter III: Legal Surrender & Article 13',
          textAr: 'تنص المادة 13 على وقف كافة التدابير والشكاوى في المحافل السياسية والقانونية الدولية. ويحذر خبراء قانونيون من أن هذا يمثل تنازلاً لبنانياً صادماً عن ملاحقة إسرائيل في الجنايات الدولية أو العدل الدولية.',
          textEn: 'Article 13 stipulates that both parties must cease all hostile actions in international political and legal forums. Legal experts warn Beirut is abandoning its sovereignty and right to prosecute war crimes.',
          highlightAr: 'لبنان يلتزم بوقف الشكاوى والمقاضاة الدولية أمام محكمة العدل والجنائية الدولية.',
          highlightEn: 'Article 13 effectively blocks legal pursuits in international courts.',
          visualType: 'courtroom'
        },
        {
          titleAr: 'مفارقة القيادة ومسار الأفراد',
          titleEn: 'Chapter IV: Leadership Paradox & Alternatives',
          textAr: 'تأتي هذه التنازلات تحت قيادة رئيس الوزراء نواف سلام، الرئيس السابق لمحكمة العدل الدولية. وبينما يتم تقييد الدولة، يبقى مسار "الولاية القضائية العالمية" متاحاً للأفراد والضحايا لرفع دعاوى أمام محاكم أجنبية.',
          textEn: 'These concessions occur under PM Nawaf Salam, former President of the ICJ. While the state is legally bound and restricted, universal jurisdiction remains the only channel left for individual victims.',
          highlightAr: 'نواف سلام ترأس الرأي الاستشاري ضد الاحتلال، ولبنان الآن يتنازل عن المساءلة.',
          highlightEn: 'Universal jurisdiction is the remaining complex path for individual lawsuits.',
          visualType: 'diplomacy'
        }
      ]
    };

    return [pilotVideo];
  });

  // Current active video
  const [selectedVideoId, setSelectedVideoId] = useState<string>('video-pilot-secret-annex');
  const activeVideo = useMemo(() => {
    return videos.find(v => v.id === selectedVideoId) || videos[0];
  }, [videos, selectedVideoId]);

  // Player controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [narrationSpeed, setNarrationSpeed] = useState<number>(1.1); // default slightly faster for energetic news vibe
  const [videoStyleMode, setVideoStyleMode] = useState<'cinematic' | 'terminal' | 'broadcast'>('broadcast'); // default to broadcast for TV news style
  const [layoutMode, setLayoutMode] = useState<'split' | 'anchor' | 'dossier'>('split'); // new layout view controls

  // Subtitles / Voiceover Text Speech API Ref
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<any>(null);

  // Play synthetic news teletype sound effect on event
  const playNewsBeep = () => {
    if (typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Dramatic double synth blips
      const scheduleBlip = (timeOffset: number, freq: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + timeOffset);
        osc.stop(ctx.currentTime + timeOffset + dur);
      };

      scheduleBlip(0, 987.77, 0.12); // B5
      scheduleBlip(0.1, 1318.51, 0.22); // E6
    } catch (e) {}
  };

  // Stop narration on unmount or video change
  useEffect(() => {
    stopNarration();
    return () => {
      stopNarration();
    };
  }, [selectedVideoId]);

  // Sync scene change with text narration if playing
  useEffect(() => {
    if (isPlaying) {
      playSceneNarration();
      playNewsBeep();
    } else {
      stopNarration();
    }
  }, [currentSceneIndex, isPlaying]);

  // Scene transition timer simulation (for progress bar & auto-advancing scenes)
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (isPlaying) {
      const durationMs = 13000 / narrationSpeed; // 13 seconds per scene baseline
      const intervalMs = 100;
      let elapsed = 0;

      timerRef.current = setInterval(() => {
        elapsed += intervalMs;
        const currentProgress = (elapsed / durationMs) * 100;

        if (currentProgress >= 100) {
          setProgress(100);
          clearInterval(timerRef.current);
          
          // Auto advance to next scene
          if (currentSceneIndex < activeVideo.scenes.length - 1) {
            setTimeout(() => {
              setCurrentSceneIndex(prev => prev + 1);
              setProgress(0);
            }, 300);
          } else {
            setIsPlaying(false);
            setProgress(0);
            setCurrentSceneIndex(0);
          }
        } else {
          setProgress(currentProgress);
        }
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSceneIndex, selectedVideoId, narrationSpeed, activeVideo]);

  // Web Speech API Voiceover Player with highly energetic News Anchor tone/pacing
  const playSceneNarration = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Cancel current active voiceovers

    if (isMuted) return;

    const activeScene = activeVideo.scenes[currentSceneIndex];
    let spokenText = '';

    // Transform text to be highly energetic news anchor style with dramatic headers & pacing
    if (isAr) {
      const introsAr = [
        "عاجل من تلفزيون الورّاق نيوز! ",
        "استمعوا إلى هذا الخبر العاجل من شبكتنا الاستقصائية! ",
        "هنا الورّاق، إليكم تفاصيل الملحق الأمني السري! ",
        "تطورات متسارعة، نقرأ لكم من الملف الخاص! "
      ];
      const intro = introsAr[currentSceneIndex % introsAr.length];
      spokenText = `${intro} ${activeScene.textAr}. تابعوا التغطية المستمرة.`;
    } else {
      const introsEn = [
        "Breaking report from the Al-Warraq international news desk! ",
        "Developing story, special military intelligence briefing! ",
        "An exclusive Al-Warraq investigative video bulletin! ",
        "Stand by for high-level diplomatic analysis! "
      ];
      const intro = introsEn[currentSceneIndex % introsEn.length];
      spokenText = `${intro} ${activeScene.textEn}. Stay with us for continuous updates.`;
    }

    const utterance = new SpeechSynthesisUtterance(spokenText);

    // Try to match best voice based on language
    const voices = window.speechSynthesis.getVoices();
    if (isAr) {
      const arVoice = voices.find(v => v.lang.startsWith('ar')) || voices.find(v => v.name.toLowerCase().includes('arabic'));
      if (arVoice) utterance.voice = arVoice;
    } else {
      const enVoice = voices.find(v => v.lang.startsWith('en')) || voices.find(v => v.name.toLowerCase().includes('english'));
      if (enVoice) utterance.voice = enVoice;
    }

    // Set high-energy variables
    utterance.rate = narrationSpeed * 1.05; // speed multiplier for high dynamic pacing
    utterance.pitch = 1.05; // slightly higher pitch for enthusiastic broadcast delivery style
    utteranceRef.current = utterance;

    window.speechSynthesis.speak(utterance);
  };

  const stopNarration = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // Toggle Mute
  const handleToggleMute = () => {
    setIsMuted(prev => !prev);
    // Restart voiceover on next render if playing
    setTimeout(() => {
      if (isPlaying) {
        playSceneNarration();
      }
    }, 50);
  };

  // Skip Scene
  const handleNextScene = () => {
    if (currentSceneIndex < activeVideo.scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
      setProgress(0);
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
      setProgress(0);
    }
  };

  // Appoint Story to Video admin state
  const [appointArticleId, setAppointArticleId] = useState<string>('');
  const [appointSuccess, setAppointSuccess] = useState(false);

  // Convert/Appoint dynamic article handler
  const handleAppointArticleToVideo = (artId: string) => {
    const article = allArticles.find(a => a.id === artId);
    if (!article) return;

    // Construct scenes based on article content
    const rawParagraphsAr = article.contentAr.split('\n').filter(p => p.trim().length > 30);
    const rawParagraphsEn = article.contentEn.split('\n').filter(p => p.trim().length > 30);

    const sceneCount = Math.min(4, Math.max(2, rawParagraphsAr.length));
    const generatedScenes = [];

    const visualPool: ('map' | 'documents' | 'courtroom' | 'diplomacy' | 'radar')[] = ['radar', 'map', 'documents', 'diplomacy', 'courtroom'];

    for (let i = 0; i < sceneCount; i++) {
      const pAr = rawParagraphsAr[i] || article.summaryAr;
      const pEn = rawParagraphsEn[i] || article.summaryEn;

      generatedScenes.push({
        titleAr: `${isAr ? 'الفصل' : 'Chapter'} ${i + 1}: ${isAr ? 'تحليل مباشر' : 'Live Assessment'}`,
        titleEn: `Chapter ${i + 1}: Strategic Live Report`,
        textAr: pAr.slice(0, 185) + '...',
        textEn: pEn.slice(0, 185) + '...',
        highlightAr: pAr.slice(0, 70) + '...',
        highlightEn: pEn.slice(0, 70) + '...',
        visualType: visualPool[i % visualPool.length]
      });
    }

    const newVideo: VideoBrief = {
      id: `video-${article.id}`,
      articleId: article.id,
      titleAr: article.titleAr,
      titleEn: article.titleEn,
      descriptionAr: article.summaryAr,
      descriptionEn: article.summaryEn,
      views: article.views || 4200,
      duration: `${sceneCount}:00`,
      category: article.category.toUpperCase(),
      scenes: generatedScenes
    };

    const updated = [newVideo, ...videos.filter(v => v.id !== newVideo.id)];
    setVideos(updated);
    localStorage.setItem('alwarraq_videos', JSON.stringify(updated));
    setSelectedVideoId(newVideo.id);
    setCurrentSceneIndex(0);
    setProgress(0);
    setIsPlaying(false);
    
    setAppointSuccess(true);
    setTimeout(() => setAppointSuccess(false), 3000);
  };

  // Delete an appointed video
  const handleDeleteVideo = (vId: string) => {
    if (vId === 'video-pilot-secret-annex') return; // protect pilot
    const updated = videos.filter(v => v.id !== vId);
    setVideos(updated);
    localStorage.setItem('alwarraq_videos', JSON.stringify(updated));
    if (selectedVideoId === vId) {
      setSelectedVideoId('video-pilot-secret-annex');
      setCurrentSceneIndex(0);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  // Render Visual Background based on VisualType of Scene
  const activeScene = activeVideo.scenes[currentSceneIndex] || activeVideo.scenes[0];

  return (
    <div className="space-y-6 animate-fade-in pb-12 select-text" id="alwarraq-videos-workspace">
      
      {/* Title Header */}
      <div className="border-b-4 border-black pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
        <div>
          <span className="bg-[#b91c1c] text-white px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase flex items-center gap-1 w-max rounded-sm shadow-[1px_1px_0_0_rgba(0,0,0,1)]">
            <Radio size={10} className="text-white animate-pulse" />
            {isAr ? 'تغطية تلفزيونية مباشرة بالذكاء التوليدي' : 'GEN-AI LIVE VIDEO BROADCAST STATIONS'}
          </span>
          <h2 className="font-sans font-black text-2xl uppercase text-zinc-950 mt-1 flex items-center gap-2">
            <Tv size={24} className="text-[#b91c1c]" />
            {isAr ? 'تلفزيون الورّاق التفاعلي' : 'Al-Warraq Interactive TV'}
          </h2>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            {isAr 
              ? 'توليد نشرات أخبار سينمائية متكاملة بصوت مذيع ومقاطع رسومية حية وإحصاءات متحركة بدلاً من مجرد تسجيل صوتي.' 
              : 'Compiling high-energy television news broadcasts with live anchor simulation, ticker marquees, and dynamic intel streams.'}
          </p>
        </div>

        {/* Video Screen Layout Mode Switcher */}
        <div className="flex bg-white border-2 border-black p-0.5 rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-[9px] font-mono font-bold uppercase shrink-0">
          <button
            type="button"
            onClick={() => setLayoutMode('split')}
            className={`px-2 py-1 rounded transition-colors ${layoutMode === 'split' ? 'bg-[#b91c1c] text-white' : 'text-zinc-600'}`}
          >
            {isAr ? 'شاشة منقسمة' : 'Split Feed'}
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode('anchor')}
            className={`px-2 py-1 rounded transition-colors ${layoutMode === 'anchor' ? 'bg-[#b91c1c] text-white' : 'text-zinc-600'}`}
          >
            {isAr ? 'استوديو الأخبار' : 'Anchor Studio'}
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode('dossier')}
            className={`px-2 py-1 rounded transition-colors ${layoutMode === 'dossier' ? 'bg-[#b91c1c] text-white' : 'text-zinc-600'}`}
          >
            {isAr ? 'الخرائط والوثائق' : 'Full Satellite Map'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: THE TV BROADCAST SCREEN & SUBTITLES */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* HIGH-FIDELITY TELEVISION BROADCAST CONTAINER */}
          <div className="border-4 border-black relative overflow-hidden h-[450px] sm:h-[480px] rounded-lg flex flex-col justify-between bg-zinc-950 text-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all">
            
            {/* SCREEN GLOW & CRT SCANLINE EFFECTS */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-zinc-950/40 pointer-events-none z-30" />
            <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.03] z-30" />

            {/* TOP BAR / LIVE BROADCAST HEAD-UP DISPLAY */}
            <div className="p-3 bg-black/80 backdrop-blur-md border-b border-zinc-800 z-20 flex justify-between items-center text-[10px] font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 bg-[#b91c1c] text-white px-2 py-0.5 font-bold animate-pulse rounded text-[9px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  LIVE
                </span>
                <span className="text-zinc-400 font-bold tracking-wider">CH-02 TELEVISION</span>
                <span className="hidden sm:inline-block text-zinc-600">|</span>
                <span className="hidden sm:inline-block text-zinc-300">REC ●</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-500 font-bold flex items-center gap-1 animate-pulse">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                  SIGNAL: 1080p HD
                </span>
                <span className="text-zinc-400">
                  {new Date().toISOString().slice(11, 19)} UTC
                </span>
              </div>
            </div>

            {/* DYNAMIC SATELLITE / RADAR / STUDIO VIDEO DISPLAY CANVAS */}
            <div className="absolute inset-0 flex items-stretch justify-center select-none overflow-hidden mt-11 mb-20 z-10">
              
              {/* BACKDROP MULTI-MEDIA VIEWPORTS */}
              {layoutMode === 'split' && (
                <div className="w-full grid grid-cols-1 md:grid-cols-12 h-full">
                  
                  {/* LEFT: SATELLITE INTEL STREAM */}
                  <div className="md:col-span-7 bg-zinc-900 border-r border-zinc-800 relative flex items-center justify-center p-4">
                    {/* Animated visual overlay based on active scene */}
                    {activeScene.visualType === 'radar' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-[280px] h-[280px] rounded-full border border-red-600/30 animate-pulse flex items-center justify-center">
                          <div className="w-[180px] h-[180px] rounded-full border border-red-600/50 animate-ping flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                          </div>
                        </div>
                        {/* Radar sweep */}
                        <div className="absolute w-[140px] h-0.5 bg-red-500/80 origin-left left-1/2 top-1/2 rotate-sweep animate-spin"></div>
                        <span className="absolute bottom-2 left-2 text-[8px] font-mono text-zinc-400">SCAN SYSTEM: MULTI-FREQ COG-8</span>
                      </div>
                    )}

                    {activeScene.visualType === 'map' && (
                      <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')" }}>
                        <div className="absolute inset-0 bg-blue-950/25 mix-blend-color"></div>
                        <div className="absolute inset-0 bg-zinc-950/40"></div>
                        {/* Crosshairs & Coordinates */}
                        <div className="absolute inset-4 border border-white/10 flex items-center justify-center">
                          <div className="w-6 h-6 border-l border-t border-red-500 absolute top-0 left-0"></div>
                          <div className="w-6 h-6 border-r border-t border-red-500 absolute top-0 right-0"></div>
                          <div className="w-6 h-6 border-l border-b border-red-500 absolute bottom-0 left-0"></div>
                          <div className="w-6 h-6 border-r border-b border-red-500 absolute bottom-0 right-0"></div>
                          <div className="text-[9px] font-mono bg-black/60 px-2 py-0.5 rounded text-red-500 animate-pulse">
                            TARGET AREA: LEBANON SOUTHERN MARGIN
                          </div>
                        </div>
                      </div>
                    )}

                    {activeScene.visualType === 'documents' && (
                      <div className="absolute inset-0 bg-zinc-950 p-6 flex flex-col justify-center space-y-3">
                        <div className="text-[10px] font-mono text-amber-500 font-bold border-b border-amber-500/30 pb-1 uppercase">
                          CONFIDENTIAL INTEL SUMMARY DEEP-DIVE
                        </div>
                        <div className="space-y-2 opacity-80">
                          <div className="h-2 bg-zinc-700 rounded w-full"></div>
                          <div className="h-2 bg-zinc-700 rounded w-5/6"></div>
                          <div className="h-2 bg-zinc-700 rounded w-4/5"></div>
                          <div className="h-2 bg-zinc-600 rounded w-3/4"></div>
                        </div>
                        <span className="text-[8px] font-mono text-red-600 animate-pulse font-black uppercase">
                          CLASSIFIED ANNEX - RESTRICTED LEAKED SOURCE
                        </span>
                      </div>
                    )}

                    {activeScene.visualType === 'courtroom' && (
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800')" }}>
                        <div className="absolute inset-0 bg-zinc-950/50"></div>
                        <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-mono text-zinc-300">
                          INTERNATIONAL COURT (THE HAGUE)
                        </div>
                      </div>
                    )}

                    {activeScene.visualType === 'diplomacy' && (
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800')" }}>
                        <div className="absolute inset-0 bg-red-950/20 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-zinc-950/40"></div>
                        <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-mono text-zinc-300">
                          WASHINGTON CEASEFIRE MEETING PROTOCOLS
                        </div>
                      </div>
                    )}

                    {/* HUD graphic data overlay */}
                    <div className="absolute top-3 left-3 bg-black/70 border border-zinc-800 p-1.5 rounded text-[8px] font-mono space-y-0.5 z-10 text-left">
                      <div className="text-red-500 font-bold">● FEED ACTIVE</div>
                      <div className="text-zinc-400">AZIMUTH: 184° / SPEED: COMPIL</div>
                      <div className="text-zinc-500">DECODER: GEN-SPEECH V3.1</div>
                    </div>
                  </div>

                  {/* RIGHT: LIVE ANCHOR STUDIO SCENE */}
                  <div className="md:col-span-5 bg-gradient-to-b from-zinc-900 to-black p-4 flex flex-col justify-between relative">
                    
                    {/* Anchor Visual Portrait & Name Tag */}
                    <div className="flex-1 flex flex-col items-center justify-center relative">
                      
                      {/* Television desk virtual portrait */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-zinc-700 overflow-hidden bg-zinc-800 relative shadow-inner group">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
                          alt="Anchor Profile"
                          className="w-full h-full object-cover grayscale opacity-90 transition-all duration-300 group-hover:grayscale-0"
                          referrerPolicy="no-referrer"
                        />
                        {/* Audio equalizer overlaid on anchor view */}
                        <div className="absolute bottom-0 inset-x-0 h-6 bg-black/70 flex items-end justify-center gap-0.5 pb-1 px-2">
                          {[...Array(6)].map((_, idx) => (
                            <div 
                              key={idx} 
                              className={`w-1 rounded-t bg-red-600 transition-all duration-150 ${isPlaying ? 'animate-pulse' : ''}`}
                              style={{ height: isPlaying ? `${Math.floor(Math.random() * 16) + 4}px` : '3px' }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Studio desk banner text */}
                      <div className="mt-3 text-center">
                        <span className="text-[8px] font-mono uppercase bg-red-950 text-red-400 border border-red-800/50 px-1.5 py-0.5 rounded tracking-widest font-bold">
                          {isAr ? 'محلل الأخبار الافتراضي' : 'AL-WARRAQ SYNTH ANCHOR'}
                        </span>
                        <h4 className="font-sans font-black text-[11px] tracking-tight text-white mt-1">
                          {isAr ? 'معن برازي' : 'MAEN BARAZY'}
                        </h4>
                        <p className="text-[8px] font-mono text-zinc-400">
                          {isAr ? 'رئيس التحرير واستشاري الشؤون الاستراتيجية' : 'Senior Geopolitical Broadcaster'}
                        </p>
                      </div>

                    </div>

                    {/* LIVE ON AIR SIGNAL SIGN */}
                    <div className="flex justify-center items-center gap-1.5 border-t border-zinc-800 pt-2">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-red-600 animate-ping' : 'bg-zinc-600'}`}></span>
                      <span className="text-[8px] font-mono tracking-widest uppercase font-black text-zinc-400">
                        {isPlaying ? 'ON AIR' : 'STUDIO STANDBY'}
                      </span>
                    </div>

                  </div>

                </div>
              )}

              {/* ANCHOR STUDIO FULL VIEW */}
              {layoutMode === 'anchor' && (
                <div className="w-full h-full bg-cover bg-center relative flex items-center justify-center p-6" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=1200')" }}>
                  <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"></div>
                  
                  <div className="z-10 bg-black/80 border-2 border-red-600 p-4 rounded-lg max-w-md w-full text-center relative shadow-[0_0_15px_rgba(239,68,68,0.25)]">
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white font-mono font-bold uppercase text-[8px] px-2 py-0.5 rounded shadow">
                      {isAr ? 'البث المباشر للأخبار' : 'AL-WARRAQ SPECIAL BROADCAST'}
                    </span>

                    <div className="flex items-center justify-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-full border-2 border-red-600 overflow-hidden bg-zinc-800">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" 
                          alt="Anchor Thumbnail"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="font-sans font-black text-xs text-white">
                          {isAr ? 'نشرة استخباراتية عاجلة' : 'Al-Warraq Anchor Desk'}
                        </h4>
                        <span className="text-[8.5px] font-mono text-red-500 animate-pulse font-bold uppercase">
                          {isAr ? 'تغطية مستمرة ● مباشر' : 'CONTINUOUS COVERAGE ● ON AIR'}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-sans font-bold text-sm sm:text-base text-white tracking-tight leading-snug border-t border-zinc-800 pt-3 mt-2">
                      {isAr ? activeScene.titleAr : activeScene.titleEn}
                    </h3>
                    
                    <p className="text-xs text-zinc-300 italic mt-2 line-clamp-3">
                      "{isAr ? activeScene.highlightAr : activeScene.highlightEn}"
                    </p>

                    {/* Audio visual bar row */}
                    <div className="h-6 flex items-end justify-center gap-1.5 mt-3.5">
                      {[...Array(15)].map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-1 rounded-t bg-red-600 transition-all duration-150 ${isPlaying ? 'animate-pulse' : ''}`}
                          style={{ height: isPlaying ? `${Math.floor(Math.random() * 20) + 4}px` : '3px' }}
                        />
                      ))}
                    </div>

                  </div>
                </div>
              )}

              {/* FULL MAP AND SATELLITE HUD VIEW */}
              {layoutMode === 'dossier' && (
                <div className="w-full h-full bg-cover bg-center relative transition-all duration-500" style={{ 
                  backgroundImage: activeScene.visualType === 'map' 
                    ? "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')"
                    : "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800')"
                }}>
                  <div className="absolute inset-0 bg-zinc-950/45"></div>
                  
                  {/* Digital high-tech HUD overlay frames */}
                  <div className="absolute inset-3 border border-red-500/20 rounded flex flex-col justify-between p-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[8px] font-mono bg-red-950/80 border border-red-500/30 text-red-500 px-1.5 py-0.5 rounded">
                        SATELLITE INTEL COORD-FEED // ACT
                      </span>
                      <span className="text-[8px] font-mono text-zinc-400">
                        LAT: 33.8938° N / LON: 35.5018° E
                      </span>
                    </div>

                    <div className="max-w-md mx-auto bg-black/85 border border-zinc-800 p-3 rounded-lg text-center z-10 shadow-xl">
                      <span className="text-[7.5px] font-mono text-zinc-500 block uppercase mb-1">SCENE INTEL STREAM REPORT</span>
                      <h4 className="font-sans font-black text-xs text-white mb-1.5">
                        {isAr ? activeScene.titleAr : activeScene.titleEn}
                      </h4>
                      <p className="text-[10px] text-zinc-300 italic">
                        "{isAr ? activeScene.highlightAr : activeScene.highlightEn}"
                      </p>
                    </div>

                    <div className="flex justify-between items-end text-[7.5px] font-mono text-zinc-500">
                      <span>RADAR SCAN ACTIVE: SWEEP 880HZ</span>
                      <span>AL-WARRAQ EXCLUSIVE DEEP-COGNITION SYSTEMS</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* DYNAMIC TELEVISION BROADCAST NEWS TICKER (MARQUEE) */}
            <div className="absolute bottom-11 inset-x-0 h-10 bg-[#b91c1c] text-white z-20 flex items-stretch border-t-2 border-b-2 border-black">
              
              {/* FIXED FLASH TAG */}
              <div className="bg-black text-white px-3 font-sans font-black text-[10px] uppercase flex items-center justify-center gap-1 shrink-0 tracking-widest z-10 border-r-2 border-white/20 select-none">
                <Flame size={12} className="text-[#e11d48] animate-pulse" />
                {isAr ? 'عاجل' : 'BREAKING'}
              </div>

              {/* MOVING MARQUEE CONTENT */}
              <div className="flex-1 overflow-hidden relative flex items-center bg-black/15">
                <div className="absolute whitespace-nowrap animate-marquee font-mono text-[10.5px] font-bold tracking-tight uppercase flex items-center gap-12 text-zinc-50 pl-6">
                  <span>
                    {isAr 
                      ? '● الوراق تكشف الملحق الأمني السري للاتفاق الإطاري اللبناني الإسرائيلي المكون من 14 نقطة'
                      : '● Al-Warraq uncovers the unreleased Security Annex behind the US-brokered Lebanon-Israel 14-point deal'}
                  </span>
                  <span>
                    {isAr 
                      ? '● خبراء قانونيون يحذرون: المادة 13 تسلب لبنان سيادته في مقاضاة جرائم الحرب دولياً'
                      : '● Legal experts warn: Article 13 severely restricts Lebanon\'s sovereignty to prosecute war crimes'}
                  </span>
                  <span>
                    {isAr
                      ? '● رئيس الوزراء سلام وقضية التناقض القانوني مع رئاسة محكمة العدل الدولية'
                      : '● Concession paradox under PM Nawaf Salam, former President of the International Court of Justice'}
                  </span>
                  <span>
                    {isAr
                      ? '● التحليلات الميدانية تشير إلى أن سحب القوات الإسرائيلية مشروط وغير تلقائي'
                      : '● Field assessments show Israeli withdrawal parameters are fully conditional and lack direct timeline tables'}
                  </span>
                </div>
              </div>

            </div>

            {/* LOWER AUDIO CONTROL DASHBOARD */}
            <div className="z-20 bg-zinc-950/95 backdrop-blur-md p-3 flex flex-col gap-2 border-t border-zinc-800 mt-auto">
              
              {/* Video Timeline & Progress Bar */}
              <div className="relative w-full h-1 bg-zinc-800 rounded overflow-hidden cursor-pointer" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percent = (clickX / rect.width) * 100;
                setProgress(percent);
              }}>
                <div 
                  className="absolute top-0 bottom-0 left-0 transition-all duration-100 bg-[#b91c1c]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Subtitles text line ticker with direct feedback */}
              <div className="text-center font-sans text-[11px] text-zinc-100 font-bold py-1 min-h-[34px] flex items-center justify-center px-4 leading-relaxed" dir={isAr ? 'rtl' : 'ltr'}>
                <span className="text-red-500 mr-1.5 shrink-0 font-mono text-[9px] uppercase tracking-wider font-black">
                  [ {isAr ? 'صوت المذيع' : 'ANCHOR AUDIO'} ]:
                </span>
                {isAr ? activeScene.textAr : activeScene.textEn}
              </div>

              {/* Playback & Audio Control Rows */}
              <div className="flex justify-between items-center pt-1">
                
                {/* Skip buttons & Play/Pause */}
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={handlePrevScene}
                    disabled={currentSceneIndex === 0}
                    className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer transition-colors"
                    title={isAr ? 'السابق' : 'Previous Scene'}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      playNewsBeep();
                    }}
                    className="w-9 h-9 rounded-full bg-[#b91c1c] hover:bg-red-700 text-white flex items-center justify-center cursor-pointer shadow-lg transform hover:scale-105 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                  </button>

                  <button 
                    type="button"
                    onClick={handleNextScene}
                    disabled={currentSceneIndex === activeVideo.scenes.length - 1}
                    className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer transition-colors"
                    title={isAr ? 'التالي' : 'Next Scene'}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Central active scene title tag */}
                <div className="hidden sm:block text-[9.5px] font-mono text-zinc-400 truncate max-w-[220px]">
                  {isAr ? activeVideo.titleAr : activeVideo.titleEn}
                </div>

                {/* Right side helper controls (Mute, speed and voice indicators) */}
                <div className="flex items-center gap-3 font-mono text-[10px]">
                  
                  {/* High-speed anchor modulation */}
                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
                    <span className="text-[9px] text-zinc-500">SPEED:</span>
                    <select 
                      value={narrationSpeed} 
                      onChange={(e) => setNarrationSpeed(parseFloat(e.target.value))}
                      className="bg-transparent text-white font-bold outline-none cursor-pointer text-[9.5px]"
                    >
                      <option value="0.9" className="bg-zinc-950 text-white">0.9x</option>
                      <option value="1.1" className="bg-zinc-950 text-white">1.1x Anchor</option>
                      <option value="1.3" className="bg-zinc-950 text-white">1.3x High-E</option>
                      <option value="1.5" className="bg-zinc-950 text-white">1.5x Rapid</option>
                    </select>
                  </div>

                  {/* Audio Volume Button */}
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded cursor-pointer flex items-center justify-center transition-colors"
                    title={isAr ? 'كتم/تشغيل الصوت' : 'Toggle Voiceover Audio'}
                  >
                    {isMuted ? <VolumeX size={13} className="text-[#b91c1c]" /> : <Volume2 size={13} />}
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* TELEVISION DOCUMENTATION DETAIL ACCORDION */}
          <div className="border-2 border-black bg-white p-4 rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <h4 className="font-sans font-black text-xs uppercase text-zinc-900 border-b border-zinc-200 pb-2 mb-2 flex items-center gap-1.5">
              <BookOpen size={14} className="text-[#b91c1c]" />
              {isAr ? 'التقرير التفصيلي المصاحب للبث التلفزيوني' : 'Detailed Dossier Narrative for Current Segment'}
            </h4>
            
            <p className="text-[11.5px] leading-relaxed text-zinc-700 font-sans">
              {isAr ? activeScene.textAr : activeScene.textEn}
            </p>

            <div className="mt-3 pt-3 border-t border-zinc-100 flex justify-between items-center text-[10px] text-zinc-400 font-mono">
              <span className="flex items-center gap-1">
                <Clock size={11} /> {isAr ? 'التصفح التلقائي للبث مستمر' : 'Auto advances every 13s'}
              </span>
              <span>
                {isAr ? 'سجل ملفات الأمن - تلفزيون الوراق' : 'Al-Warraq Security Dossier Index'}
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: DIRECTORY & CONVERSION APPOINT WORKSPACE */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active List of Video Briefs */}
          <div className="border-2 border-black p-4 bg-white rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <h3 className="font-sans font-black text-xs uppercase text-zinc-950 border-b-2 border-black pb-2.5 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Tv size={14} className="text-[#b91c1c]" />
                  {isAr ? 'قنوات وبث الأخبار الجاهزة' : 'Active Broadcast Bulletins'}
                </span>
                <span className="bg-red-100 text-[#b91c1c] font-mono text-[9px] px-1.5 py-0.5 font-bold rounded">
                  {videos.length} LIVE
                </span>
              </h3>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {videos.map((vid) => (
                  <div 
                    key={vid.id}
                    className={`border-2 p-2.5 rounded transition-all flex flex-col justify-between ${
                      vid.id === selectedVideoId 
                        ? 'border-black bg-zinc-50 shadow-[2px_2px_0_0_rgba(0,0,0,1)]' 
                        : 'border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[8px] font-mono text-[#b91c1c] uppercase font-bold tracking-wider">
                          {vid.category}
                        </span>
                        <span className="text-[8.5px] font-mono text-zinc-400">
                          {vid.duration} MIN
                        </span>
                      </div>

                      <h4 
                        onClick={() => {
                          setSelectedVideoId(vid.id);
                          setCurrentSceneIndex(0);
                          setProgress(0);
                          setIsPlaying(false);
                          playNewsBeep();
                        }}
                        className="font-sans font-bold text-[10.5px] text-zinc-950 hover:text-red-700 cursor-pointer mt-1 line-clamp-2"
                      >
                        {isAr ? vid.titleAr : vid.titleEn}
                      </h4>

                      <p className="text-[9px] text-zinc-500 line-clamp-1 mt-0.5">
                        {isAr ? vid.descriptionAr : vid.descriptionEn}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-zinc-100 text-[8.5px] font-mono">
                      <span className="text-zinc-400 flex items-center gap-0.5">
                        <Eye size={9} /> {vid.views.toLocaleString()}
                      </span>

                      {/* Allow Admin deletion of customized videos */}
                      {vid.id !== 'video-pilot-secret-annex' && (
                        <button
                          type="button"
                          onClick={() => handleDeleteVideo(vid.id)}
                          className="text-red-650 hover:text-red-800 font-black uppercase cursor-pointer"
                        >
                          {isAr ? 'حذف البث' : 'Remove Feed'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-3 mt-3 text-[9px] font-mono text-zinc-400 leading-normal">
              {isAr 
                ? '💡 حدد أي ملف إخباري أو تحقيق من الأرشيف بالأسفل لتحويله فوراً إلى بث تلفزيوني ونشرة مصورة.' 
                : '💡 Convert any report or investigation below into an interactive dynamic news broadcast.'}
            </div>
          </div>

          {/* ADMIN ACTION: APPOINT NEWS STORY TO VIDEO PLATFORM */}
          <div className="border-4 border-black p-4 bg-zinc-50 rounded shadow-[3px_3px_0_0_rgba(0,0,0,1)] relative">
            <span className="absolute top-2 right-2 bg-[#b91c1c] text-white text-[7.5px] font-mono font-bold px-1.5 rounded uppercase tracking-widest shadow-sm">
              {isAdmin ? 'ADMIN CONTROL' : 'PUBLIC PREVIEW'}
            </span>
            
            <h3 className="font-sans font-black text-xs uppercase text-zinc-950 border-b border-zinc-300 pb-2 mb-3.5 flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#b91c1c]" />
              {isAr ? 'أداة تعيين وإطلاق الفيديوهات' : 'Story Video Appointing Tool'}
            </h3>

            <p className="text-[10px] text-zinc-600 leading-relaxed mb-3.5">
              {isAr 
                ? 'حدد أي تحقيق استقصائي أو تقرير إخباري من الأرشيف ليرتب الذكاء التوليدي مقاطع فوتوغرافية ومخططات بيانية ونصوص برمجية لقراءة التقرير صوتياً بنبرة مذيع الأخبار النشط.'
                : 'Appoint any text narrative to compile synthetic audiovisual slideshow scenes with energetic newscaster voiceovers instantly.'}
            </p>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-zinc-500 uppercase font-black block">
                  {isAr ? 'اختر المقال المراد تحويله:' : 'Select Article to Convert:'}
                </label>
                <select
                  value={appointArticleId}
                  onChange={(e) => setAppointArticleId(e.target.value)}
                  className="w-full text-[10.5px] p-2 border-2 border-black bg-white font-bold rounded"
                >
                  <option value="">{isAr ? '-- حدد المقال --' : '-- Select Story --'}</option>
                  {allArticles
                    .filter(art => art.id !== 'excl-leb-isr-secret-annex')
                    .map((art) => (
                      <option key={art.id} value={art.id}>
                        {isAr ? art.titleAr : art.titleEn}
                      </option>
                    ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (appointArticleId) {
                    handleAppointArticleToVideo(appointArticleId);
                  }
                }}
                disabled={!appointArticleId}
                className={`w-full py-2 border-2 border-black font-sans text-xs font-black uppercase rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  appointArticleId 
                    ? 'bg-[#b91c1c] text-white hover:bg-red-700' 
                    : 'bg-zinc-200 text-zinc-400 border-zinc-300 shadow-none cursor-not-allowed'
                }`}
              >
                <Plus size={14} />
                {isAr ? 'تعيين وتحويل إلى بث فوراً' : 'Convert & Load to Broadcast'}
              </button>

              {appointSuccess && (
                <div className="p-2 border border-emerald-300 bg-emerald-50 text-emerald-800 text-[9.5px] font-mono rounded flex items-center gap-1.5">
                  <Check size={12} className="text-emerald-700 shrink-0" />
                  <span>
                    {isAr ? 'تم تحويل المقال وتحديث منصة فيديو الورّاق!' : 'Successfully compiled and generated Video brief!'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* GEO-INFO BANNER */}
          <div className="border border-zinc-200 p-4 bg-white rounded space-y-2">
            <span className="font-mono text-[9px] text-zinc-400 block font-bold">INFO DECK</span>
            <h4 className="font-sans font-black text-xxs uppercase text-zinc-950 flex items-center gap-1">
              <Radio size={11} className="text-zinc-600 animate-pulse" />
              {isAr ? 'قنوات رصد حية إضافية' : 'Interactive Broadcast Stations'}
            </h4>
            <p className="text-[10px] text-zinc-500 leading-snug">
              {isAr 
                ? 'ترتبط منصة الفيديو بملخصات السيو وتحليلات مقروئية النصوص الفورية في لوحة تحكم الإدارة لضمان تطابق الكلمات المنطوقة مع معايير محركات البحث.' 
                : 'Synthetic audio outputs are calibrated to meet dynamic readability benchmarks for optimal web indexing.'}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
