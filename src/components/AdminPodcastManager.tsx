import React, { useState, useEffect } from 'react';
import { PublishedPodcast, Article } from '../types';
import { 
  Play, Pause, Plus, Trash2, Check, FileText, Link, AudioLines, 
  HelpCircle, AlertCircle, Sparkles, BookOpen, Clock, Globe, ArrowRight 
} from 'lucide-react';

interface AdminPodcastManagerProps {
  language: 'ar' | 'en';
  articles: Article[];
}

const LOCAL_STORAGE_KEY = 'alwarraq_published_podcasts';

const DEFAULT_PODCASTS: PublishedPodcast[] = [
  {
    id: 'podcast-lebanon-pilot-zones',
    articleId: 'joseph-aoun-washington-visit-2026',
    titleAr: 'ديوان تحريات الوراق: كواليس الاتفاق الأمني والمناطق التجريبية في الجنوب',
    titleEn: 'Al-Warraq Podcast: Inside the Security Agreement & South Lebanon Pilot Zones',
    audioUrl: '',
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
    audioUrl: '',
    publishedAt: '2026-07-20T12:00:00.000Z',
    publisherAr: 'رأي التحرير الاستراتيجي',
    publisherEn: 'Strategic Editorial Counsel',
    transcriptAr: 'تجاوزت المواجهة العسكرية المحتدمة بين الولايات المتحدة الأمريكية وإيران أطر الضربات التكتيكية المحدودة أو الاستعراض الردعي، لتتحول رسميًا إلى حرب استنزاف هجينة وشاملة. وبعد انهيار مذكرة التفاهم وإعلان إلغاء وقف إطلاق النار، دخل الطرفان مرحلة جديدة عنوانها الأساسي: استهداف الشرايين الحيوية وإعادة تعريف قواعد الاشتباك.',
    transcriptEn: 'The escalating military confrontation between the United States and Iran has bypassed tactical strikes or deterrent posturing, officially morphing into a hybrid war of attrition. Following the collapse of the Memorandum of Understanding, both sides have entered a new phase centered on targeting critical arteries.'
  }
];

export default function AdminPodcastManager({ language, articles }: AdminPodcastManagerProps) {
  const isAr = language === 'ar';
  
  // Podcasts states
  const [podcasts, setPodcasts] = useState<PublishedPodcast[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string>('');
  
  // Form input states
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [transcriptAr, setTranscriptAr] = useState('');
  const [transcriptEn, setTranscriptEn] = useState('');
  const [pubAr, setPubAr] = useState('ديوان تحرير الوراق');
  const [pubEn, setPubEn] = useState('Al-Warraq Audio Desk');
  
  const [msg, setMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Load podcasts
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setPodcasts(JSON.parse(stored));
      } catch (e) {
        setPodcasts(DEFAULT_PODCASTS);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_PODCASTS));
      }
    } else {
      setPodcasts(DEFAULT_PODCASTS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_PODCASTS));
    }
  }, []);

  // Sync state to local storage
  const savePodcastsToStorage = (updated: PublishedPodcast[]) => {
    setPodcasts(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  // When selected article changes, pre-fill form
  const handleArticleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedArticleId(id);
    if (!id) {
      setTitleAr('');
      setTitleEn('');
      setTranscriptAr('');
      setTranscriptEn('');
      return;
    }

    const art = articles.find(a => a.id === id);
    if (art) {
      setTitleAr(art.titleAr);
      setTitleEn(art.titleEn);
      setTranscriptAr(art.contentAr?.substring(0, 800) || art.summaryAr || '');
      setTranscriptEn(art.contentEn?.substring(0, 800) || art.summaryEn || '');
    }
  };

  // Publish a new podcast
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (!titleAr.trim() || !titleEn.trim()) {
      setMsg({
        text: isAr ? 'يجب إدخال عنوان البودكاست باللغتين العربية والانجليزية.' : 'Both Arabic and English titles are required.',
        isError: true
      });
      return;
    }

    if (!audioUrl.trim() && !transcriptAr.trim() && !transcriptEn.trim()) {
      setMsg({
        text: isAr 
          ? 'يجب إدخال عنوان رابط صوتي (URL) أو كتابة نص مفرغ (Transcript) على الأقل للنشر.' 
          : 'You must provide either an Audio URL or a Transcript to publish.',
        isError: true
      });
      return;
    }

    const newPodcast: PublishedPodcast = {
      id: 'podcast-' + Date.now(),
      articleId: selectedArticleId || undefined,
      titleAr: titleAr.trim(),
      titleEn: titleEn.trim(),
      audioUrl: audioUrl.trim() || undefined,
      transcriptAr: transcriptAr.trim() || undefined,
      transcriptEn: transcriptEn.trim() || undefined,
      publisherAr: pubAr.trim(),
      publisherEn: pubEn.trim(),
      publishedAt: new Date().toISOString()
    };

    const updated = [newPodcast, ...podcasts];
    savePodcastsToStorage(updated);

    // Reset Form
    setSelectedArticleId('');
    setTitleAr('');
    setTitleEn('');
    setAudioUrl('');
    setTranscriptAr('');
    setTranscriptEn('');
    
    setMsg({
      text: isAr ? '🎉 تم نشر الحلقة والملخص الصوتي بنجاح في الموقع!' : '🎉 Podcast episode published successfully to the system!',
      isError: false
    });

    setTimeout(() => setMsg(null), 6000);
  };

  // Delete podcast
  const handleDelete = (id: string) => {
    if (window.confirm(isAr ? 'هل أنت متأكد من رغبتك في حذف هذا البودكاست؟' : 'Are you sure you want to delete this podcast episode?')) {
      const updated = podcasts.filter(p => p.id !== id);
      savePodcastsToStorage(updated);
      setMsg({
        text: isAr ? 'تم إزالة البودكاست بنجاح.' : 'Podcast removed successfully.',
        isError: false
      });
      setTimeout(() => setMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-6 text-zinc-900 font-sans">
      {/* Tab Title */}
      <div className="border-b border-black pb-3">
        <h3 className="font-sans font-black text-lg uppercase flex items-center gap-2 text-zinc-900">
          <AudioLines size={18} className="text-[#b91c1c]" />
          {isAr ? 'إدارة ونشر ديوان البودكاست الإذاعي' : 'Investigative Podcast Dispatch Hub'}
        </h3>
        <p className="text-xxs text-zinc-500 mt-0.5">
          {isAr 
            ? 'منصة التحكم الحصرية لنشر الحلقات والملخصات الصوتية المباشرة بربطها بالتقارير الاستقصائية أو صياغتها كتابةً.' 
            : 'Exclusive management system to publish real audio podcasts by pairing them with local news stories or pasting scripts directly.'}
        </p>
      </div>

      {msg && (
        <div className={`p-4 border-2 font-mono text-xs flex items-start gap-2.5 ${msg.isError ? 'bg-red-50 border-red-900 text-red-900' : 'bg-emerald-50 border-emerald-900 text-emerald-900'}`}>
          {msg.isError ? <AlertCircle size={14} className="shrink-0 mt-0.5" /> : <Check size={14} className="shrink-0 mt-0.5" />}
          <span>{msg.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Publish Form (Lg: 7 cols) */}
        <div className="lg:col-span-7 border-2 border-black p-5 bg-[#faf9f6] space-y-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          <div className="border-b border-zinc-200 pb-2">
            <h4 className="font-sans font-black text-xs uppercase text-zinc-800 flex items-center gap-2">
              <Sparkles size={14} className="text-[#b91c1c]" />
              {isAr ? 'نشر حلقة إذاعية جديدة' : 'Compose & Publish New Episode'}
            </h4>
          </div>

          <form onSubmit={handlePublish} className="space-y-4 text-xs">
            
            {/* Step 1: Choose from Stories */}
            <div className="space-y-1.5">
              <label className="block font-black uppercase text-zinc-700">
                {isAr ? '١. اختر التقرير الاستقصائي المرتبط (اختياري)' : '1. Link to Existing Site Story (Optional)'}
              </label>
              <select
                value={selectedArticleId}
                onChange={handleArticleSelect}
                className="w-full bg-white border border-zinc-400 p-2 text-xs font-semibold outline-none focus:border-black rounded-none"
              >
                <option value="">{isAr ? '--- بث حر غير مرتبط بمقالة محددة ---' : '--- Standalone Broadcast (Not linked to any article) ---'}</option>
                {articles.map(art => (
                  <option key={art.id} value={art.id}>
                    {isAr ? `[${art.date}] ${art.titleAr}` : `[${art.date}] ${art.titleEn}`}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-zinc-500 font-mono">
                {isAr 
                  ? 'يرتبط البودكاست تلقائياً بالمادة ويتيح للقراء الانتقال للمقال بلمسة واحدة.' 
                  : 'Linking to a story automatically imports titles and permits users to jump into full reporting.'}
              </p>
            </div>

            {/* Step 2: Podcast Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-black uppercase text-zinc-700">
                  {isAr ? 'العنوان بالعربية' : 'Podcast Title (Arabic)'}
                </label>
                <input
                  type="text"
                  value={titleAr}
                  onChange={e => setTitleAr(e.target.value)}
                  placeholder={isAr ? 'عنوان البودكاست المثير...' : 'Arabic title...'}
                  className="w-full bg-white border border-zinc-400 p-2 text-xs font-semibold outline-none focus:border-black rounded-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-black uppercase text-zinc-700">
                  {isAr ? 'العنوان بالإنجليزية' : 'Podcast Title (English)'}
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={e => setTitleEn(e.target.value)}
                  placeholder={isAr ? 'العنوان بالإنجليزية...' : 'English title...'}
                  className="w-full bg-white border border-zinc-400 p-2 text-xs font-semibold outline-none focus:border-black rounded-none"
                  required
                />
              </div>
            </div>

            {/* Step 3: Audio URL */}
            <div className="space-y-1.5">
              <label className="block font-black uppercase text-zinc-700 flex justify-between">
                <span>{isAr ? '٢. رابط ملف الصوت الصوتي (اختياري / URL)' : '2. Digital Audio Stream URL (Optional / MP3)'}</span>
                <span className="text-zinc-500 font-mono text-[9px] lowercase">URL-based</span>
              </label>
              <input
                type="url"
                value={audioUrl}
                onChange={e => setAudioUrl(e.target.value)}
                placeholder="https://example.com/audio/episode-1.mp3"
                className="w-full bg-white border border-zinc-400 p-2 text-xs font-mono outline-none focus:border-black rounded-none"
              />
              <div className="bg-zinc-100 p-2 border border-zinc-200 text-[10px] font-mono space-y-1 rounded-sm">
                <span className="text-zinc-600 block font-bold">{isAr ? 'روابط اختبار صوتية سريعة المفعول:' : 'Available Testing Stream Clips (Click to Use):'}</span>
                <div className="flex flex-wrap gap-2">
                  <button 
                    type="button" 
                    onClick={() => setAudioUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')}
                    className="bg-white hover:bg-zinc-200 border border-zinc-300 px-1.5 py-0.5 rounded text-zinc-700"
                  >
                    Helix Song 1 (Classical Instrumental)
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setAudioUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3')}
                    className="bg-white hover:bg-zinc-200 border border-zinc-300 px-1.5 py-0.5 rounded text-zinc-700"
                  >
                    Helix Song 3 (Instrumental beat)
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4: Text Transcripts (For pasting written text) */}
            <div className="space-y-1.5">
              <label className="block font-black uppercase text-zinc-700 flex justify-between">
                <span>{isAr ? '٣. كتابة أو لصق النص المفرغ والسيناريو (اختياري)' : '3. Paste Script Transcripts (Optional / Text-based)'}</span>
                <span className="text-zinc-500 font-mono text-[9px] lowercase">Text-based</span>
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-zinc-600 font-bold block">{isAr ? 'النص بالعربية' : 'Arabic Transcript'}</span>
                  <textarea
                    rows={6}
                    value={transcriptAr}
                    onChange={e => setTranscriptAr(e.target.value)}
                    placeholder={isAr ? 'الصق نص البودكاست باللغة العربية...' : 'Paste Arabic content...'}
                    className="w-full bg-white border border-zinc-400 p-2 text-xs font-sans outline-none focus:border-black rounded-none resize-y"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] text-zinc-600 font-bold block">{isAr ? 'النص بالإنجليزية' : 'English Transcript'}</span>
                  <textarea
                    rows={6}
                    value={transcriptEn}
                    onChange={e => setTranscriptEn(e.target.value)}
                    placeholder={isAr ? 'الصق نص البودكاست باللغة الإنجليزية...' : 'Paste English content...'}
                    className="w-full bg-white border border-zinc-400 p-2 text-xs font-sans outline-none focus:border-black rounded-none resize-y"
                  />
                </div>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono">
                {isAr 
                  ? 'إذا تم لصق النص، فسيتمكن القارئ من قراءة النص بالكامل مع إمكانية استخدام ناطق القراءة الصوتي الآلي.' 
                  : 'Pasting text enables users to read transcripts alongside any audio streams with built-in voice assist.'}
              </p>
            </div>

            {/* Publisher details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-200 pt-3">
              <div className="space-y-1.5">
                <label className="block font-black uppercase text-zinc-700">
                  {isAr ? 'جهة النشر (عربي)' : 'Publisher Name (AR)'}
                </label>
                <input
                  type="text"
                  value={pubAr}
                  onChange={e => setPubAr(e.target.value)}
                  className="w-full bg-white border border-zinc-400 p-2 text-xs font-semibold outline-none focus:border-black rounded-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-black uppercase text-zinc-700">
                  {isAr ? 'جهة النشر (إنجليزي)' : 'Publisher Name (EN)'}
                </label>
                <input
                  type="text"
                  value={pubEn}
                  onChange={e => setPubEn(e.target.value)}
                  className="w-full bg-white border border-zinc-400 p-2 text-xs font-semibold outline-none focus:border-black rounded-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#b91c1c] text-white font-sans font-black text-xs uppercase tracking-widest hover:bg-black transition-colors duration-150 cursor-pointer flex items-center justify-center gap-2 border-2 border-black"
            >
              <Plus size={14} />
              <span>{isAr ? 'إطلاق ونشر حلقة البودكاست' : 'Broadcast & Publish Episode'}</span>
            </button>

          </form>
        </div>

        {/* Right Column: Currently Published Episodes (Lg: 5 cols) */}
        <div className="lg:col-span-5 border-2 border-black p-5 bg-white space-y-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          <div className="border-b border-zinc-200 pb-2 flex justify-between items-center">
            <h4 className="font-sans font-black text-xs uppercase text-zinc-800 flex items-center gap-2">
              <BookOpen size={14} className="text-[#b91c1c]" />
              {isAr ? 'الحلقات المنشورة حالياً' : 'Currently Active Episodes'}
            </h4>
            <span className="bg-red-100 text-[#b91c1c] font-mono font-bold px-1.5 py-0.5 text-[9px]">
              {podcasts.length} TOTAL
            </span>
          </div>

          <div className="space-y-3.5 max-h-[580px] overflow-y-auto pr-1">
            {podcasts.length === 0 ? (
              <div className="text-center py-10 text-zinc-400">
                <AlertCircle size={24} className="mx-auto text-zinc-300 mb-2" />
                <p className="font-mono text-xxs font-black uppercase">{isAr ? 'لا توجد أي حلقات حالياً' : 'No Published Episodes'}</p>
                <p className="text-[10px] mt-1">{isAr ? 'قم بإضافة حلقة بودكاست صالحة عبر النموذج.' : 'Publish your first audio podcast to populate.'}</p>
              </div>
            ) : (
              podcasts.map(pod => {
                const hasAudio = !!pod.audioUrl;
                const hasText = !!pod.transcriptAr || !!pod.transcriptEn;
                const linkedArt = articles.find(a => a.id === pod.articleId);

                return (
                  <div key={pod.id} className="border border-zinc-350 p-3.5 bg-zinc-50 space-y-2 relative group hover:border-[#b91c1c] transition-colors">
                    
                    {/* Delete button absolutely positioned */}
                    <button
                      type="button"
                      onClick={() => handleDelete(pod.id)}
                      className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 text-zinc-400 hover:text-red-700 bg-white border border-zinc-300 hover:border-red-700 p-1 rounded-sm cursor-pointer transition-colors"
                      title={isAr ? 'حذف هذه الحلقة' : 'Remove episode'}
                    >
                      <Trash2 size={12} />
                    </button>

                    <div className="pr-6 rtl:pr-0 rtl:pl-6">
                      {/* Media Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-1.5 select-none">
                        {hasAudio && (
                          <span className="bg-amber-100 border border-amber-300 text-amber-900 font-mono font-bold text-[8px] px-1 rounded-xs flex items-center gap-0.5">
                            <AudioLines size={8} />
                            AUDIO
                          </span>
                        )}
                        {hasText && (
                          <span className="bg-blue-100 border border-blue-300 text-blue-900 font-mono font-bold text-[8px] px-1 rounded-xs flex items-center gap-0.5">
                            <FileText size={8} />
                            SCRIPT
                          </span>
                        )}
                        <span className="bg-zinc-200 text-zinc-700 font-mono font-bold text-[8px] px-1 rounded-xs">
                          {pod.articleId ? 'LINKED' : 'STANDALONE'}
                        </span>
                      </div>

                      {/* Episode Title */}
                      <h5 className="font-sans font-black text-xs text-zinc-900 leading-snug">
                        {isAr ? pod.titleAr : pod.titleEn}
                      </h5>

                      {/* Linked story clue */}
                      {linkedArt && (
                        <div className="text-[10px] text-zinc-500 font-sans mt-1 flex items-center gap-1">
                          <Link size={10} className="shrink-0 text-[#b91c1c]" />
                          <span className="truncate">
                            {isAr ? `مرتبط بـ: ${linkedArt.titleAr}` : `Linked to: ${linkedArt.titleEn}`}
                          </span>
                        </div>
                      )}

                      {/* Timeline meta */}
                      <div className="flex items-center gap-3 text-[9px] font-mono text-zinc-400 mt-2 border-t border-zinc-150 pt-1.5">
                        <span className="flex items-center gap-0.5">
                          <Clock size={8} />
                          {new Date(pod.publishedAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' })}
                        </span>
                        <span>•</span>
                        <span>{isAr ? pod.publisherAr : pod.publisherEn}</span>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
