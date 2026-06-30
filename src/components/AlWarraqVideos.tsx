import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Article } from '../types';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Flame, 
  Tv, Film, Sparkles, ChevronRight, ChevronLeft, Plus,
  Shield, Check, ArrowRight, Video, Languages, Radio,
  BookOpen, Clock, Eye, AlertTriangle, ListMusic
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
  const [narrationSpeed, setNarrationSpeed] = useState<number>(1);
  const [videoStyleMode, setVideoStyleMode] = useState<'cinematic' | 'terminal' | 'broadcast'>('cinematic');

  // Subtitles / Voiceover Text Speech API Ref
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<any>(null);

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
    } else {
      stopNarration();
    }
  }, [currentSceneIndex, isPlaying]);

  // Scene transition timer simulation (for progress bar & auto-advancing scenes)
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (isPlaying) {
      const durationMs = 12000 / narrationSpeed; // 12 seconds per scene baseline
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

  // Web Speech API Voiceover Player
  const playSceneNarration = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Cancel current active voiceovers

    if (isMuted) return;

    const activeScene = activeVideo.scenes[currentSceneIndex];
    const textToSpeak = isAr ? activeScene.textAr : activeScene.textEn;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Try to match best voice based on language
    const voices = window.speechSynthesis.getVoices();
    if (isAr) {
      const arVoice = voices.find(v => v.lang.startsWith('ar')) || voices.find(v => v.name.toLowerCase().includes('arabic'));
      if (arVoice) utterance.voice = arVoice;
    } else {
      const enVoice = voices.find(v => v.lang.startsWith('en')) || voices.find(v => v.name.toLowerCase().includes('english'));
      if (enVoice) utterance.voice = enVoice;
    }

    utterance.rate = narrationSpeed;
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
        titleAr: `${isAr ? 'الفصل' : 'Chapter'} ${i + 1}: ${isAr ? 'تحليل المحتوى' : 'Segment Briefing'}`,
        titleEn: `Chapter ${i + 1}: Intelligence Assessment`,
        textAr: pAr.slice(0, 180) + '...',
        textEn: pEn.slice(0, 180) + '...',
        highlightAr: pAr.slice(0, 60) + '...',
        highlightEn: pEn.slice(0, 60) + '...',
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
          <span className="bg-black text-white px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase flex items-center gap-1 w-max">
            <Radio size={10} className="text-[#b91c1c] animate-pulse" />
            {isAr ? 'منصة الإعلام الاستقصائي المرئي' : 'CINEMATIC BRIEFING PLATFORM'}
          </span>
          <h2 className="font-sans font-black text-2xl uppercase text-zinc-950 mt-1 flex items-center gap-2">
            <Film size={24} className="text-[#b91c1c]" />
            {isAr ? 'فيديو الورّاق' : 'Al-Warraq Videos'}
          </h2>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            {isAr 
              ? 'تحويل التقارير والدراسات والملاحق الأمنية السرية إلى إيجازات استخباراتية مرئية ومسموعة مدعومة بالذكاء التوليدي.' 
              : 'Interactive synthetic video logs translating dense geopolitical dossiers into animated slide briefings.'}
          </p>
        </div>

        {/* Video Style Switcher */}
        <div className="flex bg-white border-2 border-black p-0.5 rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-[9px] font-mono font-bold uppercase shrink-0">
          <button
            type="button"
            onClick={() => setVideoStyleMode('cinematic')}
            className={`px-2.5 py-1 rounded transition-colors ${videoStyleMode === 'cinematic' ? 'bg-black text-white' : 'text-zinc-600'}`}
          >
            {isAr ? 'سينمائي' : 'Cinematic'}
          </button>
          <button
            type="button"
            onClick={() => setVideoStyleMode('broadcast')}
            className={`px-2.5 py-1 rounded transition-colors ${videoStyleMode === 'broadcast' ? 'bg-red-700 text-white' : 'text-zinc-600'}`}
          >
            {isAr ? 'إخباري' : 'Broadcast'}
          </button>
          <button
            type="button"
            onClick={() => setVideoStyleMode('terminal')}
            className={`px-2.5 py-1 rounded transition-colors ${videoStyleMode === 'terminal' ? 'bg-zinc-800 text-green-400' : 'text-zinc-600'}`}
          >
            {isAr ? 'شاشة استخبارية' : 'Intel Terminal'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: THE PLAYBACK CORE & SUBTITLES WORKSPACE */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Main Video Visualizer Stage / Box */}
          <div className={`border-4 border-black relative overflow-hidden h-[380px] sm:h-[420px] rounded flex flex-col justify-between shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all ${
            videoStyleMode === 'terminal' ? 'bg-black border-zinc-700 text-green-400 font-mono' :
            videoStyleMode === 'broadcast' ? 'bg-[#18181b] border-[#b91c1c] text-white font-sans' :
            'bg-zinc-950 border-black text-white font-serif'
          }`}>

            {/* Top Bar inside Player */}
            <div className="p-3 bg-black/60 backdrop-blur-sm border-b border-white/10 z-10 flex justify-between items-center text-[10px]">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span className="font-mono tracking-widest font-black uppercase text-white">
                  AL-WARRAQ LIVE INTEL BROADCAST
                </span>
              </div>
              <div className="font-mono text-zinc-300">
                {currentSceneIndex + 1} / {activeVideo.scenes.length} - {activeScene.titleAr && isAr ? activeScene.titleAr : activeScene.titleEn}
              </div>
            </div>

            {/* CENTER STAGE: ANIMATED GRAPHICS CANVAS SIMULATOR */}
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center select-none overflow-hidden mt-10 mb-14">
              
              {/* Dynamic Animated background representations */}
              {activeScene.visualType === 'radar' && (
                <div className="absolute inset-0 opacity-15 flex items-center justify-center pointer-events-none">
                  <div className="w-[300px] h-[300px] rounded-full border border-[#b91c1c] animate-ping duration-1000"></div>
                  <div className="w-[180px] h-[180px] rounded-full border border-[#b91c1c]/50 animate-pulse"></div>
                  <div className="absolute w-full h-0.5 bg-[#b91c1c] top-1/2 left-0 transform -translate-y-1/2 animate-bounce"></div>
                </div>
              )}

              {activeScene.visualType === 'map' && (
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')" }}>
                  <div className="absolute top-1/3 left-1/2 w-3.5 h-3.5 bg-red-600 rounded-full animate-ping"></div>
                  <div className="absolute top-1/2 left-1/4 w-3.5 h-3.5 bg-amber-500 rounded-full animate-ping"></div>
                </div>
              )}

              {activeScene.visualType === 'documents' && (
                <div className="absolute inset-0 opacity-15 flex flex-col justify-around p-8 pointer-events-none select-none">
                  <div className="h-4 bg-zinc-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-zinc-700 rounded w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-zinc-700 rounded w-5/6 animate-pulse"></div>
                </div>
              )}

              {activeScene.visualType === 'courtroom' && (
                <div className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800')" }}></div>
              )}

              {activeScene.visualType === 'diplomacy' && (
                <div className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800')" }}></div>
              )}

              {/* Graphical Content Card Overlay */}
              <div className={`max-w-lg mx-auto z-10 p-5 rounded-lg border text-center transition-all duration-500 transform ${
                isPlaying ? 'scale-100 opacity-100' : 'scale-98 opacity-90'
              } ${
                videoStyleMode === 'terminal' ? 'bg-zinc-950/90 border-green-700' :
                videoStyleMode === 'broadcast' ? 'bg-zinc-900/95 border-red-700' :
                'bg-zinc-900/80 border-white/10 backdrop-blur-md'
              }`}>
                <span className="text-[10px] font-mono uppercase bg-red-700/80 text-white px-2 py-0.5 rounded tracking-widest inline-block mb-3">
                  {isAr ? 'الحدث الرئيسي الجاري' : 'CORE REVELATION'}
                </span>
                
                <h3 className="font-sans font-black text-base sm:text-lg mb-3 tracking-tight">
                  {isAr ? activeScene.titleAr : activeScene.titleEn}
                </h3>
                
                <p className="text-xs sm:text-sm leading-relaxed mb-4 text-zinc-100 italic" style={{ fontFamily: isAr ? 'serif' : 'monospace' }}>
                  "{isAr ? activeScene.highlightAr : activeScene.highlightEn}"
                </p>

                {/* Simulated Audio Soundwave Analyzer (Renders and animates when isPlaying) */}
                <div className="h-8 flex items-end justify-center gap-1 mt-4">
                  {[...Array(20)].map((_, i) => {
                    // Random amplitude simulation
                    const height = isPlaying ? Math.floor(Math.random() * 26) + 6 : 4;
                    return (
                      <div 
                        key={i} 
                        className={`w-1 rounded-t transition-all duration-150 ${
                          videoStyleMode === 'terminal' ? 'bg-green-500' :
                          videoStyleMode === 'broadcast' ? 'bg-red-600' :
                          'bg-amber-400'
                        }`} 
                        style={{ height: `${height}px` }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Subtitles & Control Bar Overlay */}
            <div className="z-10 bg-black/80 backdrop-blur-md border-t border-white/10 p-3 flex flex-col gap-2.5">
              
              {/* Progress Slider Track */}
              <div className="relative w-full h-1 bg-zinc-800 rounded overflow-hidden">
                <div 
                  className={`absolute top-0 bottom-0 left-0 transition-all duration-100 ${
                    videoStyleMode === 'terminal' ? 'bg-green-500' :
                    videoStyleMode === 'broadcast' ? 'bg-red-600' :
                    'bg-amber-400'
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Subtitles text line ticker */}
              <div className="text-center font-mono text-[10.5px] text-zinc-100 py-1 border-b border-white/5 min-h-[32px] flex items-center justify-center px-4" dir={isAr ? 'rtl' : 'ltr'}>
                {isAr ? activeScene.textAr : activeScene.textEn}
              </div>

              {/* Controls layout */}
              <div className="flex justify-between items-center">
                
                {/* Skip buttons & Play/Pause */}
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={handlePrevScene}
                    disabled={currentSceneIndex === 0}
                    className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title={isAr ? 'السابق' : 'Previous Scene'}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-9 h-9 rounded-full bg-red-650 hover:bg-red-700 text-white flex items-center justify-center cursor-pointer shadow-md transform hover:scale-105 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                  </button>

                  <button 
                    type="button"
                    onClick={handleNextScene}
                    disabled={currentSceneIndex === activeVideo.scenes.length - 1}
                    className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title={isAr ? 'التالي' : 'Next Scene'}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Central title info for screen readers/assistants */}
                <div className="hidden sm:block text-[9.5px] font-mono text-zinc-400 truncate max-w-[200px]">
                  {isAr ? activeVideo.titleAr : activeVideo.titleEn}
                </div>

                {/* Right side helper controls (Mute, speed and voice indicators) */}
                <div className="flex items-center gap-3 font-mono text-[10px]">
                  
                  {/* Speed Controls */}
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded">
                    <span className="text-[9px] text-zinc-400">SPD:</span>
                    <select 
                      value={narrationSpeed} 
                      onChange={(e) => setNarrationSpeed(parseFloat(e.target.value))}
                      className="bg-transparent text-white font-bold outline-none cursor-pointer"
                    >
                      <option value="0.8" className="bg-zinc-950 text-white">0.8x</option>
                      <option value="1.0" className="bg-zinc-950 text-white">1.0x</option>
                      <option value="1.2" className="bg-zinc-950 text-white">1.2x</option>
                      <option value="1.5" className="bg-zinc-950 text-white">1.5x</option>
                    </select>
                  </div>

                  {/* Audio Volume Button */}
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    className="p-1.5 bg-white/5 border border-white/10 text-zinc-300 hover:text-white rounded cursor-pointer flex items-center justify-center"
                    title={isAr ? 'كتم/تشغيل الصوت' : 'Toggle Voiceover Audio'}
                  >
                    {isMuted ? <VolumeX size={13} className="text-red-500" /> : <Volume2 size={13} />}
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* DOCUMENTATION BRIEF FOR ACTIVE SCENE */}
          <div className="border-2 border-black bg-white p-4 rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <h4 className="font-sans font-black text-xs uppercase text-zinc-900 border-b border-zinc-200 pb-2 mb-2 flex items-center gap-1.5">
              <BookOpen size={14} className="text-[#b91c1c]" />
              {isAr ? 'التقرير التفصيلي المصاحب لهذه اللقطة' : 'Detailed Dossier Narrative for Current Segment'}
            </h4>
            
            <p className="text-[11.5px] leading-relaxed text-zinc-700">
              {isAr ? activeScene.textAr : activeScene.textEn}
            </p>

            <div className="mt-3 pt-3 border-t border-zinc-100 flex justify-between items-center text-[10px] text-zinc-400 font-mono">
              <span className="flex items-center gap-1">
                <Clock size={11} /> {isAr ? 'مستمر التصفح التلقائي' : 'Auto advances every 12s'}
              </span>
              <span>
                {isAr ? 'مستند استخباري الوراق' : 'Al-Warraq Security Dossier Index'}
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: VIDEO DIRECTORY & ADPOINT HUB */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active List of Video Briefs */}
          <div className="border-2 border-black p-4 bg-white rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <h3 className="font-sans font-black text-xs uppercase text-zinc-950 border-b-2 border-black pb-2.5 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Tv size={14} className="text-red-650" />
                  {isAr ? 'قائمة الفيديوهات المعينة والمعدّة' : 'Appointed Video Bulletins'}
                </span>
                <span className="bg-red-100 text-red-700 font-mono text-[9px] px-1.5 py-0.5 font-bold rounded">
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
                          className="text-red-600 hover:text-red-800 font-black uppercase cursor-pointer"
                        >
                          {isAr ? 'حذف' : 'Remove'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-3 mt-3 text-[9px] font-mono text-zinc-400 leading-normal">
              {isAr 
                ? '💡 يمكن للمسؤولين تعيين أي مقال من سجل الأخبار في الأسفل وتحويله فوراً لسيناريو مرئي.' 
                : '💡 Convert any report or investigation below into an interactive audio-briefing.'}
            </div>
          </div>

          {/* ADMIN ACTION: APPOINT NEWS STORY TO VIDEO PLATFORM */}
          <div className="border-4 border-black p-4 bg-zinc-50 rounded shadow-[3px_3px_0_0_rgba(0,0,0,1)] relative">
            <span className="absolute top-2 right-2 bg-black text-white text-[7.5px] font-mono font-bold px-1 rounded uppercase tracking-widest">
              {isAdmin ? 'ADMIN CONTROL' : 'PUBLIC PREVIEW'}
            </span>
            
            <h3 className="font-sans font-black text-xs uppercase text-zinc-950 border-b border-zinc-300 pb-2 mb-3.5 flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#b91c1c]" />
              {isAr ? 'أداة تعيين وإطلاق الفيديوهات' : 'Story Video Appointing Tool'}
            </h3>

            <p className="text-[10px] text-zinc-600 leading-relaxed mb-3.5">
              {isAr 
                ? 'حدد أي تحقيق استقصائي أو تقرير إخباري من الأرشيف ليرتب الذكاء التوليدي مقاطع فوتوغرافية ومخططات بيانية ونصوص برمجية لقراءة التقرير صوتياً.'
                : 'Appoint any text narrative to compile synthetic audiovisual slideshow scenes with subtitles instantly.'}
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
                    ? 'bg-black text-white hover:bg-zinc-900' 
                    : 'bg-zinc-200 text-zinc-400 border-zinc-300 shadow-none cursor-not-allowed'
                }`}
              >
                <Plus size={14} />
                {isAr ? 'تعيين وتحويل إلى فيديو فوراً' : 'Convert & Load to Videos'}
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
