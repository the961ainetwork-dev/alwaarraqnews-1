import React, { useState } from 'react';
import { Check, ShieldCheck, Heart, Sparkles, CreditCard, Lock, UserCheck, BookOpen, Cpu, FileText, Send, HelpCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface PremiumPricingProps {
  language: 'ar' | 'en';
  currentUser: UserProfile | null;
  onAuthClick: () => void;
  onSubscriptionSuccess: () => void;
  onNavigateToWorkspace?: () => void;
}

export default function PremiumPricing({
  language,
  currentUser,
  onAuthClick,
  onSubscriptionSuccess,
  onNavigateToWorkspace
}: PremiumPricingProps) {
  const isAr = language === 'ar';
  
  // Selection states
  const [pricingTier, setPricingTier] = useState<'premium' | 'golden_prime'>('premium');
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayForm, setShowPayForm] = useState(false);
  const [showCandidacyForm, setShowCandidacyForm] = useState(false);
  
  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [payError, setPayError] = useState('');
  const [paySuccess, setPaySuccess] = useState(false);

  // Candidacy Form State
  const [candidateName, setCandidateName] = useState(currentUser?.username || '');
  const [candidateOrg, setCandidateOrg] = useState('');
  const [candidateIntent, setCandidateIntent] = useState('');
  const [candidacySuccess, setCandidacySuccess] = useState(false);

  // Demo Account States
  const [showDemoSignup, setShowDemoSignup] = useState(false);
  const [demoUsername, setDemoUsername] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoSuccess, setDemoSuccess] = useState(false);

  const activateDemoForCurrentUser = () => {
    if (!currentUser) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const demoExpiryMs = Date.now() + 24 * 60 * 60 * 1000;
      const demoExpiry = new Date(demoExpiryMs).toLocaleString();
      const rawUsers = localStorage.getItem('alwarraq_registered_users');
      let users = [];
      if (rawUsers) {
        try { users = JSON.parse(rawUsers); } catch(e) {}
      }

      let userFound = false;
      users = users.map((u: any) => {
        if (u.email.toLowerCase() === currentUser.email.toLowerCase()) {
          u.isPremiumSubscriber = true;
          u.goldenPrimeStatus = 'approved';
          u.goldenPrimeDemoExpires = demoExpiry;
          u.goldenPrimeDemoExpiresAt = demoExpiryMs;
          userFound = true;
        }
        return u;
      });
      if (!userFound) {
        users.push({
          email: currentUser.email,
          username: currentUser.username,
          role: currentUser.role,
          isPremiumSubscriber: true,
          goldenPrimeStatus: 'approved',
          goldenPrimeDemoExpires: demoExpiry,
          goldenPrimeDemoExpiresAt: demoExpiryMs
        });
      }
      localStorage.setItem('alwarraq_registered_users', JSON.stringify(users));

      // Update current user
      const updatedUser: UserProfile = {
        ...currentUser,
        isPremiumSubscriber: true,
        goldenPrimeStatus: 'approved',
        goldenPrimeDemoExpires: demoExpiry,
        goldenPrimeDemoExpiresAt: demoExpiryMs
      };
      localStorage.setItem('alwarraq_current_user', JSON.stringify(updatedUser));

      setIsSubmitting(false);
      setDemoSuccess(true);

      setTimeout(() => {
        onSubscriptionSuccess();
      }, 1500);
    }, 1000);
  };

  const handleDemoSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoUsername || !demoEmail) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const email = demoEmail.trim();
      const username = demoUsername.trim();
      const demoExpiryMs = Date.now() + 24 * 60 * 60 * 1000;
      const demoExpiry = new Date(demoExpiryMs).toLocaleString();

      const rawUsers = localStorage.getItem('alwarraq_registered_users');
      let users = [];
      if (rawUsers) {
        try { users = JSON.parse(rawUsers); } catch(e) {}
      }

      let existing = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        existing.isPremiumSubscriber = true;
        existing.goldenPrimeStatus = 'approved';
        existing.goldenPrimeDemoExpires = demoExpiry;
        existing.goldenPrimeDemoExpiresAt = demoExpiryMs;
      } else {
        const newDemoUser = {
          email,
          username,
          password: 'DemoPassword123!',
          role: 'reader',
          isPremiumSubscriber: true,
          goldenPrimeStatus: 'approved',
          goldenPrimeDemoExpires: demoExpiry,
          goldenPrimeDemoExpiresAt: demoExpiryMs
        };
        users.push(newDemoUser);
      }

      localStorage.setItem('alwarraq_registered_users', JSON.stringify(users));

      // Set current user
      const currentUserProfile: UserProfile = {
        email,
        username,
        role: 'reader',
        isPremiumSubscriber: true,
        goldenPrimeStatus: 'approved',
        goldenPrimeDemoExpires: demoExpiry,
        goldenPrimeDemoExpiresAt: demoExpiryMs
      };
      localStorage.setItem('alwarraq_current_user', JSON.stringify(currentUserProfile));

      setIsSubmitting(false);
      setDemoSuccess(true);

      setTimeout(() => {
        onSubscriptionSuccess();
      }, 1500);
    }, 1200);
  };

  const handleSubscribeClick = () => {
    if (!currentUser) {
      onAuthClick();
      return;
    }
    
    if (pricingTier === 'premium') {
      setShowPayForm(true);
      setShowCandidacyForm(false);
    } else {
      setShowCandidacyForm(true);
      setShowPayForm(false);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayError('');
    setIsSubmitting(true);

    if (cardNumber.replace(/\s/g, '').length < 16) {
      setPayError(isAr ? 'رقم البطاقة غير صالح. يجب أن يتكون من ١٦ خانة.' : 'Invalid card number. Must be 16 digits.');
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      // Successfully subscribed! Update user in registered users list
      const rawUsers = localStorage.getItem('alwarraq_registered_users');
      if (rawUsers) {
        try {
          const users = JSON.parse(rawUsers);
          const updatedUsers = users.map((u: any) => {
            if (u.email.toLowerCase() === currentUser?.email.toLowerCase()) {
              u.isPremiumSubscriber = true;
            }
            return u;
          });
          localStorage.setItem('alwarraq_registered_users', JSON.stringify(updatedUsers));
        } catch (err) {
          console.error(err);
        }
      }

      // Update current user
      if (currentUser) {
        const updatedUser = { ...currentUser, isPremiumSubscriber: true };
        localStorage.setItem('alwarraq_current_user', JSON.stringify(updatedUser));
      }

      setIsSubmitting(false);
      setPaySuccess(true);
      
      setTimeout(() => {
        onSubscriptionSuccess();
      }, 2000);
    }, 1500);
  };

  const handleCandidacySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidateOrg || !candidateIntent) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const rawUsers = localStorage.getItem('alwarraq_registered_users');
      let updatedUsers = [];
      if (rawUsers) {
        try {
          const users = JSON.parse(rawUsers);
          updatedUsers = users.map((u: any) => {
            if (u.email.toLowerCase() === currentUser?.email.toLowerCase()) {
              u.goldenPrimeStatus = 'pending_approval';
              u.goldenPrimeCandidacyDetails = {
                name: candidateName,
                organization: candidateOrg,
                researchUseCase: candidateIntent,
                submittedAt: new Date().toLocaleString()
              };
            }
            return u;
          });
          localStorage.setItem('alwarraq_registered_users', JSON.stringify(updatedUsers));
        } catch (err) {
          console.error(err);
        }
      }

      // Trigger Admin Notification Signal
      const rawNotifs = localStorage.getItem('alwarraq_admin_notifications');
      let notifs = [];
      if (rawNotifs) {
        try { notifs = JSON.parse(rawNotifs); } catch(e){}
      }
      notifs.unshift({
        id: `notif-${Date.now()}`,
        type: 'golden_prime_candidate',
        email: currentUser?.email,
        name: candidateName,
        organization: candidateOrg,
        intent: candidateIntent,
        timestamp: new Date().toLocaleString(),
        isRead: false
      });
      localStorage.setItem('alwarraq_admin_notifications', JSON.stringify(notifs));

      // Update current user in session
      if (currentUser) {
        const updatedUser: UserProfile = { 
          ...currentUser, 
          goldenPrimeStatus: 'pending_approval',
          goldenPrimeCandidacyDetails: {
            name: candidateName,
            organization: candidateOrg,
            researchUseCase: candidateIntent,
            submittedAt: new Date().toLocaleString()
          }
        };
        localStorage.setItem('alwarraq_current_user', JSON.stringify(updatedUser));
      }

      setIsSubmitting(false);
      setCandidacySuccess(true);
    }, 1500);
  };

  const premiumFeatures = isAr ? [
    'وصول كامل غير محدود لجميع تحقيقات "نبض الشارع" الكبرى.',
    'صكوك وتحليلات سياسية واقتصادية غير خاضعة للحجب.',
    'بث فوري لأوراق اللجان وصانعي القرار من رئيس التحرير.',
    'مؤشرات وتقارير مالية حية وبدون إعلانات.',
    'تيلكس إلكتروني يومي بأحبار كربون معفاة للبريد.',
    'دعم النشر الحر والمستقل لأرشفة قضايا الفساد.'
  ] : [
    'Unlimited comprehensive access to all "Pulse of the Street" investigative bureaus.',
    'Unlocked strategic economic indices and cross-border insights.',
    'Direct executive briefs and analytical documents of the Editor-in-Chief.',
    'Zero-latency financial reports and custom metrics dashboards.',
    'Prioritized daily carbon-print telex circulars to your email.',
    'Sovereign support for independent journalism documenting sovereign capital flight.'
  ];

  const goldenPrimeFeatures = isAr ? [
    'خزانة مستندات خاصة (Source Vault) لرفع ملفات الأبحاث الخارجية ومقالات المنصة.',
    'محرك توليف ذكي (NotebookLM Clone) للإجابة الموجهة والدقيقة والمؤسسة على مصادرك.',
    'لوحة مسودة تفاعلية (Compiler Canvas) لصياغة وتصدير تقاريرك الاستراتيجية مباشرة.',
    'مزامنة فورية للوثائق والتقارير مع حسابك السيادي المشفر بالكامل.',
    'دعم كامل للتكامل مع نماذج الذكاء الاصطناعي الأحدث من Google (Gemini 3.5).',
    'أولوية الدعم والتحليل الميداني المباشر من مكاتبنا الاستشارية.'
  ] : [
    'Private Document Vault (Source Vault) to upload external research files (.txt) and save platform investigations.',
    'Tailored Multi-Document grounding model (NotebookLM Clone) for direct source-locked synthesis.',
    'Interactive Compiler Canvas editor to seamlessly draft, format, and download intelligence reports.',
    'Encrypted real-time synchronization of all research briefs mapping directly to your account.',
    'Unlimited execution calls with Google’s cutting-edge reasoning model (Gemini 3.5).',
    'Direct priority advisory line with our chief analytical economists and regional bureau heads.'
  ];

  return (
    <div id="premium-pricing-station" className="p-4 sm:p-6 md:p-10 border-4 border-black bg-white text-black animate-fade-in font-sans">
      
      {/* Editorial Header */}
      <div className="border-b-2 border-black border-double pb-6 mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 bg-[#b91c1c]/10 text-[#b91c1c] border border-[#b91c1c] px-3 py-1 text-[11px] font-mono tracking-widest uppercase mb-3">
          <Sparkles size={12} className="animate-pulse" />
          <span>{isAr ? 'الحقبة الجديدة للنشر المستقل والأبحاث الذكية' : 'NEW SEGMENT OF SOVEREIGN RESEARCH ARCHIVES'}</span>
        </div>
        <h2 className="font-sans font-black text-2xl md:text-4.5xl tracking-tight uppercase leading-none">
          {isAr ? 'عضويات ديوان الورّاق المتقدمة' : 'Al-Warraq Sovereign Tiers'}
        </h2>
        <p className="text-xxs text-zinc-500 font-mono tracking-widest uppercase mt-1">
          {isAr ? 'تسخير الذكاء الاصطناعي التوليدي والبيانات الاستقصائية للبحث عن الحقيقة' : 'INTEGRATING ADVANCED MACHINE REASONING WITH UNBIASED INVESTIGATIONS'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Pitch Card Left (7/12) */}
        <div className="lg:col-span-7 flex flex-col justify-between border-2 border-black p-6 bg-neutral-50 relative overflow-hidden">
          <div className="space-y-6">
            
            {/* TIER TABS SELECTOR */}
            <div className="grid grid-cols-2 bg-neutral-200/60 p-1 border border-zinc-300 rounded-none">
              <button
                onClick={() => {
                  setPricingTier('premium');
                  setShowPayForm(false);
                  setShowCandidacyForm(false);
                  setCandidacySuccess(false);
                }}
                className={`py-2 px-1 text-center font-sans font-black text-[10.5px] uppercase tracking-wide cursor-pointer transition-all ${
                  pricingTier === 'premium' 
                    ? 'bg-black text-white' 
                    : 'text-zinc-650 hover:bg-neutral-250/80'
                }`}
              >
                {isAr ? '★ العضوية الممتازة (Premium)' : '★ Sovereign Premium'}
              </button>
              <button
                onClick={() => {
                  setPricingTier('golden_prime');
                  setShowPayForm(false);
                  setShowCandidacyForm(false);
                  setCandidacySuccess(false);
                }}
                className={`py-2 px-1 text-center font-sans font-black text-[10.5px] uppercase tracking-wide cursor-pointer transition-all ${
                  pricingTier === 'golden_prime' 
                    ? 'bg-[#d97706] text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)]' 
                    : 'text-zinc-650 hover:bg-neutral-250/80'
                }`}
              >
                {isAr ? '⚡ محرك غولدن برايم الذكي' : '⚡ Golden Prime Workspace'}
              </button>
            </div>

            <div>
              <span className="font-mono text-xxs font-black text-[#d97706] block uppercase tracking-widest">
                {pricingTier === 'premium' 
                  ? (isAr ? 'امتيازات فئة الائتمان الاستقصائي الكبرى' : 'PATRONAGE RIGHTS & PRIVILEGES')
                  : (isAr ? 'ديوان الأبحاث المتطور وغرفة الصياغة الموحدة' : 'INTELLIGENCE COMPILATION & AI RESEARCH CO-PILOT')
                }
              </span>
              <h3 className="font-sans font-black text-xl md:text-2xl mt-1">
                {pricingTier === 'premium'
                  ? (isAr ? 'ما الذي تحصل عليه كعضو بريميوم؟' : 'Why Enroll in the Al-Warraq Guild?')
                  : (isAr ? 'امتيازات ديوان "غولدن برايم" البحثي' : 'Why Deploy a Golden Prime Workspace?')
                }
              </h3>
            </div>

            <ul className="space-y-3">
              {(pricingTier === 'premium' ? premiumFeatures : goldenPrimeFeatures).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold">
                  <Check size={16} className={pricingTier === 'premium' ? "text-[#b91c1c] shrink-0 mt-0.5" : "text-[#d97706] shrink-0 mt-0.5"} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-dashed border-zinc-300 flex items-center gap-4 text-zinc-500 text-xxs font-mono">
            <div className="flex items-center gap-1">
              <ShieldCheck size={14} className="text-zinc-600" />
              <span>{isAr ? 'تشفير ومصادقة سبرانية' : 'Fully SSL Secured'}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Heart size={14} className="text-zinc-600" />
              <span>{isAr ? 'صحافة مستقلة وحوكمة نزيهة' : 'Supporting Free Sovereign Speech'}</span>
            </div>
          </div>
        </div>

        {/* Pricing Selection/Action Right (5/12) */}
        <div className="lg:col-span-5 flex flex-col justify-between border-4 border-black p-6 bg-white relative">
          
          {/* SCREEN 1: Main pricing option details */}
          {!showPayForm && !showCandidacyForm && !showDemoSignup && !paySuccess && !candidacySuccess && !demoSuccess ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xxs font-black text-zinc-400 block uppercase text-center">
                  {pricingTier === 'premium' 
                    ? (isAr ? 'اختر مخطط الالتزام الملائم' : 'SELECT YOUR ENROLLMENT PACKAGE')
                    : (isAr ? 'المستوى النخبوي للصحافة والتحليل' : 'ELITE INTELLIGENCE SUBSCRIPTION')
                  }
                </span>
                
                {/* Plan options toggler */}
                <div className="grid grid-cols-2 bg-neutral-100 p-1 border-2 border-black rounded-none my-4">
                  <button
                    onClick={() => setSelectedPlan('monthly')}
                    className={`py-2 text-[11px] font-black uppercase transition-all flex flex-col items-center justify-center cursor-pointer ${
                      selectedPlan === 'monthly' ? 'bg-black text-white' : 'text-black hover:bg-neutral-200'
                    }`}
                  >
                    <span>{isAr ? 'شهرياً' : 'Monthly'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedPlan('yearly')}
                    className={`py-2 text-[11px] font-black uppercase transition-all flex flex-col items-center justify-center cursor-pointer relative ${
                      selectedPlan === 'yearly' ? 'bg-black text-white' : 'text-black hover:bg-neutral-200'
                    }`}
                  >
                    <span>{isAr ? 'سنوياً' : 'Yearly'}</span>
                    <span className="absolute -top-2.5 right-1 bg-[#b91c1c] text-white text-[8px] font-mono font-black py-0.5 px-1 uppercase tracking-tighter">
                      {isAr ? 'وفّر ٢٠٪' : '-20% SAVE'}
                    </span>
                  </button>
                </div>

                {/* Display cost */}
                <div className="text-center py-4 bg-neutral-50 border border-black mb-6">
                  <div className="font-mono text-zinc-500 text-xxs tracking-wider uppercase font-bold">
                    {pricingTier === 'premium' ? (
                      selectedPlan === 'monthly' ? (isAr ? 'مخطط الالتزام الشهري المعتاد' : 'STANDARD MONTHLY COMMITTAL') : (isAr ? 'المخطط السنوي المخفض للدعم المستمر' : 'ANNUAL SOVEREIGN DIRECTORY')
                    ) : (
                      selectedPlan === 'monthly' ? (isAr ? 'التزام شهري للمستندات والبحث' : 'GOLDEN MONTHLY COMPILER') : (isAr ? 'الترخيص السنوي للشركات والهيئات الاستشارية' : 'ANNUAL GOLDEN ENTERPRISE')
                    )}
                  </div>
                  <div className="flex items-baseline justify-center gap-1 mt-2">
                    <span className="font-mono text-zinc-400 font-bold">$</span>
                    <span className="font-sans font-black text-3.5xl md:text-5xl tracking-tighter leading-none">
                      {pricingTier === 'premium' 
                        ? (selectedPlan === 'monthly' ? '20' : '200')
                        : (selectedPlan === 'monthly' ? '150' : '1500')
                      }
                    </span>
                    <span className="font-mono text-zinc-400 text-xxs ml-0.5">
                      {selectedPlan === 'monthly' ? (isAr ? '/شهرياً' : '/mo') : (isAr ? '/سنوياً' : '/yr')}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-bold mt-2 px-4">
                    {pricingTier === 'premium' ? (
                      selectedPlan === 'monthly' 
                        ? (isAr ? 'اشتراك متجدد تلقائياً بقيمة ٢٠ دولار شهرياً، يسحب بداية العقد.' : 'USD 20 billed secure-recurring on a month-to-month continuous cycle.')
                        : (isAr ? 'اشتراك سنوي بقيمة ٢٠٠ دولار (توفير ٤٠ دولار عن الدفع الفردي).' : 'USD 200 billed once-annual. Represents a definitive 20% discount on monthly equivalent.')
                    ) : (
                      selectedPlan === 'monthly'
                        ? (isAr ? 'اشتراك متجدد بقيمة ١٥٠ دولار شهرياً، يفتح لوحة البحث ومحاكاة NotebookLM.' : 'USD 150 billed secure-recurring. Grants full access to NotebookLM-style research workspace.')
                        : (isAr ? 'اشتراك سنوي بقيمة ١٥٠٠ دولار (توفير ٣٠٠ دولار كاملة للمهتمين).' : 'USD 1500 billed once-annual. Grants enterprise-tier credentials and unlimited document synthesis.')
                    )}
                  </p>
                </div>
              </div>

              {/* ACTION BTN ZONE */}
              <div className="space-y-3">
                {pricingTier === 'premium' && currentUser?.isPremiumSubscriber ? (
                  <div className="space-y-3">
                    <div className="bg-emerald-50 border-2 border-emerald-600 p-3 text-center text-xs font-black text-emerald-800 flex items-center justify-center gap-2">
                      <UserCheck size={18} />
                      <span>{isAr ? 'أنت مشترك بالفعل بالخدمة البريميوم الفاخرة!' : 'You already possess an active Premium Subscriber enrollment!'}</span>
                    </div>
                    {onNavigateToWorkspace && (
                      <button
                        type="button"
                        onClick={onNavigateToWorkspace}
                        className="bg-black hover:bg-neutral-900 text-white font-mono text-xs font-black py-3 px-4 border-2 border-black uppercase tracking-wider transition-all cursor-pointer shadow-[4px_4px_0px_0px_#10b981] active:translate-x-0.5 active:translate-y-0.5 w-full flex items-center justify-center gap-2"
                      >
                        <Sparkles size={14} className="animate-pulse text-amber-300" />
                        <span>{isAr ? 'الانتقال إلى الديوان البحثي والمسودة ⚡' : 'ENTER RESEARCH WORKSPACE & CANVAS ⚡'}</span>
                      </button>
                    )}
                  </div>
                ) : pricingTier === 'golden_prime' && currentUser?.goldenPrimeStatus === 'pending_approval' ? (
                  <div className="bg-amber-50 border-2 border-amber-600 p-3 text-center text-xs font-black text-amber-800 flex flex-col gap-1 items-center justify-center">
                    <div className="flex items-center gap-1.5">
                      <Cpu size={16} className="animate-pulse" />
                      <span>{isAr ? 'ترشيحك قيد المراجعة والتدقيق' : 'Golden Candidacy Under Review'}</span>
                    </div>
                    <span className="text-[9.5px] font-medium leading-relaxed mt-1 text-zinc-500 font-sans">
                      {isAr 
                        ? 'تلقينا طلبك الموجه ونقوم حالياً بحوكمة التراخيص وسبر حسابك. سنرسل تليكس الترحيب فور الاعتماد.' 
                        : 'Our review committee is mapping your profile metrics. Your access credentials will be activated post joint validation.'}
                    </span>
                  </div>
                ) : pricingTier === 'golden_prime' && currentUser?.goldenPrimeStatus === 'approved' ? (
                  <div className="space-y-3">
                    <div className="bg-emerald-50 border-2 border-emerald-600 p-3 text-center text-xs font-black text-emerald-800 flex flex-col gap-1 items-center justify-center">
                      <div className="flex items-center gap-1.5">
                        <UserCheck size={18} />
                        <span>{isAr ? 'عضوية غولدن برايم نشطة بالكامل!' : 'Golden Prime Active!'}</span>
                      </div>
                      <span className="text-[9.5px] font-sans text-zinc-500 font-semibold leading-relaxed">
                        {isAr ? '✓ خزانة مصادرك البحثية ولوحة التحرير مفتوحة وجاهزة للاستخدام.' : '✓ Your source vault and report compiler canvas are operational.'}
                      </span>
                    </div>
                    {onNavigateToWorkspace && (
                      <button
                        type="button"
                        onClick={onNavigateToWorkspace}
                        className="bg-black hover:bg-neutral-900 text-white font-mono text-xs font-black py-3 px-4 border-2 border-black uppercase tracking-wider transition-all cursor-pointer shadow-[4px_4px_0px_0px_#f59e0b] active:translate-x-0.5 active:translate-y-0.5 w-full flex items-center justify-center gap-2"
                      >
                        <Sparkles size={14} className="animate-pulse text-amber-300" />
                        <span>{isAr ? 'الانتقال إلى الديوان البحثي والمسودة ⚡' : 'ENTER RESEARCH WORKSPACE & CANVAS ⚡'}</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleSubscribeClick}
                    className={`border-2 border-black text-white font-black text-xs uppercase py-3 w-full shadow-[4px_4px_0_0_#000] cursor-pointer transition-all uppercase tracking-wide ${
                      pricingTier === 'premium' ? 'bg-[#b91c1c] hover:bg-neutral-900' : 'bg-[#d97706] hover:bg-neutral-900'
                    }`}
                  >
                    {currentUser 
                      ? (pricingTier === 'premium' 
                          ? (isAr ? 'التقدم نحو دفع وتأكيد الاشتراك' : 'PROCEED TO SUBSCRIPTION PAYMENT')
                          : (isAr ? 'تقديم طلب ترشيح غولدن برايم' : 'APPLY FOR GOLDEN PRIME CANDIDACY')
                        )
                      : (isAr ? 'تسجيل دخول أولاً لتقديم الطلب' : 'SIGN IN FIRST TO ENROLL')
                    }
                  </button>
                )}

                {pricingTier === 'golden_prime' && currentUser?.goldenPrimeStatus !== 'approved' && currentUser?.goldenPrimeStatus !== 'pending_approval' && (
                  <div className="mt-2 border-2 border-dashed border-amber-600 bg-amber-500/5 p-3 text-center space-y-2 animate-fade-in">
                    <div className="flex items-center justify-center gap-1 text-amber-600 font-sans font-black text-[10px] uppercase">
                      <Sparkles size={11} className="animate-pulse" />
                      <span>{isAr ? 'عرض التجربة المجانية السريع' : 'INSTANT 24HR FREE DEMO'}</span>
                    </div>
                    <p className="text-[9.5px] text-zinc-600 font-medium leading-normal font-sans">
                      {isAr 
                        ? 'تجاوز شروط الترشيح المعقدة! قم بتنشيط حساب تجريبي مجاني فوري لمدة ٢٤ ساعة للتجربة والتشغيل الفوري.' 
                        : 'Bypass the evaluation process! Activate an instant 24-hour free demo account with immediate access to operate.'}
                    </p>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        if (!currentUser) {
                          setShowDemoSignup(true);
                        } else {
                          activateDemoForCurrentUser();
                        }
                      }}
                      className="bg-black hover:bg-neutral-950 text-white font-mono text-[9px] font-black py-2 px-3 border border-black uppercase tracking-wider transition-all cursor-pointer shadow-[2px_2px_0px_0px_#d97706] active:translate-x-0.5 active:translate-y-0.5"
                    >
                      {isAr ? 'تنشيط الحساب التجريبي الفوري ⚡' : 'ACTIVATE INSTANT FREE DEMO ⚡'}
                    </button>
                  </div>
                )}
                
                <p className="text-[9px] text-zinc-400 font-semibold text-center leading-normal">
                  {isAr 
                    ? '✓ لا توجد التزامات برمجية مخفية. يمكنك الإلغاء فوراً في أي وقت من إعدادات حسابك بضغطة زر.' 
                    : '✓ Zero-lock-in dispatch policy. Revoke or truncate your recurring patronage inside your account settings at any point.'}
                </p>
              </div>
            </div>
          ) : showPayForm && !paySuccess ? (
            
            /* SCREEN 2: Premium Credit Card form */
            <form onSubmit={handlePaymentSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-zinc-200">
                  <span className="font-mono text-xxs font-black text-[#b91c1c] uppercase flex items-center gap-1">
                    <CreditCard size={12} />
                    {isAr ? 'صندوق الدفع الآمن المركزي' : 'SECURE SUBSCRIPTION PAYMENT'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPayForm(false)}
                    className="text-[10px] font-mono text-zinc-400 hover:text-black hover:underline"
                  >
                    {isAr ? 'رجوع' : 'Go Back'}
                  </button>
                </div>

                {payError && (
                  <p className="bg-red-50 text-[#b91c1c] border border-red-300 p-2 text-xxs font-bold text-center">
                    {payError}
                  </p>
                )}

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase font-black text-zinc-500">
                    {isAr ? 'رقم البطاقة (١٦ خانة للتجربة)' : 'Debit / Credit Card (16-Digit Simulation)'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="4123 5567 8910 1112"
                    value={cardNumber}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                      setCardNumber(v.replace(/(\d{4})/g, '$1 ').trim());
                    }}
                    className="w-full text-xs p-2.5 border border-black bg-neutral-50 tracking-widest font-mono text-center font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase font-black text-zinc-500">
                      {isAr ? 'تاريخ الانتهاء' : 'EXP DATE'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                        if (v.length >= 3) {
                          setCardExpiry(v.slice(0, 2) + '/' + v.slice(2));
                        } else {
                          setCardExpiry(v);
                        }
                      }}
                      className="w-full text-xs p-2.5 border border-black bg-neutral-50 text-center font-mono font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase font-black text-zinc-500">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="•••"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      className="w-full text-xs p-2.5 border border-black bg-neutral-50 text-center font-mono font-bold tracking-widest"
                    />
                  </div>
                </div>

                <div className="bg-neutral-50 border p-3 mt-4 text-[10px] text-zinc-500 font-semibold space-y-1">
                  <div className="flex justify-between">
                    <span>{isAr ? 'العقد المختار:' : 'Selected Plan:'}</span>
                    <span className="font-bold uppercase text-black font-mono">
                      {selectedPlan === 'monthly' ? (isAr ? 'اشتراك شهري' : 'MONTHLY DISPATCH') : (isAr ? 'اشتراك سنوي' : 'ANNUAL ENROLLMENT')}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-dashed pt-1 mt-1 text-xs">
                    <span className="font-bold text-black">{isAr ? 'المجموع المستحق:' : 'Total Amount Due:'}</span>
                    <span className="font-black text-[#b91c1c] font-mono">${selectedPlan === 'monthly' ? '20.00' : '200.00'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase py-3 border border-black w-full cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (isAr ? 'جاري التحقق من الاعتماد والمصادقة للبنك...' : 'AUTHORIZING ACCOUNT RESERVES...') : (isAr ? `تأكيد ودفع $${selectedPlan === 'monthly' ? '20' : '200'}` : `CONFIRM & DEPOSIT $${selectedPlan === 'monthly' ? '20' : '200'}`)}
                </button>
                <div className="flex items-center justify-center gap-1 text-[9px] text-zinc-400 font-mono">
                  <Lock size={10} />
                  <span>{isAr ? 'بيانات مشفرة ومؤمنة بنظام SHA-256' : 'AES-256 Bit Transceiver Security Certified'}</span>
                </div>
              </div>
            </form>
          ) : showCandidacyForm && !candidacySuccess ? (
            
            /* SCREEN 3: Golden Prime Candidacy Application Form */
            <form onSubmit={handleCandidacySubmit} className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-zinc-200">
                  <span className="font-mono text-xxs font-black text-[#d97706] uppercase flex items-center gap-1">
                    <Cpu size={12} className="text-[#d97706] animate-pulse" />
                    {isAr ? 'استمارة ترشيح غولدن برايم' : 'GOLDEN CANDIDACY DEEP INTERVIEW'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCandidacyForm(false)}
                    className="text-[10px] font-mono text-zinc-400 hover:text-black hover:underline"
                  >
                    {isAr ? 'رجوع' : 'Go Back'}
                  </button>
                </div>

                <p className="text-[10px] text-zinc-500 leading-normal font-sans font-medium">
                  {isAr 
                    ? 'نظراً لأن منصة "غولدن برايم" تمنح وصولاً لأدوات الذكاء الاصطناعي السيادية وتوليف الوثائق الحرة، نقوم بفلترة وتدقيق المرشحين يدوياً لضمان سلامة الاستخدام وحوكمة التراخيص الاستقصائية.'
                    : 'Because Golden Prime grants custom computing tokens for multi-document research synthesis, candidates undergo verification to fulfill advisory security protocols.'}
                </p>

                <div className="space-y-1">
                  <label className="block text-[9.5px] font-mono uppercase font-black text-zinc-500">
                    {isAr ? 'الاسم الكامل للمرشح' : 'Researcher Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Maan Barazy"
                    className="w-full text-xs p-2.5 border border-black bg-neutral-50 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9.5px] font-mono uppercase font-black text-zinc-500">
                    {isAr ? 'المؤسسة / الكيان الاستشاري' : 'Affiliation / Organization'}
                  </label>
                  <input
                    type="text"
                    required
                    value={candidateOrg}
                    onChange={(e) => setCandidateOrg(e.target.value)}
                    placeholder={isAr ? 'مثال: جمعية الإشراف المالي السيادي' : 'e.g., Beirut Sovereign Analytics Institute'}
                    className="w-full text-xs p-2.5 border border-black bg-neutral-50 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9.5px] font-mono uppercase font-black text-zinc-500">
                    {isAr ? 'مذكرة الغرض واستخدام محرك الأبحاث' : 'Core Research Objective / Use-Case'}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={candidateIntent}
                    onChange={(e) => setCandidateIntent(e.target.value)}
                    placeholder={isAr ? 'اكتب الغرض الرئيسي من مراجعة وتوليف الصكوك الذهبية والمالية هنا...' : 'Explain how you intend to utilize the document synthesis vault and report compiler canvas...'}
                    className="w-full text-xs p-2.5 border border-black bg-neutral-50 font-medium font-sans resize-none"
                  />
                </div>
              </div>

              <div className="pt-6 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#d97706] hover:bg-neutral-900 text-white font-black text-xs uppercase py-3 border border-black w-full shadow-[4px_4px_0_0_#000] cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (isAr ? 'جاري بث البيانات لقنوات الحوكمة للمراجعة...' : 'TRANSMITTING CREDENTIALS TO ADVISORY PANEL...') : (isAr ? 'إرسال ترشيح العضوية للتدقيق' : 'SUBMIT CANDIDACY REGISTER')}
                </button>
              </div>
            </form>
          ) : showDemoSignup && !demoSuccess ? (
            
            /* SCREEN 4: Instant Demo Registration form */
            <form onSubmit={handleDemoSignupSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-zinc-200">
                  <span className="font-mono text-xxs font-black text-amber-600 uppercase flex items-center gap-1">
                    <Sparkles size={12} className="text-[#d97706] animate-pulse" />
                    {isAr ? 'تسجيل حساب تجريبي فوري' : 'INSTANT 24HR DEMO REGISTRATION'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowDemoSignup(false)}
                    className="text-[10px] font-mono text-zinc-400 hover:text-black hover:underline"
                  >
                    {isAr ? 'رجوع' : 'Go Back'}
                  </button>
                </div>

                <p className="text-[10px] text-zinc-500 leading-normal font-sans font-medium">
                  {isAr 
                    ? 'قم بتسجيل حساب تجريبي مجاني صالح لمدة ٢٤ ساعة فورا وبشكل مباشر لتجربة "الديوان البحثي غولدن" بالكامل دون انتظار الموافقة.'
                    : 'Register an instant free 24-hour demo account and get automatically authorized to operate the research workspace immediately.'}
                </p>

                <div className="space-y-1">
                  <label className="block text-[9.5px] font-mono uppercase font-black text-zinc-500">
                    {isAr ? 'اسم الباحث' : 'Researcher Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={demoUsername}
                    onChange={(e) => setDemoUsername(e.target.value)}
                    placeholder="Maan Barazy"
                    className="w-full text-xs p-2.5 border border-black bg-neutral-50 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9.5px] font-mono uppercase font-black text-zinc-500">
                    {isAr ? 'البريد الإلكتروني للديوان' : 'Registry Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    placeholder="researcher@example.com"
                    className="w-full text-xs p-2.5 border border-black bg-neutral-50 font-semibold"
                  />
                </div>
              </div>

              <div className="pt-6 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-600 hover:bg-neutral-900 text-white font-black text-xs uppercase py-3 border border-black w-full shadow-[4px_4px_0_0_#000] cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (isAr ? 'جاري تحضير الحساب والاعتماد...' : 'CREATING DEMO ACCOUNT & AUTHORIZING...') : (isAr ? 'تنشيط وتشغيل الحساب مجاناً' : 'ACTIVATE & LAUNCH DEMO')}
                </button>
              </div>
            </form>
          ) : paySuccess ? (
            
            /* SUCCESS 1: Premium success message */
            <div className="h-full flex flex-col justify-center items-center text-center p-6 space-y-4 animate-fade-in-up">
              <div className="w-14 h-14 bg-emerald-50 border-4 border-black text-emerald-800 flex items-center justify-center">
                <ShieldCheck size={36} />
              </div>
              <div>
                <h4 className="font-sans font-black text-lg md:text-xl text-emerald-800">
                  {isAr ? 'تم الاشتراك والتوثيق بنجاح!' : 'Subscription Granted Successfully!'}
                </h4>
                <p className="text-xxs text-zinc-500 font-mono uppercase mt-1">
                  {isAr ? 'مستند العضوية جاهز، جاري نقلك للصحيفة لفتح المحتوى المميز' : 'Your credentials have been securely updated across all nodes'}
                </p>
              </div>
              <p className="text-xs text-zinc-650 font-medium">
                {isAr ? '✓ تم ترقية حسابك إلى درجة العضوية الفاخرة (Premium Partner). يمكنك الآن تصفح كافة الأخبار دون عوائق.' : '✓ Your reader credentials have been promoted. Complete unlimited coverage access is now fully operational.'}
              </p>
            </div>
          ) : demoSuccess ? (
            
            /* SUCCESS 3: Demo success message */
            <div className="h-full flex flex-col justify-center items-center text-center p-6 space-y-4 animate-fade-in-up">
              <div className="w-14 h-14 bg-amber-50 border-4 border-amber-600 text-amber-600 flex items-center justify-center">
                <Sparkles size={36} className="animate-spin text-amber-500" />
              </div>
              <div>
                <h4 className="font-sans font-black text-lg md:text-xl text-amber-600">
                  {isAr ? 'تم تنشيط الحساب التجريبي بنجاح!' : '24-Hour Demo Activated!'}
                </h4>
                <p className="text-xxs text-zinc-500 font-mono uppercase mt-1">
                  {isAr ? 'صلاحيات غولدن برايم جاهزة ونشطة الآن فوراً' : 'Golden Prime status instantly approved'}
                </p>
              </div>
              <p className="text-xs text-zinc-650 font-medium leading-relaxed">
                {isAr 
                  ? '✓ تم تيسير دخولك للديوان البحثي وخزانة المصادر بنجاح. حسابك نشط الآن وجاهز للاستخدام لمدة ٢٤ ساعة.' 
                  : '✓ Your instant demo account has been approved. You are now authorized to use the Document Vault and Report Compiler for 24 hours.'}
              </p>
            </div>
          ) : (
            
            /* SUCCESS 2: Golden Prime Candidacy Pending Approval message */
            <div className="h-full flex flex-col justify-center items-center text-center p-6 space-y-4 animate-fade-in-up">
              <div className="w-14 h-14 bg-amber-50 border-4 border-[#d97706] text-[#d97706] flex items-center justify-center">
                <Cpu size={36} className="animate-pulse" />
              </div>
              <div>
                <h4 className="font-sans font-black text-base md:text-md text-[#d97706] leading-snug">
                  {isAr ? 'تم استلام طلب ترشيح غولدن برايم بنجاح' : 'Candidacy Request Logged Successfully'}
                </h4>
                <p className="text-xxs text-zinc-500 font-mono uppercase mt-1">
                  {isAr ? 'الترشيح قيد المراجعة والمطابقة' : 'PENDING SECURITY COMPLIANCE CLEARANCE'}
                </p>
              </div>
              
              <div className="bg-amber-50 border border-amber-300 p-3 text-xs leading-relaxed text-amber-900 font-sans font-medium">
                {isAr 
                  ? 'Your candidacy for Golden Prime has been submitted. Our team is reviewing your application, and you will be notified upon approval.'
                  : 'Your candidacy for Golden Prime has been submitted. Our team is reviewing your application, and you will be notified upon approval.'
                }
              </div>

              <button
                type="button"
                onClick={() => {
                  onSubscriptionSuccess();
                }}
                className="bg-black text-white hover:bg-zinc-800 font-mono text-[9px] uppercase px-4 py-2 border border-black cursor-pointer"
              >
                {isAr ? 'حسناً، العودة للديوان' : 'Acknowledge & Return'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
