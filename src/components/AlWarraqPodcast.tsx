import React, { useState, useEffect, useRef } from 'react';
import { PublishedPodcast, Article } from '../types';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Mic, Radio, 
  ChevronRight, ChevronLeft, FileText, Download, Info, Search, 
  Sliders, Globe, Calendar, Link as LinkIcon, Headphones, BookOpen, AlertCircle
} from 'lucide-react';

interface AlWarraqPodcastProps {
  language: 'ar' | 'en';
  allArticles?: Article[];
  onSelectArticle?: (article: Article) => void;
}

const LOCAL_STORAGE_KEY = 'alwarraq_published_podcasts';

const DEFAULT_PODCASTS: PublishedPodcast[] = [
  {
    id: 'podcast-lebanon-pilot-zones',
    articleId: 'joseph-aoun-washington-visit-2026',
    titleAr: 'ديوان تحريات الوراق: كواليس الاتفاق الأمني والمناطق التجريبية في الجنوب',
    titleEn: 'Al-Warraq Podcast: Inside the Security Agreement & South Lebanon Pilot Zones',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    publishedAt: '2026-07-21T00:00:00.000Z',
    publisherAr: 'هيئة التحرير العسكرية',
    publisherEn: 'Military Desk Editor',
    transcriptAr: 'تقرير استقصائي خاص من بيروت. بعد مرور أيام قليلة على توقيع الاتفاق الإطاري الثلاثي في واشنطن في السادس والعشرين من حزيران عام ألفين وستة وعشرين بين لبنان وإسرائيل برعاية أمريكية، يترقب الشارع اللبناني والأوساط العسكرية ما إذا كان هذا الأسبوع سيحمل أولى علامات الترجمة الميدانية للاتفاق عبر انسحاب القوات الإسرائيلية من نقاط محددة. إلا أن المؤشرات الميدانية والتسريبات الدبلوماسية المرافقة لاجتماعات آلية التنسيق تكشف عن عقبات حرجة قد تحول الاختبار الأول إلى مواجهة سياسية وعسكرية معقدة.',
    transcriptEn: 'Special investigative report from Beirut. A few days after the signing of the trilateral Framework Agreement in Washington on June twenty-sixth, twenty twenty-six, between Lebanon and Israel under US mediation, the Lebanese street and military circles are closely watching whether this week will carry the first signs of practical translation of the agreement through the withdrawal of Israeli forces from specific points.'
  },
  {
    id: 'podcast-us-iran-attrition',
    articleId: 'open-war-of-attrition-us-iran-2026',
    titleAr: 'بث الورّاق: سيناريوهات حرب الاستنزاف المفتوحة بين أمريكا وإيران',
    titleEn: 'Al-Warraq Special: Scenarios of the Open War of Attrition between the US and Iran',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    publishedAt: '2026-07-20T12:00:00.000Z',
    publisherAr: 'رأي التحرير الاستراتيجي',
    publisherEn: 'Strategic Editorial Counsel',
    transcriptAr: 'تجاوزت المواجهة العسكرية المحتدمة بين الولايات المتحدة الأمريكية وإيران أطر الضربات التكتيكية المحدودة أو الاستعراض الردعي، لتتحول رسميًا إلى حرب استنزاف هجينة وشاملة. وبعد انهيار مذكرة التفاهم وإعلان إلغاء وقف إطلاق النار، دخل الطرفان مرحلة جديدة عنوانها الأساسي: استهداف الشرايين الحيوية وإعادة تعريف قواعد الاشتباك.',
    transcriptEn: 'The escalating military confrontation between the United States and Iran has bypassed tactical strikes or deterrent posturing, officially morphing into a hybrid war of attrition. Following the collapse of the Memorandum of Understanding, both sides have entered a new phase centered on targeting critical arteries.'
  }
];

export const AlWarraqPodcast: React.FC<AlWarraqPodcastProps> = ({ language, allArticles = [], onSelectArticle }) => {
  const isAr = language === 'ar';

  // Master podcasts list
  const [podcasts, setPodcasts] = useState<PublishedPodcast[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'audio' | 'text'>('all');
  
  // Selected active podcast
  const [activePodcast, setActivePodcast] = useState<PublishedPodcast | null>(null);

  // Audio player refs and states
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Audio Mode Selector: 'tts' (Default AI Narrator voice) or 'stream' (Ambient Audio MP3 URL)
  const [audioMode, setAudioMode] = useState<'tts' | 'stream'>('tts');

  // Text-To-Speech (SpeechSynthesis) assistant states and simulated timers
  const [isSpeakingTts, setIsSpeakingTts] = useState(false);
  const [ttsSpeed, setTtsSpeed] = useState(1);
  const [ttsCurrentTime, setTtsCurrentTime] = useState(0);
  const [ttsDuration, setTtsDuration] = useState(0);
  const ttsTimerRef = useRef<number | null>(null);
  const ttsUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Decorative Audio spectrum simulation
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(24).fill(12));
  const waveIntervalRef = useRef<number | null>(null);

  // Load podcasts from storage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    let loadedPodcasts: PublishedPodcast[] = [];
    if (stored) {
      try {
        loadedPodcasts = JSON.parse(stored);
      } catch (e) {
        loadedPodcasts = DEFAULT_PODCASTS;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_PODCASTS));
      }
    } else {
      loadedPodcasts = DEFAULT_PODCASTS;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_PODCASTS));
    }
    
    setPodcasts(loadedPodcasts);
    if (loadedPodcasts.length > 0) {
      setActivePodcast(loadedPodcasts[0]);
    }
  }, []);

  // Update audio instance properties and default modes when active podcast changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    stopTts();

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }

    if (activePodcast) {
      // Default to high-quality AI Speech narration ('tts') if no custom audioUrl is provided,
      // or if it is the placeholder SoundHelix song. This avoids playing weird instrumental beats.
      if (!activePodcast.audioUrl || activePodcast.audioUrl.includes('soundhelix.com')) {
        setAudioMode('tts');
      } else {
        setAudioMode('stream');
      }
    }
  }, [activePodcast]);

  // Handle Play/Pause HTML5 Audio
  const togglePlayAudio = () => {
    if (!audioRef.current || !activePodcast?.audioUrl) return;

    // Stop TTS if running to prevent double speech overlap
    stopTts();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Audio playback failed or was blocked by browser auto-play policies:", err);
      });
    }
  };

  // Audio Event Handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioMode === 'tts') {
      setTtsCurrentTime(val);
    } else {
      if (audioRef.current) {
        audioRef.current.currentTime = val;
        setCurrentTime(val);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    if (audioRef.current) {
      audioRef.current.muted = newMuteState;
    }
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  // Waveform Spectrum animation loop when music or speech is playing
  useEffect(() => {
    const isPlaybackActive = isPlaying || isSpeakingTts;
    if (isPlaybackActive) {
      waveIntervalRef.current = window.setInterval(() => {
        setWaveHeights(Array(24).fill(0).map(() => Math.floor(Math.random() * 85) + 15));
      }, 100);
    } else {
      if (waveIntervalRef.current) {
        clearInterval(waveIntervalRef.current);
      }
      setWaveHeights(Array(24).fill(12));
    }

    return () => {
      if (waveIntervalRef.current) {
        clearInterval(waveIntervalRef.current);
      }
    };
  }, [isPlaying, isSpeakingTts]);

  // Text to Speech (SpeechSynthesis) logic with simulated progress timer
  const togglePlayTts = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert(isAr ? 'ميزة النطق الصوتي غير مدعومة في متصفحك الحالي.' : 'Text-to-Speech is not supported in this browser.');
      return;
    }

    if (isSpeakingTts) {
      stopTts();
      return;
    }

    // Stop HTML5 Audio if playing
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    const transcript = isAr ? activePodcast?.transcriptAr : activePodcast?.transcriptEn;
    if (!transcript) return;

    window.speechSynthesis.cancel(); // Clear any running speech

    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.lang = isAr ? 'ar-EG' : 'en-US';
    utterance.rate = ttsSpeed;
    
    // Try to get a professional narrator voice
    const availableVoices = window.speechSynthesis.getVoices();
    const langPrefix = isAr ? 'ar' : 'en';
    const targetVoice = availableVoices.find(v => v.lang.startsWith(langPrefix) && v.name.toLowerCase().includes('male')) ||
                        availableVoices.find(v => v.lang.startsWith(langPrefix));
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    // Calculate simulated timeline duration
    const wordCount = transcript.split(/\s+/).length;
    // Reading speed approx 2.5 words/sec at 1x speed
    const estimatedDuration = Math.max(10, Math.ceil(wordCount / (2.5 * ttsSpeed)));
    setTtsDuration(estimatedDuration);
    setTtsCurrentTime(0);

    utterance.onend = () => {
      stopTts();
    };

    utterance.onerror = () => {
      stopTts();
    };

    ttsUtteranceRef.current = utterance;
    setIsSpeakingTts(true);
    window.speechSynthesis.speak(utterance);

    // Start progress timer
    if (ttsTimerRef.current) clearInterval(ttsTimerRef.current);
    ttsTimerRef.current = window.setInterval(() => {
      setTtsCurrentTime(prev => {
        if (prev >= estimatedDuration - 1) {
          if (ttsTimerRef.current) clearInterval(ttsTimerRef.current);
          return estimatedDuration;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopTts = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingTts(false);
    if (ttsTimerRef.current) {
      clearInterval(ttsTimerRef.current);
      ttsTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopTts();
    };
  }, []);

  // Filter and search podcasts
  const filteredPodcasts = podcasts.filter(pod => {
    const title = isAr ? pod.titleAr : pod.titleEn;
    const matchesQuery = title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === 'audio') {
      return matchesQuery && !!pod.audioUrl;
    }
    if (filterType === 'text') {
      return matchesQuery && (!!pod.transcriptAr || !!pod.transcriptEn);
    }
    return matchesQuery;
  });

  // Format second into readable MM:SS
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Find linked article details
  const linkedArticle = activePodcast ? allArticles.find(a => a.id === activePodcast.articleId) : null;

  return (
    <div className="bg-zinc-950 border-2 border-amber-800 p-6 md:p-10 shadow-2xl relative text-right rtl:text-right ltr:text-left text-white" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      
      {/* Hidden native audio element */}
      {activePodcast?.audioUrl && (
        <audio
          ref={audioRef}
          src={activePodcast.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />
      )}

      {/* Broadcast header badges */}
      <div className={`absolute top-4 ${isAr ? 'left-6' : 'right-6'} hidden sm:flex items-center gap-3 text-xs font-mono select-none`}>
        <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-amber-500">
          <Radio size={12} className="animate-pulse" />
          <span>96.5 FM BROADCAST</span>
        </span>
        <span className={`flex items-center gap-1.5 border px-3 py-1 rounded ${isPlaying || isSpeakingTts ? 'border-red-600 bg-red-950/80 text-red-200' : 'border-zinc-800 bg-zinc-900 text-zinc-400'}`}>
          <span className={`w-2 h-2 rounded-full ${isPlaying || isSpeakingTts ? 'bg-red-500 animate-ping' : 'bg-zinc-500'}`}></span>
          <span>{isPlaying || isSpeakingTts ? (isAr ? 'مباشر على الهواء' : 'ON AIR') : (isAr ? 'تأهب الاستوديو' : 'STANDBY')}</span>
        </span>
      </div>

      {/* Title block */}
      <div className="space-y-3 mb-8 border-b border-zinc-850 pb-5 pt-4">
        <div className="flex items-center gap-2 text-amber-500 text-xs font-mono uppercase tracking-widest">
          <Mic size={14} />
          <span>{isAr ? 'منصة الاستوديو والبودكاست الاستقصائي' : 'AL-WARRAQ PODCAST STUDIO // BEIRUT BROADCAST'}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          {isAr ? 'ديوان تحريات الورّاق الإذاعي' : 'Al-Warraq Audio Investigation Unit'}
        </h2>
        <p className="text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed">
          {isAr 
            ? 'بث استقصائي تفاعلي يستعرض التحليلات الأمنية، كواليس الاتفاقيات، وتقارير الشارع اللبناني عبر البث الرقمي والنصوص المفرغة المعززة.'
            : 'Interactive investigative broadcast presenting security analyses, diplomatic backrooms, and Lebanese street dispatches via digital stream and transcripts.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Episode directory & Filters (Lg: 4 columns) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="border border-zinc-800 bg-zinc-900/40 p-4 rounded-none space-y-3.5">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
              {isAr ? '● الفهرس الإذاعي للبودكاست' : '● Broadcast Episode Directory'}
            </span>
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={isAr ? 'ابحث في الحلقات المتاحة...' : 'Search episodes...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-xs p-2.5 pr-8 pl-3 outline-none focus:border-amber-600 font-sans text-white placeholder-zinc-600 rounded-none"
              />
              <Search className={`absolute top-3 ${isAr ? 'left-2.5' : 'right-2.5'} text-zinc-600`} size={14} />
            </div>

            {/* Filter buttons */}
            <div className="flex border border-zinc-800 p-0.5 bg-zinc-950 select-none">
              <button
                onClick={() => setFilterType('all')}
                className={`flex-1 py-1.5 text-[9px] font-mono uppercase font-black tracking-wider transition-colors ${filterType === 'all' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white bg-transparent'}`}
              >
                {isAr ? 'الكل' : 'All'}
              </button>
              <button
                onClick={() => setFilterType('audio')}
                className={`flex-1 py-1.5 text-[9px] font-mono uppercase font-black tracking-wider transition-colors ${filterType === 'audio' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white bg-transparent'}`}
              >
                {isAr ? 'صوت' : 'Audio'}
              </button>
              <button
                onClick={() => setFilterType('text')}
                className={`flex-1 py-1.5 text-[9px] font-mono uppercase font-black tracking-wider transition-colors ${filterType === 'text' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white bg-transparent'}`}
              >
                {isAr ? 'نص مفرغ' : 'Script'}
              </button>
            </div>
          </div>

          {/* Episode List */}
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {filteredPodcasts.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-zinc-850 p-4 text-zinc-500 font-mono text-xs">
                <AlertCircle className="mx-auto text-zinc-600 mb-1.5" size={18} />
                <span>{isAr ? 'لا توجد أي حلقات تطابق بحثك' : 'No episodes match filter criteria'}</span>
              </div>
            ) : (
              filteredPodcasts.map(pod => {
                const isActive = activePodcast?.id === pod.id;
                const hasAudio = !!pod.audioUrl;
                const hasText = !!pod.transcriptAr || !!pod.transcriptEn;

                return (
                  <div
                    key={pod.id}
                    onClick={() => setActivePodcast(pod)}
                    className={`border p-4 cursor-pointer transition-all select-none relative ${
                      isActive 
                        ? 'bg-zinc-900 border-amber-600 shadow-[2px_2px_12px_rgba(217,119,6,0.15)]' 
                        : 'bg-zinc-900/20 border-zinc-850 hover:bg-zinc-900/60 hover:border-zinc-700'
                    }`}
                  >
                    {/* Media Type indicator icons */}
                    <div className="flex gap-1.5 mb-1.5 text-[8px] font-mono font-bold">
                      {hasAudio && (
                        <span className="bg-amber-950/60 border border-amber-800 text-amber-400 px-1 py-0.5 rounded-sm flex items-center gap-0.5">
                          <Headphones size={8} /> AUDIO
                        </span>
                      )}
                      {hasText && (
                        <span className="bg-blue-950/60 border border-blue-800 text-blue-300 px-1 py-0.5 rounded-sm flex items-center gap-0.5">
                          <FileText size={8} /> SCRIPT
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-black leading-snug text-white group-hover:text-amber-400">
                      {isAr ? pod.titleAr : pod.titleEn}
                    </h4>

                    <div className="flex items-center gap-3 text-[9px] text-zinc-500 font-mono mt-2.5 pt-1.5 border-t border-zinc-900/60">
                      <span className="flex items-center gap-0.5">
                        <Calendar size={8} />
                        {new Date(pod.publishedAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' })}
                      </span>
                      <span>•</span>
                      <span>{isAr ? pod.publisherAr : pod.publisherEn}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right column: Selected Active Episode Workbench & Player (Lg: 8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          {activePodcast ? (
            <div className="space-y-6">
              
              {/* Active Episode Header */}
              <div className="bg-zinc-900 border border-zinc-850 p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
                
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-widest block">
                    {isAr ? '● الحلقة النشطة قيد المراجعة والاستماع' : '● ACTIVE INVESTIGATIVE LOG'}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                    {isAr ? activePodcast.titleAr : activePodcast.titleEn}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xxs font-mono text-zinc-400 pt-1.5">
                    <span>{isAr ? 'بواسطة:' : 'By:'} <strong className="text-zinc-200">{isAr ? activePodcast.publisherAr : activePodcast.publisherEn}</strong></span>
                    <span>•</span>
                    <span>{isAr ? 'تاريخ النشر:' : 'Published:'} <strong className="text-zinc-200">{new Date(activePodcast.publishedAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')}</strong></span>
                  </div>
                </div>

                {/* Secure linkage to story - NO IMAGES */}
                {linkedArticle && (
                  <div 
                    onClick={() => onSelectArticle?.(linkedArticle)}
                    className="mt-4 p-3 border border-dashed border-zinc-700 bg-zinc-950/60 flex items-center justify-between gap-3 cursor-pointer hover:border-amber-500 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen size={14} className="text-amber-500 animate-pulse shrink-0" />
                      <div className="text-left rtl:text-right text-xs">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">{isAr ? 'التقرير العسكري المتكامل المرتبط' : 'LINKED MILITARY REPORT REGISTERED'}</span>
                        <span className="font-extrabold text-zinc-300 truncate max-w-sm block">
                          {isAr ? linkedArticle.titleAr : linkedArticle.titleEn}
                        </span>
                      </div>
                    </div>
                    {isAr ? <ChevronLeft size={14} className="text-zinc-500" /> : <ChevronRight size={14} className="text-zinc-500" />}
                  </div>
                )}
              </div>

              {/* SECTION: AUDIO PLAYER DECK */}
              {activePodcast && (
                <div className="border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
                  <div className="flex flex-wrap gap-4 justify-between items-center border-b border-zinc-850 pb-3">
                    <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Headphones size={12} />
                      {isAr ? 'لوحة التحكم الصوتي والتردد الإذاعي' : 'AUDIO MASTER CONTROL PANEL'}
                    </span>
                    
                    {/* Audio Mode Selectors */}
                    <div className="flex border border-zinc-800 p-0.5 bg-zinc-950 select-none">
                      <button
                        type="button"
                        onClick={() => {
                          if (isPlaying) {
                            audioRef.current?.pause();
                            setIsPlaying(false);
                          }
                          setAudioMode('tts');
                        }}
                        className={`px-3 py-1 text-[9px] font-mono uppercase font-black tracking-wider transition-all flex items-center gap-1 ${
                          audioMode === 'tts' ? 'bg-amber-500 text-zinc-950 font-black' : 'text-zinc-400 hover:text-white bg-transparent'
                        }`}
                      >
                        <Mic size={10} />
                        <span>{isAr ? '🎙️ مذيع الذكاء الاصطناعي (نطق بشري)' : '🎙️ AI Voice Anchor'}</span>
                      </button>
                      {activePodcast.audioUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            stopTts();
                            setAudioMode('stream');
                          }}
                          className={`px-3 py-1 text-[9px] font-mono uppercase font-black tracking-wider transition-all flex items-center gap-1 ${
                            audioMode === 'stream' ? 'bg-amber-500 text-zinc-950 font-black' : 'text-zinc-400 hover:text-white bg-transparent'
                          }`}
                        >
                          <Radio size={10} />
                          <span>{isAr ? '📻 البث الصوتي / الموسيقي' : '📻 Ambient Audio Stream'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    
                    {/* Animated Waveform simulated bars (Md: 4 cols) */}
                    <div className="md:col-span-4 bg-zinc-950 border border-zinc-850 h-24 p-4 flex flex-col justify-between relative overflow-hidden">
                      <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 uppercase">
                        <span>{isAr ? 'محلل المدى الصوتي' : 'Spectrum Analyzer'}</span>
                        <span className="text-amber-500">{(audioMode === 'tts' ? isSpeakingTts : isPlaying) ? 'LIVE' : 'STANDBY'}</span>
                      </div>
                      
                      {/* Vertical bars */}
                      <div className="flex items-end justify-between h-10 px-1">
                        {waveHeights.map((h, idx) => (
                          <div
                            key={idx}
                            style={{ height: `${h}%` }}
                            className={`w-[2.5px] rounded-t-sm transition-all duration-100 ${
                              (audioMode === 'tts' ? isSpeakingTts : isPlaying) ? 'bg-amber-500' : 'bg-zinc-800'
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-[9px] font-mono text-zinc-400">
                        <span className="text-amber-500 font-extrabold">
                          {formatTime(audioMode === 'tts' ? ttsCurrentTime : currentTime)}
                        </span>
                        <span>
                          {formatTime(audioMode === 'tts' ? ttsDuration : duration)}
                        </span>
                      </div>
                    </div>

                    {/* Controller and sliders (Md: 8 cols) */}
                    <div className="md:col-span-8 space-y-3.5">
                      
                      {/* Playback Progress seeker slider */}
                      <div className="space-y-1">
                        <input
                          type="range"
                          min={0}
                          max={(audioMode === 'tts' ? ttsDuration : duration) || 0}
                          value={audioMode === 'tts' ? ttsCurrentTime : currentTime}
                          onChange={handleSeek}
                          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                      </div>

                      {/* Control buttons & volume row */}
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        
                        {/* Play speed and main play */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (audioMode === 'tts') {
                                togglePlayTts();
                              } else {
                                togglePlayAudio();
                              }
                            }}
                            className={`py-2 px-5 flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-all border border-black shadow-[2px_2px_0_0_rgba(255,255,255,1)] active:translate-y-0.5 active:shadow-none hover:shadow-none cursor-pointer ${
                              (audioMode === 'tts' ? isSpeakingTts : isPlaying) ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-white'
                            }`}
                          >
                            {(audioMode === 'tts' ? isSpeakingTts : isPlaying) ? <Pause size={12} className="fill-current" /> : <Play size={12} className="fill-current" />}
                            <span>
                              {(audioMode === 'tts' ? isSpeakingTts : isPlaying) 
                                ? (isAr ? 'إيقاف مؤقت' : 'PAUSE') 
                                : (audioMode === 'tts' 
                                    ? (isAr ? '🎙️ تشغيل بصوت بشري' : '🎙️ PLAY VOICE STATEMENT') 
                                    : (isAr ? '📻 تشغيل البث' : '📻 PLAY STREAM'))}
                            </span>
                          </button>

                          {/* Quick reset */}
                          <button
                            onClick={() => {
                              if (audioMode === 'tts') {
                                setTtsCurrentTime(0);
                                if (isSpeakingTts) {
                                  stopTts();
                                  setTimeout(togglePlayTts, 50);
                                }
                              } else {
                                if (audioRef.current) audioRef.current.currentTime = 0;
                              }
                            }}
                            className="p-2 border border-zinc-700 bg-zinc-800 hover:border-amber-500 text-zinc-400 hover:text-white cursor-pointer"
                            title={isAr ? 'إعادة البداية' : 'Rewind to start'}
                          >
                            <RotateCcw size={12} />
                          </button>
                        </div>

                        {/* Play speed chooser */}
                        <div className="flex items-center gap-1 border border-zinc-800 bg-zinc-950 p-0.5 text-[9px] font-mono">
                          { [1, 1.25, 1.5, 2].map(speed => (
                            <button
                              key={speed}
                              onClick={() => {
                                if (audioMode === 'tts') {
                                  setTtsSpeed(speed);
                                  if (isSpeakingTts) {
                                    stopTts();
                                    setTimeout(togglePlayTts, 50);
                                  }
                                } else {
                                  handleSpeedChange(speed);
                                }
                              }}
                              className={`px-1.5 py-0.5 ${
                                (audioMode === 'tts' ? ttsSpeed === speed : playbackRate === speed) 
                                  ? 'bg-amber-500 text-zinc-950 font-black' 
                                  : 'text-zinc-400 hover:text-white'
                              }`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </div>

                        {/* Mute and volume slider */}
                        <div className="flex items-center gap-2 text-zinc-400">
                          <button onClick={toggleMute} className="hover:text-white cursor-pointer">
                            {isMuted ? <VolumeX size={14} className="text-red-500" /> : <Volume2 size={14} />}
                          </button>
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-16 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                          />
                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              )}

              {/* SECTION: WRITTEN TRANSCRIPT & TEXT DOSSIER ASSIST */}
              {(activePodcast.transcriptAr || activePodcast.transcriptEn) ? (
                <div className="border border-zinc-800 bg-zinc-900/30 p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-zinc-850 pb-2">
                    <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1">
                      <FileText size={12} />
                      {isAr ? 'النص الكامل المفرغ وقارئ الذكاء الاصطناعي' : 'TRANSCRIPT ARCHIVE & VOICE ASSISTANT'}
                    </span>
                    
                    {/* Speech Assistant button using Web Speech synthesis */}
                    <div className="flex items-center gap-2">
                      {isSpeakingTts && (
                        <div className="flex items-center gap-1 border border-zinc-800 bg-zinc-950 p-0.5 text-[9px] font-mono">
                          {[1, 1.25, 1.5].map(s => (
                            <button
                              key={s}
                              onClick={() => { setTtsSpeed(s); if (isSpeakingTts) { stopTts(); setTimeout(togglePlayTts, 50); } }}
                              className={`px-1 py-0.5 ${ttsSpeed === s ? 'bg-amber-500 text-zinc-950 font-black' : 'text-zinc-400'}`}
                            >
                              {s}x
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <button
                        onClick={togglePlayTts}
                        className={`px-3 py-1 border border-zinc-700 text-[10px] font-mono uppercase font-black tracking-wider transition-colors cursor-pointer flex items-center gap-1 ${
                          isSpeakingTts ? 'bg-red-900 border-red-700 text-white animate-pulse' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                        }`}
                        title={isAr ? 'نطق النص بالصوت الآلي' : 'Listen to computer voice'}
                      >
                        {isSpeakingTts ? <Pause size={10} /> : <Play size={10} />}
                        <span>{isSpeakingTts ? (isAr ? 'إيقاف المذيع الآلي' : 'STOP NARRATOR') : (isAr ? '🎙️ استمع للمذيع الآلي' : '🎙️ TTS READER')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Archival text display block */}
                  <div className="bg-zinc-950/60 p-5 border border-zinc-850 relative text-justify font-sans">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02]" />
                    
                    <div className="relative z-10 leading-relaxed text-zinc-300 text-sm md:text-base space-y-3 font-serif">
                      {isAr ? (
                        activePodcast.transcriptAr ? (
                          <p className="whitespace-pre-wrap">{activePodcast.transcriptAr}</p>
                        ) : (
                          <p className="italic text-zinc-500 text-xs text-center">{isAr ? 'هذا التقرير لا يتوفر بنسخة نصية عربية مفرغة.' : 'This transcript is not available in Arabic.'}</p>
                        )
                      ) : (
                        activePodcast.transcriptEn ? (
                          <p className="whitespace-pre-wrap leading-relaxed">{activePodcast.transcriptEn}</p>
                        ) : (
                          <p className="italic text-zinc-500 text-xs text-center">{isAr ? 'هذا التقرير لا يتوفر بنسخة نصية إنجليزية مفرغة.' : 'This transcript is not available in English.'}</p>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                    <span>{isAr ? 'تصنيف المخطوط: تحريات الوراق سرية للغاية' : 'CLASSIFICATION: AL-WARRAQ CLASSIFIED DOCUMENT'}</span>
                    <button
                      onClick={() => {
                        const content = `${isAr ? activePodcast.titleAr : activePodcast.titleEn}\n\n${isAr ? activePodcast.transcriptAr : activePodcast.transcriptEn}`;
                        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `alwarraq-transcript-${activePodcast.id}-${isAr ? 'ar' : 'en'}.txt`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                      }}
                      className="hover:text-amber-500 flex items-center gap-1 cursor-pointer transition-colors"
                      title={isAr ? 'تحميل النص كملف TXT' : 'Download transcript'}
                    >
                      <Download size={10} />
                      <span>{isAr ? 'تحميل النص (.TXT)' : 'Download Script (.TXT)'}</span>
                    </button>
                  </div>

                </div>
              ) : null}

            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-zinc-800 p-8 text-zinc-500">
              <Headphones className="mx-auto text-zinc-700 mb-2" size={32} />
              <p>{isAr ? 'الرجاء اختيار حلقة بودكاست من الفهرس للبدء.' : 'Please select an episode from the broadcast directory.'}</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
