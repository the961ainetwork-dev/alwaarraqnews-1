import React from 'react';
import { Article } from '../types';
import { 
  Flame, 
  Radio, 
  Zap, 
  Sparkles, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  Share2, 
  ShieldAlert, 
  Globe,
  Eye,
  ExternalLink
} from 'lucide-react';

interface HappeningNowSectionProps {
  language: 'ar' | 'en';
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  savedArticleIds?: string[];
  onToggleSaveArticle?: (article: Article, e: React.MouseEvent) => void;
  onTagClick?: (tag: string, e: React.MouseEvent) => void;
}

export const HappeningNowSection: React.FC<HappeningNowSectionProps> = ({
  language,
  articles,
  onSelectArticle,
  savedArticleIds = [],
  onToggleSaveArticle,
  onTagClick,
}) => {
  const isAr = language === 'ar';

  // Target specific IDs requested by the user: Rubio as sole lead (idx 0), and key secondary dossier stories
  const targetIds = [
    'marco-rubio-visit-beirut-exclusive-2026',
    'damascus-extended-shadow-syrian-role-lebanon-2026',
    'ukraine-iran-russia-escalation-scenarios-part1-2026',
    'ukraine-iran-russia-escalation-scenarios-part2-2026',
    'egypt-energy-hub-tamar-gas-sumed-pipeline-2026'
  ];

  // Find articles matching target IDs
  const matchedArticles = targetIds
    .map(id => articles.find(a => a.id === id))
    .filter((a): a is Article => a !== undefined);

  // Fallback if articles list is passed without those IDs yet
  const fallbackArticles = articles.filter(a => 
    a.category === 'war-room' || a.categories?.includes('war-room') || a.isBreaking
  ).slice(0, 4);

  const displayList = matchedArticles.length > 0 ? matchedArticles : fallbackArticles;

  if (displayList.length === 0) return null;

  const leadStory = displayList[0]; // Syrian Role in Lebanon or top story
  const secondaryStories = displayList.slice(1);

  return (
    <section className="my-8 space-y-6" id="happening-now-section">
      {/* Editorial Section Header */}
      <div className="bg-zinc-950 text-white p-4 md:p-5 border-y-4 border-red-800 shadow-[6px_6px_0px_0px_rgba(185,28,28,1)] relative overflow-hidden">
        {/* Ambient Grid Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(#b91c1c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-right rtl:text-right ltr:text-left">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
            </span>

            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-800 text-white font-mono text-[10px] font-black px-2 py-0.5 uppercase tracking-wider">
                  {isAr ? 'يحدث الآن ⚡' : 'HAPPENING NOW ⚡'}
                </span>
                <span className="bg-zinc-800 text-amber-400 font-mono text-[10px] px-2 py-0.5 border border-zinc-700">
                  {isAr ? 'بث مباشر - غرفة العمليات' : 'LIVE WAR ROOM FEED'}
                </span>
              </div>
              <h2 className="text-xl md:text-2.5xl font-black font-sans tracking-tight text-white mt-1">
                {isAr ? 'المستجدات العسكرية والجيو-استراتيجية' : 'Live Military & Geo-Strategic Dispatches'}
              </h2>
            </div>
          </div>

          <div className="font-mono text-xs text-zinc-400 flex items-center gap-2 self-start md:self-auto">
            <Radio size={14} className="text-red-500 animate-pulse" />
            <span>{isAr ? 'تحديث تلقائي: منذ لحظات' : 'Live Telemetry: Active'}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: 1 Featured Lead Card + Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left/Main Column: Lead Story (Syrian Role in Lebanon) */}
        {leadStory && (
          <div 
            onClick={() => onSelectArticle(leadStory)}
            className="lg:col-span-7 bg-amber-50/40 border-2 border-zinc-900 hover:border-red-800 p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(185,28,28,1)] transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden text-right rtl:text-right ltr:text-left"
          >
            {/* Top Badge Banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="bg-red-800 text-white font-mono text-xxs font-black px-2.5 py-1 uppercase tracking-widest flex items-center gap-1">
                <ShieldAlert size={12} className="text-amber-300" />
                <span>
                  {leadStory.id === 'marco-rubio-visit-beirut-exclusive-2026'
                    ? (isAr ? 'انفراد سيادي عاجل: زيارة ماركو روبيو إلى بيروت' : 'EXCLUSIVE DOSSIER: MARCO RUBIO BEIRUT VISIT')
                    : leadStory.id === 'damascus-extended-shadow-syrian-role-lebanon-2026'
                    ? (isAr ? 'ملف خاص: النفوذ السوري في لبنان' : 'SPECIAL DOSSIER: SYRIAN ROLE IN LEBANON')
                    : (isAr ? 'تحقيق سيادي خاص' : 'SPECIAL INVESTIGATIVE DOSSIER')}
                </span>
              </span>

              <div className="flex items-center gap-2 text-xxs font-mono text-zinc-600">
                <Clock size={12} />
                <span>{isAr ? leadStory.readTimeAr : leadStory.readTimeEn}</span>
              </div>
            </div>

            {/* Featured Image */}
            {leadStory.imageUrl && (
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-zinc-900 mb-4 bg-zinc-900">
                <img 
                  src={leadStory.imageUrl} 
                  alt={isAr ? leadStory.titleAr : leadStory.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-3 right-3 left-3 flex justify-between items-end text-white">
                  <span className="bg-black/80 backdrop-blur-sm text-amber-400 font-mono text-[10px] font-black px-2 py-1 border border-amber-500/30 uppercase">
                    {isAr ? leadStory.author.nameAr : leadStory.author.nameEn}
                  </span>
                  <span className="bg-red-900/90 text-white font-mono text-[10px] px-2 py-0.5">
                    {leadStory.date}
                  </span>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="space-y-3 flex-1">
              <h3 className="text-xl md:text-2xl font-black font-sans leading-snug text-zinc-950 group-hover:text-red-900 transition-colors">
                {isAr ? leadStory.titleAr : leadStory.titleEn}
              </h3>

              <p className="text-sm md:text-base font-serif text-zinc-700 leading-relaxed line-clamp-4">
                {isAr ? leadStory.summaryAr : leadStory.summaryEn}
              </p>
            </div>

            {/* Tags & Action Bar */}
            <div className="pt-4 mt-4 border-t border-zinc-300 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {leadStory.tags.slice(0, 4).map((tag, idx) => (
                  <span 
                    key={idx}
                    onClick={(e) => onTagClick && onTagClick(tag, e)}
                    className="font-mono text-[9px] bg-zinc-200 hover:bg-amber-300 text-zinc-900 px-2 py-0.5 border border-zinc-400 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {onToggleSaveArticle && (
                  <button
                    onClick={(e) => onToggleSaveArticle(leadStory, e)}
                    className={`p-1.5 border transition-all cursor-pointer ${
                      savedArticleIds.includes(leadStory.id)
                        ? 'bg-rose-600 text-white border-rose-700'
                        : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-300'
                    }`}
                    title={isAr ? 'حفظ المقال' : 'Bookmark Article'}
                  >
                    <Bookmark size={14} className={savedArticleIds.includes(leadStory.id) ? 'fill-current' : ''} />
                  </button>
                )}

                <span className="font-mono text-xs font-black text-red-900 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform flex items-center gap-1">
                  <span>{isAr ? 'اقرأ التقرير كاملاً' : 'READ FULL DOSSIER'}</span>
                  {isAr ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Secondary Ukraine-Iran & Regional Cards (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {secondaryStories.map((story, idx) => {
            const isUkrainePart1 = story.id.includes('part1');
            const isUkrainePart2 = story.id.includes('part2');
            const isEgyptEnergy = story.id.includes('egypt');
            const isDamascus = story.id.includes('damascus');

            return (
              <div 
                key={story.id}
                onClick={() => onSelectArticle(story)}
                className="bg-white border-2 border-zinc-900 hover:border-red-800 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(185,28,28,1)] transition-all cursor-pointer flex flex-col justify-between group text-right rtl:text-right ltr:text-left relative"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`font-mono text-[9px] font-black px-2 py-0.5 border uppercase ${
                    isDamascus
                      ? 'bg-red-100 text-red-950 border-red-500'
                      : isUkrainePart1 || isUkrainePart2 
                      ? 'bg-amber-100 text-amber-900 border-amber-400' 
                      : isEgyptEnergy 
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                      : 'bg-zinc-100 text-zinc-900 border-zinc-300'
                  }`}>
                    {isDamascus
                      ? (isAr ? 'ملف خاص: الدور السوري' : 'SPECIAL DOSSIER: SYRIAN ROLE')
                      : isUkrainePart1 
                      ? (isAr ? 'غرفة العمليات: أوكرانيا وإيران (١/٢)' : 'WAR ROOM: UKRAINE-IRAN (1/2)') 
                      : isUkrainePart2 
                      ? (isAr ? 'غرفة العمليات: محاكاة واستراتيجيا (٢/٢)' : 'WAR ROOM: SIMULATIONS (2/2)')
                      : isEgyptEnergy
                      ? (isAr ? 'النفط والطاقة: سوميد وتمار' : 'OIL & ENERGY: SUMED & TAMAR')
                      : (isAr ? 'مستجدات عاجلة' : 'LIVE DISPATCH')}
                  </span>

                  <span className="font-mono text-[9px] text-zinc-500">
                    {story.date}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base font-black font-sans leading-snug text-zinc-900 group-hover:text-red-900 transition-colors line-clamp-2 mb-2">
                  {isAr ? story.titleAr : story.titleEn}
                </h4>

                {/* Summary Excerpt */}
                <p className="text-xs font-serif text-zinc-650 leading-relaxed line-clamp-2 mb-3">
                  {isAr ? story.summaryAr : story.summaryEn}
                </p>

                {/* Footer Action */}
                <div className="pt-2 border-t border-zinc-200 flex items-center justify-between text-xxs font-mono">
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Clock size={10} />
                    <span>{isAr ? story.readTimeAr : story.readTimeEn}</span>
                  </span>

                  <span className="font-black text-red-800 group-hover:underline flex items-center gap-1">
                    <span>{isAr ? 'المتابعة والتفاصيل ➜' : 'VIEW DISPATCH ➜'}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
