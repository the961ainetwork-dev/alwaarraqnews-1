import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Mic, Radio, Sliders, ChevronRight, ChevronLeft, Globe, HelpCircle, FileText, Download } from 'lucide-react';

interface AlWarraqPodcastProps {
  language: 'ar' | 'en';
}

interface ScriptSegment {
  title: string;
  text: string;
}

const podcastScriptAr: ScriptSegment[] = [
  {
    title: "مقدمة التقرير",
    text: "تقرير استقصائي خاص من بيروت. بعد مرور أيام قليلة على توقيع الاتفاق الإطاري الثلاثي في واشنطن في السادس والعشرين من حزيران عام ألفين وستة وعشرين بين لبنان وإسرائيل برعاية أمريكية، يترقب الشارع اللبناني والأوساط العسكرية ما إذا كان هذا الأسبوع سيحمل أولى علامات الترجمة الميدانية للاتفاق عبر انسحاب القوات الإسرائيلية من نقاط محددة. إلا أن المؤشرات الميدانية والتسريبات الدبلوماسية المرافقة لاجتماعات آلية التنسيق تكشف عن عقبات حرجة قد تحول الاختبار الأول إلى مواجهة سياسية وعسكرية معقدة."
  },
  {
    title: "خلفية المشهد",
    text: "خلفية المشهد: معادلة الأمن مقابل الانسحاب. تأسس اتفاق السادس والعشرين من حزيران الإطاري على بند جوهري يربط الانسحاب التدريجي لجيش الاحتلال الإسرائيلي من الأراضي التي توغل فيها خلال العمليات الأخيرة، ببسط الجيش اللبناني سيادته الكاملة وتفكيك البنية التحتية العسكرية للمجموعات المسلحة غير النظامية."
  },
  {
    title: "المناطق التجريبية",
    text: "وفقاً للملحق الأمني السري للاتفاق، جرى التوافق على إطلاق ما يعرف بالمناطق التجريبية كآلية اختبار أولى لتقييم جدية الترتيبات الأمنية قبل الانتقال إلى مراحل الانسحاب الشامل نحو الحدود الدولية."
  },
  {
    title: "العقبة الراهنة",
    text: "العقبة الراهنة: أعلنت هيئة البث الإسرائيلية الرسمية أن تل أبيب قررت تأجيل البدء في إخلاء هذه القرى هذا الأسبوع، مشترطةً التوصل أولاً إلى آلية رقابة مشتركة صارمة تشمل غرفة عمليات افتراضية بإشراف أمريكي تضمن خلو هذه المناطق مسبقاً من أي وجود مسلح، في حين يرفض الجيش اللبناني أي تنسيق عسكري مباشر مع تل أبيب ويشترط وقفاً كاملاً وشاملاً للغارات الجوية لبدء انتشاره."
  },
  {
    title: "جغرافية الاختبار",
    text: "جغرافية الاختبار: النقاط المستهدفة بالانسحاب ومواقعها الحاكمة. حددت المباحثات العسكرية الأولية منطقتين أساسيتين لبدء المرحلة التجريبية، تقعان خارج نطاق ما يسمى الخط الأصفر الذي تحاول إسرائيل تكريسه كحزام أمني مؤقت."
  },
  {
    title: "النقطة الأولى: زوطر الغربية",
    text: "أولاً، زوطر الغربية في قضاء النبطية. تقع البلدة شمال نهر الليطاني، وتتميز بموقع حاكم يشرف مباشرة على المجرى الشمالي للنهر وعلى وادي الحجير الاستراتيجي. وتصنف التقارير الاستخبارية الإسرائيلية زوطر الغربية كواحدة من أهم خطوط الإمداد اللوجستي والعملياتي تاريخياً نحو عمق القطاع الأوسط. وتتواجد في هذه البلدة حالياً وحدات ومدرعات إسرائيلية يتعين عليها الانسحاب وإخلاء مواقعها بموجب الترتيبات المقترحة."
  },
  {
    title: "النقطة الثانية: فرون",
    text: "ثانياً، بلدة فرون في قضاء بنت جبيل. تقع بلدة فرون جنوب نهر الليطاني، وتتمتع بتموضع جغرافي يشرف على محاور قتالية ونقاط تماس متعددة بين القطاعين الأوسط والغربي. تخلو فرون حالياً من أي وجود عسكري إسرائيلي مباشر، وترغب تل أبيب في تحويلها إلى مختبر ميداني مكشوف لمراقبة مدى قدرة وصلاحية وحدات الجيش اللبناني في منع أي مظاهر مسلحة مسبقاً."
  },
  {
    title: "سيناريوهات الأسبوع الحالي",
    text: "سيناريوهات الأسبوع الحالي: مراوغة أم مأزق تطبيقي؟ التحقيقات الميدانية تشير إلى أن فرع المعطيات السياسية ينقسم إلى اتجاهين يعرقلان حدوث الانسحاب الفعلي: الشروط الإسرائيلية المسبقة لنتنياهو بأن لا انسحاب دون نزع السلاح، والانقسام الداخلي اللبناني حيث يواجه الاتفاق معارضة شرسة من حزب الله وحلفائه، بالتزامن مع إشارات إيرانية تفيد برفض طهران تسوية نهائية تفصل لبنان عن جنيف."
  },
  {
    title: "الخلاصة الاستقصائية",
    text: "الخلاصة الاستقصائية. عملياً، يقع اتفاق واشنطن هذا الأسبوع في المنطقة الرمادية؛ فالخرائط جاهزة والنقاط محددة بدقة، لكن قرار الانسحاب الإسرائيلي بات رهينة صراع الإرادات حول من يبدأ أولاً: انتشار الجيش اللبناني وتفكيك البنية التحتية المسلحة، أم وقف العمليات الحربية الإسرائيلية والانسحاب العسكري الشامل. وبناءً على المعطيات الحالية، فإن التراجع الإسرائيلي عن التنفيذ الفوري يرجّح بقاء التعبئة الميدانية على حالها طيلة الأيام المقبلة بانتظار بلورة آلية الرقابة الثلاثية."
  }
];

const podcastScriptEn: ScriptSegment[] = [
  {
    title: "Report Introduction",
    text: "Special investigative report from Beirut. A few days after the signing of the trilateral Framework Agreement in Washington on June twenty-sixth, twenty twenty-six, between Lebanon and Israel under US mediation, the Lebanese street and military circles are closely watching whether this week will carry the first signs of practical translation of the agreement through the withdrawal of Israeli forces from specific points. However, field indicators and diplomatic leaks accompanying the meetings of the coordination mechanism reveal critical obstacles that may turn the first test into a complex political and military confrontation."
  },
  {
    title: "Background Context",
    text: "Background Context: The Security for Withdrawal Equation. The June twenty-sixth framework agreement was established on a fundamental clause linking the gradual withdrawal of the Israeli occupation army from the lands it encroached upon during recent operations, to the Lebanese Armed Forces asserting full sovereign authority and disarming non-state armed groups."
  },
  {
    title: "Pilot Zones",
    text: "According to the secret security annex of the agreement, it was agreed to launch what is known as Pilot Zones as a first testing mechanism to evaluate the seriousness of security arrangements before moving to the phases of full-scale withdrawal towards international borders."
  },
  {
    title: "The Current Obstacle",
    text: "The Current Obstacle: The official Israeli Broadcasting Corporation announced that Tel Aviv decided to postpone the start of evacuating these villages this week, conditioning it on first reaching a strict joint monitoring mechanism. Meanwhile, the Lebanese Army rejects direct military coordination with Tel Aviv and conditions a complete cessation of air raids to begin its deployment."
  },
  {
    title: "Geography of the Test",
    text: "Geography of the Test: Targeted Withdrawal Points and Strategic Coordinates. Initial military talks identified two primary areas to launch the pilot phase, located outside the scope of the so-called Yellow Line that Israel is trying to establish as a temporary security belt."
  },
  {
    title: "Point 1: Zoutar al-Gharbiyyeh",
    text: "First, Zoutar al-Gharbiyyeh in the Nabatiyeh District. Located north of the Litani River, commanding a panoramic view directly overlooking the northern course of the river and the strategic Wadi al-Hujair. Currently, Israeli units and armor are located in this town and are slated to withdraw under the proposed arrangements."
  },
  {
    title: "Point 2: Froun",
    text: "Second, Froun in the Bint Jbeil District. Located south of the Litani River, overseeing multiple combat axes between the central and western sectors. Froun is currently free of direct Israeli military presence on the ground, which explains its selection by Tel Aviv as an exposed field laboratory."
  },
  {
    title: "Current Week Scenarios",
    text: "Current Week Scenarios: Tactical Maneuver or Implementation Deadlock? Field intelligence indicates that the political spectrum is split into two obstructing paths: Preemptive Israeli Conditions by Netanyahu, and Internal Lebanese Fracture with Hezbollah's fierce opposition."
  },
  {
    title: "Investigative Summary",
    text: "Investigative Summary. Practically, the Washington Agreement is suspended in a gray zone this week; coordinates are precise, but the withdrawal remains hostage to a battle of wills over who begins first: the LAF's deployment or the complete cessation of Israeli military operations."
  }
];

export const AlWarraqPodcast: React.FC<AlWarraqPodcastProps> = ({ language }) => {
  const isAr = language === 'ar';
  const script = isAr ? podcastScriptAr : podcastScriptEn;

  // Audio Playback States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(0.85); // Male news anchor has lower pitch (0.8 - 0.9)
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isSynthesizedHumOn, setIsSynthesizedHumOn] = useState(true);

  // Web Speech API Voice Settings
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  
  // Waveform visualization bars
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(36).fill(15));
  const waveTimerRef = useRef<number | null>(null);

  // Audio Context for Ambient Shortwave Hum & Beeps
  const audioCtxRef = useRef<AudioContext | null>(null);
  const staticNodeRef = useRef<BiquadFilterNode | null>(null);
  const humGainRef = useRef<GainNode | null>(null);

  // Speech Synth Utterance Ref
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Fetch available speech synthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const updateVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);

        // Try to automatically choose an appropriate Arabic/English male voice
        const targetLang = isAr ? 'ar' : 'en';
        const filtered = availableVoices.filter(v => v.lang.startsWith(targetLang));
        
        // Prefer names that sound like professional anchors or standard male
        let chosen = filtered.find(v => 
          v.name.toLowerCase().includes('male') || 
          v.name.toLowerCase().includes('google') || 
          v.name.toLowerCase().includes('premium') || 
          v.name.toLowerCase().includes('natural')
        ) || filtered[0];

        if (chosen) {
          setSelectedVoiceName(chosen.name);
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, [isAr]);

  // Audio waveform animation loop when playing
  useEffect(() => {
    if (isPlaying) {
      waveTimerRef.current = window.setInterval(() => {
        setWaveHeights(prev => prev.map(() => Math.floor(Math.random() * 65) + 10));
      }, 90);
    } else {
      if (waveTimerRef.current) {
        clearInterval(waveTimerRef.current);
      }
      setWaveHeights(Array(36).fill(15));
    }
    return () => {
      if (waveTimerRef.current) clearInterval(waveTimerRef.current);
    };
  }, [isPlaying]);

  // Audio Hum Generator (Web Audio API)
  const startHum = () => {
    try {
      if (!isSynthesizedHumOn || isMuted) {
        stopHum();
        return;
      }
      
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }

      const ctx = audioCtxRef.current;
      if (!ctx) return;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // 1. Create low-frequency hum (60Hz radio oscillator)
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 60; // Deep hum

      // 2. Create micro bandpass filter for telephone/shortwave voice warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 180;
      filter.Q.value = 1.0;

      // 3. Ambient static white noise generator
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1000;
      noiseFilter.Q.value = 0.5;

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.006; // Ultra subtle static

      const humGain = ctx.createGain();
      humGain.gain.value = volume * 0.08; // Subtle hum

      // Connect Hum
      osc.connect(filter);
      filter.connect(humGain);
      humGain.connect(ctx.destination);

      // Connect Static
      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      // Keep references to stop them
      osc.start();
      whiteNoise.start();

      (osc as any).custom_stop = () => {
        try { osc.stop(); } catch(e) {}
      };
      (whiteNoise as any).custom_stop = () => {
        try { whiteNoise.stop(); } catch(e) {}
      };

      (ctx as any).osc = osc;
      (ctx as any).whiteNoise = whiteNoise;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked", e);
    }
  };

  const stopHum = () => {
    try {
      const ctx = audioCtxRef.current;
      if (ctx) {
        if ((ctx as any).osc) (ctx as any).osc.custom_stop();
        if ((ctx as any).whiteNoise) (ctx as any).whiteNoise.custom_stop();
      }
    } catch(e) {}
  };

  // Synchronize Hum volume and state
  useEffect(() => {
    if (isPlaying && isSynthesizedHumOn && !isMuted) {
      startHum();
    } else {
      stopHum();
    }
    return () => stopHum();
  }, [isPlaying, isSynthesizedHumOn, isMuted, volume]);

  // Handle Playback State
  const playCurrentSegment = (idx: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const segmentText = script[idx].text;
    const utterance = new SpeechSynthesisUtterance(segmentText);
    utteranceRef.current = utterance;

    // Pick chosen voice
    if (selectedVoiceName) {
      const voiceObj = voices.find(v => v.name === selectedVoiceName);
      if (voiceObj) utterance.voice = voiceObj;
    } else {
      // Automatic fallback search
      const targetLang = isAr ? 'ar' : 'en';
      const fallbackVoice = voices.find(v => v.lang.startsWith(targetLang));
      if (fallbackVoice) utterance.voice = fallbackVoice;
    }

    // Anchor Voice properties
    utterance.rate = playbackSpeed;
    utterance.pitch = pitch; // 0.85 gives an elegant mature baritone news voice
    utterance.volume = isMuted ? 0 : volume;

    utterance.onend = () => {
      if (idx + 1 < script.length) {
        setCurrentIdx(idx + 1);
        playCurrentSegment(idx + 1);
      } else {
        setIsPlaying(false);
        setCurrentIdx(0);
        stopHum();
      }
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error", e);
      // Simulate progress fallback if Speech API is blocked or errored
      if (isPlaying) {
        const timer = setTimeout(() => {
          if (idx + 1 < script.length) {
            setCurrentIdx(idx + 1);
            playCurrentSegment(idx + 1);
          } else {
            setIsPlaying(false);
            setCurrentIdx(0);
          }
        }, 12000 / playbackSpeed); // approximate segment duration
        return () => clearTimeout(timer);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleTogglePlay = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      stopHum();
    } else {
      setIsPlaying(true);
      // Play brief studio cue tone beep (330Hz, 150ms)
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(330, ctx.currentTime); // Professional Radio Studio Ping
          gain.gain.setValueAtTime(0.08 * volume, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.4);
        }
      } catch (e) {}

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        playCurrentSegment(currentIdx);
      }
    }
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setCurrentIdx(0);
    stopHum();
  };

  const handleSelectSegment = (idx: number) => {
    setCurrentIdx(idx);
    if (isPlaying) {
      playCurrentSegment(idx);
    }
  };

  // Clean speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Trigger download of written podcast transcript as TXT
  const handleDownloadTranscript = () => {
    const title = isAr 
      ? 'تحقيق الورّاق الاستقصائي - البث الإذاعي والتقرير الكامل'
      : 'Al-Warraq Investigative Brief - Broadcast Transcript';
    
    let content = `${title}\n`;
    content += `==============================================\n`;
    content += isAr ? 'ملف البث: التقرير الاستقصائي لملف الجنوب والاتفاق الإطاري\n\n' : 'Broadcast File: South Lebanon Pilot Zones Investigative Report\n\n';
    
    script.forEach((s, idx) => {
      content += `[${idx + 1}] ${s.title}\n`;
      content += `${s.text}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `alwarraq-broadcast-intel-2026-${isAr ? 'ar' : 'en'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-zinc-950 border-2 border-amber-800 p-4 md:p-6 shadow-xl relative text-right rtl:text-right ltr:text-left" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      
      {/* Absolute FM Broadcast / Studio Indicators */}
      <div className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} flex items-center gap-3 font-mono text-[9px] font-black tracking-wider text-zinc-500`}>
        <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-amber-500">
          <Radio size={10} className="animate-pulse" />
          <span>96.5 FM BROADCAST</span>
        </span>
        <span className={`flex items-center gap-1 border px-2 py-0.5 rounded ${isPlaying ? 'border-red-600 bg-red-950 text-red-400' : 'border-zinc-800 bg-zinc-900 text-zinc-500'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-red-500 animate-ping' : 'bg-zinc-600'}`}></span>
          <span>{isPlaying ? (isAr ? 'مباشر على الهواء' : 'ON AIR') : (isAr ? 'تأهب الاستوديو' : 'STANDBY')}</span>
        </span>
      </div>

      {/* Main Studio Title Block */}
      <div className="space-y-1 mb-6 border-b border-zinc-900 pb-4 pr-1.5">
        <div className="flex items-center gap-2 text-amber-500 font-mono text-[10px] font-bold uppercase">
          <Mic size={14} className="text-amber-500" />
          <span>{isAr ? 'منصة الاستوديو والبودكاست الاستقصائي' : 'AL-WARRAQ PODCAST STUDIO // BEIRUT BROADCAST'}</span>
        </div>
        <h2 className="text-lg md:text-xl font-sans font-black text-white">
          {isAr ? 'ديوان تحريات الورّاق الإذاعي' : 'Al-Warraq Audio Investigation Unit'}
        </h2>
        <p className="text-[10px] md:text-xs text-zinc-400 max-w-xl font-mono">
          {isAr 
            ? 'بث صوتي مباشر يقرأ تفاصيل التقرير الاستقصائي لجنوب لبنان والمناطق التجريبية بنبرة إذاعية ذكورية وقورة.'
            : 'Audio news anchor reciting the investigative report on Southern Lebanon "Pilot Zones" in a structured, solemn male news voice.'}
        </p>
      </div>

      {/* Retro Transmitter Deck / Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-zinc-900/60 border border-zinc-850 p-4 md:p-6 shadow-inner rounded mb-6">
        
        {/* Left Column: Visual Tape & Waveform controls (Lg: 5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Audio Visualizer Waveform Panel */}
          <div className="bg-zinc-950 border-2 border-zinc-800 rounded p-4 flex flex-col justify-between h-36 relative overflow-hidden">
            <div className="flex justify-between items-center font-mono text-[8px] text-zinc-600 border-b border-zinc-900 pb-1.5">
              <span>{isAr ? 'التردد الصوتي / محلل المدى' : 'AUDIO SPECTRUM // BROADCAST MASTER'}</span>
              <span className="text-amber-500 font-bold">{isPlaying ? 'TRANSMITTING' : 'IDLE'}</span>
            </div>

            {/* Vertical Bar Visualizer */}
            <div className="flex items-end justify-between h-14 px-2">
              {waveHeights.map((h, idx) => (
                <div 
                  key={idx}
                  style={{ height: `${h}%` }}
                  className={`w-1 rounded-t transition-all duration-75 ${
                    isPlaying ? 'bg-amber-500' : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            {/* Simulated Tape Counter / Track Progress */}
            <div className="flex justify-between items-center font-mono text-[10px] text-zinc-400 mt-2 pt-1.5 border-t border-zinc-900">
              <span className="text-amber-400 font-bold">
                {String(currentIdx + 1).padStart(2, '0')} / {String(script.length).padStart(2, '0')}
              </span>
              <span className="text-zinc-600 text-[8px] tracking-widest uppercase">
                {isAr ? 'مدرج البث' : 'SEGMENT FEED'}
              </span>
              <span>
                {isPlaying ? (isAr ? 'نبرة رصينة' : 'ANCHOR MODE') : (isAr ? 'متوقف' : 'PAUSED')}
              </span>
            </div>
          </div>

          {/* Core Player Controls Row */}
          <div className="flex items-center justify-between gap-2 border border-zinc-800 bg-zinc-950 p-2.5 rounded shadow-sm">
            <button
              onClick={handleReset}
              className="p-2 border border-zinc-800 hover:border-amber-700 bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer rounded transition-all hover:translate-y-[-1px]"
              title={isAr ? 'إعادة التشغيل والبدء من الأول' : 'Reset to Beginning'}
            >
              <RotateCcw size={14} />
            </button>

            <button
              onClick={handleTogglePlay}
              className={`flex-1 py-2 px-4 flex items-center justify-center gap-2 cursor-pointer font-sans font-black text-xs uppercase tracking-wider transition-all hover:translate-y-[-1px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none border ${
                isPlaying 
                  ? 'bg-amber-600 border-amber-700 hover:bg-amber-700 text-zinc-950' 
                  : 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-amber-400'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause size={12} className="fill-current text-zinc-950" />
                  <span>{isAr ? 'إيقاف البث' : 'PAUSE BROADCAST'}</span>
                </>
              ) : (
                <>
                  <Play size={12} className="fill-current text-amber-400 animate-pulse" />
                  <span>{isAr ? 'بدء البث الإخباري' : 'START NEWSREEL'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 border border-zinc-800 hover:border-amber-700 bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer rounded transition-all hover:translate-y-[-1px]"
              title={isAr ? 'كتم الصوت' : 'Mute/Unmute'}
            >
              {isMuted ? <VolumeX size={14} className="text-red-500" /> : <Volume2 size={14} />}
            </button>
          </div>

          {/* Advanced Audio Synthesizer Toggles */}
          <div className="space-y-2 border border-zinc-800 bg-zinc-950 p-3 rounded font-mono text-[9px] text-zinc-400">
            <div className="flex justify-between items-center text-zinc-300 font-bold uppercase border-b border-zinc-900 pb-1.5">
              <span className="flex items-center gap-1 text-amber-500">
                <Sliders size={11} />
                <span>{isAr ? 'معالج الصوت اللاسلكي' : 'RADIO TRANSMITTER CONFIG'}</span>
              </span>
              <span>STUDIO B</span>
            </div>

            {/* Custom Voice Selection if multiple available */}
            {voices.length > 0 && (
              <div className="space-y-1">
                <label className="text-zinc-500 block">{isAr ? 'صوت المذيع المتاح:' : 'Available Narrator Voice:'}</label>
                <select
                  value={selectedVoiceName}
                  onChange={(e) => {
                    setSelectedVoiceName(e.target.value);
                    if (isPlaying) {
                      // Restart segment with new voice
                      setTimeout(() => playCurrentSegment(currentIdx), 50);
                    }
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 p-1 text-[9px] outline-none rounded"
                >
                  {voices
                    .filter(v => v.lang.startsWith(isAr ? 'ar' : 'en'))
                    .map(v => (
                      <option key={v.name} value={v.name}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* Ambient Noise / shortwave Hum switch */}
            <div className="flex justify-between items-center pt-1.5">
              <span>{isAr ? 'محاكاة همس التردد اللاسلكي السلبي:' : 'Simulated Shortwave Carrier Hum:'}</span>
              <button
                onClick={() => setIsSynthesizedHumOn(!isSynthesizedHumOn)}
                className={`px-2 py-0.5 border text-[8px] font-bold cursor-pointer rounded ${
                  isSynthesizedHumOn ? 'bg-amber-950 text-amber-400 border-amber-800' : 'bg-zinc-900 text-zinc-600 border-zinc-800'
                }`}
              >
                {isSynthesizedHumOn ? (isAr ? 'نشط' : 'ON') : (isAr ? 'معطل' : 'OFF')}
              </button>
            </div>

            {/* Pitch & Speed sliders */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>{isAr ? 'طبقة الصوت (وقار)' : 'Pitch'}</span>
                  <span className="text-amber-500 font-bold">{pitch}</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="1.5" 
                  step="0.05" 
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>{isAr ? 'سرعة الإلقاء' : 'Speed'}</span>
                  <span className="text-amber-500 font-bold">{playbackSpeed}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.75" 
                  max="1.5" 
                  step="0.05" 
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Script Teleprompter (Lg: 7 columns) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          
          {/* Script Scroll Container */}
          <div className="bg-zinc-950 border border-zinc-850 p-4 rounded h-96 overflow-y-auto space-y-4 custom-scrollbar">
            
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2 mb-2 font-mono text-[9px] text-zinc-500">
              <span className="uppercase">{isAr ? 'المخطط الإخباري للنشرة الإذاعية' : 'INTELLIGENCE BROADCAST TELEPROMPTER'}</span>
              <span>{isAr ? 'مزامنة حية' : 'LIVE SYNCED'}</span>
            </div>

            {script.map((seg, idx) => {
              const isActive = idx === currentIdx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectSegment(idx)}
                  className={`p-3 border-r-2 text-right rtl:text-right ltr:text-left transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-amber-950/40 border-amber-500 scale-[1.01] shadow-md shadow-amber-950/20' 
                      : 'border-transparent bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700'
                  }`}
                  style={{ direction: isAr ? 'rtl' : 'ltr' }}
                >
                  <div className="flex items-center gap-2 justify-start mb-1">
                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded font-black ${
                      isActive ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {idx + 1}
                    </span>
                    <h4 className={`text-xs font-black font-sans ${isActive ? 'text-amber-400' : 'text-zinc-300'}`}>
                      {seg.title}
                    </h4>
                  </div>
                  <p className={`text-xs font-serif leading-relaxed ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                    {seg.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions Footer */}
          <div className="flex items-center justify-between gap-3 bg-zinc-950 p-3 border border-zinc-800 rounded font-mono text-[10px] text-zinc-400">
            <span>
              {isAr ? 'وثيقة مفرج عنها للجمهور العام.' : 'Classified document cleared for public distribution.'}
            </span>
            <button
              onClick={handleDownloadTranscript}
              className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500 text-amber-500 hover:text-white cursor-pointer transition-all flex items-center gap-1.5 rounded uppercase font-bold"
            >
              <Download size={11} />
              <span>{isAr ? 'تحميل النص الكامل' : 'DOWNLOAD SCRIPT'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Broadcast Context and Informational Notes */}
      <div className="bg-amber-50/5 border border-amber-900/40 p-4 font-mono text-[10px] md:text-xs text-zinc-400 space-y-3 leading-relaxed">
        <h4 className="text-zinc-200 font-bold font-sans flex items-center gap-2">
          <HelpCircle size={14} className="text-amber-500" />
          <span>{isAr ? 'إرشادات الاستماع والبث الفني:' : 'Listening and Technical Broadcast Guide:'}</span>
        </h4>
        <ul className="list-disc list-inside space-y-1.5 pl-1 pr-1 text-right rtl:text-right ltr:text-left" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          <li>
            <strong>{isAr ? 'نبرة المذيع الإخبارية (وقار):' : 'Deep Anchor Pitch Tuning:'}</strong> 
            {isAr 
              ? ' تم دوزنة طبقة نبرة الصوت المرجعية إلى ٠.٨٥ لتحاكي إيقاع مذيعي نشرات الأخبار الكلاسيكيين.' 
              : ' The reference voice tone is pitched down to 0.85 to emulate classic news anchors.'}
          </li>
          <li>
            <strong>{isAr ? 'محاكاة النطاق اللاسلكي:' : 'Shortwave Transmission Emulation:'}</strong> 
            {isAr 
              ? ' يقوم معالج الصوت اللاسلكي بإصدار همس خفيف وتردد ستيني مدمج يحاكي طبيعة بث المحطات الاستقصائية.' 
              : ' Standard 60Hz shortwave carrier oscillator and atmospheric static are hummed dynamically when broadcasting is live.'}
          </li>
          <li>
            <strong>{isAr ? 'الملاحة والتنقل التفاعلي:' : 'Interactive Navigation Teleprompter:'}</strong> 
            {isAr 
              ? ' يمكنك النقر مباشرة على أي فقرة أو فقرة فرعية للانتقال إليها فوراً وتوجيه المذيع لقراءتها.' 
              : ' You can click any card in the teleprompter list to instantly skip the speech synthesiser to that location.'}
          </li>
        </ul>
      </div>

    </div>
  );
};
