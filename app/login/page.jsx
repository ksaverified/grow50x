'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ContactModal from '@/components/ContactModal';

export default function Login() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ accountId: '', username: '', password: '' });
  const [forgotForm, setForgotForm] = useState({ accountId: '', username: '' });
  const [loginMessage, setLoginMessage] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

  const demoCredentials = {
    admin: { accountId: 'CLINIC-0001', username: 'admin', password: 'Password123!' },
    doctor: { accountId: 'CLINIC-0001', username: 'doctor', password: 'Password123!' },
    finance: { accountId: 'CLINIC-0001', username: 'finance', password: 'Password123!' },
    community: { accountId: 'CLINIC-0001', username: 'community', password: 'Password123!' },
  };

  const fillDemoCredentials = (role) => {
    setLoginForm(demoCredentials[role]);
    setLoginMessage(`Loaded ${role} demo credentials. Click Login to continue.`);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId: loginForm.accountId.trim(),
          username: loginForm.username.trim(),
          password: loginForm.password,
        }),
      });
      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await res.json() : null;

      if (!res.ok) {
        const errorText = data?.message || (contentType.includes('application/json') ? 'Unknown error' : 'Unexpected server response');
        setLoginMessage(`Server error: ${res.status}. ${errorText}`);
        return;
      }

      if (data?.success) {
        window.localStorage.setItem(
          'clinicflowSession',
          JSON.stringify({
            accountId: data.data.accountId,
            clinicName: data.data.clinicName,
            username: data.data.username,
            role: data.data.role,
          })
        );
        setLoginMessage(`Welcome ${data.data.username}! Redirecting...`);
        router.push(`/dashboard/${data.data.role.toLowerCase()}`);
      } else {
        setLoginMessage(data?.message || 'Login failed.');
      }
    } catch (error) {
      setLoginMessage('Error: ' + error.message);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotForm.accountId || !forgotForm.username) {
      setForgotMessage('Please provide both Account ID and Username.');
      return;
    }
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(forgotForm),
      });
      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await res.json() : null;

      if (!res.ok) {
        const errorText = data?.message || (contentType.includes('application/json') ? 'Unknown error' : 'Unexpected server response');
        setForgotMessage(`Server error: ${res.status}. ${errorText}`);
        return;
      }

      setForgotMessage(data?.message || 'Password reset request received.');
    } catch (error) {
      setForgotMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-500/10 selection:text-teal-700">
      {/* Mini Elegant Header */}
      <header className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3.5 hover:opacity-90 transition">
            <div className="rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-450 p-2 shadow-md shadow-teal-500/10 text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 font-display">ClinicFlow</h1>
            </div>
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="text-xs font-bold text-slate-500 hover:text-teal-600 transition">Home</Link>
            <Link href="/plans" className="text-xs font-bold text-slate-500 hover:text-teal-600 transition">Plans</Link>
            <Link href="/about" className="text-xs font-bold text-slate-500 hover:text-teal-600 transition">About</Link>
          </nav>
        </div>
      </header>

      {/* Main Body with Split Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-12 items-stretch">
        
        {/* Left Side: Brand Statement & Compliance Highlights */}
        <section className="bg-slate-950 text-white rounded-[2rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-xl">
          {/* Decorative radial gradients */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10" />

          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight font-display text-gradient-teal inline-block">
              Secure Tenant Space
            </h2>
            <h3 className="text-4xl font-extrabold font-display leading-tight tracking-tight">
              Regulated Clinical Practice Controls
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed font-normal">
              ClinicFlow manages secure data residency, role validations, and patient record separation according to Saudi Health Regulations.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="h-9 w-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold tracking-wide uppercase text-slate-200 font-display">PDPL Standard Compliance</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">Full separation of patient medical data from general marketing database systems.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="h-9 w-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold tracking-wide uppercase text-slate-200 font-display">NPHIES Exchange Alignment</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">Structured EHR datasets pre-aligned for MOH NPHIES invoice and insurance clearance.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="h-9 w-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold tracking-wide uppercase text-slate-200 font-display">NCA Cybersecurity Controls</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">Encrypted audit trails, session timeouts, and granular role boundary configurations.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 text-xs text-slate-400 flex justify-between">
            <span>ClinicFlow Multi-Tenant</span>
            <span>v1.0.0</span>
          </div>
        </section>

        {/* Right Side: Form Container */}
        <section className="bg-white rounded-[2rem] border border-slate-200/80 shadow-2xl p-10 flex flex-col justify-between">
          <div>
            {/* Tab selection */}
            <div className="flex gap-6 border-b border-slate-100 mb-8">
              <button
                onClick={() => setActiveTab('login')}
                className={`pb-4 text-sm font-bold transition-all relative ${
                  activeTab === 'login'
                    ? 'text-teal-650 font-extrabold'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Sign In
                {activeTab === 'login' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full" />}
              </button>
              <button
                onClick={() => setActiveTab('forgot')}
                className={`pb-4 text-sm font-bold transition-all relative ${
                  activeTab === 'forgot'
                    ? 'text-teal-650 font-extrabold'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Forgot Password
                {activeTab === 'forgot' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full" />}
              </button>
            </div>

            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-display">Welcome Back</h2>
                  <p className="text-xs text-slate-400 mt-1">Please enter your clinic credentials to enter your workspace.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-650 mb-2">Account ID</label>
                    <input
                      type="text"
                      placeholder="e.g. CLINIC-0001"
                      value={loginForm.accountId}
                      onChange={(e) => setLoginForm({ ...loginForm, accountId: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm text-slate-850 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-650 mb-2">Username</label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm text-slate-850 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-650 mb-2">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm text-slate-850 transition"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-teal-600/10 active:scale-[0.98] transition text-sm"
                >
                  Login
                </button>

                {/* Demo Quick Fills */}
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Quick Demo Login Selector</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials('admin')}
                      className="px-3 py-2.5 bg-slate-55 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-100 hover:border-slate-300 transition"
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials('doctor')}
                      className="px-3 py-2.5 bg-slate-55 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-100 hover:border-slate-300 transition"
                    >
                      Doctor
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials('finance')}
                      className="px-3 py-2.5 bg-slate-55 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-100 hover:border-slate-300 transition"
                    >
                      Finance
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials('community')}
                      className="px-3 py-2.5 bg-slate-55 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-100 hover:border-slate-300 transition"
                    >
                      Community
                    </button>
                  </div>
                </div>

                {loginMessage && (
                  <div
                    className={`p-4 rounded-2xl text-xs font-semibold animate-fade-in ${
                      loginMessage.includes('Welcome')
                        ? 'bg-teal-50 text-teal-805 text-teal-800 border border-teal-100'
                        : 'bg-amber-50 text-amber-805 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {loginMessage}
                  </div>
                )}
              </form>
            )}

            {activeTab === 'forgot' && (
              <form onSubmit={handleForgotSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-display">Reset Password</h2>
                  <p className="text-xs text-slate-400 mt-1">Provide your details to request password reset triggers.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-650 mb-2">Account ID</label>
                    <input
                      type="text"
                      placeholder="e.g. CLINIC-0001"
                      value={forgotForm.accountId}
                      onChange={(e) => setForgotForm({ ...forgotForm, accountId: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm text-slate-850 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-650 mb-2">Username</label>
                    <input
                      type="text"
                      placeholder="Your registered username"
                      value={forgotForm.username}
                      onChange={(e) => setForgotForm({ ...forgotForm, username: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm text-slate-850 transition"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-teal-600/10 active:scale-[0.98] transition text-sm"
                >
                  Send Reset Link
                </button>

                {forgotMessage && (
                  <div
                    className={`p-4 rounded-2xl text-xs font-semibold animate-fade-in ${
                      forgotMessage.includes('sent') || forgotMessage.includes('completed')
                        ? 'bg-teal-50 text-teal-805 text-teal-800 border border-teal-100'
                        : 'bg-amber-50 text-amber-850 text-amber-805 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {forgotMessage}
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Need help footer section */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Forgot Account ID?</span>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="text-teal-600 font-bold hover:text-teal-700 transition"
            >
              Contact Support
            </button>
          </div>
        </section>
      </main>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

      <footer className="bg-slate-950 text-slate-500 py-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center text-[10px]">
          ClinicFlow tenant authorization uses multi-tenant cryptographically segmented structures.
        </div>
      </footer>
    </div>
  );
}
