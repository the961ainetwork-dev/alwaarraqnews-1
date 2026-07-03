import React from 'react';
import { Article } from '../types';
import { DOSSIER_DESKTOP_META } from './AlWarraqInvestigations';

interface PrintableDossierProps {
  article: Article | null;
  language: 'ar' | 'en';
}

export const PrintableDossier: React.FC<PrintableDossierProps> = ({ article, language }) => {
  if (!article) return null;

  const isAr = language === 'ar';
  const meta = DOSSIER_DESKTOP_META[article.id];
  const fileId = meta?.fileId || `AW-FILE-${article.id.substring(0, 4).toUpperCase()}`;
  const badge = meta?.badge || 'GEOPOLITICAL INTEL';

  const title = isAr ? article.titleAr : article.titleEn;
  const summary = isAr ? article.summaryAr : article.summaryEn;
  const content = isAr ? article.contentAr : article.contentEn;
  const authorName = isAr ? article.author?.nameAr || 'محرر الورّاق' : article.author?.nameEn || 'AlWarraq Editor';
  const dateStr = article.date || '2026';

  // Format paragraphs nicely for standard print
  const renderParagraphs = (text: string) => {
    return text.split('\n\n').map((para, i) => {
      const cleanPara = para.trim();
      if (!cleanPara) return null;

      // Bullet points
      if (cleanPara.startsWith('*') || cleanPara.startsWith('-')) {
        const items = cleanPara.split(/\n[*+-]\s+/).map(item => item.replace(/^[*+-]\s+/, '').trim());
        return (
          <ul key={i} className="list-disc pl-6 pr-6 my-4 space-y-2 text-zinc-850 font-serif text-sm leading-relaxed border-l-2 border-red-800/25">
            {items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      }

      // Headings
      if (cleanPara.startsWith('###')) {
        return (
          <h4 key={i} className="text-base font-black text-zinc-900 font-sans mt-6 mb-3 tracking-tight border-b border-zinc-200 pb-1 flex items-center gap-2">
            <span className="w-1.5 h-3 bg-red-800"></span>
            {cleanPara.replace('###', '').trim()}
          </h4>
        );
      }

      // Normal paragraph
      return (
        <p key={i} className="text-zinc-900 font-serif text-sm leading-relaxed mb-4 text-justify indent-4">
          {cleanPara}
        </p>
      );
    });
  };

  return (
    <div 
      className="bg-white text-black p-8 md:p-12 font-serif text-right rtl:text-right ltr:text-left relative max-w-[210mm] mx-auto border border-zinc-300 min-h-[297mm] shadow-lg print:shadow-none print:border-none print:p-0"
      style={{ direction: isAr ? 'rtl' : 'ltr' }}
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden">
        <div className="text-stone-900 font-mono text-[90px] font-black tracking-widest uppercase rotate-[-35deg] whitespace-nowrap">
          AL-WARRAQ NEWS
        </div>
      </div>

      {/* Official Header Block */}
      <div className="border-b-4 border-double border-zinc-900 pb-4 mb-6 text-center">
        <div className="flex justify-between items-center text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
          <span>{isAr ? 'صحيفة الورّاق المستقلة - إدارة الأبحاث' : 'AL-WARRAQ INDEPENDENT ARCHIVES'}</span>
          <span>{dateStr}</span>
          <span>AW-SEC-{article.id.substring(0, 4).toUpperCase()}</span>
        </div>
        
        <h2 className="text-xl font-mono font-black uppercase tracking-tight text-zinc-900 mt-4 mb-1">
          {isAr ? '❖ وثيقة رسمية مفرج عنها للنشر العام ❖' : '❖ DECLASSIFIED SOVEREIGN DOSSIER FILE ❖'}
        </h2>
        <div className="text-[11px] font-mono text-red-800 font-bold tracking-widest uppercase mt-1">
          {isAr ? 'تحذير أمني: مادة مرجعية مسجلة وموثقة بالكامل لعام ٢٠٢٦' : 'DIRECTIVE ARCHIVE: OFFICIALLY REGISTERED & VERIFIED BY PRESS CODE'}
        </div>
      </div>

      {/* Official Stamps Overlay */}
      <div className="absolute top-12 right-12 md:right-16 border-2 border-dashed border-red-800 text-red-800 font-mono text-[10px] font-black px-2.5 py-1 rotate-[-8deg] uppercase select-none tracking-widest">
        {isAr ? 'مفرج عنه للنشر' : 'DECLASSIFIED'}
      </div>

      {/* Dossier Summary Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-100 p-4 mb-6 font-mono text-[10px] border border-zinc-200">
        <div>
          <span className="text-zinc-500 block uppercase font-bold">{isAr ? 'الرقم المرجعي للملف:' : 'DOSSIER FILE ID:'}</span>
          <span className="font-extrabold text-zinc-900">{fileId}</span>
        </div>
        <div>
          <span className="text-zinc-500 block uppercase font-bold">{isAr ? 'المحرر والباحث المسؤول:' : 'INVESTIGATOR SIGNATURE:'}</span>
          <span className="font-extrabold text-zinc-900">{authorName}</span>
        </div>
        <div>
          <span className="text-zinc-500 block uppercase font-bold">{isAr ? 'مستوى التصنيف:' : 'SECURITY RANK:'}</span>
          <span className="font-extrabold text-red-800 uppercase">● {isAr ? 'معلومات عامة مفككة' : 'SOVEREIGN DISPATCH'}</span>
        </div>
        <div>
          <span className="text-zinc-500 block uppercase font-bold">{isAr ? 'نوع البيانات الموثقة:' : 'DATA CLASSIFICATION:'}</span>
          <span className="font-extrabold text-zinc-900">{badge}</span>
        </div>
      </div>

      {/* Title & Summary */}
      <div className="mb-6 space-y-4">
        <h1 className="text-xl md:text-2xl font-sans font-black text-zinc-950 tracking-tight leading-snug">
          {title}
        </h1>
        <div className="text-xs md:text-sm font-serif italic text-zinc-700 bg-stone-50 border-r-4 border-red-800 rtl:border-r-4 ltr:border-l-4 p-4 leading-relaxed border border-zinc-200">
          <strong>{isAr ? 'ملخص التقرير المرفق:' : 'EXECUTIVE SUMMARY:'}</strong> {summary}
        </div>
      </div>

      {/* Full Content */}
      <div className="space-y-4 text-justify select-text border-t border-dashed border-zinc-200 pt-6">
        {renderParagraphs(content)}
      </div>

      {/* Verification Seal & Signature Line */}
      <div className="border-t-4 border-double border-zinc-900 pt-6 mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-mono text-zinc-500">
        <div className="text-center sm:text-right space-y-1">
          <span className="block font-black text-zinc-800">
            {isAr ? 'مكتب التحريات الصحفية المستقلة - الوراق' : 'AL-WARRAQ PRESS INVESTIGATION BOARD'}
          </span>
          <p className="max-w-md leading-relaxed">
            {isAr 
              ? 'تمت مراجعة الوثائق أعلاه ومقارنتها مع الأرشيف السيادي والمحاضر الرسمية المسجلة.' 
              : 'The documents contained herein are officially audited and transcribed for public accountability.'}
          </p>
        </div>

        {/* Vintage Signature Block */}
        <div className="border border-zinc-300 p-4 text-center shrink-0 w-44 bg-zinc-50">
          <span className="text-[8px] uppercase tracking-wider block text-zinc-400 font-bold">{isAr ? 'توقيع الهيئة العليا' : 'BOARD SIGNATURE SEAL'}</span>
          <div className="my-2 text-zinc-800 font-serif italic font-extrabold text-sm tracking-widest">
            {isAr ? 'معن البرازي' : 'M. Barazy'}
          </div>
          <span className="text-[9px] text-zinc-600 block border-t border-dashed border-zinc-200 pt-1">
            {isAr ? 'مدير ديوان التحقيقات' : 'Chief Archivist'}
          </span>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-[9px] font-mono text-zinc-400 mt-12">
        {isAr 
          ? 'صحيفة الورّاق المستقلة ٢٠٢٦ © جميع الحقوق الاستقصائية محفوظة بموجب قانون المطبوعات.'
          : '© 2026 AlWarraq Gazette. All sovereign intelligence files are copyright protected under registered press code.'}
      </div>
    </div>
  );
};
