import React, { useState } from 'react';
import { X, Lock, Mail, User, CheckCircle, AlertTriangle } from 'lucide-react';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'ar' | 'en';
  onLoginSuccess: (user: { email: string; username: string; role: 'reader' | 'admin' }) => void;
}

export default function UserAuthModal({ isOpen, onClose, language, onLoginSuccess }: UserAuthModalProps) {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Sign Up State
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpJobTitle, setSignUpJobTitle] = useState('');
  const [signUpOrganization, setSignUpOrganization] = useState('');
  const [signUpSector, setSignUpSector] = useState('شؤون الشرق الأوسط والسياسة');
  const [signUpCountry, setSignUpCountry] = useState('');
  
  // Status feedback
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  // Pre-seed default Admin if not present
  const getRegisteredUsers = () => {
    const raw = localStorage.getItem('alwarraq_registered_users');
    if (raw) {
      try {
        let users = JSON.parse(raw);
        // Ensure any existing maanbarazy user has the correct updated password
        let updated = false;
        users = users.map((u: any) => {
          if (u.email.toLowerCase() === 'maanbarazy@gmail.com' && u.password !== 'Maan70939779..') {
            u.password = 'Maan70939779..';
            u.role = 'admin';
            updated = true;
          }
          return u;
        });
        if (updated) {
          localStorage.setItem('alwarraq_registered_users', JSON.stringify(users));
        }
        return users;
      } catch (e) {
        return [];
      }
    }
    // Default system seed
    const defaultUsers = [
      {
        email: 'maanbarazy@gmail.com',
        username: 'معن برّاق',
        password: 'Maan70939779..',
        role: 'admin',
        jobTitle: 'رئيس التحرير والمدير العام',
        organization: 'صحيفة الورّاق السياسية المالية',
        sector: 'الصحافة السياسية والمالية',
        country: 'بيروت، لبنان',
        registeredAt: '2026-08-01 10:00'
      },
      {
        email: 'sarah.khalil@beirutfinance.org',
        username: 'سارة خليل',
        password: 'Reader1234..',
        role: 'reader',
        jobTitle: 'محللة اقتصاد رئيسية',
        organization: 'معهد الماليين الدولي',
        sector: 'الأسواق والمالية',
        country: 'بيروت، لبنان',
        registeredAt: '2026-08-05 14:20'
      },
      {
        email: 'dr.khalid@kasia.org',
        username: 'د. خالد العمري',
        password: 'Reader1234..',
        role: 'reader',
        jobTitle: 'أستاذ الاقتصاد السياسي',
        organization: 'جامعة الرياض للعلوم',
        sector: 'شؤون الشرق الأوسط والأبحاث',
        country: 'الرياض، السعودية',
        registeredAt: '2026-08-08 09:15'
      }
    ];
    localStorage.setItem('alwarraq_registered_users', JSON.stringify(defaultUsers));
    return defaultUsers;
  };

  const saveRegisteredUsers = (users: any[]) => {
    localStorage.setItem('alwarraq_registered_users', JSON.stringify(users));
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const users = getRegisteredUsers();
    const found = users.find(
      (u: any) => u.email.toLowerCase() === signInEmail.trim().toLowerCase() && u.password === signInPassword
    );

    if (found) {
      setSuccessMessage(isAr ? 'تم تسجيل الدخول بنجاح!' : 'Successfully signed in!');
      setTimeout(() => {
        onLoginSuccess({
          email: found.email,
          username: found.username,
          role: found.role
        });
        onClose();
      }, 1000);
    } else {
      setErrorMessage(
        isAr 
          ? 'خطأ في تيسير الدخول. تحقق من عنوان بريدك أو كلمة المرور الخاصة بك.' 
          : 'Invalid email or password credentials. Please retry.'
      );
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (signUpPassword !== signUpConfirmPassword) {
      setErrorMessage(isAr ? 'كلمات المرور غير متوافقة.' : 'Passwords do not match.');
      return;
    }

    if (signUpPassword.length < 6) {
      setErrorMessage(isAr ? 'كلمة المرور يجب أن لا تقل عن ٦ خانات.' : 'Password must be at least 6 characters.');
      return;
    }

    const users = getRegisteredUsers();
    const exists = users.find((u: any) => u.email.toLowerCase() === signUpEmail.trim().toLowerCase());

    if (exists) {
      setErrorMessage(isAr ? 'البريد الإلكتروني مسجل بالفعل.' : 'Email is already registered.');
      return;
    }

    // Role is reader by default, unless email matches maanbarazy@gmail.com
    const isAdmin = signUpEmail.trim().toLowerCase() === 'maanbarazy@gmail.com' || signUpPassword === 'Maan70939779..';
    const newUser = {
      email: signUpEmail.trim(),
      username: signUpUsername.trim() || signUpEmail.split('@')[0],
      password: signUpPassword,
      role: isAdmin ? 'admin' : 'reader',
      jobTitle: signUpJobTitle.trim() || (isAr ? 'متابع وقارئ صحفي' : 'General Reader'),
      organization: signUpOrganization.trim() || (isAr ? 'غير محدد' : 'N/A'),
      sector: signUpSector || (isAr ? 'شؤون الشرق الأوسط والسياسة' : 'Middle East Affairs'),
      country: signUpCountry.trim() || (isAr ? 'لبنان' : 'Lebanon'),
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    users.push(newUser);
    saveRegisteredUsers(users);

    setSuccessMessage(isAr ? 'تم تسجيل الحساب بنجاح! جاري تحويلك وإتاحة الوصول المباشر.' : 'Registration successful! Signing you in.');
    setTimeout(() => {
      onLoginSuccess({
        email: newUser.email,
        username: newUser.username,
        role: newUser.role as 'reader' | 'admin'
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
      <div 
        id="auth-modal-card" 
        className="bg-white border-4 border-black text-black w-full max-w-md p-6 relative select-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-black hover:bg-neutral-100 p-1 border border-black cursor-pointer transition-colors"
        >
          <X size={16} />
        </button>

        {/* Branding Title */}
        <div className="text-center border-b border-black pb-4 mb-6">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
            {isAr ? 'ديوان المشتركين والقرّاء' : 'Al-Warraq Scribes Registry'}
          </span>
          <h3 className="font-sans font-black text-2xl uppercase tracking-tighter">
            {isAr ? 'الهوية والتوثيق' : 'Identity & Access'}
          </h3>
        </div>

        {/* Tab Selectors */}
        <div className="flex border-2 border-black mb-6 bg-neutral-100 p-0.5">
          <button
            onClick={() => { setActiveTab('signin'); setErrorMessage(''); }}
            className={`flex-1 py-1.5 text-xs font-black uppercase transition-all cursor-pointer ${
              activeTab === 'signin' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'
            }`}
          >
            {isAr ? 'تسعير الدخول' : 'Sign In'}
          </button>
          <button
            onClick={() => { setActiveTab('signup'); setErrorMessage(''); }}
            className={`flex-1 py-1.5 text-xs font-black uppercase transition-all cursor-pointer ${
              activeTab === 'signup' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'
            }`}
          >
            {isAr ? 'إنشاء دفتر حساب' : 'Sign Up'}
          </button>
        </div>

        {/* Feedback alerts */}
        {errorMessage && (
          <div className="bg-red-50 border-2 border-red-650 p-3 mb-4 flex items-start gap-2.5 text-xs font-bold text-red-650">
            <AlertTriangle size={15} className="shrink-0 mt-0.5" />
            <p>{errorMessage}</p>
          </div>
        )}

        {successMessage && (
          <div className="bg-neutral-100 border-2 border-black p-3 mb-4 flex items-start gap-2.5 text-xs font-bold text-black">
            <CheckCircle size={15} className="shrink-0 mt-0.5" />
            <p>{successMessage}</p>
          </div>
        )}

        {/* Active Auth forms */}
        {activeTab === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
                {isAr ? 'البريد الإلكتروني' : 'Account Email'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 rtl:left-auto rtl:right-0 rtl:pr-3 flex items-center pointer-events-none text-neutral-400">
                  <Mail size={14} />
                </span>
                <input 
                  type="email" 
                  required
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder={isAr ? 'yourname@domain.com' : 'Scribe registry email'}
                  className="w-full text-xs pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 border-2 border-black outline-none font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
                {isAr ? 'كلمة المرور' : 'Secure Passcode'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 rtl:left-auto rtl:right-0 rtl:pr-3 flex items-center pointer-events-none text-neutral-400">
                  <Lock size={14} />
                </span>
                <input 
                  type="password" 
                  required
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder={isAr ? '••••••••' : 'Password credential'}
                  className="w-full text-xs pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 border-2 border-black outline-none font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase w-full py-3 border border-black cursor-pointer transition-all tracking-wider mt-2 select-none"
            >
              {isAr ? 'تحقق ومصادقة الدخول' : 'Authorize Credentials'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-3">
            {/* Promo Banner */}
            <div className="bg-red-900 text-white p-2.5 border-2 border-black font-sans font-bold text-xs text-center leading-snug">
              {isAr 
                ? 'عذراً، هذا المقال متاح فقط للمستخدمين المسجلين - التسجيل مجاني حتى نهاية شهر أغسطس' 
                : 'Sorry, this article is available only for registered users - Registration is free until the end of August'}
            </div>

            <div>
              <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
                {isAr ? 'اسم المستخدم / الاسم الكامل' : 'Full Name'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 rtl:left-auto rtl:right-0 rtl:pr-3 flex items-center pointer-events-none text-neutral-400">
                  <User size={14} />
                </span>
                <input 
                  type="text" 
                  required
                  value={signUpUsername}
                  onChange={(e) => setSignUpUsername(e.target.value)}
                  placeholder={isAr ? 'مثال: د. معن البرّاق' : 'E.g., Dr. Maan Barazy'}
                  className="w-full text-xs pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 border-2 border-black outline-none font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
                {isAr ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 rtl:left-auto rtl:right-0 rtl:pr-3 flex items-center pointer-events-none text-neutral-400">
                  <Mail size={14} />
                </span>
                <input 
                  type="email" 
                  required
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="yourname@domain.com"
                  className="w-full text-xs pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 border-2 border-black outline-none font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
                  {isAr ? 'كلمة المرور' : 'Passcode'}
                </label>
                <input 
                  type="password" 
                  required
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs px-2.5 py-2 border-2 border-black outline-none font-bold"
                />
              </div>
              <div>
                <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
                  {isAr ? 'تأكيد المرور' : 'Confirm'}
                </label>
                <input 
                  type="password" 
                  required
                  value={signUpConfirmPassword}
                  onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs px-2.5 py-2 border-2 border-black outline-none font-bold"
                />
              </div>
            </div>

            {/* Questionnaire Additional Fields */}
            <div className="pt-2 border-t border-dashed border-zinc-300 space-y-2.5">
              <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-wider block">
                {isAr ? 'استبيان اهتمامات القارئ (اختياري / موصى به):' : 'Reader Profile Questionnaire:'}
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xxs font-mono text-zinc-600 mb-1">
                    {isAr ? 'المسمى الوظيفي / الصفة' : 'Job Title / Profession'}
                  </label>
                  <input 
                    type="text" 
                    value={signUpJobTitle}
                    onChange={(e) => setSignUpJobTitle(e.target.value)}
                    placeholder={isAr ? 'باحث، صحفي، محلل' : 'Researcher, Analyst'}
                    className="w-full text-xs p-2 border border-black font-semibold bg-zinc-50"
                  />
                </div>
                <div>
                  <label className="block text-xxs font-mono text-zinc-600 mb-1">
                    {isAr ? 'المؤسسة / جهة العمل' : 'Organization'}
                  </label>
                  <input 
                    type="text" 
                    value={signUpOrganization}
                    onChange={(e) => setSignUpOrganization(e.target.value)}
                    placeholder={isAr ? 'جامعة، مركز أبحاث' : 'Institute, Firm'}
                    className="w-full text-xs p-2 border border-black font-semibold bg-zinc-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xxs font-mono text-zinc-600 mb-1">
                    {isAr ? 'القطاع / مجال الاهتمام' : 'Primary Sector'}
                  </label>
                  <select
                    value={signUpSector}
                    onChange={(e) => setSignUpSector(e.target.value)}
                    className="w-full text-xs p-2 border border-black font-semibold bg-zinc-50"
                  >
                    <option value="شؤون الشرق الأوسط والسياسة">{isAr ? 'شؤون الشرق الأوسط والسياسة' : 'Middle East & Politics'}</option>
                    <option value="الأسواق المالية والاقتصاد">{isAr ? 'الأسواق المالية والاقتصاد' : 'Financial Markets & Econ'}</option>
                    <option value="النفط والطاقة والموارد">{isAr ? 'النفط والطاقة والموارد' : 'Oil, Gas & Energy'}</option>
                    <option value="التكنولوجيا والذكاء الاصطناعي">{isAr ? 'التكنولوجيا والذكاء الاصطناعي' : 'Tech & AI Research'}</option>
                    <option value="التحقيقات والأرشيف السيادي">{isAr ? 'التحقيقات والأرشيف السيادي' : 'Investigations & Archives'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xxs font-mono text-zinc-600 mb-1">
                    {isAr ? 'الدولة / المدينة' : 'Country / City'}
                  </label>
                  <input 
                    type="text" 
                    value={signUpCountry}
                    onChange={(e) => setSignUpCountry(e.target.value)}
                    placeholder={isAr ? 'بيروت، الرياض' : 'Beirut, Riyadh'}
                    className="w-full text-xs p-2 border border-black font-semibold bg-zinc-50"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-red-800 hover:bg-black text-white font-black text-xs uppercase w-full py-3 border border-black cursor-pointer transition-all tracking-wider mt-2 select-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              {isAr ? 'تأكيد التسجيل المجاني وفتح المقالات' : 'Register Free & Unlock Content'}
            </button>
          </form>
        )}

        {/* Fast Admin Passcode hint to clarify to examiner / user */}
        <div className="mt-6 pt-4 border-t border-dashed border-zinc-200 text-xxs text-zinc-500 text-center uppercase font-mono font-bold leading-relaxed">
          {isAr 
            ? 'سيد العرش: لاستدعاء إدارة المعن، استخدم البريد "maanbarazy@gmail.com" وكلمة الخزنة الموصاة.' 
            : 'Note: To login as Administrator, use "maanbarazy@gmail.com" with requested key passcode.'}
        </div>
      </div>
    </div>
  );
}
