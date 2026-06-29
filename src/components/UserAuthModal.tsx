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
        username: 'Maan',
        password: 'Maan70939779..',
        role: 'admin'
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
      username: signUpUsername.trim(),
      password: signUpPassword,
      role: isAdmin ? 'admin' : 'reader'
    };

    users.push(newUser);
    saveRegisteredUsers(users);

    setSuccessMessage(isAr ? 'تم تسجيل الحساب بنجاح! يمكنك الآن الدخول.' : 'Registration successful! You can now log in.');
    setTimeout(() => {
      setActiveTab('signin');
      setSignInEmail(signUpEmail);
      setSignInPassword('');
      setErrorMessage('');
      setSuccessMessage('');
    }, 1500);
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
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
                {isAr ? 'اسم المستخدم' : 'Writer Name'}
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
                  placeholder={isAr ? 'مثال: معن البرّاق' : 'E.g., Maan'}
                  className="w-full text-xs pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 border-2 border-black outline-none font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
                {isAr ? 'البريد الإلكتروني' : 'Registry Email'}
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
                  className="w-full text-xs pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 border-2 border-black outline-none font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
                {isAr ? 'كلمة المرور' : 'New Passcode'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 rtl:left-auto rtl:right-0 rtl:pr-3 flex items-center pointer-events-none text-neutral-400">
                  <Lock size={14} />
                </span>
                <input 
                  type="password" 
                  required
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="At least 6 letters"
                  className="w-full text-xs pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 border-2 border-black outline-none font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xxs font-mono uppercase font-black text-zinc-500 mb-1">
                {isAr ? 'تأكيد كلمة المرور' : 'Retype New Passcode'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 rtl:left-auto rtl:right-0 rtl:pr-3 flex items-center pointer-events-none text-neutral-400">
                  <Lock size={14} />
                </span>
                <input 
                  type="password" 
                  required
                  value={signUpConfirmPassword}
                  onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full text-xs pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 border-2 border-black outline-none font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase w-full py-3 border border-black cursor-pointer transition-all tracking-wider mt-2 select-none"
            >
              {isAr ? 'تثبيت وقيد السجل الجديد' : 'Register Account'}
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
