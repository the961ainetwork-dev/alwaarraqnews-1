import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, FileText, Plus, Trash2, Send, Sparkles, BookOpen, Download, 
  Check, CheckSquare, Square, RefreshCw, ChevronRight, FileUp, AlertCircle, Info
} from 'lucide-react';
import { UserProfile, WorkspaceDocument, Article } from '../types';

interface GoldenPrimeWorkspaceProps {
  language: 'ar' | 'en';
  currentUser: UserProfile | null;
  allArticles: Article[];
}

export default function GoldenPrimeWorkspace({
  language,
  currentUser,
  allArticles
}: GoldenPrimeWorkspaceProps) {
  const isAr = language === 'ar';
  
  // Storage keys
  const DOCS_KEY = `alwarraq_workspace_docs_${currentUser?.email || 'guest'}`;
  const CANVAS_KEY = `alwarraq_workspace_canvas_${currentUser?.email || 'guest'}`;

  // State
  const [documents, setDocuments] = useState<WorkspaceDocument[]>([]);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'ai'; text: string; timestamp: string }[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [canvasContent, setCanvasContent] = useState('');
  const [isCompilingPdf, setIsCompilingPdf] = useState(false);
  
  // Dialog / form inputs
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualText, setManualText] = useState('');
  const [isPlatformSelectorOpen, setIsPlatformSelectorOpen] = useState(false);

  // File drag states
  const [isDragging, setIsDragging] = useState(false);

  // Demo Countdown State
  const [demoTimeLeft, setDemoTimeLeft] = useState<string>('');
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: any = null;

    const updateCountdown = () => {
      if (!currentUser) {
        setIsDemoUser(false);
        setDemoTimeLeft('');
        return;
      }

      // Read active demo expiration from user profile or register roster
      let demoExpiresAt = currentUser.goldenPrimeDemoExpiresAt;
      if (!demoExpiresAt) {
        const rawUsers = localStorage.getItem('alwarraq_registered_users');
        if (rawUsers) {
          try {
            const users = JSON.parse(rawUsers);
            const match = users.find((u: any) => u.email.toLowerCase() === currentUser.email.toLowerCase());
            if (match && match.goldenPrimeDemoExpiresAt) {
              demoExpiresAt = match.goldenPrimeDemoExpiresAt;
            } else if (match && match.goldenPrimeDemoExpires) {
              const parsed = Date.parse(match.goldenPrimeDemoExpires);
              if (!isNaN(parsed)) {
                demoExpiresAt = parsed;
              }
            }
          } catch (e) {}
        }
      }

      if (demoExpiresAt) {
        const now = Date.now();
        const diff = demoExpiresAt - now;
        if (diff > 0) {
          setIsDemoUser(true);
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          const formatNumber = (num: number) => {
            const padded = num.toString().padStart(2, '0');
            if (language === 'ar') {
              return padded.replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
            }
            return padded;
          };

          const hStr = formatNumber(hours);
          const mStr = formatNumber(minutes);
          const sStr = formatNumber(seconds);

          if (language === 'ar') {
            setDemoTimeLeft(`ينتهي الدخول التجريبي خلال: ${hStr}:${mStr}:${sStr}`);
          } else {
            setDemoTimeLeft(`DEMO ACCESS EXPIRES IN: ${hStr}:${mStr}:${sStr}`);
          }
        } else {
          setIsDemoUser(false);
          setDemoTimeLeft('');
        }
      } else {
        setIsDemoUser(false);
        setDemoTimeLeft('');
      }
    };

    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [currentUser, language]);
  
  // Auto scroll
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedDocs = localStorage.getItem(DOCS_KEY);
    if (storedDocs) {
      try {
        setDocuments(JSON.parse(storedDocs));
      } catch (e) {
        setDocuments(getDefaultDocs());
      }
    } else {
      const defaults = getDefaultDocs();
      setDocuments(defaults);
      localStorage.setItem(DOCS_KEY, JSON.stringify(defaults));
    }

    const storedCanvas = localStorage.getItem(CANVAS_KEY);
    if (storedCanvas) {
      setCanvasContent(storedCanvas);
    } else {
      setCanvasContent(
        isAr 
          ? "ـ تقرير البحث والتحليل المدمج ــ\n\nاكتب مسودتك هنا..." 
          : "--- INTEGRATED RESEARCH & ANALYSIS BRIEF ---\n\nCompile your notes, copy citations, and write your draft reports here..."
      );
    }

    // Default Greeting
    setChatHistory([
      {
        sender: 'ai',
        text: isAr 
          ? 'أهلاً بك في ديوان البحث الذكي "غولدن برايم". لقد قمت بربط مصادرك النشطة. اسألني أي سؤال لتوليف البيانات، أو صياغة البنود، أو مقارنة الوثائق.' 
          : 'Welcome to your Golden Prime Research Intelligence workspace. I have mapped your active sources. Query me to synthesize records, extract intelligence, or draft custom briefs.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [DOCS_KEY, CANVAS_KEY, isAr]);

  // Save documents to localStorage
  const saveDocs = (newDocs: WorkspaceDocument[]) => {
    setDocuments(newDocs);
    localStorage.setItem(DOCS_KEY, JSON.stringify(newDocs));
  };

  // Save canvas
  const saveCanvas = (content: string) => {
    setCanvasContent(content);
    localStorage.setItem(CANVAS_KEY, content);
  };

  const getDefaultDocs = (): WorkspaceDocument[] => {
    return [
      {
        id: 'doc-default-1',
        userId: currentUser?.email || 'guest',
        title: isAr ? 'تقرير توازن عوائد لبنان السيادية ٢٠٢٦' : 'Lebanese Sovereign Balance Ledger 2026',
        content: isAr 
          ? 'الموازنة السيادية للعام الحالي تظهر عجزاً بنسبة ٣.٢٪ مع ارتفاع مستويات الاحتياطي الفيدرالي والذهب إلى أعلى مستويات تاريخية عند ٨٦ مليار دولار. البنك المركزي يواصل حوكمة الحسابات الخاصة وتفعيل الشفافية ومكافحة غسيل الأموال بالتكامل مع التوجيهات الدولية ومجلس التعاون المالي.'
          : 'The sovereign balance ledger for 2026 shows a narrowed fiscal deficit of 3.2%, driven by a historic rebound in treasury gold reserves and currency vaults peaking at $86B. The central bank continues the rigorous auditing of special asset vehicles and AML compliance updates to satisfy international financial monitors.',
        uploadedAt: new Date().toLocaleDateString(),
        type: 'file',
        isActive: true
      },
      {
        id: 'doc-default-2',
        userId: currentUser?.email || 'guest',
        title: isAr ? 'محاضر مجلس حوكمة الموارد الذهبية' : 'Gold Reserves Governance Briefing',
        content: isAr 
          ? 'محاضر سرية من ديوان الرئاسة: لبنان يحافظ على استقرار صكوك غطاء العملة الذهبي بنسبة ١٠٠٪. لا يجوز التصرف بالاحتياطيات الذهبية الوطنية المودعة في قلعة بيروت وصناديق الودائع الخارجية إلا بقانون برلماني جامع ومصادقة اللجنة السيادية الكبرى.'
          : 'Official executive transcripts: Lebanon maintains its standard gold-reserve coverage ratio at 100%. No liquidation or leverage of the physical national gold vaults (stored between the secure vaults of Banque du Liban and offshore custody points) is permitted without a absolute parliamentary supermajority and Joint Oversight Council assent.',
        uploadedAt: new Date().toLocaleDateString(),
        type: 'file',
        isActive: true
      }
    ];
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Upload/Manual creation handler
  const handleAddManualDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle || !manualText) return;

    const newDoc: WorkspaceDocument = {
      id: `doc-${Date.now()}`,
      userId: currentUser?.email || 'guest',
      title: manualTitle.trim(),
      content: manualText.trim(),
      uploadedAt: new Date().toLocaleDateString(),
      type: 'file',
      isActive: true
    };

    saveDocs([newDoc, ...documents]);
    setManualTitle('');
    setManualText('');
    setIsUploadOpen(false);
  };

  // Drag and drop text files parser
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      parseAndAddFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      parseAndAddFile(file);
    }
  };

  const parseAndAddFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const newDoc: WorkspaceDocument = {
          id: `doc-${Date.now()}`,
          userId: currentUser?.email || 'guest',
          title: file.name.replace(/\.[^/.]+$/, ""), // strip extension
          content: text,
          uploadedAt: new Date().toLocaleDateString(),
          type: 'file',
          isActive: true
        };
        saveDocs([newDoc, ...documents]);
      }
    };
    reader.readAsText(file);
  };

  // Add platform article as source
  const handleAddPlatformArticle = (article: Article) => {
    // Check if already exists
    if (documents.some(d => d.articleId === article.id)) {
      alert(isAr ? 'هذا المستند مضاف بالفعل!' : 'This document is already in your vault!');
      return;
    }

    const title = isAr ? article.titleAr : article.titleEn;
    const content = isAr 
      ? `العنوان: ${article.titleAr}\nالخلاصة: ${article.summaryAr}\nالتفاصيل الكاملة: ${article.contentAr}`
      : `Title: ${article.titleEn}\nSummary: ${article.summaryEn}\nFull Report: ${article.contentEn}`;

    const newDoc: WorkspaceDocument = {
      id: `doc-art-${article.id}`,
      userId: currentUser?.email || 'guest',
      title: `[Archive] ${title}`,
      content: content,
      uploadedAt: new Date().toLocaleDateString(),
      type: 'saved_article',
      articleId: article.id,
      isActive: true
    };

    saveDocs([newDoc, ...documents]);
    setIsPlatformSelectorOpen(false);
  };

  // Remove source
  const handleDeleteDocument = (id: string) => {
    const updated = documents.filter(d => d.id !== id);
    saveDocs(updated);
  };

  // Toggle active source status
  const handleToggleDocActive = (id: string) => {
    const updated = documents.map(d => {
      if (d.id === id) {
        return { ...d, isActive: !d.isActive };
      }
      return d;
    });
    saveDocs(updated);
  };

  const activeSources = documents.filter(d => d.isActive);

  // Send query to server with grounding sources
  const handleSendChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isSending) return;

    const queryText = inputText.trim();
    setInputText('');

    // Add user message to history
    const userMsg = {
      sender: 'user' as const,
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory(prev => [...prev, userMsg]);
    setIsSending(true);

    try {
      // Gather source texts
      const sourcePayloads = activeSources.map(d => ({
        title: d.title,
        content: d.content
      }));

      const res = await fetch('/api/workspace/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryText,
          sources: sourcePayloads,
          language: language
        })
      });

      if (!res.ok) {
        throw new Error('Server error generating research response');
      }

      const data = await res.json();
      
      const aiMsg = {
        sender: 'ai' as const,
        text: data.response || (isAr ? 'لم أتمكن من استخراج صياغة توليفية للمصادر.' : 'I was unable to synthesize the active sources.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errMsg = {
        sender: 'ai' as const,
        text: isAr 
          ? 'عذراً، حدث خطأ في النظام السيادي للتوليف الذكي للبيانات. يرجى التأكد من تشغيل مفتاح واجهة Gemini والاتصال بالخادم.'
          : 'Critical connection issue with the central research node. Verify that the server environment and Gemini API key are fully activated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, errMsg]);
    } finally {
      setIsSending(false);
    }
  };

  // Helper editor formatting
  const insertTextAtCursor = (prefix: string, suffix: string = '') => {
    const editor = document.getElementById('canvas-text-editor') as HTMLTextAreaElement;
    if (!editor) return;

    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const text = editor.value;
    const selected = text.substring(start, end);

    const replacement = prefix + selected + suffix;
    const newVal = text.substring(0, start) + replacement + text.substring(end);
    
    saveCanvas(newVal);
    
    // reset selection/focus
    setTimeout(() => {
      editor.focus();
      editor.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  // Download canvas report
  const downloadReport = () => {
    const blob = new Blob([canvasContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AlWarraq_Research_Brief_${new Date().toISOString().slice(0,10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Export Canvas to Branded High-Quality PDF
  const exportToPdf = async () => {
    setIsCompilingPdf(true);
    // Introduce a short compilation delay to show a high-end feedback state
    await new Promise((resolve) => setTimeout(resolve, 1200));

    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const authorName = currentUser?.username || currentUser?.email || (isAr ? 'ضيف غولدن' : 'Golden Guest');
      const dateStr = new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      let currentPage = 1;

      // Header renderer
      const drawHeader = (pageNum: number) => {
        if (pageNum === 1) {
          // --- Cover Brand Header ---
          doc.setFillColor(15, 15, 15); // Dark Charcoal Background
          doc.rect(margin, 20, contentWidth, 18, 'F');
          
          doc.setFillColor(217, 119, 6); // Amber Gold highlight bar
          doc.rect(margin, 38, contentWidth, 1.5, 'F');

          // Alwarraq Branding
          doc.setTextColor(255, 255, 255);
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(13);
          doc.text(isAr ? 'جريدة الورّاق الإلكترونية' : 'AL WARRAQ INTELLIGENCE JOURNAL', margin + 6, 31);

          // Subtitle
          doc.setFontSize(8);
          doc.setFont('Helvetica', 'normal');
          doc.setTextColor(251, 191, 36); // Amber
          doc.text(isAr ? 'منصة غولدن برايم للأبحاث السيادية الموثوقة' : 'GOLDEN PRIME RESEARCH WORKSPACE', margin + 6, 35);

          // Meta Table (Brutalist Box)
          doc.setDrawColor(30, 30, 30);
          doc.setFillColor(248, 250, 252);
          doc.rect(margin, 46, contentWidth, 22, 'FD');

          doc.setTextColor(40, 40, 40);
          doc.setFontSize(9);
          
          // Row 1
          doc.setFont('Helvetica', 'bold');
          doc.text(isAr ? 'التاريخ:' : 'DATE:', margin + 6, 52);
          doc.setFont('Helvetica', 'normal');
          doc.text(dateStr, margin + 28, 52);

          doc.setFont('Helvetica', 'bold');
          doc.text(isAr ? 'التصنيف:' : 'CLASSIFICATION:', margin + 110, 52);
          doc.setFont('Helvetica', 'normal');
          doc.setTextColor(180, 83, 9);
          doc.text(isAr ? 'مستند سيادي مقيد' : 'SOVEREIGN BRIEF / INTERNAL', margin + 145, 52);

          // Row 2
          doc.setTextColor(40, 40, 40);
          doc.setFont('Helvetica', 'bold');
          doc.text(isAr ? 'الباحث:' : 'AUTHOR:', margin + 6, 60);
          doc.setFont('Helvetica', 'normal');
          doc.text(authorName, margin + 28, 60);

          doc.setFont('Helvetica', 'bold');
          doc.text(isAr ? 'الموثوقية:' : 'INTEGRITY:', margin + 110, 60);
          doc.setFont('Helvetica', 'normal');
          doc.setTextColor(16, 185, 129);
          doc.text(isAr ? 'مصادر موثوقة بالكامل' : '100% VAULT GROUNDED', margin + 145, 60);

          doc.setDrawColor(217, 119, 6);
          doc.setLineWidth(0.3);
          doc.line(margin, 74, pageWidth - margin, 74);
        } else {
          // --- Compact page header ---
          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(0.2);
          doc.line(margin, 15, pageWidth - margin, 15);

          doc.setTextColor(120, 120, 120);
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(8);
          doc.text(isAr ? 'الديوان البحثي غولدن برايم | تقرير موثق' : 'GOLDEN PRIME SOVEREIGN RESEARCH BRIEF', margin, 12);
          doc.text(`${dateStr} | ${authorName}`, pageWidth - margin - 5, 12, { align: 'right' });
        }
      };

      // Footer renderer
      const drawFooter = (pageNum: number) => {
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.2);
        doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

        doc.setTextColor(120, 120, 120);
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(7.5);
        
        doc.text(
          isAr ? 'تم الإنشاء بواسطة محرك غولدن برايم الذكي' : 'Generated via Golden Prime Engine | Al Warraq News', 
          margin, 
          pageHeight - 11
        );

        doc.text(
          isAr ? `صفحة ${pageNum}` : `Page ${pageNum}`, 
          pageWidth - margin, 
          pageHeight - 11, 
          { align: 'right' }
        );
      };

      drawHeader(currentPage);
      drawFooter(currentPage);

      let y = 82;
      const maxY = pageHeight - 22;
      const lines = canvasContent.split('\n');

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line === '') {
          y += 4;
          continue;
        }

        if (y > maxY) {
          doc.addPage();
          currentPage++;
          drawHeader(currentPage);
          drawFooter(currentPage);
          y = 25;
        }

        // Parse markdown styles line-by-line
        if (line.startsWith('###')) {
          const text = line.substring(3).trim();
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(180, 83, 9);
          
          y += 3;
          doc.text(text, margin, y);
          y += 6;
          
        } else if (line.startsWith('##')) {
          const text = line.substring(2).trim();
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(13);
          doc.setTextColor(15, 15, 15);
          
          y += 4;
          doc.text(text, margin, y);
          y += 7;

        } else if (line.startsWith('#')) {
          const text = line.substring(1).trim();
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(15);
          doc.setTextColor(15, 15, 15);
          
          y += 5;
          doc.text(text, margin, y);
          y += 8;

        } else if (line.startsWith('-') || line.startsWith('*')) {
          const text = line.substring(1).trim();
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(10.5);
          doc.setTextColor(40, 40, 40);

          doc.setFillColor(180, 83, 9);
          doc.circle(margin + 2, y - 1.2, 0.8, 'F');

          const wrapped = doc.splitTextToSize(text, contentWidth - 6);
          for (let j = 0; j < wrapped.length; j++) {
            if (y > maxY) {
              doc.addPage();
              currentPage++;
              drawHeader(currentPage);
              drawFooter(currentPage);
              y = 25;
            }
            doc.text(wrapped[j], margin + 6, y);
            y += 5.5;
          }

        } else if (line.startsWith('>')) {
          const text = line.substring(1).trim();
          doc.setFont('Helvetica', 'italic');
          doc.setFontSize(10);
          doc.setTextColor(80, 80, 80);

          const wrapped = doc.splitTextToSize(text, contentWidth - 8);
          const blockQuoteHeight = (wrapped.length * 5.5) + 2;

          doc.setFillColor(245, 245, 245);
          doc.rect(margin + 1, y - 3.5, contentWidth - 2, blockQuoteHeight, 'F');
          
          doc.setFillColor(217, 119, 6);
          doc.rect(margin + 1, y - 3.5, 1.5, blockQuoteHeight, 'F');

          for (let j = 0; j < wrapped.length; j++) {
            if (y > maxY) {
              doc.addPage();
              currentPage++;
              drawHeader(currentPage);
              drawFooter(currentPage);
              y = 25;
            }
            doc.text(wrapped[j], margin + 5, y);
            y += 5.5;
          }
          y += 3;

        } else {
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(10.5);
          doc.setTextColor(40, 40, 40);

          const cleanedText = line
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\*(.*?)\*/g, '$1');

          const wrapped = doc.splitTextToSize(cleanedText, contentWidth);
          for (let j = 0; j < wrapped.length; j++) {
            if (y > maxY) {
              doc.addPage();
              currentPage++;
              drawHeader(currentPage);
              drawFooter(currentPage);
              y = 25;
            }
            doc.text(wrapped[j], margin, y);
            y += 5.5;
          }
        }
      }

      const safeFilename = `AlWarraq_GoldenPrime_Brief_${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(safeFilename);

    } catch (err) {
      console.error("PDF generation error:", err);
      alert(isAr ? "عذراً، حدث خطأ أثناء تجميع وتوليد ملف PDF." : "Failed to compile PDF report.");
    } finally {
      setIsCompilingPdf(false);
    }
  };

  // Suggested research prompts
  const suggestedPrompts = isAr ? [
    'لخص البنود السيادية المذكورة في المصادر',
    'قارن مؤشر الاحتياطي الذهبي مع البيانات الأخرى',
    'استخرج التحديات والفرص المالية'
  ] : [
    'Summarize the core gold reserve security measures.',
    'Formulate a synthetic risk matrix from active intel.',
    'Extract any references to deficit reductions.'
  ];

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-4 sm:p-6 rounded-none border-4 border-zinc-800 font-sans select-none animate-fade-in golden-prime-workspace-container">
      <style>{`
        /* Enforce Cairo Font family and make text crisp white */
        .golden-prime-workspace-container,
        .golden-prime-workspace-container * {
          font-family: 'Cairo', 'Inter', system-ui, sans-serif !important;
          color: #ffffff !important;
        }

        /* Scale font size by 3px/3pt for all standard sizing classes */
        .golden-prime-workspace-container .text-xxs,
        .golden-prime-workspace-container .text-\[9px\],
        .golden-prime-workspace-container .text-\[10px\],
        .golden-prime-workspace-container .text-\[10\.5px\] {
          font-size: 13.5px !important;
        }
        .golden-prime-workspace-container .text-xs {
          font-size: 15px !important;
        }
        .golden-prime-workspace-container .text-sm {
          font-size: 17px !important;
        }
        .golden-prime-workspace-container .text-base {
          font-size: 19px !important;
        }
        .golden-prime-workspace-container .text-lg {
          font-size: 21px !important;
        }
        .golden-prime-workspace-container .text-xl {
          font-size: 23px !important;
        }
        .golden-prime-workspace-container .text-2xl {
          font-size: 27px !important;
        }
        .golden-prime-workspace-container .text-3xl {
          font-size: 33px !important;
        }

        /* Preserve essential UI accent colors for key statuses */
        .golden-prime-workspace-container .text-amber-400,
        .golden-prime-workspace-container .text-amber-500,
        .golden-prime-workspace-container .text-\[\#f59e0b\] {
          color: #f59e0b !important;
        }
        .golden-prime-workspace-container .text-emerald-400,
        .golden-prime-workspace-container .text-emerald-500 {
          color: #10b981 !important;
        }
        .golden-prime-workspace-container .text-red-400,
        .golden-prime-workspace-container .text-red-500 {
          color: #ef4444 !important;
        }
        
        /* Ensure input controls have contrast backgrounds */
        .golden-prime-workspace-container input,
        .golden-prime-workspace-container textarea,
        .golden-prime-workspace-container select {
          background-color: #09090b !important;
          border-color: #3f3f46 !important;
          color: #ffffff !important;
        }
      `}</style>
      
      {/* Immersive Terminal Header */}
      <div className="border-b-2 border-zinc-800 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-mono tracking-wider uppercase mb-1">
            <Sparkles size={11} className="animate-pulse" />
            <span>{isAr ? 'ديوان الأبحاث والتوليف السيادي' : 'SOVEREIGN INTELLIGENCE RESEARCH WORKSPACE'}</span>
          </div>
          <h2 className="font-sans font-black text-xl sm:text-2xl tracking-tight text-white uppercase flex items-center gap-2">
            <span>{isAr ? 'منصة غولدن برايم البحثية الذكية' : 'Golden Prime Sovereign Workspace'}</span>
          </h2>
          <p className="text-[10px] text-zinc-400 font-mono tracking-wide">
            {isAr 
              ? 'توليف المستندات والتحقيقات الحرة وتجميع التراخيص الرقمية والتحرير الفوري.' 
              : 'Autonomous multi-document grounding engine, telex synthesizer & reports compiler.'}
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-2 text-xxs font-mono text-zinc-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>{isAr ? `المستخدم: ${currentUser?.username || 'ضيف غولدن'}` : `Patron: ${currentUser?.username || 'Golden Guest'}`}</span>
          </div>
          {(() => {
            const rawUsers = localStorage.getItem('alwarraq_registered_users');
            if (rawUsers && currentUser) {
              try {
                const users = JSON.parse(rawUsers);
                const match = users.find((u: any) => u.email.toLowerCase() === currentUser.email.toLowerCase());
                if (match && match.goldenPrimeDemoExpires) {
                  return (
                    <span className="text-[9px] text-amber-500 font-mono tracking-wide bg-amber-950/40 px-1.5 py-0.5 border border-amber-800/40">
                      ⚡ {isAr ? `حساب تجريبي (ينتهي: ${match.goldenPrimeDemoExpires})` : `DEMO ACCOUNT (Expires: ${match.goldenPrimeDemoExpires})`}
                    </span>
                  );
                }
              } catch (e) {}
            }
            return null;
          })()}
        </div>
      </div>

      {/* Demo Countdown Persistent Banner */}
      {isDemoUser && demoTimeLeft && (
        <div className="mb-6 bg-gradient-to-r from-amber-950/40 via-amber-900/10 to-transparent border-2 border-amber-650/80 p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 animate-fade-in shadow-[0_0_15px_rgba(217,119,6,0.07)]">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-amber-500/10 border border-amber-500/40 rounded-none text-amber-400">
              <Sparkles size={16} className="animate-pulse text-[#f59e0b]" />
            </div>
            <div>
              <span className="font-mono text-[9px] font-black text-amber-500 block uppercase tracking-wider">
                {isAr ? 'تصريح الدخول التجريبي المؤقت' : 'SOVEREIGN DEMO ACCESS CLEARED'}
              </span>
              <p className="text-[10.5px] font-sans font-semibold text-zinc-300 leading-tight">
                {isAr 
                  ? 'تم تنشيط الدخول المجاني المباشر لكامل مميزات الديوان البحثي الفاخر.' 
                  : 'You have immediate full clearance to operate the premium research workspace.'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="font-mono text-xs font-black text-amber-400 tracking-wider flex items-center gap-2 bg-zinc-900/90 px-3.5 py-1.5 border border-amber-550/60 shadow-[3px_3px_0_0_rgba(217,119,6,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>{demoTimeLeft}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: Source Vault (Col span 3) */}
        <div className="lg:col-span-3 bg-zinc-900/60 border border-zinc-800 p-4 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="font-mono text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
                <BookOpen size={12} />
                {isAr ? 'خزانة المصادر' : 'SOURCE VAULT'}
              </span>
              <span className="text-[10.5px] font-mono font-bold bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded-xs">
                {activeSources.length} / {documents.length} {isAr ? 'نشط' : 'Active'}
              </span>
            </div>

            {/* Source upload and actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsUploadOpen(true)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-[10px] py-1.5 border border-zinc-700 hover:border-zinc-500 uppercase font-black tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus size={10} />
                {isAr ? 'مستند خارجي' : 'Add External'}
              </button>
              <button
                onClick={() => setIsPlatformSelectorOpen(true)}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-mono text-[10px] py-1.5 border border-amber-500/30 hover:border-amber-500/50 uppercase font-black tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus size={10} />
                {isAr ? 'من الأخبار' : 'Add News'}
              </button>
            </div>

            {/* List of sources */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {documents.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-zinc-850 bg-zinc-950/20 text-zinc-500 text-xxs flex flex-col items-center justify-center space-y-2">
                  <FileText size={24} className="text-zinc-700" />
                  <p>{isAr ? 'خزانتك فارغة حالياً' : 'Your research vault is currently empty.'}</p>
                </div>
              ) : (
                documents.map(doc => (
                  <div 
                    key={doc.id} 
                    className={`p-2 border transition-all duration-150 relative group ${
                      doc.isActive 
                        ? 'bg-zinc-800/40 border-amber-500/50 text-white' 
                        : 'bg-zinc-950/20 border-zinc-850 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-start gap-2 select-none">
                      <button 
                        onClick={() => handleToggleDocActive(doc.id)}
                        className="text-zinc-500 hover:text-zinc-300 mt-0.5 shrink-0 cursor-pointer"
                      >
                        {doc.isActive ? (
                          <CheckSquare size={13} className="text-amber-500 fill-amber-500/10" />
                        ) : (
                          <Square size={13} />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0 pr-6">
                        <div className="font-sans font-bold text-[11px] truncate leading-tight">
                          {doc.title}
                        </div>
                        <div className="font-mono text-[8px] text-zinc-500 uppercase mt-0.5 flex items-center gap-1.5">
                          <span>{doc.uploadedAt}</span>
                          <span>•</span>
                          <span>{doc.content.length} chars</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="absolute top-2 right-2 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-0.5"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Guidelines info */}
          <div className="bg-zinc-950/40 border border-zinc-850 p-2.5 rounded-sm">
            <div className="flex items-start gap-1.5">
              <Info size={12} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[9px] text-zinc-400 leading-relaxed font-sans">
                {isAr 
                  ? 'اختر مصادر محددة من خزانتك لتفعيل البحث الموجه. ستعتمد إجابات الذكاء الاصطناعي فقط على المصادر النشطة والمؤكدة.' 
                  : 'Check selected documents inside the Source Vault to activate precise grounded research. The AI assistant answers based strictly on checked nodes.'}
              </p>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Central Chat & Synthesis (Col span 5) */}
        <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-800 p-4 flex flex-col justify-between h-[520px]">
          
          {/* Active sources display */}
          <div className="border-b border-zinc-800 pb-2 mb-3 flex items-center justify-between text-xxs font-mono text-zinc-400">
            <span className="uppercase text-amber-500 font-bold">{isAr ? 'غرفة توليف الأسئلة الذكية' : 'GROUNDED RESEARCH ENGINE'}</span>
            <span>
              {activeSources.length > 0 ? (
                <span className="text-emerald-400 font-extrabold bg-emerald-500/10 px-1.5 py-0.5 border border-emerald-500/20">
                  {isAr ? `✓ مغذى بـ ${activeSources.length} مصادر` : `✓ Grounded with ${activeSources.length} sources`}
                </span>
              ) : (
                <span className="text-red-400 font-extrabold bg-red-500/10 px-1.5 py-0.5 border border-red-500/20">
                  {isAr ? '⚠ لا توجد مصادر نشطة' : '⚠ No sources active (Web Search mode)'}
                </span>
              )}
            </span>
          </div>

          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3 scrollbar-thin scrollbar-thumb-zinc-800">
            {chatHistory.map((chat, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-none border text-xs max-w-[90%] leading-relaxed ${
                  chat.sender === 'user' 
                    ? 'ml-auto bg-zinc-800 border-zinc-700 text-zinc-100' 
                    : 'mr-auto bg-zinc-950 border-zinc-850 text-zinc-200'
                }`}
                style={{ direction: isAr ? 'rtl' : 'ltr' }}
              >
                <div className="flex items-center justify-between font-mono text-[9px] text-zinc-500 mb-1 border-b border-zinc-900 pb-1 font-bold">
                  <span className="uppercase flex items-center gap-1">
                    {chat.sender === 'user' ? (isAr ? 'أنت' : 'YOU') : (isAr ? 'الذكاء الاصطناعي السيادي' : 'RESEARCH COMPILER')}
                  </span>
                  <span>{chat.timestamp}</span>
                </div>
                <div className="whitespace-pre-line font-sans font-medium">{chat.text}</div>
              </div>
            ))}
            {isSending && (
              <div className="mr-auto bg-zinc-950 border border-zinc-850 p-3 text-xs text-zinc-400 flex items-center gap-2 max-w-[80%] font-mono">
                <RefreshCw size={12} className="animate-spin text-amber-500" />
                <span>{isAr ? 'جاري توليف وصياغة البند ومقاطعة البيانات...' : 'CROSS-REFERENCING DOCUMENTS & FORMULATING BRIEF...'}</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Prompts Grid */}
          <div className="space-y-2 mb-3">
            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
              {isAr ? 'أفكار مقترحة للتحليل:' : 'SUGGESTED SYNTHETIC OPERATIONS:'}
            </span>
            <div className="grid grid-cols-1 gap-1">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(prompt)}
                  className="text-left rtl:text-right font-sans text-[10.5px] font-semibold text-zinc-400 hover:text-white bg-zinc-950/40 hover:bg-zinc-850 p-1.5 border border-zinc-850 hover:border-zinc-700 transition-all cursor-pointer truncate"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendChat} className="flex gap-2 border-t border-zinc-800 pt-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isAr ? 'اسأل مصادرك النشطة (مثال: ما هو حجم الاحتياطي الذهبي؟)...' : 'Query your sources (e.g., compile the fiscal assets of Lebanon)...'}
              className="flex-1 bg-zinc-950 border border-zinc-800 p-2 text-xs font-semibold text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 rounded-none font-sans"
            />
            <button
              type="submit"
              disabled={isSending || !inputText.trim()}
              className="bg-amber-600 hover:bg-amber-500 text-white border border-zinc-700 px-3 flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: The Canvas/Editor (Col span 4) */}
        <div className="lg:col-span-4 bg-zinc-900/60 border border-zinc-800 p-4 flex flex-col justify-between h-[520px]">
          
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="border-b border-zinc-800 pb-2 flex items-center justify-between">
              <span className="font-mono text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
                <FileText size={12} />
                {isAr ? 'المسودة ولوحة التقرير' : 'THE CANVA / BRIEF COMPILER'}
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={downloadReport}
                  className="bg-zinc-850 hover:bg-zinc-800 text-zinc-300 font-mono text-[9px] px-2.5 py-1 border border-zinc-750 hover:border-zinc-600 uppercase font-bold tracking-wider transition-all flex items-center gap-1 cursor-pointer rounded-none"
                  title={isAr ? 'تنزيل المسودة كملف نصي' : 'Download report draft as TXT'}
                >
                  <Download size={10} />
                  <span>{isAr ? 'تصدير نصي' : 'Export TXT'}</span>
                </button>
                <button
                  disabled={isCompilingPdf}
                  onClick={exportToPdf}
                  className={`bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-900 text-white disabled:text-zinc-500 font-mono text-[9px] px-2.5 py-1 border border-amber-550 disabled:border-zinc-850 uppercase font-black tracking-wider transition-all flex items-center gap-1 cursor-pointer rounded-none shadow-[2px_2px_0px_0px_rgba(245,158,11,0.2)]`}
                  title={isAr ? 'تصدير التقرير الفاخر كملف PDF مروّس وموثق' : 'Export high-fidelity branded PDF'}
                >
                  {isCompilingPdf ? (
                    <>
                      <RefreshCw size={10} className="animate-spin text-amber-400" />
                      <span>{isAr ? 'جاري التجميع...' : 'COMPILING...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={10} className="animate-pulse text-amber-300" />
                      <span>{isAr ? 'تصدير PDF' : 'Export PDF'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick text formatting editor toolbar */}
            <div className="flex gap-1.5 p-1 bg-zinc-950 border border-zinc-850 text-zinc-400 select-none">
              <button 
                onClick={() => insertTextAtCursor('**', '**')} 
                className="hover:bg-zinc-800 px-1.5 py-0.5 text-[9px] font-bold border border-transparent hover:border-zinc-700 cursor-pointer"
                title="Bold"
              >
                B
              </button>
              <button 
                onClick={() => insertTextAtCursor('*', '*')} 
                className="hover:bg-zinc-800 px-1.5 py-0.5 text-[9px] italic border border-transparent hover:border-zinc-700 cursor-pointer"
                title="Italic"
              >
                I
              </button>
              <button 
                onClick={() => insertTextAtCursor('### ', '\n')} 
                className="hover:bg-zinc-800 px-1.5 py-0.5 text-[9px] font-mono border border-transparent hover:border-zinc-700 cursor-pointer"
                title="Header"
              >
                H3
              </button>
              <button 
                onClick={() => insertTextAtCursor('- ', '\n')} 
                className="hover:bg-zinc-800 px-1.5 py-0.5 text-[9px] border border-transparent hover:border-zinc-700 cursor-pointer"
                title="Bullet"
              >
                • List
              </button>
              <button 
                onClick={() => {
                  if (window.confirm(isAr ? 'هل تود مسح محتوى المسودة تماماً؟' : 'Are you sure you want to clear the canvas?')) {
                    saveCanvas('');
                  }
                }} 
                className="hover:bg-zinc-800 px-1.5 py-0.5 text-[9px] font-mono ml-auto rtl:mr-auto text-red-400 hover:text-red-300 border border-transparent hover:border-zinc-700 cursor-pointer"
                title="Clear"
              >
                CLEAR
              </button>
            </div>

            {/* Main Textarea Canvas */}
            <div className="flex-1 flex">
              <textarea
                id="canvas-text-editor"
                value={canvasContent}
                onChange={(e) => saveCanvas(e.target.value)}
                placeholder={isAr ? 'اكتب ملاحظاتك، وانسخ المراجع والصياغات التي تم توليفها هنا لبناء مستندك النهائي المكتمل...' : 'Write notes, copy AI citations, compile quotes, and write your final analytical reports here...'}
                className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs font-medium font-sans leading-relaxed text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-none h-full"
                dir={isAr ? 'rtl' : 'ltr'}
              />
            </div>
          </div>

          <div className="font-mono text-[8px] text-zinc-500 pt-2 border-t border-zinc-850 flex justify-between uppercase">
            <span>{canvasContent.length} chars</span>
            <span>{canvasContent.split(/\s+/).filter(Boolean).length} words</span>
          </div>
        </div>

      </div>

      {/* DIALOG 1: Document Upload Dialog */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50 animate-fade-in text-zinc-100">
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`bg-zinc-900 border-4 border-zinc-700 max-w-lg w-full p-6 space-y-4 shadow-[8px_8px_0_0_#18181b] relative ${
              isDragging ? 'bg-zinc-800 border-dashed border-amber-500' : ''
            }`}
          >
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <span className="font-mono text-xs font-black text-amber-500 uppercase flex items-center gap-1">
                <Upload size={14} />
                {isAr ? 'تغذية مستند خارجي ذكي' : 'UPLOAD EXTERNAL INTELLIGENCE SOURCE'}
              </span>
              <button 
                onClick={() => setIsUploadOpen(false)}
                className="text-xxs font-mono text-zinc-400 hover:text-white hover:underline cursor-pointer"
              >
                [ {isAr ? 'إغلاق' : 'CLOSE'} ]
              </button>
            </div>

            {/* Drag & drop section */}
            <div className="border border-dashed border-zinc-800 bg-zinc-950/40 p-6 text-center flex flex-col items-center justify-center space-y-2 select-none">
              <FileUp size={32} className="text-zinc-500 animate-bounce" />
              <p className="text-xxs font-mono text-zinc-400 uppercase">
                {isAr 
                  ? 'قم بسحب وإفلات ملف نصي (.txt) هنا للتغذية الفورية' 
                  : 'Drag and drop standard text files (.txt) inside this grid'}
              </p>
              <span className="text-[9px] text-zinc-600 font-bold uppercase">{isAr ? 'أو' : 'OR'}</span>
              <label className="bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 px-3 py-1.5 text-[9px] font-mono tracking-widest uppercase cursor-pointer text-zinc-300">
                {isAr ? 'استعراض من الجهاز' : 'BROWSE LOCAL DISK'}
                <input 
                  type="file" 
                  accept=".txt" 
                  onChange={handleFileInputChange} 
                  className="hidden" 
                />
              </label>
            </div>

            {/* Manual Text Form */}
            <form onSubmit={handleAddManualDocument} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[9.5px] font-mono uppercase font-black text-zinc-500">
                  {isAr ? 'عنوان المستند' : 'Document Title'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'مثال: معطيات الحساب الختامي السيادي' : 'e.g., IMF Monetary Treaty Draft'}
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  className="w-full text-xs p-2.5 border border-zinc-800 bg-zinc-950 text-zinc-100 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9.5px] font-mono uppercase font-black text-zinc-500">
                  {isAr ? 'مضمون النص ومقالات التحقيق' : 'Content Text / Transcripts'}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={isAr ? 'الصق التفاصيل الكاملة للملف هنا...' : 'Paste full analytical contents or intelligence notes here...'}
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  className="w-full text-xs p-2.5 border border-zinc-800 bg-zinc-950 text-zinc-100 focus:outline-none focus:border-zinc-700 resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-mono text-[10px] uppercase py-2.5 border border-zinc-700 font-black tracking-wider transition-all cursor-pointer"
              >
                {isAr ? '✓ إدراج المستند في الخزانة' : '✓ SAVE DOCUMENT INTO SOURCE VAULT'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DIALOG 2: Platform Article Selector */}
      {isPlatformSelectorOpen && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50 animate-fade-in text-zinc-100">
          <div className="bg-zinc-900 border-4 border-zinc-700 max-w-2xl w-full p-6 space-y-4 shadow-[8px_8px_0_0_#18181b]">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <span className="font-mono text-xs font-black text-amber-500 uppercase flex items-center gap-1">
                <BookOpen size={14} />
                {isAr ? 'حفظ مقالات وتحقيقات المنصة كمرجع نشط' : 'SAVE DIRECT PLATFORM INVESTIGATIONS TO SOURCE VAULT'}
              </span>
              <button 
                onClick={() => setIsPlatformSelectorOpen(false)}
                className="text-xxs font-mono text-zinc-400 hover:text-white hover:underline cursor-pointer"
              >
                [ {isAr ? 'إغلاق' : 'CLOSE'} ]
              </button>
            </div>

            <p className="text-[10px] text-zinc-400 font-sans">
              {isAr 
                ? 'حدد أي من الأخبار الكبرى، والتحليلات السيادية، والصكوك الحالية المنشورة في ديوان الورّاق لإضافتها فوراً لخزانتك الذكية.'
                : 'Select any current investigations, sovereign indicators, or editorial briefs published in Al-Warraq to feed your workspace.'}
            </p>

            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
              {allArticles.map(art => {
                const isAlreadyAdded = documents.some(d => d.articleId === art.id);
                return (
                  <div 
                    key={art.id} 
                    className="p-2.5 bg-zinc-950/60 border border-zinc-850 hover:border-zinc-700 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-sans font-bold text-xs text-white truncate">
                        {isAr ? art.titleAr : art.titleEn}
                      </div>
                      <div className="font-mono text-[9px] text-zinc-500 uppercase mt-0.5 flex items-center gap-2">
                        <span className="bg-zinc-850 text-zinc-400 px-1 py-0.5">{art.category}</span>
                        <span>{art.date}</span>
                      </div>
                    </div>

                    <button
                      disabled={isAlreadyAdded}
                      onClick={() => handleAddPlatformArticle(art)}
                      className={`text-[9.5px] font-mono font-black py-1 px-2.5 border uppercase cursor-pointer transition-all ${
                        isAlreadyAdded 
                          ? 'bg-zinc-850 border-zinc-800 text-zinc-600 cursor-not-allowed' 
                          : 'bg-amber-600/10 hover:bg-amber-600 text-amber-400 hover:text-white border-amber-500/30'
                      }`}
                    >
                      {isAlreadyAdded ? (isAr ? 'مضاف' : 'IN VAULT') : (isAr ? '+ حفظ كمرجع' : '+ Save Source')}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
