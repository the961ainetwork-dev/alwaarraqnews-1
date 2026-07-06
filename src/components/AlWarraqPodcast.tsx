import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Mic, Radio, Sliders, ChevronRight, ChevronLeft, Globe, HelpCircle, FileText, Download } from 'lucide-react';

const WhatsAppIcon = ({ size = 18, className }: { size?: number; className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor"
    className={`inline-block ${className || ''}`}
  >
    <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.458 3.479 1.329 4.99L2 22l5.177-1.358c1.453.791 3.087 1.208 4.835 1.208 5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm5.792 13.918c-.244.685-1.22 1.251-1.688 1.323-.46.071-.94.13-2.956-.669-2.585-1.026-4.223-3.66-4.354-3.834-.131-.174-1.06-1.408-1.06-2.687 0-1.28.675-1.912.915-2.152.24-.24.523-.305.698-.305.174 0 .348.001.499.009.16.008.371-.06.581.444.218.523.743 1.808.808 1.939.066.131.11.284.022.46-.088.176-.132.285-.262.437-.131.153-.275.34-.393.456-.131.123-.269.256-.115.52.153.263.682 1.121 1.462 1.815.998.889 1.838 1.164 2.1 1.295.262.131.415.11.568-.066.153-.175.655-.764.83-1.026.175-.262.349-.219.589-.131.24.088 1.528.72 1.79.851.262.131.437.197.502.306.066.11.066.63-.178 1.315z" />
  </svg>
);

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

  // Real-time voice settings synchronizers to adjust pitch, speed, and volume without cutting/restarting
  useEffect(() => {
    if (utteranceRef.current) {
      try {
        utteranceRef.current.rate = playbackSpeed;
      } catch (e) {}
    }
  }, [playbackSpeed]);

  useEffect(() => {
    if (utteranceRef.current) {
      try {
        utteranceRef.current.pitch = pitch;
      } catch (e) {}
    }
  }, [pitch]);

  useEffect(() => {
    if (utteranceRef.current) {
      try {
        utteranceRef.current.volume = isMuted ? 0 : volume;
      } catch (e) {}
    }
  }, [volume, isMuted]);

  // Keep-alive interval for Chrome Speech Synthesis 15-second bug
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Handle Playback State
  const playCurrentSegment = (idx: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Clear event handlers of previous utterance to prevent race conditions during cancel()
    if (utteranceRef.current) {
      utteranceRef.current.onend = null;
      utteranceRef.current.onerror = null;
      utteranceRef.current.onstart = null;
    }
    window.speechSynthesis.cancel();

    // Tiny delay to let the speech engine clear its queue before we re-queue
    setTimeout(() => {
      // Clear active utterances array to prevent GC and leaks
      (window as any)._activeUtterances = [];

      const remainingSegments = script.slice(idx);
      remainingSegments.forEach((seg, relativeIdx) => {
        const segmentGlobalIdx = idx + relativeIdx;
        const utterance = new SpeechSynthesisUtterance(seg.text);

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

        // Prevent GC (Garbage Collection) cutoff in Chrome/Safari by holding global strong reference
        (window as any)._activeUtterances.push(utterance);

        utterance.onstart = () => {
          setCurrentIdx(segmentGlobalIdx);
          setIsPlaying(true);
          utteranceRef.current = utterance;
        };

        if (segmentGlobalIdx === script.length - 1) {
          utterance.onend = () => {
            setIsPlaying(false);
            setCurrentIdx(0);
            stopHum();
          };
        }

        utterance.onerror = (e) => {
          if (e.error === 'interrupted' || e.error === 'canceled') {
            return; // Normal cancellation, do not trigger error states
          }
          console.warn("Speech synthesis error", e);
        };

        window.speechSynthesis.speak(utterance);
      });
    }, 60);
  };

  const handleTogglePlay = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
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

      playCurrentSegment(currentIdx);
    }
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (utteranceRef.current) {
        utteranceRef.current.onend = null;
        utteranceRef.current.onerror = null;
        utteranceRef.current.onstart = null;
      }
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

  const handlePlayAll = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // Reset to index 0
    setCurrentIdx(0);
    setIsPlaying(true);

    // Play brief studio cue tone beep
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.1 * volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {}

    playCurrentSegment(0);
  };

  // Clean speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        if (utteranceRef.current) {
          utteranceRef.current.onend = null;
          utteranceRef.current.onerror = null;
          utteranceRef.current.onboundary = null;
        }
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
    <div className="bg-zinc-950 border-2 border-amber-800 p-6 md:p-10 shadow-2xl relative text-right rtl:text-right ltr:text-left font-['Cairo'] text-white" style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: "'Cairo', 'Inter', sans-serif" }}>
      
      {/* Absolute FM Broadcast / Studio Indicators */}
      <div className={`absolute top-4 ${isAr ? 'left-6' : 'right-6'} flex items-center gap-4 font-['Cairo'] text-base font-black tracking-wider text-white`}>
        <span className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-3.5 py-1.5 rounded text-amber-400 text-base">
          <Radio size={14} className="animate-pulse" />
          <span>96.5 FM BROADCAST</span>
        </span>
        <span className={`flex items-center gap-1.5 border px-3.5 py-1.5 rounded text-base ${isPlaying ? 'border-red-600 bg-red-950 text-red-100' : 'border-zinc-700 bg-zinc-900 text-white'}`}>
          <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-red-500 animate-ping' : 'bg-white'}`}></span>
          <span>{isPlaying ? (isAr ? 'مباشر على الهواء' : 'ON AIR') : (isAr ? 'تأهب الاستوديو' : 'STANDBY')}</span>
        </span>
      </div>

      {/* Main Studio Title Block */}
      <div className="space-y-4 mb-8 border-b border-zinc-800 pb-5 pr-1.5 mt-4">
        <div className="flex items-center gap-2 text-amber-400 font-['Cairo'] text-base md:text-lg font-bold uppercase">
          <Mic size={20} className="text-amber-400" />
          <span>{isAr ? 'منصة الاستوديو والبودكاست الاستقصائي' : 'AL-WARRAQ PODCAST STUDIO // BEIRUT BROADCAST'}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-['Cairo'] font-black text-white">
          {isAr ? 'ديوان تحريات الورّاق الإذاعي' : 'Al-Warraq Audio Investigation Unit'}
        </h2>
        <p className="text-base md:text-lg text-white max-w-xl font-['Cairo'] leading-relaxed">
          {isAr 
            ? 'بث صوتي مباشر يقرأ تفاصيل التقرير الاستقصائي لجنوب لبنان والمناطق التجريبية بنبرة إذاعية ذكورية وقورة.'
            : 'Audio news anchor reciting the investigative report on Southern Lebanon "Pilot Zones" in a structured, solemn male news voice.'}
        </p>
      </div>

      {/* Retro Transmitter Deck / Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-zinc-900/60 border border-zinc-800 p-6 shadow-inner rounded mb-6">
        
        {/* Left Column: Visual Tape & Waveform controls (Lg: 5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          
          {/* Audio Visualizer Waveform Panel */}
          <div className="bg-zinc-950 border-2 border-zinc-800 rounded p-5 flex flex-col justify-between h-40 relative overflow-hidden">
            <div className="flex justify-between items-center font-['Cairo'] text-base text-white border-b border-zinc-900 pb-2">
              <span>{isAr ? 'التردد الصوتي / محلل المدى' : 'AUDIO SPECTRUM // BROADCAST MASTER'}</span>
              <span className="text-amber-400 font-bold">{isPlaying ? 'TRANSMITTING' : 'IDLE'}</span>
            </div>

            {/* Vertical Bar Visualizer */}
            <div className="flex items-end justify-between h-16 px-2">
              {waveHeights.map((h, idx) => (
                <div 
                  key={idx}
                  style={{ height: `${h}%` }}
                  className={`w-1 rounded-t transition-all duration-75 ${
                    isPlaying ? 'bg-amber-400' : 'bg-zinc-700'
                  }`}
                />
              ))}
            </div>

            {/* Simulated Tape Counter / Track Progress */}
            <div className="flex justify-between items-center font-['Cairo'] text-base text-white mt-2 pt-2 border-t border-zinc-900">
              <span className="text-amber-400 font-bold">
                {String(currentIdx + 1).padStart(2, '0')} / {String(script.length).padStart(2, '0')}
              </span>
              <span className="text-white text-sm tracking-widest uppercase">
                {isAr ? 'مدرج البث' : 'SEGMENT FEED'}
              </span>
              <span>
                {isPlaying ? (isAr ? 'نبرة رصينة' : 'ANCHOR MODE') : (isAr ? 'متوقف' : 'PAUSED')}
              </span>
            </div>
          </div>

          {/* New 1-Click Play All Together button */}
          <button
            id="play-all-podcast-btn"
            onClick={handlePlayAll}
            className="w-full py-4 px-4 flex items-center justify-center gap-3 cursor-pointer bg-amber-500 hover:bg-amber-400 text-zinc-950 font-['Cairo'] font-black text-base md:text-lg uppercase tracking-wider rounded transition-all hover:translate-y-[-2px] shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-y-[0px] active:shadow-none border border-white"
          >
            <Radio size={20} className="animate-bounce text-zinc-950" />
            <span>{isAr ? '🎙️ بث كامل التحقيق متواصلاً (بكبسة واحدة)' : '🎙️ PLAY FULL BROADCAST CONTINUOUS (1-CLICK)'}</span>
          </button>

          {/* Core Player Controls Row */}
          <div className="flex items-center justify-between gap-2 border border-zinc-700 bg-zinc-950 p-3 rounded shadow-md">
            <button
              onClick={handleReset}
              className="p-2.5 border border-zinc-700 hover:border-amber-500 bg-zinc-900 text-white hover:text-amber-400 cursor-pointer rounded transition-all hover:translate-y-[-1px]"
              title={isAr ? 'إعادة التشغيل والبدء من الأول' : 'Reset to Beginning'}
            >
              <RotateCcw size={18} />
            </button>

            <button
              onClick={handleTogglePlay}
              className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 cursor-pointer font-['Cairo'] font-black text-base md:text-lg uppercase tracking-wider transition-all hover:translate-y-[-1px] shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none border ${
                isPlaying 
                  ? 'bg-amber-500 border-amber-400 text-zinc-950' 
                  : 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause size={16} className="fill-current text-zinc-950" />
                  <span>{isAr ? 'إيقاف البث' : 'PAUSE BROADCAST'}</span>
                </>
              ) : (
                <>
                  <Play size={16} className="fill-current text-amber-400 animate-pulse" />
                  <span>{isAr ? 'بدء البث الإخباري' : 'START NEWSREEL'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2.5 border border-zinc-700 hover:border-amber-500 bg-zinc-900 text-white hover:text-amber-400 cursor-pointer rounded transition-all hover:translate-y-[-1px]"
              title={isAr ? 'كتم الصوت' : 'Mute/Unmute'}
            >
              {isMuted ? <VolumeX size={18} className="text-red-500" /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Advanced Audio Synthesizer Toggles */}
          <div className="space-y-3.5 border border-zinc-700 bg-zinc-950 p-4 rounded font-['Cairo'] text-base text-white">
            <div className="flex justify-between items-center text-white font-bold uppercase border-b border-zinc-800 pb-2">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Sliders size={18} />
                <span>{isAr ? 'معالج الصوت اللاسلكي' : 'RADIO TRANSMITTER CONFIG'}</span>
              </span>
              <span className="font-mono text-base">STUDIO B</span>
            </div>

            {/* Custom Voice Selection if multiple available */}
            {voices.length > 0 && (
              <div className="space-y-2">
                <label className="text-white block text-base font-bold">{isAr ? 'صوت المذيع المتاح:' : 'Available Narrator Voice:'}</label>
                <select
                  value={selectedVoiceName}
                  onChange={(e) => {
                    setSelectedVoiceName(e.target.value);
                    if (isPlaying) {
                      // Restart segment with new voice
                      setTimeout(() => playCurrentSegment(currentIdx), 50);
                    }
                  }}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2 text-base outline-none rounded cursor-pointer font-['Cairo']"
                >
                  {voices
                    .filter(v => v.lang.startsWith(isAr ? 'ar' : 'en'))
                    .map(v => (
                      <option key={v.name} value={v.name} className="bg-zinc-950 text-white">
                        {v.name} ({v.lang})
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* Ambient Noise / shortwave Hum switch */}
            <div className="flex justify-between items-center pt-2 border-t border-zinc-900">
              <span className="text-white">{isAr ? 'محاكاة همس التردد اللاسلكي السلبي:' : 'Simulated Shortwave Carrier Hum:'}</span>
              <button
                onClick={() => setIsSynthesizedHumOn(!isSynthesizedHumOn)}
                className={`px-3.5 py-2 border text-sm font-bold cursor-pointer rounded transition-all ${
                  isSynthesizedHumOn ? 'bg-amber-950 text-amber-400 border-amber-600' : 'bg-zinc-900 text-white border-zinc-700'
                }`}
              >
                {isSynthesizedHumOn ? (isAr ? 'نشط' : 'ON') : (isAr ? 'معطل' : 'OFF')}
              </button>
            </div>

            {/* Pitch & Speed sliders */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white">
                  <span>{isAr ? 'طبقة الصوت (وقار)' : 'Pitch'}</span>
                  <span className="text-amber-400 font-bold">{pitch}</span>
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

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white">
                  <span>{isAr ? 'سرعة الإلقاء' : 'Speed'}</span>
                  <span className="text-amber-400 font-bold">{playbackSpeed}x</span>
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
          <div className="bg-zinc-950 border border-zinc-800 p-5 rounded h-[420px] overflow-y-auto space-y-4 custom-scrollbar">
            
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-3 font-['Cairo'] text-base text-white font-bold uppercase">
              <span>{isAr ? 'المخطط الإخباري للنشرة الإذاعية (اضغط لتجاوز القراءة)' : 'INTELLIGENCE BROADCAST TELEPROMPTER'}</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{isAr ? 'مزامنة حية' : 'LIVE SYNCED'}</span>
              </span>
            </div>

            {script.map((seg, idx) => {
              const isActive = idx === currentIdx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectSegment(idx)}
                  className={`p-5 border-r-4 text-right rtl:text-right ltr:text-left transition-all duration-300 cursor-pointer rounded-l ${
                    isActive 
                      ? 'bg-amber-950/50 border-amber-400 scale-[1.01] shadow-lg shadow-amber-950/40' 
                      : 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-zinc-600'
                  }`}
                  style={{ direction: isAr ? 'rtl' : 'ltr' }}
                >
                  <div className="flex items-center gap-2.5 justify-start mb-2">
                    <span className={`font-['Cairo'] text-base px-2.5 py-0.5 rounded font-black ${
                      isActive ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-700 text-white'
                    }`}>
                      {idx + 1}
                    </span>
                    <h4 className={`text-lg md:text-xl font-black font-['Cairo'] ${isActive ? 'text-amber-400' : 'text-white'}`}>
                      {seg.title}
                    </h4>
                  </div>
                  <p className={`text-lg md:text-xl font-['Cairo'] leading-relaxed transition-all ${isActive ? 'text-white font-medium' : 'text-white'}`}>
                    {seg.text}
                  </p>

                  {/* Integrated Story-Specific Actions (WhatsApp Share + Call to Action Buttons) */}
                  <div className="mt-4 pt-3.5 border-t border-zinc-800 flex flex-wrap items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    {/* Integrated WhatsApp Share Button for this story */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        isAr 
                          ? `تحريات الورّاق - ${seg.title}:\n${seg.text}\n\nتابع التقرير الصوتي الكامل من هنا: ` + (typeof window !== 'undefined' ? window.location.href : '')
                          : `Al-Warraq Briefing - ${seg.title}:\n${seg.text}\n\nListen to the full audio investigation: ` + (typeof window !== 'undefined' ? window.location.href : '')
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-['Cairo'] text-sm font-bold rounded transition-all cursor-pointer shadow-sm hover:translate-y-[-1px]"
                    >
                      <WhatsAppIcon size={16} className="text-[#25D366]" />
                      <span>{isAr ? 'مشاركة الخبر' : 'Share Story'}</span>
                    </a>

                    {/* Integrated Call to Action Button for this story */}
                    <a
                      href={`https://wa.me/96181776263?text=${encodeURIComponent(
                        isAr 
                          ? `أرغب في الحصول على الوثائق والمستندات الخاصة ببند: "${seg.title}" الوارد في تقرير جنوب لبنان التجريبي لمزيد من المتابعة والتدقيق الدستوري والأمني.`
                          : `I would like to request official documentation and files regarding the story: "${seg.title}" under the Southern Lebanon pilot zones report for review.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-['Cairo'] text-sm font-black rounded transition-all cursor-pointer shadow-md hover:translate-y-[-1px]"
                    >
                      <FileText size={16} className="text-zinc-950" />
                      <span>{isAr ? 'طلب وثائق البند' : 'Request Documents'}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions Footer */}
          <div className="flex items-center justify-between gap-3 bg-zinc-950 p-4 border border-zinc-800 rounded font-['Cairo'] text-base text-white">
            <span>
              {isAr ? 'وثيقة مفرج عنها للجمهور العام.' : 'Classified document cleared for public distribution.'}
            </span>
            <button
              onClick={handleDownloadTranscript}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-400 text-amber-400 hover:text-white cursor-pointer transition-all flex items-center gap-2 rounded uppercase font-bold text-base"
            >
              <Download size={18} />
              <span>{isAr ? 'تحميل النص الكامل' : 'DOWNLOAD SCRIPT'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* WhatsApp Call To Action Block */}
      <div className="bg-zinc-900/80 border border-[#25D366]/40 p-5 md:p-6 rounded-lg my-6 text-center md:text-right rtl:text-right ltr:text-left space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-right rtl:text-right ltr:text-left">
            <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-2 justify-center md:justify-start">
              <span className="text-[#25D366]"><WhatsAppIcon size={26} /></span>
              <span>{isAr ? 'انضم إلى منصة الورّاق على واتساب' : 'Join Al-Warraq on WhatsApp'}</span>
            </h3>
            <p className="text-base md:text-lg text-white font-['Cairo']">
              {isAr 
                ? 'تابع آخر تسريبات وتحقيقات اتفاق واشنطن، الخرائط العسكرية، والملاحق السرية فور صدورها مباشرة على هاتفك.'
                : 'Get the latest leaked documents, trilateral agreement maps, and secret military reports delivered directly to your phone.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Share via WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                isAr 
                  ? 'شاهد استوديو تحريات الوراق وبث البودكاست الاستقصائي لجنوب لبنان والاتفاق الإطاري والانسحاب التجريبي: ' + (typeof window !== 'undefined' ? window.location.href : '')
                  : 'Check out the Al-Warraq investigative podcast on Southern Lebanon "Pilot Zones" under the Washington agreement: ' + (typeof window !== 'undefined' ? window.location.href : '')
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-500 font-['Cairo'] font-bold text-base md:text-lg rounded-lg transition-all cursor-pointer shadow-sm hover:translate-y-[-1px]"
            >
              <WhatsAppIcon size={20} />
              <span>{isAr ? 'مشاركة عبر واتساب' : 'Share via WhatsApp'}</span>
            </a>
            
            {/* Direct Channel Access */}
            <a
              href="https://wa.me/96181776263"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-zinc-950 font-['Cairo'] font-black text-base md:text-lg rounded-lg transition-all cursor-pointer shadow-md hover:translate-y-[-1px]"
            >
              <WhatsAppIcon size={20} className="text-zinc-950" />
              <span>{isAr ? 'تواصل معنا في واتساب' : 'Chat on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Broadcast Context and Informational Notes */}
      <div className="bg-amber-50/5 border border-amber-900/40 p-5 md:p-6 font-['Cairo'] text-base md:text-lg text-white space-y-3 leading-relaxed rounded">
        <h4 className="text-white font-bold font-['Cairo'] flex items-center gap-2">
          <HelpCircle size={20} className="text-amber-400" />
          <span>{isAr ? 'إرشادات الاستماع والبث الفني:' : 'Listening and Technical Broadcast Guide:'}</span>
        </h4>
        <ul className="list-disc list-inside space-y-2 pl-1 pr-1 text-right rtl:text-right ltr:text-left text-white" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
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
