'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ accountId: '', username: '', password: '' });
  const [forgotForm, setForgotForm] = useState({ accountId: '', username: '' });
  const [loginMessage, setLoginMessage] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await res.json() : null;

      if (!res.ok) {
        const errorText = data?.message || (contentType.includes('application/json') ? 'Unknown error' : 'Unexpected server response');
        setLoginMessage(`Server error: ${res.status} ${res.statusText}. ${errorText}`);
        return;
      }

      if (data?.success) {
        setLoginMessage(`Welcome ${data.data.username}! Signed in as ${data.data.role} for ${data.data.clinicName}.`);
        router.push('/dashboard');
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
      setForgotMessage('Please provide both Account ID and Username, or contact us at daviddegroeve@gmail.com.');
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
        setForgotMessage(`Server error: ${res.status} ${res.statusText}. ${errorText}`);
        return;
      }

      setForgotMessage(data?.message || 'Request completed.');
    } catch (error) {
      setForgotMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">ClinicFlow</h1>
            <p className="text-sm text-slate-600">Secure clinic access with Account ID, Username, and Password.</p>
          </div>
          <nav className="flex gap-4 items-center">
            <Link href="/" className="text-slate-700 font-medium hover:text-blue-600">
              Home
            </Link>
            <Link href="/plans" className="text-slate-700 font-medium hover:text-blue-600">
              Plans
            </Link>
            <Link href="/about" className="text-slate-700 font-medium hover:text-blue-600">
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-white rounded-lg shadow-md p-8">
            <div className="flex gap-4 mb-8 border-b">
              <button
                onClick={() => setActiveTab('login')}
                className={`pb-4 font-semibold ${
                  activeTab === 'login'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('forgot')}
                className={`pb-4 font-semibold ${
                  activeTab === 'forgot'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Forgot Password
              </button>
            </div>

            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit}>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Clinic Login</h2>
                <p className="text-slate-600 mb-6">Sign in with the clinic Account ID, your Username, and your Password.</p>

                <div className="mb-6">
                  <label className="block font-semibold text-slate-700 mb-2">Account ID</label>
                  <input
                    type="text"
                    placeholder="Enter clinic Account ID"
                    value={loginForm.accountId}
                    onChange={(e) => setLoginForm({ ...loginForm, accountId: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block font-semibold text-slate-700 mb-2">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="mb-8">
                  <label className="block font-semibold text-slate-700 mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Login
                </button>

                {loginMessage && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      loginMessage.includes('Welcome')
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {loginMessage}
                  </div>
                )}

                <div className="mt-6 p-4 bg-slate-100 rounded-lg text-sm text-slate-700">
                  <p className="font-semibold mb-2">Demo Credentials:</p>
                  <p>Account ID: 22222222-2222-2222-2222-222222222222</p>
                  <p>Username: admin, doctor, or finance</p>
                  <p>Password: Password123!</p>
                </div>
              </form>
            )}

            {activeTab === 'forgot' && (
              <form onSubmit={handleForgotSubmit}>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Forgot Password</h2>
                <p className="text-slate-600 mb-6">
                  If you need a password reset, provide your Account ID and Username. If you don&apos;t have either, contact us directly.
                </p>

                <div className="mb-6">
                  <label className="block font-semibold text-slate-700 mb-2">Account ID</label>
                  <input
                    type="text"
                    placeholder="Clinic Account ID"
                    value={forgotForm.accountId}
                    onChange={(e) => setForgotForm({ ...forgotForm, accountId: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="mb-8">
                  <label className="block font-semibold text-slate-700 mb-2">Username</label>
                  <input
                    type="text"
                    placeholder="Your username"
                    value={forgotForm.username}
                    onChange={(e) => setForgotForm({ ...forgotForm, username: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Request Password Reset
                </button>

                {forgotMessage && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      forgotMessage.includes('would be sent')
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {forgotMessage}
                  </div>
                )}
              </form>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 h-fit">
            <h3 className="text-lg font-bold text-slate-900 mb-4">User Roles</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-slate-900">Admin</p>
                <p className="text-sm text-slate-600">Full database configuration and clinic setup access</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Doctor</p>
                <p className="text-sm text-slate-600">Patient care, clinical records, and prescriptions</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Finance</p>
                <p className="text-sm text-slate-600">Billing, payments, and reception workflows</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <p className="text-sm font-semibold text-slate-700 mb-3">Need help?</p>
              <p className="text-sm text-slate-600 mb-4">
                If you don&apos;t know your Account ID or Username, contact:
              </p>
              <a
                href="mailto:daviddegroeve@gmail.com"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                daviddegroeve@gmail.com
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 mt-16 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>ClinicFlow login uses Account ID plus Username and Password for tenant-aware access.</p>
        </div>
      </footer>
    </div>
  );
}
